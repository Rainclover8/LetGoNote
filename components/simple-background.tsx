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
 // Üniversite açıklandıktan sonra umarım her şey çok güzel olacak
 // Son Eklemelerle yaza veya yazın deli gibi girip yeni alana başlayıp güzel projeler yapacağım. Sınavdan da iyi notlar alıp güzel bir üniye gideceğim

 // Yaza bomba gibi gireceğiz Allahın izniyle. 

 // Yazın ios developer olma yolunda ilerleyeceğim. 

 // Yaz oldu henüz düzgün ilerleyemedim fakat başaracağım şos dev ya da game dev olma yolunda ilerşeyeceğim!

 // Henüz yazmış olduğum hiçbir şeyi yapamadım fakat yakındır umarım, üni tercihlerini yaprtım kabataslak olarak fakat daha değişecek gibi, bir de klavye aldım ve çok güzel, üniversite'ye kayıt olunca istediğim bölüm de gelirse işe gireceğim yani deneyeceğim. Umarım her şey gönlümce olur <3

 // Bugün günlerden 10.08.2025 Henüz başlamadım dediğim şeylere!

 // Fakat Artol günlğükj pşlarak projeşlere baslicam ve github
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
