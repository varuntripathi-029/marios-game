export interface AlbumPhoto {
  id: string
  /** Modern format, served first. */
  webp: string
  /** Fallback for older browsers. */
  jpg: string
  width: number
  height: number
  alt?: string
}

/**
 * One entry per page of the album, in order. Pages are laid out two at a time —
 * photo 1 and 2 are the first spread, 3 and 4 the second, and so on.
 */
export const photos: AlbumPhoto[] = [
  { id: "photo-1", webp: "/img1.webp", jpg: "/img1.jpg", width: 900, height: 1600, alt: "A moment together" },
  { id: "photo-2", webp: "/img2.webp", jpg: "/img2.jpg", width: 1200, height: 1600, alt: "A moment together" },
  { id: "photo-3", webp: "/img3.webp", jpg: "/img3.jpg", width: 810, height: 1800, alt: "A moment together" },
  { id: "photo-4", webp: "/img4.webp", jpg: "/img4.jpg", width: 720, height: 1280, alt: "A moment together" },
  { id: "photo-5", webp: "/img5.webp", jpg: "/img5.jpg", width: 720, height: 1280, alt: "A moment together" },
  { id: "photo-6", webp: "/img6.webp", jpg: "/img6.jpg", width: 899, height: 1599, alt: "A moment together" },
]

/** Plays on the page facing the back cover, once the album runs out of pages. */
export const finale = {
  src: "/finalvid.mp4",
  poster: "/finalvid-poster.jpg",
}

/** Printed on the front cover. */
export const cover = {
  line: "look what i made hehe :)",
}

/** Printed on the back cover, opposite the video. */
export const backCover = {
  line: "im gonna make a real one soon but with more memories, ignore anaiza, but that photo just says how much you love your peeps, and i know you love me more than her",
}

/**
 * "Let Us Begin, Dear Love, Where We Left Off" — Ella Wheeler Wilcox.
 * One stanza per scroll step, printed under the album as the pages turn.
 */
export const stanzas: string[][] = [
  [
    "Let us begin, dear love, where we left off;",
    "Tie up the broken threads of that old dream,",
    "And go on happy as before, and seem",
    "Lovers again, though all the world may scoff.",
  ],
  [
    "Let us forget the graves which lie between",
    "Our parting and our meeting, and the tears",
    "That rusted out the gold-work of the years,",
    "The frosts that fell upon our gardens green.",
  ],
  [
    "Let us forget the cold, malicious Fate",
    "Who made our loving hearts her idle toys,",
    "And once more revel in the old sweet joys",
    "Of happy love. Nay, it is not too late!",
  ],
  [
    "Forget the deep-ploughed furrows in my brow;",
    "Forget the silver gleaming in my hair;",
    "Look only in my eyes! Oh! darling, there",
    "The old love shone no warmer then than now.",
  ],
  [
    "Down in the tender deeps of thy dear eyes",
    "I find the lost sweet memory of my youth,",
    "Bright with the holy radiance of thy truth,",
    "And hallowed with the blue of summer skies.",
  ],
  [
    "Tie up the broken threads and let us go,",
    "Like reunited lovers, hand in hand,",
    "Back, and yet onward, to the sunny land",
    "Of our To Be, which was our Long Ago.",
  ],
]
