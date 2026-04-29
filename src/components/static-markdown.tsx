/**
 * Lightweight markdown renderer for our static sections (warmup + tips).
 * NOT a full markdown parser — handles ONLY the subset we use:
 *   - ### headings → h3
 *   - **bold** → <strong>
 *   - *italic* → <em>
 *   - bullets (- ) → ul/li
 *   - blank line → paragraph break
 *   - inline code `...` → <code> with mono font
 *   - pacing markers // /// stay inline as decorative bars
 */
import { Fragment } from "react";

function inline(text: string, keyPrefix = ""): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  // Match: bold, italic, inline code, /// ///, //, [breathe]
  const PATTERN =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\/\/\/|\/\/|\[breathe\])/g;
  let last = 0;
  for (const m of text.matchAll(PATTERN)) {
    const idx = m.index!;
    if (idx > last) out.push(text.slice(last, idx));
    const t = m[0];
    const k = `${keyPrefix}-${idx}`;
    if (t.startsWith("**"))
      out.push(
        <strong key={k} className="text-text-primary font-semibold">
          {t.slice(2, -2)}
        </strong>
      );
    else if (t.startsWith("`"))
      out.push(
        <code
          key={k}
          className="font-mono text-accent-bright bg-bg-elevated px-1.5 py-0.5 rounded text-sm"
        >
          {t.slice(1, -1)}
        </code>
      );
    else if (t.startsWith("*"))
      out.push(
        <em key={k} className="italic text-text-secondary">
          {/* Recursively process pacing markers inside italics */}
          {inline(t.slice(1, -1), `${k}-em`)}
        </em>
      );
    else if (t === "///")
      out.push(
        <span
          key={k}
          aria-hidden
          className="inline-block w-0.5 h-[18px] align-middle bg-accent-bright/80 mx-1.5"
        />
      );
    else if (t === "//")
      out.push(
        <span
          key={k}
          aria-hidden
          className="inline-block w-px h-3 align-middle bg-accent-mid/60 mx-1"
        />
      );
    else if (t === "[breathe]")
      out.push(
        <span
          key={k}
          className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-full text-[12px] font-mono bg-accent-glow text-accent-bright align-middle"
        >
          🫁 breathe
        </span>
      );
    last = idx + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function StaticMarkdown({ source }: { source: string }) {
  const blocks = source.split(/\n\s*\n/);
  return (
    <div className="space-y-5 text-text-primary leading-[1.7]">
      {blocks.map((block, bi) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Heading
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={bi}
              className="text-xl md:text-2xl font-semibold text-text-primary mt-8 mb-2"
            >
              {inline(trimmed.replace(/^###\s+/, ""), `h3-${bi}`)}
            </h3>
          );
        }

        // Bullet list (lines starting with "- ")
        if (trimmed.split("\n").every((l) => l.trim().startsWith("- "))) {
          const items = trimmed
            .split("\n")
            .map((l) => l.replace(/^\s*-\s+/, ""));
          return (
            <ul key={bi} className="space-y-2 list-none pl-0">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="relative pl-5 text-text-secondary text-base md:text-lg"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-accent-bright to-accent-cyan"
                  />
                  {inline(item, `li-${bi}-${i}`)}
                </li>
              ))}
            </ul>
          );
        }

        // Ordered list (lines starting with "1. " etc)
        if (
          trimmed
            .split("\n")
            .every((l) => /^\s*\d+\.\s+/.test(l))
        ) {
          const items = trimmed
            .split("\n")
            .map((l) => l.replace(/^\s*\d+\.\s+/, ""));
          return (
            <ol key={bi} className="space-y-2 list-none pl-0 counter-reset-list">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="relative pl-9 text-text-secondary text-base md:text-lg"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-bg-elevated text-accent-bright text-sm font-mono"
                  >
                    {i + 1}
                  </span>
                  {inline(item, `oli-${bi}-${i}`)}
                </li>
              ))}
            </ol>
          );
        }

        // Plain paragraph
        return (
          <p key={bi} className="text-base md:text-lg text-text-secondary">
            {trimmed.split("\n").map((line, li) => (
              <Fragment key={li}>
                {inline(line, `p-${bi}-${li}`)}
                {li < trimmed.split("\n").length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
