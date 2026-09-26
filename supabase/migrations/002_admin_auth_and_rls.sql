-- Migration: Admin authentication and updated RLS policies
-- Run this in Supabase SQL Editor AFTER 001_create_contact_submissions.sql

-- ============================================================
-- 1. Admin role check function (uses app_metadata which is server-controlled)
-- ============================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin';
END;
$$;

-- ============================================================
-- 2. Drop existing overly-permissive RLS policies
-- ============================================================
DROP POLICY IF EXISTS "Admins can read contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON contact_submissions;

-- ============================================================
-- 3. Create new admin-only RLS policies
-- ============================================================

-- Policy: Admin users can READ contact submissions
CREATE POLICY "Admins can read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Policy: Admin users can UPDATE contact submissions (status changes)
CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Note: Public INSERT policy remains unchanged (allows contact form to work)
-- Policy: Public users can INSERT (submit forms) - already exists from 001