// Section 3 — "Things You Taught Us"
// CSE concepts, reinterpreted. `tag` is the small mono label shown on the
// card face; `lesson` is revealed when the card is opened.

export const concepts = [
  {
    tag: 'ALGORITHMS',
    snippet: 'while (problem.exists) {\n  keep_going();\n}',
    lesson: 'Even complicated problems have a way forward.',
    accent: 'coral',
  },
  {
    tag: 'DEBUGGING',
    snippet: '// it was never the compiler.\n// it was line 42.',
    lesson: 'Getting something wrong isn\u2019t failure. It\u2019s information.',
    accent: 'sky',
  },
  {
    tag: 'DATA STRUCTURES',
    snippet: 'struct Life {\n  priorities: Stack,\n}',
    lesson: 'How we organize things matters.',
    accent: 'mint',
  },
  {
    tag: 'RECURSION',
    snippet: 'function tryAgain() {\n  return tryAgain();\n}',
    lesson: 'Try again. And again. And again.',
    accent: 'lavender',
  },
  {
    tag: 'TIME COMPLEXITY',
    snippet: 'O(patience) > O(panic)',
    lesson: 'Patience is sometimes the most efficient strategy.',
    accent: 'sun',
  },
  {
    tag: 'EXCEPTION HANDLING',
    snippet: 'try {\n  life.proceed();\n} catch (setback) {\n  handle(setback);\n}',
    lesson: 'When things go wrong, don\u2019t panic. Handle it.',
    accent: 'pink',
  },
  {
    tag: 'COMMENTS',
    snippet: '// someone took the time\n// to explain.',
    lesson: 'Because someone cared enough to make it understandable.',
    accent: 'coral',
  },
]