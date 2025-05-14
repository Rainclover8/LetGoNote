"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { Quote } from "@/app/actions/quotes"
import { QuoteIcon } from "lucide-react"

interface QuoteCardProps {
  quote: Quote
  className?: string
}

export default function QuoteCard({ quote, className = "" }: QuoteCardProps) {
  const [currentQuote, setCurrentQuote] = useState<Quote>(quote)

  useEffect(() => {
    if (quote) {
      setCurrentQuote(quote)
    }
  }, [quote])

  // If no quote is provided, show a default message
  if (!currentQuote) {
    return (
      <Card className={`overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg ${className}`}>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="text-indigo-400 opacity-80">
              <QuoteIcon className="h-8 w-8" />
            </div>
            <p className="text-slate-500">Alıntı bulunamadı.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="text-indigo-400 opacity-80">
            <QuoteIcon className="h-8 w-8" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.content}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className="text-lg md:text-xl font-medium text-slate-700 italic">
                {currentQuote.content}
              </blockquote>

              <footer className="mt-4 text-right text-slate-500">— {currentQuote.author || "Anonim"}</footer>
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
