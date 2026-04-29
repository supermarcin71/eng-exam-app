"use client";

import { useCallback, useEffect, useState } from "react";
import { useStore } from "./store";

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window))
    return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  cachedVoice =
    voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
    voices.find((v) => v.lang === "en-GB" && v.name.includes("Google")) ||
    voices.find((v) => v.lang.startsWith("en-US")) ||
    voices.find((v) => v.lang.startsWith("en-GB")) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null;
  return cachedVoice;
}

export function useSpeak() {
  const rate = useStore((s) => s.speechRate);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const supported =
      typeof window !== "undefined" && "speechSynthesis" in window;
    setIsSupported(supported);
    if (!supported) return;

    // Some browsers populate voices async — wait for the event.
    const handler = () => {
      cachedVoice = null; // refresh
      pickEnglishVoice();
    };
    window.speechSynthesis.addEventListener("voiceschanged", handler);
    pickEnglishVoice();

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", handler);
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window))
        return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.lang = "en-US";

      const voice = pickEnglishVoice();
      if (voice) utterance.voice = voice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [rate]
  );

  const cancel = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, cancel, isSpeaking, isSupported };
}
