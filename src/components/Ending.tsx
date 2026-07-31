import { useState } from "react"

import { FlowerRain } from "@/components/FlowerRain"

const serif = { fontFamily: "'Instrument Serif', serif" }

export function Ending() {
  const [bursts, setBursts] = useState(0)

  return (
    <section
      id="ending"
      className="relative flex h-[100svh] w-full snap-start snap-always flex-col items-center justify-center px-6 text-center"
      style={{ scrollSnapStop: "always" }}
    >
      <button
        type="button"
        onClick={() => setBursts((n) => n + 1)}
        className="love-glass cursor-pointer rounded-full px-14 py-6 text-2xl transition-transform duration-300 hover:scale-[1.05] active:scale-[0.98] sm:text-3xl"
        style={serif}
      >
        I love you jaan 🪷
      </button>

      <FlowerRain trigger={bursts} />
    </section>
  )
}
