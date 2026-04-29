# eng-exam-app MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a polished interactive web app that lets a Polish student and a friend practice for an English oral exam by reading aloud through 17 Q&A pairs (Marleku article + UN Resilience), with hide/show answers, TTS pronunciation, focus reading mode, LocalStorage progress, and Linear/Vercel-style dark UI.

**Architecture:** Next.js 15 App Router with `output: 'export'` (full SSG), Tailwind CSS 4 + shadcn/ui, Zustand with `persist` middleware for state, Framer Motion animations. Single client-side page; tabs as state. Web Speech API for TTS. Auto-deploy to Vercel from `main` branch on GitHub.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Zustand, Framer Motion, canvas-confetti, Lucide React.

**Repo:** https://github.com/supermarcin71/eng-exam-app
**Source content:** `C:\Users\Tward\Desktop\STUDIA\Oral_Exam_Practice.md`
**Working directory:** `C:\Users\Tward\Desktop\STUDIA\eng-exam-app\`

---

## Phase A — Setup & Scaffolding

### Task 1: Bootstrap Next.js into the existing repo

**Files:**
- Modify: many (created by `create-next-app`)
- Working dir: `C:\Users\Tward\Desktop\STUDIA\eng-exam-app\`

**Step 1: Verify directory state**

Run: `cd "C:\Users\Tward\Desktop\STUDIA\eng-exam-app" && ls -la`
Expected: `.git/`, `.gitignore`, `README.md`, `docs/` already present.

**Step 2: Run create-next-app inside the repo**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --app --eslint --no-src-dir=false --import-alias="@/*" --use-npm
```

When prompted "Would you like to use `src/` directory?": **Yes**.
When prompted "Would you like to use Turbopack for `next dev`?": **Yes**.

Expected: Files like `src/app/page.tsx`, `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts` are created. Existing `.git/`, `README.md`, `docs/`, `.gitignore` remain (create-next-app may overwrite `.gitignore` and `README.md` — handle in Step 3).

**Step 3: Restore our README.md and .gitignore if overwritten**

Run: `git status` and `git diff README.md .gitignore`
If `create-next-app` overwrote them with default content, restore via `git checkout -- README.md .gitignore`. Do not commit Next.js's defaults — keep ours.

**Step 4: Sanity-check dev server**

Run: `npm run dev`
Expected: server boots at http://localhost:3000, prints "Ready in X.Xs". After verifying, press Ctrl+C.

**Step 5: Commit scaffold**

```bash
git add -A
git commit -m "chore: scaffold next.js 15 with typescript, tailwind, app router

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Install runtime dependencies

**Files:**
- Modify: `package.json`, `package-lock.json`

**Step 1: Install deps**

Run:
```bash
npm install zustand framer-motion canvas-confetti lucide-react
npm install -D @types/canvas-confetti
```

Expected: package.json updated with new entries; lockfile updated.

**Step 2: Verify imports work**

Run: `node -e "console.log(require('zustand/package.json').version, require('framer-motion/package.json').version)"`
Expected: prints versions, no errors.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install zustand, framer-motion, canvas-confetti, lucide-react

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Initialize shadcn/ui and add primitives

**Files:**
- Create: `components.json`
- Create: `src/components/ui/tabs.tsx`, `card.tsx`, `button.tsx`, `tooltip.tsx`, `dialog.tsx`
- Modify: `src/app/globals.css`, `tailwind.config.ts`, `src/lib/utils.ts`

**Step 1: Initialize shadcn**

Run: `npx shadcn@latest init`

Answers:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

**Step 2: Add components**

Run: `npx shadcn@latest add tabs card button tooltip dialog`

Expected: 5 component files created in `src/components/ui/`. `src/lib/utils.ts` created with `cn()` helper.

**Step 3: Verify build**

Run: `npm run build`
Expected: compiles without errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: initialize shadcn/ui with tabs, card, button, tooltip, dialog

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Configure static export, design tokens, and gradient utilities

**Files:**
- Modify: `next.config.ts`
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

**Step 1: Static export config**

Modify `next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

**Step 2: Design tokens in globals.css**

