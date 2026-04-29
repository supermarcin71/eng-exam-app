"use client";

import { motion } from "framer-motion";
import { GraduationCap, User } from "lucide-react";
import { MOCK_DIALOGUE } from "@/lib/data";
import { PacingText } from "./pacing-text";
import { SpeakButton } from "./speak-button";
import { cn } from "@/lib/utils";

export function MockDialogue() {
  return (
    <div className="space-y-4 md:space-y-6">
      {MOCK_DIALOGUE.map((line, i) => {
        const isExaminer = line.speaker === "examiner";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className={cn(
              "flex gap-3 md:gap-4",
              isExaminer ? "" : "flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center",
                isExaminer
                  ? "bg-bg-elevated text-text-secondary"
                  : "bg-accent-glow text-accent-bright"
              )}
              aria-hidden
            >
              {isExaminer ? (
                <GraduationCap className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div
              className={cn(
                "glass rounded-2xl p-4 md:p-6 max-w-[88%] md:max-w-[78%] flex-1",
                isExaminer ? "" : "ml-auto"
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={cn(
                    "text-xs uppercase tracking-widest font-mono",
                    isExaminer ? "text-text-tertiary" : "text-accent-bright"
                  )}
                >
                  {isExaminer ? "Examiner" : "You"}
                </span>
                <SpeakButton text={line.text.replace(/\/\/+|\[breathe\]|\*\*/g, " ")} />
              </div>
              <div
                className={cn(
                  "text-base md:text-lg leading-[1.7]",
                  isExaminer ? "italic text-text-secondary" : "text-text-primary"
                )}
              >
                <PacingText text={line.text} />
              </div>
            </div>
          </motion.div>
        );
      })}
      <p className="text-center text-text-tertiary text-sm pt-4 italic">
        Thank you, that was very thorough.
      </p>
    </div>
  );
}
