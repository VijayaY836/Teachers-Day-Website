import { useReveal } from '../hooks/useReveal'

/**
 * Wraps any content and fades/slides it up the first time it enters
 * the viewport. Pass stagger to animate direct children one after another
 * (used for grids of cards/notes).
 */
export default function Reveal({ as: Tag = 'div', stagger = false, className = '', children, ...rest }) {
  const [ref, visible] = useReveal()
  const base = stagger ? 'reveal-stagger' : 'reveal'
  return (
    <Tag
      ref={ref}
      className={`${base} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  )
}