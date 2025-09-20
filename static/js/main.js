// Enhanced JavaScript for ITVANAA website with modern animations

document.addEventListener('DOMContentLoaded', function() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    const pathLength = progressCircle ? progressCircle.getTotalLength() : 0;
    if (progressCircle) {
        progressCircle.style.strokeDasharray = pathLength;
        progressCircle.style.strokeDashoffset = pathLength;
    }

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

    // Parallax effect for hero section
    if (!prefersReducedMotion) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                const speed = scrolled * 0.5;
                heroSection.style.transform = `translateY(${speed}px)`;
            }
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

    // Text typing effect for hero
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle && !prefersReducedMotion) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        setTimeout(typeWriter, 1000);
    }

    // Initialize all animations
    if (!prefersReducedMotion) {
        initAnimations();
    }
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