import { Component, OnInit } from '@angular/core';
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OrbitControls } from "three-orbit-controls";
import * as dat from 'dat.gui'


@Component({
  selector: 'app-three-c',
  templateUrl: './three-c.component.html',
  styleUrls: ['./three-c.component.css']
})
export class ThreeCComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {



    this.initThreeComponent()


  }




  initThreeComponent() {

    // const gui = new dat.GUI()

    //loading
    const textureLoader =  new THREE.TextureLoader();
 
  
    const normalTexture = textureLoader.load('assets/images/NormalMap.png')
    normalTexture.minFilter = THREE.LinearFilter;


    // Canvas
    const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene()
  

    // Objects
    const geometry = new THREE.SphereBufferGeometry(.5, 64, 64);

    // Materials

    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7
    material.roughness = 0.2
    material.normalMap = normalTexture
    material.color = new THREE.Color(0x292929)

    // Mesh
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)


    //Red light
    
    const pointLight2 = new THREE.PointLight(0xff0000, 2)
    pointLight2.position.set(-1.86,1,-1.65)
    pointLight2.intensity = 10
    scene.add(pointLight2)

    // const redlightGUI = gui.addFolder('Red Light')

    // redlightGUI.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
    // redlightGUI.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
    // redlightGUI.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
    // redlightGUI.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

    // const pointLight2color = {
    //   color: 0xff0000
    // }

    // redlightGUI.addColor(pointLight2color, 'color')
    // .onChange(()=>{
    //   pointLight2.color.set(pointLight2color.color)
    // })


    //Light Helper
    // const pointelighthelper1 = new THREE.PointLightHelper(pointLight2, 1)
    // scene.add(pointelighthelper1)


    //Blue light
    const pointLight3 = new THREE.PointLight(0x96ff, 2)
    pointLight3.position.set(2.15,-1.56,-1.65)
    pointLight3.intensity = 10
    scene.add(pointLight3)

    // const bluelightGUI = gui.addFolder('Blue light')

    // bluelightGUI.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
    // bluelightGUI.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
    // bluelightGUI.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
    // bluelightGUI.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

    // const pointLight3color = {
    //   color: 0x96ff
    // }

    // bluelightGUI.addColor(pointLight3color, 'color')
    // .onChange(()=>{
    //   pointLight3.color.set(pointLight3color.color)
    // })

    //Light Helper
    // const pointelighthelper2 = new THREE.PointLightHelper(pointLight3, 1)
    // scene.add(pointelighthelper2)

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    window.addEventListener('resize', () => {
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
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 2
    scene.add(camera)

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,

    })
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Animate
     */
   
    

    document.addEventListener('mousemove', onDocumentMouseMove)

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    const windowX = window.innerWidth / 2;
    const windowY = window.innerHeight / 2;
  
    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - windowX)
      mouseY = (event.clientY - windowY)
    }

    const updateSphere = (event)=>{
      sphere.position.y = window.scrollY * .001
    }

    window.addEventListener('scroll', updateSphere )


    const clock = new THREE.Clock()

    const tick = () => {

      targetX = mouseX * .001
      targetY = mouseY * .001

      const elapsedTime = clock.getElapsedTime()

      // Update objects
      sphere.rotation.y = .50 * elapsedTime

      sphere.rotation.y = .5 * (targetX - sphere.rotation.y)
      sphere.rotation.x = .05 * (targetY - sphere.rotation.x)
      sphere.position.z = -.5 * (targetY - sphere.rotation.x)

      // Update Orbital Controls
      // controls.update()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()

  }

}
