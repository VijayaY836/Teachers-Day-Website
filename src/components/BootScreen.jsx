import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './BootScreen.css'

const LOAD_LINES = [
  { text: 'Loading memories...', status: 'ok' },
  { text: 'Loading lessons...', status: 'ok' },
  { text: 'Loading gratitude...', status: 'ok' },
  { text: 'Loading terrible jokes...', status: 'ok' },
  { text: 'Loading student excuses...', status: 'error' },
]

export default function BootScreen({ onFinish }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [ready, setReady] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (visibleLines >= LOAD_LINES.length) {
      const t = setTimeout(() => setReady(true), 450)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setVisibleLines((n) => n + 1), 420)
    return () => clearTimeout(t)
  }, [visibleLines])

  function handleRun() {
    setClosing(true)
    setTimeout(onFinish, 700)
  }

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          className="boot"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="boot__glow" aria-hidden="true" />
          <motion.div
            className="boot__window"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 170, damping: 20 }}
          >
            <div className="boot__titlebar">
              <span className="boot__dot" style={{ background: 'var(--coral)' }} />
              <span className="boot__dot" style={{ background: 'var(--sun)' }} />
              <span className="boot__dot" style={{ background: 'var(--mint)' }} />
              <span className="boot__titletext">teachers_day.exe</span>
            </div>
            <div className="boot__body">
              <p className="boot__line boot__line--head">INITIALIZING TEACHER&rsquo;S DAY.exe</p>
              <div className="boot__lines">
                <AnimatePresence initial={false}>
                  {LOAD_LINES.slice(0, visibleLines).map((line, i) => (
                    <motion.p
                      key={i}
                      className="boot__line"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {line.text}{' '}
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.15 }}
                        className={line.status === 'ok' ? 'boot__ok' : 'boot__error'}
                      >
                        {line.status === 'ok' ? '\u2713' : 'ERROR'}
                      </motion.span>
                    </motion.p>
                  ))}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {ready && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 160, damping: 20 }}
                    className="boot__ready"
                  >
                    <p className="boot__line boot__line--system">SYSTEM READY.</p>
                    <p className="boot__prompt">
                      <motion.span
                        className="boot__caret"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        &gt;
                      </motion.span>{' '}
                      Execute?
                    </p>
                    <motion.button
                      className="boot__run"
                      onClick={handleRun}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                    >
                      RUN
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}