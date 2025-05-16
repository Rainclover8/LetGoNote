"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Volume2, AlertTriangle } from "lucide-react"
import SoundPlayer from "@/components/sound-player"
import { motion } from "framer-motion"

// Gerçek ses dosyaları - Fallback URL'ler eklendi
const soundOptions = [
  {
    id: "rain",
    name: "Yağmur",
    // Fallback olarak kullanılabilecek bir yağmur sesi URL'si
    src: "https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2393.mp3",
  },
  {
    id: "waves",
    name: "Dalgalar",
    // Fallback olarak kullanılabilecek bir dalga sesi URL'si
    src: "https://assets.mixkit.co/sfx/preview/mixkit-sea-waves-loop-1196.mp3",
  },
  {
    id: "forest",
    name: "Orman",
    // Fallback olarak kullanılabilecek bir orman sesi URL'si
    src: "https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambience-1210.mp3",
  },
  {
    id: "fire",
    name: "Ateş",
    // Fallback olarak kullanılabilecek bir ateş sesi URL'si
    src: "https://assets.mixkit.co/sfx/preview/mixkit-campfire-crackles-1330.mp3",
  },
  {
    id: "wind",
    name: "Rüzgar",
    // Fallback olarak kullanılabilecek bir rüzgar sesi URL'si
    src: "https://assets.mixkit.co/sfx/preview/mixkit-blizzard-cold-winds-loop-1153.mp3",
  },
]

export default function SoundPage() {
  const router = useRouter()
  const [selectedSound, setSelectedSound] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleBack = () => {
    router.back()
  }

  const handleSoundSelect = (soundId: string) => {
    setIsLoading(true)
    setSelectedSound(soundId)
    // Simüle edilmiş yükleme süresi
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-800/70 to-blue-900/90 z-10" />
        <Image
          src="/images/background.png"
          alt="Rahatlatıcı sesler arka planı"
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Rahatlatıcı Sesler</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Rahatlama ve odaklanma için doğal sesler dinleyin. Bu sesler, stresi azaltmaya ve zihinsel huzuru artırmaya
            yardımcı olabilir.
          </p>

          <div className="mt-4 bg-yellow-500/20 p-3 rounded-lg inline-block">
            <div className="flex items-center text-yellow-300 text-sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>Ses dosyaları internet bağlantısı gerektirir.</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
          {soundOptions.map((sound) => (
            <motion.div key={sound.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card
                className={`cursor-pointer transition-all duration-200 h-40 overflow-hidden ${
                  selectedSound === sound.id
                    ? "ring-2 ring-offset-2 ring-cyan-400 bg-white/20"
                    : "bg-white/10 hover:bg-white/15"
                } backdrop-blur-sm`}
                onClick={() => handleSoundSelect(sound.id)}
              >
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="relative flex-1">
                    <Image src="/images/background.png" alt={sound.name} fill className="object-cover opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isLoading && selectedSound === sound.id ? (
                        <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-white/70 animate-spin" />
                      ) : (
                        <Volume2 className="h-12 w-12 text-white opacity-70" />
                      )}
                    </div>
                  </div>
                  <div className="p-3 text-center text-white font-medium">{sound.name}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-white/80">
          <p>
            Sesleri arka planda çalmaya devam etmek için sayfadan ayrılabilirsiniz. Ses kontrolü sağ alt köşede
            görünecektir.
          </p>
        </div>
      </div>

      <SoundPlayer soundOptions={soundOptions} />
    </main>
  )
}
