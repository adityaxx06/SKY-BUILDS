# SKY BUILDS

Marketing/portfolio website for SKY BUILDS, a modern web development agency.
Frontend-first, built with Next.js (App Router), TypeScript, Tailwind CSS,
and Framer Motion. Supabase is introduced later, only for content that
benefits from dynamic management (see `docs/DATABASE.md`).

This project follows a strict gated, phase-by-phase development process —
see `docs/ROADMAP.md`. Do not build ahead of the current approved phase.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Docs

* `docs/PRD.md` — product requirements
* `docs/ARCHITECTURE.md` — technical architecture
* `docs/DATABASE.md` — Supabase schema plan
* `docs/ROADMAP.md` — phase-by-phase build plan
* `docs/DESIGN-SYSTEM.md` — approved color/type/motion tokens (v3)

## Status

Phase 1 — Project Foundation. No pages, components, or backend
integrations have been built yet; this is the base scaffold only.

## Environment variables

Copy `.env.example` to `.env.local` and fill in values once Supabase
is introduced in Phase 9. Not required before then.
