-- Migration: Create projects, services, testimonials tables
-- Run this in Supabase SQL Editor AFTER 002_admin_auth_and_rls.sql

-- ============================================================
-- 1. PROJECTS TABLE
-- ============================================================

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  year INTEGER,
  services TEXT[],
  technologies TEXT[],
  hero_image TEXT,
  challenge TEXT,
  solution TEXT,
  result_summary TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_slug ON projects (slug);
CREATE INDEX idx_projects_featured ON projects (featured) WHERE featured = true;
CREATE INDEX idx_projects_display_order ON projects (display_order);
CREATE INDEX idx_projects_created_at ON projects (created_at DESC);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public: READ published (featured) projects
CREATE POLICY "Public can read featured projects"
  ON projects
  FOR SELECT
  TO anon
  USING (featured = true);

-- Admin: CRUD on all projects
CREATE POLICY "Admins can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- 2. SERVICES TABLE
-- ============================================================

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  description TEXT,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_services_slug ON services (slug);
CREATE INDEX idx_services_active ON services (active) WHERE active = true;
CREATE INDEX idx_services_display_order ON services (display_order);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public: READ active services
CREATE POLICY "Public can read active services"
  ON services
  FOR SELECT
  TO anon
  USING (active = true);

-- Admin: CRUD on all services
CREATE POLICY "Admins can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- 3. TESTIMONIALS TABLE
-- ============================================================

CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  avatar_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_testimonials_featured ON testimonials (featured) WHERE featured = true;
CREATE INDEX idx_testimonials_display_order ON testimonials (display_order);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public: READ featured testimonials
CREATE POLICY "Public can read featured testimonials"
  ON testimonials
  FOR SELECT
  TO anon
  USING (featured = true);

-- Admin: CRUD on all testimonials
CREATE POLICY "Admins can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- 4. UPDATED_AT TRIGGER (reuses existing function from 002)
-- ============================================================

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();