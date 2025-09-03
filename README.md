# Interactive Bubbles

An interactive HTML5 Canvas application featuring animated bubbles and arrows. Click on any circle to trigger arrow animations with dynamic color-changing effects.

![Bubbles App Demo](https://img.shields.io/badge/Demo-Live-brightgreen)

## 🎯 Features

### Module 1: Canvas Graphics
- **HTML5 Canvas**: Single canvas element (600x400px) for all graphics
- **4 Colored Circles**: Positioned on the left side with distinct colors:
  - 🟡 Gold Circle
  - 🔵 Blue Circle  
  - 🔴 Red Circle
  - 🟢 Green Circle
- **Arrow Graphics**: Corresponding arrows positioned on the right side
- **Clean Design**: All elements drawn on a single canvas with proper styling

### Module 2: Interactive Animations
- **Click Detection**: Click inside any circle to trigger its corresponding arrow
- **Smooth Animation**: Arrows move smoothly towards clicked circles using `requestAnimationFrame`
- **Color Transformation**: Circles change colors when arrows hit them:
  - Gold → Orange
  - Blue → Gray
  - Red → Purple
  - Green → Dark Slate Gray
- **Reset Functionality**: Reset button to restore initial state

## 🚀 Demo

Simply open `index.html` in any modern web browser to run the application.

### How to Use:
1. Click inside any colored circle
2. Watch the corresponding arrow move towards the circle
3. Observe the color change when the arrow hits the circle
4. Use the Reset button to return to the initial state
5. Try clicking multiple circles for simultaneous animations

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and Canvas element
- **CSS3**: Responsive styling with Flexbox layout
- **Vanilla JavaScript**: Pure JavaScript with no external libraries
- **Canvas 2D API**: For drawing circles, arrows, and animations
- **requestAnimationFrame**: For smooth 60fps animations

## 📁 Project Structure

```
interactive-bubbles/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and layout
├── script.js           # JavaScript functionality and animations
└── README.md           # Project documentation
```

## 🎨 Design Specifications

- **Canvas Size**: 600x400 pixels
- **Circle Radius**: 30px
- **Arrow Size**: 20px
- **Animation Speed**: 3 pixels per frame
- **Color Scheme**: Material Design inspired colors
- **Typography**: Arial font family

## ⚡ Performance Features

- **Optimized Rendering**: Only redraws when animations are active
- **Efficient Animation**: Uses `requestAnimationFrame` for smooth performance
- **Memory Management**: Proper cleanup of animation frames
- **Responsive Design**: Adapts to different screen sizes

## 🔧 Technical Implementation

### Key Functions:
- `drawCircle()`: Renders circles with specified colors and positions
- `drawArrow()`: Draws arrow shapes with head and tail
- `animate()`: Handles smooth arrow movement animations
- `isPointInCircle()`: Collision detection for click events
- `resetApp()`: Restores application to initial state

### Animation Logic:
- Uses distance calculations for smooth movement
- Implements frame-based animation with consistent speed
- Handles multiple simultaneous animations
- Automatic animation cleanup when complete

## 📱 Browser Compatibility

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers with HTML5 Canvas support

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
