# TrueFinds Website Deployment Guide

This guide covers deploying the TrueFinds website to GitHub Pages and other hosting platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Custom Domain Setup](#custom-domain-setup)
- [Alternative Hosting Options](#alternative-hosting-options)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Git installed and configured
- GitHub account
- Basic understanding of DNS (for custom domains)
- Domain name registered (optional, for custom domain)

## GitHub Pages Deployment

### Initial Setup

1. **Create GitHub Repository**
   ```bash
   # Create a new repository on GitHub
   # Repository name: truefinds-website
   # Initialize with README: Yes
   ```

2. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/truefinds-website.git
   cd truefinds-website
   ```

3. **Add Website Files**
   - Copy `index.html`, `styles.css`, and `script.js` to the repository
   - Ensure files are in the root directory

4. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial website deployment"
   git push origin main
   ```

### Enable GitHub Pages

1. **Go to Repository Settings**
   - Navigate to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "GitHub Pages" section

2. **Configure GitHub Pages**
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
   - Click "Save"

3. **Access Your Website**
   - URL: `https://yourusername.github.io/truefinds-website/`
   - Wait 1-2 minutes for initial deployment

## Custom Domain Setup

### Option 1: Subdomain (recommended for testing)

1. **Add CNAME Record**
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   TTL: 3600
   ```

2. **Configure GitHub Pages**
   - Go to repository Settings > GitHub Pages
   - Enter custom domain: `www.yourdomain.com`
   - Enforce HTTPS (recommended)

### Option 2: Root Domain

1. **Add A Records**
   ```
   Type: A
   Name: @
   Values:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
   TTL: 3600
   ```

2. **Add CNAME for www**
   ```
   Type: CNAME
   Name: www
   Value: yourdomain.com
   TTL: 3600
   ```

3. **Configure DNS**
   - Add DNS TXT record for verification (if required)
   - Wait for DNS propagation (24-48 hours)

### DNS Configuration Examples

#### GoDaddy
```
Type: A
Name: @
Value: 185.199.108.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

#### Namecheap
```
Type: A Record
Host: @
Value: 185.199.108.153

Type: CNAME Record
Host: www
Value: yourusername.github.io
```

#### Cloudflare
```
Type: A
Name: @
Content: 185.199.108.153
Proxy status: DNS only

Type: CNAME
Name: www
Content: yourusername.github.io
Proxy status: DNS only
```

## Alternative Hosting Options

### Netlify

1. **Connect to Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Deploy
   netlify deploy --prod
   ```

2. **Configuration**
   - Drag and drop folder to Netlify dashboard
   - Or connect GitHub repository

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### AWS S3 + CloudFront

1. **Create S3 Bucket**
   - Bucket name: your domain
   - Enable static website hosting
   - Upload files

2. **Configure CloudFront**
   - Create distribution pointing to S3
   - Add custom domain
   - Configure SSL certificate

## Performance Optimization

### Image Optimization

If you add images later, optimize them:

```bash
# Using ImageMagick
convert input.jpg -quality 85 -strip output.jpg

# Using squoosh-cli (recommended)
npx @squoosh/cli --input input.jpg --output output.jpg
```

### Enable Compression

Add `.htaccess` file (for Apache servers):

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

### Enable Browser Caching

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## Troubleshooting

### Common Issues

#### Website Not Showing
1. Check GitHub Pages status
2. Verify branch is `main`
3. Check file permissions
4. Wait 2-3 minutes for deployment

#### Custom Domain Not Working
1. Verify DNS records
2. Check DNS propagation
3. Clear browser cache
4. Check GitHub Pages DNS status

#### Styling Issues
1. Verify `styles.css` is linked correctly
2. Check file paths
3. Clear browser cache
4. Check browser console for errors

#### JavaScript Not Working
1. Check browser console for errors
2. Verify `script.js` is loaded
3. Check for syntax errors
4. Test in different browsers

### Debug Mode

Enable debug mode in JavaScript:

```javascript
// Add to script.js
window.TRUEFINDS_DEBUG = true;

// Then check console
console.log('TrueFinds Debug Mode Enabled');
```

### Performance Issues

1. **Check Page Speed**
   - Use Google PageSpeed Insights
   - Use GTmetrix
   - Use WebPageTest

2. **Common Fixes**
   - Compress images
   - Minify CSS and JavaScript
   - Enable compression
   - Use CDN for static assets

## Security Best Practices

### Content Security Policy

Add to `.htaccess` or server config:

```apache
<IfModule mod_headers.c>
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
</IfModule>
```

### HTTPS Redirect

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST%{REQUEST_URI} [L,R=301]
</IfModule>
```

## Monitoring and Analytics

### Google Analytics

Add to `<head>` section:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Performance Monitoring

```javascript
// Add to script.js
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('Performance:', entry.name, entry.duration);
    }
  });
  observer.observe({entryTypes: ['measure', 'navigation']});
}
```

## Maintenance

### Regular Updates

1. **Content Updates**
   - Update statistics and numbers
   - Refresh testimonials
   - Update feature descriptions

2. **Technical Maintenance**
   - Check for broken links
   - Test forms functionality
   - Monitor performance metrics
   - Review security settings

### Backup Strategy

```bash
# Backup current deployment
git clone https://github.com/yourusername/truefinds-website.git backup

# Or download as ZIP
wget https://github.com/yourusername/truefinds-website/archive/refs/heads/main.zip
```

## Support and Resources

### Official Documentation
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [DNS Configuration Guide](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)

### Community Support
- GitHub Issues
- Stack Overflow
- Discord/Slack communities

### Additional Resources
- [Web.dev Performance Guides](https://web.dev/performance/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)

---

**Last Updated**: August 2026
**Version**: 1.0.0