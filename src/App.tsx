import { Album, ALBUM_STEP_IDS } from "@/components/Album"
import { Ending } from "@/components/Ending"
import { Hero } from "@/components/Hero"
import { MusicToggle } from "@/components/MusicToggle"
import { ProgressRail } from "@/components/ProgressRail"

const sectionIds = ["home", ...ALBUM_STEP_IDS, "ending"]

export default function App() {
  return (
    <main className="relative z-10 w-full">
      <Hero />
      <Album />
      <Ending />

      <ProgressRail ids={sectionIds} />
      <MusicToggle />
    </main>
  )
}
