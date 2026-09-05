import { motion } from 'motion/react'
import './PageNav.css'

export default function PageNav({ step, totalSteps, onBack, onNext, onJumpTo, nextLabel, nextDisabled }) {
  return (
    <div className="pagenav">
      {step !== 0 ? (
        <motion.button
          className="pagenav__back"
          onClick={onBack}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          &larr; Back
        </motion.button>
      ) : (
        <span className="pagenav__spacer" />
      )}

      <div className="pagenav__dots" role="tablist" aria-label="Page progress">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <button
            key={i}
            className="pagenav__dot-slot"
            onClick={() => onJumpTo(i)}
            aria-label={`Go to page ${i + 1} of ${totalSteps}`}
            aria-current={i === step ? 'page' : undefined}
          >
            {i === step && (
              <motion.span
                layoutId="pagenav-active-dot"
                className="pagenav__dot is-active"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {i !== step && <span className="pagenav__dot" />}
          </button>
        ))}
      </div>

      {!nextDisabled ? (
        <motion.button
          className="pagenav__next"
          onClick={onNext}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          {nextLabel || 'Continue'} &rarr;
        </motion.button>
      ) : (
        <span className="pagenav__spacer" />
      )}
    </div>
  )
}