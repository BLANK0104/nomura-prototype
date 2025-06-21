# Deployment Guide

This guide covers deployment options for the Mumbai Beach Cleanup Platform.

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

The project is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. **Push to Main Branch**
   ```bash
   git add .
   git commit -m "feat: deploy to production"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source
   - The site will be available at `https://yourusername.github.io/nomura-prototype/`

### Manual Deployment

For manual deployment using gh-pages:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

## Environment Configuration

### Production Environment Variables

Create a `.env.production` file for production-specific configuration:

```env
VITE_APP_TITLE=Mumbai Beach Cleanup Platform
VITE_API_BASE_URL=https://api.your-domain.com
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
```

### Build Configuration

The build is optimized for production with:
- Code splitting and lazy loading
- Asset optimization and compression
- Source map generation disabled for security
- Bundle size optimization

## Custom Domain Setup

### GitHub Pages Custom Domain

1. **Add CNAME File**
   Create a `public/CNAME` file with your domain:
   ```
   your-domain.com
   ```

2. **Configure DNS**
   Add DNS records pointing to GitHub Pages:
   ```
   A record: 185.199.108.153
   A record: 185.199.109.153
   A record: 185.199.110.153
   A record: 185.199.111.153
   ```

3. **Update Vite Config**
   Update `vite.config.ts` for custom domain:
   ```typescript
   export default defineConfig(({ command }) => ({
     base: command === 'build' ? '/' : '/',
     // ... other config
   }))
   ```

## Alternative Deployment Options

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Netlify Deployment

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify dashboard
   - Or connect your GitHub repository for automatic deployments

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

## Performance Optimization

### Build Optimization

The production build includes:
- Tree shaking for unused code elimination
- Code splitting for optimal loading
- Asset compression and optimization
- CSS optimization and minification

### CDN Configuration

For optimal performance, configure CDN for static assets:
- Images and media files
- JavaScript and CSS bundles
- Font files and icons

## Security Configuration

### Content Security Policy

Add CSP headers for security:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### HTTPS Configuration

Ensure HTTPS is enforced:
- GitHub Pages automatically provides HTTPS
- Custom domains require SSL certificate configuration
- Use HSTS headers for additional security

## Monitoring and Analytics

### Performance Monitoring

Consider integrating:
- Google Analytics for user tracking
- Web Vitals for performance metrics
- Error tracking services (Sentry, LogRocket)
- Uptime monitoring services

### Build Analytics

Monitor build performance:
- Bundle size analysis
- Build time optimization
- Dependency auditing
- Security vulnerability scanning

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript compilation errors
   - Verify all dependencies are installed
   - Ensure proper environment variable configuration

2. **Routing Issues**
   - Configure proper base path for subdirectory deployments
   - Set up fallback routing for SPA behavior
   - Test all routes after deployment

3. **Asset Loading Issues**
   - Verify correct asset paths in production
   - Check CORS configuration for external resources
   - Ensure proper cache headers are set

### Support Resources

- GitHub Issues for deployment-specific problems
- Platform-specific documentation (Vercel, Netlify, etc.)
- Community forums and discussion boards

---

For additional deployment assistance, please refer to the project documentation or create an issue in the repository.
