gsap.registerPlugin(CustomEase);

gsap.set(".nav",{display:"none"})

CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

gsap.defaults({
    ease: "main",
    duration: 0.7
})

function initMenu() {
    let navWrap = document.querySelector(".nav")
    let state = navWrap.getAttribute("data-nav")
    let overlay = navWrap.querySelector(".overlay")
    let menu = navWrap.querySelector(".menu")
    let bgPanels = navWrap.querySelectorAll(".bg-panel")
    let menuToggles = document.querySelectorAll("[data-menu-toggle]")
    let menuLinks = navWrap.querySelectorAll(".menu-link")
    let fadeTargets = navWrap.querySelectorAll("[data-menu-fade]")
    let menuButton = document.querySelector(".menu-button")
    let menuButtonTexts = menuButton.querySelectorAll("p")
    let menuButtonIcon = menuButton.querySelector(".menu-button-icon")

    let tl = gsap.timeline()

    const openNav = () => {
        navWrap.setAttribute("data-nav", "open")

        tl.clear()
            .set(navWrap, { display: "block" })
            .set(menu, { xPercent: 0 }, "<")
            .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
            .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
            .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
            .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
            .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35")
            .fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, "<+=0.2")
    }

    const closeNav = () => {
        navWrap.setAttribute("data-nav", "closed")

        tl.clear()
            .to(overlay, { autoAlpha: 0 })
            .to(menu, { xPercent: 120 }, "<")
            .to(menuButtonTexts, { yPercent: 0 }, "<")
            .to(menuButtonIcon, { rotate: 0 }, "<")
            .set(navWrap, { display: "none" })
    }

    // Toggle menu open/close
    menuToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            state = navWrap.getAttribute("data-nav");
            if (state === "open") {
                closeNav();
            } else {
                openNav();
            }
        });
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navWrap.getAttribute("data-nav") === "open") {
            closeNav();
        }
    });
}

// Theme toggle functionality
function initTheme() {
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

        if (newTheme === 'dark') {
            sunIcon.classList.remove('fa-sun');
            sunIcon.classList.add('fa-moon');
        } else {
            sunIcon.classList.remove('fa-moon');
            sunIcon.classList.add('fa-sun');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    initTheme();
});
