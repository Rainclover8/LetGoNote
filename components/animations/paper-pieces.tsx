"use client"

import { motion } from "framer-motion"

interface PaperPiecesProps {
  count?: number
}

export default function PaperPieces({ count = 8 }: PaperPiecesProps) {
  const pieces = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    x: Math.random() * 60 - 30,
    rotation: Math.random() * 360,
    delay: Math.random() * 0.2,
    duration: Math.random() * 0.5 + 1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute top-1/2 left-1/2 bg-white shadow-sm"
          style={{
            width: piece.size,
            height: piece.size,
            x: piece.x,
            rotate: piece.rotation,
            borderRadius: "2px",
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, 100 + Math.random() * 50],
            opacity: [0, 1, 0],
            rotate: [piece.rotation, piece.rotation + 180 + Math.random() * 180],
          }}
          transition={{
            duration: piece.duration,
            ease: "easeOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: piece.delay,
          }}
        />
      ))}
    </div>
  )
}
