-- Migration: Create contact_submissions table
-- Run this in Supabase SQL Editor

-- Create the contact_submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  company TEXT,
  reference_url TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'in_progress', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions (created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions (status);
CREATE INDEX idx_contact_submissions_email ON contact_submissions (email);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Public users can INSERT (submit forms)
CREATE POLICY "Public can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated admins can READ all submissions
CREATE POLICY "Admins can read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated admins can UPDATE status
CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on UPDATE
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();