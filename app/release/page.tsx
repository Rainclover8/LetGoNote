"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, Trash2, Wind, Droplet, Shovel } from "lucide-react"

export default function ReleasePage() {
  const router = useRouter()
  const [text, setText] = useState("")
  const [releaseMethod, setReleaseMethod] = useState("")
  const [isAnimating, setIsAnimating] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Get the text and release method from localStorage
    const savedText = localStorage.getItem("text")
    const savedReleaseMethod = localStorage.getItem("releaseMethod")

    if (savedText && savedReleaseMethod) {
      setText(savedText)
      setReleaseMethod(savedReleaseMethod)
    } else {
      // If no text or release method, redirect to write page
      router.push("/write")
    }

    // Set a timer to complete the animation
    const timer = setTimeout(() => {
      setIsAnimating(false)
      setIsComplete(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [router])

  const handleContinue = () => {
    router.push("/complete")
  }

  // Get background image based on release method
  const getBackgroundImage = () => {
    switch (releaseMethod) {
      case "burn":
        return "/images/night-sky.png"
      case "water":
        return "/images/water-texture.png"
      case "earth":
        return "/images/forest-bg.png"
      case "fly":
        return "/images/night-sky.png"
      case "trash":
        return "/images/forest-bg.png"
      default:
        return "/images/forest-bg.png"
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/70 to-slate-900/90 z-10" />
        <Image
          src={getBackgroundImage() || "/placeholder.svg"}
          alt="Serbest bırakma arka planı"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center relative z-20 p-4">
        <AnimatePresence>
          {isAnimating && (
            <div className="relative w-full h-64 md:h-96 flex items-center justify-center mb-8">
              <ReleaseAnimation text={text} method={releaseMethod} />
            </div>
          )}

          {isComplete && (
            <motion.div
              className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg text-white max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Yazdığın şey artık burada değil.</h2>
              <p className="text-lg md:text-xl mb-8 text-slate-300">Ama sen buradasın. Ve daha güçlüsün.</p>

              <Button
                size="lg"
                onClick={handleContinue}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-6 rounded-full shadow-lg"
              >
                Devam Et
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

function ReleaseAnimation({ text, method }: { text: string; method: string }) {
  // Different animations based on the release method
  const getAnimation = () => {
    switch (method) {
      case "burn":
        return {
          paper: {
            initial: { opacity: 1, scale: 1 },
            animate: { opacity: 0, scale: 0.8, y: 20 },
            transition: { duration: 3 },
          },
          effect: (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-red-500 to-yellow-300 mix-blend-overlay"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 3 }}
            />
          ),
        }

      case "trash":
        return {
          paper: {
            initial: { y: 0, rotate: 0, opacity: 1 },
            animate: { y: [0, -50, 200], rotate: [0, -5, 5], opacity: [1, 1, 0] },
            transition: { duration: 3, times: [0, 0.3, 1] },
          },
          effect: (
            <motion.div
              className="absolute bottom-0 w-20 h-24 bg-slate-700 rounded-t-none rounded-b-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="absolute -top-3 left-0 right-0 h-3 bg-slate-800 rounded-t-lg"></div>
            </motion.div>
          ),
        }

      case "fly":
        return {
          paper: {
            initial: { x: 0, y: 0, rotate: 0, opacity: 1 },
            animate: {
              x: [0, 100, -100, 300],
              y: [0, -50, -100, -300],
              rotate: [0, 10, -10, 30],
              opacity: [1, 1, 1, 0],
            },
            transition: { duration: 3, times: [0, 0.3, 0.6, 1] },
          },
          effect: null,
        }

      case "water":
        return {
          paper: {
            initial: { y: 0, opacity: 1, scale: 1 },
            animate: { y: [0, 50, 100], opacity: [1, 0.7, 0], scale: [1, 0.9, 0.8] },
            transition: { duration: 3 },
          },
          effect: (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-500 to-cyan-300 rounded-lg opacity-70"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Image
                src="/images/water-texture.png"
                alt="Su dokusu"
                fill
                className="object-cover mix-blend-overlay opacity-70"
              />
            </motion.div>
          ),
        }

      case "earth":
        return {
          paper: {
            initial: { y: 0, opacity: 1, scale: 1 },
            animate: { y: [0, 50, 100], opacity: [1, 0.5, 0], scale: [1, 0.9, 0.7] },
            transition: { duration: 3 },
          },
          effect: (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-800 to-amber-600 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 100 }}
              transition={{ duration: 2 }}
            />
          ),
        }

      default:
        return {
          paper: {
            initial: { opacity: 1 },
            animate: { opacity: 0 },
            transition: { duration: 3 },
          },
          effect: null,
        }
    }
  }

  const animation = getAnimation()

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute w-64 h-64 bg-white p-4 rounded shadow-lg flex items-center justify-center overflow-hidden"
        {...animation.paper}
      >
        <Image src="/images/paper-texture.png" alt="Kağıt dokusu" fill className="object-cover opacity-20" />
        <p className="text-center text-slate-800 break-words overflow-hidden relative z-10">{text}</p>
        {animation.effect}
      </motion.div>

      {/* Release method icon */}
      <motion.div
        className="absolute top-4 right-4 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {method === "burn" && <Flame className="h-8 w-8" />}
        {method === "trash" && <Trash2 className="h-8 w-8" />}
        {method === "fly" && <Wind className="h-8 w-8" />}
        {method === "water" && <Droplet className="h-8 w-8" />}
        {method === "earth" && <Shovel className="h-8 w-8" />}
      </motion.div>
    </div>
  )
}
