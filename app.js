import * as THREE from 'three'
const OrbitControls = require('three-orbit-controls')(THREE)

class App {

  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.vCount = 50
    this.groupCount = 3
    this.etaStep = 0.1
    this.rotationSpeed = 0.0005

    this.init()
  }

  init() {
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer()

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.container = document.getElementById('app')
    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(65, this.width / this.height, 1, 1000)
    this.camera.position.set(-30, -50, -50)

    this.spotLight = new THREE.SpotLight(0xffffff)
    this.spotLight.position.set(30, 50, 50)
    this.spotLight.castShadow = true
    this.spotLight.intensity = 3
    this.scene.add(this.spotLight)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
    this.animation()
  }

  animation() {
    this.scene.rotateZ(this.rotationSpeed)
    requestAnimationFrame(this.animation.bind(this))
    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  resize() {
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

}

new App()
