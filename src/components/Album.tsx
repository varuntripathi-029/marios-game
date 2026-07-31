import { useEffect, useRef, useState } from "react"

import { AmbientHearts } from "@/components/AmbientHearts"
import { cover, finale, photos, type AlbumPhoto } from "@/data/album"
import { cn } from "@/lib/utils"

const serif = { fontFamily: "'Instrument Serif', serif" }

type Face =
  | { kind: "cover" }
  | { kind: "photo"; photo: AlbumPhoto }
  | { kind: "finale" }

interface Sheet {
  front: Face
  back: Face
}

/**
 * Pages are bound into sheets: the front cover backs onto photo 1, photo 2 backs onto
 * photo 3, and so on, so every turn reveals a fresh two-page spread. The last sheet
 * backs onto the video, which is what you find when the album runs out of pages.
 */
const sheets: Sheet[] = [
  { front: { kind: "cover" }, back: { kind: "photo", photo: photos[0] } },
  { front: { kind: "photo", photo: photos[1] }, back: { kind: "photo", photo: photos[2] } },
  { front: { kind: "photo", photo: photos[3] }, back: { kind: "photo", photo: photos[4] } },
  { front: { kind: "photo", photo: photos[5] }, back: { kind: "finale" } },
]

/** One step per spread: closed, three spreads, then the back cover. */
const STEPS = sheets.length + 1

export const ALBUM_STEP_IDS = Array.from({ length: STEPS }, (_, i) => `album-${i}`)

/**
 * Stacking order for a sheet. Every sheet must land on its own layer — ties fall back
 * to DOM order, which lets pages bleed through each other part-way through a turn.
 *
 * The sheet at the current step sits on top of everything, so it stays visible whether
 * it is turning forwards or back. Below that, turned sheets stack upwards on the left
 * (most recently turned on top) and untouched sheets stack downwards on the right.
 */
function sheetDepth(index: number, step: number): number {
  const count = sheets.length
  if (index === step) return count * 2 + 1
  return index < step ? count + index + 1 : count - index
}

function PhotoFace({ photo, active }: { photo: AlbumPhoto; active: boolean }) {
  return (
    <div className="album-paper flex h-full w-full flex-col p-[6%]">
      <div className="min-h-0 flex-1 overflow-hidden rounded-[3px] bg-black/[0.06] shadow-[0_2px_10px_-4px_rgba(60,20,35,0.5)]">
        <picture>
          <source srcSet={photo.webp} type="image/webp" />
          <img
            src={photo.jpg}
            alt={photo.alt ?? ""}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      </div>

      <p
        className={cn(
          "album-message mt-[6%] text-center italic leading-snug text-ink",
          active && "is-visible"
        )}
        style={{ ...serif, fontSize: "calc(var(--page-w) * 0.072)" }}
      >
        {photo.message}
      </p>
    </div>
  )
}

function FinaleFace({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active) {
      void video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }, [active])

  return (
    <div className="album-paper flex h-full w-full flex-col p-[6%]">
      <div className="min-h-0 flex-1 overflow-hidden rounded-[3px] bg-black/[0.06] shadow-[0_2px_10px_-4px_rgba(60,20,35,0.5)]">
        <video
          ref={videoRef}
          src={finale.src}
          poster={finale.poster}
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>

      <p
        className={cn(
          "album-message mt-[6%] text-center italic leading-snug text-ink",
          active && "is-visible"
        )}
        style={{ ...serif, fontSize: "calc(var(--page-w) * 0.072)" }}
      >
        {finale.message}
      </p>
    </div>
  )
}

function CoverFace() {
  return (
    <div className="album-cover flex h-full w-full flex-col items-center justify-center p-[10%] text-center">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-[4px] border border-white/25 px-[8%]">
        <span style={{ fontSize: "calc(var(--page-w) * 0.14)" }}>❤️</span>
        <h2
          className="mt-[6%] leading-none"
          style={{ ...serif, fontSize: "calc(var(--page-w) * 0.2)" }}
        >
          {cover.title}
        </h2>
        <p
          className="mt-[8%] italic opacity-80"
          style={{ ...serif, fontSize: "calc(var(--page-w) * 0.072)" }}
        >
          {cover.subtitle}
        </p>
      </div>
    </div>
  )
}

function FaceContent({ face, active }: { face: Face; active: boolean }) {
  if (face.kind === "cover") return <CoverFace />
  if (face.kind === "finale") return <FinaleFace active={active} />
  return <PhotoFace photo={face.photo} active={active} />
}

export function Album() {
  const sectionRef = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0)

  // Scroll position inside the tall section decides how many sheets have turned.
  useEffect(() => {
    let frame = 0

    const measure = () => {
      const el = sectionRef.current
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) return
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
      setStep(Math.round((scrolled / total) * (STEPS - 1)))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const closed = step === 0
  const ended = step === STEPS - 1

  return (
    <section
      ref={sectionRef}
      id="album"
      className="relative w-full"
      style={{ height: `calc(${STEPS} * 100svh)` }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <AmbientHearts count={12} />

        <div className="album-stage relative z-10">
          <div
            className="album-book"
            style={{
              // Shut, only the right half carries the cover, so nudge it to the middle.
              // Once finished both halves are in use again, so it sits centred.
              transform: closed ? "translateX(calc(var(--page-w) / -2))" : "none",
            }}
          >
            {/* Inside of the front cover — only ever seen mid-turn. */}
            <div
              className="album-board album-board--left album-paper transition-opacity duration-300"
              style={{ opacity: closed ? 0 : 1 }}
            />

            {/* Back cover, revealed once every sheet has turned. */}
            <div className="album-board album-board--right album-cover" />

            {sheets.map((sheet, index) => {
              const flipped = index < step
              return (
                <div
                  key={index}
                  className={cn("album-sheet", flipped && "is-flipped")}
                  style={{ zIndex: sheetDepth(index, step) }}
                >
                  <div className="album-face album-face--front">
                    <FaceContent face={sheet.front} active={index === step} />
                  </div>
                  <div className="album-face album-face--back">
                    <FaceContent face={sheet.back} active={index === step - 1} />
                  </div>
                </div>
              )
            })}

            {!closed && !ended && <div className="album-spine" />}
          </div>
        </div>
      </div>

      {/* Snap anchors — one viewport of scrolling per page turn. */}
      {ALBUM_STEP_IDS.map((id, index) => (
        <div
          key={id}
          id={id}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-[100svh] snap-start snap-always"
          style={{ top: `calc(${index} * 100svh)` }}
        />
      ))}
    </section>
  )
}
