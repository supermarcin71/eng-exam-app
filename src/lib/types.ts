export type SoundFlag =
  | "TH-soft"
  | "TH-voiced"
  | "W-vs-V"
  | "silent-letter"
  | "long-vowel";

export type TrickyWord = {
  word: string;
  pronunciation: string;
  polish: string;
  example: string;
  flags?: SoundFlag[];
};

export type Question = {
  id: string;
  part: 1 | 2;
  number: number;
  topicTag: string;
  questionText: string;
  answer: string;
  trickyWords: TrickyWord[];
  targetSeconds?: [number, number];
};

export type StaticSection = {
  id: "warmup" | "vocabulary" | "tips" | "mock-dialogue";
  title: string;
  contentMarkdown: string;
};

export type VocabClusterEntry = {
  word: string;
  pronunciation: string;
  polish: string;
  example: string;
};

export type VocabCluster = {
  id: string;
  title: string;
  entries: VocabClusterEntry[];
};

export type DialogueLine = {
  speaker: "examiner" | "student";
  text: string;
};

export type TabId =
  | "warmup"
  | "part-1"
  | "part-2"
  | "written"
  | "vocabulary"
  | "tips"
  | "dialogue";

// ============================================================
// Written Part — grammar drills
// ============================================================
export type ExerciseChoice = {
  text: string;
  correct: boolean;
};

export type Exercise = {
  id: string;
  category: "past-simple" | "past-continuous" | "past-perfect" | "mixed-tenses" | "transformation";
  prompt: string;          // sentence with ___ for blank
  choices?: ExerciseChoice[]; // for multiple-choice
  acceptedAnswers?: string[]; // for gap-fill (case-insensitive match)
  explanation: string;     // shown after answering
  hint?: string;
};

export type ExerciseSet = {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
};
