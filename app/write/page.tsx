"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Flame, Trash2, Wind, Droplet, Shovel, Sparkles, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { type Quote, getRandomQuote, getTagForEmotion } from "@/app/actions/quotes"

const releaseMethods = [
  { id: "burn", icon: Flame, label: "Yak", color: "bg-red-500" },
  { id: "trash", icon: Trash2, label: "Çöpe At", color: "bg-slate-500" },
  { id: "fly", icon: Wind, label: "Uçur", color: "bg-blue-500" },
  { id: "water", icon: Droplet, label: "Suya Bırak", color: "bg-cyan-500" },
  { id: "earth", icon: Shovel, label: "Toprağa Göm", color: "bg-amber-700" },
]

export default function WritePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [text, setText] = useState("")
  const [releaseMethod, setReleaseMethod] = useState<string | null>(null)
  const [emotion, setEmotion] = useState<string | null>(null)
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [isLoadingQuote, setIsLoadingQuote] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Get the emotion from localStorage
    const savedEmotion = localStorage.getItem("emotion")
    if (savedEmotion) {
      setEmotion(savedEmotion)
    }

    // Auto-focus the textarea
    if (textareaRef.current) {
      textareaRef.current.focus()
    }

    // Load initial quote
    loadRandomQuote(savedEmotion)
  }, [])

  const loadRandomQuote = async (emotionValue: string | null = emotion) => {
    setIsLoadingQuote(true)

    try {
      // Short timeout for better UX
      setTimeout(async () => {
        const tag = emotionValue ? await getTagForEmotion(emotionValue) : undefined
        const quote = await getRandomQuote(tag)
        setCurrentQuote(quote)
        setIsLoadingQuote(false)
      }, 300)
    } catch (error) {
      console.error("Error loading random quote:", error)
      setIsLoadingQuote(false)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const showRandomAffirmation = () => {
    if (currentQuote) {
      toast({
        title: "Bir nefes al",
        description: currentQuote.content,
        duration: 5000,
      })
    }
  }

  const handleRelease = () => {
    if (!text.trim() || !releaseMethod) return

    // Save the text and release method to localStorage
    localStorage.setItem("text", text)
    localStorage.setItem("releaseMethod", releaseMethod)

    // Navigate to the release page
    router.push("/release")
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-slate-100/80 z-10" />
        <Image src="/images/background.png" alt="Duygu arka planı" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 flex flex-col items-center flex-grow relative z-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-slate-800">İçinden geçenleri yaz</h1>

        <Card className="w-full max-w-2xl p-4 mb-6 shadow-lg bg-white/80 backdrop-blur-sm">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="Ne düşünüyorsan, içinden ne geçiyorsa yaz... sadece sen okuyacaksın."
            className="w-full min-h-[200px] p-4 text-lg border-0 focus:ring-0 resize-none bg-transparent"
            style={{ overflow: "hidden" }}
          />

          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" onClick={() => loadRandomQuote()} className="text-slate-600">
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoadingQuote ? "animate-spin" : ""}`} />
              Yeni Alıntı
            </Button>

            <Button variant="outline" size="sm" onClick={showRandomAffirmation} className="text-slate-600">
              <Sparkles className="mr-2 h-4 w-4" />
              Beni Rahatlat
            </Button>
          </div>
        </Card>

        {currentQuote && (
          <motion.div
            className="w-full max-w-2xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-4 bg-indigo-50/80 backdrop-blur-sm border-indigo-100">
              <blockquote className="text-indigo-700 italic text-sm">"{currentQuote.content}"</blockquote>
              <footer className="text-right text-indigo-500 text-xs mt-2">— {currentQuote.author || "Anonim"}</footer>
            </Card>
          </motion.div>
        )}

        <div className="w-full max-w-2xl mb-8">
          <h2 className="text-lg font-medium mb-4 text-slate-700 text-center">Yazını nasıl bırakmak istersin?</h2>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {releaseMethods.map((method) => {
              const Icon = method.icon
              return (
                <motion.div key={method.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card
                    className={`p-3 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm ${
                      releaseMethod === method.id ? "ring-2 ring-offset-2 ring-blue-500" : "hover:bg-white/90"
                    }`}
                    onClick={() => setReleaseMethod(method.id)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${method.color} flex items-center justify-center text-white mb-2`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">{method.label}</span>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleRelease}
          disabled={!text.trim() || !releaseMethod}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-6 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Serbest Bırak
        </Button>
      </div>
    </main>
  )
}
