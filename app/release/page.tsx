"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, Trash2, Wind, Droplet, Shovel } from "lucide-react"
import FireParticles from "@/components/animations/fire-particles"
import WindParticles from "@/components/animations/wind-particles"
import WaterRipples from "@/components/animations/water-ripples"
import EarthParticles from "@/components/animations/earth-particles"
import PaperPieces from "@/components/animations/paper-pieces"
import FireEffect from "@/components/animations/fire-effect"
import TrashCan from "@/components/animations/trash-can"
import Paper from "@/components/paper"
import ThemeAwareBackground from "@/components/theme-aware-background"

export default function ReleasePage() {
  const router = useRouter()
  const [text, setText] = useState("")
  const [releaseMethod, setReleaseMethod] = useState("")
  const [isAnimating, setIsAnimating] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(1) // 1: initial, 2: active, 3: final

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

    // Animation phases
    const phase1Timer = setTimeout(() => {
      setAnimationPhase(2) // Active phase
    }, 1000)

    const phase2Timer = setTimeout(() => {
      setAnimationPhase(3) // Final phase
    }, 3000)

    // Set a timer to complete the animation
    const completionTimer = setTimeout(() => {
      setIsAnimating(false)
      setIsComplete(true)
    }, 5000)

    return () => {
      clearTimeout(phase1Timer)
      clearTimeout(phase2Timer)
      clearTimeout(completionTimer)
    }
  }, [router])

  const handleContinue = () => {
    router.push("/complete")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Theme-aware background with custom overlay */}
      <ThemeAwareBackground overlayClassName="from-slate-800/70 to-slate-900/90 dark:from-black/90 dark:to-slate-900/90" />

      <div className="w-full max-w-4xl flex flex-col items-center relative z-20 p-4">
        <AnimatePresence>
          {isAnimating && (
            <div className="relative w-full h-64 md:h-96 flex items-center justify-center mb-8">
              <ReleaseAnimation text={text} method={releaseMethod} phase={animationPhase} />
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

function ReleaseAnimation({ text, method, phase }: { text: string; method: string; phase: number }) {
  // Different animations based on the release method
  const getAnimation = () => {
    switch (method) {
      case "burn":
        return {
          paper: {
            initial: { opacity: 1, scale: 1, y: 0 },
            animate:
              phase === 1
                ? { opacity: 1, scale: 1, y: 0 }
                : phase === 2
                  ? { opacity: [1, 0.8, 0.5], scale: [1, 0.95, 0.9], y: [0, 5, 10] }
                  : { opacity: 0, scale: 0.8, y: 20 },
            transition: { duration: phase === 1 ? 1 : 2, ease: "easeOut" },
          },
          effect: (
            <>
              <FireEffect phase={phase} />
              {phase >= 2 && <FireParticles count={30} />}
            </>
          ),
        }

      case "trash":
        return {
          paper: {
            initial: { y: 0, rotate: 0, opacity: 1 },
            animate:
              phase === 1
                ? { y: 0, rotate: 0, opacity: 1 }
                : phase === 2
                  ? { y: [0, -30, 100], rotate: [0, -5, 5], opacity: 1 }
                  : { y: 200, rotate: 10, opacity: 0 },
            transition: {
              duration: phase === 1 ? 1 : 2,
              times: phase === 2 ? [0, 0.3, 1] : undefined,
              ease: "easeOut",
            },
          },
          effect: (
            <>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <TrashCan phase={phase} isOpen={phase === 2} />
                {phase === 3 && <PaperPieces count={12} />}
              </div>
            </>
          ),
        }

      case "fly":
        return {
          paper: {
            initial: { x: 0, y: 0, rotate: 0, opacity: 1 },
            animate:
              phase === 1
                ? { x: 0, y: 0, rotate: 0, opacity: 1 }
                : phase === 2
                  ? {
                      x: [0, 20, -20],
                      y: [0, -20, -40],
                      rotate: [0, 5, -5],
                      opacity: 1,
                    }
                  : {
                      x: [0, 100, -100, 300],
                      y: [0, -50, -100, -300],
                      rotate: [0, 10, -10, 30],
                      opacity: [1, 1, 1, 0],
                    },
            transition: {
              duration: phase === 1 ? 1 : phase === 2 ? 2 : 3,
              times: phase === 3 ? [0, 0.3, 0.6, 1] : undefined,
              ease: "easeOut",
            },
          },
          effect: <>{phase >= 2 && <WindParticles count={20} />}</>,
        }

      case "water":
        return {
          paper: {
            initial: { y: 0, opacity: 1, scale: 1 },
            animate:
              phase === 1
                ? { y: 0, opacity: 1, scale: 1 }
                : phase === 2
                  ? { y: [0, 20, 40], opacity: [1, 0.9, 0.7], scale: [1, 0.98, 0.95] }
                  : { y: [40, 60, 80], opacity: [0.7, 0.4, 0], scale: [0.95, 0.9, 0.85] },
            transition: { duration: phase === 1 ? 1 : 2 },
          },
          effect: (
            <>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-500 to-cyan-300 rounded-lg opacity-70"
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: phase === 1 ? 0 : 0.7,
                  y: phase === 1 ? 40 : 0,
                }}
                transition={{ duration: 1 }}
              >
                <div className="absolute inset-0 mix-blend-overlay opacity-70">
                  {phase >= 2 && <WaterRipples count={5} />}
                </div>
              </motion.div>
            </>
          ),
        }

      case "earth":
        return {
          paper: {
            initial: { y: 0, opacity: 1, scale: 1 },
            animate:
              phase === 1
                ? { y: 0, opacity: 1, scale: 1 }
                : phase === 2
                  ? { y: [0, 30, 60], opacity: [1, 0.8, 0.5], scale: [1, 0.95, 0.9] }
                  : { y: [60, 80, 100], opacity: [0.5, 0.2, 0], scale: [0.9, 0.85, 0.8] },
            transition: { duration: phase === 1 ? 1 : 2 },
          },
          effect: (
            <>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-800 to-amber-600 rounded-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: phase === 1 ? 0 : 1,
                  height: phase === 1 ? 0 : phase === 2 ? [0, 50, 80] : 100,
                }}
                transition={{ duration: 2 }}
              >
                {phase >= 2 && <EarthParticles count={15} />}
              </motion.div>
            </>
          ),
        }

      default:
        return {
          paper: {
            initial: { opacity: 1 },
            animate: { opacity: phase === 3 ? 0 : 1 },
            transition: { duration: 3 },
          },
          effect: null,
        }
    }
  }

  const animation = getAnimation()

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Paper
        className="absolute w-64 h-64 p-4 flex items-center justify-center"
        initial={animation.paper.initial}
        animate={animation.paper.animate}
        transition={animation.paper.transition}
      >
        <p className="text-center text-slate-800 break-words overflow-hidden">{text}</p>
        {animation.effect}
      </Paper>

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
