# eng-exam-app — Design Document

**Date:** 2026-04-29
**Author:** brainstormed with Claude
**Status:** Approved by user, ready for implementation plan
**Repo:** https://github.com/supermarcin71/eng-exam-app

---

## 1. Purpose

A polished, interactive web app that helps the user (and a friend) practice for an English oral exam by reading aloud through structured Q&A material. Replaces a static Markdown document (`Oral_Exam_Practice.md`) with a premium, mobile-friendly experience supporting hide/show answers, pronunciation playback, and a focus reading mode.

**Audience:** primary user + one friend (small private group, but content is shareable on a public URL).

**Source content:** 17 Q&A pairs (7 about Marleku's *Public Intelligence as a Strategic Tool* article, 10 about UN Resilience Guidance) plus warm-up, vocabulary appendix, pre-exam tips, and mock dialogue. Already drafted in `STUDIA/Oral_Exam_Practice.md`.

---

## 2. Goals & Non-goals

### Goals
- Premium "Linear/Vercel"-style dark UI with deep navy → light blue gradient accents.
- Responsive on iPhone 15 Pro Max and desktop browsers.
- Reading-aloud–first UX: hide/show answers, focus mode, pacing-marker pills, line-height tuned for prosody.
- Per-question pronunciation playback via Web Speech API (zero cost, no API keys).
- LocalStorage persistence of progress and self-rating across sessions.
- Auto-deploy from GitHub via Vercel.
- Lighthouse mobile score 95+.

### Non-goals (explicit YAGNI list)
- User accounts / authentication.
- Server-side rendering or API routes.
- i18n / translation engine.
- Spaced-repetition ML algorithms (manual rating only).
- Native mobile app.
- Audio recording of user answers.
- Custom domain on day one.
- Social sharing widgets.

---

## 3. Decision Log

### Approach selection: **B — Production Polish** (chosen over A and C)
- Rejected **A** (Stripped & Static): no LocalStorage persistence, no animations — feels like a static doc, defeats "interactive learning tool" goal.
- Rejected **C** (Maximum quality): MDX, NextAuth, i18n, statistics, PDF export — most features unused in real practice for two readers.
- **B** balances polish against scope: Next.js + Tailwind + shadcn/ui + Zustand + Framer Motion. ~1.5–2h of build, ~14 source files.

### Stack decisions
| Decision | Chosen | Rejected alternatives | Reason |
|---|---|---|---|
| Framework | **Next.js 15 App Router** | Vite+React, Astro | User preference; static export still works |
| Rendering | **`output: 'export'`** (full SSG) | SSR, ISR | No backend logic needed; simpler hosting |
| Styling | **Tailwind CSS 4** | CSS Modules, vanilla CSS | User preference; rapid iteration |
| Component library | **shadcn/ui** (Tabs/Card/Button/Tooltip/Dialog) | Material UI, Headless UI, custom | Copy-into-repo model = full control over Linear/Vercel aesthetic |
| State | **Zustand + `persist` middleware** | Context API, Redux | LocalStorage sync in 3 lines vs manual hookup |
| Animations | **Framer Motion** | GSAP, raw CSS | Best ergonomics for React + height-auto transitions |
| Icons | **Lucide React** | Heroicons, Phosphor | Tree-shakeable, matches Linear/Vercel feel |
| TTS | **Web Speech API (browser-native)** | ElevenLabs, OpenAI TTS | Free, offline, zero keys, good-enough quality |
| Confetti | **canvas-confetti** | tsparticles, none | 3 KB, zero deps, one function call |
| Hosting | **Vercel (auto-deploy from GitHub)** | GitHub Pages, Cloudflare Pages | Best Next.js integration; MCP already wired |

---

## 4. Architecture

### File tree (target)
```
eng-exam-app/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts            # output: 'export', trailingSlash: true
├── postcss.config.mjs
├── components.json           # shadcn config
├── .gitignore
├── docs/
│   └── plans/
│       └── 2026-04-29-eng-exam-app-design.md   # THIS FILE
├── public/
│   └── (favicon assets)
└── src/
    ├── app/
    │   ├── layout.tsx        # root: fonts, theme, html lang
    │   ├── page.tsx          # main app: tabs + sections
    │   └── globals.css       # tokens + tailwind layers
    ├── components/
    │   ├── ui/               # shadcn primitives (auto-generated)
    │   │   ├── tabs.tsx
    │   │   ├── card.tsx
    │   │   ├── button.tsx
    │   │   ├── tooltip.tsx
    │   │   └── dialog.tsx
    │   ├── hero.tsx
    │   ├── tabs-nav.tsx
    │   ├── question-card.tsx
    │   ├── tricky-words-table.tsx
    │   ├── speak-button.tsx
    │   ├── pacing-text.tsx           # parses // /// [breathe] markers
    │   ├── reading-mode-overlay.tsx
    │   ├── progress-bar.tsx
    │   ├── self-rating.tsx
    │   ├── shortcuts-modal.tsx
    │   └── welcome-modal.tsx
    └── lib/
        ├── data.ts                    # all 17 Qs + warmup + vocab + tips + dialogue
        ├── types.ts
        ├── store.ts                   # Zustand
        ├── use-speak.ts               # TTS hook
        ├── use-shortcuts.ts           # global keyboard
        └── utils.ts                   # cn() helper from shadcn
```

### Routing
Single client-side page (`/`). Tabs are state, not routes. `output: 'export'` produces one `index.html`. URL stays `/` regardless of active tab. (Optional future: hash routing `#part-1/q4` for shareable links — not in MVP.)

### Build & deploy
- Local dev: `npm run dev` → http://localhost:3000
- Production build: `npm run build` → `out/` directory (static)
- Deploy: Vercel auto-builds on every push to `main`

---

## 5. Visual Design System

### Palette (CSS custom properties on `:root`)
```css
--bg-base:        #0A0E27;
--bg-surface:     #0F1530;
--bg-elevated:    #141B3D;
--border-subtle:  #1E2547;
--border-muted:   #2A3470;
--text-primary:   #F1F5F9;
--text-secondary: #94A3B8;
--text-tertiary:  #64748B;
--accent-deep:    #1E3A8A;
--accent-mid:     #2563EB;
--accent-bright:  #60A5FA;
--accent-glow:    rgba(96, 165, 250, 0.15);

--gradient-hero: linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #60A5FA 100%);
--gradient-button: linear-gradient(135deg, #2563EB 0%, #60A5FA 100%);
```

### Typography
- **Inter Variable** (UI + body) — `next/font/google`
- **JetBrains Mono Variable** (Tricky words pronunciation, code-style accents)
- **Inter Display** weight 800 (hero & H1)

| Element | Mobile | Desktop |
|---|---|---|
| Hero | 40 / 1.10 | 72 / 1.05 |
| H1 (Part) | 32 / 1.15 | 56 / 1.10 |
| H2 (Q title) | 22 / 1.30 | 28 / 1.30 |
| Body | 17 / 1.70 | 19 / 1.70 |
| Caption | 13 / 1.50 | 14 / 1.50 |

Body line-height **1.7** is intentional — improves vertical eye-tracking when reading aloud.

### Spacing & radius
- Tailwind defaults (4 px base)
- Card radius: `rounded-xl` (12 px)
- Button radius: `rounded-md` (6 px)

### Shadow style
**Sharp outline shadows over blur**. Matches Linear/Vercel:
```css
box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.10);
```
Hover lift:
```css
box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.30), 0 8px 24px rgba(0, 0, 0, 0.40);
```

### Animations
- Hide/show: `motion.div` with `height: auto ↔ 0`, opacity, 250 ms `easeOut`.
- Tab change: fade + 12 px slide, 200 ms.
- Reading mode: backdrop fade + content scale 0.96→1, 300 ms.
- Speak button: subtle pulse loop (CSS) while TTS active.
- Progress bar: spring `stiffness: 100, damping: 20`.

---

## 6. Data Model & State

### Types (`src/lib/types.ts`)
```ts
type SoundFlag = 'TH-soft' | 'TH-voiced' | 'W-vs-V' | 'silent-letter' | 'long-vowel';

type TrickyWord = {
  word: string;
  pronunciation: string;     // "dis-CLO-zhər"
  polish: string;            // "ujawnienie"
  example: string;
  flags?: SoundFlag[];
};

type Question = {
  id: string;                // "p1-q1"
  part: 1 | 2;
  number: number;
  topicTag: string;          // "Overview", "Comparative case"
  questionText: string;
  answer: string;            // raw with **bold**, //, ///, [breathe]
  trickyWords: TrickyWord[];
  targetSeconds?: [number, number];
};

type StaticSection = {
  id: 'warmup' | 'vocabulary' | 'tips' | 'mock-dialogue';
  title: string;
  contentMarkdown: string;
};
```

### Zustand store (`src/lib/store.ts`)
```ts
interface AppState {
  // persistent
  practicedIds: string[];
  revealedDefault: 'hidden' | 'shown';
  speechRate: number;            // 0.7–1.2
  selfRatings: Record<string, 1|2|3|4|5>;
  seenWelcome: boolean;

  // ephemeral
  activeTab: 'warmup' | 'part-1' | 'part-2' | 'vocabulary' | 'tips' | 'dialogue';
  revealedIds: string[];          // currently visible
  readingModeQuestionId: string | null;
  shortcutsModalOpen: boolean;
}
```
LocalStorage key: `eng-exam-app-state-v1`. Migrate by bumping version if schema changes.

---

## 7. Core Interactivity

| Behavior | Trigger | Effect |
|---|---|---|
| Show/hide answer | Click "Reveal answer" button on a card | Framer Motion height-auto, 250 ms |
| Mark practiced | Button after answer revealed | Toggles in `practicedIds`, green check appears |
| TTS pronunciation | Click speaker icon next to a tricky word | `speechSynthesis.speak()` at `speechRate`, en-US voice |
| Reading mode | `F` key or button on card | Fullscreen overlay with hero typography on the active question |
| Tab change | Click on tab or press `1`–`6` | Fade + slide transition |
| Progress display | Per-tab top header | `practiced.length / totalInTab` with gradient fill |

---

## 8. Delight Layer

### 1. Keyboard shortcuts (`src/lib/use-shortcuts.ts`)
| Key | Action |
|---|---|
| `?` | Open shortcuts modal |
| `F` | Toggle reading mode |
| `Space` | Show/hide focused question's answer |
| `J` / `K` | Next / previous question |
| `1`–`6` | Jump to tab |
| `S` | Speak last hovered tricky word |

Subtle "Press `?` for shortcuts" pill in bottom-right corner.

### 2. Animated mesh gradient (hero only)
Three blurred blobs (`accent-deep`, `accent-mid`, `accent-bright`) drift in a 30 s CSS-keyframe loop with `filter: blur(60px)` and `mix-blend-mode: screen`. Pure CSS, no JS, no perf hit.

### 3. Pacing markers as pills (`src/components/pacing-text.tsx`)
Parses answer strings, replacing `//`, `///`, `[breathe]` with React components:
- `//` → 1 × 12 px vertical bar in `accent-mid`
- `///` → 2 × 18 px vertical bar in `accent-bright` with 4 px right margin
- `[breathe]` → 🫁 emoji + "breathe" pill in `accent-glow`
- `**bold**` → `<strong>` with subtle accent underline

### 4. Confetti at section completion
When a tab's `practicedIds % 100% = 0` for the first time, fire `canvas-confetti` from `origin: { x: 0.5, y: 0.9 }` with palette colors. Flag in store prevents repeat fires per session.

### 5. Self-rating slider per question
After "Mark as practiced": 5-step emoji slider 😣 😕 😐 🙂 😎 with label "How confident?". Stored in `selfRatings`. Future: sort questions ascending by rating for spaced practice.

### 6. Welcome modal (first visit)
Triggered on `!seenWelcome`. Typewriter animation (50 ms/char) of:
> "Hello. // This is your oral exam practice space. /// Press `?` to see how it works."

Closes on click/Enter, sets `seenWelcome = true`.

### 7. Custom selection color
```css
::selection { background: var(--accent-glow); color: var(--accent-bright); }
```

### 8. Print stylesheet (`@media print`)
Removes background, makes everything black-on-white, expands all answers, removes interactive UI. Allows offline study via paper.

---

## 9. Deployment Flow

### Step-by-step
1. Folder + git: `C:\Users\Tward\Desktop\STUDIA\eng-exam-app\` initialized as repo with `origin = https://github.com/supermarcin71/eng-exam-app.git`. ✅ Done.
2. Write design doc → commit → push (this step).
3. Run `writing-plans` skill → create implementation plan.
4. Scaffold Next.js: `npx create-next-app@latest . --typescript --tailwind --app --eslint`.
5. shadcn init + add components.
6. Install deps: `zustand framer-motion canvas-confetti lucide-react`.
7. Build `data.ts` from `STUDIA/Oral_Exam_Practice.md` source.
8. Build components in dependency order (types → store → primitives → cards → overlays).
9. Local test: `npm run dev`.
10. Commit + push to GitHub.
11. Deploy via Vercel MCP (`mcp__vercel__deploy_to_vercel`) or web UI Vercel ↔ GitHub integration.
12. Receive production URL, share with friend.

### `next.config.ts`
```ts
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
```

### `.gitignore` essentials
```
node_modules/
.next/
out/
.env*.local
.vercel
.DS_Store
*.tsbuildinfo
```

---

## 10. Risks & Open Items

### Risks
- **Web Speech API voice availability**: voices vary by OS/browser. Fallback: pick first `en-*` voice; on no voices, hide speak buttons silently.
- **iPhone 15 Pro Max viewport**: 430 × 932 px. Tab nav must scroll horizontally on mobile if 6 tabs don't fit; verify on real device after deploy.
- **Vercel MCP deploy via GitHub integration**: requires Vercel account linked to GitHub (one-time setup); fallback is `npx vercel --prod` from local.

### Open items (resolve during implementation)
- GitHub auth for `git push`: credential helper not yet configured. May need PAT (Personal Access Token) or interactive auth via Chrome MCP.
- Should `data.ts` be split (one file per part) for editing convenience? Decide during scaffolding.
- Onboarding: should welcome modal include the friend's name/avatar field? — likely overengineering, skip.

---

## 11. Success Criteria

- ✅ Production URL accessible from desktop and iPhone 15 Pro Max.
- ✅ All 17 Q&A questions render with hide/show answer working.
- ✅ TTS plays pronunciation for at least 80% of tricky words on Chrome (latest).
- ✅ Reading mode opens with `F` key and looks clean fullscreen.
- ✅ LocalStorage survives page reload (practiced count persists).
- ✅ Lighthouse mobile: Performance 90+, Accessibility 95+, Best Practices 95+.
- ✅ Friend can open the URL, no install, no login, and start practicing within 10 seconds.

---

## 12. Next Step

Invoke the `superpowers:writing-plans` skill to convert this design into a step-by-step implementation plan that can be executed in subsequent sessions.
