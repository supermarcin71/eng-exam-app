"use client";

import { Volume2 } from "lucide-react";
import { useSpeak } from "@/lib/use-speak";
import { cn } from "@/lib/utils";

export function SpeakButton({
  text,
  className,
  size = "sm",
}: {
  text: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const { speak, isSupported, isSpeaking } = useSpeak();
  if (!isSupported) return null;
  const dimensions = size === "md" ? "w-9 h-9" : "w-7 h-7";
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      aria-label={`Speak ${text}`}
      title={`Speak "${text}"`}
      className={cn(
        "no-print inline-flex items-center justify-center rounded-md",
        "text-text-secondary hover:text-accent-bright",
        "hover:bg-accent-glow transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright",
        isSpeaking && "text-accent-bright bg-accent-glow animate-pulse",
        dimensions,
        className
      )}
    >
      <Volume2 className={size === "md" ? "w-5 h-5" : "w-4 h-4"} />
    </button>
  );
}
