"use client"

import { motion } from "framer-motion"

interface FireEffectProps {
  phase: number
}

export default function FireEffect({ phase }: FireEffectProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base fire gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 mix-blend-overlay"
        initial={{ opacity: 0, y: "100%" }}
        animate={{
          opacity: phase === 1 ? 0 : phase === 2 ? [0, 0.5, 0.8] : 1,
          y: phase === 1 ? "100%" : phase === 2 ? ["100%", "50%", "0%"] : "0%",
        }}
        transition={{ duration: 2 }}
      />

      {/* Fire center */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 bg-yellow-300 rounded-full filter blur-md"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: phase === 1 ? 0 : phase === 2 ? [0, 0.7, 0.9] : 1,
          scale: phase === 1 ? 0.5 : phase === 2 ? [0.5, 0.8, 1] : 1,
        }}
        transition={{ duration: 2 }}
      />

      {/* Flickering effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-red-600 to-transparent mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase >= 2 ? [0.3, 0.6, 0.3, 0.7, 0.4] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}
