"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useStore } from "@/lib/store";
import { useSpeak } from "@/lib/use-speak";
import { cn } from "@/lib/utils";

const RATES = [
  { value: 0.7, label: "0.7×", hint: "Slow — for tricky words" },
  { value: 0.85, label: "0.85×", hint: "Slower than natural" },
  { value: 1.0, label: "1.0×", hint: "Natural pace (default)" },
  { value: 1.15, label: "1.15×", hint: "Slightly fast" },
  { value: 1.3, label: "1.3×", hint: "Fast — for review" },
] as const;

export function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const speechRate = useStore((s) => s.speechRate);
  const setSpeechRate = useStore((s) => s.setSpeechRate);
  const { speak, isSupported } = useSpeak();

  // Open settings on "," keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      if (e.key === "," && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Settings"
        title="Settings (press ,)"
        className="no-print fixed bottom-5 right-[155px] md:right-[170px] z-20 glass rounded-full w-11 h-11 inline-flex items-center justify-center text-text-secondary hover:text-accent-bright transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright"
      >
        <SettingsIcon className="w-4 h-4" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-bg-surface border border-border-muted max-w-md">
        <DialogHeader>
          <DialogTitle className="text-text-primary text-xl">
            Settings
          </DialogTitle>
          <DialogDescription className="text-text-tertiary">
            Tune the pronunciation playback for your practice rhythm.
          </DialogDescription>
        </DialogHeader>

        <section className="mt-2">
          <h3 className="text-sm font-medium text-text-primary mb-1">
            Speech rate
          </h3>
          <p className="text-xs text-text-tertiary mb-4">
            How fast Tricky words are spoken. Slower helps when you're
            internalizing vowel length and stress.
          </p>

          <div className="flex flex-wrap gap-2">
            {RATES.map((r) => {
              const active = Math.abs(r.value - speechRate) < 0.01;
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setSpeechRate(r.value)}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-mono transition",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright",
                    active
                      ? "bg-accent-glow text-accent-bright border border-accent-bright/50"
                      : "border border-border-muted text-text-secondary hover:border-accent-bright"
                  )}
                  title={r.hint}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          {isSupported ? (
            <button
              type="button"
              onClick={() =>
                speak("disclosure deterrence resilience cascading")
              }
              className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-accent-bright border border-border-muted hover:border-accent-bright transition"
            >
              🔊 Test current rate
            </button>
          ) : (
            <p className="mt-4 text-xs text-text-tertiary">
              Speech synthesis not supported in this browser.
            </p>
          )}
        </section>

        <p className="text-xs text-text-tertiary mt-6">
          Press <kbd className="px-1.5 py-0.5 bg-bg-elevated rounded font-mono">,</kbd> to toggle this panel.
        </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
