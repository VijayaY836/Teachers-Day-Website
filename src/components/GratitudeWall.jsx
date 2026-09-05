import { motion } from 'motion/react'
import { gratitudeNotes } from '../data/gratitudeData'
import './GratitudeWall.css'

const NOTE_COLORS = ['coral', 'peach', 'pink', 'lavender', 'mint', 'sky', 'sun']
const ROTATIONS = [-4, 3, -2, 5, -5, 2, -3, 4, -1, 1, -6, 6]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

// Two nested motion elements so the staggered "arrival" animation (driven
// by the parent's whileInView variant) and the continuous drift loop
// (an independent, always-running animation) don't fight over the same
// animate prop.
function Note({ note, rotation, delay, color }) {
  return (
    <motion.span
      className="gratitude__note-enter"
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.9 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: 'spring', stiffness: 150, damping: 16 },
        },
      }}
    >
      <motion.span
        className="gratitude__note"
        style={{ '--accent': `var(--${color})` }}
        animate={{
          y: [0, -7, 0],
          rotate: [rotation, rotation * -1, rotation],
        }}
        transition={{
          duration: 6 + delay,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
        whileHover={{ scale: 1.06, y: -10, zIndex: 2 }}
      >
        {note}
      </motion.span>
    </motion.span>
  )
}

export default function GratitudeWall() {
  return (
    <section className="section" id="gratitude">
      <motion.div
        className="gratitude__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow-mark">Wall of gratitude</p>
        <h2 className="gratitude__title">Hundreds of small thank-yous, finally in one place.</h2>
      </motion.div>

      <motion.div
        className="gratitude__grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {gratitudeNotes.map((note, i) => (
          <Note
            key={i}
            note={note}
            rotation={ROTATIONS[i % ROTATIONS.length]}
            delay={(i % 6) * 0.3}
            color={NOTE_COLORS[i % NOTE_COLORS.length]}
          />
        ))}
      </motion.div>
    </section>
  )
}