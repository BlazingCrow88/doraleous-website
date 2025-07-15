/* ===================================
   SOCIAL MEDIA CONFIGURATION FOR GITHUB PAGES
   File: assets/js/media-config.js
   =================================== */

/**
 * Simplified Social Media Configuration for Doraleous and Associates
 * 
 * This configuration is designed for static site deployment on GitHub Pages
 * and focuses on client-side functionality including:
 * - Social sharing buttons
 * - ConvertKit email integration
 * - Manual posting workflow support
 * - Basic analytics tracking
 */

// Social Media Account Configuration (for manual posting reference)
const SOCIAL_ACCOUNTS = {
    twitter: {
        handle: '@doraleousadventures',
        url: 'https://twitter.com/doraleousadventures',
        name: 'Doraleous and Associates'
    },
    facebook: {
        handle: 'doraleousandassociates',
        url: 'https://facebook.com/doraleousandassociates',
        name: 'Doraleous and Associates'
    },
    instagram: {
        handle: '@doraleousadventures',
        url: 'https://instagram.com/doraleousadventures',
        name: 'Doraleous and Associates'
    },
    youtube: {
        handle: '@doraleousadventures',
        url: 'https://youtube.com/@doraleousadventures',
        name: 'Doraleous and Associates'
    },
    pinterest: {
        handle: 'doraleousadventures',
        url: 'https://pinterest.com/doraleousadventures',
        name: 'Doraleous and Associates'
    },
    tiktok: {
        handle: '@doraleousadventures',
        url: 'https://tiktok.com/@doraleousadventures',
        name: 'Doraleous and Associates'
    }
};

// ConvertKit Configuration
const CONVERTKIT_CONFIG = {
    formId: 'your-convertkit-form-id-here', // Replace with actual form ID
    apiKey: 'your-convertkit-api-key-here', // Replace with actual API key (public key only)
    tags: ['fantasy-reader', 'doraleous-fan', 'newsletter-subscriber'],
    successMessage: 'Welcome to the adventure! Check your email for your character guide.',
    errorMessage: 'Oops! Something went wrong. Please try again.'
};

// Content Categories for Social Sharing
const CONTENT_CATEGORIES = {
    'character-spotlight': {
        hashtags: ['#CharacterSpotlight', '#FantasyCharacters', '#DoraleousAndAssociates', '#EpicFantasy'],
        defaultText: 'Meet the heroes of Doraleous and Associates!'
    },
    'world-lore': {
        hashtags: ['#WorldBuilding', '#FantasyLore', '#EpicFantasy', '#DoraleousWorld'],
        defaultText: 'Discover the rich world of Doraleous and Associates!'
    },
    'adventure-tales': {
        hashtags: ['#AdventureTales', '#EpicQuests', '#FantasyAdventure', '#DoraleousAndAssociates'],
        defaultText: 'Epic adventures await in the world of Doraleous!'
    },
    'behind-scenes': {
        hashtags: ['#BehindTheScenes', '#WritingProcess', '#FantasyAuthor', '#BookCreation'],
        defaultText: 'Go behind the scenes of creating Doraleous and Associates!'
    },
    'book-update': {
        hashtags: ['#BookUpdate', '#NewRelease', '#FantasyBooks', '#DoraleousAndAssociates'],
        defaultText: 'Exciting news about Doraleous and Associates!'
    }
};

/**
 * Social Media Sharing Class
 * Handles sharing functionality across different platforms
 */
class SocialMediaSharing {
    constructor() {
        this.setupShareButtons();
        this.bindEvents();
    }

    /**
     * Setup share buttons on the page
     */
    setupShareButtons() {
        const shareButtons = document.querySelectorAll('.share-button');
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = button.getAttribute('data-platform');
                const url = button.getAttribute('data-url') || window.location.href;
                const title = button.getAttribute('data-title') || document.title;
                const description = button.getAttribute('data-description') || '';
                
                this.shareTo(platform, url, title, description);
            });
        });
    }

    /**
     * Share content to specific platform
     */
    shareTo(platform, url, title, description = '') {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        const encodedDescription = encodeURIComponent(description);
        
        let shareUrl = '';
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'pinterest':
                shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`;
                break;
            default:
                console.warn('Unknown sharing platform:', platform);
                return;
        }
        
        if (platform === 'email') {
            window.location.href = shareUrl;
        } else {
            this.openShareWindow(shareUrl);
        }
    }

    /**
     * Open share window with optimal dimensions
     */
    openShareWindow(url) {
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        
        window.open(
            url,
            'share',
            `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
        );
    }

    /**
     * Bind additional event listeners
     */
    bindEvents() {
        // Copy link functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-link')) {
                const url = e.target.getAttribute('data-url') || window.location.href;
                this.copyToClipboard(url);
            }
        });
    }

    /**
     * Copy URL to clipboard
     */
    copyToClipboard(url) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                this.showCopyFeedback();
            }).catch(err => {
                console.error('Could not copy text: ', err);
                this.fallbackCopyTextToClipboard(url);
            });
        } else {
            this.fallbackCopyTextToClipboard(url);
        }
    }

    /**
     * Fallback copy method for older browsers
     */
    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopyFeedback();
        } catch (err) {
            console.error('Fallback: Could not copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }

    /**
     * Show copy feedback to user
     */
    showCopyFeedback() {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.textContent = 'Link copied to clipboard!';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1B4332;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: 'Open Sans', sans-serif;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 3000);
    }
}

/**
 * ConvertKit Email Integration Class
 * Handles newsletter signup forms with GitHub Pages compatibility
 */
class ConvertKitIntegration {
    constructor() {
        this.setupNewsletterForms();
        this.setupEventListeners();
    }

