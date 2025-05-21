"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Paintbrush, Check, X, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  {
    id: "red",
    name: "Kırmızı",
    primary: "0 72% 51%",
    secondary: "0 30% 95%",
    accent: "0 40% 94%",
  },
  {
    id: "blue",
    name: "Mavi",
    primary: "210 100% 50%",
    secondary: "210 30% 95%",
    accent: "210 40% 94%",
  },
]

export default function EnhancedThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<string>("default")
  const [customTheme, setCustomTheme] = useState({
    hue: 221,
    saturation: 83,
    lightness: 53,
  })
  const [activeTab, setActiveTab] = useState("presets")
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

    // Load custom theme settings if available
    const savedCustomTheme = localStorage.getItem("customThemeSettings")
    if (savedCustomTheme) {
      try {
        setCustomTheme(JSON.parse(savedCustomTheme))
      } catch (error) {
        console.error("Error parsing custom theme settings:", error)
      }
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

  const applyCustomTheme = () => {
    try {
      const { hue, saturation, lightness } = customTheme
      const root = document.documentElement

      // Primary colors
      const primaryColor = `${hue} ${saturation}% ${lightness}%`
      const secondaryColor = `${hue} ${Math.max(10, saturation - 40)}% ${Math.min(95, lightness + 40)}%`
      const accentColor = `${hue} ${Math.max(15, saturation - 30)}% ${Math.min(94, lightness + 35)}%`

      root.style.setProperty("--primary", primaryColor)
      root.style.setProperty("--primary-foreground", "210 40% 98%")

      // Secondary colors
      root.style.setProperty("--secondary", secondaryColor)
      root.style.setProperty("--secondary-foreground", "222.2 47.4% 11.2%")

      // Accent colors
      root.style.setProperty("--accent", accentColor)
      root.style.setProperty("--accent-foreground", "222.2 47.4% 11.2%")

      // Update button and UI colors
      root.style.setProperty("--ring", primaryColor)

      // Diğer renkleri de güncelle
      root.style.setProperty("--background", "0 0% 100%")
      root.style.setProperty("--foreground", "222.2 84% 4.9%")
      root.style.setProperty("--card", "0 0% 100%")
      root.style.setProperty("--card-foreground", "222.2 84% 4.9%")
      root.style.setProperty("--popover", "0 0% 100%")
      root.style.setProperty("--popover-foreground", "222.2 84% 4.9%")
      root.style.setProperty("--muted", secondaryColor)
      root.style.setProperty("--muted-foreground", "215.4 16.3% 46.9%")
      root.style.setProperty("--border", "214.3 31.8% 91.4%")
      root.style.setProperty("--input", "214.3 31.8% 91.4%")

      // Force a re-render of styled components
      document.body.classList.remove("theme-applied")
      void document.body.offsetWidth // Trigger reflow
      document.body.classList.add("theme-applied")

      // Save to localStorage
      localStorage.setItem("customThemeSettings", JSON.stringify(customTheme))
      localStorage.setItem("selectedTheme", "custom")
      setSelectedTheme("custom")

      // Notify user
      toast({
        title: "Özel Tema Uygulandı",
        description: "Özel tema ayarlarınız kaydedildi ve uygulandı.",
        duration: 2000,
      })
    } catch (error) {
      console.error("Özel tema uygulama hatası:", error)
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

  const handleCustomThemeChange = (property: keyof typeof customTheme, value: number) => {
    setCustomTheme((prev) => ({ ...prev, [property]: value }))
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full h-10 w-10 bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
      >
        <Paintbrush className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 left-0 w-80"
          >
            <Card className="shadow-lg border-2 border-primary/20">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  Tema Özelleştirme
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="pb-2">
                <Tabs defaultValue="presets" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="presets" className="text-xs">
                      Hazır Temalar
                    </TabsTrigger>
                    <TabsTrigger value="custom" className="text-xs">
                      Özel Tema
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="presets">
                    <div className="grid grid-cols-4 gap-2">
                      {themeColors.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => handleThemeChange(theme.id)}
                          className={`relative rounded-md p-1 cursor-pointer transition-all ${
                            selectedTheme === theme.id ? "ring-2 ring-offset-2 ring-primary" : "hover:bg-slate-100"
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
                  </TabsContent>

                  <TabsContent value="custom">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <label className="text-xs font-medium">Renk Tonu (Hue)</label>
                          <span className="text-xs">{customTheme.hue}°</span>
                        </div>
                        <Slider
                          value={[customTheme.hue]}
                          min={0}
                          max={360}
                          step={1}
                          onValueChange={(value) => handleCustomThemeChange("hue", value[0])}
                          className="mb-4"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <label className="text-xs font-medium">Doygunluk (Saturation)</label>
                          <span className="text-xs">{customTheme.saturation}%</span>
                        </div>
                        <Slider
                          value={[customTheme.saturation]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => handleCustomThemeChange("saturation", value[0])}
                          className="mb-4"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <label className="text-xs font-medium">Parlaklık (Lightness)</label>
                          <span className="text-xs">{customTheme.lightness}%</span>
                        </div>
                        <Slider
                          value={[customTheme.lightness]}
                          min={20}
                          max={80}
                          step={1}
                          onValueChange={(value) => handleCustomThemeChange("lightness", value[0])}
                          className="mb-4"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div
                          className="w-12 h-12 rounded-full"
                          style={{
                            background: `hsl(${customTheme.hue}, ${customTheme.saturation}%, ${customTheme.lightness}%)`,
                          }}
                        ></div>
                        <Button onClick={applyCustomTheme} className="ml-2">
                          Uygula
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="text-xs text-muted-foreground">
                  Tema değişiklikleri otomatik olarak kaydedilir ve tüm oturumlarınızda korunur.
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
