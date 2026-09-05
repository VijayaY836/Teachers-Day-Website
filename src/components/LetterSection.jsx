import Reveal from './Reveal'
import './LetterSection.css'

const PARAGRAPHS = [
  'Dear Ma\u2019am and Sir,',
  'Every semester, you walk into a classroom carrying something heavier than a lesson plan \u2014 patience for our confusion, persistence for our giving up, and belief we hadn\u2019t yet found in ourselves.',
  'You taught us algorithms, systems, logic and code.',
  'But somewhere between assignments, deadlines, and \u201cone last doubt,\u201d you taught us how to think.',
  'And for that, we\u2019re grateful.',
]

export default function LetterSection() {
  return (
    <section className="letter section section--narrow">
      <Reveal className="letter__paper">
        <p className="letter__stamp">A letter, mostly overdue</p>
        {PARAGRAPHS.map((p, i) => (
          <p
            key={i}
            className={i === 0 ? 'letter__greeting' : i === PARAGRAPHS.length - 1 ? 'letter__closing-line' : 'letter__body'}
          >
            {p}
          </p>
        ))}
        <p className="letter__sign">
          With gratitude,
          <br />
          <span>CSE Department</span>
        </p>
      </Reveal>
    </section>
  )
}