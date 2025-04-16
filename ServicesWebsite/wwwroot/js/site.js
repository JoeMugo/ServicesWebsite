// JRon Services - Site JavaScript

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 100,
            duration: 800,
            easing: 'ease-in-out',
            delay: 100,
            disable: window.innerWidth < 768
        });
    }

    // Sticky Header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Portfolio filtering
    const portfolioFilters = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                portfolioFilters.forEach(f => f.classList.remove('active'));
                // Add active class to clicked filter
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    function animateNumbers() {
        if (statNumbers.length > 0 && !counted) {
            const statsSection = document.querySelector('.stats');
            if (!statsSection) return;

            const sectionPosition = statsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if (sectionPosition < screenPosition - 100) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = Math.ceil(target / (duration / 20)); // Update every 20ms
                    
                    const counter = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            stat.textContent = stat.textContent.includes('+') ? 
                                target + '+' : target;
                            clearInterval(counter);
                        } else {
                            stat.textContent = stat.textContent.includes('+') ? 
                                count + '+' : count;
                        }
                    }, 20);
                });
                counted = true;
            }
        }
    }

    // Run once and on scroll
    animateNumbers();
    window.addEventListener('scroll', animateNumbers);

    // Mobile Navigation
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            document.body.classList.toggle('nav-open');
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar && navbar.classList.contains('show')) {
            if (!navbar.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarToggler.click();
            }
        }
    });

    // Contact form validation
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('is-invalid');
                }
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }
});
