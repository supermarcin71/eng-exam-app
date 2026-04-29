"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useStore } from "./store";

/**
 * Fires a celebratory burst when a tab reaches 100% practiced for the first
 * time. Tracks fired tabs in `celebratedTabs` (persisted) so it never repeats.
 */
export function useConfetti(tabId: string, totalForTab: number, doneForTab: number) {
  const celebrated = useStore((s) => s.celebratedTabs.includes(tabId));
  const markCelebrated = useStore((s) => s.markCelebrated);

  useEffect(() => {
    if (totalForTab === 0) return;
    if (celebrated) return;
    if (doneForTab < totalForTab) return;

    confetti({
      particleCount: 90,
      spread: 70,
      ticks: 200,
      origin: { x: 0.5, y: 0.85 },
      colors: ["#1E3A8A", "#2563EB", "#60A5FA", "#22D3EE", "#F1F5F9"],
      scalar: 1.1,
      disableForReducedMotion: true,
    });
    markCelebrated(tabId);
  }, [tabId, totalForTab, doneForTab, celebrated, markCelebrated]);
}
