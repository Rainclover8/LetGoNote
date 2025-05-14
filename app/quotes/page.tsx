"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { type Quote, getRandomQuotes } from "@/app/actions/quotes"
import QuoteCard from "@/components/quote-card"

const CATEGORIES = [
  { id: "all", label: "Tümü" },
  { id: "inspirational", label: "İlham Verici" },
  { id: "wisdom", label: "Bilgelik" },
  { id: "peace", label: "Huzur" },
  { id: "calm", label: "Sakinlik" },
  { id: "forgiveness", label: "Affetme" },
  { id: "hope", label: "Umut" },
]

export default function QuotesPage() {
  const router = useRouter()
  // Initialize quotes as an empty array to ensure it's always an array
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    loadQuotes()
  }, [selectedCategory])

  const loadQuotes = async () => {
    setIsLoading(true)

    try {
      // Get 6 random quotes from our local collection
      const tag = selectedCategory !== "all" ? selectedCategory : undefined
      const newQuotes = await getRandomQuotes(6, tag)

      // Ensure newQuotes is an array before setting state
      if (Array.isArray(newQuotes)) {
        // Short timeout to show loading state for better UX
        setTimeout(() => {
          setQuotes(newQuotes)
          setIsLoading(false)
        }, 500)
      } else {
        console.error("getRandomQuotes did not return an array:", newQuotes)
        // Fallback to empty array if not an array
        setQuotes([])
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error loading quotes:", error)
      // Ensure we set an empty array on error
      setQuotes([])
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    loadQuotes()
  }

  const handleBack = () => {
    router.back()
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 to-indigo-50/90 z-10" />
        <Image src="/images/background.png" alt="Alıntılar arka planı" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-12 relative z-20">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={handleBack} className="text-slate-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri Dön
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-800">İlham Verici Alıntılar</h1>

          <Button variant="ghost" onClick={handleRefresh} disabled={isLoading} className="text-slate-700">
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Yenile</span>
          </Button>
        </div>

        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category.id)}
                  className={selectedCategory === category.id ? "bg-indigo-600 hover:bg-indigo-700" : "text-slate-700"}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            // Yükleme durumu
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm h-48 animate-pulse">
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-slate-200 mb-4" />
                </CardContent>
              </Card>
            ))
          ) : // Ensure quotes is an array before mapping
          Array.isArray(quotes) && quotes.length > 0 ? (
            quotes.map((quote, index) => (
              <motion.div
                key={`${quote.content}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <QuoteCard quote={quote} />
              </motion.div>
            ))
          ) : (
            // Show a message if no quotes are available
            <div className="col-span-2 text-center py-10">
              <p className="text-slate-600">Alıntı bulunamadı. Lütfen başka bir kategori seçin veya yenileyin.</p>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Daha Fazla Alıntı Yükle
          </Button>
        </div>
      </div>
    </main>
  )
}
