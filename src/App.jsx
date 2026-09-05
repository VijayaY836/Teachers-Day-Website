import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
// import BootScreen from './components/BootScreen' // "teachers_day.exe" boot sequence — hidden, re-add to bring it back
import Hero from './components/Hero'
import LetterSection from './components/LetterSection'
// import ConceptCards from './components/ConceptCards' // "Things You Taught Us" — hidden, re-add to bring the page back
// import ReportCard from './components/ReportCard' // "Report Card" — hidden, re-add to bring the page back
// import TeacherNotFound from './components/TeacherNotFound' // "searching_for_teacher()" 404 joke — hidden, re-add to bring the page back
import FacultyWall from './components/FacultyWall'
import GratitudeWall from './components/GratitudeWall'
// import JourneyTimeline from './components/JourneyTimeline' // "Our Journey" — hidden, re-add to bring the page back
// import InteractiveClassroom from './components/InteractiveClassroom' // "A Familiar Room" — hidden, re-add to bring the page back
// import EasterEgg from './components/EasterEgg' // re-enable when ready to show the hidden trigger again
import FinalGift from './components/FinalGift'
import PageNav from './components/PageNav'
import './App.css'

// Each entry is one full "page" of the experience. `cta` is the label shown
// on the Continue button that takes the visitor to the next page - it
// doubles as a chapter title, so the wording continues the story.
const PAGES = [
  { key: 'hero', Component: Hero, nav: false, bg: 'ivory-overlay' },
  { key: 'letter', Component: LetterSection, cta: 'Meet the Faculty', bg: 'ivory-overlay' },
  // { key: 'lessons', Component: ConceptCards, cta: 'A Brief Interruption', bg: 'ivory-overlay' },
  // { key: 'report', Component: ReportCard, cta: 'One More Search', bg: 'ivory-overlay' },
  // { key: '404', Component: TeacherNotFound, cta: 'Meet the Faculty', bg: 'ivory-overlay' },
  { key: 'faculty', Component: FacultyWall, cta: 'Wall of Gratitude', bg: 'ivory-deep-overlay' },
  { key: 'gratitude', Component: GratitudeWall, cta: 'One Last Thing', bg: 'ivory-overlay' },
  // { key: 'journey', Component: JourneyTimeline, cta: 'The Classroom', bg: 'ivory-overlay' },
  // { key: 'classroom', Component: InteractiveClassroom, cta: 'One Last Thing', bg: 'ivory-deep-overlay' },
  { key: 'gift', Component: FinalGift, nav: 'back-only', bg: 'ivory-overlay' },
]

const pageVariants = {
  initial: { opacity: 0, y: 28, scale: 0.99 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 160, damping: 22 },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.99,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
}

// A thin bar across the very top of each page that fills as you scroll
// through that page's own content - a small signal of "how much is left
// here" without turning the whole site back into one long scroll.
function PageProgress({ containerRef }) {
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return <motion.div className="page__progress" style={{ scaleX }} />
}

export default function App() {
  const [index, setIndex] = useState(0)
  const scrollRef = useRef(null)

  const page = PAGES[index]
  const { Component } = page
  const isLast = index === PAGES.length - 1

  function goNext() {
    setIndex((i) => Math.min(i + 1, PAGES.length - 1))
  }

  function goBack() {
    setIndex((i) => Math.max(i - 1, 0))
  }

  function jumpTo(i) {
    setIndex(Math.max(0, Math.min(i, PAGES.length - 1)))
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <motion.div
          key={page.key}
          className="page"
          style={{ background: `var(--${page.bg})` }}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <PageProgress containerRef={scrollRef} />

          <div className="page__scroll" ref={scrollRef}>
            {page.key === 'hero' ? <Component onEnter={goNext} /> : <Component />}
          </div>

          {page.nav !== false && (
            <PageNav
              step={index}
              totalSteps={PAGES.length}
              onBack={goBack}
              onNext={goNext}
              onJumpTo={jumpTo}
              nextLabel={page.cta}
              nextDisabled={isLast}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Easter egg trigger hidden for now — re-add <EasterEgg /> here to bring it back */}
    </div>
  )
}