Append to `src/app/globals.css` (under existing `@layer base`):
```css
:root {
  --bg-base: #0A0E27;
  --bg-surface: #0F1530;
  --bg-elevated: #141B3D;
  --border-subtle: #1E2547;
  --border-muted: #2A3470;
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-tertiary: #64748B;
  --accent-deep: #1E3A8A;
  --accent-mid: #2563EB;
  --accent-bright: #60A5FA;
  --accent-glow: rgba(96, 165, 250, 0.15);
  --gradient-hero: linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #60A5FA 100%);
  --gradient-button: linear-gradient(135deg, #2563EB 0%, #60A5FA 100%);
}

html, body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

::selection {
  background: var(--accent-glow);
  color: var(--accent-bright);
}

/* Print stylesheet */
@media print {
  :root {
    --bg-base: #ffffff;
    --bg-surface: #ffffff;
    --bg-elevated: #ffffff;
    --text-primary: #000000;
    --text-secondary: #444444;
    --text-tertiary: #666666;
  }
  .no-print { display: none !important; }
  .print-show-all .answer { display: block !important; height: auto !important; }
  body { background: white; color: black; }
}
```

**Step 3: Tailwind theme extension**

Modify `tailwind.config.ts` to extend theme with gradient utilities and font families:
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bg-base": "var(--bg-base)",
        "bg-surface": "var(--bg-surface)",
        "bg-elevated": "var(--bg-elevated)",
        "border-subtle": "var(--border-subtle)",
        "border-muted": "var(--border-muted)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "accent-deep": "var(--accent-deep)",
        "accent-mid": "var(--accent-mid)",
        "accent-bright": "var(--accent-bright)",
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-button": "var(--gradient-button)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: configure static export, design tokens, and tailwind theme extension

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase B — Foundation (types + data)

### Task 5: Define data model types

**Files:**
- Create: `src/lib/types.ts`

**Step 1: Write types**

Create `src/lib/types.ts`:
```ts
export type SoundFlag =
  | "TH-soft"
  | "TH-voiced"
  | "W-vs-V"
  | "silent-letter"
  | "long-vowel";

export type TrickyWord = {
  word: string;
  pronunciation: string;
  polish: string;
  example: string;
  flags?: SoundFlag[];
};

export type Question = {
  id: string;
  part: 1 | 2;
  number: number;
  topicTag: string;
  questionText: string;
  answer: string;
  trickyWords: TrickyWord[];
  targetSeconds?: [number, number];
};

export type StaticSection = {
  id: "warmup" | "vocabulary" | "tips" | "mock-dialogue";
  title: string;
  contentMarkdown: string;
};

export type TabId = "warmup" | "part-1" | "part-2" | "vocabulary" | "tips" | "dialogue";
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

**Step 3: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: define types for questions, tricky words, sections

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Build data file from `Oral_Exam_Practice.md`

**Files:**
- Create: `src/lib/data.ts`
- Reference: `C:\Users\Tward\Desktop\STUDIA\Oral_Exam_Practice.md`

**Step 1: Read source markdown**

Read full content of `C:\Users\Tward\Desktop\STUDIA\Oral_Exam_Practice.md`. It contains 7 questions for Part 1 (Marleku) and 10 questions for Part 2 (UN Resilience), plus warm-up, vocabulary appendix, pre-exam tips, and mock dialogue.

**Step 2: Write `src/lib/data.ts`**

Create the file with:
- `export const QUESTIONS: Question[]` — 17 entries with `id`, `part`, `number`, `topicTag`, `questionText`, `answer` (preserving `**bold**`, `//`, `///`, `[breathe]` markers), `trickyWords[]`, and `targetSeconds`.
- `export const STATIC_SECTIONS: StaticSection[]` — 4 entries (warmup, vocabulary, tips, mock-dialogue) with raw markdown.
- `export const VOCABULARY_CLUSTERS` — array of 3 clusters (Intelligence & statecraft, Resilience & risk, Academic discourse) each with 10 word objects.

Use `id` format `"p1-q1"`, `"p1-q2"`, ..., `"p1-q7"`, `"p2-q1"`, ..., `"p2-q10"`.

**Step 3: Verify import**

Add to `src/app/page.tsx` (temporarily):
```tsx
import { QUESTIONS } from "@/lib/data";
console.log("Total questions:", QUESTIONS.length); // expect 17
```

Run: `npm run build`
Expected: compiles, shows 17 in build log.

Remove the temporary `console.log` before committing.

**Step 4: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: add 17 questions + static sections from Oral_Exam_Practice.md

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase C — Core utilities (TDD where logic is pure)

### Task 7: Pacing-marker parser (TDD)

**Files:**
- Create: `src/lib/parse-pacing.ts`
- Create: `src/lib/parse-pacing.test.ts`

**Step 1: Write the failing test**

