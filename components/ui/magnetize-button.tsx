"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface MagnetizeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  particleCount?: number
  attractRadius?: number
  label?: string
  particleClassName?: string
}

interface Particle { id: number; x: number; y: number }

function MagnetizeButton({ className, particleCount = 14, attractRadius = 50, label = "Prendre RDV", particleClassName = "bg-or", children, ...props }: MagnetizeButtonProps) {
  const [isAttracting, setIsAttracting] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const particlesControl = useAnimation()

  useEffect(() => {
    setParticles(Array.from({ length: particleCount }, (_, i) => ({ id: i, x: Math.random() * 360 - 180, y: Math.random() * 360 - 180 })))
  }, [particleCount])

  const handleStart = useCallback(async () => {
    setIsAttracting(true)
    await particlesControl.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 50, damping: 10 } })
  }, [particlesControl])

  const handleEnd = useCallback(async () => {
    setIsAttracting(false)
    await particlesControl.start((i) => ({ x: particles[i]?.x ?? 0, y: particles[i]?.y ?? 0, transition: { type: "spring", stiffness: 100, damping: 15 } }))
  }, [particlesControl, particles])

  return (
    <Button
      className={cn("min-w-40 relative touch-none rounded-full h-12 px-8 font-semibold text-sm bg-or hover:bg-or/80 text-encre border border-or/60 transition-all duration-300", className)}
      onMouseEnter={handleStart} onMouseLeave={handleEnd} onTouchStart={handleStart} onTouchEnd={handleEnd}
      {...props}
    >
      {particles.map((_, index) => (
        <motion.div key={index} custom={index} initial={{ x: particles[index]?.x ?? 0, y: particles[index]?.y ?? 0 }} animate={particlesControl}
          className={cn("absolute w-1.5 h-1.5 rounded-full transition-opacity duration-300", particleClassName, isAttracting ? "opacity-100" : "opacity-0")} />
      ))}
      <span className="relative flex items-center justify-center gap-2">{children ?? label}</span>
    </Button>
  )
}

export { MagnetizeButton }
