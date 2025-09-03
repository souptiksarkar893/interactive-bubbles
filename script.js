// Get canvas and context
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('resetBtn');

// Configuration
const CIRCLE_RADIUS = 30;
const ARROW_SIZE = 20;
const ANIMATION_SPEED = 3;

// Circle positions and colors
const circles = [
    { x: 80, y: 100, originalColor: '#FFD700', currentColor: '#FFD700' }, // Gold
    { x: 80, y: 180, originalColor: '#4169E1', currentColor: '#4169E1' }, // Blue
    { x: 80, y: 260, originalColor: '#DC143C', currentColor: '#DC143C' }, // Red
    { x: 80, y: 340, originalColor: '#32CD32', currentColor: '#32CD32' }  // Green
];

// Arrow positions and animation state
// Target X should be at circle edge (circle.x + radius + arrow size)
const arrows = [
    { x: 520, y: 100, targetX: 80 + CIRCLE_RADIUS + ARROW_SIZE, targetY: 100, isMoving: false, originalX: 520 },
    { x: 520, y: 180, targetX: 80 + CIRCLE_RADIUS + ARROW_SIZE, targetY: 180, isMoving: false, originalX: 520 },
    { x: 520, y: 260, targetX: 80 + CIRCLE_RADIUS + ARROW_SIZE, targetY: 260, isMoving: false, originalX: 520 },
    { x: 520, y: 340, targetX: 80 + CIRCLE_RADIUS + ARROW_SIZE, targetY: 340, isMoving: false, originalX: 520 }
];

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    arrows.forEach((arrow, index) => {
        if (arrow.isMoving) {
            anyMoving = true;
            
            // Calculate distance to target
            const dx = arrow.targetX - arrow.x;
            const distance = Math.abs(dx);

            if (distance <= ANIMATION_SPEED) {
                // Arrow has reached the circle
                arrow.x = arrow.targetX;
                arrow.isMoving = false;
                
                // Change circle color
                circles[index].currentColor = hitColors[index];
            } else {
                // Move arrow towards circle
                arrow.x += dx > 0 ? ANIMATION_SPEED : -ANIMATION_SPEED;
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

// Handle canvas click
function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

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
canvas.addEventListener('click', handleCanvasClick);
resetBtn.addEventListener('click', resetApp);

// Initial draw
draw();
