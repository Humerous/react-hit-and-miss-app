# Hit or Miss

A tactile number-guessing game rebuilt as a polished React portfolio project. The player hunts for a hidden number from 1 to 100 using progressively warmer proximity feedback, a mechanical keypad, an analogue-style gauge, a colour-coded attempt log, and a dedicated win state.

This repository preserves the history of the original project while modernising the interface, application structure, accessibility, testing, and developer workflow.

## Live Demo

[Play Hit or Miss](https://react-hit-and-miss-app.vercel.app)

## Highlights

- Responsive Bakelite-and-brass interface with a custom instrument-panel aesthetic
- Clear proximity system: Cold, Warm, Hot, Extreme, and Hit
- Mechanical keypad plus direct keyboard input
- High/low directional feedback after each unsuccessful guess
- Colour-coded attempt history with newest guesses first
- Dedicated win celebration and New Game modal
- Custom favicon and responsive mobile layout
- Semantic HTML, keyboard-friendly controls, live status announcements, and reduced-motion support
- Unit/component tests with Vitest and Testing Library
- GitHub Actions CI for test and production-build verification

## Modernisation

The original version began as an early React learning project. The current version is a ground-up presentation and UX refinement that keeps the simple game concept while demonstrating stronger product thinking and front-end execution.

The modernisation focused on:

- preserving the core game mechanic;
- replacing the original presentation with a coherent visual system;
- improving readability and feedback hierarchy;
- adding responsive behaviour and accessibility considerations;
- separating reusable game utilities and interface components;
- adding automated tests and CI checks;
- producing a clean repository suitable for portfolio review.

## Technology

- React 19
- Vite 8
- Vitest 4
- Testing Library
- Modern CSS
- GitHub Actions

## Requirements

- Node.js 22.12 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite will print the local development URL, normally `http://localhost:5173`.

## Quality checks

```bash
npm test
npm run build
```

## How to play

1. Enter a whole number from 1 to 100.
2. Read the temperature and high/low feedback.
3. Use the proximity gauge and attempt history to narrow the range.
4. Find the hidden number in as few attempts as possible.
5. Start a new game after the win state appears.

## Project structure

```text
src/
├── components/
│   ├── Form/
│   ├── Info/
│   └── Progress/
├── util/
├── App.jsx
├── App.css
└── index.jsx
```

## Portfolio note

This project is intentionally small in scope. The value is in the transformation of a basic learning exercise into a focused, finished product with a distinct interface, clear interaction states, testing, accessibility considerations, and a maintainable modern React setup.

## License

MIT. See [LICENSE](LICENSE).
