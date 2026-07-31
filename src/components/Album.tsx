import { useEffect, useRef, useState } from "react"

import { AmbientHearts } from "@/components/AmbientHearts"
import { backCover, cover, finale, photos, stanzas, type AlbumPhoto } from "@/data/album"
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

/** One scroll step per stanza, so the poem paces the page turns. */
const STEPS = stanzas.length

/** The album runs out of pages before the poem runs out of stanzas. */
const LAST_TURN = sheets.length

export const ALBUM_STEP_IDS = Array.from({ length: STEPS }, (_, i) => `album-${i}`)

/**
 * Stacking order for a sheet. Every sheet must land on its own layer — ties fall back
 * to DOM order, which lets pages bleed through each other part-way through a turn.
 *
 * The sheet at the current turn sits on top of everything, so it stays visible whether
 * it is turning forwards or back. Below that, turned sheets stack upwards on the left
 * (most recently turned on top) and untouched sheets stack downwards on the right.
 */
function sheetDepth(index: number, turn: number): number {
  const count = sheets.length
  if (index === turn) return count * 2 + 1
  return index < turn ? count + index + 1 : count - index
}

function PhotoFace({ photo }: { photo: AlbumPhoto }) {
  return (
    <div className="album-paper h-full w-full p-[4%]">
      <div className="h-full w-full overflow-hidden rounded-[3px] bg-black/[0.06] shadow-[0_2px_10px_-4px_rgba(60,20,35,0.5)]">
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
    <div className="album-paper h-full w-full p-[4%]">
      <div className="h-full w-full overflow-hidden rounded-[3px] bg-black/[0.06] shadow-[0_2px_10px_-4px_rgba(60,20,35,0.5)]">
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
    </div>
  )
}

function CoverFace({ line, big }: { line: string; big: boolean }) {
  return (
    <div className="album-cover h-full w-full p-[8%]">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-[4px] border border-white/25 px-[10%] text-center">
        <span style={{ fontSize: "calc(var(--page-w) * 0.13)" }}>❤️</span>
        <p
          className="mt-[8%] italic leading-snug"
          style={{
            ...serif,
            fontSize: `calc(var(--page-w) * ${big ? 0.095 : 0.058})`,
          }}
        >
          {line}
        </p>
      </div>
    </div>
  )
}

function FaceContent({ face, active }: { face: Face; active: boolean }) {
  if (face.kind === "cover") return <CoverFace line={cover.line} big />
  if (face.kind === "finale") return <FinaleFace active={active} />
  return <PhotoFace photo={face.photo} />
}

function Stanza({ lines }: { lines: string[] }) {
  return (
    <p
      className="stanza-rise text-center italic leading-relaxed text-ink"
      style={{ ...serif, fontSize: "clamp(0.95rem, 1.9vw, 1.5rem)" }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </p>
  )
}

export function Album() {
  const sectionRef = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0)

  // Scroll position inside the tall section decides how far through the poem we are.
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

  // The last stanzas play out against the finished album rather than more turns.
  const turn = Math.min(step, LAST_TURN)
  const closed = turn === 0

  return (
    <section
      ref={sectionRef}
      id="album"
      className="relative w-full"
      style={{ height: `calc(${STEPS} * 100svh)` }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center gap-[3svh] overflow-hidden">
        <AmbientHearts count={12} />

        <div className="album-stage relative z-10">
          <div
            className="album-book"
            style={{
              // Shut, only the right half carries the cover, so nudge it to the middle.
              // Once opened both halves are in use, so it sits centred.
              transform: closed ? "translateX(calc(var(--page-w) / -2))" : "none",
            }}
          >
            {/* Inside of the front cover — only ever seen mid-turn. */}
            <div
              className="album-board album-board--left album-paper transition-opacity duration-300"
              style={{ opacity: closed ? 0 : 1 }}
            />

            {/* Back cover, revealed once every sheet has turned. */}
            <div className="album-board album-board--right">
              <CoverFace line={backCover.line} big={false} />
            </div>

            {sheets.map((sheet, index) => {
              const flipped = index < turn
              return (
                <div
                  key={index}
                  className={cn("album-sheet", flipped && "is-flipped")}
                  style={{ zIndex: sheetDepth(index, turn) }}
                >
                  <div className="album-face album-face--front">
                    <FaceContent face={sheet.front} active={index === turn} />
                  </div>
                  <div className="album-face album-face--back">
                    <FaceContent face={sheet.back} active={index === turn - 1} />
                  </div>
                </div>
              )
            })}

            {!closed && <div className="album-spine" />}
          </div>
        </div>

        {/* One stanza per step. Keyed by step so it replays its entrance each time. */}
        <div className="relative z-10 flex h-[25svh] w-full max-w-2xl items-start justify-center px-6">
          <Stanza key={step} lines={stanzas[Math.min(step, stanzas.length - 1)]} />
        </div>
      </div>

      {/* Snap anchors — one viewport of scrolling per stanza. */}
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
