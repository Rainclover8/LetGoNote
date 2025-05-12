"use client"

import { useEffect } from "react"
import SoundPlayer from "@/components/sound-player"

// Sample sound options - in a real app, these would be actual audio files
const soundOptions = [
  { id: "rain", name: "Yağmur", src: "#" },
  { id: "waves", name: "Dalgalar", src: "#" },
  { id: "forest", name: "Orman", src: "#" },
  { id: "fire", name: "Ateş", src: "#" },
  { id: "wind", name: "Rüzgar", src: "#" },
]

export default function SoundPage() {
  useEffect(() => {
    // Redirect to home page
    window.location.href = "/"
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Yönlendiriliyorsunuz...</p>
      <SoundPlayer soundOptions={soundOptions} />
    </div>
  )
}
