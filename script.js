// FAQ Accordion Interactivity
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

    // Testimonials Carousel Interactivity
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlideIndex = 0;
    let slideInterval;

    function showSlide(index) {
        // Wrap around bounds
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }

        // Update active slide class
        slides.forEach((slide, i) => {
            if (i === currentSlideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update active dot class
        dots.forEach((dot, i) => {
            if (i === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Manual slide control via dots
    window.currentSlide = function(index) {
        resetTimer();
        showSlide(index);
    };

    function startTimer() {
        slideInterval = setInterval(() => {
            showSlide(currentSlideIndex + 1);
        }, 5000); // Rotates every 5 seconds
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    // Initialize the carousel timer
    if (slides.length > 0) {
        startTimer();
    }
});
