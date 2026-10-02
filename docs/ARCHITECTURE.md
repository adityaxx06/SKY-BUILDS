# SKY BUILDS — Technical Architecture

**Version:** 1.0
**Status:** Approved Foundation

---

# 1. Architecture Philosophy

SKY BUILDS is a frontend-first agency website.

The architecture must prioritize:

1. UI/UX quality
2. Maintainability
3. Performance
4. Simplicity
5. Content flexibility
6. Progressive backend integration

The project must not be over-engineered.

> Use the simplest architecture capable of supporting the product requirements.

---

# 2. High-Level Architecture

```text
                    ┌──────────────────┐
                    │      Visitor     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Next.js App   │
                    │                  │
                    │ React Components │
                    │ Tailwind CSS     │
                    │ Framer Motion   │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
      Static / Local Content          Supabase
                                      PostgreSQL
                                           │
                                           ▼
                                  Contact / Admin Data
```

---

# 3. Frontend Stack

## Framework

**Next.js**

Use the modern App Router architecture.

## Language

**TypeScript**

Strict typing should be preferred.

## UI

**React**

## Styling

**Tailwind CSS**

## Animation

**Framer Motion**

Framer Motion is the default animation solution.

GSAP should only be introduced when a specific interaction genuinely requires it.

---

# 4. Backend Architecture

Supabase is the backend service.

Supabase may provide:

* PostgreSQL database
* Authentication
* Storage
* Server-side data access where necessary

The project does not require a separate backend server initially.

---

# 5. Database Strategy

The initial public site may use static/data-module content for demo content.

Supabase should be introduced for content that actually benefits from dynamic management.

Potential dynamic entities:

```text
projects
services
testimonials
team_members
contact_submissions
```

The initial implementation should not create unnecessary database dependencies for purely static content.

---

# 6. Authentication

Supabase Auth will be used only for protected admin functionality.

Public visitors must not require authentication.

Admin routes must be protected.

---

# 7. Folder Architecture

Recommended structure:

```text
sky-builds/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── services/
│   │   │   └── page.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── process/
│   │   │   └── page.tsx
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   │
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   │
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── projects/
│   │       ├── services/
│   │       ├── testimonials/
│   │       └── messages/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── sections/
│   │   ├── projects/
│   │   ├── services/
│   │   └── forms/
│   │
│   ├── features/
│   │   ├── projects/
│   │   ├── contact/
│   │   └── admin/
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   ├── utils/
│   │   └── constants/
│   │
│   ├── hooks/
│   │
│   ├── types/
│   │
│   └── validations/
│
├── public/
│   ├── images/
│   ├── projects/
│   └── icons/
│
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   └── ROADMAP.md
│
├── .env.example
├── README.md
├── package.json
└── ...
```

---

# 8. Component Architecture

Components should be divided by responsibility.

## UI Components

Reusable primitives:

```text
Button
Container
SectionHeading
Badge
Card
Input
Textarea
Select
Modal
```

## Layout Components

```text
Navbar
Footer
PageTransition
```

## Section Components

Examples:

```text
Hero
SelectedWork
ServicesPreview
WhySkyBuilds
AboutPreview
ProcessPreview
Testimonials
FinalCTA
```

## Feature Components

Feature-specific logic should remain close to its feature.

Example:

```text
features/projects/
├── ProjectCard.tsx
├── ProjectGrid.tsx
├── ProjectGallery.tsx
└── project-data.ts
```

---

# 9. Data Flow

For static content:

```text
Content Data
    ↓
Feature Component
    ↓
Reusable UI Components
    ↓
Page
```

For dynamic content:

```text
Supabase
    ↓
Server-side data access
    ↓
Typed data
    ↓
Feature component
    ↓
UI
```

Avoid unnecessarily fetching data client-side.

---

# 10. Server vs Client Components

Default to Server Components.

Use Client Components only when required for:

* Interaction
* Animation requiring client state
* Browser APIs
* Forms requiring client state
* Interactive navigation
* Client-side UI state

