"use client";

import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const EMOJIS = ["😣", "😕", "😐", "🙂", "😎"] as const;
const LABELS = ["No idea", "Shaky", "Okay", "Good", "Confident"] as const;

export function SelfRating({ id }: { id: string }) {
  const rating = useStore((s) => s.selfRatings[id]);
  const setRating = useStore((s) => s.setRating);

  return (
    <div className="no-print mt-5 flex flex-wrap items-center gap-2">
      <span className="text-xs text-text-tertiary mr-2 uppercase tracking-wider">
        How confident?
      </span>
      <div className="flex gap-1.5">
        {EMOJIS.map((e, i) => {
          const value = (i + 1) as 1 | 2 | 3 | 4 | 5;
          const active = rating === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setRating(id, value)}
              title={LABELS[i]}
              aria-label={`${LABELS[i]} (${value} of 5)`}
              className={cn(
                "w-9 h-9 rounded-full text-xl transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright",
                active
                  ? "bg-accent-glow ring-2 ring-accent-bright scale-110"
                  : "hover:bg-bg-elevated hover:scale-105 grayscale opacity-60 hover:opacity-100 hover:grayscale-0"
              )}
            >
              {e}
            </button>
          );
        })}
      </div>
      {rating ? (
        <span className="text-xs text-accent-bright ml-2 font-mono">
          {LABELS[rating - 1]}
        </span>
      ) : null}
    </div>
  );
}
