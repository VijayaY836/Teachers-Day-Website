import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './InteractiveClassroom.css'

const HOTSPOTS = [
  {
    id: 'board',
    label: 'Blackboard',
    top: '14%',
    left: '30%',
    message:
      'Every classroom leaves something behind. Not just notes on a board \u2014 but ideas, questions, confidence, curiosity... and occasionally, terrifying internal marks.',
  },
  {
    id: 'laptop',
    label: 'Laptop',
    top: '58%',
    left: '20%',
    message: 'Forty open tabs, one live demo, and a silent prayer that the wifi holds.',
  },
  {
    id: 'books',
    label: 'Books',
    top: '62%',
    left: '68%',
    message: 'Some of these have more sticky notes than actual pages left.',
  },
  {
    id: 'coffee',
    label: 'Coffee Cup',
    top: '40%',
    left: '78%',
    message: 'Refilled between the 9am lecture and the 9:45 doubt session. Never fully finished.',
  },
  {
    id: 'notice',
    label: 'Notice Board',
    top: '18%',
    left: '80%',
    message: '\u201cInternal marks will be discussed after class\u201d \u2014 four words that silenced entire rows.',
  },
]

export default function InteractiveClassroom() {
  const [active, setActive] = useState(null)

  return (
    <section className="section" id="classroom">
      <motion.div
        className="classroom__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow-mark">A familiar room</p>
        <h2 className="classroom__title">Click around. It&rsquo;s office hours.</h2>
      </motion.div>

      <motion.div
        className="classroom__stage"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="classroom__room" aria-hidden="true">
          <div className="classroom__floor" />
          <div className="classroom__board" />
        </div>

        {HOTSPOTS.map((spot) => (
          <motion.button
            key={spot.id}
            className={`classroom__spot ${active === spot.id ? 'is-active' : ''}`}
            style={{ top: spot.top, left: spot.left }}
            onClick={() => setActive((a) => (a === spot.id ? null : spot.id))}
            aria-expanded={active === spot.id}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="classroom__spot-dot"
              animate={{
                boxShadow: [
                  '0 0 0 6px rgba(234, 90, 60, 0.25)',
                  '0 0 0 12px rgba(234, 90, 60, 0)',
                  '0 0 0 6px rgba(234, 90, 60, 0.25)',
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="classroom__spot-label">{spot.label}</span>
          </motion.button>
        ))}

        <AnimatePresence>
          {HOTSPOTS.filter((s) => s.id === active).map((spot) => (
            <motion.div
              className="classroom__tooltip"
              key={spot.id}
              style={{ top: spot.top, left: spot.left }}
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 14 }}
              exit={{ opacity: 0, scale: 0.85, y: 6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              {spot.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {!active && <p className="classroom__hint">Try the blackboard first.</p>}
    </section>
  )
}