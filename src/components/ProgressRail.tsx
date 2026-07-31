import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Little dots down the right edge showing where you are in the story.
 *
 * `mix-blend-difference` means one set of dots reads correctly over both the dark
 * photos and the blush background, with no per-section theming.
 */
export function ProgressRail({ ids }: { ids: string[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // The section covering the most of the viewport wins.
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!best) return
        const index = sections.indexOf(best.target as HTMLElement)
        if (index !== -1) setActive(index)
      },
      { threshold: [0.25, 0.5, 0.75] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return (
    <nav
      aria-label="Story progress"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 mix-blend-difference sm:flex"
    >
      {ids.map((id, index) => (
        <button
          key={id}
          type="button"
          aria-label={`Go to moment ${index + 1}`}
          aria-current={index === active}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
          className={cn(
            "w-1.5 rounded-full bg-white transition-all duration-500 ease-out",
            index === active ? "h-7 opacity-95" : "h-1.5 opacity-45 hover:opacity-75"
          )}
        />
      ))}
    </nav>
  )
}
