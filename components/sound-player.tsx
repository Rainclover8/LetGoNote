"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, AlertCircle } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

interface SoundPlayerProps {
  soundOptions: {
    id: string
    name: string
    src: string
  }[]
}

export default function SoundPlayer({ soundOptions }: SoundPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [selectedSound, setSelectedSound] = useState(soundOptions[0]?.id || "")
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  // Create audio element on component mount
  useEffect(() => {
    try {
      // Create audio element
      audioRef.current = new Audio()
      audioRef.current.loop = true

      // Add error event listener
      audioRef.current.addEventListener("error", handleAudioError)

      // Cleanup on unmount
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("error", handleAudioError)
          audioRef.current.pause()
          audioRef.current = null
        }
      }
    } catch (err) {
      console.error("Error initializing audio:", err)
      setError("Ses oynatıcı başlatılamadı.")
    }
  }, [])

  // Handle audio errors
  const handleAudioError = (e: Event) => {
    const audioElement = e.target as HTMLAudioElement
    console.error("Audio error:", audioElement.error)

    setIsPlaying(false)
    setError("Ses dosyası yüklenemedi.")

    toast({
      title: "Ses Hatası",
      description: "Ses dosyası yüklenemedi. Lütfen başka bir ses seçin veya daha sonra tekrar deneyin.",
      variant: "destructive",
    })
  }

  // Update volume when changed
  useEffect(() => {
    if (!audioRef.current) return

    // Update volume
    audioRef.current.volume = volume / 100
  }, [volume])

  // Change sound source when selected sound changes
  useEffect(() => {
    if (!audioRef.current || !selectedSound) return
    setError(null)

    try {
      // Change sound source
      const selectedOption = soundOptions.find((option) => option.id === selectedSound)
      if (selectedOption) {
        const wasPlaying = !audioRef.current.paused

        // Use a fallback sound URL if needed
        const soundUrl = selectedOption.src

        // Set the source and handle playback
        audioRef.current.src = soundUrl

        // If it was playing before, try to play the new sound
        if (wasPlaying) {
          audioRef.current.play().catch((e) => {
            console.error("Error playing audio:", e)
            setIsPlaying(false)
            setError("Ses oynatılamadı.")
          })
        }
      }
    } catch (e) {
      console.error("Error changing sound source:", e)
      setError("Ses değiştirilemedi.")
    }
  }, [selectedSound, soundOptions])

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return

    setError(null)

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch((e) => {
        console.error("Error playing audio:", e)
        setError("Ses oynatılamadı.")
        toast({
          title: "Ses Oynatma Hatası",
          description: "Ses dosyası oynatılamadı. Lütfen başka bir ses seçin.",
          variant: "destructive",
        })
      })
      setIsPlaying(true)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg flex items-center gap-3">
      {error && (
        <div className="text-red-500 flex items-center mr-2">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span className="text-xs">Hata</span>
        </div>
      )}

      <Button
        size="sm"
        variant="ghost"
        onClick={togglePlay}
        className="text-slate-700 hover:text-slate-900 hover:bg-slate-100"
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>

      <select
        value={selectedSound}
        onChange={(e) => setSelectedSound(e.target.value)}
        className="text-sm bg-transparent border border-slate-200 rounded px-2 py-1 text-slate-700"
      >
        {soundOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

      <div className="w-24">
        <Slider value={[volume]} min={0} max={100} step={1} onValueChange={(value) => setVolume(value[0])} />
      </div>
    </div>
  )
}
