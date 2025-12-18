// ===== Wedding Invitation Website JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initCountdown();
    initLanguageToggle();
    initLightbox();
    initScrollAnimations();
    initSmoothScroll();
});

// ===== Navigation Bar =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== Countdown Timer =====
function initCountdown() {
    const weddingDate = new Date('2026-02-08T12:00:00+08:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            // Wedding day has passed
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== Language Toggle =====
function initLanguageToggle() {
    const toggle = document.getElementById('langToggle');
    const zhElements = document.querySelectorAll('.lang-zh');
    const enElements = document.querySelectorAll('.lang-en');

    // Load saved language preference
    let currentLang = localStorage.getItem('wedding-lang') || 'zh';
    setLanguage(currentLang);

    toggle.addEventListener('click', function() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        setLanguage(currentLang);
        localStorage.setItem('wedding-lang', currentLang);
    });

    function setLanguage(lang) {
        if (lang === 'zh') {
            zhElements.forEach(el => el.style.display = '');
            enElements.forEach(el => el.style.display = 'none');
            document.documentElement.lang = 'zh-TW';
        } else {
            zhElements.forEach(el => el.style.display = 'none');
            enElements.forEach(el => el.style.display = '');
            document.documentElement.lang = 'en';
        }
    }
}

// ===== Photo Lightbox =====
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('.gallery-item');

    const images = [
        'assets/compression/DSC00009.jpg',
        'assets/compression/DSC00286.jpg',
        'assets/compression/DSC00370.jpg',
        'assets/compression/DSC00401.jpg',
        'assets/compression/DSC00521.jpg',
        'assets/compression/DSC00524.jpg',
        'assets/compression/DSC00535.jpg'
    ];

    let currentIndex = 0;

    // Open lightbox when clicking gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightboxImg.src = images[currentIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.detail-item, .gallery-item, .location-content, .rsvp-content');

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}
