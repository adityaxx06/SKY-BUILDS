/**
 * "Why SKY BUILDS" value propositions (PRD.md §9 lists this as a
 * homepage section; content itself wasn't specified there, so these
 * are genuine, specific differentiators rather than generic feature
 * copy — see the Phase 5 brief's explicit ban on filler like
 * "passionate team dedicated to innovative solutions").
 */
export type WhyItem = {
  id: string;
  title: string;
  description: string;
  swatch: [string, string];
};

export const whyItems: WhyItem[] = [
  {
    id: "01",
    title: "Design & development, together",
    description:
      "The same team designs and builds your site, so nothing gets lost between a mockup and the real thing.",
    swatch: ["var(--primary)", "var(--secondary)"],
  },
  {
    id: "02",
    title: "Built for speed",
    description: "Every site starts fast and stays fast — no bloated frameworks, no unnecessary scripts.",
    swatch: ["var(--secondary)", "var(--accent)"],
  },
  {
    id: "03",
    title: "No unnecessary complexity",
    description: "We use exactly as much technology as a project needs. Nothing more.",
    swatch: ["var(--accent)", "var(--primary)"],
  },
  {
    id: "04",
    title: "Work with an actual person",
    description: "You'll talk directly with the person building your site — not an account manager.",
    swatch: ["var(--primary)", "var(--accent)"],
  },
];
