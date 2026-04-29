import type { ExerciseSet } from "./types";

// ============================================================
// Past Tenses drill — Past Simple vs Continuous vs Perfect
// ============================================================
const PAST_TENSES_MULTIPLE_CHOICE: ExerciseSet = {
  id: "past-tenses-mc",
  title: "Past Tenses · Multiple choice",
  description:
    "Pick the correct form. Past Simple for completed actions, Past Continuous for ongoing/interrupted, Past Perfect for actions before another past action.",
  exercises: [
    {
      id: "pt-mc-1",
      category: "past-simple",
      prompt: "When the alarm rang, she ___ her teeth.",
      choices: [
        { text: "brushed", correct: false },
        { text: "was brushing", correct: true },
        { text: "had brushed", correct: false },
      ],
      explanation:
        "Past Continuous (was brushing) — an ongoing action interrupted by a punctual event (the alarm rang).",
    },
    {
      id: "pt-mc-2",
      category: "past-perfect",
      prompt: "By the time the police arrived, the thief ___ already.",
      choices: [
        { text: "left", correct: false },
        { text: "was leaving", correct: false },
        { text: "had left", correct: true },
      ],
      explanation:
        "Past Perfect (had left) — the leaving happened BEFORE the police arrived. 'By the time' + Past Perfect is a classic pairing.",
    },
    {
      id: "pt-mc-3",
      category: "past-simple",
      prompt: "Last summer we ___ to Greece for two weeks.",
      choices: [
        { text: "went", correct: true },
        { text: "were going", correct: false },
        { text: "had gone", correct: false },
      ],
      explanation:
        "Past Simple (went) — a finished action with a clear time reference (last summer).",
    },
    {
      id: "pt-mc-4",
      category: "past-continuous",
      prompt: "While I ___ dinner, the phone rang three times.",
      choices: [
        { text: "cooked", correct: false },
        { text: "was cooking", correct: true },
        { text: "had cooked", correct: false },
      ],
      explanation:
        "Past Continuous (was cooking) — a longer ongoing action providing background. 'While' typically signals continuous.",
    },
    {
      id: "pt-mc-5",
      category: "past-perfect",
      prompt: "She didn't recognize him because she ___ him for ten years.",
      choices: [
        { text: "didn't see", correct: false },
        { text: "wasn't seeing", correct: false },
        { text: "hadn't seen", correct: true },
      ],
      explanation:
        "Past Perfect (hadn't seen) — the not-seeing was before the not-recognizing. Two past actions in sequence.",
    },
    {
      id: "pt-mc-6",
      category: "past-simple",
      prompt: "He ___ the keys on the table and walked out.",
      choices: [
        { text: "put", correct: true },
        { text: "was putting", correct: false },
        { text: "had put", correct: false },
      ],
      explanation:
        "Past Simple (put) — a sequence of two completed actions joined by 'and'.",
    },
    {
      id: "pt-mc-7",
      category: "mixed-tenses",
      prompt: "When I got home, my brother ___ TV in the living room.",
      choices: [
        { text: "watched", correct: false },
        { text: "was watching", correct: true },
        { text: "had watched", correct: false },
      ],
      explanation:
        "Past Continuous (was watching) — the watching was already in progress when 'I got home'.",
    },
    {
      id: "pt-mc-8",
      category: "past-perfect",
      prompt: "The room was clean — someone ___ it before we arrived.",
      choices: [
        { text: "tidied", correct: false },
        { text: "was tidying", correct: false },
        { text: "had tidied", correct: true },
      ],
      explanation:
        "Past Perfect (had tidied) — the tidying explains the past state (was clean) and happened earlier.",
    },
    {
      id: "pt-mc-9",
      category: "past-continuous",
      prompt:
        "I was tired in class because I ___ for the exam all night.",
      choices: [
        { text: "studied", correct: false },
        { text: "had been studying", correct: true },
        { text: "was studying", correct: false },
      ],
      explanation:
        "Past Perfect Continuous (had been studying) — emphasizes the duration of an action that led up to a past state. Past Continuous would lose the duration nuance.",
    },
    {
      id: "pt-mc-10",
      category: "mixed-tenses",
      prompt:
        "She had finished her coffee by the time the bus ___.",
      choices: [
        { text: "came", correct: true },
        { text: "was coming", correct: false },
        { text: "had come", correct: false },
      ],
      explanation:
        "Past Simple (came) — punctual arrival. 'By the time' splits the sentence: Past Perfect for the earlier action (finished), Past Simple for the later action (came).",
    },
  ],
};

