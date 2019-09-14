import * as THREE from 'three'
const mag = require('vectors/mag')(3)

export default ({ color, eta, phi }) => {
  let fiber = new THREE.Curve()
  fiber.getPoint = t => {
    let theta = t * 2 * Math.PI

    let x0 = Math.cos(phi + theta) * Math.sin(eta / 2)
    let x1 = Math.sin(phi + theta) * Math.sin(eta / 2)
    let x2 = Math.cos(phi - theta) * Math.cos(eta / 2)
    let x3 = Math.sin(phi - theta) * Math.cos(eta / 2)

    let m = mag([x0, x1, x2])
    let r = Math.sqrt( (1 - x3) / (1 + x3) )

    return new THREE.Vector3(
      r * x0 / m,
      r * x1 / m,
      r * x2 / m
    )
  }

  let geometry = new THREE.TubeGeometry(fiber, 64, 0.07, 8, true)
  let material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(`hsl(${Math.floor(color * 360)}, 100%, 50%)`),
    blending: THREE.AdditiveBlending
  })

  return new THREE.Mesh(geometry, material)
}
