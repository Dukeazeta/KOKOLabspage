document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded successfully!');
    
    // You can add your JavaScript code here
    
    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            menuBtn.querySelector('i').classList.remove('fa-bars');
            menuBtn.querySelector('i').classList.add('fa-times');
            navLinks.classList.add('active');
        } else {
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
            navLinks.classList.remove('active');
        }
        menuOpen = !menuOpen;
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuOpen && !e.target.closest('.menu-btn') && !e.target.closest('.nav-links')) {
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
            navLinks.classList.remove('active');
            menuOpen = false;
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) {
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
                navLinks.classList.remove('active');
                menuOpen = false;
            }
        });
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            sunIcon.classList.remove('fa-sun');
            sunIcon.classList.add('fa-moon');
        }
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Toggle icon
        if (newTheme === 'dark') {
            sunIcon.classList.remove('fa-sun');
            sunIcon.classList.add('fa-moon');
        } else {
            sunIcon.classList.remove('fa-moon');
            sunIcon.classList.add('fa-sun');
        }
    });

    // Smooth scroll for anchor links
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

    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all app cards and sections
    document.querySelectorAll('.app-card, section').forEach(el => {
        el.classList.add('opacity-0');
        observer.observe(el);
    });

    // Apps filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const appCards = document.querySelectorAll('.app-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            appCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});
