"use client"

import { useEffect, useState } from "react"

export function FloatingShapes() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating circles */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-float-slow" />
      <div className="absolute top-1/3 right-20 w-32 h-32 bg-red-500/10 rounded-full animate-float-medium" />
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-yellow-500/10 rounded-full animate-float-fast" />
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500/10 rounded-full animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-purple-500/10 rounded-full animate-float-medium" />
      
      {/* Floating squares */}
      <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-blue-600/10 rotate-45 animate-float-fast" />
      <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-red-600/10 rotate-12 animate-float-slow" />
      
      {/* Floating lines */}
      <div className="absolute top-1/2 right-1/4 w-1 h-32 bg-gradient-to-b from-blue-500/20 to-transparent animate-float-medium" />
      <div className="absolute bottom-1/4 left-1/5 w-1 h-24 bg-gradient-to-t from-red-500/20 to-transparent animate-float-fast" />
    </div>
  )
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>([])

  useEffect(() => {
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.1,
    }))
    setParticles(particleArray)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-blue-500/10 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${2 + particle.speed}s`,
          }}
        />
      ))}
    </div>
  )
}