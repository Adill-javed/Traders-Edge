// =============================================
// FAQ Accordion Interactivity
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        
        questionButton.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items first
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle active state for clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // =============================================
    // Testimonials Carousel Interactivity
    // =============================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlideIndex = 0;
    let slideInterval;

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlideIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlideIndex);
        });
    }

    window.currentSlide = function(index) {
        resetTimer();
        showSlide(index);
    };

    function startTimer() {
        slideInterval = setInterval(() => {
            showSlide(currentSlideIndex + 1);
        }, 5000);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    if (slides.length > 0) {
        startTimer();
    }

    // =============================================
    // Premium Scroll Reveal — Intersection Observer
    // =============================================
    const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-flip, .reveal-glow';
    const revealEls = document.querySelectorAll(revealSelectors);

    function revealElement(el) {
        el.classList.add('visible');
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tiny delay so the browser has painted before animating
                setTimeout(() => revealElement(entry.target), 40);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));

    // Safety net: reveal any element still invisible after 800ms
    // (handles edge cases where observer fires before layout is ready)
    setTimeout(() => {
        revealEls.forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, 800);

    // =============================================
    // Parallax Header — subtle vertical drift
    // =============================================
    const profileHeader = document.querySelector('.profile-header');

    function onScroll() {
        if (!profileHeader) return;
        const scrollY = window.scrollY;
        const drift = Math.min(scrollY * 0.18, 30);
        const opacity = Math.max(1 - scrollY * 0.0025, 0.4);
        profileHeader.style.transform = `translateY(-${drift}px)`;
        profileHeader.style.opacity = opacity;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
});
