"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Save, Trash2, Lock, Unlock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface JournalEntry {
  id: string
  date: string
  content: string
  isPrivate: boolean
}

export default function JournalEntry() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState("")
  const [isPrivate, setIsPrivate] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries")
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries))
      } catch (error) {
        console.error("Error parsing journal entries:", error)
      }
    }
  }, [])

  // Save entries to localStorage
  const saveEntriesToStorage = (updatedEntries: JournalEntry[]) => {
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries))
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Handle save entry
  const handleSaveEntry = () => {
    if (!currentEntry.trim()) {
      toast({
        title: "Boş Giriş",
        description: "Lütfen bir şeyler yazın.",
        variant: "destructive",
      })
      return
    }

    if (isEditing && editingId) {
      // Update existing entry
      const updatedEntries = entries.map((entry) =>
        entry.id === editingId ? { ...entry, content: currentEntry, isPrivate } : entry,
      )
      setEntries(updatedEntries)
      saveEntriesToStorage(updatedEntries)

      toast({
        title: "Günlük Güncellendi",
        description: "Günlük girişiniz başarıyla güncellendi.",
      })
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        content: currentEntry,
        isPrivate,
      }

      const updatedEntries = [newEntry, ...entries]
      setEntries(updatedEntries)
      saveEntriesToStorage(updatedEntries)

      toast({
        title: "Günlük Kaydedildi",
        description: "Günlük girişiniz başarıyla kaydedildi.",
      })
    }

    // Reset form
    setCurrentEntry("")
    setIsEditing(false)
    setEditingId(null)
  }

  // Handle edit entry
  const handleEditEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry.content)
    setIsPrivate(entry.isPrivate)
    setIsEditing(true)
    setEditingId(entry.id)
  }

  // Handle delete entry
  const handleDeleteEntry = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id)
    setEntries(updatedEntries)
    saveEntriesToStorage(updatedEntries)

    toast({
      title: "Günlük Silindi",
      description: "Günlük girişiniz başarıyla silindi.",
    })

    if (editingId === id) {
      setCurrentEntry("")
      setIsEditing(false)
      setEditingId(null)
    }
  }

  // Toggle privacy
  const togglePrivacy = (id: string) => {
    const updatedEntries = entries.map((entry) => (entry.id === id ? { ...entry, isPrivate: !entry.isPrivate } : entry))
    setEntries(updatedEntries)
    saveEntriesToStorage(updatedEntries)
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Yeni Günlük Girişi</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPrivate(!isPrivate)}
              className="flex items-center gap-1"
            >
              {isPrivate ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              <span className="text-xs">{isPrivate ? "Özel" : "Genel"}</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Bugün neler hissettin? Düşüncelerini buraya yazabilirsin..."
            className="min-h-[150px] resize-none"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-slate-500 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(new Date().toISOString())}
          </div>
          <Button onClick={handleSaveEntry}>
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Güncelle" : "Kaydet"}
          </Button>
        </CardFooter>
      </Card>

      {entries.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Önceki Girişler</h3>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={entry.isPrivate ? "border-indigo-200" : "border-green-200"}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <span>{formatDate(entry.date)}</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => togglePrivacy(entry.id)} className="h-8 w-8 p-0">
                        {entry.isPrivate ? (
                          <Lock className="h-4 w-4 text-indigo-500" />
                        ) : (
                          <Unlock className="h-4 w-4 text-green-500" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditEntry(entry)}
                        className="h-8 w-8 p-0 text-amber-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="h-8 w-8 p-0 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-slate-700">{entry.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
