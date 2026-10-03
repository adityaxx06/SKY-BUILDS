-- Migration: Add uploaded-images column to projects
-- Run this in Supabase SQL Editor AFTER 004_extend_projects_public_content.sql
--
-- ADDITIVE ONLY: one nullable JSONB column with a safe default.
-- Existing rows and CRUD are unaffected.
--
-- images: [{ "url": "https://.../project-images/...", "alt": "..." }]
-- Real uploaded photos managed from Admin → Selected Work. Shown on
-- public pages ahead of generated mockup compositions. The legacy
-- `gallery` (mockup compositions) and `hero_image` columns are kept;
-- on save the admin API sets hero_image to the first image for
-- back-compatibility.
--
-- Storage design (no SQL policies required):
--   Bucket `project-images` is PUBLIC (reads open).
--   No storage.objects policies exist, so anon/authenticated keys
--   cannot write; uploads/deletes go exclusively through admin API
--   routes using the server-side service-role key behind requireAdmin.

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]'::jsonb;
