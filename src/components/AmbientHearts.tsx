import { useMemo } from "react"

const HEARTS = ["❤️", "💗", "💕", "🩷", "💖"]

/**
 * Slow hearts drifting upward. Purely decorative filler for the sections where the
 * blush background shows through — deliberately faint so it never competes with text.
 */
export function AmbientHearts({ count = 16 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        left: Math.random() * 100,
        size: 12 + Math.random() * 22,
        delay: Math.random() * 14,
        duration: 13 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 160,
        spin: (Math.random() - 0.5) * 60,
        peak: 0.28 + Math.random() * 0.34,
      })),
    [count]
  )

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="ambient-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            ["--drift" as string]: `${heart.drift}px`,
            ["--spin" as string]: `${heart.spin}deg`,
            ["--peak" as string]: `${heart.peak}`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}
