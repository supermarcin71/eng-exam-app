import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TabId } from "./types";

interface AppState {
  // persistent
  practicedIds: string[];
  selfRatings: Record<string, 1 | 2 | 3 | 4 | 5>;
  seenWelcome: boolean;
  speechRate: number;
  revealedDefault: "hidden" | "shown";
  celebratedTabs: string[]; // tabs where confetti already fired

  // ephemeral
  activeTab: TabId;
  revealedIds: string[];
  readingModeQuestionId: string | null;
  shortcutsModalOpen: boolean;

  // actions
  togglePracticed: (id: string) => void;
  toggleRevealed: (id: string) => void;
  setRating: (id: string, value: 1 | 2 | 3 | 4 | 5) => void;
  setActiveTab: (tab: TabId) => void;
  setReadingMode: (id: string | null) => void;
  setShortcutsOpen: (open: boolean) => void;
  setSeenWelcome: () => void;
  setSpeechRate: (rate: number) => void;
  markCelebrated: (tab: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      practicedIds: [],
      selfRatings: {},
      seenWelcome: false,
      speechRate: 1,
      revealedDefault: "hidden",
      celebratedTabs: [],

      activeTab: "warmup",
      revealedIds: [],
      readingModeQuestionId: null,
      shortcutsModalOpen: false,

      togglePracticed: (id) =>
        set((s) => ({
          practicedIds: s.practicedIds.includes(id)
            ? s.practicedIds.filter((x) => x !== id)
            : [...s.practicedIds, id],
        })),
      toggleRevealed: (id) =>
        set((s) => ({
          revealedIds: s.revealedIds.includes(id)
            ? s.revealedIds.filter((x) => x !== id)
            : [...s.revealedIds, id],
        })),
      setRating: (id, value) =>
        set((s) => ({ selfRatings: { ...s.selfRatings, [id]: value } })),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setReadingMode: (id) => set({ readingModeQuestionId: id }),
      setShortcutsOpen: (open) => set({ shortcutsModalOpen: open }),
      setSeenWelcome: () => set({ seenWelcome: true }),
      setSpeechRate: (rate) => set({ speechRate: rate }),
      markCelebrated: (tab) =>
        set((s) =>
          s.celebratedTabs.includes(tab)
            ? s
            : { celebratedTabs: [...s.celebratedTabs, tab] }
        ),
    }),
    {
      name: "eng-exam-app-state-v1",
      partialize: (state) => ({
        practicedIds: state.practicedIds,
        selfRatings: state.selfRatings,
        seenWelcome: state.seenWelcome,
        speechRate: state.speechRate,
        revealedDefault: state.revealedDefault,
        celebratedTabs: state.celebratedTabs,
      }),
    }
  )
);
