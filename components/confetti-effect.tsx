"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
}

interface ConfettiEffectProps {
  duration?: number
  pieceCount?: number
}

export default function ConfettiEffect({ duration = 3000, pieceCount = 100 }: ConfettiEffectProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    // Generate confetti pieces
    const colors = [
      "#f94144", // red
      "#f3722c", // orange
      "#f8961e", // yellow-orange
      "#f9c74f", // yellow
      "#90be6d", // green
      "#43aa8b", // teal
      "#577590", // blue
      "#9f86c0", // purple
    ]

    const newPieces: ConfettiPiece[] = []

    for (let i = 0; i < pieceCount; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100, // random position across screen width (%)
        y: -10 - Math.random() * 10, // start above the viewport
        rotation: Math.random() * 360, // random rotation
        scale: 0.5 + Math.random() * 1, // random size
        color: colors[Math.floor(Math.random() * colors.length)], // random color
      })
    }

    setPieces(newPieces)

    // Set timeout to remove confetti after duration
    const timer = setTimeout(() => {
      setIsActive(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [pieceCount, duration])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            width: `${8 * piece.scale}px`,
            height: `${8 * piece.scale}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
          initial={{ y: piece.y, x: piece.x, rotate: 0, opacity: 1 }}
          animate={{
            y: ["0%", "100%"],
            x: [`${piece.x}%`, `${piece.x + (Math.random() * 20 - 10)}%`, `${piece.x + (Math.random() * 40 - 20)}%`],
            rotate: [0, piece.rotation, piece.rotation * 2],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            ease: "easeOut",
            times: [0, 0.7, 1],
          }}
        />
      ))}
    </div>
  )
}
