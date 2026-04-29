"use client";

import { motion } from "framer-motion";
import { ExerciseCard } from "./exercise-card";
import { SectionHeader } from "./section-header";
import { WRITTEN_EXERCISES, TOTAL_WRITTEN_EXERCISES } from "@/lib/written-data";
import type { Exercise } from "@/lib/types";

export function WrittenSection() {
  return (
    <>
      <SectionHeader
        eyebrow={`Written part · ${TOTAL_WRITTEN_EXERCISES} exercises`}
        title="Past Tenses · Section 1–2 Revision"
        subtitle="Grammar drills covering Past Simple, Past Continuous, Past Perfect, and sentence transformation. Multiple-choice plus gap-fill plus rewrites — type-along style."
      />

      {/* Quick study tips */}
      <div className="glass rounded-2xl p-5 md:p-6 mb-8 md:mb-10">
        <h3 className="text-base md:text-lg font-semibold text-text-primary mb-3">
          Quick reference
        </h3>
        <ul className="space-y-2 text-sm md:text-base text-text-secondary">
          <li className="flex gap-2">
            <span
              aria-hidden
              className="shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-accent-bright to-accent-cyan mt-2"
            />
            <span>
              <strong className="text-text-primary">Past Simple</strong> · finished actions with a clear time
              <span className="text-text-tertiary"> (Yesterday I went to the cinema.)</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span
              aria-hidden
              className="shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-accent-bright to-accent-cyan mt-2"
            />
            <span>
              <strong className="text-text-primary">Past Continuous</strong> · ongoing/background or interrupted action
              <span className="text-text-tertiary"> (I was cooking when she called.)</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span
              aria-hidden
              className="shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-accent-bright to-accent-cyan mt-2"
            />
            <span>
              <strong className="text-text-primary">Past Perfect</strong> · earlier of two past actions
              <span className="text-text-tertiary"> (By 9 PM she had already left.)</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span
              aria-hidden
              className="shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-accent-bright to-accent-cyan mt-2"
            />
            <span>
              <strong className="text-text-primary">Past Perfect Continuous</strong> · duration before another past action
              <span className="text-text-tertiary"> (I was tired because I had been studying all night.)</span>
            </span>
          </li>
        </ul>
      </div>

      {WRITTEN_EXERCISES.map((set, setIdx) => (
        <ExerciseSetBlock key={set.id} setIdx={setIdx} title={set.title} description={set.description} exercises={set.exercises} />
      ))}
    </>
  );
}

function ExerciseSetBlock({
  setIdx,
  title,
  description,
  exercises,
}: {
  setIdx: number;
  title: string;
  description: string;
  exercises: Exercise[];
}) {
  // Compute global index across all sets for #N labels
  let baseIdx = 0;
  for (let i = 0; i < setIdx; i++) {
    baseIdx += WRITTEN_EXERCISES[i].exercises.length;
  }
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="mb-12 md:mb-16"
    >
      <h3 className="text-2xl md:text-3xl font-semibold mb-2">
        <span className="gradient-text">{title}</span>
      </h3>
      <p className="text-text-secondary mb-6 max-w-2xl">{description}</p>

      <div className="space-y-4 md:space-y-5">
        {exercises.map((ex, i) => (
          <ExerciseCard key={ex.id} exercise={ex} index={baseIdx + i} />
        ))}
      </div>
    </motion.section>
  );
}
