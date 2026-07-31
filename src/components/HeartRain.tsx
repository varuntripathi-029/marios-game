import { useEffect, useState } from "react"

// Weighted toward the plain red heart, with a few variants for texture.
const HEARTS = ["❤️", "❤️", "❤️", "❤️", "❤️", "💖", "💗", "💕", "❣️"]

const HEARTS_PER_BURST = 52
const FALL_MS = 6500

interface Heart {
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

function makeBurst(): Heart[] {
  return Array.from({ length: HEARTS_PER_BURST }, () => ({
    id: nextId++,
    emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
    left: Math.random() * 100,
    size: 18 + Math.random() * 26,
    delay: Math.random() * 2.2,
    duration: 4.5 + Math.random() * 3.5,
    drift: (Math.random() - 0.5) * 220,
    spin: (Math.random() - 0.5) * 900,
  }))
}

interface HeartRainProps {
  /** Increment this to release another burst. */
  trigger: number
}

export function HeartRain({ trigger }: HeartRainProps) {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    if (trigger === 0) return

    const burst = makeBurst()
    setHearts((current) => [...current, ...burst])

    const ids = new Set(burst.map((h) => h.id))
    const timer = window.setTimeout(() => {
      setHearts((current) => current.filter((h) => !ids.has(h.id)))
    }, FALL_MS + 2500)

    return () => window.clearTimeout(timer)
  }, [trigger])

  if (hearts.length === 0) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-petal"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            ["--drift" as string]: `${heart.drift}px`,
            ["--spin" as string]: `${heart.spin}deg`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}
