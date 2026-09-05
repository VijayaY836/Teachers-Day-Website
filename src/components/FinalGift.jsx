import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from './Reveal'
import { facultyMembers } from '../data/facultyData'
import './FinalGift.css'

const PIECE_COLORS = ['coral', 'peach', 'pink', 'lavender', 'mint', 'sky', 'sun']
const SKIP_VALUE = '__surprise__'

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function ConfettiField() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.4 + Math.random() * 1.6,
        color: PIECE_COLORS[i % PIECE_COLORS.length],
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 120,
      })),
    []
  )

  return (
    <div className="gift__confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="gift__confetti-piece"
          style={{
            left: `${p.left}%`,
            background: `var(--${p.color})`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--rotate': `${p.rotate}deg`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

// Same flip mechanic as the Faculty Wall cards (proven to render photos
// correctly) - a front face you tap, and a back face with their details.
function FlipCard({ person, accent, flipped, onToggle }) {
  return (
    <div className="pcard-wrapper">
      <motion.button
        className="pcard-inner"
        onClick={onToggle}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        aria-label={flipped ? 'Flip the card back' : 'Flip the card over'}
      >
        <div className="pcard-face pcard-face--front" style={{ '--accent': `var(--${accent})` }}>
          <span className="pcard-front-sparkle pcard-front-sparkle--1">&hearts;</span>
          <span className="pcard-front-sparkle pcard-front-sparkle--2">&#10022;</span>
          <span className="pcard-front-sparkle pcard-front-sparkle--3">&hearts;</span>
          <span className="pcard-front-icon">&#127873;</span>
          <p className="pcard-front-title">A little something for you</p>
          <p className="pcard-front-sub">Happy Teacher&rsquo;s Day</p>
          <span className="pcard-front-hint">tap to open</span>
        </div>

        <div className="pcard-face pcard-face--back" style={{ '--accent': `var(--${accent})` }}>
          <div className="pcard-details">
            <span className="pcard-details-sparkle pcard-details-sparkle--1">&#10022;</span>
            <span className="pcard-details-sparkle pcard-details-sparkle--2">&#10022;</span>

            <div className="pcard-photo-frame">
              {person?.photo ? (
                <img src={person.photo} alt={person.name} className="pcard-photo" />
              ) : person ? (
                <span className="pcard-monogram">{initials(person.name)}</span>
              ) : (
                <span className="pcard-heart">&hearts;</span>
              )}
            </div>

            <p className="pcard-name">{person ? person.name : 'Dear Teacher'}</p>

            {person?.memory && <p className="pcard-quote">&ldquo;{person.memory}&rdquo;</p>}

            <p className="pcard-message">
              Thank you for the patience, the belief, and the countless small moments that
              added up to everything. You made this all feel possible.
            </p>

            <p className="pcard-closing">
              Happy Teacher&rsquo;s Day <span className="pcard-closing-heart">&hearts;</span>
            </p>
            <p className="pcard-sign">With gratitude, CSE Department</p>
          </div>
        </div>
      </motion.button>
    </div>
  )
}

export default function FinalGift() {
  const [stage, setStage] = useState('prompt') // prompt -> select -> reveal
  const [personId, setPersonId] = useState(null)
  const [selection, setSelection] = useState('')
  const [flipped, setFlipped] = useState(false)

  const person = facultyMembers.find((f) => f.id === personId) || null
  const accent = person?.accent || 'coral'

  function confirmSelection() {
    setPersonId(selection === SKIP_VALUE || !selection ? null : selection)
    setStage('reveal')
  }

  function toggleFlip() {
    setFlipped((f) => !f)
  }

  function goToSelect() {
    setStage('select')
    setFlipped(false)
  }

  function reset() {
    setStage('prompt')
    setPersonId(null)
    setSelection('')
    setFlipped(false)
  }

  return (
    <section className="section section--narrow gift" id="gift">
      <AnimatePresence mode="wait">
        {stage === 'prompt' && (
          <motion.div
            key="prompt"
            className="gift__prompt"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
          >
            <Reveal as="p" className="gift__eyebrow">
              One last thing&hellip;
            </Reveal>
            <Reveal as="button" className="gift__button" onClick={() => setStage('select')}>
              Open Your Gift
            </Reveal>
          </motion.div>
        )}

        {stage === 'select' && (
          <motion.div
            key="select"
            className="gift__select"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="gift__select-title">Whose gift is this?</p>
            <p className="gift__select-sub">Pick your name so the card is actually yours.</p>

            <select
              className="gift__select-dropdown"
              value={selection}
              onChange={(e) => setSelection(e.target.value)}
            >
              <option value="" disabled>
                Select your name&hellip;
              </option>
              {facultyMembers.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
              <option value={SKIP_VALUE}>Just show me the surprise</option>
            </select>

            <motion.button
              className="gift__select-confirm"
              disabled={!selection}
              onClick={confirmSelection}
              whileHover={selection ? { y: -2 } : {}}
              whileTap={selection ? { scale: 0.97 } : {}}
            >
              Open My Card
            </motion.button>
          </motion.div>
        )}

        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            className="gift__reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {flipped && <ConfettiField />}

            <FlipCard person={person} accent={accent} flipped={flipped} onToggle={toggleFlip} />

            <button className="gift__change-name" onClick={goToSelect}>
              &larr; Back to name selection
            </button>

            <AnimatePresence>
              {flipped && (
                <motion.div
                  className="gift__post-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="gift__madewith">Made with &hearts; by the students of CSE</p>

                  <button className="gift__replay" onClick={reset}>
                    Replay Experience &#8635;
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}