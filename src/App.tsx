import { Ending } from "@/components/Ending"
import { Hero } from "@/components/Hero"
import { MomentSection } from "@/components/MomentSection"
import { ProgressRail } from "@/components/ProgressRail"
import { moments } from "@/data/moments"

const sectionIds = ["home", ...moments.map((m) => m.id), "ending"]

export default function App() {
  return (
    <main className="relative z-10 w-full">
      <Hero />

      {moments.map((moment, index) => (
        <MomentSection key={moment.id} moment={moment} index={index} />
      ))}

      <Ending />

      <ProgressRail ids={sectionIds} />
    </main>
  )
}
