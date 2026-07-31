# marios-gift

A single-page scroll story: fullscreen video hero, then one full-screen section per
photo with an italic message over it, ending in a button that rains flowers.

React 18 · Vite 6 · TypeScript · Tailwind CSS 3 · shadcn/ui

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build at http://localhost:4173 |

## Editing the words

Everything you'd want to change lives in **`src/data/album.ts`** — the front cover line,
the back cover line, and the poem stanzas. The hero headline and subtext are in
`src/components/Hero.tsx`; the closing lines are two constants at the top of
`src/components/Ending.tsx`.

## How the album works

- Six photos are bound into four sheets: the front cover backs onto photo 1, photo 2
  backs onto photo 3, and so on. Turning the last sheet reveals the back cover with
  `finalvid.mp4` on the facing page.
- Each turn is a 3D `rotateY` on a sheet with a front and a back face, eased slowly with
  a little overshoot. A sticky viewport holds the book still while snap anchors give one
  turn per scroll step.
- `sheetDepth()` in `Album.tsx` gives every sheet its own stacking layer. Tied
  z-indexes fall back to DOM order and let pages bleed through each other mid-turn.
- One stanza of the poem sits under the album per scroll step, six steps for six
  stanzas. The album runs out of pages at step 4, so the last two stanzas play out
  against the finished book.
- Pages are sized from `--page-w` in `index.css`, clamped against viewport width and
  height so the spread always fits. Phones get taller pages via `--page-ratio`, since
  they have height to spare but no width.
- Respects `prefers-reduced-motion`: snapping, springs, and the heart rain all turn off.

## Music

Replace **`src/assets/song.mp3`** to change the track. A play/pause button sits at the
top right, with an arrow pointing at it until the music starts. Browsers refuse to play
audio until the visitor has interacted with the page, so the track begins on her first
tap or click anywhere.

## Caching, and why media lives in `src/assets/`

Every image, video and the audio file is **imported** rather than referenced by a
literal `/name.ext` path. Vite stamps a content hash into each filename at build time,
so replacing a photo changes its URL.

That matters because `vercel.json` marks build output `immutable` for a year. A stable
filename behind that header means swapping the file is invisible to anyone who has
already loaded the page — their browser never even asks the server again. Keep media in
`src/assets/` and imported, and this cannot happen. Only `favicon.svg` lives in
`public/`, on a one-day cache, because `index.html` refers to it by literal path.

To replace a photo: resize it the same way, overwrite both formats in `src/assets/`, and
update the `width`/`height` in `src/data/album.ts` if the aspect ratio changed.

## Deploying to Vercel

`vercel.json` sets the framework preset, an SPA rewrite, and a one-year immutable cache
on media. Two ways to ship:

### Option A — Vercel CLI

```bash
vercel login
vercel --prod
```

### Option B — GitHub

Push to the repo, then on vercel.com: **Add New → Project → import it**. Vercel detects
Vite and reads `vercel.json`. Every push to `main` redeploys.

## Media

Source files live in `assets/`. The versions actually served are in `public/`:

- Photos were resized to max 1800px tall and exported as `.webp` (served first) with
  `.jpg` fallbacks — 2.5 MB of originals down to ~450 KB of WebP.
- `landingvid.mp4` (0.9 MB) is the hero background. It is encoded 480×848 with no
  rotation flag, so the browser paints it sideways — the `.hero-video` rule in
  `src/index.css` rotates it 90° and swaps its width/height so the rotated box fills the
  viewport exactly. Flip `rotate(90deg)` to `rotate(-90deg)` if it ever lands upside
  down.
- `finalvid.mp4` (4.9 MB, 1080×1920 after its rotation matrix) is the last moment. It
  stays portrait, fills the screen with `object-fit: cover`, and uses `preload="none"`
  so it only downloads once you scroll to it.

If you replace a photo, resize it the same way, drop both formats in `public/`, and
update the entry in `src/data/moments.ts`.
