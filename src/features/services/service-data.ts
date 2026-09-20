/**
 * Demo service content (see PRD.md §11). Lives in a typed local
 * module, not Supabase, per DATABASE.md §12 — this table only
 * benefits from dynamic management once real service copy exists.
 */
export type Service = {
  id: string;
  title: string;
  description: string;
  /** Which two tokens the hover swatch gradient uses. */
  swatch: [string, string];
};

export const services: Service[] = [
  {
    id: "01",
    title: "Website design & development",
    description: "Marketing sites and brochure sites, designed and built as one process.",
    swatch: ["var(--primary)", "var(--secondary)"],
  },
  {
    id: "02",
    title: "Web applications",
    description: "Dashboards, portals, and interactive tools built for real workflows.",
    swatch: ["var(--secondary)", "var(--accent)"],
  },
  {
    id: "03",
    title: "UI/UX design",
    description: "Interfaces designed around how people actually use them.",
    swatch: ["var(--accent)", "var(--primary)"],
  },
  {
    id: "04",
    title: "Website redesign",
    description: "Modernizing a site that's fallen behind, without starting from zero.",
    swatch: ["var(--primary)", "var(--accent)"],
  },
  {
    id: "05",
    title: "E-commerce",
    description: "Storefronts built around checkout speed and conversion, not just looks.",
    swatch: ["var(--secondary)", "var(--primary)"],
  },
];