Create `src/lib/parse-pacing.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { parsePacing } from "./parse-pacing";

describe("parsePacing", () => {
  it("splits on // marker", () => {
    const out = parsePacing("Hello // world");
    expect(out).toEqual([
      { type: "text", value: "Hello " },
      { type: "pause-short" },
      { type: "text", value: " world" },
    ]);
  });

  it("splits on /// marker", () => {
    const out = parsePacing("End. /// New.");
    expect(out).toEqual([
      { type: "text", value: "End. " },
      { type: "pause-long" },
      { type: "text", value: " New." },
    ]);
  });

  it("recognizes [breathe]", () => {
    const out = parsePacing("Run [breathe] go");
    expect(out).toEqual([
      { type: "text", value: "Run " },
      { type: "breathe" },
      { type: "text", value: " go" },
    ]);
  });

  it("recognizes **bold** wrapping", () => {
    const out = parsePacing("This is **important** text");
    expect(out).toEqual([
      { type: "text", value: "This is " },
      { type: "bold", value: "important" },
      { type: "text", value: " text" },
    ]);
  });

  it("handles compound input", () => {
    const out = parsePacing("**Hello** // world /// [breathe]");
    expect(out).toHaveLength(7);
    expect(out[0]).toEqual({ type: "bold", value: "Hello" });
  });
});
```

**Step 2: Install vitest**

Run: `npm install -D vitest @vitejs/plugin-react`

Add to `package.json` scripts: `"test": "vitest"`.

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { environment: "node" },
  resolve: { alias: { "@": "/src" } },
});
```

**Step 3: Run test, verify it fails**

Run: `npm test -- --run src/lib/parse-pacing.test.ts`
Expected: FAIL with "Cannot find module './parse-pacing'".

**Step 4: Implement minimal parser**

Create `src/lib/parse-pacing.ts`:
```ts
export type PacingToken =
  | { type: "text"; value: string }
  | { type: "pause-short" }
  | { type: "pause-long" }
  | { type: "breathe" }
  | { type: "bold"; value: string };

const PATTERN = /(\*\*[^*]+\*\*|\/\/\/|\/\/|\[breathe\])/g;

export function parsePacing(input: string): PacingToken[] {
  const out: PacingToken[] = [];
  let lastIndex = 0;
  for (const m of input.matchAll(PATTERN)) {
    const idx = m.index!;
    if (idx > lastIndex) out.push({ type: "text", value: input.slice(lastIndex, idx) });
    const tok = m[0];
    if (tok === "///") out.push({ type: "pause-long" });
    else if (tok === "//") out.push({ type: "pause-short" });
    else if (tok === "[breathe]") out.push({ type: "breathe" });
    else out.push({ type: "bold", value: tok.slice(2, -2) });
    lastIndex = idx + tok.length;
  }
  if (lastIndex < input.length) out.push({ type: "text", value: input.slice(lastIndex) });
  return out;
}
```

**Step 5: Run test, verify it passes**

Run: `npm test -- --run src/lib/parse-pacing.test.ts`
Expected: 5 passed.

**Step 6: Commit**

```bash
git add src/lib/parse-pacing.ts src/lib/parse-pacing.test.ts vitest.config.ts package.json package-lock.json
git commit -m "feat: pacing-marker parser with vitest (// /// [breathe] **bold**)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Build PacingText component (renders parser output)

**Files:**
- Create: `src/components/pacing-text.tsx`

**Step 1: Implement component**

```tsx
import { parsePacing } from "@/lib/parse-pacing";

export function PacingText({ text }: { text: string }) {
  const tokens = parsePacing(text);
  return (
    <span className="leading-[1.7]">
      {tokens.map((t, i) => {
        if (t.type === "text") return <span key={i}>{t.value}</span>;
        if (t.type === "bold")
          return (
            <strong key={i} className="text-accent-bright font-semibold">
              {t.value}
            </strong>
          );
        if (t.type === "pause-short")
          return (
            <span
              key={i}
              className="inline-block align-middle mx-1 w-[1px] h-[12px] bg-accent-mid/60"
              aria-hidden
            />
          );
        if (t.type === "pause-long")
          return (
            <span
              key={i}
              className="inline-block align-middle mx-1.5 w-[2px] h-[18px] bg-accent-bright/80"
              aria-hidden
            />
          );
        if (t.type === "breathe")
          return (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-full bg-accent-glow text-accent-bright text-sm"
            >
              🫁 breathe
            </span>
          );
        return null;
      })}
    </span>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: compiles.

**Step 3: Commit**

```bash
git add src/components/pacing-text.tsx
git commit -m "feat: PacingText renders parser tokens as visual pacing markers

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Zustand store with persist (TDD for core methods)

