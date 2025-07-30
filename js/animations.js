/* ==========================================================================
   Animations JavaScript - UKM Kewirausahaan UNESA Kampus 5
   ========================================================================== */

// Animation constants
const ANIMATION_DURATION = 600;
const ANIMATION_DELAY = 100;
const INTERSECTION_THRESHOLD = 0.1;

// Animation classes
const ANIMATION_CLASSES = {
    fadeIn: 'fade-in',
    slideUp: 'slide-up',
    slideDown: 'slide-down',
    slideLeft: 'slide-left',
    slideRight: 'slide-right',
    scaleUp: 'scale-up',
    scaleDown: 'scale-down',
    rotateIn: 'rotate-in',
    bounceIn: 'bounce-in',
    flipIn: 'flip-in',
    zoomIn: 'zoom-in'
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeHoverAnimations();
    initializeLoadingAnimations();
    initializeParallaxEffects();
    initializeCounterAnimations();
    initializeTextAnimations();
    createAnimationStyles();
});

// Scroll-based animations
function initializeScrollAnimations() {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animation') || 'fadeIn';
                const delay = element.getAttribute('data-delay') || index * ANIMATION_DELAY;
                
                setTimeout(() => {
                    element.classList.add(ANIMATION_CLASSES[animationType] || ANIMATION_CLASSES.fadeIn);
                    element.classList.add('animated');
                }, delay);
                
                // Unobserve after animation
                animationObserver.unobserve(element);
            }
        });
    }, {
        threshold: INTERSECTION_THRESHOLD,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Auto-detect elements for animation
    const autoAnimateElements = document.querySelectorAll('.section-header, .program-card, .startup-card, .stat-card, .testimonial-card');
    autoAnimateElements.forEach((element, index) => {
        if (!element.hasAttribute('data-animation')) {
            element.setAttribute('data-animation', 'fadeIn');
            element.setAttribute('data-delay', index * 100);
        }
        animationObserver.observe(element);
    });
}

// Hover animations
function initializeHoverAnimations() {
    // Card hover effects
    const cards = document.querySelectorAll('.program-card, .startup-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Icon hover effects
    const icons = document.querySelectorAll('.program-icon, .stat-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Loading animations
function initializeLoadingAnimations() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        // Create loading animation sequence
        const loader = loadingScreen.querySelector('.loader');
        
        // Animate loader entrance
        setTimeout(() => {
            loader.style.opacity = '1';
            loader.style.transform = 'scale(1)';
        }, 100);
        
        // Animate loader exit
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transform = 'scale(0.8)';
        }, 1200);
    }
}

// Parallax effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.slide-bg, .parallax-element');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', function() {
        requestTick();
        ticking = false;
    });
}

// Counter animations
function initializeCounterAnimations() {
    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const minTimer = 50;
        const stepTime = Math.abs(Math.floor(duration / range));
        const timer = Math.max(stepTime, minTimer);
        
        const startTime = new Date().getTime();
        const endTime = startTime + duration;
        
        function run() {
            const now = new Date().getTime();
            const remaining = Math.max((endTime - now) / duration, 0);
            const value = Math.round(end - (remaining * range));
            
            element.textContent = value;
            
            if (value === end) {
                return;
            }
            
            setTimeout(run, timer);
        }
        
        run();
    }
    
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                
                animateCounter(counter, 0, target, duration);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Text animations
function initializeTextAnimations() {
    // Typing animation
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
    
    // Animated text elements
    const animatedTexts = document.querySelectorAll('.animated-text');
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.getAttribute('data-text') || element.textContent;
                const speed = parseInt(element.getAttribute('data-speed')) || 100;
                
                typeWriter(element, text, speed);
                textObserver.unobserve(element);
            }
        });
    });
    
    animatedTexts.forEach(text => {
        textObserver.observe(text);
    });
    
    // Highlight text animation
    const highlightTexts = document.querySelectorAll('.highlight-text');
    highlightTexts.forEach(text => {
        text.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #FFD700, #FFA500)';
            this.style.backgroundClip = 'text';
            this.style.webkitBackgroundClip = 'text';
            this.style.webkitTextFillColor = 'transparent';
            this.style.transition = 'all 0.3s ease';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.backgroundClip = '';
            this.style.webkitBackgroundClip = '';
            this.style.webkitTextFillColor = '';
        });
    });
}

