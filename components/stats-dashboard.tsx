"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Calendar, Activity } from "lucide-react"

interface EmotionData {
  date: string
  emotion: string
  intensity: number
}

interface JournalEntry {
  id: string
  date: string
  content: string
  isPrivate: boolean
}

export default function StatsDashboard() {
  const [emotionData, setEmotionData] = useState<EmotionData[]>([])
  const [journalData, setJournalData] = useState<JournalEntry[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Load emotion data from localStorage
    const savedMoodHistory = localStorage.getItem("moodHistory")
    if (savedMoodHistory) {
      try {
        setEmotionData(JSON.parse(savedMoodHistory))
      } catch (error) {
        console.error("Error parsing mood history:", error)
      }
    }

    // Load journal data from localStorage
    const savedJournalEntries = localStorage.getItem("journalEntries")
    if (savedJournalEntries) {
      try {
        setJournalData(JSON.parse(savedJournalEntries))
      } catch (error) {
        console.error("Error parsing journal entries:", error)
      }
    }
  }, [])

  const getEmotionCounts = () => {
    const counts: Record<string, number> = {}
    emotionData.forEach((entry) => {
      counts[entry.emotion] = (counts[entry.emotion] || 0) + 1
    })
    return counts
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

  const getEmotionName = (emotion: string) => {
    switch (emotion) {
      case "sad":
        return "Üzgün"
      case "angry":
        return "Öfkeli"
      case "anxious":
        return "Kaygılı"
      case "hurt":
        return "Kırgın"
      case "uncertain":
        return "Belirsiz"
      default:
        return "Belirsiz"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" }).format(date)
  }

  const getJournalCountsByWeek = () => {
    const counts: Record<string, number> = {}
    const now = new Date()

    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateKey = date.toISOString().split("T")[0]
      counts[dateKey] = 0
    }

    // Count entries
    journalData.forEach((entry) => {
      const dateKey = entry.date.split("T")[0]
      if (counts[dateKey] !== undefined) {
        counts[dateKey] += 1
      }
    })

    return counts
  }

  const renderOverviewTab = () => {
    const emotionCounts = getEmotionCounts()
    const journalCounts = getJournalCountsByWeek()

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Duygu Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(emotionCounts).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(emotionCounts).map(([emotion, count]) => (
                  <div key={emotion} className="flex items-center">
                    <div className="w-8 text-center mr-2">{getEmotionEmoji(emotion)}</div>
                    <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getEmotionColor(emotion)}`}
                        style={{ width: `${(count / emotionData.length) * 100}%` }}
                      >
                        <div className="flex h-full items-center justify-end pr-2">
                          <span className="text-xs font-medium">{getEmotionName(emotion)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-8 text-center ml-2 text-xs font-medium">{count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">Henüz duygu kaydı bulunmuyor.</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Günlük Aktivitesi</CardTitle>
          </CardHeader>
          <CardContent>
            {journalData.length > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  {Object.keys(journalCounts)
                    .sort()
                    .map((date) => (
                      <div key={date} className="text-center">
                        {formatDate(date)}
                      </div>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                  {Object.entries(journalCounts)
                    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                    .map(([date, count]) => (
                      <div key={date} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-${Math.max(2, count * 4)} max-h-16 rounded-t-md ${
                            count > 0 ? "bg-indigo-400" : "bg-slate-200"
                          }`}
                        ></div>
                        <div className="text-xs font-medium mt-1">{count}</div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">Henüz günlük girişi bulunmuyor.</div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">İstatistikler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">Toplam Duygu Kaydı</div>
                <div className="text-2xl font-bold">{emotionData.length}</div>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">Toplam Günlük</div>
                <div className="text-2xl font-bold">{journalData.length}</div>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">En Sık Duygu</div>
                <div className="text-2xl font-bold flex items-center">
                  {emotionData.length > 0 ? (
                    <>
                      {getEmotionEmoji(
                        Object.entries(emotionCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "uncertain",
                      )}
                      <span className="ml-2 text-sm">
                        {getEmotionName(
                          Object.entries(emotionCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "uncertain",
                        )}
                      </span>
                    </>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">Son 7 Gün</div>
                <div className="text-2xl font-bold">
                  {Object.values(journalCounts).reduce((sum, count) => sum + count, 0)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderEmotionsTab = () => {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Duygu Geçmişi</CardTitle>
          </CardHeader>
          <CardContent>
            {emotionData.length > 0 ? (
              <div className="space-y-2">
                {emotionData
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 10)
                  .map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md bg-slate-50">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full ${getEmotionColor(entry.emotion)} flex items-center justify-center mr-3`}
                        >
                          {getEmotionEmoji(entry.emotion)}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{getEmotionName(entry.emotion)}</div>
                          <div className="text-xs text-slate-500">{formatDate(entry.date)}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-400"
                            style={{ width: `${(entry.intensity / 5) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs ml-2">{entry.intensity}/5</div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">Henüz duygu kaydı bulunmuyor.</div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderJournalTab = () => {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Günlük İstatistikleri</CardTitle>
          </CardHeader>
          <CardContent>
            {journalData.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">Toplam Günlük</div>
                    <div className="text-2xl font-bold">{journalData.length}</div>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">Özel Günlükler</div>
                    <div className="text-2xl font-bold">{journalData.filter((entry) => entry.isPrivate).length}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Son Günlükler</h4>
                  <div className="space-y-2">
                    {journalData
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 5)
                      .map((entry) => (
                        <div key={entry.id} className="p-2 rounded-md bg-slate-50">
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-xs font-medium">{formatDate(entry.date)}</div>
                            {entry.isPrivate ? (
                              <div className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">Özel</div>
                            ) : (
                              <div className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Genel</div>
                            )}
                          </div>
                          <div className="text-sm text-slate-600 truncate">{entry.content}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">Henüz günlük girişi bulunmuyor.</div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="overview" className="flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          <span>Genel Bakış</span>
        </TabsTrigger>
        <TabsTrigger value="emotions" className="flex items-center">
          <PieChart className="h-4 w-4 mr-2" />
          <span>Duygular</span>
        </TabsTrigger>
        <TabsTrigger value="journal" className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Günlük</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">{renderOverviewTab()}</TabsContent>
      <TabsContent value="emotions">{renderEmotionsTab()}</TabsContent>
      <TabsContent value="journal">{renderJournalTab()}</TabsContent>
    </Tabs>
  )
}
