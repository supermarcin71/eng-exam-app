"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useStore } from "@/lib/store";

const SHORTCUTS = [
  { keys: ["?"], action: "Open this shortcuts panel" },
  { keys: [","], action: "Open settings (speech rate)" },
  { keys: ["F"], action: "Reading mode for the question in view" },
  { keys: ["Esc"], action: "Close reading mode or modal" },
  { keys: ["1", "2", "3", "4", "5", "6", "7"], action: "Switch tabs" },
];

export function ShortcutsModal() {
  const open = useStore((s) => s.shortcutsModalOpen);
  const setOpen = useStore((s) => s.setShortcutsOpen);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-bg-surface border border-border-muted max-w-md">
        <DialogHeader>
          <DialogTitle className="text-text-primary text-xl">
            Keyboard shortcuts
          </DialogTitle>
          <DialogDescription className="text-text-tertiary">
            Speed up your practice — use these from anywhere on the page.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 divide-y divide-border-subtle">
          {SHORTCUTS.map((s) => (
            <div
              key={s.action}
              className="flex items-center justify-between gap-4 py-3"
            >
              <span className="text-sm text-text-secondary">{s.action}</span>
              <span className="flex gap-1">
                {s.keys.map((k) => (
                  <kbd
                    key={k}
                    className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-bg-elevated border border-border-muted text-text-primary font-mono text-xs"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          Tip: every Tricky word has a 🔊 button — hover and click to hear it
          read aloud.
        </p>
      </DialogContent>
    </Dialog>
  );
}
