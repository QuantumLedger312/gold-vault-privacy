# Vercel Deployment Guide for Aurum Trade

This guide provides step-by-step instructions for deploying the Aurum Trade FHE Gold Trading Platform to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository access
- Environment variables ready

## Step 1: Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `QuantumLedger312/gold-vault-privacy`
   - Click "Import"

## Step 2: Configure Project Settings

### Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables
Add the following environment variables in Vercel dashboard:

```bash
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
VITE_RPC_URL=https://1rpc.io/sepolia

# Contract Addresses (Update after deployment)
VITE_GOLD_VAULT_CONTRACT=0x0000000000000000000000000000000000000000
VITE_FHE_TOKEN_CONTRACT=0x0000000000000000000000000000000000000000

# FHE Configuration
VITE_FHE_NETWORK_URL=https://api.zama.ai
VITE_FHE_APP_ID=your_fhe_app_id
```

### Adding Environment Variables in Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable with:
   - **Name**: Variable name (e.g., `VITE_CHAIN_ID`)
   - **Value**: Variable value (e.g., `11155111`)
   - **Environment**: Production, Preview, Development (select all)

## Step 3: Deploy

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for build to complete (2-3 minutes)
   - Vercel will provide a deployment URL

2. **Verify Deployment**
   - Visit the provided URL
   - Test wallet connection
   - Verify all features work

## Step 4: Custom Domain (Optional)

### Add Custom Domain

1. **Domain Settings**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `aurumtrade.com`)

2. **DNS Configuration**
   - Add CNAME record pointing to Vercel
   - Example: `www.aurumtrade.com` → `cname.vercel-dns.com`
   - Wait for DNS propagation (up to 24 hours)

3. **SSL Certificate**
   - Vercel automatically provides SSL
   - Certificate will be issued automatically
   - Force HTTPS redirect enabled by default

## Step 5: Production Optimization

### Performance Settings

1. **Build Optimization**
   - Enable "Build Cache" in settings
   - Configure "Edge Functions" if needed
   - Set up "Analytics" for monitoring

2. **Security Headers**
   - Add security headers in `vercel.json`:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "Referrer-Policy",
             "value": "strict-origin-when-cross-origin"
           }
         ]
       }
     ]
   }
   ```

### Monitoring Setup

1. **Vercel Analytics**
   - Enable in Project Settings
   - Monitor performance metrics
   - Track user interactions

2. **Error Tracking**
   - Consider adding Sentry or similar
   - Monitor for runtime errors
   - Set up alerts

## Step 6: Continuous Deployment

### Automatic Deployments

- **Production**: Deploys from `main` branch
- **Preview**: Deploys from pull requests
- **Development**: Deploys from feature branches

### Manual Deployments

1. **Redeploy**
   - Go to Deployments tab
   - Click "Redeploy" on any deployment
   - Useful for environment variable changes

2. **Rollback**
   - Select previous deployment
   - Click "Promote to Production"
   - Instant rollback capability

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Verify all dependencies are in `package.json`
   - Ensure build command is correct

2. **Environment Variables**
   - Verify all required variables are set
   - Check variable names match exactly
   - Ensure no typos in values

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID
   - Check RPC URL is accessible
   - Test with different wallets

### Performance Issues

1. **Slow Loading**
   - Enable build cache
   - Optimize images and assets
   - Use Vercel's Edge Network

2. **Bundle Size**
   - Analyze bundle with `npm run build -- --analyze`
   - Remove unused dependencies
   - Use dynamic imports for large libraries

## Security Considerations

### Environment Variables
- Never commit sensitive keys to repository
- Use Vercel's environment variable system
- Rotate keys regularly

### HTTPS
- Vercel provides automatic SSL
- Force HTTPS redirects
- Use secure headers

### CORS
- Configure CORS for API calls
- Whitelist trusted domains
- Use proper authentication

## Monitoring and Maintenance

### Regular Tasks

1. **Update Dependencies**
   - Check for security updates
   - Update packages regularly
   - Test after updates

2. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor Core Web Vitals
   - Optimize based on metrics

3. **Backup Strategy**
   - Code is backed up in GitHub
   - Environment variables in Vercel
   - Consider database backups if applicable

## Support

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/support)

### Project-Specific Issues
- Check project documentation
- Review GitHub issues
- Contact development team

---

## Quick Reference

### Essential Commands
```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Key URLs
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Project Repository**: https://github.com/QuantumLedger312/gold-vault-privacy
- **Deployment URL**: https://gold-vault-privacy.vercel.app (example)

### Environment Variables Checklist
- [ ] VITE_CHAIN_ID
- [ ] VITE_RPC_URL
- [ ] VITE_WALLET_CONNECT_PROJECT_ID
- [ ] VITE_INFURA_API_KEY
- [ ] VITE_GOLD_VAULT_CONTRACT
- [ ] VITE_FHE_TOKEN_CONTRACT
- [ ] VITE_FHE_NETWORK_URL
- [ ] VITE_FHE_APP_ID

---

**Deployment completed successfully!** 🚀

Your FHE Gold Trading Platform is now live on Vercel with full privacy and security features.
