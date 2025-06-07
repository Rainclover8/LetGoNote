"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface SimpleBackgroundProps {
  children: React.ReactNode
  className?: string
}

export default function SimpleBackground({ children, className = "" }: SimpleBackgroundProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
 
  if (!mounted) {
    return (
      <div className={`min-h-screen app-background ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/70 to-slate-900/90 z-0" />
        <div className="relative z-10">{children}</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen app-background ${className}`}>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          theme === "dark" ? "from-slate-900/90 to-black" : "from-slate-800/70 to-slate-900/90"
        } z-0`}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
