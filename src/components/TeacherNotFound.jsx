import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { useRef } from 'react'
import './TeacherNotFound.css'

const TRAITS = ['PATIENCE', 'KNOWLEDGE', 'KINDNESS', 'DEDICATION']

export default function TeacherNotFound() {
  const ref = useRef(null)
  const visible = useInView(ref, { amount: 0.4, once: true })
  const [stage, setStage] = useState('idle') // idle -> searching -> error -> resolved

  useEffect(() => {
    if (!visible || stage !== 'idle') return
    const t1 = setTimeout(() => setStage('searching'), 300)
    const t2 = setTimeout(() => setStage('error'), 1700)
    const t3 = setTimeout(() => setStage('resolved'), 3000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [visible, stage])

  return (
    <section className="section section--narrow" ref={ref}>
      <motion.div
        className="nf"
        initial={{ opacity: 0, y: 24 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <p className="nf__call">searching_for_teacher()</p>

        <div className="nf__console">
          <AnimatePresence>
            {(stage === 'searching' || stage === 'error' || stage === 'resolved') && (
              <motion.p
                className="nf__searching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Searching{stage === 'searching' ? <span className="nf__dots" /> : '...'}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(stage === 'error' || stage === 'resolved') && (
              <motion.div
                className="nf__error-block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              >
                <motion.p
                  className="nf__error-code"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                >
                  ERROR 404
                </motion.p>
                <p className="nf__error-msg">No other teacher found with this combination of:</p>
                <motion.div
                  className="nf__traits"
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                >
                  {TRAITS.map((t) => (
                    <motion.span
                      className="nf__trait"
                      key={t}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8, y: 8 },
                        show: { opacity: 1, scale: 1, y: 0 },
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {stage === 'resolved' && (
              <motion.div
                className="nf__resolved"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 0.1 }}
              >
                <p className="nf__resolved-line">No replacement required.</p>
                <p className="nf__resolved-line nf__resolved-line--accent">
                  We already found the best ones.
                </p>
                <motion.p
                  className="nf__final"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.3 }}
                >
                  Happy Teacher&rsquo;s Day &hearts;
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}