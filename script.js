// Get canvas and context
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('resetBtn');
const soundBtn = document.getElementById('soundBtn');

// Toggle sound function
function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    soundBtn.textContent = isSoundEnabled ? '🔊' : '🔇';
    soundBtn.title = isSoundEnabled ? 'Disable Sound' : 'Enable Sound';
}

// Configuration
let CANVAS_WIDTH = 600;
let CANVAS_HEIGHT = 400;
let CIRCLE_RADIUS = 30;
let ARROW_SIZE = 20;
const ANIMATION_SPEED = 3;

// Scale factors for responsive design
let scaleX = 1;
let scaleY = 1;

// Initialize responsive canvas
function initializeCanvas() {
    const container = canvas.parentElement;
    const maxWidth = Math.min(window.innerWidth - 20, 600);
    const maxHeight = Math.min(window.innerHeight - 150, 400);
    
    // Calculate scale to fit screen while maintaining aspect ratio
    const scale = Math.min(maxWidth / 600, maxHeight / 400, 1);
    
    CANVAS_WIDTH = 600 * scale;
    CANVAS_HEIGHT = 400 * scale;
    CIRCLE_RADIUS = 30 * scale;
    ARROW_SIZE = 20 * scale;
    
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    
    // Update scale factors for coordinate conversion
    scaleX = CANVAS_WIDTH / 600;
    scaleY = CANVAS_HEIGHT / 400;
    
    // Update circle and arrow positions based on new scale
    updatePositions();
}

// Circle positions and colors (base positions for 600x400 canvas)
const baseCircles = [
    { x: 80, y: 100, originalColor: '#FFD700', currentColor: '#FFD700' }, // Gold
    { x: 80, y: 180, originalColor: '#4169E1', currentColor: '#4169E1' }, // Blue
    { x: 80, y: 260, originalColor: '#DC143C', currentColor: '#DC143C' }, // Red
    { x: 80, y: 340, originalColor: '#32CD32', currentColor: '#32CD32' }  // Green
];

// Arrow positions and animation state (base positions for 600x400 canvas)
const baseArrows = [
    { x: 520, y: 100, targetX: 110, targetY: 100, isMoving: false, originalX: 520 }, // Will be recalculated in updatePositions
    { x: 520, y: 180, targetX: 110, targetY: 180, isMoving: false, originalX: 520 },
    { x: 520, y: 260, targetX: 110, targetY: 260, isMoving: false, originalX: 520 },
    { x: 520, y: 340, targetX: 110, targetY: 340, isMoving: false, originalX: 520 }
];

// Scaled positions
let circles = [];
let arrows = [];

// Update positions based on canvas scale
function updatePositions() {
    circles = baseCircles.map(circle => ({
        ...circle,
        x: circle.x * scaleX,
        y: circle.y * scaleY
    }));
    
    arrows = baseArrows.map((arrow, index) => {
        const scaledCircleX = baseCircles[index].x * scaleX;
        // Arrow tip is at (x - ARROW_SIZE), so we need to position the arrow such that
        // its tip (x - ARROW_SIZE) touches the circle edge (scaledCircleX + CIRCLE_RADIUS)
        const targetX = scaledCircleX + CIRCLE_RADIUS + ARROW_SIZE;
        
        return {
            ...arrow,
            x: arrow.x * scaleX,
            y: arrow.y * scaleY,
            targetX: targetX,
            targetY: arrow.targetY * scaleY,
            originalX: arrow.originalX * scaleX
        };
    });
}

// Hit colors for when arrows hit circles
const hitColors = ['#FFA500', '#808080', '#800080', '#2F4F4F']; // Orange, Gray, Purple, Dark Slate Gray

// Particle system for explosion effects
let particles = [];

class Particle {
    constructor(x, y, color = '#FFA500') {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 10 * Math.min(scaleX, scaleY);
        this.vy = (Math.random() - 0.5) * 10 * Math.min(scaleX, scaleY);
        this.color = color;
        this.life = 1.0; // Increase lifespan to be more visible
        this.decay = 0.04; // Slower decay for better visibility
        this.size = Math.random() * 4 + 3; // Larger particles for better visibility
        console.log(`Particle created at (${x}, ${y}) with life ${this.life}, size ${this.size}, color ${color}`);
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96; // Moderate deceleration for splash effect
        this.vy *= 0.96;
        this.life -= this.decay;
        this.size *= 0.96; // Gradual size reduction
    }
    
    draw() {
        if (this.life > 0) {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * Math.min(scaleX, scaleY), 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
            console.log(`Drawing particle at (${this.x}, ${this.y}) with size ${this.size * Math.min(scaleX, scaleY)}, life ${this.life}`);
        }
    }
    
    isDead() {
        return this.life <= 0;
    }
}

function createExplosion(x, y, color) {
    const particleCount = 15; // Increase particle count for better visibility
    console.log(`Creating explosion at (${x}, ${y}) with color ${color}`); // Debug log
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color)); // Use the circle's hit color
    }
    console.log(`Total particles: ${particles.length}`); // Debug log
}

function updateParticles() {
    // Update all particles and remove dead ones
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw();
        
        // Remove particle if it's dead
        if (particle.isDead()) {
            particles.splice(i, 1);
        }
    }
    // Debug: log particle count when there are particles
    if (particles.length > 0) {
        console.log(`Active particles: ${particles.length}`);
    }
}

// Animation frame ID for controlling animation
let animationId = null;

// Sound effects using Web Audio API
let audioContext = null;
let isSoundEnabled = true;

