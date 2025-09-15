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
        
        // Close menu when clicking on a link (except dropdown links)
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Don't close menu if this is a dropdown link
                const isDropdownLink = this.closest('.nav__item--dropdown');
                if (!isDropdownLink) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close menu when clicking on dropdown links
        const dropdownLinks = document.querySelectorAll('.nav__dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                // Also close any open dropdowns
                const dropdowns = document.querySelectorAll('.nav__dropdown');
                const toggles = document.querySelectorAll('.nav__dropdown-toggle');
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                toggles.forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
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
    
    // ===== DROPDOWN MENU FUNCTIONALITY =====
    const dropdownItems = document.querySelectorAll('.nav__item--dropdown');
    dropdownItems.forEach(item => {
        const dropdown = item.querySelector('.nav__dropdown');
        const link = item.querySelector('.nav__link');
        const toggle = item.querySelector('.nav__dropdown-toggle');
        
        // Desktop hover functionality
        if (window.innerWidth > 768) {
            item.addEventListener('mouseenter', function() {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            });
            
            item.addEventListener('mouseleave', function() {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            });
        }
        
        // Mobile collapse functionality
        if (window.innerWidth <= 768 && toggle) {
            // Make the link clickable to toggle dropdown
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                
                // Close all other dropdowns
                dropdownItems.forEach(otherItem => {
                    const otherDropdown = otherItem.querySelector('.nav__dropdown');
                    const otherToggle = otherItem.querySelector('.nav__dropdown-toggle');
                    if (otherDropdown !== dropdown && otherToggle) {
                        otherDropdown.classList.remove('active');
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current dropdown
                if (isExpanded) {
                    dropdown.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                } else {
                    dropdown.classList.add('active');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });
            
            // Also make toggle button clickable
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Close all other dropdowns
                dropdownItems.forEach(otherItem => {
                    const otherDropdown = otherItem.querySelector('.nav__dropdown');
                    const otherToggle = otherItem.querySelector('.nav__dropdown-toggle');
                    if (otherDropdown !== dropdown && otherToggle) {
                        otherDropdown.classList.remove('active');
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current dropdown
                if (isExpanded) {
                    dropdown.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    dropdown.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
    
    // Handle window resize for dropdown functionality
    window.addEventListener('resize', function() {
        const dropdowns = document.querySelectorAll('.nav__dropdown');
        const toggles = document.querySelectorAll('.nav__dropdown-toggle');
        
        dropdowns.forEach(dropdown => {
            if (window.innerWidth > 768) {
                // Desktop mode - reset all styles
                dropdown.style.display = '';
                dropdown.style.opacity = '';
                dropdown.style.visibility = '';
                dropdown.style.transform = '';
                dropdown.classList.remove('active');
            } else {
                // Mobile mode - ensure dropdowns are collapsed by default
                dropdown.classList.remove('active');
            }
        });
        
        // Reset toggle states
        toggles.forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
    
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
            header.style.backgroundColor = 'rgba(0, 82, 155, 0.9)';
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
    
    // ===== HERO SECTION ANIMATIONS =====
    function initHeroAnimations() {
        const heroTitle = document.querySelector('.hero__title');
        const heroSubtitle = document.querySelector('.hero__subtitle');
        const heroCarousel = document.querySelector('.hero__carousel-container');
        const heroFlash = document.querySelector('.hero__flash');
        
        // Hero animasyonlarını sayfa yüklendiğinde başlat
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.classList.add('animate-hero-title');
            }
        }, 100);
        
        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.classList.add('animate-hero-subtitle');
            }
        }, 400);
        
        setTimeout(() => {
            if (heroCarousel) {
                heroCarousel.classList.add('animate-hero-carousel');
            }
        }, 700);
        
        setTimeout(() => {
            if (heroFlash) {
                heroFlash.classList.add('animate-hero-flash');
            }
        }, 200);
    }
    
    // Hero animasyonlarını başlat
    initHeroAnimations();
    
    // ===== SERVICE POINTS SECTION ANIMATIONS =====
    function initServicePointsAnimations() {
        const servicePointsSection = document.querySelector('.service-points');
        const servicePointsTitle = document.querySelector('.service-points__title');
        const servicePointsCounter = document.querySelector('.service-points__counter');
        const servicePointsDescription = document.querySelector('.service-points__description');
        const servicePointsButton = document.querySelector('.service-points .btn-outline');
        
        if (!servicePointsSection) return;
        
        const servicePointsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Başlık animasyonu
                    setTimeout(() => {
                        if (servicePointsTitle) {
                            servicePointsTitle.classList.add('animate-service-points-title');
                        }
                    }, 100);
                    
                    // Sayaç animasyonu
                    setTimeout(() => {
                        if (servicePointsCounter) {
                            servicePointsCounter.classList.add('animate-service-points-counter');
                        }
                    }, 300);
                    
                    // Açıklama animasyonu
                    setTimeout(() => {
                        if (servicePointsDescription) {
                            servicePointsDescription.classList.add('animate-service-points-description');
                        }
                    }, 500);
                    
                    // Buton animasyonu
                    setTimeout(() => {
                        if (servicePointsButton) {
                            servicePointsButton.classList.add('animate-service-points-button');
                        }
                    }, 700);
                    
                    // Observer'ı kapat (sadece bir kez çalışsın)
                    servicePointsObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        servicePointsObserver.observe(servicePointsSection);
    }
    
    // Service Points animasyonlarını başlat
    initServicePointsAnimations();
    
    // ===== TARIFFS SECTION ANIMATIONS =====
    function initTariffsAnimations() {
        const tariffsSection = document.querySelector('.tariffs');
        const tariffsTitle = document.querySelector('.tariffs__title');
        const tariffsDescription = document.querySelector('.tariffs__description');
        const tariffsSubtitle = document.querySelector('.tariffs__subtitle');
        const tariffItems = document.querySelectorAll('.tariff__item');
        const tariffPrices = document.querySelectorAll('.tariff__price');
        
        if (!tariffsSection) return;
        
        const tariffsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Başlık animasyonu
                    setTimeout(() => {
                        if (tariffsTitle) {
                            tariffsTitle.classList.add('animate-tariffs-title');
                        }
                    }, 100);
                    
                    // Açıklama animasyonu
                    setTimeout(() => {
                        if (tariffsDescription) {
                            tariffsDescription.classList.add('animate-tariffs-description');
                        }
                    }, 200);
                    
                    // Alt başlık animasyonu
                    setTimeout(() => {
                        if (tariffsSubtitle) {
                            tariffsSubtitle.classList.add('animate-tariffs-subtitle');
                        }
                    }, 300);
                    
                    // Tarife kartları animasyonu (sırayla)
                    tariffItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-tariff-item');
                        }, 400 + (index * 150));
                    });
                    
                    // Fiyatlar animasyonu (sırayla)
                    tariffPrices.forEach((price, index) => {
                        setTimeout(() => {
                            price.classList.add('animate-tariff-price');
                        }, 600 + (index * 150));
                    });
                    
                    // Observer'ı kapat (sadece bir kez çalışsın)
                    tariffsObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        tariffsObserver.observe(tariffsSection);
    }
    
    // Tariffs animasyonlarını başlat
    initTariffsAnimations();
    
    // ===== OPET PARTNERSHIP SECTION ANIMATIONS =====
    function initOpetPartnershipAnimations() {
        const opetPartnershipSection = document.querySelector('.opet-partnership');
        const opetPartnershipTitle = document.querySelector('.opet-partnership__title');
        const opetPartnershipDescription = document.querySelector('.opet-partnership__description');
        
        if (!opetPartnershipSection) return;
        
        const opetPartnershipObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Başlık animasyonu
                    setTimeout(() => {
                        if (opetPartnershipTitle) {
                            opetPartnershipTitle.classList.add('animate-opet-partnership-title');
                        }
                    }, 100);
                    
                    // Açıklama animasyonu
                    setTimeout(() => {
                        if (opetPartnershipDescription) {
                            opetPartnershipDescription.classList.add('animate-opet-partnership-description');
                        }
                    }, 400);
                    
                    // Observer'ı kapat (sadece bir kez çalışsın)
                    opetPartnershipObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        opetPartnershipObserver.observe(opetPartnershipSection);
    }
    
    // Opet Partnership animasyonlarını başlat
    initOpetPartnershipAnimations();
    
    // ===== MOBILE APP SECTION ANIMATIONS =====
    function initMobileAppAnimations() {
        const mobileAppSection = document.querySelector('.mobile-app');
        const mobileAppHeading = document.querySelector('.mobile-app__heading');
        const mobileAppText = document.querySelector('.mobile-app__text');
        const mobileAppButtons = document.querySelector('.mobile-app__buttons');
        const mobileAppLogo = document.querySelector('.ovolt-logo');
        const mobileAppPhone = document.querySelector('.phone-img');
        
        if (!mobileAppSection) return;
        
        const mobileAppObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Başlık animasyonu
                    setTimeout(() => {
                        if (mobileAppHeading) {
                            mobileAppHeading.classList.add('animate-mobile-app-heading');
                        }
                    }, 100);
                    
                    // Açıklama animasyonu
                    setTimeout(() => {
                        if (mobileAppText) {
                            mobileAppText.classList.add('animate-mobile-app-text');
                        }
                    }, 200);
                    
                    // Butonlar animasyonu
                    setTimeout(() => {
                        if (mobileAppButtons) {
                            mobileAppButtons.classList.add('animate-mobile-app-buttons');
                        }
                    }, 300);
                    
                    // Logo animasyonu
                    setTimeout(() => {
                        if (mobileAppLogo) {
                            mobileAppLogo.classList.add('animate-mobile-app-logo');
                        }
                    }, 400);
                    
                    // Telefon animasyonu
                    setTimeout(() => {
                        if (mobileAppPhone) {
                            mobileAppPhone.classList.add('animate-mobile-app-phone');
                        }
                    }, 500);
                    
                    // Observer'ı kapat (sadece bir kez çalışsın)
                    mobileAppObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        mobileAppObserver.observe(mobileAppSection);
    }
    
    // Mobile App animasyonlarını başlat
    initMobileAppAnimations();
    
    // ===== INDIVIDUAL/FLEET SECTION ANIMATIONS =====
    function initIndividualFleetAnimations() {
        const individualFleetSection = document.querySelector('.individual-fleet');
        const tabButtons = document.querySelectorAll('.individual-fleet .tab__button');
        const tabDescriptions = document.querySelectorAll('.individual-fleet .tab__description');
        const individualFleetButton = document.querySelector('.individual-fleet .btn-outline');
        const individualFleetImage = document.querySelector('.individual-fleet__img');
        
        if (!individualFleetSection) return;
        
        const individualFleetObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Tab butonları animasyonu (sırayla)
                    tabButtons.forEach((button, index) => {
                        setTimeout(() => {
                            button.classList.add('animate-individual-fleet-tab');
                        }, 100 + (index * 200));
                    });
                    
                    // Tab açıklamaları animasyonu (sırayla)
                    tabDescriptions.forEach((description, index) => {
                        setTimeout(() => {
                            description.classList.add('animate-individual-fleet-description');
                        }, 300 + (index * 200));
                    });
                    
                    // Buton animasyonu
                    setTimeout(() => {
                        if (individualFleetButton) {
                            individualFleetButton.classList.add('animate-individual-fleet-button');
                        }
                    }, 500);
                    
                    // Görsel animasyonu
                    setTimeout(() => {
                        if (individualFleetImage) {
                            individualFleetImage.classList.add('animate-individual-fleet-image');
                        }
                    }, 700);
                    
                    // Observer'ı kapat (sadece bir kez çalışsın)
                    individualFleetObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        individualFleetObserver.observe(individualFleetSection);
    }
    
    // Individual/Fleet animasyonlarını başlat
    initIndividualFleetAnimations();
    
    // ===== CONTACT SECTION ANIMATIONS =====
    function initContactAnimations() {
        const contactSection = document.querySelector('.contact');
        const contactHeading = document.querySelector('.contact__heading');
        const contactText = document.querySelector('.contact__text');
        const contactButton = document.querySelector('.contact .btn-outline');
        
        if (!contactSection) return;
        
        const contactObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Başlık animasyonu
                    setTimeout(() => {
                        if (contactHeading) {
                            contactHeading.classList.add('animate-contact-heading');
                        }
                    }, 100);
                    
                    // Açıklama animasyonu
                    setTimeout(() => {
                        if (contactText) {
                            contactText.classList.add('animate-contact-text');
                        }
                    }, 200);
                    
                    // Buton animasyonu
                    setTimeout(() => {
                        if (contactButton) {
                            contactButton.classList.add('animate-contact-button');
                        }
                    }, 300);
                    
                    // Observer'ı kapat (sadece bir kez çalışsın)
                    contactObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        contactObserver.observe(contactSection);
    }
    
    // Contact animasyonlarını başlat
    initContactAnimations();
    
    // ===== FEATURES SECTION ANIMATIONS =====
    function initFeaturesAnimations() {
        const featuresSection = document.querySelector('.features');
        const featureCards = document.querySelectorAll('.feature__card');
        const featureContents = document.querySelectorAll('.feature__content');
        const featureStats = document.querySelectorAll('.feature__stats');
        
        if (!featuresSection) return;
        
        const featuresObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Feature kartları animasyonu (sırayla)
                    featureCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-feature-card');
                        }, 100 + (index * 200));
                    });
                    
                    // Feature içerikleri animasyonu (sırayla)
                    featureContents.forEach((content, index) => {
                        setTimeout(() => {
                            content.classList.add('animate-feature-content');
                        }, 300 + (index * 200));
                    });
                    
                    // Feature istatistikleri animasyonu (sırayla)
                    featureStats.forEach((stats, index) => {
                        setTimeout(() => {
                            stats.classList.add('animate-feature-stats');
                        }, 500 + (index * 200));
                    });
                    
                    // Observer'ı kapat (sadece bir kez çalışsın)
                    featuresObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        featuresObserver.observe(featuresSection);
    }
    
    // Features animasyonlarını başlat
    initFeaturesAnimations();
    
    // ===== SUSTAINABILITY SECTION ANIMATIONS =====
    function initSustainabilityAnimations() {
        const sustainabilitySection = document.querySelector('.sustainability');
        const sustainabilityTitle = document.querySelector('.sustainability__title');
        const sustainabilityDescriptions = document.querySelectorAll('.sustainability__description');
        
        if (!sustainabilitySection) return;
        
        const sustainabilityObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Başlık animasyonu
                    setTimeout(() => {
                        if (sustainabilityTitle) {
                            sustainabilityTitle.classList.add('animate-sustainability-title');
                        }
                    }, 100);
                    
                    // Açıklama paragrafları animasyonu (sırayla)
                    sustainabilityDescriptions.forEach((description, index) => {
                        setTimeout(() => {
                            description.classList.add('animate-sustainability-description');
                        }, 300 + (index * 200));
                    });
                    
                    // Observer'ı kapat (sadece bir kez çalışsın)
                    sustainabilityObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        sustainabilityObserver.observe(sustainabilitySection);
    }
    
    // Sustainability animasyonlarını başlat
    initSustainabilityAnimations();
    
    // ===== PARTNERSHIPS SECTION ANIMATIONS =====
    function initPartnershipsAnimations() {
        const partnershipsSection = document.querySelector('.partnerships');
        const partnershipsDescription = document.querySelector('.partnerships__description');
        const partnershipsHeading = document.querySelector('.partnerships__heading');
        const partnershipsLogos = document.querySelector('.partnerships__logos');
        
        if (!partnershipsSection) return;
        
        const partnershipsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Açıklama animasyonu
                    setTimeout(() => {
                        if (partnershipsDescription) {
                            partnershipsDescription.classList.add('animate-partnerships-description');
                        }
                    }, 100);
                    
                    // Başlık animasyonu
                    setTimeout(() => {
                        if (partnershipsHeading) {
                            partnershipsHeading.classList.add('animate-partnerships-heading');
                        }
                    }, 200);
                    
                    // Logo carousel animasyonu
                    setTimeout(() => {
                        if (partnershipsLogos) {
                            partnershipsLogos.classList.add('animate-partnerships-logos');
                        }
                    }, 300);
                    
                    // Observer'ı kapat (sadece bir kez çalışsın)
                    partnershipsObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        partnershipsObserver.observe(partnershipsSection);
    }
    
    // Partnerships animasyonlarını başlat
    initPartnershipsAnimations();
    
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
    
    // Station icons animation trigger
    const stationIcons = document.querySelectorAll('.station-icon');
    const stationIconsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset and restart animation
                entry.target.style.animation = 'none';
                entry.target.offsetHeight; // Trigger reflow
                entry.target.style.animation = null;
                
                // Add pulse animation after pop-in animation completes
                setTimeout(() => {
                    entry.target.classList.add('animate-pulse');
                }, 800); // Wait for pop-in animation to complete
                
                stationIconsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    stationIcons.forEach(icon => {
        stationIconsObserver.observe(icon);
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
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
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

// ===== PARTNERSHIPS SLIDER =====
class PartnershipsSlider {
    constructor() {
        this.slider = document.querySelector('.partnerships__logos');
        this.logos = document.querySelectorAll('.partnership__logo');
        this.currentIndex = 0;
        this.isPaused = false;
        this.autoSlideInterval = null;
        this.slideDuration = 3000; // 3 saniye
        this.totalSlides = 0;
        
        if (this.slider && this.logos.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.createInfiniteLoop();
        this.setupSlider();
        this.startAutoSlide();
        this.addEventListeners();
    }
    
    createInfiniteLoop() {
        // Orijinal logoları ve divider'ları klonla
        const originalElements = Array.from(this.slider.children);
        
        // 30 logo olana kadar klonla (6 orijinal + 24 klon = 30) - daha fazla klon
        for (let i = 0; i < 24; i++) {
            const originalIndex = i % 6; // 6 orijinal logo var
            const logoIndex = originalIndex * 2; // Her logo için 2 element (logo + divider)
            const dividerIndex = originalIndex * 2 + 1;
            
            // Element'lerin var olduğunu kontrol et
            if (originalElements[logoIndex] && originalElements[dividerIndex]) {
                const clonedLogo = originalElements[logoIndex].cloneNode(true);
                const clonedDivider = originalElements[dividerIndex].cloneNode(true);
                
                this.slider.appendChild(clonedLogo);
                this.slider.appendChild(clonedDivider);
            }
        }
        
        // Tüm logoları yeniden seç (orijinal + klonlar)
        this.logos = document.querySelectorAll('.partnership__logo');
        this.totalSlides = 30; // Toplam 30 logo - daha fazla logo
    }
    
    setupSlider() {
        // Slider container'ı ayarla
        this.slider.style.display = 'flex';
        this.slider.style.transition = 'transform 0.5s ease-in-out';
        this.slider.style.transform = 'translateX(0)';
        
        // Responsive logo genişliği hesapla (logo + divider + gap)
        const isMobile = window.innerWidth <= 768;
        const logoSize = isMobile ? 100 : 120;
        const dividerWidth = 1;
        const gap = isMobile ? 16 : 32;
        this.logoWidth = logoSize + dividerWidth + gap; // logo + divider + gap
        
        // Slider'ı toplam logo sayısına göre ayarla
        this.slider.style.width = `${this.logoWidth * this.totalSlides}px`;
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, this.slideDuration);
    }
    
    nextSlide() {
        this.currentIndex++;
        
        // 30 logoya geldiysek başa dön (sonsuz loop)
        if (this.currentIndex >= this.totalSlides) {
            this.currentIndex = 0;
            // Smooth geçiş için transition'ı geçici olarak kapat
            this.slider.style.transition = 'none';
            this.updateSliderPosition();
            // Bir sonraki frame'de transition'ı geri aç
            requestAnimationFrame(() => {
                this.slider.style.transition = 'transform 0.5s ease-in-out';
            });
        } else {
            this.updateSliderPosition();
        }
    }
    
    updateSliderPosition() {
        const translateX = -this.currentIndex * this.logoWidth;
        this.slider.style.transform = `translateX(${translateX}px)`;
    }
    
    pauseSlider() {
        this.isPaused = true;
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
    
    resumeSlider() {
        this.isPaused = false;
        this.startAutoSlide();
    }
    
    addEventListeners() {
        // Hover'da durdur
        this.slider.addEventListener('mouseenter', () => {
            this.pauseSlider();
        });
        
        // Hover'dan çıkınca devam et
        this.slider.addEventListener('mouseleave', () => {
            this.resumeSlider();
        });
        
        // Logo hover efektleri
        this.logos.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                logo.style.transform = 'scale(1.1)';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.transform = 'scale(1)';
            });
        });
    }
    
    destroy() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
}

// Initialize Partnerships Slider
let partnershipsSlider;

// Export functions for potential use in other scripts
window.OvoltUtils = {
    isInViewport,
    getDeviceType,
    formatPhoneNumber,
    storage
};

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    partnershipsSlider = new PartnershipsSlider();
    
    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
