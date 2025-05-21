"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, SkipForward } from "lucide-react"

interface BreathingExerciseProps {
  onComplete?: () => void
  className?: string
}

export default function BreathingExercise({ onComplete, className = "" }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [timer, setTimer] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  // Phase durations in seconds
  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    rest: 2,
  }

  // Total number of cycles to complete
  const totalCycles = 3

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1

          // Check if current phase is complete
          const currentDuration = phaseDurations[currentPhase]
          if (newTimer >= currentDuration) {
            // Move to next phase
            switch (currentPhase) {
              case "inhale":
                setCurrentPhase("hold")
                return 0
              case "hold":
                setCurrentPhase("exhale")
                return 0
              case "exhale":
                setCurrentPhase("rest")
                return 0
              case "rest":
                setCurrentPhase("inhale")
                // Increment cycle count when a full cycle is complete
                setCycleCount((prevCount) => {
                  const newCount = prevCount + 1
                  // Check if all cycles are complete
                  if (newCount >= totalCycles) {
                    setIsActive(false)
                    if (onComplete) onComplete()
                  }
                  return newCount
                })
                return 0
            }
          }
          return newTimer
        })

        setTotalTime((prevTotal) => prevTotal + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, currentPhase, onComplete])

  const toggleExercise = () => {
    setIsActive((prev) => !prev)
  }

  const skipExercise = () => {
    setIsActive(false)
    if (onComplete) onComplete()
  }

  const getInstructions = () => {
    switch (currentPhase) {
      case "inhale":
        return "Nefes Al"
      case "hold":
        return "Tut"
      case "exhale":
        return "Nefes Ver"
      case "rest":
        return "Dinlen"
    }
  }

  const getProgress = () => {
    const phaseDuration = phaseDurations[currentPhase]
    return (timer / phaseDuration) * 100
  }

  const getTotalProgress = () => {
    const totalDuration =
      totalCycles * (phaseDurations.inhale + phaseDurations.hold + phaseDurations.exhale + phaseDurations.rest)
    return (totalTime / totalDuration) * 100
  }

  return (
    <Card className={`overflow-hidden shadow-lg ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-slate-800">Nefes Egzersizi</h3>
          <p className="text-slate-600 mb-6 text-center">
            Sakinleşmek için 4-4-6 nefes tekniğini deneyin. 4 saniye nefes alın, 4 saniye tutun, 6 saniye verin.
          </p>

          <div className="relative w-48 h-48 mb-6">
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.div
                  key={currentPhase}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: currentPhase === "inhale" ? 1.2 : currentPhase === "exhale" ? 0.8 : 1,
                    opacity: 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center">
                      <motion.div
                        className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium"
                        animate={{
                          scale: currentPhase === "inhale" ? [1, 1.2] : currentPhase === "exhale" ? [1.2, 1] : 1,
                        }}
                        transition={{
                          duration: phaseDurations[currentPhase],
                          ease: "easeInOut",
                        }}
                      >
                        {getInstructions()}
                      </motion.div>
                    </div>

                    {/* Progress ring */}
                    <svg
                      className="absolute inset-0 -rotate-90 w-32 h-32"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="text-indigo-100"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="46"
                        cx="50"
                        cy="50"
                      />
                      <motion.circle
                        className="text-indigo-500"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="46"
                        cx="50"
                        cy="50"
                        strokeDasharray={46 * 2 * Math.PI}
                        strokeDashoffset={46 * 2 * Math.PI * (1 - getProgress() / 100)}
                      />
                    </svg>
                  </div>
                </motion.div>
              )}

              {!isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center">
                    <div className="text-indigo-500 font-medium">Başlamak için</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Overall progress */}
          <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-indigo-500"
              style={{ width: `${getTotalProgress()}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={toggleExercise}
              className={isActive ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-500 hover:bg-indigo-600"}
            >
              {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isActive ? "Duraklat" : "Başlat"}
            </Button>
            <Button variant="outline" onClick={skipExercise}>
              <SkipForward className="mr-2 h-4 w-4" />
              Atla
            </Button>
          </div>

          {isActive && (
            <div className="mt-4 text-sm text-slate-500">
              Tur: {cycleCount + 1}/{totalCycles}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
