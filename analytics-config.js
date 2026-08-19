/**
 * TrueFinds Website - Analytics Configuration
 * Handles all analytics and tracking setup
 */

// Analytics Configuration
const ANALYTICS_CONFIG = {
    // Google Analytics
    googleAnalytics: {
        enabled: true,
        trackingId: 'G-XXXXXXXXXX', // Replace with actual GA ID
        debugMode: false
    },

    // Google Tag Manager
    googleTagManager: {
        enabled: true,
        containerId: 'GTM-XXXXXX' // Replace with actual GTM ID
    },

    // Custom Events Tracking
    events: {
        // Navigation tracking
        navigation: true,

        // Form interactions
        forms: true,

        // Button clicks
        buttons: true,

        // Scroll depth
        scrollDepth: true,

        // Performance metrics
        performance: true
    },

    // Performance Monitoring
    performance: {
        enabled: true,
        metrics: [
            'FCP', // First Contentful Paint
            'LCP', // Largest Contentful Paint
            'FID', // First Input Delay
            'CLS', // Cumulative Layout Shift
            'TTFB' // Time to First Byte
        ]
    },

    // Error Tracking
    errors: {
        enabled: true,
        logToConsole: true,
        sendToServer: false
    },

    // User Privacy
    privacy: {
        anonymizeIp: true,
        respectDoNotTrack: true,
        cookieConsent: true
    }
};

/**
 * Initialize Analytics
 */
function initAnalytics() {
    // Check for Do Not Track
    if (ANALYTICS_CONFIG.privacy.respectDoNotTrack && navigator.doNotTrack === '1') {
        console.log('Analytics disabled due to Do Not Track setting');
        return;
    }

    // Initialize Google Analytics
    if (ANALYTICS_CONFIG.googleAnalytics.enabled) {
        initGoogleAnalytics();
    }

    // Initialize Google Tag Manager
    if (ANALYTICS_CONFIG.googleTagManager.enabled) {
        // GTM is loaded via script tag in HTML
        console.log('Google Tag Manager initialized');
    }

    // Initialize event tracking
    initEventTracking();

    // Initialize performance monitoring
    if (ANALYTICS_CONFIG.performance.enabled) {
        initPerformanceMonitoring();
    }

    // Initialize error tracking
    if (ANALYTICS_CONFIG.errors.enabled) {
        initErrorTracking();
    }

    console.log('TrueFinds Analytics initialized');
}

/**
 * Initialize Google Analytics
 */
function initGoogleAnalytics() {
    try {
        // Load GA script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleAnalytics.trackingId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
            window.dataLayer.push(arguments);
        };

        gtag('js', new Date());
        gtag('config', ANALYTICS_CONFIG.googleAnalytics.trackingId, {
            'anonymize_ip': ANALYTICS_CONFIG.privacy.anonymizeIp,
            'debug_mode': ANALYTICS_CONFIG.googleAnalytics.debugMode
        });

        console.log('Google Analytics initialized');
    } catch (error) {
        console.error('Failed to initialize Google Analytics:', error);
    }
}

/**
 * Initialize Event Tracking
 */
function initEventTracking() {
    // Track navigation
    if (ANALYTICS_CONFIG.events.navigation) {
        trackNavigation();
    }

    // Track form interactions
    if (ANALYTICS_CONFIG.events.forms) {
        trackForms();
    }

    // Track button clicks
    if (ANALYTICS_CONFIG.events.buttons) {
        trackButtons();
    }

    // Track scroll depth
    if (ANALYTICS_CONFIG.events.scrollDepth) {
        trackScrollDepth();
    }
}

/**
 * Track Navigation Events
 */
function trackNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const section = this.getAttribute('href');
            trackEvent('navigation', 'click', section);
        });
    });
}

/**
 * Track Form Events
 */
function trackForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Track form views
        trackEvent('form', 'view', form.id);

        // Track form submissions
        form.addEventListener('submit', function() {
            trackEvent('form', 'submit', form.id);
        });

        // Track form field interactions
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                trackEvent('form', 'field_focus', input.name);
            });
        });
    });
}

/**
 * Track Button Clicks
 */
function trackButtons() {
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim().substring(0, 30);
            trackEvent('button', 'click', buttonText);
        });
    });
}

/**
 * Track Scroll Depth
 */
