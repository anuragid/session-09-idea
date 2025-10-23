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
// ASCII ART TYPEWRITER EFFECT
// ==========================================
const typewriterEffect = () => {
    const asciiElement = document.getElementById('asciiArt');
    if (!asciiElement) return;
    
    const asciiText = asciiElement.textContent;
    asciiElement.textContent = '';
    asciiElement.style.opacity = '1';
    
    let charIndex = 0;
    const speed = 15; // milliseconds per character
    
    const type = () => {
        if (charIndex < asciiText.length) {
            asciiElement.textContent += asciiText.charAt(charIndex);
            charIndex++;
            setTimeout(type, speed);
        }
    };
    
    // Start typing after a short delay
    setTimeout(type, 300);
};

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
        opacity: 0.03;
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
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        
        ctx.fillStyle = '#00ff88';
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
    typewriterEffect();
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
