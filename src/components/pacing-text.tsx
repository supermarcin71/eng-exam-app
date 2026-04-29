import { parsePacing } from "@/lib/parse-pacing";

/**
 * Renders text with pacing markers as visual cues:
 *  - `//`        → thin vertical bar (short pause)
 *  - `///`       → thicker vertical bar (long pause)
 *  - `[breathe]` → 🫁 pill
 *  - `**bold**`  → emphasized strong
 */
export function PacingText({ text }: { text: string }) {
  const tokens = parsePacing(text);
  return (
    <span className="leading-[1.7]">
      {tokens.map((t, i) => {
        if (t.type === "text") return <span key={i}>{t.value}</span>;
        if (t.type === "bold") {
          return (
            <strong
              key={i}
              className="font-semibold text-accent-bright underline decoration-accent-mid/40 underline-offset-4"
            >
              {t.value}
            </strong>
          );
        }
        if (t.type === "pause-short") {
          return (
            <span
              key={i}
              aria-hidden
              className="inline-block align-middle mx-1 w-px h-3 bg-accent-mid/60"
              title="short pause"
            />
          );
        }
        if (t.type === "pause-long") {
          return (
            <span
              key={i}
              aria-hidden
              className="inline-block align-middle mx-1.5 w-0.5 h-[18px] bg-accent-bright/80"
              title="breath / long pause"
            />
          );
        }
        if (t.type === "breathe") {
          return (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-full text-[12px] font-mono bg-accent-glow text-accent-bright align-middle"
            >
              <span aria-hidden>🫁</span>breathe
            </span>
          );
        }
        return null;
      })}
    </span>
  );
}
