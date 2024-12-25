# Three.js Journey

## Three.js Lighting Demo
This project demonstrates various lighting techniques in Three.js, showcasing different types of lights and their effects on 3D objects. It's part of the Three.js Journey course, focusing on the Lights chapter.

## Features
- Interactive 3D scene with multiple geometric objects
- Demonstration of all major Three.js light types:
  - Ambient Light
  - Directional Light 
  - Hemisphere Light
  - Point Light
  - RectArea Light
  - Spot Light
- GUI controls for all lights and material properties
- Responsive design that adapts to window resizing

## Light Types Demonstrated
- **Ambient Light**: Provides global illumination
- **Directional Light**: Simulates sun-like parallel light rays
- **Hemisphere Light**: Different colors from sky and ground
- **Point Light**: Omnidirectional light from a single point
- **RectArea Light**: Simulates studio photography lights
- **Spot Light**: Creates a cone of light like a flashlight

## Scene Objects
- Sphere
- Cube
- Torus
- Ground plane

All objects use MeshStandardMaterial for realistic light interaction

## Setup
1. Make sure you have Node.js installed
2. Clone this repository
3. Install dependencies: `npm install`

## Running the Project
- For development:
  ```bash
  npm run dev
  ```
  This will start a local server at localhost:8080

- For production build:
  ```bash
  npm run build
  ```
  This will create a production build in the dist/ directory

## Controls
- Use mouse/touch to orbit around the scene
- Use GUI controls to adjust:
  - Light properties (intensity, color, position)
  - Material properties (metalness, roughness)
  - Individual light visibility

## Technical Details
Built with:
- Three.js v0.158.0
- lil-gui for controls
- Vite as build tool

## Performance Considerations
Lights are ordered from least to most performance intensive:

**Low Cost:**
- Ambient Light
- Hemisphere Light

**Medium Cost:**
- Directional Light
- Point Light

**High Cost:**
- Spot Light
- RectArea Light

## Browser Support
This project uses modern JavaScript features and WebGL. Ensure your browser supports WebGL for proper rendering.

## License
This project is part of the Three.js Journey course materials.