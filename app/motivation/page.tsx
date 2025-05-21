"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"
import MotivationCards from "@/components/motivation-cards"
import { motion } from "framer-motion"

export default function MotivationPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 to-indigo-50/90 z-10" />
        <Image src="/images/background.png" alt="Motivasyon arka planı" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 flex flex-col items-center flex-grow relative z-20">
        <div className="w-full flex justify-start mb-6">
          <Button variant="ghost" onClick={handleBack} className="text-slate-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri Dön
          </Button>
        </div>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-amber-500 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Motivasyon Kartları</h1>
            </div>
          </motion.div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Günlük motivasyon ve ilham için kartları keşfedin. Beğendiklerinizi kaydedin ve paylaşın.
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto">
          <MotivationCards />
        </div>
      </div>
    </main>
  )
}
