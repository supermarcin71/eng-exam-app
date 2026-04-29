import type { TrickyWord } from "@/lib/types";
import { SpeakButton } from "./speak-button";

const FLAG_LABEL: Record<string, string> = {
  "TH-soft": "TH",
  "TH-voiced": "TH",
  "W-vs-V": "W≠V",
  "silent-letter": "silent",
  "long-vowel": "long ee",
};

export function TrickyWordsTable({ words }: { words: TrickyWord[] }) {
  if (!words?.length) return null;
  return (
    <div className="mt-6 rounded-xl border border-border-subtle overflow-hidden bg-bg-surface/50">
      <div className="px-4 py-2 bg-bg-elevated border-b border-border-subtle text-xs uppercase tracking-widest font-semibold text-accent-bright">
        Tricky words
      </div>

      {/* mobile cards */}
      <div className="md:hidden divide-y divide-border-subtle">
        {words.map((w) => (
          <div key={w.word} className="p-4 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-text-primary text-base">
                {w.word}
              </span>
              <SpeakButton text={w.word} />
            </div>
            <div className="font-mono text-accent-bright text-xs flex flex-wrap items-center gap-1.5">
              {w.pronunciation}
              {w.flags?.map((f) => (
                <span
                  key={f}
                  className="px-1.5 py-0.5 rounded-full bg-accent-glow text-[10px] font-sans"
                >
                  {FLAG_LABEL[f] ?? f}
                </span>
              ))}
            </div>
            <div className="text-text-secondary text-sm">{w.polish}</div>
            <div className="text-text-tertiary italic text-xs">
              &ldquo;{w.example}&rdquo;
            </div>
          </div>
        ))}
      </div>

      {/* desktop table */}
      <table className="hidden md:table w-full text-sm">
        <thead className="bg-bg-elevated/50">
          <tr className="text-left text-text-tertiary">
            <th className="px-4 py-2 font-medium">English</th>
            <th className="px-4 py-2 font-medium">Pronunciation</th>
            <th className="px-4 py-2 font-medium">Polish</th>
            <th className="px-4 py-2 font-medium">Example</th>
            <th className="px-2 py-2 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {words.map((w) => (
            <tr
              key={w.word}
              className="border-t border-border-subtle hover:bg-bg-elevated/40 transition-colors"
            >
              <td className="px-4 py-2 font-semibold text-text-primary">
                {w.word}
              </td>
              <td className="px-4 py-2 font-mono text-accent-bright text-xs">
                <span className="inline-flex items-center gap-2">
                  {w.pronunciation}
                  {w.flags?.map((f) => (
                    <span
                      key={f}
                      className="px-1.5 py-0.5 rounded-full bg-accent-glow text-[10px] font-sans"
                    >
                      {FLAG_LABEL[f] ?? f}
                    </span>
                  ))}
                </span>
              </td>
              <td className="px-4 py-2 text-text-secondary">{w.polish}</td>
              <td className="px-4 py-2 text-text-tertiary italic">
                &ldquo;{w.example}&rdquo;
              </td>
              <td className="px-2 py-2">
                <SpeakButton text={w.word} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
