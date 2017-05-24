<template lang="pug">
  #canvas
</template>

<script>
var THREE
if (process.BROWSER_BUILD) {
  THREE = require('three-js')()
}

export default {
  name: 'BlackBackground',

  mounted () {
    var camera, scene, renderer, particles, particle, material, particleCount, points
    var xSpeed, ySpeed
    xSpeed = 0.0005
    ySpeed = 0.0005
    var winWidth, winHeight
    winWidth = window.innerWidth
    winHeight = window.innerHeight

    init()
    animate()

    function init () {
      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2('#414042', 0.001)

      camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 1, 1000)
      camera.position.z = 500

      // particle
      // transparent blending
      material = new THREE.PointsMaterial({
        color: 0x242424,
        size: 3,
        transparent: true,
        blending: THREE.AdditiveBlending
      })

      particleCount = 500
      particles = new THREE.Geometry()

      for (var i = 0; i < particleCount; i++) {
        var px = Math.random() * 2000 - 1000
        var py = Math.random() * 2000 - 1000
        var pz = Math.random() * 2000 - 1000
        particle = new THREE.Vector3(px, py, pz)
        particle.velocity = new THREE.Vector3(0, (Math.random() * 1) + 0.005, 0)
        particles.vertices.push(particle)
      }

      points = new THREE.Points(particles, material)
      points.sortParticles = true
      scene.add(points)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(winWidth, winHeight)
      renderer.setClearColor('#414042', 1)
      document.getElementById('canvas').appendChild(renderer.domElement)
    }

    function animate () {
      requestAnimationFrame(animate)

      scene.rotation.y += xSpeed

      // Move particles up and down
      var i = particleCount
      while (i--) {
        var particle = particles.vertices[i]

        // y
        if (particle.y > 1000) {
          particle.y = -1000
          particle.velocity.y = ySpeed
        }
        particle.velocity.y += ySpeed

        particle.add(particle.velocity)
      }
      points.geometry.verticesNeedUpdate = true

      render()
    }

    function render () {
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
  }
}
</script>

<style lang="scss">
  #canvas {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
</style>
