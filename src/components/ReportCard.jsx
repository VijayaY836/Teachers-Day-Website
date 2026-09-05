import { motion } from 'motion/react'
import { reportCardRows } from '../data/reportCardData'
import './ReportCard.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const row = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 150, damping: 20 } },
}

export default function ReportCard() {
  return (
    <section className="section" id="report-card">
      <motion.div
        className="rc__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow-mark">A brief interruption for humour</p>
        <h2 className="rc__title">Teacher&rsquo;s Day Report Card</h2>
        <p className="rc__sub">Grading period: every semester we&rsquo;ve been here.</p>
      </motion.div>

      <motion.div
        className="rc__table"
        role="table"
        aria-label="Teacher's Day report card"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="rc__row rc__row--head" role="row">
          <span role="columnheader">Metric</span>
          <span role="columnheader">Grade</span>
        </div>
        {reportCardRows.map((r) => (
          <motion.div
            className="rc__row"
            role="row"
            key={r.label}
            variants={row}
            whileHover={{ backgroundColor: 'var(--ivory-deep)' }}
          >
            <span className="rc__label" role="cell">
              {r.label}
              <em className="rc__note">{r.note}</em>
            </span>
            <motion.span
              className="rc__grade"
              role="cell"
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
            >
              {r.grade}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}