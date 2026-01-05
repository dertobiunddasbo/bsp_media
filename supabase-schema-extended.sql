-- Extended Schema for Full Page Management System
-- Run this AFTER the base schema (supabase-schema.sql)

-- Pages Table - Stores metadata for all pages
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL, -- e.g., 'home', 'kmu', 'startups', 'kontakt'
  title TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Page Sections Table - Stores content for sections within pages
CREATE TABLE IF NOT EXISTS page_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL, -- e.g., 'hero', 'leistungen', 'about', etc.
  content JSONB NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(page_id, section_key)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_page_sections_page_id ON page_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_page_sections_page_section ON page_sections(page_id, section_key);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);

-- Add trigger for updated_at on pages
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_sections_updated_at BEFORE UPDATE ON page_sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - we'll use service role key for admin)
CREATE POLICY "Allow all operations for authenticated users" ON pages
    FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON page_sections
    FOR ALL USING (true);

-- Initialize pages with existing pages
INSERT INTO pages (slug, title, description, is_active) VALUES
  ('home', 'Startseite', 'Hauptseite der Website', true),
  ('kmu', 'KMU', 'Seite für kleine und mittlere Unternehmen', true),
  ('startups', 'Startups', 'Seite für Startups', true),
  ('non-profit', 'Non-Profit', 'Seite für Non-Profit Organisationen', true),
  ('oeffentlicher-sektor', 'Öffentlicher Sektor', 'Seite für öffentlichen Sektor', true),
  ('agentur-partner', 'Agentur & Partner', 'Seite für Agenturen und Partner', true),
  ('kontakt', 'Kontakt', 'Kontaktseite', true),
  ('portfolio', 'Portfolio', 'Portfolio-Übersichtsseite', true),
  ('impressum', 'Impressum', 'Impressum', true),
  ('datenschutz', 'Datenschutz', 'Datenschutzerklärung', true),
  ('agb', 'AGB', 'Allgemeine Geschäftsbedingungen', true)
ON CONFLICT (slug) DO NOTHING;

