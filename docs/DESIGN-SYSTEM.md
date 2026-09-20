# SKY BUILDS — Design System (v5, approved)

Status: **Approved visual source of truth.** Supersedes the earlier
v3 (aurora) and v4 (Blueprint) explorations, both kept below only for
history. This supplements PRD.md §6 with the specific token values
implemented in `src/app/globals.css`.

---

## Design principle: Blueprint × Creative Energy

Blueprint (grid-lines, dashed connectors, coordinate labels,
corner-registration marks) is the **supporting** visual language, used
sparingly as a signature. The indigo/magenta/amber color system is the
**primary** visual language. Concretely:

- Grid-line texture: hero backdrop, Process, and the Footer (added in
  Phase 3 at the explicit request to give the footer subtle ambient
  texture consistent with the rest of the site — same faint effect,
  same class, not a new pattern).
- Corner-marks: one place on the homepage (the CTA block). The hero
  used to have a second (a small shard with a "SKY–01" coordinate
  label), removed in a later cleanup pass — see the Phase 4.1 note
  below. Do not add more without revisiting this doc.
- Process is the one section where the full blueprint treatment
  (grid, dashed connectors, numbered steps, phase tags) is fully
  applied — everywhere else it's a whisper.

## Color — indigo / magenta / amber triad

A split-complementary relationship (not an arbitrary multi-color
blend): indigo carries the "sky"/technical thread, magenta is the
creative-energy bridge, amber grounds it with warmth.

### Dark (default)

| Token | Value |
|---|---|
| `bg` | `#120E1F` |
| `bg-2` | `#17122A` |
| `surface` | `#1E1836` |
| `surface-elevated` | `#271F45` |
| `text` | `#F5F1EC` |
| `text-muted` | `#948BAE` |
| `border` | `rgba(245,241,236,0.08)` |
| `primary` | `#5B78FF` |
| `secondary` | `#FF5DA2` |
| `accent` | `#FFC15C` |
| `success` | `#4ADE9A` |

### Light

| Token | Value |
|---|---|
| `bg` | `#F7F1EA` (warm stone, never pure white) |
| `bg-2` | `#F0E8DE` |
| `surface` | `#FBF7F1` |
| `surface-elevated` | `#EFE6D8` |
| `text` | `#211A2E` |
| `text-muted` | `#7A6E78` |
| `border` | `rgba(33,26,46,0.10)` |
| `primary` | `#3452E0` |
| `secondary` | `#E23F87` |
| `accent` | `#F2A93B` |
| `success` | `#2E9F6E` |

Dark mode's `text` and light mode's `bg` share the same warm-off-white
tone (`#F5F1EC` / `#F7F1EA`) — the one deliberate bridge tying both
themes to the same brand.

## Typography

- Display: **Bricolage Grotesque** (variable, weights 300–700) —
  headlines only. Mixed weights within one headline (light + bold on
  different lines) are part of the identity, not a mistake.
- Body/UI: **General Sans** (via Fontshare) — everything else.
- One gradient-fill word (`primary` → `secondary`, animated shimmer)
  per major heading, max. Not full lines.
- Sentence case throughout. No all-caps labels.

## Glassmorphism — exactly where, nowhere else

Navbar, and small floating badges (project-tile hover arrow). Not on
cards, hero panels themselves, footer, buttons, or full sections. The
hero's glass *shards* are the one deliberate exception — they're the
hero's visual centerpiece, not decoration layered on top of something
else.

## Motion hierarchy

- **Subtle** (always-on): marquee idle drift, underline hovers, the
  gradient-word shimmer, glass-shard ambient presence.
- **Medium** (section-level): scroll-triggered fade-up (`Reveal`
  component), service-item hover transforms, project-tile hover scale.
- **Strong** (hero only): staggered headline reveal on load, shard
  entrance + cursor parallax, magnetic primary CTA.
- Marquee additionally reacts to scroll velocity (speeds up scrolling
  down, reverses scrolling up, eases back to idle) — a deliberate,
  isolated exception to the tier system, not applied elsewhere.
- Everything respects `prefers-reduced-motion` via the root layout's
  `<MotionConfig reducedMotion="user">` plus manual checks in the two
  places (`Hero`, `Marquee`) that use raw `requestAnimationFrame`
  instead of Framer Motion.

## Hero visual (Phase 4.1 upgrade)

The original v5 hero visual (3 glass shards) was replaced with a
richer "floating digital ecosystem": a main browser mockup, a phone
card, a dashboard card (reusing the same `DashboardMockup` built for
the PULSE project tile), two small supporting cards, ambient orbit
lines, and exactly one retained shard as a secondary accent. This
supersedes the shard description below the color tables — kept there
for history, not as the current implementation.

Two things described here have since changed further: the shard
mentioned above was removed entirely in a later cleanup pass (so
corner-marks now appears in exactly one place — the CTA block, not
two), and the cursor-parallax mechanism was removed in a separate
pass in favor of autonomous per-card motion. What's unchanged from
this section is the underlying design principle: blueprint language
stays a whisper, color/composition carries the identity.



- **Buttons**: pill-shaped, primary filled / secondary outline, icon
  nudges 3px on hover. Magnetic cursor-follow is reserved for the
  hero's primary CTA only — it wasn't part of the approved CTA-block
  buttons at the bottom of the page.
- **Services**: hoverable index list. Hover tilts+recolors the index
  number, reveals a two-color swatch unique to that service, slides
  in an arrow. Not identical cards.
- **Projects**: asymmetric grid (one large + two smaller), each tile
  a distinct abstract mockup composition (browser chrome / stacked
  devices / dashboard fragment) tied to its category — never an empty
  gradient rectangle repeated three times.
- **Process**: numbered list with a dashed vertical connector between
  steps, oversized numerals, small phase tags above each title.

## Known gaps (see Phase 2 implementation report)

No v5 mockup exists yet for an About/"Why SKY BUILDS" section — it's
in PRD's homepage structure (§9) but was never part of the
design-exploration prototypes. It needs its own mockup-and-approval
pass before being implemented, same as every other section was.

The Footer (also originally in this gap list) was built in Phase 3
without a dedicated mockup — it was implemented directly from this
document's existing tokens/components per an explicit instruction to
do so, rather than through the usual prototype-then-approve sequence.

---

## Superseded directions (history only — do not implement)

- **v3 "aurora"**: dark navy base, blue→violet→coral gradient, glow
  blobs, Fraunces. Replaced for reading as generic AI/SaaS gradient
  styling with no connection to the brand name.
- **v4 "Blueprint"**: blue+amber only, grid-lines and corner-marks
  used densely across every section, wireframe-building hero. Reduced
  for feeling like an engineering/architecture firm rather than a
  creative agency — the current v5 direction demoted this to a
  supporting role instead of removing it.
