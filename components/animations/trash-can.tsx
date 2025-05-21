"use client"

import { motion } from "framer-motion"

interface TrashCanProps {
  isOpen?: boolean
  phase: number
}

export default function TrashCan({ isOpen = false, phase }: TrashCanProps) {
  return (
    <div className="relative w-24 h-28">
      {/* Trash can body */}
      <motion.div
        className="absolute bottom-0 w-full h-full bg-slate-700 rounded-t-none rounded-b-lg overflow-hidden"
        initial={{ opacity: 0, y: 50, scaleY: 0.8 }}
        animate={{
          opacity: phase === 1 ? 0 : 1,
          y: phase === 1 ? 50 : 0,
          scaleY: phase === 1 ? 0.8 : 1,
        }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Trash can details */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-slate-600" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-slate-600" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-slate-600" />

        {/* Trash can shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/20 rounded-b-lg" />
      </motion.div>

      {/* Trash can lid */}
      <motion.div
        className="absolute -top-3 left-0 right-0 h-3 bg-slate-800 rounded-t-lg origin-left"
        initial={{ rotateZ: 0 }}
        animate={{
          rotateZ: phase === 1 ? 0 : phase === 2 ? [-5, -20, 0] : 0,
        }}
        transition={{
          duration: 1,
          times: [0, 0.5, 1],
          delay: phase === 2 ? 0.5 : 0,
        }}
      >
        {/* Lid handle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-1 bg-slate-600 rounded-full" />
      </motion.div>
    </div>
  )
}
