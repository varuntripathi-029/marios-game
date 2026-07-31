import { ChevronDown } from "lucide-react"

const serif = { fontFamily: "'Instrument Serif', serif" }

export function Hero() {
  return (
    <header
      id="home"
      className="relative flex h-[100svh] w-full snap-start snap-always flex-col items-center justify-center overflow-hidden"
      style={{ scrollSnapStop: "always" }}
    >
      <video
        className="hero-video z-0"
        src="/landingvid.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Keeps the headline legible over the brightest frames of the video. */}
      <div className="absolute inset-0 z-[1] bg-black/25" />

      <section className="relative z-10 flex flex-col items-center px-6 text-center">
        <h1
          className="animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-foreground sm:text-7xl md:text-8xl"
          style={serif}
        >
          Happy <em className="not-italic text-muted-foreground">Girlfriend's Day</em>{" "}
          <em className="not-italic text-muted-foreground">Jumbo 🫂🌻</em>
        </h1>

        <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Sorry that I am not there with you right now. But before I go to sleep every
          night, I always dream of putting you to sleep with a goodnight kiss, filled
          with all my love.
        </p>
      </section>

      {/* Two elements: the wrapper fades in, the icon bounces. One element can only
          run one `animation` shorthand, so they'd cancel each other out. */}
      <div className="animate-fade-rise-delay-2 absolute bottom-10 z-10">
        <ChevronDown aria-hidden className="h-6 w-6 animate-bounce text-white/60" />
      </div>
    </header>
  )
}