// Create animation styles
function createAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Base animation styles */
        .animated {
            animation-duration: ${ANIMATION_DURATION}ms;
            animation-fill-mode: both;
        }
        
        /* Fade animations */
        .fade-in {
            opacity: 0;
            animation-name: fadeIn;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Slide animations */
        .slide-up {
            opacity: 0;
            transform: translateY(30px);
            animation-name: slideUp;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .slide-down {
            opacity: 0;
            transform: translateY(-30px);
            animation-name: slideDown;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .slide-left {
            opacity: 0;
            transform: translateX(-30px);
            animation-name: slideLeft;
        }
        
        @keyframes slideLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .slide-right {
            opacity: 0;
            transform: translateX(30px);
            animation-name: slideRight;
        }
        
        @keyframes slideRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        /* Scale animations */
        .scale-up {
            opacity: 0;
            transform: scale(0.8);
            animation-name: scaleUp;
        }
        
        @keyframes scaleUp {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .scale-down {
            opacity: 0;
            transform: scale(1.2);
            animation-name: scaleDown;
        }
        
        @keyframes scaleDown {
            from {
                opacity: 0;
                transform: scale(1.2);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        /* Rotate animations */
        .rotate-in {
            opacity: 0;
            transform: rotate(-180deg);
            animation-name: rotateIn;
        }
        
        @keyframes rotateIn {
            from {
                opacity: 0;
                transform: rotate(-180deg);
            }
            to {
                opacity: 1;
                transform: rotate(0deg);
            }
        }
        
        /* Bounce animations */
        .bounce-in {
            animation-name: bounceIn;
        }
        
        @keyframes bounceIn {
            0%, 20%, 40%, 60%, 80% {
                animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            }
            0% {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
            }
            20% {
                transform: scale3d(1.1, 1.1, 1.1);
            }
            40% {
                transform: scale3d(.9, .9, .9);
            }
            60% {
                opacity: 1;
                transform: scale3d(1.03, 1.03, 1.03);
            }
            80% {
                transform: scale3d(.97, .97, .97);
            }
            100% {
                opacity: 1;
                transform: scale3d(1, 1, 1);
            }
        }
        
        /* Flip animations */
        .flip-in {
            animation-name: flipIn;
        }
        
        @keyframes flipIn {
            from {
                transform: perspective(400px) rotateY(-90deg);
                opacity: 0;
            }
            40% {
                transform: perspective(400px) rotateY(-10deg);
            }
            70% {
                transform: perspective(400px) rotateY(10deg);
            }
            100% {
                transform: perspective(400px) rotateY(0deg);
                opacity: 1;
            }
        }
        
        /* Zoom animations */
        .zoom-in {
            opacity: 0;
            transform: scale(0.3);
            animation-name: zoomIn;
        }
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        /* Stagger animations */
        .stagger-animation > *:nth-child(1) { animation-delay: 0ms; }
        .stagger-animation > *:nth-child(2) { animation-delay: 100ms; }
        .stagger-animation > *:nth-child(3) { animation-delay: 200ms; }
        .stagger-animation > *:nth-child(4) { animation-delay: 300ms; }
        .stagger-animation > *:nth-child(5) { animation-delay: 400ms; }
        .stagger-animation > *:nth-child(6) { animation-delay: 500ms; }
        
        /* Pulse animation */
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        /* Shake animation */
        .shake {
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        /* Floating animation */
        .floating {
            animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        /* Gradient animation */
        .gradient-animation {
            background: linear-gradient(-45deg, #FFD700, #FFA500, #FF6B35, #27548A);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }
        
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
            .animated {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            
            .pulse, .floating, .gradient-animation {
                animation: none !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Animation utilities
function addAnimation(element, animationType, delay = 0) {
    setTimeout(() => {
        element.classList.add(ANIMATION_CLASSES[animationType] || ANIMATION_CLASSES.fadeIn);
        element.classList.add('animated');
    }, delay);
}

function removeAnimation(element, animationType) {
    element.classList.remove(ANIMATION_CLASSES[animationType] || ANIMATION_CLASSES.fadeIn);
    element.classList.remove('animated');
}

function animateSequence(elements, animationType, staggerDelay = 100) {
    elements.forEach((element, index) => {
        addAnimation(element, animationType, index * staggerDelay);
    });
}

// Export animation functions
window.AnimationUtils = {
    addAnimation,
    removeAnimation,
    animateSequence,
    ANIMATION_CLASSES
};