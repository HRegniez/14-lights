import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

// Abient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// Move ambient light controls to folder
const ambientLightFolder = gui.addFolder('Ambient Light')
ambientLightFolder.add(ambientLight, 'visible').name('on/off')
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(3).step(0.0001)
ambientLightFolder.addColor(ambientLight, 'color')

// Directional light (fixed spelling and target setup)
const directionalLight = new THREE.DirectionalLight(0x00fffc, 2)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

// Move directional light controls to folder
const directionalLightFolder = gui.addFolder('Directional Light')
directionalLightFolder.add(directionalLight, 'visible').name('on/off')
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(10).step(0.0001)
directionalLightFolder.addColor(directionalLight, 'color')
directionalLightFolder.add(directionalLight.position, 'x').min(-5).max(5).step(0.1)
directionalLightFolder.add(directionalLight.position, 'y').min(-5).max(5).step(0.1)
directionalLightFolder.add(directionalLight.position, 'z').min(-5).max(5).step(0.1)

// Hemisphere light (fixed spelling)
const hemisphereLight = new THREE.HemisphereLight(0xFF0000, 0x0000FF, 0.9)
scene.add(hemisphereLight)

// Move hemisphere light controls to folder
const hemisphereLightFolder = gui.addFolder('Hemisphere Light')
hemisphereLightFolder.add(hemisphereLight, 'visible').name('on/off')
hemisphereLightFolder.add(hemisphereLight, 'intensity').min(0).max(10).step(0.0001)
hemisphereLightFolder.addColor(hemisphereLight, 'color')
hemisphereLightFolder.addColor(hemisphereLight, 'groundColor')

// Point light
const pointLight = new THREE.PointLight(0xff9000, 1.5, 10, 1)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)

// Move point light controls to folder
const pointLightFolder = gui.addFolder('Point Light')
pointLightFolder.add(pointLight, 'visible').name('on/off')
pointLightFolder.add(pointLight, 'intensity').min(0).max(10).step(0.0001)
pointLightFolder.add(pointLight, 'distance').min(0).max(10).step(0.0001)
pointLightFolder.add(pointLight, 'decay').min(0).max(2).step(0.0001)
pointLightFolder.addColor(pointLight, 'color')

// Rect area light
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 3, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)

// Move rect area light controls to folder
const rectAreaLightFolder = gui.addFolder('RectArea Light')
rectAreaLightFolder.add(rectAreaLight, 'visible').name('on/off')
rectAreaLightFolder.add(rectAreaLight, 'intensity').min(0).max(10).step(0.0001)
rectAreaLightFolder.add(rectAreaLight, 'width').min(0).max(10).step(0.0001)
rectAreaLightFolder.add(rectAreaLight, 'height').min(0).max(10).step(0.0001)
rectAreaLightFolder.addColor(rectAreaLight, 'color')

// Spot light (fixed color value)
const spotlight = new THREE.SpotLight(0x78ff00, 4, 10, Math.PI * 0.1, 0.25, 1)
spotlight.position.set(0, 2, 3)
scene.add(spotlight)

spotlight.target.position.x = - 0.75
scene.add(spotlight.target)

// Move spotlight controls to folders
const spotlightFolder = gui.addFolder('Spotlight')
spotlightFolder.add(spotlight, 'visible').name('on/off')
spotlightFolder.add(spotlight, 'intensity').min(0).max(10).step(0.0001)
spotlightFolder.add(spotlight, 'distance').min(0).max(10).step(0.0001)
spotlightFolder.add(spotlight, 'decay').min(0).max(2).step(0.0001)
spotlightFolder.add(spotlight, 'angle').min(0).max(Math.PI * 0.1).step(0.0001)
spotlightFolder.add(spotlight, 'penumbra').min(0).max(1).step(0.0001)
spotlightFolder.addColor(spotlight, 'color')

const spotlightPositionFolder = spotlightFolder.addFolder('Position')
spotlightPositionFolder.add(spotlight.position, 'x').min(-5).max(5).step(0.1)
spotlightPositionFolder.add(spotlight.position, 'y').min(-5).max(5).step(0.1)
spotlightPositionFolder.add(spotlight.position, 'z').min(-5).max(5).step(0.1)

const spotlightTargetFolder = spotlightFolder.addFolder('Target')
spotlightTargetFolder.add(spotlight.target.position, 'x').min(-5).max(5).step(0.1)
spotlightTargetFolder.add(spotlight.target.position, 'y').min(-5).max(5).step(0.1)
spotlightTargetFolder.add(spotlight.target.position, 'z').min(-5).max(5).step(0.1)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

// Material GUI
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'metalness').min(0).max(1).step(0.0001)
materialFolder.add(material, 'roughness').min(0).max(1).step(0.0001)



tick()