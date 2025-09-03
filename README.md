# Interactive Bubbles

An interactive HTML5 Canvas application featuring animated bubbles and arrows. Click on any circle to trigger arrow animations with dynamic color-changing effects.

## 🌐 Live Demo

**🎮 [Play the Interactive Bubbles App](https://souptiksarkar893.github.io/interactive-bubbles/)**

## 🎯 Features

### Module 1: Canvas Graphics

- **HTML5 Canvas**: Responsive canvas element that adapts to screen size
- **4 Colored Circles**: Positioned on the left side with distinct colors:
  - 🟡 Gold Circle
  - 🔵 Blue Circle
  - 🔴 Red Circle
  - 🟢 Green Circle
- **Arrow Graphics**: Corresponding arrows positioned on the right side
- **Responsive Design**: Automatically scales for mobile and desktop devices
- **Clean Design**: All elements drawn on a single canvas with proper styling

### Module 2: Interactive Animations

- **Click/Touch Detection**: Click or tap inside any circle to trigger its corresponding arrow
- **Smooth Animation**: Arrows move smoothly towards clicked circles using `requestAnimationFrame`
- **Color Transformation**: Circles change colors when arrows hit them:
  - Gold → Orange
  - Blue → Gray
  - Red → Purple
  - Green → Dark Slate Gray
- **Sound Effects**: Audio feedback when arrows hit circles using Web Audio API
- **Particle Effects**: Explosion animations on impact with dynamic particles
- **Reset Functionality**: Reset button to restore initial state
- **Enhanced Mobile Support**: Touch events, haptic feedback, and visual touch indicators
- **Cross-Platform**: Works seamlessly on both mobile and desktop

## 🚀 Demo

**🌐 Live Version**: [https://souptiksarkar893.github.io/interactive-bubbles/](https://souptiksarkar893.github.io/interactive-bubbles/)

Or simply open `index.html` in any modern web browser to run locally.

### How to Use:

1. **Desktop**: Click inside any colored circle
2. **Mobile**: Tap inside any colored circle (with haptic feedback)
3. Watch the corresponding arrow move towards the circle
4. **Experience**: Enjoy sound effects and particle explosions when arrows hit
5. Observe the color change when the arrow hits the circle
6. Use the Reset button to return to the initial state
7. Toggle the sound on/off with the sound button (🔊/🔇)
8. Try clicking/tapping multiple circles for simultaneous animations
9. **Responsive**: The app automatically adapts to your screen size

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and responsive Canvas element
- **CSS3**: Responsive styling with Flexbox layout and media queries
- **Vanilla JavaScript**: Pure JavaScript with no external libraries
- **Canvas 2D API**: For drawing circles, arrows, particles, and animations
- **Web Audio API**: For dynamic sound effect generation
- **requestAnimationFrame**: For smooth 60fps animations
- **Touch Events**: Mobile touch support with haptic feedback
- **Vibration API**: Haptic feedback for mobile devices
- **Responsive Design**: Media queries and flexible layouts for all devices

## 📁 Project Structure

```
interactive-bubbles/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and layout
├── script.js           # JavaScript functionality and animations
└── README.md           # Project documentation
```

## 🎨 Design Specifications

- **Canvas Size**: Responsive (base: 600x400 pixels, scales to fit screen)
- **Circle Radius**: Adaptive (base: 30px, scales with canvas)
- **Arrow Size**: Adaptive (base: 20px, scales with canvas)
- **Animation Speed**: 3 pixels per frame (consistent across devices)
- **Color Scheme**: Material Design inspired colors
- **Typography**: Arial font family with responsive sizing
- **Mobile Optimization**: Touch-friendly interface with larger touch targets

## ⚡ Performance Features

- **Optimized Rendering**: Only redraws when animations are active
- **Efficient Animation**: Uses `requestAnimationFrame` for smooth performance
- **Memory Management**: Proper cleanup of animation frames
- **Responsive Design**: Adapts to different screen sizes and orientations
- **Touch Optimization**: Prevents scrolling during touch interactions
- **Adaptive Scaling**: Maintains aspect ratio while fitting any screen size
- **Fast Loading**: Minimal resource usage with vanilla JavaScript

## 🔧 Technical Implementation

### Key Functions:

- `initializeCanvas()`: Sets up responsive canvas sizing based on screen dimensions
- `initializeAudio()`: Sets up Web Audio API for sound effects
- `updatePositions()`: Scales circle and arrow positions for different screen sizes
- `drawCircle()`: Renders circles with specified colors and positions
- `drawArrow()`: Draws arrow shapes with head and tail
- `animate()`: Handles smooth arrow movement animations
- `isPointInCircle()`: Collision detection for click/touch events
- `handleCanvasInteraction()`: Unified handler for mouse clicks and touch events
- `playHitSound()`: Generates dynamic sound effects using Web Audio API
- `createExplosion()`: Creates particle explosion effects on impact
- `showTouchFeedback()`: Visual feedback for touch interactions
- `toggleSound()`: Sound on/off control
- `resetApp()`: Restores application to initial state

### Animation Logic:

- Uses distance calculations for smooth movement
- Implements frame-based animation with consistent speed
- Handles multiple simultaneous animations
- Automatic animation cleanup when complete
- Responsive coordinate system that adapts to screen size
- Touch event handling for mobile devices
- Window resize detection and canvas reinitialization

## 📱 Browser Compatibility

- ✅ **Desktop Browsers**:
  - Chrome (Latest)
  - Firefox (Latest)
  - Safari (Latest)
  - Edge (Latest)
- ✅ **Mobile Browsers**:
  - Chrome Mobile
  - Safari iOS
  - Firefox Mobile
  - Samsung Internet
- ✅ **Device Support**:
  - 📱 Mobile phones (iOS/Android)
  - 📱 Tablets (iOS/Android)
  - 💻 Desktop computers
  - 💻 Laptops
- ✅ **Features**: HTML5 Canvas support and touch events

## 🚀 Getting Started

### Prerequisites

- Any modern web browser
- No additional software or dependencies required

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/souptiksarkar893/interactive-bubbles.git
   ```

2. Navigate to the project directory:

   ```bash
   cd interactive-bubbles
   ```

3. Open `index.html` in your browser:

   ```bash
   # On Windows
   start index.html

   # On macOS
   open index.html

   # On Linux
   xdg-open index.html
   ```

## 🎯 Assignment Requirements

This project fulfills the following requirements:

### ✅ Module 1: Basic Canvas Setup

- [x] HTML5 Canvas element implementation
- [x] 4 circles with different colors on the left side
- [x] Corresponding arrows on the right side
- [x] All elements on single canvas

### ✅ Module 2: Interactive Features

- [x] Click detection inside circles
- [x] Arrow animation towards clicked circles
- [x] Color change when arrows hit circles
- [x] Reset button functionality
- [x] Combined implementation in single application

### ✅ Technical Constraints

- [x] Plain JavaScript and HTML only
- [x] No third-party libraries (jQuery, KineticJS, etc.)
- [x] Modern web standards compliance
- [x] Clean, maintainable code structure

## 🔮 Future Enhancements

Potential improvements that could be added:

- **Sound Effects**: Audio feedback when arrows hit circles
- **Particle Effects**: Explosion animations on impact
- **Score System**: Points for successful hits
- **Multiple Levels**: Different difficulty levels
- **Touch Support**: Enhanced mobile interaction
- **Customization**: User-selectable colors and speeds

## 👨‍💻 Author

**Souptik Sarkar**

- GitHub: [@souptiksarkar893](https://github.com/souptiksarkar893)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- HTML5 Canvas API documentation
- Modern JavaScript best practices
- Responsive web design principles
- Animation optimization techniques

---

⭐ **Star this repository if you found it helpful!**
