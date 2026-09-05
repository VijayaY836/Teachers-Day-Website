# To the Ones Who Taught Us More Than Code

A Teacher's Day microsite built for the CSE Department, from students to faculty.
React + Vite, no backend required — built to run as a static site and shared as a link.

## What it is

A scroll-driven, single-page experience:

1. **Boot screen** — a playful "system boot" before the site opens
2. **Hero** — "To the ones who taught us more than code"
3. **The Letter** — a handwritten-style "Dear Teachers" note
4. **Things You Taught Us** — CSE concepts reinterpreted as life lessons (click to unfold)
5. **Teacher's Day Report Card** — a humorous grading table
6. **404: Teacher Not Found** — a CSE-themed joke that resolves into a compliment
7. **Faculty Wall** — flip cards for each faculty member (placeholder data)
8. **Wall of Gratitude** — a field of floating thank-you notes
9. **Our Journey** — a timeline from first lecture to "the engineer we become"
10. **Interactive Classroom** — click objects in an illustrated room for small messages
11. **Final Gift** — a confetti reveal with the closing message, and a replay button
12. A small hidden **"psst, faculty only"** button in the corner (bottom right) with an affectionate easter egg

## Running it locally

You need [Node.js](https://nodejs.org) 18 or newer installed.

```bash
cd teachers-day-cse
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

To build a production version:

```bash
npm run build
npm run preview   # to check the production build locally
```

The build output goes to `dist/` — that folder is what you deploy.

## Where to put your content

Everything you need to personalize is isolated into a few files:

| What | File |
|---|---|
| Faculty names, designations, subjects, memories | `src/data/facultyData.js` |
| Faculty photos | drop image files into `public/faculty/` and set `photo: "/faculty/yourfile.jpg"` in `facultyData.js` (leave `photo: null` to keep the monogram avatar) |
| Wall of Gratitude messages | `src/data/gratitudeData.js` |
| Department name (footer, hero kicker) | search for `CSE Department` in `src/components/Hero.jsx` and `src/App.jsx` |
| The "Dear Teachers" letter text | `src/components/LetterSection.jsx` |
| "Things You Taught Us" concepts | `src/data/conceptsData.js` |
| Report card metrics | `src/data/reportCardData.js` |
| Journey timeline stages | `src/data/journeyData.js` |

Each data file has a comment block at the top explaining what to change. You don't need to touch any component logic — just edit the arrays.

### Adding faculty photos

1. Put image files (square, ideally 400×400px+) into `public/faculty/`, e.g. `public/faculty/sharma.jpg`
2. In `src/data/facultyData.js`, set `photo: "/faculty/sharma.jpg"` on that faculty member's entry
3. Leaving `photo: null` shows a colored monogram instead — no photo required

## Deploying as a public link

The easiest options, both free for a small static site like this:

### Vercel (recommended, fastest)
1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com), "Add New Project", import the repo
3. Framework preset: **Vite** (auto-detected). Leave build command as `npm run build` and output directory as `dist`
4. Deploy — you'll get a shareable `https://your-project.vercel.app` link

### Netlify
1. Push to GitHub (or drag-and-drop the `dist/` folder after running `npm run build`)
2. On [netlify.com](https://netlify.com), "Add new site" → connect the repo
3. Build command: `npm run build`, publish directory: `dist`
4. Deploy — you'll get a `https://your-project.netlify.app` link

### GitHub Pages
1. Run `npm run build`
2. Push the contents of `dist/` to a `gh-pages` branch (or use the `gh-pages` npm package)
3. Enable Pages in the repo settings, pointing at that branch

Any of these give you a clickable link you can drop straight into the faculty group.

## Notes on the build

- No external image assets are required — all illustrations are inline SVG/CSS
- Respects `prefers-reduced-motion` throughout
- Fonts: Fraunces (display serif), Plus Jakarta Sans (body), IBM Plex Mono (code accents) — loaded from Google Fonts in `index.html`
- Framer Motion is used for the boot sequence, the easter egg overlay, and the final gift reveal; everything else uses lightweight CSS + IntersectionObserver scroll reveals for performance