"use client"

import { motion } from "framer-motion"

interface EarthParticlesProps {
  count?: number
}

export default function EarthParticles({ count = 10 }: EarthParticlesProps) {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    x: Math.random() * 80 - 40,
    delay: Math.random() * 0.3,
    duration: Math.random() * 0.5 + 0.5,
    color: `rgb(${120 + Math.random() * 50}, ${80 + Math.random() * 30}, ${30 + Math.random() * 20})`,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bottom-0 left-1/2 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            x: particle.x,
            backgroundColor: particle.color,
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: [0, 20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}
