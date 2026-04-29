"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Check, Maximize2, Clock3 } from "lucide-react";
import { useEffect, useRef } from "react";
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
  const cardRef = useRef<HTMLElement | null>(null);

  // Listen for global F-key event to open reading mode if this card is in viewport
  useEffect(() => {
    const handler = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.5 &&
        rect.bottom > window.innerHeight * 0.3;
      if (inView) setReadingMode(question.id);
    };
    window.addEventListener("toggle-reading-mode", handler);
    return () => window.removeEventListener("toggle-reading-mode", handler);
  }, [question.id, setReadingMode]);

  return (
    <motion.article
      ref={cardRef}
      id={question.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "glass rounded-2xl p-6 md:p-10",
        "scroll-mt-24" // for #fragment scroll
      )}
    >
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-accent-glow text-accent-bright">
              Part {question.part} · Q{question.number}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest bg-bg-elevated text-text-secondary">
              {question.topicTag}
            </span>
            {question.targetSeconds ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest bg-bg-elevated text-text-tertiary font-mono">
                <Clock3 className="w-3 h-3" />
                {question.targetSeconds[0]}–{question.targetSeconds[1]}s
              </span>
            ) : null}
            {practiced ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest bg-emerald-500/15 text-emerald-300">
                <Check className="w-3 h-3" />
                Practiced
              </span>
            ) : null}
          </div>
          <h2 className="text-xl md:text-2xl font-semibold italic text-text-primary leading-snug">
            &ldquo;{question.questionText}&rdquo;
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setReadingMode(question.id)}
          aria-label="Reading mode"
          title="Reading mode (press F)"
          className="no-print shrink-0 w-10 h-10 rounded-md text-text-secondary hover:text-accent-bright hover:bg-accent-glow transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright"
        >
          <Maximize2 className="w-4 h-4 mx-auto" />
        </button>
      </header>

      <div className="mt-6 no-print">
        <button
          type="button"
          onClick={() => toggleRevealed(question.id)}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition",
            "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright",
            revealed
              ? "border-accent-bright/50 text-accent-bright bg-accent-glow"
              : "border-border-muted text-text-secondary hover:border-accent-bright hover:text-accent-bright"
          )}
        >
          {revealed ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          {revealed ? "Hide answer" : "Reveal answer"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {revealed ? (
          <motion.div
            key="answer"
            className="answer overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="pt-6 text-lg md:text-xl text-text-primary leading-[1.7]">
              <PacingText text={question.answer} />
            </div>

            <TrickyWordsTable words={question.trickyWords} />

            <div className="no-print mt-6 flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => togglePracticed(question.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright",
                  practiced
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                    : "border border-border-muted text-text-secondary hover:border-accent-bright hover:text-accent-bright"
                )}
              >
                <Check className="w-4 h-4" />
                {practiced ? "Practiced" : "Mark as practiced"}
              </button>
            </div>

            {practiced ? <SelfRating id={question.id} /> : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
