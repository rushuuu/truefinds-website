# TrueFinds Website Development Guide

This guide covers development practices, coding standards, and workflow for contributing to the TrueFinds website.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Code Structure](#code-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Performance Guidelines](#performance-guidelines)
- [Browser Compatibility](#browser-compatibility)
- [Accessibility](#accessibility)
- [SEO Best Practices](#seo-best-practices)

## Getting Started

### Prerequisites

- Text editor (VS Code, Sublime Text, or similar)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)
- Node.js and npm (optional, for development tools)

### Initial Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/truefinds-website.git
   cd truefinds-website
   ```

2. **Start Local Server**
   ```bash
   # Using Node.js (recommended)
   npm start

   # Or using Python
   python -m http.server 8000

   # Or simply open index.html in browser
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:8080`
   - Or double-click `index.html` file

## Development Environment

### Recommended Tools

#### Text Editors/IDEs
- **VS Code** (recommended)
  - Extensions: Live Server, Prettier, ESLint
  - Settings: Enable auto-save, configure formatting

- **Alternative Editors**
  - Sublime Text
  - Atom
  - WebStorm

#### Browser Developer Tools
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector

### VS Code Configuration

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "liveServer.settings.port": 5500,
  "liveServer.settings.root": "/",
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true
  }
}
```

## Code Structure

### File Organization

```
truefinds-website/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── README.md          # Project documentation
├── DEPLOYMENT.md      # Deployment guide
├── DEVELOPMENT.md     # This file
├── package.json       # NPM configuration
└── .gitignore         # Git ignore rules
```

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags, title, external resources -->
</head>
<body>
    <!-- Navigation -->
    <!-- Hero Section -->
    <!-- Features Section -->
    <!-- How It Works Section -->
    <!-- About Section -->
    <!-- Contact Section -->
    <!-- Footer -->
    <!-- Scripts -->
</body>
</html>
```

### CSS Architecture

**CSS Variables (Custom Properties)**
```css
:root {
    /* Colors */
    --primary-color: #6366f1;
    --secondary-color: #ec4899;

    /* Spacing */
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;

    /* Typography */
    --font-size-base: 1rem;
}
```

**Section Organization**
1. CSS Variables & Root Styles
2. Reset & Base Styles
3. Utility Classes
4. Component Styles (Navigation, Buttons, etc.)
5. Section Styles (Hero, Features, etc.)
6. Animations
7. Responsive Design
8. Print Styles

### JavaScript Structure

**Organization**
```javascript
// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialization functions
    initNavigation();
    initSmoothScroll();
    // etc.
});

// Individual feature functions
function initNavigation() { }
function initSmoothScroll() { }
```

## Coding Standards

### HTML Guidelines

**Semantic HTML**
```html
<!-- ✅ Good -->
<nav class="navbar">...</nav>
<section class="hero">...</section>
<footer class="footer">...</footer>

<!-- ❌ Bad -->
<div class="navbar">...</div>
<div class="hero">...</div>
```

**Accessibility**
```html
<!-- ✅ Good -->
<button type="submit" aria-label="Send message">
    <i class="fas fa-paper-plane"></i>
    <span>Send</span>
</button>

<!-- ❌ Bad -->
<button>
    <i class="fas fa-paper-plane"></i>
</button>
```

### CSS Guidelines

**Naming Conventions**
- Use kebab-case for class names: `.hero-section`
- Use BEM methodology for components: `.feature-card__title`
- Use descriptive names: avoid `.red-text`, use `.error-message`

**Best Practices**
```css
/* ✅ Good */
.feature-card {
    display: flex;
    gap: var(--spacing-md);
    transition: transform var(--transition-base);
}

/* ❌ Bad */
.feature-card {
    display: flex;
    gap: 16px;
    transition: transform 0.3s ease-in-out;
}
```

### JavaScript Guidelines

**Code Style**
```javascript
// ✅ Good
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// ❌ Bad
function validateForm(form){
var inputs=form.querySelectorAll('input[required]');
var isvalid=true;
for(var i=0;i<inputs.length;i++){
if(!validateField(inputs[i])){
isvalid=false;
}
}
return isvalid;
}
```

**Error Handling**
```javascript
// ✅ Good
function initFeature() {
    const element = document.querySelector('.feature');
    if (!element) {
        console.warn('Feature element not found');
        return;
    }
    // Continue with feature
}

// ❌ Bad
function initFeature() {
    const element = document.querySelector('.feature');
    element.addEventListener('click', handleClick);
}
```

## Testing

### Manual Testing Checklist

**Functionality**
- [ ] All navigation links work
- [ ] Contact form submits correctly
- [ ] Mobile menu toggles properly
- [ ] Scroll animations trigger correctly
- [ ] Buttons are clickable and responsive

**Visual Testing**
- [ ] Design looks correct on desktop
- [ ] Design looks correct on tablet
- [ ] Design looks correct on mobile
- [ ] Colors render correctly
- [ ] Fonts load properly

**Performance**
- [ ] Page loads in under 3 seconds
- [ ] No console errors
- [ ] Smooth scrolling works
- [ ] Animations are smooth (60fps)

**Cross-Browser Testing**
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Works on mobile browsers

### Browser Testing Tools

**Online Tools**
- BrowserStack (cross-browser testing)
- LambdaTest (cloud testing platform)
- Chrome DevTools (device emulation)

**Local Testing**
```javascript
// Add to script.js for testing
window.TRUEFINDS_TEST = true;

// Test different features
if (window.TRUEFINDS_TEST) {
    console.log('Testing mode enabled');
    // Add test-specific code
}
```

## Performance Guidelines

### Performance Targets

**Core Web Vitals**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Load Time Targets**
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.8s
- Speed Index: < 3.4s

### Optimization Techniques

**CSS Optimization**
```css
/* ✅ Good - Use CSS variables */
.button {
    background: var(--primary-color);
    transition: all var(--transition-base);
}

/* ❌ Bad - Hardcoded values */
.button {
    background: #6366f1;
    transition: all 0.3s ease-in-out;
}
```

**JavaScript Optimization**
```javascript
// ✅ Good - Event delegation
document.addEventListener('click', function(e) {
    if (e.target.matches('.button')) {
        handleClick(e);
    }
});

// ❌ Bad - Multiple listeners
document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', handleClick);
});
```

**Image Optimization**
```html
<!-- ✅ Good - Responsive images -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="Description" loading="lazy">
</picture>

