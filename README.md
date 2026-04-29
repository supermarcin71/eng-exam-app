# eng-exam-app

Interactive web app for practicing an English oral exam by reading aloud through structured Q&A material.

**Topics:** Public Intelligence (Security and Defence Quarterly, 2025) + UN Resilience Guidance.

## Live

https://eng-exam-app.vercel.app/

## Stack

- Next.js 16 (App Router, static export)
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
