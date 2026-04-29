import { describe, it, expect } from "vitest";
import { parsePacing } from "./parse-pacing";

describe("parsePacing", () => {
  it("returns plain text token for simple input", () => {
    expect(parsePacing("Hello world")).toEqual([
      { type: "text", value: "Hello world" },
    ]);
  });

  it("splits on // marker (short pause)", () => {
    expect(parsePacing("Hello // world")).toEqual([
      { type: "text", value: "Hello " },
      { type: "pause-short" },
      { type: "text", value: " world" },
    ]);
  });

  it("splits on /// marker (long pause)", () => {
    expect(parsePacing("End. /// New.")).toEqual([
      { type: "text", value: "End. " },
      { type: "pause-long" },
      { type: "text", value: " New." },
    ]);
  });

  it("recognizes [breathe] marker", () => {
    expect(parsePacing("Run [breathe] go")).toEqual([
      { type: "text", value: "Run " },
      { type: "breathe" },
      { type: "text", value: " go" },
    ]);
  });

  it("recognizes **bold** wrapping", () => {
    expect(parsePacing("This is **important** text")).toEqual([
      { type: "text", value: "This is " },
      { type: "bold", value: "important" },
      { type: "text", value: " text" },
    ]);
  });

  it("handles compound input with all markers", () => {
    const out = parsePacing("**Hello** // world /// [breathe]");
    expect(out.length).toBeGreaterThanOrEqual(6);
    expect(out[0]).toEqual({ type: "bold", value: "Hello" });
    expect(out.some((t) => t.type === "pause-short")).toBe(true);
    expect(out.some((t) => t.type === "pause-long")).toBe(true);
    expect(out.some((t) => t.type === "breathe")).toBe(true);
  });

  it("prefers /// over // (longest match)", () => {
    const out = parsePacing("a /// b");
    expect(out).toEqual([
      { type: "text", value: "a " },
      { type: "pause-long" },
      { type: "text", value: " b" },
    ]);
  });

  it("handles multiple bold runs", () => {
    const out = parsePacing("**foo** and **bar**");
    expect(out.filter((t) => t.type === "bold")).toEqual([
      { type: "bold", value: "foo" },
      { type: "bold", value: "bar" },
    ]);
  });

  it("returns empty array for empty input", () => {
    expect(parsePacing("")).toEqual([]);
  });
});
