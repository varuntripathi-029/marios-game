import { useEffect, useRef, useState } from "react"

interface Options {
  /** Fraction of the element that must be visible before it counts as in view. */
  threshold?: number
  /** Shrinks the viewport so the reveal fires a little after the element enters. */
  rootMargin?: string
  /** Keep the revealed state once it has fired (default) or re-hide on exit. */
  once?: boolean
}

/**
 * Tracks whether an element is inside the viewport. Used to drive the
 * `.reveal` / `.reveal-in` classes defined in index.css.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.25,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
