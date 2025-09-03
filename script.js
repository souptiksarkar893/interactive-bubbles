// Get canvas and context
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('resetBtn');

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
    { x: 520, y: 100, targetX: 80 + 30 + 20, targetY: 100, isMoving: false, originalX: 520 }, // 80 (circle x) + 30 (radius) + 20 (arrow size)
    { x: 520, y: 180, targetX: 80 + 30 + 20, targetY: 180, isMoving: false, originalX: 520 },
    { x: 520, y: 260, targetX: 80 + 30 + 20, targetY: 260, isMoving: false, originalX: 520 },
    { x: 520, y: 340, targetX: 80 + 30 + 20, targetY: 340, isMoving: false, originalX: 520 }
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
        const targetX = scaledCircleX + CIRCLE_RADIUS + (ARROW_SIZE * 0.5); // Position arrow tip at circle edge
        
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

// Animation frame ID for controlling animation
let animationId = null;

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
            } else {
                // Move arrow towards circle
                arrow.x += dx > 0 ? scaledAnimationSpeed : -scaledAnimationSpeed;
            }
        }
    });

    draw();

    if (anyMoving) {
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
        const touch = event.touches[0];
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
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
                
                // Start animation if not already running
                if (!animationId) {
                    animate();
                }
            }
        }
    });
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

    // Redraw
    draw();
}

// Event listeners
canvas.addEventListener('click', handleCanvasInteraction);
canvas.addEventListener('touchstart', handleCanvasInteraction);
resetBtn.addEventListener('click', resetApp);

// Handle window resize
window.addEventListener('resize', () => {
    initializeCanvas();
    draw();
});

// Initialize and draw
initializeCanvas();
draw();
