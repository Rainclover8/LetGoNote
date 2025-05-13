"use client"
import { motion } from "framer-motion"

interface FireParticlesProps {
  count?: number
}

export default function FireParticles({ count = 20 }: FireParticlesProps) {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 60 - 30,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1 + 1.5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bottom-0 left-1/2 rounded-full bg-orange-500"
          style={{
            width: particle.size,
            height: particle.size,
            x: particle.x,
            filter: "blur(1px)",
            boxShadow: "0 0 8px 2px rgba(255, 165, 0, 0.3)",
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [-10, -100 - Math.random() * 100],
            opacity: [0, 1, 0],
            scale: [1, 0.5],
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
