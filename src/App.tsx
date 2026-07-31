import { Ending } from "@/components/Ending"
import { Hero } from "@/components/Hero"
import { MomentSection } from "@/components/MomentSection"
import { moments } from "@/data/moments"

export default function App() {
  return (
    <main className="relative z-10 w-full">
      <Hero />

      {moments.map((moment, index) => (
        <MomentSection key={moment.id} moment={moment} index={index} />
      ))}

      <Ending />
    </main>
  )
}
