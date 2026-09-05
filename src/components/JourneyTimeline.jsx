import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { journeyStages } from '../data/journeyData'
import './JourneyTimeline.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 130, damping: 18 },
  },
}

export default function JourneyTimeline() {
  const listRef = useRef(null)

  // The connecting line's fill progress is tied to how far this list has
  // scrolled through view, rather than a fixed reveal - it visibly "draws"
  // itself as you move through the timeline.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.85', 'end 0.4'],
  })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section className="section" id="journey">
      <motion.div
        className="journey__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow-mark">Our journey</p>
        <h2 className="journey__title">Every stage, and you were part of it.</h2>
      </motion.div>

      <motion.ol
        ref={listRef}
        className="journey__list"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.span className="journey__line-track" aria-hidden="true">
          <motion.span className="journey__line-fill" style={{ scaleY: lineProgress }} />
        </motion.span>

        {journeyStages.map((stage, i) => (
          <motion.li className="journey__item" variants={item} key={stage.label}>
            <motion.span
              className="journey__marker"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
            >
              {String(i + 1).padStart(2, '0')}
            </motion.span>
            <div className="journey__body">
              <p className="journey__label">{stage.label}</p>
              <p className="journey__detail">{stage.detail}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <motion.p
        className="journey__closing"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      >
        You were part of every step.
      </motion.p>
    </section>
  )
}