<!-- ❌ Bad - Large unoptimized images -->
<img src="large-image.jpg" alt="Description">
```

## Browser Compatibility

### Target Browsers

**Desktop**
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions

**Mobile**
- iOS Safari: Last 2 versions
- Chrome Mobile: Last 2 versions
- Samsung Internet: Last 2 versions

### Feature Detection

```javascript
// ✅ Good - Feature detection
if ('IntersectionObserver' in window) {
    // Use Intersection Observer
} else {
    // Fallback
}

// ❌ Bad - Browser detection
if (navigator.userAgent.indexOf('Chrome') > -1) {
    // Chrome-specific code
}
```

### CSS Fallbacks

```css
/* Modern browsers */
.feature {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Fallback for older browsers */
@supports not (display: grid) {
    .feature {
        display: flex;
        flex-wrap: wrap;
    }
}
```

## Accessibility

### WCAG 2.1 Compliance

**Level AA Requirements**
- Color contrast ratio: 4.5:1 for text
- Interactive elements: Focusable and visible
- Images: Alt text for all images
- Forms: Proper labels and error messages

### Implementation Examples

```html
<!-- ✅ Good - Accessible button -->
<button
    type="submit"
    aria-label="Submit contact form"
    class="btn-primary"
>
    <span>Send Message</span>
    <i class="fas fa-paper-plane" aria-hidden="true"></i>
</button>

<!-- ❌ Bad - Inaccessible button -->
<div class="btn-primary" onclick="submitForm()">
    <i class="fas fa-paper-plane"></i>
</div>
```

```javascript
// ✅ Good - Keyboard accessible
function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        handleClick(event);
    }
}
```

## SEO Best Practices

### Meta Tags

```html
<!-- Essential meta tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Clear, compelling description">
<meta name="keywords" content="relevant, keywords, here">

<!-- Open Graph tags -->
<meta property="og:title" content="TrueFinds - Pinterest Automation">
<meta property="og:description" content="Description">
<meta property="og:image" content="image-url">
<meta property="og:url" content="page-url">
```

### Structured Data

```html
<!-- Schema.org markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TrueFinds",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

### Performance SEO

```javascript
// Add to script.js
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
```

## Git Workflow

### Branch Strategy

```bash
# Main branch for production
git checkout main

# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Commit Message Format

```
type(scope): subject

body

footer
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Examples**:
```
feat(hero): add floating animation to cards
fix(navigation): resolve mobile menu toggle issue
docs(readme): update installation instructions
```

## Continuous Improvement

### Regular Reviews

**Weekly**
- Check for broken links
- Review performance metrics
- Test on new browser versions

**Monthly**
- Update dependencies
- Review and update content
- Check for security vulnerabilities

**Quarterly**
- Major feature updates
- Design refresh if needed
- Performance optimization audit

### Monitoring

```javascript
// Add performance monitoring
if ('sendBeacon' in navigator) {
    window.addEventListener('load', function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        const data = {
            loadTime: perfData.loadEventEnd - perfData.fetchStart,
            domReady: perfData.domContentLoadedEventEnd - perfData.fetchStart
        };

        // Send to analytics
        navigator.sendBeacon('/api/performance', JSON.stringify(data));
    });
}
```

## Additional Resources

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

### Tools
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [Web.dev](https://web.dev/) - Performance and best practices
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance testing

### Community
- Stack Overflow
- Reddit (r/webdev, r/javascript)
- Discord servers for web development

---

**Last Updated**: August 2026
**Version**: 1.0.0