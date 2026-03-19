// Initialize EmailJS
(function() {
    emailjs.init("YOUR_ACTUAL_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Try to send email using EmailJS (if configured)
        if (typeof emailjs !== 'undefined' && emailjs.send) {
            await emailjs.send('YOUR_ACTUAL_SERVICE_ID', 'YOUR_ACTUAL_TEMPLATE_ID', formData);
            showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        } else {
            // Fallback: create mailto link in new window
            const subject = `Portfolio Contact from ${formData.name}`;
            const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
            const mailtoUrl = `mailto:israelite1804@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoUrl, '_blank');
            showMessage('Email client opened! Please send the email to complete.', 'success');
        }
        
        // Reset form
        contactForm.reset();
    } catch (error) {
        // Fallback: create mailto link in new window
        const subject = `Portfolio Contact from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        const mailtoUrl = `mailto:israelite1804@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl, '_blank');
        showMessage('Email client opened! Please send the email to complete.', 'success');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Show form message
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            
            // Animate skill bars when visible
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('loading');
    observer.observe(section);
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            const originalText = heroSubtitle.textContent;
            typeWriter(heroSubtitle, originalText, 60);
        }, originalText.length * 80);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 600;
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effect to skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    let errorMessage = '';

    if (!name) {
        errorMessage = 'Please enter your name';
        isValid = false;
    } else if (!email) {
        errorMessage = 'Please enter your email';
        isValid = false;
    } else if (!isValidEmail(email)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
    } else if (!message) {
        errorMessage = 'Please enter your message';
        isValid = false;
    } else if (message.length < 10) {
        errorMessage = 'Message must be at least 10 characters long';
        isValid = false;
    }

    if (!isValid) {
        showMessage(errorMessage, 'error');
    }

    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add form validation before submission
contactForm.addEventListener('submit', (e) => {
    if (!validateForm()) {
        e.preventDefault();
    }
});

// Add input validation feedback
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#f5576c';
        } else {
            input.style.borderColor = '';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = '';
    });
});

// Dark/Light mode toggle (optional feature)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 998;
        transition: var(--transition);
        box-shadow: var(--shadow);
    `;
    
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'translateY(-3px)';
        themeToggle.style.boxShadow = 'var(--shadow-hover)';
    });
    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'translateY(0)';
        themeToggle.style.boxShadow = 'var(--shadow)';
    });
    
    document.body.appendChild(themeToggle);
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        themeToggle.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        themeToggle.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    }
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        document.body.classList.add('light-theme');
        createThemeToggle();
        document.querySelector('.theme-toggle i').className = 'fas fa-sun';
    } else {
        createThemeToggle();
    }
}

// Initialize theme toggle (comment out if not using light theme)
// initTheme();

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-related functions here
}, 10));

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Console welcome message
console.log('%c🚀 Welcome to Israel Moses Portfolio!', 'color: #64ffda; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion and modern web technologies', 'color: #8892b0; font-size: 14px;');
