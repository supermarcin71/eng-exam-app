"use client";

import { useEffect } from "react";
import { useStore } from "./store";
import type { TabId } from "./types";

const TAB_BY_KEY: Record<string, TabId> = {
  "1": "warmup",
  "2": "part-1",
  "3": "part-2",
  "4": "vocabulary",
  "5": "tips",
  "6": "dialogue",
};

export function useShortcuts() {
  const setActiveTab = useStore((s) => s.setActiveTab);
  const setShortcutsOpen = useStore((s) => s.setShortcutsOpen);
  const readingModeId = useStore((s) => s.readingModeQuestionId);
  const setReadingMode = useStore((s) => s.setReadingMode);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // ignore if typing in input/textarea
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }

      // "?" — open shortcuts
      if (e.key === "?") {
        e.preventDefault();
        setShortcutsOpen(true);
        return;
      }
      // ESC — close reading mode
      if (e.key === "Escape" && readingModeId) {
        setReadingMode(null);
        return;
      }
      // F — broadcast toggle reading mode
      if (e.key.toLowerCase() === "f" && !e.ctrlKey && !e.metaKey) {
        window.dispatchEvent(new CustomEvent("toggle-reading-mode"));
        return;
      }
      // 1-6 — switch tab
      const tab = TAB_BY_KEY[e.key];
      if (tab) {
        e.preventDefault();
        setActiveTab(tab);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setActiveTab, setShortcutsOpen, readingModeId, setReadingMode]);
}
