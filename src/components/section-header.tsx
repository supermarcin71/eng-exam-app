/**
 * Section header used by Part 1 / Part 2 / Vocabulary / Tips / Mock dialogue.
 * Big headline + optional subtitle, consistent across tabs.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-8 md:mb-12">
      {eyebrow ? (
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-accent-bright mb-3 font-mono">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
