export interface AlbumPhoto {
  id: string
  /** Modern format, served first. */
  webp: string
  /** Fallback for older browsers. */
  jpg: string
  width: number
  height: number
  alt?: string
  /** Italic line printed on the page under the photo. Replace with your own words. */
  message: string
}

/**
 * One entry per page of the album, in order. Pages are laid out two at a time —
 * photo 1 and 2 are the first spread, 3 and 4 the second, and so on.
 * ── Only the `message` strings need editing. ──
 */
export const photos: AlbumPhoto[] = [
  {
    id: "photo-1",
    webp: "/img1.webp",
    jpg: "/img1.jpg",
    width: 900,
    height: 1600,
    alt: "A moment together",
    message: "Message for page one goes here.",
  },
  {
    id: "photo-2",
    webp: "/img2.webp",
    jpg: "/img2.jpg",
    width: 1200,
    height: 1600,
    alt: "A moment together",
    message: "Message for page two goes here.",
  },
  {
    id: "photo-3",
    webp: "/img3.webp",
    jpg: "/img3.jpg",
    width: 810,
    height: 1800,
    alt: "A moment together",
    message: "Message for page three goes here.",
  },
  {
    id: "photo-4",
    webp: "/img4.webp",
    jpg: "/img4.jpg",
    width: 720,
    height: 1280,
    alt: "A moment together",
    message: "Message for page four goes here.",
  },
  {
    id: "photo-5",
    webp: "/img5.webp",
    jpg: "/img5.jpg",
    width: 720,
    height: 1280,
    alt: "A moment together",
    message: "Message for page five goes here.",
  },
  {
    id: "photo-6",
    webp: "/img6.webp",
    jpg: "/img6.jpg",
    width: 899,
    height: 1599,
    alt: "A moment together",
    message: "Message for page six goes here.",
  },
]

/** Plays on the inside of the back cover, once the album runs out of pages. */
export const finale = {
  src: "/finalvid.mp4",
  poster: "/finalvid-poster.jpg",
  message: "Closing message for the last page goes here.",
}

/** Printed on the front cover. */
export const cover = {
  title: "Us",
  subtitle: "a few of my favourite days",
}