// ============================================================
// Gap fill — write the correct verb form
// ============================================================
const PAST_TENSES_GAP_FILL: ExerciseSet = {
  id: "past-tenses-gap",
  title: "Past Tenses · Gap fill",
  description:
    "Type the correct past form of the verb in brackets. Capitalization and punctuation don't matter; spelling does.",
  exercises: [
    {
      id: "pt-gap-1",
      category: "past-simple",
      prompt: "Yesterday I ___ a strange dream. (have)",
      acceptedAnswers: ["had"],
      explanation: "had — Past Simple of 'have'.",
    },
    {
      id: "pt-gap-2",
      category: "past-continuous",
      prompt:
        "It ___ when we left the cinema, so we took a taxi. (rain)",
      acceptedAnswers: ["was raining"],
      explanation:
        "was raining — Past Continuous, an ongoing background action.",
    },
    {
      id: "pt-gap-3",
      category: "past-perfect",
      prompt:
        "I realized I ___ my keys at the office. (leave)",
      acceptedAnswers: ["had left"],
      explanation:
        "had left — Past Perfect, an action before the realization.",
      hint: "Hint: think 'leave' → past participle 'left'.",
    },
    {
      id: "pt-gap-4",
      category: "past-simple",
      prompt:
        "We ___ to Italy three times when we lived there. (travel)",
      acceptedAnswers: ["travelled", "traveled"],
      explanation:
        "travelled (UK) / traveled (US) — both spellings are accepted in Past Simple.",
    },
    {
      id: "pt-gap-5",
      category: "past-perfect",
      prompt:
        "By 2010, the company ___ ten new branches across Europe. (open)",
      acceptedAnswers: ["had opened"],
      explanation:
        "had opened — Past Perfect with 'by' + a past time point.",
    },
    {
      id: "pt-gap-6",
      category: "past-continuous",
      prompt:
        "While she ___ the report, her boss called twice. (write)",
      acceptedAnswers: ["was writing"],
      explanation:
        "was writing — Past Continuous, a longer ongoing action interrupted twice.",
    },
    {
      id: "pt-gap-7",
      category: "past-simple",
      prompt:
        "The match ___ at 8 PM and ___ for two hours. (start, last)",
      acceptedAnswers: ["started, lasted", "started and lasted"],
      explanation:
        "started, lasted — two Past Simple verbs for sequenced complete events.",
    },
    {
      id: "pt-gap-8",
      category: "mixed-tenses",
      prompt: "I ___ him because we ___ each other for years. (recognize / not see)",
      acceptedAnswers: [
        "didn't recognize him because we hadn't seen",
        "didn't recognise him because we hadn't seen",
      ],
      explanation:
        "didn't recognize + hadn't seen — Past Simple in main clause, Past Perfect for the earlier ongoing absence.",
      hint: "Hint: include the negative forms in your answer.",
    },
  ],
};

// ============================================================
// Sentence transformation — rewrite without changing meaning
// ============================================================
const TRANSFORMATION_DRILL: ExerciseSet = {
  id: "transformation",
  title: "Sentence transformation",
  description:
    "Rewrite each sentence using the word in capitals, keeping the meaning. Classic English File Section 1–2 style.",
  exercises: [
    {
      id: "tr-1",
      category: "transformation",
      prompt:
        "It started raining two hours ago. → It ___ raining for two hours. (BEEN)",
      acceptedAnswers: ["has been"],
      explanation:
        "has been raining — Present Perfect Continuous; uses 'for' for duration up to now.",
    },
    {
      id: "tr-2",
      category: "transformation",
      prompt:
        "She finished her homework before dinner. → She had ___ her homework by dinner. (FINISHED)",
      acceptedAnswers: ["finished"],
      explanation:
        "finished — Past Perfect; 'by' indicates the action was complete before the next reference.",
    },
    {
      id: "tr-3",
      category: "transformation",
      prompt:
        "I last saw him in 2018. → I ___ seen him since 2018. (NOT)",
      acceptedAnswers: ["haven't", "have not"],
      explanation:
        "haven't seen — Present Perfect negative + 'since' for the start of the ongoing not-seeing.",
    },
    {
      id: "tr-4",
      category: "transformation",
      prompt:
        "The film began at 8. We arrived at 8:15. → The film ___ already started when we arrived. (HAD)",
      acceptedAnswers: ["had"],
      explanation:
        "had — Past Perfect 'had already started'; the starting was before the arriving.",
    },
    {
      id: "tr-5",
      category: "transformation",
      prompt:
        "She didn't go to the cinema because she had no money. → She ___ have gone to the cinema if she'd had money. (WOULD)",
      acceptedAnswers: ["would"],
      explanation:
        "would — Third Conditional. Pattern: 'If + Past Perfect, would have + past participle.'",
    },
    {
      id: "tr-6",
      category: "transformation",
      prompt:
        "It is many years since I visited Rome. → I ___ visited Rome for many years. (HAVE)",
      acceptedAnswers: ["haven't", "have not"],
      explanation:
        "haven't visited — Present Perfect negative + 'for' to mark duration of not visiting.",
    },
  ],
};

export const WRITTEN_EXERCISES: ExerciseSet[] = [
  PAST_TENSES_MULTIPLE_CHOICE,
  PAST_TENSES_GAP_FILL,
  TRANSFORMATION_DRILL,
];

export const TOTAL_WRITTEN_EXERCISES = WRITTEN_EXERCISES.reduce(
  (acc, set) => acc + set.exercises.length,
  0
);
