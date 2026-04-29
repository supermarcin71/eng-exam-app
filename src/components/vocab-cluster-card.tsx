import type { VocabCluster } from "@/lib/types";
import { SpeakButton } from "./speak-button";

export function VocabClusterCard({ cluster }: { cluster: VocabCluster }) {
  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-1">
        {cluster.title}
      </h3>
      <p className="text-xs text-text-tertiary uppercase tracking-widest mb-6 font-mono">
        {cluster.entries.length} terms
      </p>

      <ul className="space-y-3">
        {cluster.entries.map((e) => (
          <li
            key={e.word}
            className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 items-start py-2 border-b border-border-subtle last:border-b-0"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-text-primary">{e.word}</span>
                <span className="font-mono text-accent-bright text-xs">
                  {e.pronunciation}
                </span>
              </div>
              <div className="text-text-secondary text-sm mt-0.5">
                {e.polish}{" "}
                <span className="text-text-tertiary italic ml-1">
                  · &ldquo;{e.example}&rdquo;
                </span>
              </div>
            </div>
            <SpeakButton text={e.word} />
          </li>
        ))}
      </ul>
    </div>
  );
}
