"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Clock, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReminderSettings {
  enabled: boolean
  frequency: "daily" | "weekly" | "custom"
  time: string
  days: string[]
}

const defaultSettings: ReminderSettings = {
  enabled: false,
  frequency: "daily",
  time: "20:00",
  days: ["1", "3", "5"], // Pazartesi, Çarşamba, Cuma
}

export default function ReminderSettings() {
  const [settings, setSettings] = useState<ReminderSettings>(defaultSettings)
  const [notificationsSupported, setNotificationsSupported] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if notifications are supported
    if ("Notification" in window) {
      setNotificationsSupported(true)

      // Load saved settings
      const savedSettings = localStorage.getItem("reminderSettings")
      if (savedSettings) {
        try {
          setSettings(JSON.parse(savedSettings))
        } catch (error) {
          console.error("Error parsing reminder settings:", error)
        }
      }
    }
  }, [])

  const saveSettings = (newSettings: ReminderSettings) => {
    setSettings(newSettings)
    localStorage.setItem("reminderSettings", JSON.stringify(newSettings))

    // Schedule notifications if enabled
    if (newSettings.enabled) {
      scheduleNotifications(newSettings)
    }
  }

  const toggleEnabled = () => {
    if (!settings.enabled) {
      // Request permission when enabling
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const newSettings = { ...settings, enabled: true }
            saveSettings(newSettings)
            toast({
              title: "Hatırlatıcılar Etkinleştirildi",
              description: "Bildirimlere izin verdiğiniz için teşekkürler.",
            })
          } else {
            toast({
              title: "Bildirim İzni Gerekli",
              description: "Hatırlatıcıları kullanmak için bildirim izni vermeniz gerekiyor.",
              variant: "destructive",
            })
          }
        })
      } else {
        const newSettings = { ...settings, enabled: true }
        saveSettings(newSettings)
        toast({
          title: "Hatırlatıcılar Etkinleştirildi",
          description: getFrequencyText(settings),
        })
      }
    } else {
      const newSettings = { ...settings, enabled: false }
      saveSettings(newSettings)
      toast({
        title: "Hatırlatıcılar Devre Dışı",
        description: "Hatırlatıcılar kapatıldı.",
      })
    }
  }

  const handleFrequencyChange = (value: string) => {
    const newSettings = { ...settings, frequency: value as "daily" | "weekly" | "custom" }
    saveSettings(newSettings)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = { ...settings, time: e.target.value }
    saveSettings(newSettings)
  }

  const toggleDay = (day: string) => {
    const newDays = settings.days.includes(day) ? settings.days.filter((d) => d !== day) : [...settings.days, day]
    const newSettings = { ...settings, days: newDays }
    saveSettings(newSettings)
  }

  const scheduleNotifications = (settings: ReminderSettings) => {
    // This is a simplified version. In a real app, you would use a service worker
    // or a backend service to schedule notifications.
    console.log("Scheduling notifications with settings:", settings)

    // For demo purposes, show a test notification
    if (Notification.permission === "granted") {
      setTimeout(() => {
        new Notification("LetGoNote Hatırlatıcı", {
          body: "Bugün duygularınızı ifade etmek için zaman ayırın.",
          icon: "/images/background.png",
        })
      }, 5000)
    }
  }

  const getFrequencyText = (settings: ReminderSettings) => {
    switch (settings.frequency) {
      case "daily":
        return `Her gün saat ${settings.time} için ayarlandı.`
      case "weekly":
        return `Haftada bir kez saat ${settings.time} için ayarlandı.`
      case "custom":
        const dayNames = settings.days
          .map(
            (day) =>
              ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"][Number.parseInt(day) - 1],
          )
          .join(", ")
        return `${dayNames} günleri saat ${settings.time} için ayarlandı.`
      default:
        return ""
    }
  }

  if (!notificationsSupported) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Tarayıcınız bildirim özelliğini desteklemiyor. Hatırlatıcıları kullanmak için lütfen modern bir tarayıcı
            kullanın.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Bell className="h-5 w-5 mr-2 text-primary" />
          Hatırlatıcı Ayarları
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Hatırlatıcıları Etkinleştir</Label>
            <div className="text-sm text-muted-foreground">
              Düzenli olarak uygulama kullanımı için hatırlatıcılar al
            </div>
          </div>
          <Switch id="notifications" checked={settings.enabled} onCheckedChange={toggleEnabled} />
        </div>

        {settings.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 pt-2"
          >
            <div className="space-y-2">
              <Label htmlFor="frequency">Hatırlatıcı Sıklığı</Label>
              <Select value={settings.frequency} onValueChange={handleFrequencyChange}>
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Sıklık seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Her Gün</SelectItem>
                  <SelectItem value="weekly">Haftada Bir</SelectItem>
                  <SelectItem value="custom">Özel Günler</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Hatırlatıcı Saati
              </Label>
              <input
                type="time"
                id="time"
                value={settings.time}
                onChange={handleTimeChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {settings.frequency === "custom" && (
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Hatırlatıcı Günleri
                </Label>
                <div className="flex flex-wrap gap-2">
                  {["1", "2", "3", "4", "5", "6", "7"].map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={settings.days.includes(day) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleDay(day)}
                      className="w-10 h-10 p-0"
                    >
                      {["Pt", "Sa", "Çr", "Pr", "Cu", "Ct", "Pz"][Number.parseInt(day) - 1]}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>

      <CardFooter>
        <p className="text-xs text-muted-foreground">
          {settings.enabled
            ? getFrequencyText(settings)
            : "Hatırlatıcılar devre dışı. Düzenli kullanım için etkinleştirin."}
        </p>
      </CardFooter>
    </Card>
  )
}