**Files:**
- Create: `src/lib/store.ts`
- Create: `src/lib/store.test.ts`

**Step 1: Failing test**

Create `src/lib/store.test.ts`:
```ts
import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from "./store";

describe("useStore", () => {
  beforeEach(() => {
    useStore.setState({
      practicedIds: [],
      revealedIds: [],
      selfRatings: {},
      seenWelcome: false,
      readingModeQuestionId: null,
      shortcutsModalOpen: false,
      activeTab: "warmup",
      revealedDefault: "hidden",
      speechRate: 1,
    });
  });

  it("toggles practiced id", () => {
    useStore.getState().togglePracticed("p1-q1");
    expect(useStore.getState().practicedIds).toContain("p1-q1");
    useStore.getState().togglePracticed("p1-q1");
    expect(useStore.getState().practicedIds).not.toContain("p1-q1");
  });

  it("toggles revealed id", () => {
    useStore.getState().toggleRevealed("p1-q2");
    expect(useStore.getState().revealedIds).toContain("p1-q2");
  });

  it("sets self rating", () => {
    useStore.getState().setRating("p1-q3", 4);
    expect(useStore.getState().selfRatings["p1-q3"]).toBe(4);
  });
});
```

**Step 2: Run, verify failure**

Run: `npm test -- --run src/lib/store.test.ts`
Expected: FAIL — no module.

**Step 3: Implement store**

Create `src/lib/store.ts`:
```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TabId } from "./types";

interface AppState {
  practicedIds: string[];
  revealedIds: string[];
  selfRatings: Record<string, 1 | 2 | 3 | 4 | 5>;
  seenWelcome: boolean;
  speechRate: number;
  revealedDefault: "hidden" | "shown";

  activeTab: TabId;
  readingModeQuestionId: string | null;
  shortcutsModalOpen: boolean;

  togglePracticed: (id: string) => void;
  toggleRevealed: (id: string) => void;
  setRating: (id: string, value: 1 | 2 | 3 | 4 | 5) => void;
  setActiveTab: (tab: TabId) => void;
  setReadingMode: (id: string | null) => void;
  setShortcutsOpen: (open: boolean) => void;
  setSeenWelcome: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      practicedIds: [],
      revealedIds: [],
      selfRatings: {},
      seenWelcome: false,
      speechRate: 1,
      revealedDefault: "hidden",
      activeTab: "warmup",
      readingModeQuestionId: null,
      shortcutsModalOpen: false,

      togglePracticed: (id) =>
        set((s) => ({
          practicedIds: s.practicedIds.includes(id)
            ? s.practicedIds.filter((x) => x !== id)
            : [...s.practicedIds, id],
        })),
      toggleRevealed: (id) =>
        set((s) => ({
          revealedIds: s.revealedIds.includes(id)
            ? s.revealedIds.filter((x) => x !== id)
            : [...s.revealedIds, id],
        })),
      setRating: (id, value) =>
        set((s) => ({ selfRatings: { ...s.selfRatings, [id]: value } })),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setReadingMode: (id) => set({ readingModeQuestionId: id }),
      setShortcutsOpen: (open) => set({ shortcutsModalOpen: open }),
      setSeenWelcome: () => set({ seenWelcome: true }),
    }),
    {
      name: "eng-exam-app-state-v1",
      partialize: (state) => ({
        practicedIds: state.practicedIds,
        selfRatings: state.selfRatings,
        seenWelcome: state.seenWelcome,
        speechRate: state.speechRate,
        revealedDefault: state.revealedDefault,
      }),
    }
  )
);
```

**Step 4: Verify tests pass**

Run: `npm test -- --run src/lib/store.test.ts`
Expected: 3 passed.

**Step 5: Commit**

```bash
git add src/lib/store.ts src/lib/store.test.ts
git commit -m "feat: Zustand store with persist for progress, ratings, UI state

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: useSpeak hook (Web Speech API)

**Files:**
- Create: `src/lib/use-speak.ts`

**Step 1: Implement hook**

```ts
"use client";
import { useCallback, useRef } from "react";
import { useStore } from "./store";

export function useSpeak() {
  const rate = useStore((s) => s.speechRate);
  const speakingRef = useRef(false);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.lang = "en-US";

      const voices = window.speechSynthesis.getVoices();
      const englishVoice =
        voices.find((v) => v.lang.startsWith("en-US")) ||
        voices.find((v) => v.lang.startsWith("en-GB")) ||
        voices.find((v) => v.lang.startsWith("en"));
      if (englishVoice) utterance.voice = englishVoice;

      utterance.onstart = () => (speakingRef.current = true);
      utterance.onend = () => (speakingRef.current = false);
      utterance.onerror = () => (speakingRef.current = false);
      window.speechSynthesis.speak(utterance);
    },
    [rate]
  );

  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  return { speak, isSupported };
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: compiles.

