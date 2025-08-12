"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"
import { motion, AnimatePresence } from "framer-motion"

interface ThemeAwareBackgroundProps {
  className?: string
  overlayClassName?: string
  children?: React.ReactNode
}

export default function ThemeAwareBackground({
  className = "",
  overlayClassName = "from-slate-800/70 to-slate-900/90 dark:from-slate-900/90 dark:to-black",
  children,
}: ThemeAwareBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentBackground, setCurrentBackground] = useState("/images/background.png")

  // Hydration için
  useEffect(() => {
    setMounted(true)
  }, [])

  // Tema değişikliğini izle
  useEffect(() => {
    if (!mounted) return

    const isDark = resolvedTheme === "dark"
    // Şimdilik aynı arka planı kullanıyoruz, farklı görseller eklenebilir
    setCurrentBackground("/images/background.png")
  }, [resolvedTheme, mounted])

  if (!mounted) {
    // Varsayılan arka plan
    return (
      <div className={`absolute inset-0 z-0 ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${overlayClassName} z-10`} />
        <Image src="/images/background.png" alt="Arka plan" fill className="object-cover" sizes="100vw" priority />
        {children}
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${overlayClassName} z-10`} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBackground}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <Image
            src={currentBackground || "/placeholder.svg"}
            alt="Arka plan"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
      </AnimatePresence>
      {children}
    </div>
  )
}
