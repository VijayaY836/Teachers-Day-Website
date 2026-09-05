import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import './EasterEgg.css'

const CONFESSIONS = [
  'Yes, we actually read the announcement.',
  'Yes, we noticed when you cancelled class.',
  'No, we did not understand the first explanation.',
  'Yes, we appreciate you.',
  'No, we probably won\u2019t say it in person.',
]

export default function EasterEgg() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="egg-trigger"
        onClick={() => setOpen(true)}
        aria-label="A small secret, for faculty only"
      >
        Psst&hellip; faculty only.
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="egg-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="egg-card"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="egg-card__title">Things Students Will Never Admit</p>
              <ul className="egg-card__list">
                {CONFESSIONS.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <button className="egg-card__close" onClick={() => setOpen(false)}>
                close this before someone sees
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}