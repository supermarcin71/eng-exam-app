"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Exercise } from "@/lib/types";

const CATEGORY_LABEL: Record<string, string> = {
  "past-simple": "Past Simple",
  "past-continuous": "Past Continuous",
  "past-perfect": "Past Perfect",
  "mixed-tenses": "Mixed tenses",
  transformation: "Transformation",
};

type Verdict = null | "correct" | "incorrect";

export function ExerciseCard({
  exercise,
  index,
}: {
  exercise: Exercise;
  index: number;
}) {
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [showHint, setShowHint] = useState(false);

  const reset = () => {
    setVerdict(null);
    setPicked(null);
    setTyped("");
    setShowHint(false);
  };

  const checkChoice = (text: string, correct: boolean) => {
    setPicked(text);
    setVerdict(correct ? "correct" : "incorrect");
  };

  const checkTyped = () => {
    if (!exercise.acceptedAnswers) return;
    const norm = (s: string) =>
      s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
    const ok = exercise.acceptedAnswers.some(
      (ans) => norm(ans) === norm(typed)
    );
    setVerdict(ok ? "correct" : "incorrect");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-5 md:p-7"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-text-tertiary tabular-nums">
            #{index + 1}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-bg-elevated text-text-secondary">
            {CATEGORY_LABEL[exercise.category] ?? exercise.category}
          </span>
        </div>
        {exercise.hint ? (
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="text-text-tertiary hover:text-accent-bright transition"
            title="Toggle hint"
          >
            <Lightbulb className="w-4 h-4" />
          </button>
        ) : null}
      </div>

      <p className="text-base md:text-lg text-text-primary leading-relaxed mb-4">
        {exercise.prompt}
      </p>

      {showHint && exercise.hint ? (
        <p className="text-xs text-accent-bright mb-3 italic">{exercise.hint}</p>
      ) : null}

      {/* Multiple choice */}
      {exercise.choices ? (
        <div className="grid gap-2">
          {exercise.choices.map((c) => {
            const isPicked = picked === c.text;
            const isAnswered = verdict !== null;
            const showCorrect = isAnswered && c.correct;
            const showIncorrect = isAnswered && isPicked && !c.correct;
            return (
              <button
                key={c.text}
                type="button"
                disabled={isAnswered}
                onClick={() => checkChoice(c.text, c.correct)}
                className={cn(
                  "text-left px-4 py-2.5 rounded-md text-sm font-medium border transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright",
                  showCorrect
                    ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                    : showIncorrect
                      ? "border-rose-500/50 bg-rose-500/15 text-rose-300"
                      : "border-border-muted text-text-secondary hover:border-accent-bright hover:text-accent-bright",
                  isAnswered && !showCorrect && !showIncorrect && "opacity-50"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  {showCorrect ? (
                    <Check className="w-4 h-4" />
                  ) : showIncorrect ? (
                    <X className="w-4 h-4" />
                  ) : null}
                  {c.text}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        // Gap fill / transformation
        <div className="space-y-2">
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && typed.trim()) checkTyped();
            }}
            disabled={verdict !== null}
            placeholder="Type your answer…"
            className={cn(
              "w-full px-4 py-2.5 rounded-md text-base bg-bg-elevated border text-text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright",
              verdict === "correct"
                ? "border-emerald-500/60"
                : verdict === "incorrect"
                  ? "border-rose-500/60"
                  : "border-border-muted"
            )}
            autoCapitalize="off"
            autoComplete="off"
            spellCheck={false}
          />
          {verdict === null ? (
            <button
              type="button"
              onClick={checkTyped}
              disabled={!typed.trim()}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition",
                typed.trim()
                  ? "border border-border-muted text-accent-bright hover:border-accent-bright"
                  : "border border-border-muted text-text-tertiary cursor-not-allowed"
              )}
            >
              Check answer
            </button>
          ) : null}
        </div>
      )}

      {/* Verdict + explanation */}
      <AnimatePresence>
        {verdict ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "mt-4 p-3 rounded-md border-l-2",
                verdict === "correct"
                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-200"
                  : "bg-rose-500/10 border-rose-500 text-rose-200"
              )}
            >
              <p className="text-sm font-medium mb-1">
                {verdict === "correct" ? "Correct ✓" : "Not quite — here's why:"}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {exercise.explanation}
              </p>
              {verdict === "incorrect" && exercise.acceptedAnswers ? (
                <p className="text-sm mt-2 text-text-tertiary">
                  Accepted answer:{" "}
                  <span className="font-mono text-accent-bright">
                    {exercise.acceptedAnswers[0]}
                  </span>
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-text-tertiary hover:text-accent-bright transition"
            >
              <RotateCcw className="w-3 h-3" />
              Try again
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
