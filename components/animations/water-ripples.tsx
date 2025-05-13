"use client"

import { motion } from "framer-motion"

interface WaterRipplesProps {
  count?: number
}

export default function WaterRipples({ count = 5 }: WaterRipplesProps) {
  const ripples = Array.from({ length: count }).map((_, i) => ({
    id: i,
    delay: i * 0.4,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border-2 border-cyan-300"
          initial={{ width: 10, height: 10, opacity: 0 }}
          animate={{
            width: [10, 200],
            height: [10, 200],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: ripple.delay,
          }}
        />
      ))}
    </div>
  )
}