    /**
     * Setup newsletter signup forms for GitHub Pages
     */
    setupNewsletterForms() {
        const forms = document.querySelectorAll('.newsletter-form');
        forms.forEach(form => {
            // Set up ConvertKit form action
            form.setAttribute('action', `https://app.convertkit.com/forms/${CONVERTKIT_CONFIG.formId}/subscriptions`);
            form.setAttribute('method', 'post');
            form.setAttribute('target', '_blank'); // GitHub Pages friendly
            
            // Add hidden fields for ConvertKit
            this.addConvertKitFields(form);
        });
    }

    /**
     * Add hidden fields required by ConvertKit
     */
    addConvertKitFields(form) {
        // Add UTF-8 field
        const utf8Field = document.createElement('input');
        utf8Field.type = 'hidden';
        utf8Field.name = 'utf8';
        utf8Field.value = '✓';
        form.appendChild(utf8Field);

        // Add tags field
        const tagsField = document.createElement('input');
        tagsField.type = 'hidden';
        tagsField.name = 'tags';
        tagsField.value = CONVERTKIT_CONFIG.tags.join(',');
        form.appendChild(tagsField);

        // Add source tracking
        const sourceField = document.createElement('input');
        sourceField.type = 'hidden';
        sourceField.name = 'source';
        sourceField.value = window.location.pathname;
        form.appendChild(sourceField);
    }

    /**
     * Setup event listeners for form submissions
     */
    setupEventListeners() {
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('newsletter-form')) {
                this.handleFormSubmission(e);
            }
        });
    }

    /**
     * Handle newsletter form submission
     */
    handleFormSubmission(e) {
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        
        if (!this.validateEmail(email)) {
            e.preventDefault();
            this.showMessage(form, CONVERTKIT_CONFIG.errorMessage, 'error');
            return;
        }

        // Track the signup attempt
        this.trackNewsletterSignup();
        
        // Show loading state
        this.showLoadingState(form);
        
        // Let form submit naturally to ConvertKit
        // Success/error handling will be done by ConvertKit's redirect
    }

    /**
     * Validate email address
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Show loading state on form
     */
    showLoadingState(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
        }
    }

    /**
     * Show message to user
     */
    showMessage(form, message, type = 'success') {
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const div = document.createElement('div');
        div.className = `form-message ${type}`;
        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; background: ${type === 'success' ? '#059669' : '#DC2626'}; color: white; border-radius: 5px; margin-top: 1rem;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <p>${message}</p>
            </div>
        `;
        form.appendChild(div);
        
        return div;
    }

    /**
     * Track newsletter signup for analytics
     */
    trackNewsletterSignup() {
        // Google Analytics 4 tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                method: 'website_form',
                source: window.location.pathname
            });
        }

        console.log('Newsletter signup tracked from:', window.location.pathname);
    }
}

/**
 * Social Media Content Helper Class
 */
class SocialContentHelper {
    /**
     * Generate optimized content for social platforms
     */
    static generateSocialContent(contentType, customText = '') {
        const category = CONTENT_CATEGORIES[contentType] || CONTENT_CATEGORIES['book-update'];
        const hashtags = category.hashtags.join(' ');
        const baseText = customText || category.defaultText;
        
        return {
            twitter: this.optimizeForTwitter(baseText, hashtags),
            facebook: this.optimizeForFacebook(baseText, hashtags),
            instagram: this.optimizeForInstagram(baseText, hashtags),
            general: `${baseText} ${hashtags}`
        };
    }

    /**
     * Optimize content for Twitter
     */
    static optimizeForTwitter(text, hashtags) {
        const maxLength = 280;
        const hashtagLength = hashtags.length + 1; // +1 for space
        const availableLength = maxLength - hashtagLength;
        
        let optimizedText = text;
        if (text.length > availableLength) {
            optimizedText = text.substring(0, availableLength - 3) + '...';
        }
        
        return `${optimizedText} ${hashtags}`;
    }

    /**
     * Optimize content for Facebook
     */
    static optimizeForFacebook(text, hashtags) {
        // Facebook allows longer content
        return `${text}\n\n${hashtags}`;
    }

    /**
     * Optimize content for Instagram
     */
    static optimizeForInstagram(text, hashtags) {
        // Instagram allows long captions
        return `${text}\n\n${hashtags}\n\n#bookstagram #fantasy #epicfantasy #booklovers #reading`;
    }
}

/**
 * Main Social Media Manager Class
 */
class SocialMediaManager {
    constructor() {
        this.sharing = new SocialMediaSharing();
        this.convertkit = new ConvertKitIntegration();
        this.setupUtilityFunctions();
    }

    /**
     * Setup utility functions
     */
    setupUtilityFunctions() {
        // Make copy function globally available
        window.SocialMediaManager = {
            copyToClipboard: this.copyToClipboard,
            generateContent: SocialContentHelper.generateSocialContent,
            getAccounts: () => SOCIAL_ACCOUNTS
        };
    }

    /**
     * Copy URL to clipboard
     */
    copyToClipboard(url) {
        navigator.clipboard.writeText(url).then(() => {
            // Show success feedback
            const event = new CustomEvent('linkCopied', { detail: { url } });
            document.dispatchEvent(event);
            
            // Temporary visual feedback
            const copyButtons = document.querySelectorAll('.copy-link');
            copyButtons.forEach(btn => {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                btn.style.background = '#059669';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 2000);
            });
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SocialMediaManager();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SocialMediaManager,
        SocialContentHelper,
        SOCIAL_ACCOUNTS,
        CONVERTKIT_CONFIG
    };
}
