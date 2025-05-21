"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Quote, getRandomQuote } from "@/app/actions/quotes"

interface QuoteCarouselProps {
  initialQuotes: Quote[]
  tag?: string
  interval?: number
  className?: string
}

export default function QuoteCarousel({ initialQuotes, tag, interval = 10000, className = "" }: QuoteCarouselProps) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Otomatik geçiş için zamanlayıcı
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      handleNext()
    }, interval)

    return () => clearInterval(timer)
  }, [currentIndex, isAutoPlaying, interval, quotes.length])

  // Yeni alıntı yükle
  const loadNewQuote = async () => {
    try {
      // Get a new random quote from our local collection
      const newQuote = await getRandomQuote(tag)

      // Yeni alıntıyı ekle ve tekrarları önle
      setQuotes((prevQuotes) => {
        const updatedQuotes = [...prevQuotes]

        // Eğer alıntı zaten varsa ekleme
        if (!updatedQuotes.some((q) => q.content === newQuote.content)) {
          updatedQuotes.push(newQuote)
        }

        return updatedQuotes
      })
    } catch (error) {
      console.error("Error loading new quote:", error)
    }
  }

  // Sonraki alıntıya geç
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % quotes.length

      // Eğer son alıntıya yaklaşıyorsak yeni alıntı yükle
      if (nextIndex >= quotes.length - 2) {
        loadNewQuote()
      }

      return nextIndex
    })
  }

  // Önceki alıntıya geç
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? quotes.length - 1 : prevIndex - 1))
  }

  // Otomatik geçişi duraklat/devam ettir
  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="p-4"
          >
            <blockquote className="text-lg md:text-xl font-medium text-slate-700 italic">
              "{quotes[currentIndex]?.content}"
            </blockquote>

            <footer className="mt-4 text-right text-slate-500">— {quotes[currentIndex]?.author || "Anonim"}</footer>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-4">
        <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full bg-white/70 hover:bg-white">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Önceki</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleAutoPlay}
          className={`rounded-full ${isAutoPlaying ? "bg-indigo-100 text-indigo-700" : "bg-white/70"} hover:bg-white`}
        >
          {isAutoPlaying ? (
            <span className="h-2 w-2 bg-indigo-600 rounded-sm" />
          ) : (
            <span className="h-0 w-0 border-l-[6px] border-l-indigo-600 border-y-transparent border-y-[4px] ml-0.5" />
          )}
          <span className="sr-only">{isAutoPlaying ? "Duraklat" : "Oynat"}</span>
        </Button>

        <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full bg-white/70 hover:bg-white">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Sonraki</span>
        </Button>
      </div>
    </div>
  )
}
