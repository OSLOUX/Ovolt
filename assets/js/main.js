// ===== MAIN JAVASCRIPT FILE FOR OVOLT WEBSITE =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== TAB FUNCTIONALITY =====
    const tabButtons = document.querySelectorAll('.tab__button');
    const tabPanels = document.querySelectorAll('.tab__panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('tab__button--active'));
            tabPanels.forEach(panel => panel.classList.remove('tab__panel--active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('tab__button--active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('tab__panel--active');
            }
        });
    });
    
    // ===== HERO CAROUSEL FUNCTIONALITY =====
    const carouselDots = document.querySelectorAll('.carousel__dot');
    const carouselCards = document.querySelectorAll('.hero__card');
    let currentSlide = 0;
    
    function showSlide(slideIndex) {
        // Remove active classes
        carouselDots.forEach(dot => dot.classList.remove('carousel__dot--active'));
        carouselCards.forEach(card => card.classList.remove('hero__card--active'));
        
        // Add active classes to current slide
        carouselDots[slideIndex].classList.add('carousel__dot--active');
        carouselCards[slideIndex].classList.add('hero__card--active');
        
        currentSlide = slideIndex;
    }
    
    // Dot click handlers
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-play carousel
    function autoPlayCarousel() {
        const nextSlide = (currentSlide + 1) % carouselCards.length;
        showSlide(nextSlide);
    }
    
    // Start auto-play
    let carouselInterval = setInterval(autoPlayCarousel, 4000);
    
    // Pause on hover
    const carouselContainer = document.querySelector('.hero__carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(autoPlayCarousel, 4000);
        });
    }
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    const logo = document.querySelector('.nav__logo .logo');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(26, 44, 61, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            
            // Logo küçültme efekti - responsive boyutlar
            if (logo) {
                const screenWidth = window.innerWidth;
                if (screenWidth <= 480) {
                    // Mobile: 104px -> 94px
                    logo.style.width = '94px';
                    logo.style.height = '36px';
                } else if (screenWidth <= 768) {
                    // Tablet: 138px -> 128px
                    logo.style.width = '128px';
                    logo.style.height = '50px';
                } else {
                    // Desktop: 173px -> 163px
                    logo.style.width = '163px';
                    logo.style.height = '57px';
                }
            }
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
            
            // Logo orijinal boyutuna döndürme - responsive boyutlar
            if (logo) {
                const screenWidth = window.innerWidth;
                if (screenWidth <= 480) {
                    // Mobile: orijinal 104px
                    logo.style.width = '104px';
                    logo.style.height = '40px';
                } else if (screenWidth <= 768) {
                    // Tablet: orijinal 138px
                    logo.style.width = '138px';
                    logo.style.height = '54px';
                } else {
                    // Desktop: orijinal 173px
                    logo.style.width = '173px';
                    logo.style.height = '67px';
                }
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== SCROLL REVEAL ANIMATION =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Add scroll reveal class to elements
    const revealElements = document.querySelectorAll('.service-points__content, .tariffs__grid, .individual-fleet__content, .contact__content, .features__grid, .partnerships__logos, .mobile-app__content, .sustainability__content');
    revealElements.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
    
    // ===== FORM VALIDATION AND SUBMISSION =====
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Lütfen tüm alanları doldurun.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Gönderiliyor...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Mesajınız başarıyla gönderildi!', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // ===== EMAIL VALIDATION HELPER =====
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close">&times;</button>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeButton = notification.querySelector('.notification__close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ===== COUNTER ANIMATION =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }
        
        updateCounter();
    }
    
    // ===== SERVICE POINTS COUNTER =====
    const servicePointsCounter = document.querySelector('.service-points__count');
    if (servicePointsCounter) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(servicePointsCounter, 1880);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(servicePointsCounter);
    }
    
    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===== PARALLAX EFFECT FOR HERO SECTION =====
    const heroBackground = document.querySelector('.hero__background');
    const heroFlash = document.querySelector('.hero__flash');
    
    if (heroBackground || heroFlash) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${parallax}px)`;
            }
            if (heroFlash) {
                heroFlash.style.transform = `translateY(${parallax * 0.5}px)`;
            }
        });
    }
    
    // ===== TARIFF CARD HOVER EFFECTS =====
    const tariffCards = document.querySelectorAll('.tariff__card');
    tariffCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('tariff__card--featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // ===== MOBILE APP DOWNLOAD BUTTONS =====
    const downloadButtons = document.querySelectorAll('.download-link');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('img').alt.includes('App Store') ? 'iOS' : 'Android';
            showNotification(`${platform} uygulaması yakında yayında!`, 'info');
        });
    });
    
    // ===== PARTNERSHIP LOGOS ANIMATION =====
    const partnershipLogos = document.querySelectorAll('.partnership__logo');
    partnershipLogos.forEach((logo, index) => {
        logo.style.animationDelay = `${index * 0.1}s`;
        logo.classList.add('animate-fade-in-up');
    });
    
    // ===== ACCESSIBILITY IMPROVEMENTS =====
    
    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Scroll-based animations and effects
    }, 16);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // You could send error reports to a logging service here
    });
    
    // ===== CONSOLE WELCOME MESSAGE =====
    console.log(`
    🚗⚡ Ovolt Elektrikli Araç Şarj İstasyonu
    ======================================
    
    Web sitesi başarıyla yüklendi!
    
    Özellikler:
    ✅ Responsive tasarım
    ✅ Modern animasyonlar
    ✅ Erişilebilirlik desteği
    ✅ Performans optimizasyonu
    
    Geliştirici: AI Assistant
    Versiyon: 1.0.0
    `);
    
});

// ===== UTILITY FUNCTIONS =====

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get device type
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

// Format phone number
function formatPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2 $3 $4');
}

// Local storage helpers
const storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('LocalStorage not available');
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    }
};

// Export functions for potential use in other scripts
window.OvoltUtils = {
    isInViewport,
    getDeviceType,
    formatPhoneNumber,
    storage
};
