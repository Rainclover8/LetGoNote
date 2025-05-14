"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Home, PenLine, Heart, BookOpen } from "lucide-react"
import QuoteCarousel from "@/components/quote-carousel"
import { type Quote, getRandomQuotes, getTagForEmotion } from "@/app/actions/quotes"

export default function CompletePage() {
  const router = useRouter()
  const [emotion, setEmotion] = useState<string | null>(null)
  const [initialQuotes, setInitialQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [quoteTag, setQuoteTag] = useState<string | undefined>(undefined)

  useEffect(() => {
    // localStorage'dan duygu durumunu al
    const savedEmotion = localStorage.getItem("emotion")
    setEmotion(savedEmotion)

    // Diğer localStorage verilerini temizle
    localStorage.removeItem("text")
    localStorage.removeItem("releaseMethod")

    // Başlangıç alıntılarını yükle
    const loadInitialQuotes = async () => {
      try {
        if (savedEmotion) {
          const tag = await getTagForEmotion(savedEmotion)
          setQuoteTag(tag)
          const quotes = await getRandomQuotes(3, tag)
          setInitialQuotes(Array.isArray(quotes) ? quotes : [])
        } else {
          const quotes = await getRandomQuotes(3)
          setInitialQuotes(Array.isArray(quotes) ? quotes : [])
        }
      } catch (error) {
        console.error("Error loading initial quotes:", error)
        setInitialQuotes([])
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialQuotes()
  }, [])

  const handleWriteAgain = () => {
    router.push("/emotion")
  }

  const handleGoHome = () => {
    router.push("/")
  }

  const handleViewQuotes = () => {
    router.push("/quotes")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/90 to-purple-100/90 z-10" />
        <Image src="/images/background.png" alt="Huzurlu manzara" fill className="object-cover" sizes="100vw" />
      </div>

      <motion.div
        className="w-full max-w-2xl relative z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 md:p-12 shadow-xl bg-white/90 backdrop-blur-sm">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mx-auto mb-6 overflow-hidden"
            >
              <Image
                src="/images/background.png"
                alt="Tamamlandı"
                width={64}
                height={64}
                className="object-cover opacity-50"
              />
              <Heart className="h-8 w-8 text-white absolute" />
            </motion.div>

            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800">Teşekkürler</h1>
            <p className="text-lg md:text-xl mb-6 text-slate-600">Umarız kendini daha iyi hissediyorsun.</p>
          </div>

          {!isLoading && initialQuotes.length > 0 && (
            <div className="mb-8 bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-inner">
              <h2 className="text-lg font-medium text-slate-700 mb-4">Seni ilhamlandıracak düşünceler:</h2>
              <QuoteCarousel initialQuotes={initialQuotes} tag={quoteTag} />
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleGoHome}
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
            >
              <Home className="mr-2 h-5 w-5" />
              Ana Sayfaya Dön
            </Button>

            <Button
              size="lg"
              onClick={handleWriteAgain}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
            >
              <PenLine className="mr-2 h-5 w-5" />
              Tekrar Yaz
            </Button>
          </div>

          <div className="mt-6 text-center">
            <Button variant="link" onClick={handleViewQuotes} className="text-indigo-500 hover:text-indigo-700">
              <BookOpen className="mr-2 h-4 w-4" />
              Daha Fazla İlham Verici Alıntı
            </Button>
          </div>
        </Card>
      </motion.div>
    </main>
  )
}
