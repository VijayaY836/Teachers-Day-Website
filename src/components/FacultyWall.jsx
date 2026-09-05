import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react'
import { facultyMembers } from '../data/facultyData'
import './FacultyWall.css'

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const cardIn = {
  hidden: { opacity: 0, y: 28, rotateX: -8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 130, damping: 17 },
  },
}

// Small cute banner shown briefly while the wall settles in. Purely a
// courtesy message, not tied to actual network completion - the real
// speed fix is lazy-loading each photo (see FacultyCard below).
function LoadingBanner() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="faculty__loading"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
        >
          <span className="faculty__loading-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          Rounding up 56 wonderful teachers&hellip;
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FacultyCard({ member }) {
  const [flipped, setFlipped] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const showPhoto = member.photo && !imgError

  // Cursor-driven tilt on the X axis only (a gentle lean toward the
  // pointer). The Y axis is reserved for the flip rotation below, so the
  // two effects combine without fighting over the same transform.
  const my = useMotionValue(0.5)
  const smy = useSpring(my, { stiffness: 150, damping: 14 })
  const tiltX = useTransform(smy, [0, 1], [7, -7])

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    my.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    my.set(0.5)
  }

  return (
    <motion.div
      className="faculty-card"
      variants={cardIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      style={{ '--accent': `var(--${member.accent})`, perspective: 1200 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.button
        className="faculty-card__inner"
        onClick={() => setFlipped((f) => !f)}
        aria-expanded={flipped}
        aria-label={`${member.name}, tap to reveal a little note`}
        style={{ rotateX: tiltX }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ rotateY: { type: 'spring', stiffness: 160, damping: 20 } }}
      >
        <div className="faculty-card__face faculty-card__face--front">
          <div className="faculty-card__photo-slot">
            {showPhoto && (
              <img
                src={member.photo}
                alt={member.name}
                className="faculty-card__photo"
                loading="lazy"
                decoding="async"
                style={{ opacity: imgLoaded ? 1 : 0 }}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            )}
            {(!showPhoto || !imgLoaded) && (
              <div className={`faculty-card__monogram ${showPhoto ? 'is-skeleton' : ''}`}>
                {showPhoto ? '' : initials(member.name)}
              </div>
            )}
          </div>
          <p className="faculty-card__name">{member.name}</p>
          {member.designation && <p className="faculty-card__role">{member.designation}</p>}
          {member.subject && <p className="faculty-card__subject">{member.subject}</p>}
          <span className="faculty-card__flip-hint">tap for a little note</span>
        </div>

        <div className="faculty-card__face faculty-card__face--back">
          <p className="faculty-card__quote-mark">&ldquo;</p>
          <p className="faculty-card__memory">{member.memory}</p>
          <span className="faculty-card__flip-hint">tap to go back</span>
        </div>
      </motion.button>
    </motion.div>
  )
}

function ScrollForMore({ onClick }) {
  return (
    <button className="faculty__scroll-more" onClick={onClick}>
      Scroll for more
      <motion.span
        className="faculty__scroll-more-arrow"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        &darr;
      </motion.span>
    </button>
  )
}

export default function FacultyWall() {
  function scrollForMore(e) {
    const container = e.currentTarget.closest('.page__scroll')
    if (container) {
      container.scrollBy({ top: container.clientHeight * 0.75, behavior: 'smooth' })
    }
  }

  return (
    <section className="section" id="faculty">
      <motion.div
        className="faculty__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow-mark">Faculty wall</p>
        <h2 className="faculty__title">The people behind the lessons.</h2>
      </motion.div>

      <p className="faculty__hint">Tap a card for a little note.</p>

      <LoadingBanner />

      <div className="faculty__scroll-wrap">
        <div className="faculty__grid">
          {facultyMembers.map((member) => (
            <FacultyCard member={member} key={member.id} />
          ))}
        </div>

        <ScrollForMore onClick={scrollForMore} />
      </div>
    </section>
  )
}