"use client";

import { useEffect, useState } from "react";

/**
 * Top-of-page horizontal bar that fills as the user scrolls.
 * Read inspiration: cyber-study / Linear-style reading progress.
 */
export function ReadingProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight =
        (document.documentElement.scrollHeight || 0) - window.innerHeight;
      const next = docHeight <= 0 ? 0 : Math.min(100, (scrollTop / docHeight) * 100);
      setPct(next);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div className="reading-progress" style={{ width: `${pct}%` }} />;
}
