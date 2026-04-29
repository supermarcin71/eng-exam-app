"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { TabId } from "@/lib/types";

const TABS: { id: TabId; label: string; short: string }[] = [
  { id: "warmup", label: "Warm-up", short: "Warm-up" },
  { id: "part-1", label: "Part 1 · Marleku", short: "Part 1" },
  { id: "part-2", label: "Part 2 · UN Resilience", short: "Part 2" },
  { id: "vocabulary", label: "Vocabulary", short: "Vocab" },
  { id: "tips", label: "Tips", short: "Tips" },
  { id: "dialogue", label: "Mock dialogue", short: "Mock" },
];

export function TabsNav() {
  const active = useStore((s) => s.activeTab);
  const setActive = useStore((s) => s.setActiveTab);

  return (
    <nav className="no-print sticky top-0 z-30 backdrop-blur-md bg-bg-base/70 border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-2 md:px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 min-w-max items-center">
          {TABS.map((t, i) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={cn(
                  "relative px-3 md:px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright rounded-md",
                  isActive
                    ? "text-accent-bright"
                    : "text-text-secondary hover:text-text-primary"
                )}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Switch to ${t.label} (key ${i + 1})`}
              >
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.short}</span>
                {isActive ? (
                  <motion.span
                    layoutId="tab-underline"
                    aria-hidden
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    style={{ background: "var(--gradient-button)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
