'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 2000
const CONNECTION_DISTANCE = 120
const MOUSE_INFLUENCE = 0.00015

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 400

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Particles
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 1000
      positions[i3 + 1] = (Math.random() - 0.5) * 1000
      positions[i3 + 2] = (Math.random() - 0.5) * 500

      velocities[i3] = (Math.random() - 0.5) * 0.3
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.3
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.1
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Connection lines
    const lineGeometry = new THREE.BufferGeometry()
    const maxLines = 300
    const linePositions = new Float32Array(maxLines * 6)
    const lineColors = new Float32Array(maxLines * 6)

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Mouse handling
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize handling
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const posArray = geometry.attributes.position.array as Float32Array

      // Update particle positions
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3

        posArray[i3] += velocities[i3]
        posArray[i3 + 1] += velocities[i3 + 1]
        posArray[i3 + 2] += velocities[i3 + 2]

        // Mouse parallax influence
        posArray[i3] += mouseRef.current.x * MOUSE_INFLUENCE * (500 - Math.abs(posArray[i3]))
        posArray[i3 + 1] += mouseRef.current.y * MOUSE_INFLUENCE * (500 - Math.abs(posArray[i3 + 1]))

        // Boundary wrapping
        if (posArray[i3] > 500) posArray[i3] = -500
        if (posArray[i3] < -500) posArray[i3] = 500
        if (posArray[i3 + 1] > 500) posArray[i3 + 1] = -500
        if (posArray[i3 + 1] < -500) posArray[i3 + 1] = 500
        if (posArray[i3 + 2] > 250) posArray[i3 + 2] = -250
        if (posArray[i3 + 2] < -250) posArray[i3 + 2] = 250
      }

      geometry.attributes.position.needsUpdate = true

      // Update connection lines
      let lineIndex = 0
      const linePosArr = lineGeometry.attributes.position.array as Float32Array
      const lineColArr = lineGeometry.attributes.color.array as Float32Array

      for (let i = 0; i < PARTICLE_COUNT && lineIndex < maxLines; i += 8) {
        for (let j = i + 8; j < PARTICLE_COUNT && lineIndex < maxLines; j += 8) {
          const i3 = i * 3
          const j3 = j * 3

          const dx = posArray[i3] - posArray[j3]
          const dy = posArray[i3 + 1] - posArray[j3 + 1]
          const dz = posArray[i3 + 2] - posArray[j3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < CONNECTION_DISTANCE) {
            const li = lineIndex * 6
            const alpha = 1 - dist / CONNECTION_DISTANCE

            linePosArr[li] = posArray[i3]
            linePosArr[li + 1] = posArray[i3 + 1]
            linePosArr[li + 2] = posArray[i3 + 2]
            linePosArr[li + 3] = posArray[j3]
            linePosArr[li + 4] = posArray[j3 + 1]
            linePosArr[li + 5] = posArray[j3 + 2]

            // Cyan tinted lines
            lineColArr[li] = 0 * alpha
            lineColArr[li + 1] = 0.94 * alpha
            lineColArr[li + 2] = 1 * alpha
            lineColArr[li + 3] = 0 * alpha
            lineColArr[li + 4] = 0.94 * alpha
            lineColArr[li + 5] = 1 * alpha

            lineIndex++
          }
        }
      }

      // Clear remaining lines
      for (let i = lineIndex * 6; i < maxLines * 6; i++) {
        linePosArr[i] = 0
        lineColArr[i] = 0
      }

      lineGeometry.attributes.position.needsUpdate = true
      lineGeometry.attributes.color.needsUpdate = true
      lineGeometry.setDrawRange(0, lineIndex * 2)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  )
}
