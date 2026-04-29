export type PacingToken =
  | { type: "text"; value: string }
  | { type: "pause-short" }
  | { type: "pause-long" }
  | { type: "breathe" }
  | { type: "bold"; value: string };

// Order matters: /// must be matched before //, and **bold** before plain text.
const PATTERN = /(\*\*[^*]+\*\*|\/\/\/|\/\/|\[breathe\])/g;

export function parsePacing(input: string): PacingToken[] {
  if (!input) return [];
  const out: PacingToken[] = [];
  let lastIndex = 0;
  for (const m of input.matchAll(PATTERN)) {
    const idx = m.index!;
    if (idx > lastIndex) {
      out.push({ type: "text", value: input.slice(lastIndex, idx) });
    }
    const tok = m[0];
    if (tok === "///") out.push({ type: "pause-long" });
    else if (tok === "//") out.push({ type: "pause-short" });
    else if (tok === "[breathe]") out.push({ type: "breathe" });
    else out.push({ type: "bold", value: tok.slice(2, -2) });
    lastIndex = idx + tok.length;
  }
  if (lastIndex < input.length) {
    out.push({ type: "text", value: input.slice(lastIndex) });
  }
  return out;
}
