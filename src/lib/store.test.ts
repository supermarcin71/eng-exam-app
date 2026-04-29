import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from "./store";

describe("useStore", () => {
  beforeEach(() => {
    useStore.setState({
      practicedIds: [],
      selfRatings: {},
      seenWelcome: false,
      celebratedTabs: [],
      activeTab: "warmup",
      revealedIds: [],
      readingModeQuestionId: null,
      shortcutsModalOpen: false,
      speechRate: 1,
      revealedDefault: "hidden",
    });
  });

  it("toggles practiced id on, then off", () => {
    useStore.getState().togglePracticed("p1-q1");
    expect(useStore.getState().practicedIds).toContain("p1-q1");
    useStore.getState().togglePracticed("p1-q1");
    expect(useStore.getState().practicedIds).not.toContain("p1-q1");
  });

  it("toggles revealed id", () => {
    useStore.getState().toggleRevealed("p1-q2");
    expect(useStore.getState().revealedIds).toContain("p1-q2");
  });

  it("stores self rating", () => {
    useStore.getState().setRating("p1-q3", 4);
    expect(useStore.getState().selfRatings["p1-q3"]).toBe(4);
  });

  it("changes active tab", () => {
    useStore.getState().setActiveTab("part-2");
    expect(useStore.getState().activeTab).toBe("part-2");
  });

  it("opens and closes reading mode", () => {
    useStore.getState().setReadingMode("p1-q4");
    expect(useStore.getState().readingModeQuestionId).toBe("p1-q4");
    useStore.getState().setReadingMode(null);
    expect(useStore.getState().readingModeQuestionId).toBeNull();
  });

  it("marks tab as celebrated only once", () => {
    useStore.getState().markCelebrated("part-1");
    useStore.getState().markCelebrated("part-1");
    expect(
      useStore.getState().celebratedTabs.filter((x) => x === "part-1").length
    ).toBe(1);
  });
});
