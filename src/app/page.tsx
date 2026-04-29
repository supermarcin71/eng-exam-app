"use client";

import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Hero } from "@/components/hero";
import { TabsNav } from "@/components/tabs-nav";
import { QuestionCard } from "@/components/question-card";
import { SectionHeader } from "@/components/section-header";
import { StaticMarkdown } from "@/components/static-markdown";
import { VocabClusterCard } from "@/components/vocab-cluster-card";
import { MockDialogue } from "@/components/mock-dialogue";
import { ProgressBar } from "@/components/progress-bar";
import { WrittenSection } from "@/components/written-section";
import { ReadingModeOverlay } from "@/components/reading-mode-overlay";
import { ShortcutsModal } from "@/components/shortcuts-modal";
import { WelcomeModal } from "@/components/welcome-modal";
import { ReadingProgressBar } from "@/components/reading-progress-bar";
import { SettingsPanel } from "@/components/settings-panel";
import {
  QUESTIONS,
  WARMUP_SECTION,
  TIPS_SECTION,
  VOCABULARY_CLUSTERS,
} from "@/lib/data";
import { useStore } from "@/lib/store";
import { useShortcuts } from "@/lib/use-shortcuts";
import { useConfetti } from "@/lib/use-confetti";
import type { TabId } from "@/lib/types";
import { Keyboard } from "lucide-react";

export default function Home() {
  useShortcuts();
  const activeTab = useStore((s) => s.activeTab);
  const practicedIds = useStore((s) => s.practicedIds);

  const part1 = useMemo(() => QUESTIONS.filter((q) => q.part === 1), []);
  const part2 = useMemo(() => QUESTIONS.filter((q) => q.part === 2), []);

  const part1Done = practicedIds.filter((id) => id.startsWith("p1-")).length;
  const part2Done = practicedIds.filter((id) => id.startsWith("p2-")).length;

  // Confetti hooks (one per tab that has questions)
  useConfetti("part-1", part1.length, part1Done);
  useConfetti("part-2", part2.length, part2Done);

  // Sync activeTab with #hash for shareable links (best-effort)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const tab = window.location.hash.replace("#", "");
    if (
      tab &&
      [
        "warmup",
        "part-1",
        "part-2",
        "written",
        "vocabulary",
        "tips",
        "dialogue",
      ].includes(tab)
    ) {
      useStore.getState().setActiveTab(tab as TabId);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const newHash = `#${activeTab}`;
    if (window.location.hash !== newHash) {
      history.replaceState(null, "", newHash);
    }
  }, [activeTab]);

  return (
    <TooltipProvider delay={250}>
      <ReadingProgressBar />
      <Hero />
      <TabsNav />

      <main
        id="main"
        className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16"
      >
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {activeTab === "warmup" ? <WarmupSection /> : null}
            {activeTab === "part-1" ? (
              <Part1Section questions={part1} done={part1Done} />
            ) : null}
            {activeTab === "part-2" ? (
              <Part2Section questions={part2} done={part2Done} />
            ) : null}
            {activeTab === "written" ? <WrittenSection /> : null}
            {activeTab === "vocabulary" ? <VocabularySection /> : null}
            {activeTab === "tips" ? <TipsSection /> : null}
            {activeTab === "dialogue" ? <DialogueSection /> : null}
          </motion.section>
        </AnimatePresence>
      </main>

      <Footer />

      <ReadingModeOverlay />
      <ShortcutsModal />
      <SettingsPanel />
      <WelcomeModal />
      <ShortcutsHint />
    </TooltipProvider>
  );
}

// ============================================================
// Section components
// ============================================================
function WarmupSection() {
  return (
    <>
      <SectionHeader
        eyebrow="One minute, first time of day only"
        title="Warm-up"
        subtitle="Read aloud at a calm pace. Each line targets a sound Polish speakers commonly trip on."
      />
      <div className="glass rounded-2xl p-6 md:p-10">
        <StaticMarkdown source={WARMUP_SECTION.contentMarkdown} />
      </div>
    </>
  );
}

function Part1Section({
  questions,
  done,
}: {
  questions: typeof QUESTIONS;
  done: number;
}) {
  return (
    <>
      <SectionHeader
        eyebrow="Part 1 · 7 anticipated questions"
        title="Public Intelligence"
        subtitle={`Anticipated questions on the article "Public Intelligence as a Strategic Tool: The Role of Real-Time Intelligence Disclosure" (Security and Defence Quarterly, 2025).`}
      />
      <ProgressBar done={done} total={questions.length} />
      <div className="space-y-6 md:space-y-8">
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </>
  );
}

function Part2Section({
  questions,
  done,
}: {
  questions: typeof QUESTIONS;
  done: number;
}) {
  return (
    <>
      <SectionHeader
        eyebrow="Part 2 · 10 explicit questions"
        title="UN Resilience Guidance"
        subtitle="Answers built on standard UN/UNDP resilience-framework terminology. Confident voice, conceptually correct — verify exact phrasing against your source."
      />
      <ProgressBar done={done} total={questions.length} />
      <div className="space-y-6 md:space-y-8">
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </>
  );
}

function VocabularySection() {
  return (
    <>
      <SectionHeader
        eyebrow="Cross-cutting vocabulary appendix"
        title="High-leverage academic vocabulary"
        subtitle="Thirty terms you can use in any answer. Click 🔊 next to any word to hear it pronounced."
      />
      <div className="grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {VOCABULARY_CLUSTERS.map((c) => (
          <VocabClusterCard key={c.id} cluster={c} />
        ))}
      </div>
    </>
  );
}

function TipsSection() {
  return (
    <>
      <SectionHeader
        eyebrow="Read once on exam day"
        title="Pre-exam tips"
        subtitle="Pace control, repair phrases, body language for Teams. Memorize the four repair phrases verbatim."
      />
      <div className="glass rounded-2xl p-6 md:p-10">
        <StaticMarkdown source={TIPS_SECTION.contentMarkdown} />
      </div>
    </>
  );
}

function DialogueSection() {
  return (
    <>
      <SectionHeader
        eyebrow="Final dress rehearsal"
        title="Mock dialogue"
        subtitle="Read this last, after one or two passes through Parts 1 and 2. A simulated 5-turn exam — examiner italics, your answers in plain weight."
      />
      <MockDialogue />
    </>
  );
}

function ShortcutsHint() {
  const setOpen = useStore((s) => s.setShortcutsOpen);
  const isSupported =
    typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
  if (!isSupported) return null;
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="no-print fixed bottom-5 right-5 z-20 glass rounded-full px-4 py-2.5 inline-flex items-center gap-2 text-text-secondary hover:text-accent-bright transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright"
      title="Keyboard shortcuts"
    >
      <Keyboard className="w-4 h-4" />
      <span className="text-xs font-mono">
        Press <kbd className="px-1.5 py-0.5 bg-bg-elevated rounded">?</kbd>
      </span>
    </button>
  );
}

function Footer() {
  return (
    <footer className="no-print mt-20 mb-10 text-center px-6">
      <p className="text-xs text-text-tertiary">
        Built for oral exam practice · Read aloud, breathe, trust your preparation.
      </p>
      <p className="text-xs text-text-tertiary mt-1">
        <a
          href="https://github.com/supermarcin71/eng-exam-app"
          className="hover:text-accent-bright transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source on GitHub
        </a>
      </p>
    </footer>
  );
}
