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

## Editing the messages

Everything you'd want to change lives in **`src/data/moments.ts`** — one entry per
full-screen section, in scroll order. Edit the `message` strings; the page hot-reloads.

The hero headline and subtext are in `src/components/Hero.tsx`, and the closing button
is in `src/components/Ending.tsx`.

## How the scroll story works

- `scroll-snap-type: y mandatory` plus `scroll-snap-stop: always` means each section
  takes the whole viewport — you land on one moment at a time.
- Reveals use a slow spring easing (`cubic-bezier(0.22, 1.25, 0.32, 1)`, ~1.5s) so media
  settles into place rather than snapping. The message follows 0.45s behind its photo.
- Photos are full-bleed on phones. On wider screens they become a full-height 9:16
  column with a blurred fill either side, so faces never get cropped out.
- Respects `prefers-reduced-motion`: snapping, springs, and the flower rain all turn off.

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
- `landingvid.mp4` (0.9 MB, 480×848) is the hero background; `finalvid.mp4` (4.9 MB) is
  the last moment and uses `preload="none"`, so it only downloads once you scroll to it.

If you replace a photo, resize it the same way, drop both formats in `public/`, and
update the entry in `src/data/moments.ts`.