**Step 3: Commit**

```bash
git add src/lib/use-speak.ts
git commit -m "feat: useSpeak hook wrapping Web Speech API with voice selection

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: useShortcuts hook (global keyboard)

**Files:**
- Create: `src/lib/use-shortcuts.ts`

**Step 1: Implement**

```ts
"use client";
import { useEffect } from "react";
import { useStore } from "./store";
import type { TabId } from "./types";

const TAB_BY_KEY: Record<string, TabId> = {
  "1": "warmup",
  "2": "part-1",
  "3": "part-2",
  "4": "vocabulary",
  "5": "tips",
  "6": "dialogue",
};

export function useShortcuts() {
  const setActiveTab = useStore((s) => s.setActiveTab);
  const setShortcutsOpen = useStore((s) => s.setShortcutsOpen);
  const readingModeId = useStore((s) => s.readingModeQuestionId);
  const setReadingMode = useStore((s) => s.setReadingMode);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // ignore if typing in input/textarea
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") return;

      if (e.key === "?") {
        e.preventDefault();
        setShortcutsOpen(true);
        return;
      }
      if (e.key === "Escape" && readingModeId) {
        setReadingMode(null);
        return;
      }
      if (e.key.toLowerCase() === "f") {
        // Reading mode toggle handled per-card; broadcast event
        window.dispatchEvent(new CustomEvent("toggle-reading-mode"));
        return;
      }
      const tab = TAB_BY_KEY[e.key];
      if (tab) {
        e.preventDefault();
        setActiveTab(tab);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setActiveTab, setShortcutsOpen, readingModeId, setReadingMode]);
}
```

**Step 2: Commit**

```bash
git add src/lib/use-shortcuts.ts
git commit -m "feat: global keyboard shortcuts hook (?, F, ESC, 1-6)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase D — UI components

### Task 12: SpeakButton

**Files:** Create `src/components/speak-button.tsx`

```tsx
"use client";
import { Volume2 } from "lucide-react";
import { useSpeak } from "@/lib/use-speak";
import { cn } from "@/lib/utils";

export function SpeakButton({ text, className }: { text: string; className?: string }) {
  const { speak, isSupported } = useSpeak();
  if (!isSupported) return null;
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      aria-label={`Speak ${text}`}
      className={cn(
        "inline-flex items-center justify-center w-7 h-7 rounded-md",
        "text-text-secondary hover:text-accent-bright",
        "hover:bg-accent-glow transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright",
        className
      )}
    >
      <Volume2 className="w-4 h-4" />
    </button>
  );
}
```

Commit: `feat: SpeakButton with Volume2 icon and TTS trigger`

---

### Task 13: TrickyWordsTable

**Files:** Create `src/components/tricky-words-table.tsx`

```tsx
import type { TrickyWord } from "@/lib/types";
import { SpeakButton } from "./speak-button";

export function TrickyWordsTable({ words }: { words: TrickyWord[] }) {
  return (
    <div className="mt-6 rounded-lg border border-border-subtle overflow-hidden">
      <div className="px-4 py-2 bg-bg-elevated border-b border-border-subtle text-sm font-medium text-text-secondary">
        Tricky words
      </div>
      <table className="w-full text-sm">
        <thead className="bg-bg-elevated/50">
          <tr className="text-left text-text-tertiary">
            <th className="px-4 py-2 font-medium">English</th>
            <th className="px-4 py-2 font-medium">Pronunciation</th>
            <th className="px-4 py-2 font-medium">Polish</th>
            <th className="px-4 py-2 font-medium hidden md:table-cell">Example</th>
            <th className="px-2 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {words.map((w) => (
            <tr key={w.word} className="border-t border-border-subtle hover:bg-bg-elevated/40">
              <td className="px-4 py-2 font-semibold text-text-primary">{w.word}</td>
              <td className="px-4 py-2 font-mono text-accent-bright text-xs">{w.pronunciation}</td>
              <td className="px-4 py-2 text-text-secondary">{w.polish}</td>
              <td className="px-4 py-2 text-text-tertiary italic hidden md:table-cell">"{w.example}"</td>
              <td className="px-2 py-2"><SpeakButton text={w.word} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

Commit: `feat: TrickyWordsTable with per-row speak button`

---

### Task 14: SelfRating slider

**Files:** Create `src/components/self-rating.tsx`

```tsx
"use client";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const EMOJIS = ["😣", "😕", "😐", "🙂", "😎"] as const;

