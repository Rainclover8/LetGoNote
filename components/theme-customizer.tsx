"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paintbrush, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ThemeColor {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
}

const themeColors: ThemeColor[] = [
  {
    id: "default",
    name: "Varsayılan",
    primary: "221.2 83.2% 53.3%",
    secondary: "210 40% 96.1%",
    accent: "210 40% 96.1%",
  },
  {
    id: "purple",
    name: "Mor",
    primary: "267 75% 54%",
    secondary: "267 30% 95%",
    accent: "267 40% 94%",
  },
  {
    id: "green",
    name: "Yeşil",
    primary: "142 76% 36%",
    secondary: "142 30% 95%",
    accent: "142 40% 94%",
  },
  {
    id: "pink",
    name: "Pembe",
    primary: "330 81% 60%",
    secondary: "330 30% 95%",
    accent: "330 40% 94%",
  },
  {
    id: "orange",
    name: "Turuncu",
    primary: "24 95% 53%",
    secondary: "24 30% 95%",
    accent: "24 40% 94%",
  },
  {
    id: "teal",
    name: "Turkuaz",
    primary: "180 70% 40%",
    secondary: "180 30% 95%",
    accent: "180 40% 94%",
  },
]

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<string>("default")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("selectedTheme")
    if (savedTheme && themeColors.some((t) => t.id === savedTheme)) {
      setSelectedTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Varsayılan temayı uygula
      setSelectedTheme("default")
      applyTheme("default")
    }
  }, [])

  const applyTheme = (themeId: string) => {
    try {
      const theme = themeColors.find((t) => t.id === themeId)
      if (!theme) return

      // Apply CSS variables to :root element
      const root = document.documentElement

      // Primary colors
      root.style.setProperty("--primary", theme.primary)
      root.style.setProperty("--primary-foreground", "210 40% 98%")

      // Secondary colors
      root.style.setProperty("--secondary", theme.secondary)
      root.style.setProperty("--secondary-foreground", "222.2 47.4% 11.2%")

      // Accent colors
      root.style.setProperty("--accent", theme.accent)
      root.style.setProperty("--accent-foreground", "222.2 47.4% 11.2%")

      // Update button and UI colors
      root.style.setProperty("--ring", theme.primary)

      // Diğer renkleri de güncelle
      root.style.setProperty("--background", "0 0% 100%")
      root.style.setProperty("--foreground", "222.2 84% 4.9%")
      root.style.setProperty("--card", "0 0% 100%")
      root.style.setProperty("--card-foreground", "222.2 84% 4.9%")
      root.style.setProperty("--popover", "0 0% 100%")
      root.style.setProperty("--popover-foreground", "222.2 84% 4.9%")
      root.style.setProperty("--muted", theme.secondary)
      root.style.setProperty("--muted-foreground", "215.4 16.3% 46.9%")
      root.style.setProperty("--border", "214.3 31.8% 91.4%")
      root.style.setProperty("--input", "214.3 31.8% 91.4%")

      // Force a re-render of styled components
      document.body.classList.remove("theme-applied")
      void document.body.offsetWidth // Trigger reflow
      document.body.classList.add("theme-applied")

      // Save to localStorage
      localStorage.setItem("selectedTheme", themeId)

      // Notify user
      toast({
        title: "Tema değiştirildi",
        description: `${theme.name} teması uygulandı.`,
        duration: 2000,
      })
    } catch (error) {
      console.error("Tema uygulama hatası:", error)
      toast({
        title: "Tema değiştirilemedi",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    }
  }

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId)
    applyTheme(themeId)
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full h-10 w-10 bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
      >
        <Paintbrush className="h-5 w-5" />
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className={`absolute bottom-12 left-0 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <Card className="w-64 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tema Renkleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {themeColors.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`relative rounded-md p-1 cursor-pointer transition-all ${
                    selectedTheme === theme.id ? "ring-2 ring-offset-2 ring-indigo-500" : "hover:bg-slate-100"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full mb-1" style={{ background: `hsl(${theme.primary})` }}>
                      {selectedTheme === theme.id && (
                        <div className="flex items-center justify-center h-full">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs">{theme.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
