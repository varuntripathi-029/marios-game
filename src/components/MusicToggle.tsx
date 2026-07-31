import { useEffect, useRef, useState } from "react"
import { Music, Pause } from "lucide-react"

import song from "@/assets/song.mp3"

/** Replace `src/assets/song.mp3` to change the track. */
const MUSIC_SRC = song

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [available, setAvailable] = useState(true)
  const [playing, setPlaying] = useState(false)

  // Deliberately no page-wide listener: the button is the only thing that starts or
  // stops the track. A window-level pointerdown handler also fires when the button
  // itself is pressed, so it began playing and the button's own click then paused it —
  // the first press cancelled itself, and taps anywhere else started the music.
  // Keep playing state in step with the element in case the browser stops it for us.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)
    return () => {
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
    }
  }, [])

  // No track in place yet — stay out of the way entirely.
  if (!available) return null

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      void audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => undefined)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      {/* `metadata` rather than `auto`: enough to notice a missing file and hide the
          button, without pulling megabytes of audio down before she has asked for it. */}
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="metadata"
        onError={() => setAvailable(false)}
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause the music" : "Play the music"}
        className="love-solid fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 hover:scale-[1.08] active:scale-95"
      >
        {playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Music className="h-4 w-4 animate-heartbeat" />
        )}
      </button>

      {/* Points at the button until the track is actually running. */}
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Play the music"
          className="hint-appear fixed right-3 top-[4.1rem] z-40 flex flex-col items-end text-white"
          style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.55))" }}
        >
          <span className="hint-bob flex flex-col items-end">
            <svg
              viewBox="0 0 60 60"
              aria-hidden
              className="mr-2 h-11 w-11"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 56 C 6 30, 20 12, 46 7" />
              <path d="M34 4 L48 7 L41 19" />
            </svg>
            <span
              className="mt-1 max-w-[8.5rem] text-right text-sm italic leading-snug"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              psst… turn the music on ♪
            </span>
          </span>
        </button>
      )}
    </>
  )
}