function trackScrollDepth() {
    const scrollDepths = [25, 50, 75, 100];
    let trackedDepths = [];

    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
                trackedDepths.push(depth);
                trackEvent('scroll', 'depth_reached', `${depth}%`);
            }
        });
    }, 1000));
}

/**
 * Initialize Performance Monitoring
 */
function initPerformanceMonitoring() {
    if (!('PerformanceObserver' in window)) {
        console.warn('PerformanceObserver not supported');
        return;
    }

    // Track Core Web Vitals
    trackWebVitals();

    // Track page load time
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const metrics = {
                loadTime: perfData.loadEventEnd - perfData.fetchStart,
                domReady: perfData.domContentLoadedEventEnd - perfData.fetchStart,
                firstPaint: getFirstPaint(),
                firstContentfulPaint: getFirstContentfulPaint()
            };

            trackEvent('performance', 'page_load', JSON.stringify(metrics));
        }, 0);
    });
}

/**
 * Track Core Web Vitals
 */
function trackWebVitals() {
    // Largest Contentful Paint
    trackLCP();

    // First Input Delay
    trackFID();

    // Cumulative Layout Shift
    trackCLS();

    // First Contentful Paint
    trackFCP();
}

/**
 * Track Largest Contentful Paint
 */
function trackLCP() {
    try {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            trackEvent('web_vitals', 'LCP', Math.round(lastEntry.startTime));
        });
        observer.observe({entryTypes: ['largest-contentful-paint']});
    } catch (error) {
        console.error('Failed to track LCP:', error);
    }
}

/**
 * Track First Input Delay
 */
function trackFID() {
    try {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                trackEvent('web_vitals', 'FID', Math.round(entry.processingStart - entry.startTime));
            });
        });
        observer.observe({entryTypes: ['first-input']});
    } catch (error) {
        console.error('Failed to track FID:', error);
    }
}

/**
 * Track Cumulative Layout Shift
 */
function trackCLS() {
    try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    trackEvent('web_vitals', 'CLS', Math.round(clsValue * 1000) / 1000);
                }
            });
        });
        observer.observe({entryTypes: ['layout-shift']});
    } catch (error) {
        console.error('Failed to track CLS:', error);
    }
}

/**
 * Track First Contentful Paint
 */
function trackFCP() {
    try {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
                trackEvent('web_vitals', 'FCP', Math.round(fcpEntry.startTime));
            }
        });
        observer.observe({entryTypes: ['paint']});
    } catch (error) {
        console.error('Failed to track FCP:', error);
    }
}

/**
 * Get First Paint time
 */
function getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const fpEntry = paintEntries.find(entry => entry.name === 'first-paint');
    return fpEntry ? Math.round(fpEntry.startTime) : null;
}

/**
 * Get First Contentful Paint time
 */
function getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry ? Math.round(fcpEntry.startTime) : null;
}

/**
 * Initialize Error Tracking
 */
function initErrorTracking() {
    // Track JavaScript errors
    window.addEventListener('error', (event) => {
        const errorInfo = {
            message: event.message,
            filename: event.filename,
            line: event.lineno,
            column: event.colno,
            error: event.error?.stack
        };

        if (ANALYTICS_CONFIG.errors.logToConsole) {
            console.error('JavaScript Error:', errorInfo);
        }

        trackEvent('error', 'javascript_error', JSON.stringify(errorInfo));
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        const rejectionInfo = {
            reason: event.reason,
            promise: event.promise
        };

        if (ANALYTICS_CONFIG.errors.logToConsole) {
            console.error('Unhandled Promise Rejection:', rejectionInfo);
        }

        trackEvent('error', 'promise_rejection', JSON.stringify(rejectionInfo));
    });

    // Track resource loading errors
    window.addEventListener('error', (event) => {
        if (event.target !== window) {
            const resourceError = {
                tagName: event.target.tagName,
                src: event.target.src || event.target.href,
                type: event.target.type || ''
            };

            trackEvent('error', 'resource_error', JSON.stringify(resourceError));
        }
    }, true);
}

/**
 * Track Custom Event
 */
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }

    // Custom tracking (send to your analytics server)
    // sendToAnalyticsServer(category, action, label);
}

/**
 * Utility function: Throttle
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize analytics when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
    initAnalytics();
}