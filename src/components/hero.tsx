"use client";

import { motion } from "framer-motion";
import { Keyboard, Mic2, BookOpen, PenLine } from "lucide-react";
import { TOTAL_WRITTEN_EXERCISES } from "@/lib/written-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 px-6">
      <div className="relative max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm uppercase tracking-[0.3em] text-accent-bright mb-6 font-mono"
        >
          Eng Exam · Oral practice
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight"
        >
          Read aloud,{" "}
          <span className="gradient-text-animated">speak with confidence.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          Seventeen oral questions plus a Past-Tenses written part —
          designed to be read aloud, drilled, repeated until the rhythm sticks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          <Stat icon={<Mic2 className="w-4 h-4" />} label="17 oral Qs" />
          <Stat
            icon={<PenLine className="w-4 h-4" />}
            label={`${TOTAL_WRITTEN_EXERCISES} written drills`}
          />
          <Stat icon={<BookOpen className="w-4 h-4" />} label="2 topics" />
          <Stat icon={<Keyboard className="w-4 h-4" />} label="Press ? for keys" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-text-secondary">
      <span className="text-accent-bright">{icon}</span>
      {label}
    </span>
  );
}
