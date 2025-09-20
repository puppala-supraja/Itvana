// Main JavaScript file for ITVANAA website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typewriter effect
    initTypewriter();
    
    function initTypewriter() {
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;
        
        const phrases = [
            'Technology Excellence',
            'Digital Innovation',
            'Cloud Solutions',
            'IT Consulting',
            'Business Growth',
            'Cyber Security'
        ];
        
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function type() {
            const current = phrases[currentPhrase];
            
            if (isDeleting) {
                typewriterElement.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typewriterElement.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }
            
            // Cursor effect is handled by CSS
            
            let typeSpeed = 100;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!isDeleting && currentChar === current.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    }
    // Scroll animations
    initScrollAnimations();
    
    function initParallaxImages() {
        const parallaxElements = document.querySelectorAll('.parallax-image');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrollTop;
                const elementHeight = element.offsetHeight;
                const windowHeight = window.innerHeight;
                
                // Check if element is in viewport
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(scrollTop - elementTop) * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
    }
    
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all cards and sections
        const animatedElements = document.querySelectorAll('.card, .service-card, .team-avatar, .stat-item');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    function initEnhancedScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Parallax effect for background patterns
            const patternElements = document.querySelectorAll('.pattern-bg');
            patternElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const speed = 0.1;
                    const yPos = scrollTop * speed;
                    element.style.backgroundPosition = `${yPos}px ${yPos}px, ${50 + yPos}px ${50 + yPos}px`;
                }
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
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
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Parallax scrolling effect for images
    initParallaxImages();
    
    // Enhanced scroll effects
    initEnhancedScrollEffects();
    
    // Form validation and submission
    const contactForm = document.querySelector('form[method="POST"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Clear previous errors
            document.querySelectorAll('.text-danger').forEach(el => {
                el.textContent = '';
            });
            
            // Validate required fields
            const requiredFields = contactForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                }
            });
            
            // Validate email
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    showFieldError(emailField, 'Please enter a valid email address');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                return false;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.innerHTML = '<span class="loading me-2"></span>Sending...';
                submitButton.disabled = true;
                
                // Re-enable button after 3 seconds (fallback)
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }
    
    // Newsletter form
    const newsletterForms = document.querySelectorAll('form[action*="newsletter"]');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    e.preventDefault();
                    showAlert('Please enter a valid email address', 'danger');
                    return false;
                }
            }
        });
    });
    
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Testimonial slider (if multiple testimonials)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Auto-advance slides
        if (totalSlides > 1) {
            setInterval(nextSlide, 5000);
        }
    }
    
    // Stats counter animation
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        animateNumber(stat);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(statsSection);
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
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
    
    // Auto-hide alerts
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.opacity = '0';
                setTimeout(() => {
                    alert.remove();
                }, 300);
            }
        }, 5000);
    });
});

// Utility functions
function showFieldError(field, message) {
    const errorDiv = field.parentNode.querySelector('.text-danger') || 
                    document.createElement('div');
    errorDiv.className = 'text-danger small mt-1';
    errorDiv.textContent = message;
    
    if (!field.parentNode.querySelector('.text-danger')) {
        field.parentNode.appendChild(errorDiv);
    }
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => {
                alertDiv.remove();
            }, 300);
        }, 5000);
    }
}

function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        document.title = 'Come back! - ITVANAA';
    } else {
        // Page is visible
        document.title = 'ITVANAA - Professional IT Consulting Services';
    }
});

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading classes
    document.body.classList.remove('loading');
    
    // Lazy load non-critical resources
    const lazyElements = document.querySelectorAll('.lazy-load');
    lazyElements.forEach(element => {
        element.classList.remove('lazy-load');
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to a logging service here
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
