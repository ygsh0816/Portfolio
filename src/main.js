const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const autoReplyTemplateID = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
(function() {
    emailjs.init("publicKey"); // Replace with your valid EmailJS key
})();

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Sticky header
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const backToTop = document.querySelector('.back-to-top');

    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
        backToTop.classList.add('active');
    } else {
        header.classList.remove('header-scrolled');
        backToTop.classList.remove('active');
    }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.innerHTML = navLinks.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Portfolio filter
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        // Filter portfolio items
        document.querySelectorAll('.portfolio-card').forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = ''; // Reset to default CSS
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}

// Run animation check on load
window.addEventListener('load', animateOnScroll);

// Run animation check on scroll
window.addEventListener('scroll', animateOnScroll);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;

    if (scrolled < window.innerHeight) {
        document.querySelector('.hero').style.backgroundPositionY = scrolled * 0.3 + 'px';
    }
});

// Random floating animations for skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animationDelay = (index * 0.2) + 's';

    // Add subtle floating animation
    card.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite alternate`;
});

// Handle form submission (prevent default for demo)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Send auto-reply to the user
    const userEmail = document.querySelector('#email').value; // Get user's email
    console.log(userEmail);
    emailjs.send(serviceID, autoReplyTemplateID, {
        email: userEmail, // Send auto-reply to the user's email
        name: document.querySelector('#name').value, // User's name
    }).then(function () {
        console.log("Auto-reply sent successfully!");
    }).catch(function (error) {
        console.error("Failed to send auto-reply:", error);
    });

    // Send form details to yourself
    emailjs.sendForm(serviceID, templateID, this)
        .then(function () {
            alert("Message sent successfully!");
            contactForm.reset();
        }).catch(function (error) {
            alert("Failed to send message. Please try again later.");
            console.error("EmailJS Error:", error);
        });
    });
}

// Typed.js-like text effect
document.addEventListener('DOMContentLoaded', function() {
    const typedElement = document.querySelector('.hero h1 .gradient-text');
    const phrases = ['Yogesh Kumar', 'A Software Engineer'];
    let currentPhrase = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const current = phrases[currentPhrase];

        if (isDeleting) {
            // Deleting text
            typedElement.textContent = current.substring(0, letterIndex - 1);
            letterIndex--;
            typeSpeed = 50;
        } else {
            // Typing text
            typedElement.textContent = current.substring(0, letterIndex + 1);
            letterIndex++;
            typeSpeed = 150;
        }

        // Handle phrase change
        if (!isDeleting && letterIndex === current.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of phrase
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start the typing effect
    setTimeout(typeEffect, 1000);
});
