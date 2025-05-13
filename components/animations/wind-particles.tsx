"use client"

import { motion } from "framer-motion"

interface WindParticlesProps {
  count?: number
}

export default function WindParticles({ count = 15 }: WindParticlesProps) {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    delay: Math.random() * 0.5,
    duration: Math.random() * 2 + 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-1/2 left-1/2 rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            x: particle.x,
            y: particle.y,
            filter: "blur(1px)",
            opacity: 0.7,
          }}
          initial={{ x: particle.x, y: particle.y, opacity: 0 }}
          animate={{
            x: [particle.x, particle.x + 300 + Math.random() * 200],
            y: [particle.y, particle.y - 100 + Math.random() * 200],
            opacity: [0, 0.7, 0],
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
