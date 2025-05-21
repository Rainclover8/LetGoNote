"use client"

import type React from "react"

import { motion } from "framer-motion"

interface PaperProps {
  children: React.ReactNode
  className?: string
  animate?: any
  initial?: any
  transition?: any
}

export default function Paper({ children, className = "", animate, initial, transition }: PaperProps) {
  return (
    <motion.div
      className={`relative bg-white rounded-sm shadow-lg overflow-hidden ${className}`}
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
      }}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {/* Paper texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-70" />

      {/* Paper lines */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-blue-100 opacity-30" style={{ top: `${(i + 1) * 20}px` }} />
        ))}
      </div>

      {/* Paper edge */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-gray-100 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-gray-200 to-transparent opacity-50" />
      <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-r from-gray-100 to-transparent opacity-50" />
      <div className="absolute top-0 right-0 h-full w-2 bg-gradient-to-l from-gray-200 to-transparent opacity-50" />

      {/* Content */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  )
}
