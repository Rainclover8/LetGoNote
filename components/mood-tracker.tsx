"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Calendar } from "lucide-react"

interface MoodEntry {
  date: string
  emotion: string
  intensity: number
}

export default function MoodTracker() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])
  const [viewMode, setViewMode] = useState<"calendar" | "chart">("calendar")

  useEffect(() => {
    // Load mood history from localStorage
    const savedMoodHistory = localStorage.getItem("moodHistory")
    if (savedMoodHistory) {
      try {
        setMoodHistory(JSON.parse(savedMoodHistory))
      } catch (error) {
        console.error("Error parsing mood history:", error)
      }
    }
  }, [])

  // Save current emotion to mood history
  useEffect(() => {
    const currentEmotion = localStorage.getItem("emotion")
    if (currentEmotion) {
      const today = new Date().toISOString().split("T")[0]

      // Check if we already have an entry for today
      const existingEntryIndex = moodHistory.findIndex((entry) => entry.date === today)

      if (existingEntryIndex === -1) {
        // Add new entry
        const newEntry: MoodEntry = {
          date: today,
          emotion: currentEmotion,
          intensity: Math.floor(Math.random() * 5) + 1, // Random intensity 1-5 for demo
        }

        const updatedHistory = [...moodHistory, newEntry]
        setMoodHistory(updatedHistory)
        localStorage.setItem("moodHistory", JSON.stringify(updatedHistory))
      }
    }
  }, [moodHistory])

  const getEmotionEmoji = (emotion: string) => {
    switch (emotion) {
      case "sad":
        return "😔"
      case "angry":
        return "😡"
      case "anxious":
        return "😰"
      case "hurt":
        return "😞"
      case "uncertain":
        return "😐"
      default:
        return "😐"
    }
  }

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "sad":
        return "bg-blue-200"
      case "angry":
        return "bg-red-200"
      case "anxious":
        return "bg-purple-200"
      case "hurt":
        return "bg-amber-200"
      case "uncertain":
        return "bg-gray-200"
      default:
        return "bg-gray-200"
    }
  }

  const getIntensityLabel = (intensity: number) => {
    switch (intensity) {
      case 1:
        return "Çok Hafif"
      case 2:
        return "Hafif"
      case 3:
        return "Orta"
      case 4:
        return "Yoğun"
      case 5:
        return "Çok Yoğun"
      default:
        return "Belirsiz"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" }).format(date)
  }

  const renderCalendarView = () => {
    return (
      <div className="grid grid-cols-7 gap-1">
        {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-slate-500 py-1">
            {day}
          </div>
        ))}

        {/* Generate calendar days */}
        {Array.from({ length: 35 }).map((_, index) => {
          const date = new Date()
          date.setDate(date.getDate() - (34 - index))
          const dateString = date.toISOString().split("T")[0]
          const entry = moodHistory.find((e) => e.date === dateString)

          const isToday = new Date().toISOString().split("T")[0] === dateString

          return (
            <motion.div
              key={dateString}
              className={`aspect-square rounded-md flex items-center justify-center text-xs relative ${
                isToday ? "ring-2 ring-indigo-500" : ""
              }`}
              whileHover={{ scale: 1.1 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-slate-400">{date.getDate()}</span>
              </div>

              {entry && (
                <div
                  className={`absolute inset-1 rounded-md ${getEmotionColor(entry.emotion)} opacity-70 flex items-center justify-center`}
                  title={`${formatDate(entry.date)}: ${entry.emotion} (${getIntensityLabel(entry.intensity)})`}
                >
                  <span>{getEmotionEmoji(entry.emotion)}</span>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    )
  }

  const renderChartView = () => {
    // Get last 7 entries
    const recentEntries = [...moodHistory]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7)
      .reverse()

    return (
      <div className="space-y-4">
        {recentEntries.length > 0 ? (
          <>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Hafif</span>
              <span>Yoğunluk</span>
              <span>Yoğun</span>
            </div>

            <div className="space-y-2">
              {recentEntries.map((entry) => (
                <div key={entry.date} className="flex items-center space-x-2">
                  <div className="w-16 text-xs text-slate-500">{formatDate(entry.date)}</div>
                  <div className="flex-1 h-8 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${getEmotionColor(entry.emotion)}`}
                      style={{ width: `${(entry.intensity / 5) * 100}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(entry.intensity / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex h-full items-center justify-end pr-2">
                        <span className="text-sm">{getEmotionEmoji(entry.emotion)}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-slate-500">Henüz duygu kaydı bulunmuyor.</div>
        )}
      </div>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">Duygu Takibi</CardTitle>

          <div className="flex space-x-1">
            <Button
              size="sm"
              variant={viewMode === "calendar" ? "default" : "outline"}
              className="h-8 px-2"
              onClick={() => setViewMode("calendar")}
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "chart" ? "default" : "outline"}
              className="h-8 px-2"
              onClick={() => setViewMode("chart")}
            >
              <BarChart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>{viewMode === "calendar" ? renderCalendarView() : renderChartView()}</CardContent>
    </Card>
  )
}
