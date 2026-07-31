import { useEffect, useState } from "react"

const FLOWERS = ["🌸", "🌺", "🌷", "💐", "🌹", "🪷", "🏵️", "💮", "🌼"]

const PETALS_PER_BURST = 46
const FALL_MS = 6500

interface Petal {
  id: number
  emoji: string
  left: number
  size: number
  delay: number
  duration: number
  drift: number
  spin: number
}

let nextId = 0

function makeBurst(): Petal[] {
  return Array.from({ length: PETALS_PER_BURST }, () => ({
    id: nextId++,
    emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
    left: Math.random() * 100,
    size: 18 + Math.random() * 26,
    delay: Math.random() * 2.2,
    duration: 4.5 + Math.random() * 3.5,
    drift: (Math.random() - 0.5) * 220,
    spin: (Math.random() - 0.5) * 900,
  }))
}

interface FlowerRainProps {
  /** Increment this to release another burst. */
  trigger: number
}

export function FlowerRain({ trigger }: FlowerRainProps) {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    if (trigger === 0) return

    const burst = makeBurst()
    setPetals((current) => [...current, ...burst])

    const ids = new Set(burst.map((p) => p.id))
    const timer = window.setTimeout(() => {
      setPetals((current) => current.filter((p) => !ids.has(p.id)))
    }, FALL_MS + 2500)

    return () => window.clearTimeout(timer)
  }, [trigger])

  if (petals.length === 0) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="flower-petal"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            ["--drift" as string]: `${petal.drift}px`,
            ["--spin" as string]: `${petal.spin}deg`,
          }}
        >
          {petal.emoji}
        </span>
      ))}
    </div>
  )
}
