"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useStore } from "@/lib/store";
import { QUESTIONS } from "@/lib/data";
import { PacingText } from "./pacing-text";
import { SpeakButton } from "./speak-button";

export function ReadingModeOverlay() {
  const id = useStore((s) => s.readingModeQuestionId);
  const close = () => useStore.getState().setReadingMode(null);
  const q = id ? QUESTIONS.find((x) => x.id === id) : null;

  return (
    <AnimatePresence>
      {q ? (
        <motion.div
          key={q.id}
          className="no-print fixed inset-0 z-50 bg-bg-base/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
        >
          <motion.button
            type="button"
            onClick={close}
            aria-label="Close reading mode (Escape)"
            className="fixed top-6 right-6 z-10 w-11 h-11 rounded-full glass text-text-secondary hover:text-accent-bright"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <X className="w-5 h-5 mx-auto" />
          </motion.button>

          <motion.div
            className="max-w-4xl w-full my-auto"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-accent-bright mb-4 font-mono">
              Part {q.part} · Question {q.number} · {q.topicTag}
            </p>
            <h2 className="text-2xl md:text-5xl font-semibold italic mb-8 leading-tight gradient-text">
              &ldquo;{q.questionText}&rdquo;
            </h2>
            <div className="text-xl md:text-3xl leading-[1.65] text-text-primary">
              <PacingText text={q.answer} />
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-text-tertiary">
              <SpeakButton text={q.questionText} size="md" />
              <span>Press Esc to close · click anywhere to dismiss</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
