"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getRandomQuote, type Quote } from "@/app/actions/quotes"

export default function LandingQuote() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadQuote = async () => {
      try {
        const randomQuote = await getRandomQuote("inspirational")
        setQuote(randomQuote)
      } catch (error) {
        console.error("Error loading quote:", error)
        // Fallback quote
        setQuote({
          content: "Bazen sadece içini dökmen gerekir. Yaz, bırak ve kendine bir nefes ver.",
          author: "LetGoNote",
          tags: ["inspirational"],
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadQuote()
  }, [])

  if (isLoading) {
    return (
      <div className="mt-8 mb-10 bg-white/10 backdrop-blur-sm p-6 rounded-lg max-w-2xl mx-auto">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-2"></div>
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="h-4 bg-white/20 rounded w-1/3 ml-auto"></div>
        </div>
      </div>
    )
  }

  if (!quote) {
    return null
  }

  return (
    <motion.div
      className="mt-8 mb-10 bg-white/10 backdrop-blur-sm p-6 rounded-lg max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <blockquote className="text-lg md:text-xl italic text-white/90">"{quote.content}"</blockquote>
      <footer className="mt-4 text-right text-white/70">— {quote.author || "Anonim"}</footer>
    </motion.div>
  )
}
