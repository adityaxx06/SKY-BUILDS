/**
 * Process steps — full six-stage sequence from PRD.md §15. The v5
 * visual mockups only ever demonstrated the numbered/dashed-connector
 * pattern with 3 sample steps; extending it to all 6 is a direct,
 * low-risk repeat of that same pattern, not a new design decision.
 */
export type ProcessStep = { num: string; tag: string; title: string; description: string };

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    tag: "PHASE / DISCOVER",
    title: "Discover",
    description: "Understand the business, audience, and goals before any design work starts.",
  },
  {
    num: "02",
    tag: "PHASE / PLAN",
    title: "Plan",
    description: "Map structure, content, and technical approach before any visual work starts.",
  },
  {
    num: "03",
    tag: "PHASE / DESIGN",
    title: "Design",
    description: "Build the visual language and key screens in detail.",
  },
  {
    num: "04",
    tag: "PHASE / BUILD",
    title: "Build",
    description: "Turn the approved design into a real, production-quality website.",
  },
  {
    num: "05",
    tag: "PHASE / TEST",
    title: "Test",
    description: "Check responsiveness, accessibility, performance, and cross-browser behavior.",
  },
  {
    num: "06",
    tag: "PHASE / LAUNCH",
    title: "Launch",
    description: "Deploy to production and confirm everything works in the real environment.",
  },
];
