"use client";

import { motion } from "framer-motion";

export function ProgressBar({
  done,
  total,
  label = "Practiced",
}: {
  done: number;
  total: number;
  label?: string;
}) {
  const pct = total === 0 ? 0 : Math.min(100, (done / total) * 100);
  const complete = pct === 100;
  return (
    <div className="no-print mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-widest text-text-tertiary">
          {label}
        </span>
        <span className="text-sm text-text-primary font-mono tabular-nums">
          {done} <span className="text-text-tertiary">/</span> {total}
          {complete ? <span className="ml-2 text-accent-cyan">✓</span> : null}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: "var(--gradient-progress)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
}
