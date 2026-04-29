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
  | "vocabulary"
  | "tips"
  | "dialogue";
