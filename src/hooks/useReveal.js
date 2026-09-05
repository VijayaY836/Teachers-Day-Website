import { useEffect, useRef, useState } from 'react'

/**
 * useReveal - attaches an IntersectionObserver to an element and flips
 * `visible` to true the first time it scrolls into view. Used to drive
 * the .reveal / .reveal-stagger CSS classes defined in index.css.
 */
export function useReveal(threshold = 0.2) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}