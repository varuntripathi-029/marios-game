export interface Moment {
  id: string
  /** Rendered in italics under the media. Replace these with your own words. */
  message: string
}

export interface ImageMoment extends Moment {
  type: "image"
  /** Modern format, served first. */
  webp: string
  /** Fallback for older browsers. */
  jpg: string
  /** Intrinsic size — reserves space so the page doesn't jump while loading. */
  width: number
  height: number
  alt?: string
}

export interface VideoMoment extends Moment {
  type: "video"
  src: string
}

export type StoryMoment = ImageMoment | VideoMoment

/**
 * The scroll story, in order. Each entry becomes one full-screen section.
 * ── Only the `message` strings need editing. ──
 */
export const moments: StoryMoment[] = [
  {
    id: "moment-1",
    type: "image",
    webp: "/img1.webp",
    jpg: "/img1.jpg",
    width: 900,
    height: 1600,
    alt: "A moment together",
    message: "Your message for the first photo goes here.",
  },
  {
    id: "moment-2",
    type: "image",
    webp: "/img2.webp",
    jpg: "/img2.jpg",
    width: 1200,
    height: 1600,
    alt: "A moment together",
    message: "Your message for the second photo goes here.",
  },
  {
    id: "moment-3",
    type: "image",
    webp: "/img3.webp",
    jpg: "/img3.jpg",
    width: 810,
    height: 1800,
    alt: "A moment together",
    message: "Your message for the third photo goes here.",
  },
  {
    id: "moment-4",
    type: "image",
    webp: "/img4.webp",
    jpg: "/img4.jpg",
    width: 720,
    height: 1280,
    alt: "A moment together",
    message: "Your message for the fourth photo goes here.",
  },
  {
    id: "moment-5",
    type: "image",
    webp: "/img5.webp",
    jpg: "/img5.jpg",
    width: 720,
    height: 1280,
    alt: "A moment together",
    message: "Your message for the fifth photo goes here.",
  },
  {
    id: "moment-final",
    type: "video",
    src: "/finalvid.mp4",
    message: "Your closing message for the final video goes here.",
  },
]
