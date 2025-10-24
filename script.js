// ==========================================
// SMOOTH SCROLL REVEAL ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with reveal class
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});

// ==========================================
// CUSTOM CURSOR (Desktop Only)
// ==========================================
const createCustomCursor = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const cursorDot = document.createElement('div');
        const cursorOutline = document.createElement('div');
        
        cursorDot.className = 'cursor-dot';
        cursorOutline.className = 'cursor-outline';
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);
        
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });
        
        // Smooth follow for outline
        const animateOutline = () => {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateOutline);
        };
        animateOutline();
        
        // Scale up on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .interest-card, .phil-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'scale(1.5)';
                cursorOutline.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'scale(1)';
                cursorOutline.style.transform = 'scale(1)';
            });
        });
    }
};

// ==========================================
// ASCII LOGO - NO TYPEWRITER (instant display)
// ==========================================
const initLogo = () => {
    const asciiLogo = document.getElementById('asciiArt');
    if (!asciiLogo) return;
    
    // Logo appears instantly with fade-in animation from CSS
    // Add click handler to scroll to top
    asciiLogo.parentElement.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// ==========================================
// CYCLING TEXT ANIMATION WITH TYPEWRITER
// ==========================================
const cyclingTextAnimation = () => {
    const typewriterElement = document.getElementById('typewriterText');
    if (!typewriterElement) return;
    
    const phrases = [
        'connecting complexity to meaning',
        'pushing boundaries',
        'driving outcomes'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isTyping = false;
    
    const typeSpeed = 80;  // Speed of typing each character
    const pauseAfterTyping = 2500;  // Pause after finishing typing phrase
    const pauseBeforeNext = 300;  // Pause before starting next phrase
    
    const typePhrase = () => {
        // Prevent multiple instances running
        if (isTyping && currentCharIndex > 0) return;
        
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (currentCharIndex < currentPhrase.length) {
            isTyping = true;
            // Continue typing the current phrase
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            setTimeout(typePhrase, typeSpeed);
        } else if (currentCharIndex === currentPhrase.length) {
            // Finished typing current phrase, pause then move to next
            isTyping = false;
            setTimeout(() => {
                // Clear the text and move to next phrase
                typewriterElement.textContent = '';
                currentCharIndex = 0;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                // Start typing the next phrase
                setTimeout(typePhrase, pauseBeforeNext);
            }, pauseAfterTyping);
        }
    };
    
    // Start typing the first phrase
    typePhrase();
};

// Start the cycling text after the hero animations
setTimeout(cyclingTextAnimation, 2000);

// ==========================================
// PARALLAX SCROLL EFFECT
// ==========================================
const parallaxScroll = () => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    });
};

// ==========================================
// HIGHLIGHT ANIMATION ON SCROLL
// ==========================================
const animateHighlights = () => {
    const highlights = document.querySelectorAll('.highlight');
    
    highlights.forEach(highlight => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Create glowing effect
                    highlight.style.animation = 'glow 1.5s ease-in-out';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(highlight);
    });
};

// Add glow animation to stylesheet dynamically
const addGlowAnimation = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glow {
            0%, 100% {
                text-shadow: 0 0 5px rgba(0, 255, 136, 0.5);
            }
            50% {
                text-shadow: 0 0 20px rgba(0, 255, 136, 0.8),
                             0 0 30px rgba(0, 255, 136, 0.6);
            }
        }
    `;
    document.head.appendChild(style);
};

// ==========================================
// PHILOSOPHY CARD STAGGER ANIMATION
// ==========================================
const staggerPhilosophyCards = () => {
    const cards = document.querySelectorAll('.phil-card');
    
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
};

// ==========================================
// INTEREST CARDS HOVER EFFECT
// ==========================================
const enhanceInterestCards = () => {
    const cards = document.querySelectorAll('.interest-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(0, 255, 136, 0.1);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        .interest-card {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
};

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-accent), var(--color-accent-dim));
        width: 0%;
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
const smoothScrollLinks = () => {
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
};

// ==========================================
// ASCII BACKGROUND ANIMATION
// ==========================================
const createASCIIBackground = () => {
    const bgCanvas = document.createElement('canvas');
    bgCanvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.08;
        pointer-events: none;
    `;
    document.body.appendChild(bgCanvas);
    
    const ctx = bgCanvas.getContext('2d');
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    
    const characters = '01▓░▒█│─┤├┼╔╗╚╝║═╣╠╬┌┐└┘';
    const fontSize = 14;
    const columns = bgCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    const draw = () => {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        
        ctx.fillStyle = 'rgba(0, 255, 136, 0.85)';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const char = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > bgCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };
    
    setInterval(draw, 50);
    
    window.addEventListener('resize', () => {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    });
};

// ==========================================
// INITIALIZE ALL EFFECTS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Core animations
    initLogo();
    cyclingTextAnimation();
    parallaxScroll();
    
    // Enhancement features
    createCustomCursor();
    addGlowAnimation();
    animateHighlights();
    staggerPhilosophyCards();
    enhanceInterestCards();
    createScrollProgress();
    smoothScrollLinks();
    createASCIIBackground();
    
    // Add smooth entrance for body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-initialize any size-dependent features
        console.log('Viewport resized - layout adjusted');
    }, 250);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
    }
});

// Performance optimization: Reduce animations on low-end devices
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reducedMotionQuery.matches) {
    document.documentElement.style.setProperty('--transition-smooth', 'none');
    document.documentElement.style.setProperty('--transition-fast', 'none');
}
