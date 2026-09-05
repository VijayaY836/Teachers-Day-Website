import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import './Hero.css'

// Small inline SVG doodles used across the hero. Kept simple and line-based
// so they read as "hand-drawn" rather than clip-art.
function DoodleBook(props) {
  return (
    <svg viewBox="0 0 64 48" fill="none" {...props}>
      <path d="M32 8C26 4 16 3 6 6v32c10-3 20-2 26 2 6-4 16-5 26-2V6c-10-3-20-2-26 2Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M32 8v32" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  )
}

function DoodleCoffee(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M10 18h22v12a11 11 0 0 1-11 11h0A11 11 0 0 1 10 30V18Z" stroke="currentColor" strokeWidth="2.2" />
      <path d="M32 20h4a5 5 0 0 1 0 10h-3" stroke="currentColor" strokeWidth="2.2" />
      <path d="M16 10c-1 2 1.5 2.5 1 5M22 10c-1 2 1.5 2.5 1 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// This doodle draws itself in with an animated stroke (SVG pathLength) the
// first time the hero mounts, rather than just fading in like the others.
function DoodleCircuit(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <motion.path
        d="M8 16h16v10h10v10h22"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.6, ease: 'easeInOut' }}
      />
      <circle cx="8" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="34" cy="36" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="56" cy="36" r="3" stroke="currentColor" strokeWidth="2" />
      <motion.path
        d="M14 46h14v-10"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4, ease: 'easeInOut' }}
      />
      <circle cx="14" cy="46" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function DoodleFlower(props) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <circle cx="20" cy="20" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="9" r="5.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="31" r="5.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="20" r="5.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="31" cy="20" r="5.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function DoodleNotebook(props) {
  return (
    <svg viewBox="0 0 48 56" fill="none" {...props}>
      <rect x="6" y="4" width="36" height="48" rx="4" stroke="currentColor" strokeWidth="2.2" />
      <path d="M14 18h20M14 26h20M14 34h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 12h6M2 20h6M2 28h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

const DOODLES = [
  { Icon: DoodleBook, top: '12%', left: '8%', size: 68, color: 'var(--coral)', depth: 26 },
  { Icon: DoodleCoffee, top: '68%', left: '10%', size: 48, color: 'var(--peach)', depth: 14 },
  { Icon: DoodleCircuit, top: '18%', left: '86%', size: 74, color: 'var(--sky)', depth: 34 },
  { Icon: DoodleFlower, top: '72%', left: '88%', size: 42, color: 'var(--pink)', depth: 18 },
  { Icon: DoodleNotebook, top: '40%', left: '92%', size: 44, color: 'var(--lavender)', depth: 22 },
]

// Orchestrates the heading, badge and CTA appearing one after another with
// a soft spring, rather than all at once.
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 140, damping: 18 },
  },
}

function Doodle({ Icon, top, left, size, color, depth, mx, my }) {
  // Each doodle drifts a different amount depending on its "depth" for a
  // subtle parallax layering effect as the cursor moves across the hero.
  const x = useTransform(mx, (v) => v * depth)
  const y = useTransform(my, (v) => v * depth)

  return (
    <motion.span
      className="hero__doodle"
      style={{ top, left, width: size, height: size, color, x, y }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: 0.85,
        scale: 1,
        rotate: [0, 3, -3, 0],
      }}
      transition={{
        opacity: { duration: 0.6 },
        scale: { type: 'spring', stiffness: 120, damping: 12 },
        rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <Icon width="100%" height="100%" />
    </motion.span>
  )
}

export default function Hero({ onEnter }) {
  // Raw cursor position (-0.5 to 0.5 across the hero), smoothed with a
  // spring so the parallax never feels twitchy.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 })
  const my = useSpring(rawY, { stiffness: 60, damping: 18 })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section className="hero" onMouseMove={handleMouseMove}>
      <div className="hero__field" aria-hidden="true">
        {DOODLES.map((d, i) => (
          <Doodle key={i} {...d} mx={mx} my={my} />
        ))}
      </div>

      <motion.div className="hero__content" variants={container} initial="hidden" animate="show">
        <motion.p variants={item} className="hero__kicker">
          CSE Department &middot; Teacher&rsquo;s Day
        </motion.p>
        <motion.h1 variants={item} className="hero__line">
          To the ones who taught us
        </motion.h1>
        <motion.h1 variants={item} className="hero__line hero__line--accent">
          more than code.
        </motion.h1>

        <motion.div variants={item} className="hero__badge">
          <span className="hero__badge-main">HAPPY TEACHER&rsquo;S DAY</span>
          <span className="hero__badge-sub">from the CSE Department</span>
        </motion.div>

        <motion.button
          variants={item}
          className="hero__cta"
          onClick={onEnter}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 16 }}
        >
          Enter the Classroom
          <motion.span
            className="hero__cta-arrow"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            &rarr;
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  )
}