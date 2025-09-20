// Enhanced JavaScript for ITVANAA website with modern animations

document.addEventListener('DOMContentLoaded', function() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Enhanced navbar scroll effect
    const navbar = document.getElementById('mainNavbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (!prefersReducedMotion) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Enhanced scroll reveal animations
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-scale');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Enhanced scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Stats counter animation
    const animateStats = () => {
        const statsNumbers = document.querySelectorAll('.stats-number');
        statsNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 40);
        });
    };

    // Stats observer
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                setTimeout(animateStats, 500);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-card');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Hero SVG animation
    const heroSvg = document.querySelector('.hero-svg');
    if (heroSvg && !prefersReducedMotion) {
        // Add floating animation to SVG elements
        const circles = heroSvg.querySelectorAll('circle');
        circles.forEach((circle, index) => {
            circle.style.transformOrigin = 'center';
            circle.style.animation = `heroFloat ${6 + index}s ease-in-out infinite`;
            circle.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!prefersReducedMotion) {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Service card tilt effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        if (!prefersReducedMotion) {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        }
    });

    // Testimonial card hover effects
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!prefersReducedMotion) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
            }
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });

    // Auto-hide alerts with slide animation
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            if (alert && alert.parentNode) {
                alert.style.transition = 'all 0.5s ease-out';
                alert.style.transform = 'translateX(100%)';
                alert.style.opacity = '0';
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.parentNode.removeChild(alert);
                    }
                }, 500);
            }
        }, 5000);
    });

    // Form validation enhancements
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('form[action*="newsletter"]');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const email = this.querySelector('input[type="email"]');
            if (email && email.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value)) {
                    e.preventDefault();
                    ITVanaaUtils.showNotification('Please enter a valid email address.', 'warning');
                    return false;
                }
            }
        });
    }

    // Enhanced loading animation for form submit
    const submitButtons = document.querySelectorAll('button[type="submit"], input[type="submit"]');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('form');
            if (form && form.checkValidity()) {
                const originalText = this.innerHTML;
                this.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
                this.disabled = true;
                
                // Re-enable after 5 seconds if form hasn't submitted
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 5000);
            }
        });
    });

    // Navbar active link highlighting with smooth transition
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
            link.style.color = 'var(--primary-color)';
        }
    });

    // Enhanced scroll to top with progress indicator
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="white" stroke-width="2"/>
            <path d="M8 12l4-4 4 4" stroke="white" stroke-width="2" fill="none"/>
        </svg>
    `;
    scrollToTop.className = 'btn btn-primary position-fixed';
    scrollToTop.style.cssText = `
        bottom: 30px; 
        right: 30px; 
        z-index: 1000; 
        border-radius: 50%; 
        width: 60px; 
        height: 60px; 
        display: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;
    scrollToTop.setAttribute('title', 'Back to top');
    document.body.appendChild(scrollToTop);

    // Progress circle for scroll indicator
    const progressCircle = scrollToTop.querySelector('circle');
    let pathLength = 0;
    
    // Wait for element to be rendered before calling getTotalLength
    setTimeout(() => {
        if (progressCircle && progressCircle.isConnected) {
            try {
                pathLength = progressCircle.getTotalLength();
                progressCircle.style.strokeDasharray = pathLength;
                progressCircle.style.strokeDashoffset = pathLength;
            } catch (e) {
                // Fallback for when getTotalLength fails
                pathLength = 62.83; // approximate circumference for r=10
                progressCircle.style.strokeDasharray = pathLength;
                progressCircle.style.strokeDashoffset = pathLength;
            }
        }
    }, 100);

    // Show/hide scroll to top button with progress
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrolled / docHeight;

        if (scrolled > 300) {
            scrollToTop.style.display = 'flex';
            scrollToTop.style.alignItems = 'center';
            scrollToTop.style.justifyContent = 'center';
        } else {
            scrollToTop.style.display = 'none';
        }

        if (progressCircle) {
            progressCircle.style.strokeDashoffset = pathLength - (pathLength * progress);
        }
    });

    // Scroll to top when clicked
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Enhanced parallax effects
    if (!prefersReducedMotion) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            const sections = document.querySelectorAll('.section');
            
            // Hero parallax
            if (heroSection) {
                const speed = scrolled * 0.3;
                heroSection.style.transform = `translateY(${speed}px)`;
                
                // Add rotation to hero SVG
                const heroSvg = heroSection.querySelector('.hero-svg');
                if (heroSvg) {
                    heroSvg.style.transform = `rotate(${scrolled * 0.1}deg)`;
                }
            }
            
            // Parallax for other sections
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const speed = (scrolled - (section.offsetTop - window.innerHeight)) * 0.1;
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    section.style.transform = `translateY(${speed}px)`;
                }
            });
            
            // Floating elements animation
            const floatingElements = document.querySelectorAll('.service-icon, .stats-number');
            floatingElements.forEach((element, index) => {
                const speed = Math.sin(scrolled * 0.01 + index) * 10;
                element.style.transform = `translateY(${speed}px)`;
            });
        });
    }

    // Initialize AOS-like animations for elements
    const initAnimations = () => {
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(element => {
            const animationType = element.getAttribute('data-animate');
            const delay = element.getAttribute('data-delay') || 0;
            
            setTimeout(() => {
                element.classList.add('animate-' + animationType);
            }, delay);
        });
    };

    // Enhanced text animations
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle && !prefersReducedMotion) {
        // Animate gradient text
        const gradientText = heroTitle.querySelector('.text-gradient');
        if (gradientText) {
            let angle = 0;
            setInterval(() => {
                angle += 2;
                gradientText.style.background = `linear-gradient(${angle}deg, var(--primary-color) 0%, var(--accent-color) 50%, var(--bright-pink) 100%)`;
                gradientText.style.webkitBackgroundClip = 'text';
                gradientText.style.backgroundClip = 'text';
            }, 100);
        }
    }
    
    // Add magnetic effect to buttons
    const magneticButtons = document.querySelectorAll('.btn');
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            if (!prefersReducedMotion) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
    
    // Add glitch effect to navbar brand
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand && !prefersReducedMotion) {
        setInterval(() => {
            navbarBrand.style.textShadow = `
                ${Math.random() * 2}px ${Math.random() * 2}px 0 rgba(0, 212, 255, 0.8),
                ${Math.random() * -2}px ${Math.random() * 2}px 0 rgba(255, 29, 142, 0.8)
            `;
            
            setTimeout(() => {
                navbarBrand.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
            }, 100);
        }, 3000);
    }

    // Initialize all animations
    if (!prefersReducedMotion) {
        initAnimations();
    }
    
    // Add smooth cursor following effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    if (!prefersReducedMotion) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
    }
    
    // Add loading screen with animation
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--gradient-hero);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loadingScreen.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem; animation: pulse 2s ease-in-out infinite;">
                ✨ ITVANAA
            </div>
            <div style="width: 50px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; margin: 0 auto; overflow: hidden;">
                <div style="width: 100%; height: 100%; background: white; border-radius: 2px; transform: translateX(-100%); animation: loadingBar 2s ease-in-out infinite;"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Add CSS animations for loading
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .custom-cursor {
            display: none;
        }
        @media (min-width: 768px) {
            .custom-cursor {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
});

// Utility functions
window.ITVanaaUtils = {
    // Show notification
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    },

    // Format phone number
    formatPhoneNumber: function(input) {
        const phoneNumber = input.value.replace(/\D/g, '');
        const formattedNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        if (phoneNumber.length === 10) {
            input.value = formattedNumber;
        }
    },

    // Validate email
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};