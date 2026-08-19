# TrueFinds Website

Welcome to the TrueFinds website - A Pinterest affiliate marketing automation platform.

## Overview

TrueFinds helps content creators and affiliate marketers automate their Pinterest marketing efforts with AI-powered tools for:
- Content generation and optimization
- Smart link management
- Automated scheduling
- Advanced analytics
- Audience targeting
- Campaign automation

## Website Structure

This repository contains the main website files for TrueFinds.com:
- `index.html` - Main landing page
- `styles.css` - Website styling
- `script.js` - Interactive functionality

## Deployment

This website is deployed using GitHub Pages with the custom domain [truefinds.com](https://truefinds.com).

### GitHub Pages Configuration

- **Source**: Deploying from the `main` branch
- **Domain**: truefinds.com
- **Build**: Static site (no build process required)

## Local Development

To view the website locally:

1. Clone this repository
2. Open `index.html` in your web browser
3. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

## Custom Domain Setup

The website uses a custom domain with the following DNS configuration:

### DNS Records (configured at domain registrar)
- **A Record**: `@` → GitHub Pages IP addresses
- **CNAME**: `www` → `rushilu.github.io`
- **CNAME**: Domain verification file in repository root

## Development Team

- Website content and structure by content team
- Styling and design by design team
- Interactive features by development team

## Support

For questions or issues related to the website:
- Email: support@truefinds.com
- Website: https://truefinds.com

## License

Copyright © 2026 TrueFinds. All rights reserved.