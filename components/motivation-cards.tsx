"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Heart, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MotivationCard {
  id: string
  text: string
  author: string
  category: string
  backgroundColor: string
  textColor: string
}

const motivationCards: MotivationCard[] = [
  {
    id: "1",
    text: "Bugün yaptığın küçük adımlar, yarın büyük değişimlere yol açar.",
    author: "Anonim",
    category: "motivasyon",
    backgroundColor: "bg-gradient-to-br from-blue-400 to-indigo-600",
    textColor: "text-white",
  },
  {
    id: "2",
    text: "Kendine iyi davranmak, başkalarına iyi davranmanın ilk adımıdır.",
    author: "Anonim",
    category: "öz-bakım",
    backgroundColor: "bg-gradient-to-br from-pink-400 to-rose-600",
    textColor: "text-white",
  },
  {
    id: "3",
    text: "Geçmişi değiştiremezsin, ama geleceği şekillendirebilirsin.",
    author: "Anonim",
    category: "ilham",
    backgroundColor: "bg-gradient-to-br from-amber-400 to-orange-600",
    textColor: "text-white",
  },
  {
    id: "4",
    text: "Her gün yeni bir başlangıçtır. Bugün kendine bir şans daha ver.",
    author: "Anonim",
    category: "motivasyon",
    backgroundColor: "bg-gradient-to-br from-emerald-400 to-green-600",
    textColor: "text-white",
  },
  {
    id: "5",
    text: "Duygularını kabul etmek, onları kontrol etmenin ilk adımıdır.",
    author: "Anonim",
    category: "farkındalık",
    backgroundColor: "bg-gradient-to-br from-purple-400 to-violet-600",
    textColor: "text-white",
  },
  {
    id: "6",
    text: "Nefes al. Bu an geçecek.",
    author: "Anonim",
    category: "sakinlik",
    backgroundColor: "bg-gradient-to-br from-cyan-400 to-teal-600",
    textColor: "text-white",
  },
  {
    id: "7",
    text: "Kendini sevmek, hayatının aşkını bulmaktır.",
    author: "Anonim",
    category: "öz-sevgi",
    backgroundColor: "bg-gradient-to-br from-red-400 to-pink-600",
    textColor: "text-white",
  },
  {
    id: "8",
    text: "Başarı, başarısızlıktan başarısızlığa, hiç hevesini kaybetmeden gitmektir.",
    author: "Winston Churchill",
    category: "motivasyon",
    backgroundColor: "bg-gradient-to-br from-slate-400 to-slate-600",
    textColor: "text-white",
  },
]

export default function MotivationCards() {
  const [currentCard, setCurrentCard] = useState<MotivationCard | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteMotivationCards")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Error parsing favorites:", error)
      }
    }

    // Set initial card
    getRandomCard()
  }, [])

  // Save favorites to localStorage
  const saveFavoritesToStorage = (updatedFavorites: string[]) => {
    localStorage.setItem("favoriteMotivationCards", JSON.stringify(updatedFavorites))
  }

  // Get random card
  const getRandomCard = () => {
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * motivationCards.length)
      setCurrentCard(motivationCards[randomIndex])
      setIsLoading(false)
    }, 500)
  }

  // Toggle favorite
  const toggleFavorite = () => {
    if (!currentCard) return

    let updatedFavorites: string[]

    if (favorites.includes(currentCard.id)) {
      updatedFavorites = favorites.filter((id) => id !== currentCard.id)
      toast({
        title: "Favorilerden Çıkarıldı",
        description: "Motivasyon kartı favorilerden çıkarıldı.",
      })
    } else {
      updatedFavorites = [...favorites, currentCard.id]
      toast({
        title: "Favorilere Eklendi",
        description: "Motivasyon kartı favorilere eklendi.",
      })
    }

    setFavorites(updatedFavorites)
    saveFavoritesToStorage(updatedFavorites)
  }

  // Share card
  const shareCard = () => {
    if (!currentCard) return

    if (navigator.share) {
      navigator
        .share({
          title: "LetGoNote - Motivasyon Kartı",
          text: `"${currentCard.text}" - ${currentCard.author}`,
          url: window.location.href,
        })
        .catch((error) => console.error("Paylaşım hatası:", error))
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard
        .writeText(`"${currentCard.text}" - ${currentCard.author}`)
        .then(() => {
          toast({
            title: "Kopyalandı!",
            description: "Motivasyon kartı panoya kopyalandı.",
          })
        })
        .catch((error) => console.error("Kopyalama hatası:", error))
    }
  }

  if (!currentCard) {
    return (
      <Card className="w-full h-64 flex items-center justify-center">
        <CardContent>
          <div className="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className={`w-full overflow-hidden shadow-lg ${currentCard.backgroundColor}`}>
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-center min-h-[200px] justify-center">
                <blockquote className={`text-xl md:text-2xl font-medium text-center mb-4 ${currentCard.textColor}`}>
                  "{currentCard.text}"
                </blockquote>
                <footer className={`text-right w-full ${currentCard.textColor} opacity-80`}>
                  — {currentCard.author}
                </footer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-4 gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFavorite}
          className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-md hover:bg-white"
        >
          <Heart
            className={`h-5 w-5 ${favorites.includes(currentCard.id) ? "fill-red-500 text-red-500" : "text-slate-700"}`}
          />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={getRandomCard}
          disabled={isLoading}
          className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-md hover:bg-white"
        >
          <RefreshCw className={`h-5 w-5 text-slate-700 ${isLoading ? "animate-spin" : ""}`} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={shareCard}
          className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-md hover:bg-white"
        >
          <Share2 className="h-5 w-5 text-slate-700" />
        </Button>
      </div>
    </div>
  )
}
