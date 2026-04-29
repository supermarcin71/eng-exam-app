# eng-exam-app

Interactive web app for practicing an English oral exam by reading aloud through structured Q&A material.

**Topics:** Public Intelligence (Marleku, 2025) + UN Resilience Guidance.

## Status

🚧 Scaffolding in progress. See [`docs/plans/2026-04-29-eng-exam-app-design.md`](docs/plans/2026-04-29-eng-exam-app-design.md) for the design document.

## Stack

- Next.js 15 (App Router, static export)
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- Zustand with `persist` middleware (LocalStorage)
- Framer Motion (animations)
- Web Speech API (TTS pronunciation)
- Lucide React (icons)
- canvas-confetti

## Local development (after scaffolding)

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

Auto-deploys to Vercel on every push to `main`.
