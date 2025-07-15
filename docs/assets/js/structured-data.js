/* ===================================
   STRUCTURED DATA MANAGER FOR GITHUB PAGES
   File: assets/js/structured-data.js
   =================================== */

(function() {
    'use strict';

    // Configuration - Update these with your actual information and GitHub Pages URLs
    const CONFIG = {
        author: {
            name: "Brian M. Shoemaker",
            description: "Fantasy author and creator of the Doraleous and Associates series",
            image: "/assets/images/author/headshots/brian-shoemaker-professional.jpg",
            website: window.location.origin, // Automatically uses current domain
            email: "contact@brianmshoemaker.com", // Update with actual email
            socialMedia: {
                twitter: "https://twitter.com/doraleousadventures",
                facebook: "https://facebook.com/doraleousandassociates", 
                instagram: "https://instagram.com/doraleousadventures",
                youtube: "https://youtube.com/@doraleousadventures"
            }
        },
        website: {
            name: "Brian M. Shoemaker - Official Website",
            description: "Official website of fantasy novelist Brian M. Shoemaker, author of Doraleous and Associates"
        }
    };

    // Initialize structured data
    function init() {
        addAuthorData();
        addWebsiteData();
        
        // Add page-specific data based on current page
        const pageType = detectPageType();
        if (pageType === 'book') {
            addBookData();
        } else if (pageType === 'home') {
            addHomePageData();
        }
    }

    // Add author (Person) structured data
    function addAuthorData() {
        const authorSchema = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": CONFIG.author.name,
            "description": CONFIG.author.description,
            "url": CONFIG.author.website,
            "image": CONFIG.author.website + CONFIG.author.image,
            "jobTitle": "Author",
            "knowsAbout": ["Fantasy Literature", "World Building", "Creative Writing"],
            "sameAs": Object.values(CONFIG.author.socialMedia).filter(url => url),
            "worksFor": {
                "@type": "Organization",
                "name": "Independent Author"
            }
        };

        addStructuredData(authorSchema, 'author-schema');
    }

    // Add website structured data
    function addWebsiteData() {
        const websiteSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": CONFIG.website.name,
            "description": CONFIG.website.description,
            "url": CONFIG.author.website,
            "author": {
                "@type": "Person",
                "name": CONFIG.author.name
            },
            "potentialAction": {
                "@type": "SearchAction",
                "target": CONFIG.author.website + "/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };

        addStructuredData(websiteSchema, 'website-schema');
    }

    // Add book-specific structured data
    function addBookData() {
        // Detect if this is a specific book page
        const bookTitle = document.querySelector('h1')?.textContent || 'Doraleous and Associates';
        const bookDescription = document.querySelector('meta[name="description"]')?.content || 
                               document.querySelector('.book-description')?.textContent || 
                               'An epic fantasy adventure in the world of Aethermoor';
        
        const bookSchema = {
            "@context": "https://schema.org",
            "@type": "Book",
            "name": bookTitle,
            "description": bookDescription,
            "author": {
                "@type": "Person",
                "name": CONFIG.author.name,
                "url": CONFIG.author.website
            },
            "genre": ["Fantasy", "Epic Fantasy", "Adventure"],
            "bookFormat": "https://schema.org/Hardcover",
            "publisher": {
                "@type": "Organization",
                "name": "Independent"
            },
            "url": window.location.href,
            "mainEntityOfPage": window.location.href,
            "datePublished": "2024", // Update with actual publication date
            "inLanguage": "en-US"
        };

        // Add book cover image if available
        const bookCover = document.querySelector('.book-cover-image, .featured-book-cover, .hero-book-cover');
        if (bookCover) {
            bookSchema.image = CONFIG.author.website + bookCover.getAttribute('src');
        }

        addStructuredData(bookSchema, 'book-schema');
    }

    // Add homepage specific structured data
    function addHomePageData() {
        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": CONFIG.author.name,
            "url": CONFIG.author.website,
            "logo": CONFIG.author.website + "/assets/images/ui/logo.png", // Update if logo exists
            "sameAs": Object.values(CONFIG.author.socialMedia).filter(url => url),
            "foundingDate": "2024", // Update with actual start date
            "founder": {
                "@type": "Person",
                "name": CONFIG.author.name
            },
            "mainEntityOfPage": CONFIG.author.website
        };

        addStructuredData(organizationSchema, 'organization-schema');
    }

    // Helper function to add structured data to page
    function addStructuredData(schema, id) {
        // Remove existing schema with same ID
        const existing = document.getElementById(id);
        if (existing) {
            existing.remove();
        }

        // Create new script element
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        script.textContent = JSON.stringify(schema, null, 2);
        
        // Add to document head
        document.head.appendChild(script);
    }

    // Detect page type based on URL and content
    function detectPageType() {
        const path = window.location.pathname.toLowerCase();
        
        if (path === '/' || path.includes('index.html')) {
            return 'home';
        } else if (path.includes('/books/') || document.querySelector('.book-showcase')) {
            return 'book';
        } else if (path.includes('/about')) {
            return 'about';
        } else if (path.includes('/contact')) {
            return 'contact';
        } else if (path.includes('/blog/')) {
            return 'blog';
        }
        return 'general';
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for debugging
    window.StructuredDataManager = {
        config: CONFIG,
        detectPageType: detectPageType,
        addStructuredData: addStructuredData,
        reinitialize: init
    };

})();
