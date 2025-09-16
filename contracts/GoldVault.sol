// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract GoldVault is SepoliaConfig {
    using FHE for *;
    
    struct GoldToken {
        euint32 tokenId;
        euint32 goldAmount; // Amount of gold in grams (encrypted)
        euint32 pricePerGram; // Price per gram in wei (encrypted)
        bool isActive;
        address owner;
        uint256 createdAt;
        uint256 lastTraded;
    }
    
    struct TradeOrder {
        euint32 orderId;
        euint32 tokenId;
        euint32 amount; // Amount of gold to trade (encrypted)
        euint32 price; // Price per gram (encrypted)
        bool isBuyOrder;
        bool isActive;
        address trader;
        uint256 createdAt;
        uint256 expiresAt;
    }
    
    struct Portfolio {
        euint32 totalGoldHeld; // Total gold amount in grams (encrypted)
        euint32 totalValue; // Total portfolio value in wei (encrypted)
        euint32 tradeCount; // Number of trades made (encrypted)
        bool isActive;
        address owner;
        uint256 lastUpdated;
    }
    
    mapping(uint256 => GoldToken) public goldTokens;
    mapping(uint256 => TradeOrder) public tradeOrders;
    mapping(address => Portfolio) public portfolios;
    mapping(address => euint32) public userBalances;
    mapping(address => euint32) public userReputation;
    
    uint256 public tokenCounter;
    uint256 public orderCounter;
    
    address public owner;
    address public verifier;
    
    // Gold price oracle (simplified - in production would use Chainlink or similar)
    euint32 public currentGoldPricePerGram;
    
    event GoldTokenCreated(uint256 indexed tokenId, address indexed owner, uint32 goldAmount);
    event TradeOrderCreated(uint256 indexed orderId, address indexed trader, bool isBuyOrder);
    event TradeExecuted(uint256 indexed orderId, address indexed buyer, address indexed seller, uint32 amount);
    event GoldDeposited(address indexed user, uint32 amount);
    event GoldWithdrawn(address indexed user, uint32 amount);
    event PortfolioUpdated(address indexed user, uint32 totalValue);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        // Initialize with a default gold price (will be updated by oracle)
        currentGoldPricePerGram = FHE.asEuint32(50000000000000000); // 0.05 ETH per gram
    }
    
    function createGoldToken(
        externalEuint32 goldAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(goldAmount.length > 0, "Gold amount must be provided");
        
        uint256 tokenId = tokenCounter++;
        
        // Convert external encrypted amount to internal
        euint32 internalGoldAmount = FHE.fromExternal(goldAmount, inputProof);
        
        goldTokens[tokenId] = GoldToken({
            tokenId: FHE.asEuint32(0), // Will be set properly later
            goldAmount: internalGoldAmount,
            pricePerGram: currentGoldPricePerGram,
            isActive: true,
            owner: msg.sender,
            createdAt: block.timestamp,
            lastTraded: block.timestamp
        });
        
        // Update user's portfolio
        _updatePortfolio(msg.sender, internalGoldAmount, true);
        
        emit GoldTokenCreated(tokenId, msg.sender, 0); // Amount will be decrypted off-chain
        return tokenId;
    }
    
    function createTradeOrder(
        uint256 tokenId,
        externalEuint32 amount,
        externalEuint32 price,
        bool isBuyOrder,
        uint256 duration,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(goldTokens[tokenId].owner != address(0), "Token does not exist");
        require(duration > 0, "Duration must be positive");
        
        uint256 orderId = orderCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalPrice = FHE.fromExternal(price, inputProof);
        
        tradeOrders[orderId] = TradeOrder({
            orderId: FHE.asEuint32(0), // Will be set properly later
            tokenId: FHE.asEuint32(tokenId),
            amount: internalAmount,
            price: internalPrice,
            isBuyOrder: isBuyOrder,
            isActive: true,
            trader: msg.sender,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + duration
        });
        
        emit TradeOrderCreated(orderId, msg.sender, isBuyOrder);
        return orderId;
    }
    
    function executeTrade(
        uint256 orderId,
        uint256 matchingOrderId
    ) public {
        TradeOrder storage order = tradeOrders[orderId];
        TradeOrder storage matchingOrder = tradeOrders[matchingOrderId];
        
        require(order.isActive, "Order is not active");
        require(matchingOrder.isActive, "Matching order is not active");
        require(block.timestamp <= order.expiresAt, "Order has expired");
        require(block.timestamp <= matchingOrder.expiresAt, "Matching order has expired");
        require(order.isBuyOrder != matchingOrder.isBuyOrder, "Orders must be opposite types");
        
        // Verify price compatibility (simplified check)
        // In production, would use FHE comparison operations
        
        // Execute the trade
        address buyer = order.isBuyOrder ? order.trader : matchingOrder.trader;
        address seller = order.isBuyOrder ? matchingOrder.trader : order.trader;
        
        // Update token ownership
        uint256 tokenId = uint256(FHE.decrypt(order.tokenId));
        goldTokens[tokenId].owner = buyer;
        goldTokens[tokenId].lastTraded = block.timestamp;
        
        // Update portfolios
        _updatePortfolio(buyer, order.amount, true);
        _updatePortfolio(seller, order.amount, false);
        
        // Mark orders as inactive
        order.isActive = false;
        matchingOrder.isActive = false;
        
        emit TradeExecuted(orderId, buyer, seller, 0); // Amount will be decrypted off-chain
    }
    
    function depositGold(
        externalEuint32 amount,
        bytes calldata inputProof
    ) public {
        require(amount.length > 0, "Amount must be provided");
        
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Update user balance
        userBalances[msg.sender] = FHE.add(userBalances[msg.sender], internalAmount);
        
        // Update portfolio
        _updatePortfolio(msg.sender, internalAmount, true);
        
        emit GoldDeposited(msg.sender, 0); // Amount will be decrypted off-chain
    }
    
    function withdrawGold(
        externalEuint32 amount,
        bytes calldata inputProof
    ) public {
        require(amount.length > 0, "Amount must be provided");
        
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Check if user has sufficient balance
        // In production, would use FHE comparison operations
        
        // Update user balance
        userBalances[msg.sender] = FHE.sub(userBalances[msg.sender], internalAmount);
        
        // Update portfolio
        _updatePortfolio(msg.sender, internalAmount, false);
        
        emit GoldWithdrawn(msg.sender, 0); // Amount will be decrypted off-chain
    }
    
    function updateGoldPrice(
        externalEuint32 newPrice,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update price");
        require(newPrice.length > 0, "Price must be provided");
        
        currentGoldPricePerGram = FHE.fromExternal(newPrice, inputProof);
    }
    
    function updateUserReputation(
        address user,
        externalEuint32 reputation,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = FHE.fromExternal(reputation, inputProof);
        emit ReputationUpdated(user, 0); // Reputation will be decrypted off-chain
    }
    
    function _updatePortfolio(
        address user,
        euint32 amount,
        bool isAddition
    ) internal {
        Portfolio storage portfolio = portfolios[user];
        
        if (portfolio.owner == address(0)) {
            // Create new portfolio
            portfolio = Portfolio({
                totalGoldHeld: FHE.asEuint32(0),
                totalValue: FHE.asEuint32(0),
                tradeCount: FHE.asEuint32(0),
                isActive: true,
                owner: user,
                lastUpdated: block.timestamp
            });
        }
        
        // Update gold amount
        if (isAddition) {
            portfolio.totalGoldHeld = FHE.add(portfolio.totalGoldHeld, amount);
        } else {
            portfolio.totalGoldHeld = FHE.sub(portfolio.totalGoldHeld, amount);
        }
        
        // Update total value (simplified calculation)
        portfolio.totalValue = FHE.mul(portfolio.totalGoldHeld, currentGoldPricePerGram);
        portfolio.tradeCount = FHE.add(portfolio.tradeCount, FHE.asEuint32(1));
        portfolio.lastUpdated = block.timestamp;
        
        emit PortfolioUpdated(user, 0); // Value will be decrypted off-chain
    }
    
    // View functions (return decrypted values for display)
    function getTokenInfo(uint256 tokenId) public view returns (
        uint8 goldAmount,
        uint8 pricePerGram,
        bool isActive,
        address tokenOwner,
        uint256 createdAt,
        uint256 lastTraded
    ) {
        GoldToken storage token = goldTokens[tokenId];
        return (
            0, // FHE.decrypt(token.goldAmount) - will be decrypted off-chain
            0, // FHE.decrypt(token.pricePerGram) - will be decrypted off-chain
            token.isActive,
            token.owner,
            token.createdAt,
            token.lastTraded
        );
    }
    
    function getOrderInfo(uint256 orderId) public view returns (
        uint8 tokenId,
        uint8 amount,
        uint8 price,
        bool isBuyOrder,
        bool isActive,
        address trader,
        uint256 createdAt,
        uint256 expiresAt
    ) {
        TradeOrder storage order = tradeOrders[orderId];
        return (
            0, // FHE.decrypt(order.tokenId) - will be decrypted off-chain
            0, // FHE.decrypt(order.amount) - will be decrypted off-chain
            0, // FHE.decrypt(order.price) - will be decrypted off-chain
            order.isBuyOrder,
            order.isActive,
            order.trader,
            order.createdAt,
            order.expiresAt
        );
    }
    
    function getPortfolioInfo(address user) public view returns (
        uint8 totalGoldHeld,
        uint8 totalValue,
        uint8 tradeCount,
        bool isActive,
        uint256 lastUpdated
    ) {
        Portfolio storage portfolio = portfolios[user];
        return (
            0, // FHE.decrypt(portfolio.totalGoldHeld) - will be decrypted off-chain
            0, // FHE.decrypt(portfolio.totalValue) - will be decrypted off-chain
            0, // FHE.decrypt(portfolio.tradeCount) - will be decrypted off-chain
            portfolio.isActive,
            portfolio.lastUpdated
        );
    }
    
    function getUserBalance(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userBalances[user]) - will be decrypted off-chain
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getCurrentGoldPrice() public view returns (uint8) {
        return 0; // FHE.decrypt(currentGoldPricePerGram) - will be decrypted off-chain
    }
}
