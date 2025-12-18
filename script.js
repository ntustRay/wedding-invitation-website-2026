// ===== Wedding Invitation Website JavaScript =====

// ===== Easter Egg for Developers =====
console.log(`
%c💒 MingRay & ShihYu Wedding 💒
%c徐明睿 & 陸詩羽
%c2026.02.08

%c    ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
    ♥                         ♥
    ♥   Thanks for visiting   ♥
    ♥     our wedding site!   ♥
    ♥                         ♥
    ♥   感謝您參加我們的婚禮   ♥
    ♥                         ♥
    ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥

%c👀 Hey developer! You found the secret!
%c🎉 We hope you enjoy our special day!
%c💕 Love conquers all ~ 愛能戰勝一切

%c— Built with ❤️ by MingRay —
`,
'color: #6b8e6b; font-size: 24px; font-weight: bold;',
'color: #6b8e6b; font-size: 18px;',
'color: #888; font-size: 14px;',
'color: #d4a5a5; font-size: 12px;',
'color: #ff6b6b; font-size: 14px; font-weight: bold;',
'color: #4ecdc4; font-size: 14px;',
'color: #ff6b6b; font-size: 14px;',
'color: #888; font-size: 11px; font-style: italic;'
);

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initCountdown();
    initLanguageToggle();
    initLightbox();
    initScrollAnimations();
    initSmoothScroll();
    initScrollButton();
    initMusic();
    initFooterEasterEgg();
});

// ===== Background Music =====
function initMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const iconOn = musicToggle.querySelector('.music-icon-on');
    const iconOff = musicToggle.querySelector('.music-icon-off');

    let isPlaying = false;

    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            iconOn.style.display = 'none';
            iconOff.style.display = 'block';
        } else {
            bgMusic.play().catch(function(error) {
                console.log('Audio play failed:', error);
            });
            musicToggle.classList.add('playing');
            iconOn.style.display = 'block';
            iconOff.style.display = 'none';
        }
        isPlaying = !isPlaying;
    });

    // Set initial volume
    bgMusic.volume = 0.5;
}

// ===== Footer Easter Egg =====
let footerClickCount = 0;
let footerClickTimer = null;

function initFooterEasterEgg() {
    const footer = document.querySelector('.footer');

    if (footer) {
        footer.style.cursor = 'pointer';
        footer.addEventListener('click', function(e) {
            e.stopPropagation();
            footerClickCount++;

            // Reset count after 3 seconds of no clicks
            clearTimeout(footerClickTimer);
            footerClickTimer = setTimeout(() => {
                footerClickCount = 0;
            }, 3000);

            if (footerClickCount === 3) {
                alert('別再按了，沒有彩蛋 🥚❌');
            } else if (footerClickCount === 6) {
                alert('真的沒有了啦！ 😤');
            } else if (footerClickCount === 9) {
                alert('好啦好啦，祝你們幸福快樂！ 💕🎉');
                footerClickCount = 0;
            }
        });
    }
}

// ===== Scroll Button =====
function initScrollButton() {
    const scrollBtn = document.getElementById('scrollBtn');

    // Show/hide button and toggle direction based on scroll position
    function updateScrollButton() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrolledToBottom = scrollTop + windowHeight >= documentHeight - 100;

        // Show button after scrolling 200px
        if (scrollTop > 200) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }

        // Toggle between up and down arrow
        if (scrolledToBottom) {
            scrollBtn.classList.add('at-bottom');
        } else {
            scrollBtn.classList.remove('at-bottom');
        }
    }

    // Scroll to top or bottom on click
    scrollBtn.addEventListener('click', function() {
        if (scrollBtn.classList.contains('at-bottom')) {
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Scroll to bottom
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }
    });

    window.addEventListener('scroll', updateScrollButton);
    updateScrollButton(); // Initial check
}

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
    let galleryTimer = null;
    let galleryEasterEggShown = false;

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

        // Easter egg: watching gallery for 8 seconds
        if (!galleryEasterEggShown) {
            galleryTimer = setTimeout(() => {
                alert('一直看，我們會害羞 😳💕');
                galleryEasterEggShown = true;
            }, 8000);
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';

        // Clear easter egg timer
        if (galleryTimer) {
            clearTimeout(galleryTimer);
            galleryTimer = null;
        }
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
