import { useState } from "react"

import { AmbientHearts } from "@/components/AmbientHearts"
import { HeartRain } from "@/components/HeartRain"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const serif = { fontFamily: "'Instrument Serif', serif" }

/** ── Edit these two lines to change the closing words. ── */
const HEADLINE = "And that's just the beginning."
const SUBLINE = "Every photo up there is a day I'd live again."

export function Ending() {
  const [bursts, setBursts] = useState(0)
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.4 })

  return (
    <section
      ref={ref}
      id="ending"
      className="relative flex h-[100svh] w-full snap-start snap-always flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ scrollSnapStop: "always" }}
    >
      <AmbientHearts count={18} />

      <div className="relative z-10 flex flex-col items-center">
        <h2
          className={cn(
            "reveal max-w-3xl text-4xl leading-[1.05] tracking-[-1.5px] text-ink sm:text-6xl",
            inView && "reveal-in"
          )}
          style={serif}
        >
          {HEADLINE}
        </h2>

        <p
          className={cn(
            "reveal-message mt-6 max-w-xl text-balance text-base italic text-ink/70 sm:text-lg",
            inView && "reveal-message-in"
          )}
          style={serif}
        >
          {SUBLINE}
        </p>

        <button
          type="button"
          onClick={() => setBursts((n) => n + 1)}
          className={cn(
            "love-glass mt-12 cursor-pointer rounded-full px-14 py-6 text-2xl transition-transform duration-300 hover:scale-[1.05] active:scale-[0.97] sm:text-3xl",
            "reveal-message",
            inView && "reveal-message-in"
          )}
          style={serif}
        >
          I love you jaan{" "}
          <span className="inline-block animate-heartbeat">🪷</span>
        </button>

        <p
          className={cn(
            "mt-6 text-xs uppercase tracking-[0.25em] text-ink/45 transition-opacity duration-700",
            bursts === 0 ? "opacity-100" : "opacity-0"
          )}
        >
          tap it
        </p>
      </div>

      <HeartRain trigger={bursts} />
    </section>
  )
}
