import { useEffect, useRef } from "react"

import type { StoryMoment } from "@/data/moments"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

interface MomentSectionProps {
  moment: StoryMoment
  index: number
}

/**
 * Full-bleed on phones. On wider screens the media becomes a full-height 9:16 column
 * so faces don't get cropped away, with a blurred fill either side.
 *
 * Centering is done with flex rather than a translate utility — `.reveal` animates
 * `transform`, and a Tailwind translate class on the same element would override it.
 */
const columnClass =
  "relative h-full w-full overflow-hidden md:w-auto md:aspect-[9/16] md:rounded-[28px] md:shadow-2xl"

const mediaClass = "h-full w-full object-cover"

export function MomentSection({ moment, index }: MomentSectionProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.35 })
  const videoRef = useRef<HTMLVideoElement>(null)

  // Only fetch and play the video while its section is on screen.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (inView) {
      void video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }, [inView])

  const isImage = moment.type === "image"

  return (
    <section
      ref={ref}
      id={moment.id}
      className="relative h-[100svh] w-full snap-start snap-always overflow-hidden"
      style={{ scrollSnapStop: "always" }}
    >
      {/* Blurred fill behind the column on wide screens. */}
      {isImage && (
        <img
          src={moment.webp}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-3xl"
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center md:py-8">
        <div className={cn(columnClass, "reveal", inView && "reveal-in")}>
          {isImage ? (
            <picture>
              <source srcSet={moment.webp} type="image/webp" />
              <img
                src={moment.jpg}
                alt={moment.alt ?? ""}
                width={moment.width}
                height={moment.height}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className={mediaClass}
              />
            </picture>
          ) : (
            <video
              ref={videoRef}
              src={moment.src}
              loop
              muted
              playsInline
              preload="none"
              className={mediaClass}
            />
          )}

          {/* Scrim so the white message stays readable over any photo. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <p
            className={cn(
              "absolute inset-x-0 bottom-0 px-8 pb-14 text-balance text-center text-2xl italic leading-relaxed text-white sm:text-3xl",
              "reveal-message",
              inView && "reveal-message-in"
            )}
            style={{
              fontFamily: "'Instrument Serif', serif",
              textShadow: "0 2px 18px rgba(0,0,0,0.65)",
            }}
          >
            {moment.message}
          </p>
        </div>
      </div>
    </section>
  )
}
