"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";

const FULL_TEXT =
  "Hello. // This is your oral exam practice space. /// Press ? to see how it works.";

export function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const seenWelcome = useStore((s) => s.seenWelcome);
  const setSeenWelcome = useStore((s) => s.setSeenWelcome);

  // Only open after hydration to avoid SSR mismatch
  useEffect(() => {
    if (!seenWelcome) {
      // small delay so the page paints first
      const timer = window.setTimeout(() => setOpen(true), 600);
      return () => window.clearTimeout(timer);
    }
  }, [seenWelcome]);

  // Typewriter effect
  useEffect(() => {
    if (!open) return;
    setTyped("");
    let i = 0;
    const interval = window.setInterval(() => {
      i++;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) window.clearInterval(interval);
    }, 35);
    return () => window.clearInterval(interval);
  }, [open]);

  const dismiss = () => {
    setSeenWelcome();
    setOpen(false);
  };

  // ESC / Enter to dismiss
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="no-print fixed inset-0 z-[60] bg-bg-base/85 backdrop-blur-md flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          <motion.div
            className="glass rounded-2xl p-8 md:p-12 max-w-xl w-full text-center"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Sparkles className="w-8 h-8 mx-auto text-accent-bright mb-4" />
            <p className="text-xl md:text-3xl font-medium leading-snug text-text-primary min-h-[120px]">
              {renderTyped(typed)}
              <span className="inline-block w-[2px] h-6 bg-accent-bright ml-0.5 animate-pulse" />
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="mt-8 px-6 py-2.5 rounded-md text-sm font-medium text-bg-base"
              style={{ background: "var(--gradient-button)" }}
            >
              Let&rsquo;s start
            </button>
            <p className="mt-3 text-xs text-text-tertiary">
              Press Enter or Esc to dismiss
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

// Render with simple bold/pause markers (no full PacingText needed here)
function renderTyped(text: string): React.ReactNode {
  return text.split(/(\/\/\/|\/\/)/).map((chunk, i) => {
    if (chunk === "///")
      return (
        <span
          key={i}
          aria-hidden
          className="inline-block w-0.5 h-5 align-middle bg-accent-bright/80 mx-1.5"
        />
      );
    if (chunk === "//")
      return (
        <span
          key={i}
          aria-hidden
          className="inline-block w-px h-3 align-middle bg-accent-mid/60 mx-1"
        />
      );
    return <span key={i}>{chunk}</span>;
  });
}
