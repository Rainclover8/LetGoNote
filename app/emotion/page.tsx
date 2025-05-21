"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import SimpleBackground from "@/components/simple-background"

const emotions = [
  {
    id: "sad",
    emoji: "😔",
    label: "Üzgünüm",
    color: "from-blue-200 to-blue-300",
  },
  {
    id: "angry",
    emoji: "😡",
    label: "Öfkeliyim",
    color: "from-red-200 to-red-300",
  },
  {
    id: "anxious",
    emoji: "😰",
    label: "Kaygılıyım",
    color: "from-purple-200 to-purple-300",
  },
  {
    id: "hurt",
    emoji: "😞",
    label: "Kırgınım",
    color: "from-amber-200 to-amber-300",
  },
  {
    id: "uncertain",
    emoji: "😐",
    label: "Belirsizim",
    color: "from-gray-200 to-gray-300",
  },
]

export default function EmotionPage() {
  const router = useRouter()
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)

  const handleEmotionSelect = (emotionId: string) => {
    setSelectedEmotion(emotionId)
  }

  const handleContinue = () => {
    if (selectedEmotion) {
      // In a real app, we would use a state management solution
      // For now, we'll use localStorage to pass the emotion to the next page
      localStorage.setItem("emotion", selectedEmotion)
      router.push("/write")
    }
  }

  return (
    <SimpleBackground>
      <div className="container max-w-4xl mx-auto px-4 py-16 flex flex-col items-center flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">Şu an nasıl hissediyorsun?</h1>
        <p className="text-lg text-white/80 mb-10 text-center max-w-2xl">
          Duygularını tanımlamak, onları ifade etmenin ilk adımıdır. Şu anki ruh haline en yakın olanı seç.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl mb-12">
          {emotions.map((emotion) => (
            <motion.div key={emotion.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card
                className={`p-4 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center h-32 ${
                  selectedEmotion === emotion.id
                    ? `ring-2 ring-offset-2 ring-blue-500 bg-gradient-to-br ${emotion.color}`
                    : "hover:bg-white/80 dark:hover:bg-slate-800/80 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm"
                }`}
                onClick={() => handleEmotionSelect(emotion.id)}
              >
                <span className="text-4xl mb-2">{emotion.emoji}</span>
                <span className="font-medium dark:text-white">{emotion.label}</span>
              </Card>
            </motion.div>
          ))}
        </div>

        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selectedEmotion}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-6 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Devam Et
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </SimpleBackground>
  )
}
