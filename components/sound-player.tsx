"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"

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
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio()
    audioRef.current.loop = true

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return

    // Update volume
    audioRef.current.volume = volume / 100
  }, [volume])

  useEffect(() => {
    if (!audioRef.current || !selectedSound) return

    // Change sound source
    const selectedOption = soundOptions.find((option) => option.id === selectedSound)
    if (selectedOption) {
      const wasPlaying = !audioRef.current.paused
      audioRef.current.src = selectedOption.src

      if (wasPlaying) {
        audioRef.current.play().catch((e) => console.error("Error playing audio:", e))
      }
    }
  }, [selectedSound, soundOptions])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((e) => console.error("Error playing audio:", e))
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg flex items-center gap-3">
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