export function SelfRating({ id }: { id: string }) {
  const rating = useStore((s) => s.selfRatings[id]);
  const setRating = useStore((s) => s.setRating);
  return (
    <div className="mt-4 flex items-center gap-2">
      <span className="text-sm text-text-tertiary mr-2">How confident?</span>
      {EMOJIS.map((e, i) => {
        const value = (i + 1) as 1 | 2 | 3 | 4 | 5;
        return (
          <button
            key={value}
            onClick={() => setRating(id, value)}
            className={cn(
              "w-9 h-9 rounded-full text-xl transition",
              rating === value
                ? "bg-accent-glow ring-2 ring-accent-bright scale-110"
                : "hover:bg-bg-elevated"
            )}
            aria-label={`Rate ${value} of 5`}
          >
            {e}
          </button>
        );
      })}
    </div>
  );
}
```

Commit: `feat: SelfRating slider with 5 emoji steps`

---

### Task 15: QuestionCard

**Files:** Create `src/components/question-card.tsx`

```tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Check, Maximize2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/types";
import { PacingText } from "./pacing-text";
import { TrickyWordsTable } from "./tricky-words-table";
import { SelfRating } from "./self-rating";

export function QuestionCard({ question }: { question: Question }) {
  const revealed = useStore((s) => s.revealedIds.includes(question.id));
  const practiced = useStore((s) => s.practicedIds.includes(question.id));
  const toggleRevealed = useStore((s) => s.toggleRevealed);
  const togglePracticed = useStore((s) => s.togglePracticed);
  const setReadingMode = useStore((s) => s.setReadingMode);

  return (
    <article
      id={question.id}
      className={cn(
        "rounded-xl bg-bg-surface p-6 md:p-10",
        "shadow-[0_0_0_1px_rgba(96,165,250,0.10)]",
        "hover:shadow-[0_0_0_1px_rgba(96,165,250,0.30),_0_8px_24px_rgba(0,0,0,0.40)]",
        "transition-shadow duration-200"
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-text-tertiary uppercase tracking-wider mb-2">
            Part {question.part} · Question {question.number} · {question.topicTag}
          </p>
          <h2 className="text-xl md:text-2xl font-semibold italic text-text-primary leading-tight">
            "{question.questionText}"
          </h2>
        </div>
        <button
          onClick={() => setReadingMode(question.id)}
          aria-label="Reading mode"
          className="no-print shrink-0 w-10 h-10 rounded-md text-text-secondary hover:text-accent-bright hover:bg-accent-glow transition"
        >
          <Maximize2 className="w-4 h-4 mx-auto" />
        </button>
      </header>

      <div className="mt-6">
        <button
          onClick={() => toggleRevealed(question.id)}
          className={cn(
            "no-print inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium",
            "border border-border-muted hover:border-accent-bright transition",
            revealed ? "text-accent-bright" : "text-text-secondary"
          )}
        >
          {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {revealed ? "Hide answer" : "Reveal answer"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {revealed && (
          <motion.div
            key="answer"
            className="answer overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="pt-6 text-lg md:text-xl text-text-primary leading-[1.7]">
              <PacingText text={question.answer} />
            </div>
            <TrickyWordsTable words={question.trickyWords} />

            <div className="no-print mt-6 flex items-center gap-3">
              <button
                onClick={() => togglePracticed(question.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition",
                  practiced
                    ? "bg-accent-glow text-accent-bright border border-accent-bright"
                    : "border border-border-muted text-text-secondary hover:border-accent-bright"
                )}
              >
                <Check className="w-4 h-4" />
                {practiced ? "Practiced" : "Mark as practiced"}
              </button>
            </div>

            {practiced && <SelfRating id={question.id} />}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
```

Commit: `feat: QuestionCard with reveal, mark practiced, reading mode trigger`

---

### Task 16: Hero with animated gradient

**Files:** Create `src/components/hero.tsx`

```tsx
export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 px-6">
      {/* Animated mesh blobs */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-accent-deep blur-[80px] animate-blob-1" />
        <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-accent-mid blur-[80px] animate-blob-2" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-accent-bright blur-[80px] animate-blob-3" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-bright mb-6">
          Oral exam practice
        </p>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
          Read aloud,{" "}
          <span className="bg-gradient-hero bg-clip-text text-transparent">
            speak with confidence.
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          17 questions on Public Intelligence and UN Resilience — designed to be read aloud, repeatedly, until the rhythm sticks.
        </p>
      </div>
    </section>
  );
}
```

Add to `globals.css`:
```css
@keyframes blob-1 { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(60px, 40px) scale(1.1); } 66% { transform: translate(-30px, 80px) scale(0.95); } }
@keyframes blob-2 { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-40px, 60px) scale(1.05); } 66% { transform: translate(80px, -20px) scale(1.15); } }
@keyframes blob-3 { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(50px, -50px) scale(1.1); } 66% { transform: translate(-60px, 30px) scale(0.9); } }
.animate-blob-1 { animation: blob-1 30s ease-in-out infinite; }
.animate-blob-2 { animation: blob-2 35s ease-in-out infinite; }
.animate-blob-3 { animation: blob-3 25s ease-in-out infinite; }
```

Commit: `feat: Hero with animated mesh gradient and headline typography`

---

### Task 17: TabsNav

**Files:** Create `src/components/tabs-nav.tsx`

```tsx
"use client";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { TabId } from "@/lib/types";

const TABS: { id: TabId; label: string }[] = [
  { id: "warmup", label: "Warm-up" },
  { id: "part-1", label: "Part 1 · Marleku" },
  { id: "part-2", label: "Part 2 · UN Resilience" },
  { id: "vocabulary", label: "Vocabulary" },
  { id: "tips", label: "Tips" },
  { id: "dialogue", label: "Mock dialogue" },
];

export function TabsNav() {
  const active = useStore((s) => s.activeTab);
  const setActive = useStore((s) => s.setActiveTab);
  return (
    <nav className="no-print sticky top-0 z-30 backdrop-blur bg-bg-base/80 border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative px-4 py-3 text-sm font-medium whitespace-nowrap transition",
                active === t.id
                  ? "text-accent-bright"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              {t.label}
              {active === t.id && (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-button rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

Commit: `feat: sticky TabsNav with gradient underline indicator`

---

### Task 18: ProgressBar

**Files:** Create `src/components/progress-bar.tsx`

```tsx
"use client";
import { motion } from "framer-motion";

export function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : (done / total) * 100;
  return (
    <div className="no-print mb-8">
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-text-secondary">Practiced</span>
        <span className="text-text-primary font-mono">
          {done} / {total}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
        <motion.div
          className="h-full bg-gradient-button"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
}
```

Commit: `feat: ProgressBar with spring-animated gradient fill`

---

### Task 19: ReadingModeOverlay

**Files:** Create `src/components/reading-mode-overlay.tsx`

```tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useStore } from "@/lib/store";
import { QUESTIONS } from "@/lib/data";
import { PacingText } from "./pacing-text";

export function ReadingModeOverlay() {
  const id = useStore((s) => s.readingModeQuestionId);
  const close = () => useStore.getState().setReadingMode(null);
  const q = id ? QUESTIONS.find((x) => x.id === id) : null;

  return (
    <AnimatePresence>
      {q && (
        <motion.div
          className="no-print fixed inset-0 z-50 bg-bg-base/95 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
        >
          <motion.button
            onClick={close}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-bg-surface border border-border-muted text-text-secondary hover:text-accent-bright"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <X className="w-5 h-5 mx-auto" />
          </motion.button>
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm uppercase tracking-widest text-accent-bright mb-4">
              Part {q.part} · Q{q.number}
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold italic mb-8 leading-tight">
              "{q.questionText}"
            </h2>
            <div className="text-xl md:text-3xl leading-[1.7] text-text-primary">
              <PacingText text={q.answer} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

Commit: `feat: ReadingModeOverlay fullscreen viewer with hero typography`

---

### Task 20: ShortcutsModal + WelcomeModal

**Files:**
- Create `src/components/shortcuts-modal.tsx`
- Create `src/components/welcome-modal.tsx`

ShortcutsModal lists keyboard shortcuts in a shadcn `Dialog`. WelcomeModal shows once on first visit (`!seenWelcome`) with typewriter animation, sets `seenWelcome` on close.

Implementation: Use `<Dialog>` from `@/components/ui/dialog`, table with `kbd` elements for shortcuts list. WelcomeModal uses `useState` with `setInterval` for typewriter; on close calls `setSeenWelcome()`.

Commit: `feat: ShortcutsModal and WelcomeModal`

---

### Task 21: Confetti on tab completion

**Files:** Create `src/lib/use-confetti.ts`

Hook that watches `practicedIds` for the current tab; when ratio hits 100% (and a session-flag prevents re-fire), calls `confetti({ particleCount: 80, spread: 70, origin: { y: 0.9 }, colors: ['#1E3A8A', '#2563EB', '#60A5FA', '#F1F5F9'] })`.

Commit: `feat: confetti fires once per tab when 100% practiced`

---

## Phase E — Composition

### Task 22: Main page (`src/app/page.tsx`)

Compose Hero, TabsNav, conditional rendering of section content based on `activeTab`. Each tab body iterates relevant questions/sections and renders `<QuestionCard>` or static markdown via simple converter. Mounts `<ReadingModeOverlay>`, `<ShortcutsModal>`, `<WelcomeModal>` at root. Calls `useShortcuts()` and `useConfetti()`.

Use Framer Motion AnimatePresence for tab transitions: fade + 12 px slide, 200 ms.

**Step 1:** Implement
**Step 2:** `npm run dev`, manually verify each tab renders.
**Step 3:** Commit `feat: main page composing all components with tab transitions`

---

### Task 23: Layout, fonts, metadata (`src/app/layout.tsx`)

Configure `next/font/google` for `Inter` and `JetBrains_Mono` with CSS variables `--font-inter` and `--font-jetbrains`. Set page metadata (title, description, OG tags). Apply font variable classes to `<html>`.

Commit: `feat: layout with Inter + JetBrains Mono variable fonts and metadata`

---

## Phase F — Local verification & deployment

### Task 24: Local smoke test

Run: `npm run dev`. Open http://localhost:3000.

Manual checklist:
- [ ] Welcome modal appears (first time only)
- [ ] All 6 tabs switch with animation
- [ ] Q1–Q7 render in Part 1, Q1–Q10 in Part 2
- [ ] "Reveal answer" expands answer with animation
- [ ] Pacing markers (`//` `///` `[breathe]`) render as visual elements
- [ ] Speaker icon plays pronunciation
- [ ] "Mark as practiced" toggles state, persists after reload
- [ ] Self-rating slider stores and reloads
- [ ] `F` key opens reading mode, `ESC` closes
- [ ] `?` opens shortcuts modal
- [ ] `1`–`6` switch tabs
- [ ] Mobile viewport (DevTools 430×932) — tab nav scrolls horizontally, hero scales
- [ ] Print preview (`Ctrl+P`) shows clean black-on-white version
- [ ] `npm run build` produces `out/` with static files

If anything fails, fix and commit before proceeding.

---

### Task 25: Push to GitHub

Run:
```bash
git push origin main
```

Expected: pushes all commits since the design doc commit.

---

### Task 26: Deploy to Vercel via MCP

**Step 1:** List existing Vercel projects to confirm account.
**Step 2:** Use `mcp__vercel__deploy_to_vercel` (or `mcp__51a26531-7fe9-4d4e-9d9b-d914f396984f__deploy_to_vercel`) with the repo URL `https://github.com/supermarcin71/eng-exam-app`.
**Step 3:** Wait for build (Vercel auto-detects Next.js).
**Step 4:** Verify production URL loads successfully on desktop.
**Step 5:** Open same URL on iPhone 15 Pro Max — verify tabs scroll, hero scales, TTS works in mobile Safari.

If `deploy_to_vercel` fails: fall back to interactive `npx vercel --prod` from `eng-exam-app/` directory; user logs in via browser pop-up.

Final step: paste the production URL in the chat for the user to share with their friend.

---

## Verification end-to-end

After Task 26:
1. URL works on desktop Chrome, mobile Safari
2. Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95
3. All 17 questions reachable
4. LocalStorage persistence verified by reload
5. Push triggers re-deploy (test by adding a trivial commit and watching Vercel rebuild)
6. README updated with link to live URL

---

## Risks & escape hatches

- **Web Speech API silent on mobile Safari**: Apple requires user gesture to start speech; the click handler already provides this — should work.
- **Hydration warnings from Zustand `persist`**: ensure store-consuming components are `"use client"` and skeleton states render server-side. If warnings appear, gate persisted reads behind `useEffect` mount flag.
- **Vercel free tier deploy limits**: well within reach for one app.
- **Tab change animation race condition**: if AnimatePresence flickers during fast switching, switch to LayoutGroup or remove the slide and keep only fade.

---

## Out of scope (do not implement now)

- Authentication
- Per-question shareable URLs (`/#part-1/q4`)
- Custom domain
- PDF export beyond `@media print`
- Statistics / analytics
- i18n
- E2E tests with Playwright

These are listed in design doc Section 2 as non-goals; resist scope creep during execution.
