"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart } from "lucide-react"
import StatsDashboard from "@/components/stats-dashboard"
import { motion } from "framer-motion"

export default function StatsPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 to-blue-50/90 z-10" />
        <Image src="/images/background.png" alt="İstatistik arka planı" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 flex flex-col items-stretch flex-grow relative z-20">
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
              <BarChart className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">İstatistiklerim</h1>
            </div>
          </motion.div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Duygusal yolculuğunuzu takip edin. İstatistikler, duygu durumunuzu ve günlük alışkanlıklarınızı anlamanıza
            yardımcı olur.
          </p>
        </div>

        <div className="flex-grow bg-white/80 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-md">
          <StatsDashboard />
        </div>
      </div>
    </main>
  )
}
