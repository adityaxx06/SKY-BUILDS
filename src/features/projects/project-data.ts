/**
 * Demo/concept projects (see PRD.md §12). These are clearly marked as
 * concept work, not real client projects — PRD explicitly forbids
 * fabricating client names, results, or testimonials for them.
 *
 * Field names intentionally mirror DATABASE.md's `projects` table so
 * swapping this module for a Supabase query later (Phase 9) doesn't
 * require reshaping consumers — see ARCHITECTURE.md §14.
 */
export type MockupType = "browser" | "devices" | "dashboard";

export type ProjectGalleryItem = {
  type: "browser" | "devices" | "dashboard" | "panel" | "typography";
  title?: string;
  description?: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  year: number;
  featured: boolean;
  displayOrder: number;
  mockupType: MockupType;
  // Detail page fields
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  gallery: ProjectGalleryItem[];
  visualTheme: "analytical" | "editorial" | "energetic";
  services: string[];
};

export const projects: Project[] = [
  {
    id: "nova",
    title: "NOVA",
    slug: "nova",
    category: "SaaS · Web app",
    description: "A concept dashboard and marketing site for a SaaS analytics product.",
    year: 2026,
    featured: true,
    displayOrder: 1,
    mockupType: "browser",
    overview:
      "NOVA explores the intersection of data visualization and marketing clarity. The concept imagines a SaaS analytics platform that needs to communicate complex data insights to both technical and non-technical stakeholders. The project encompasses a marketing landing page and an analytical dashboard interface.",
    challenge:
      "Analytics dashboards often overwhelm users with dense charts, unclear hierarchy, and jargon-heavy interfaces. The challenge was to design a dashboard concept that surfaces key insights immediately while supporting deeper exploration, paired with a marketing site that explains the product's value without relying on buzzwords.",
    solution:
      "The concept uses a modular card system with progressive disclosure — summary metrics upfront, detailed views on demand. The marketing page leads with a clear value proposition and interactive dashboard preview. A consistent visual language (indigo primary, structured grids, purposeful motion) ties both experiences together.",
    features: [
      "Real-time metric cards with sparkline trends",
      "Collapsible chart panels for progressive disclosure",
      "Role-based view presets (executive, analyst, operator)",
      "Marketing page with live dashboard embed",
      "Responsive breakpoint strategy for data density",
      "Keyboard-first navigation for power users",
    ],
    gallery: [
      { type: "browser", title: "Marketing landing page", description: "Hero with interactive dashboard preview" },
      { type: "dashboard", title: "Analytics dashboard", description: "Metric cards, trend charts, and data tables" },
      { type: "panel", title: "Metric detail view", description: "Expanded card with historical comparison" },
      { type: "panel", title: "Chart explorer", description: "Full-width visualization with filter controls" },
      { type: "typography", title: "Data typography system", description: "Monospace figures, unit labels, trend indicators" },
    ],
    visualTheme: "analytical",
    services: ["Web Design", "UI/UX", "Development"],
  },
  {
    id: "aurelia",
    title: "AURELIA",
    slug: "aurelia",
    category: "Real estate",
    description: "A premium real-estate brand site, designed across desktop and mobile.",
    year: 2026,
    featured: false,
    displayOrder: 2,
    mockupType: "devices",
    overview:
      "AURELIA is a concept for a luxury real estate brand that prioritizes property presentation and editorial storytelling. The project explores how a high-end property site can feel more like a curated magazine than a listing directory, using generous whitespace, refined typography, and immersive imagery.",
    challenge:
      "Real estate websites typically default to dense grids, filter-heavy interfaces, and utilitarian photography. The challenge was to create a concept that elevates the browsing experience — making property discovery feel intentional and aspirational rather than transactional.",
    solution:
      "The concept uses an editorial layout system with asymmetric compositions, full-bleed property imagery, and a restrained color palette that lets photography lead. Mobile focuses on vertical storytelling; desktop uses a split-view for property galleries and details. Navigation is minimized to keep focus on the properties.",
    features: [
      "Full-bleed property hero with cinematic aspect ratios",
      "Editorial property cards with magazine-style layouts",
      "Split-view desktop layout (gallery + details side-by-side)",
      "Mobile-first vertical scrolling narrative",
      "Subtle parallax on property imagery",
      "Saved properties drawer (concept only)",
    ],
    gallery: [
      { type: "browser", title: "Property listing page", description: "Editorial grid with asymmetric feature card" },
      { type: "devices", title: "Property detail — desktop & mobile", description: "Split view gallery with sticky details panel" },
      { type: "panel", title: "Property card variants", description: "Featured, standard, and compact card states" },
      { type: "typography", title: "Editorial typography", description: "Display serif for headlines, sans for UI" },
    ],
    visualTheme: "editorial",
    services: ["Brand Website", "UI/UX", "Development"],
  },
  {
    id: "pulse",
    title: "PULSE",
    slug: "pulse",
    category: "E-commerce",
    description: "An e-commerce storefront concept with a lightweight admin dashboard.",
    year: 2026,
    featured: false,
    displayOrder: 3,
    mockupType: "dashboard",
    overview:
      "PULSE explores a modern fitness brand e-commerce experience. The concept covers the customer-facing storefront (product discovery, cart, checkout) and a lightweight merchant dashboard for inventory, orders, and basic analytics. The visual language is energetic — magenta accents, dynamic motion, confident typography.",
    challenge:
      "Fitness e-commerce often feels either too clinical or too aggressive. The challenge was to design a storefront that feels motivating without being loud, and a merchant dashboard that's functional without being overwhelming. Both experiences need to share a coherent brand identity.",
    solution:
      "The storefront uses product-focused compositions with ambient motion, clear hierarchy, and trust signals (reviews, guarantees). The dashboard uses the same component library — metric cards, data tables, status badges — adapted for merchant workflows. Shared design tokens ensure visual consistency across both surfaces.",
    features: [
      "Product grid with quick-add and variant selectors",
      "Slide-over cart with upsell suggestions",
      "Streamlined checkout with progress indication",
      "Merchant dashboard: orders, inventory, revenue snapshot",
      "Shared component library (cards, tables, forms)",
      "Motion language: staggered reveals, micro-interactions",
    ],
    gallery: [
      { type: "browser", title: "Storefront home", description: "Hero, featured collection, trust badges" },
      { type: "devices", title: "Product detail & cart", description: "Gallery, variants, sticky add-to-cart" },
      { type: "dashboard", title: "Merchant dashboard", description: "Orders table, revenue chart, inventory alerts" },
      { type: "panel", title: "Checkout flow", description: "Multi-step with progress, trust signals" },
      { type: "typography", title: "Brand typography & motion", description: "Display headlines, button states, loading" },
    ],
    visualTheme: "energetic",
    services: ["Web Design", "Development", "Motion"],
  },
];