Do not add `"use client"` globally.

---

# 11. Animation Architecture

Animations should be isolated into reusable patterns where practical.

Examples:

```text
FadeIn
Reveal
Stagger
TextReveal
ImageReveal
MagneticButton
PageTransition
```

Do not duplicate complicated animation logic across many components.

---

# 12. Image Strategy

Project images should be optimized.

Use Next.js image optimization where appropriate.

Images should support:

* Responsive sizes
* Lazy loading
* Meaningful alt text
* Proper aspect ratios

Avoid huge unoptimized image files.

---

# 13. Responsive Architecture

Use responsive design from the beginning.

Breakpoints should be driven by content rather than arbitrary device models.

Every major component must be tested at:

* Mobile
* Tablet
* Desktop
* Large desktop

---

# 14. Content Architecture

Initial demo data may live in typed local modules.

Example:

```text
src/features/projects/project-data.ts
src/features/services/service-data.ts
```

Later, data can move to Supabase.

Components must not be tightly coupled to specific demo project names.

---

# 15. Admin Architecture

The admin system is isolated from the public website.

```text
Public Site
    │
    └── /admin
          │
          ├── Authentication
          ├── Dashboard
          ├── Projects
          ├── Services
          ├── Testimonials
          └── Messages
```

Admin components should not affect public-page rendering unless required.

Layout isolation (route groups are URL-invisible):

```text
src/app/layout.tsx                  → minimal root shell
src/app/(public)/layout.tsx         → Navbar + Footer (public only)
src/app/admin/layout.tsx            → pass-through (no shell)
src/app/admin/login/                → standalone auth screen
src/app/admin/(dashboard)/layout.tsx → AdminSidebar + AdminHeader shell
```

Authorization is enforced in three independent layers (no layer trusts another):

* `src/proxy.ts` — request-level route protection and redirects.
* `requireAdmin()` at the top of every privileged Server Action.
* `getCurrentUser()` 401/403 checks at the top of every admin API handler.

Role source is always `user.app_metadata.role === "admin"`. A segment
`error.tsx` inside `(dashboard)` renders a safe retry UI for admin
render failures.

---

# 16. Security Principles

* Never expose service-role Supabase keys to the browser.
* Use environment variables for secrets.
* Protect admin routes.
* Validate all submitted form data.
* Use Supabase Row Level Security where applicable.
* Never trust client-side validation alone.
* Do not expose private contact submissions publicly.

---

# 16b. Server Actions

Contact form submissions use Next.js Server Actions (`"use server"`) for secure server-side processing:

* Form data validated client-side (immediate feedback) and server-side (security)
* Server action uses service-role key for privileged database insert
* Service-role key never exposed to browser
* RLS policies enforce: public INSERT only, admin READ/UPDATE

---

# 17. Environment Variables

Expected configuration may include:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

* `NEXT_PUBLIC_SUPABASE_URL` — Public Supabase project URL (client + server)
* `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Public anon key (client + server)
* `SUPABASE_SERVICE_ROLE_KEY` — Server-only service role key (Server Actions only, never client)

Additional server-only secrets should be added only if required.

A `.env.example` file must document required variables without containing real secrets.

---

# 18. Dependency Policy

Before adding a dependency, ask:

1. Is it necessary?
2. Can the existing stack solve the problem?
3. Does it materially improve the product?
4. Does it increase maintenance complexity?

Avoid dependency bloat.

---

# 19. Architecture Rules for Claude

Claude must:

* Read `PRD.md`
* Read `ARCHITECTURE.md`
* Follow `ROADMAP.md`
* Respect the current phase
* Modify only permitted files
* Avoid unrelated refactoring
* Avoid replacing approved UI without authorization
* Avoid introducing new architecture without approval
* Run the required validation commands
* Report exactly what changed

Claude must not jump ahead to future phases.

---

# 20. Architectural Principle

The public frontend is the primary product.

Backend functionality must support the frontend—not dictate it.

If a backend feature competes with frontend quality for development time:

> Prioritize frontend quality.
