import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { concepts } from '../data/conceptsData'
import './ConceptCards.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const card = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 130, damping: 16 },
  },
}

function ConceptCard({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.button
      layout
      variants={card}
      className="concept"
      style={{ '--accent': `var(--${item.accent})` }}
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ layout: { type: 'spring', stiffness: 220, damping: 24 } }}
    >
      <motion.span layout="position" className="concept__tag">
        {item.tag}
      </motion.span>
      <motion.pre layout="position" className="concept__snippet">
        {item.snippet}
      </motion.pre>

      <motion.span layout="position" className="concept__divider" aria-hidden="true" />

      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            className="concept__lesson is-shown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {item.lesson}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span layout="position" className="concept__hint">
        {open ? 'tap to close' : 'tap to reveal the lesson'}
      </motion.span>
    </motion.button>
  )
}

export default function ConceptCards() {
  return (
    <section className="section" id="lessons">
      <motion.div
        className="concepts__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow-mark">Things you taught us</p>
        <h2 className="concepts__title">The syllabus said one thing. We learned another.</h2>
      </motion.div>

      <motion.div
        className="concepts__grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {concepts.map((item) => (
          <ConceptCard key={item.tag} item={item} />
        ))}
      </motion.div>
    </section>
  )
}