// Initialize audio context
function initializeAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.warn('Web Audio API not supported');
        isSoundEnabled = false;
    }
}

// Create and play a hit sound effect
function playHitSound() {
    if (!audioContext || !isSoundEnabled) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Create a pleasant "pop" sound
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Draw a circle
function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Draw an arrow
function drawArrow(x, y, size) {
    ctx.fillStyle = '#000';
    
    // Draw arrow head (triangle)
    ctx.beginPath();
    ctx.moveTo(x - size, y);           // Left point (tip)
    ctx.lineTo(x, y - size/2);         // Top right point of head
    ctx.lineTo(x, y - size/4);         // Top inner point
    ctx.lineTo(x + size, y - size/4);  // Top right of tail
    ctx.lineTo(x + size, y + size/4);  // Bottom right of tail
    ctx.lineTo(x, y + size/4);         // Bottom inner point
    ctx.lineTo(x, y + size/2);         // Bottom right point of head
    ctx.closePath();
    ctx.fill();
}

// Draw all elements
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw circles
    circles.forEach(circle => {
        drawCircle(circle.x, circle.y, CIRCLE_RADIUS, circle.currentColor);
    });

    // Draw arrows
    arrows.forEach(arrow => {
        drawArrow(arrow.x, arrow.y, ARROW_SIZE);
    });
    
    // Update and draw particles
    updateParticles();
}

// Check if a point is inside a circle
function isPointInCircle(x, y, circleX, circleY, radius) {
    const distance = Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2));
    return distance <= radius;
}

// Animate arrow movement
function animate() {
    let anyMoving = false;
    const scaledAnimationSpeed = ANIMATION_SPEED * Math.min(scaleX, scaleY); // Scale animation speed

    arrows.forEach((arrow, index) => {
        if (arrow.isMoving) {
            anyMoving = true;
            
            // Calculate distance to target
            const dx = arrow.targetX - arrow.x;
            const distance = Math.abs(dx);

            if (distance <= scaledAnimationSpeed) {
                // Arrow has reached the circle
                arrow.x = arrow.targetX;
                arrow.isMoving = false;
                
                // Change circle color
                circles[index].currentColor = hitColors[index];
                
                // Play hit sound effect
                playHitSound();
                
                // Create particle explosion at circle position
                createExplosion(circles[index].x, circles[index].y, hitColors[index]);
                
                // Stronger haptic feedback on hit
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]); // Pattern: vibrate, pause, vibrate
                }
            } else {
                // Move arrow towards circle
                arrow.x += dx > 0 ? scaledAnimationSpeed : -scaledAnimationSpeed;
            }
        }
    });

    draw();

    // Continue animation if arrows are moving OR particles exist
    if (anyMoving || particles.length > 0) {
        animationId = requestAnimationFrame(animate);
    } else {
        animationId = null;
    }
}

// Handle canvas click and touch
function handleCanvasInteraction(event) {
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if (event.type === 'touchstart') {
        event.preventDefault(); // Prevent scrolling
        
        // Haptic feedback for mobile devices
        if (navigator.vibrate) {
            navigator.vibrate(50); // Short vibration
        }
        
        const touch = event.touches[0];
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
        
        // Visual feedback for touch
        showTouchFeedback(touch.clientX - rect.left, touch.clientY - rect.top);
    } else {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    }
    
    // Convert to canvas coordinates
    x = x * (CANVAS_WIDTH / rect.width);
    y = y * (CANVAS_HEIGHT / rect.height);

    // Check if click is inside any circle
    circles.forEach((circle, index) => {
        if (isPointInCircle(x, y, circle.x, circle.y, CIRCLE_RADIUS)) {
            // Start arrow animation if not already moving
            if (!arrows[index].isMoving) {
                arrows[index].isMoving = true;
                
                // Resume audio context on user interaction (required by browsers)
                if (audioContext && audioContext.state === 'suspended') {
                    audioContext.resume();
                }
                
                // Start animation if not already running
                if (!animationId) {
                    animate();
                }
            }
        }
    });
}

// Visual touch feedback
function showTouchFeedback(x, y) {
    const feedback = document.createElement('div');
    feedback.style.position = 'absolute';
    feedback.style.left = x + 'px';
    feedback.style.top = y + 'px';
    feedback.style.width = '20px';
    feedback.style.height = '20px';
    feedback.style.borderRadius = '50%';
    feedback.style.background = 'rgba(0, 123, 255, 0.5)';
    feedback.style.transform = 'translate(-50%, -50%)';
    feedback.style.pointerEvents = 'none';
    feedback.style.animation = 'touchRipple 0.3s ease-out forwards';
    
    canvas.parentElement.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentElement) {
            feedback.parentElement.removeChild(feedback);
        }
    }, 300);
}

// Reset the application
function resetApp() {
    // Stop any ongoing animation
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    // Reset arrow positions and states
    arrows.forEach(arrow => {
        arrow.x = arrow.originalX;
        arrow.isMoving = false;
    });

    // Reset circle colors
    circles.forEach(circle => {
        circle.currentColor = circle.originalColor;
    });
    
    // Clear all particles
    particles = [];

    // Redraw
    draw();
}

// Event listeners
canvas.addEventListener('click', handleCanvasInteraction);
canvas.addEventListener('touchstart', handleCanvasInteraction);
resetBtn.addEventListener('click', resetApp);
soundBtn.addEventListener('click', toggleSound);

// Handle window resize
window.addEventListener('resize', () => {
    initializeCanvas();
    draw();
});

// Initialize and draw
initializeCanvas();
initializeAudio();
draw();
