-- Migration: Extend projects with public-experience content fields
-- Run this in Supabase SQL Editor AFTER 003_create_projects_services_testimonials.sql
--
-- ADDITIVE ONLY: no columns renamed, removed, or retyped. Existing rows
-- (including any admin-created work) are untouched; new columns are
-- nullable with safe defaults so existing CRUD keeps working.

-- ============================================================
-- 1. Overview (long-form case-study intro; falls back to
--    description/short_description when null)
-- ============================================================

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS overview TEXT;

-- ============================================================
-- 2. Features (bullet list shown on the detail page)
-- ============================================================

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS features JSONB NOT NULL DEFAULT '[]'::jsonb;

-- ============================================================
-- 3. Gallery (visual showcase composition)
--    [{ "type": "browser|devices|dashboard|panel|typography",
--       "title": "...", "description": "..." }]
--    Empty array = public site renders a default composition derived
--    from the project's mockup_type (see get-projects.ts).
-- ============================================================

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS gallery JSONB NOT NULL DEFAULT '[]'::jsonb;

-- ============================================================
-- 4. Mockup type (which visual composition the cards/detail use)
-- ============================================================

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS mockup_type TEXT NOT NULL DEFAULT 'browser'
  CHECK (mockup_type IN ('browser', 'devices', 'dashboard'));

-- ============================================================
-- 5. Visual theme (color story for the visual composition)
-- ============================================================

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS visual_theme TEXT NOT NULL DEFAULT 'analytical'
  CHECK (visual_theme IN ('analytical', 'editorial', 'energetic'));

-- ============================================================
-- 6. updated_at trigger (same pattern as the other content tables)
-- ============================================================

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
