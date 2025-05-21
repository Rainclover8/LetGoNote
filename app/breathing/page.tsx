"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import BreathingExercise from "@/components/breathing-exercise"
import { motion } from "framer-motion"

export default function BreathingPage() {
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(false)

  const handleComplete = () => {
    setIsCompleted(true)
  }

  const handleBack = () => {
    router.back()
  }

  const handleContinue = () => {
    router.push("/emotion")
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/70 to-indigo-900/90 z-10" />
        <Image
          src="/images/background.png"
          alt="Nefes egzersizi arka planı"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 flex flex-col items-center flex-grow relative z-20">
        <div className="w-full flex justify-start mb-6">
          <Button variant="ghost" onClick={handleBack} className="text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri Dön
          </Button>
        </div>

        <div className="text-center mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nefes Egzersizi</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Sakinleşmek ve odaklanmak için birkaç dakika nefes egzersizi yapın. Derin nefes almak, stres seviyenizi
            düşürmeye ve zihinsel netliği artırmaya yardımcı olur.
          </p>
        </div>

        <div className="w-full max-w-xl">
          <BreathingExercise onComplete={handleComplete} className="bg-white/10 backdrop-blur-sm" />
        </div>

        {isCompleted && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white text-lg mb-4">Harika! Şimdi kendinizi daha iyi hissediyor olmalısınız.</p>
            <Button
              size="lg"
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-6 rounded-full shadow-lg"
            >
              Duygularını İfade Et
              <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  )
}
