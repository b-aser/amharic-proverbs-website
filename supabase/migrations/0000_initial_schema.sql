-- Migration: 0000_initial_schema.sql
-- Description: Supabase schema for Amharic Proverbs platform

-- 1. Create tables

CREATE TABLE public.proverbs (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  amharic_text text not null,
  english_translation text not null,
  meaning_amharic text,
  meaning_english text,
  created_by uuid references auth.users(id),
  approved_by uuid references auth.users(id),
  created_at timestamp with time zone default now()
);

CREATE TABLE public.submissions (
  id uuid primary key default gen_random_uuid(),
  amharic_text text,
  english_translation text,
  meaning_amharic text,
  meaning_english text,
  suggested_tags text[],
  suggested_category text,
  status text default 'pending',
  submitted_by uuid references auth.users(id),
  admin_feedback text,
  created_at timestamp with time zone default now()
);

CREATE TABLE public.tags (
  id uuid primary key default gen_random_uuid(),
  name text unique
);

CREATE TABLE public.proverb_tags (
  proverb_id uuid references public.proverbs(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (proverb_id, tag_id)
);

CREATE TABLE public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text default 'user',
  display_name text
);

CREATE TABLE public.settings (
  key text primary key,
  value jsonb
);

-- 2. Add Search Vector and GIN Index

ALTER TABLE public.proverbs ADD COLUMN search_vector tsvector;

-- Function to update search_vector
CREATE OR REPLACE FUNCTION public.proverbs_search_vector_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('simple',
    coalesce(NEW.amharic_text, '') || ' ' ||
    coalesce(NEW.english_translation, '') || ' ' ||
    coalesce(NEW.meaning_amharic, '') || ' ' ||
    coalesce(NEW.meaning_english, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to keep search_vector updated
CREATE TRIGGER proverbs_search_vector_update
BEFORE INSERT OR UPDATE ON public.proverbs
FOR EACH ROW EXECUTE FUNCTION public.proverbs_search_vector_trigger();

-- Create GIN index for fast Full-Text Search
CREATE INDEX search_idx ON public.proverbs USING gin(search_vector);

-- 3. Row Level Security (RLS)

ALTER TABLE public.proverbs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proverb_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Proverbs: Public read, Admin write
CREATE POLICY "Proverbs are viewable by everyone" ON public.proverbs FOR SELECT USING (true);
CREATE POLICY "Proverbs are insertable by admins" ON public.proverbs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Proverbs are updatable by admins" ON public.proverbs FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Submissions: Public insert (if allowed by settings? we can just allow insert, and UI hides it), Public read own, Admin read all
CREATE POLICY "Submissions insertable by everyone" ON public.submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Submissions viewable by admins or creator" ON public.submissions FOR SELECT USING (
  auth.uid() = submitted_by OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Submissions updatable by admins" ON public.submissions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Tags: Public read, Admin write
CREATE POLICY "Tags are viewable by everyone" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Tags are insertable by admins" ON public.tags FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Proverb_Tags: Public read, Admin write
CREATE POLICY "Proverb tags are viewable by everyone" ON public.proverb_tags FOR SELECT USING (true);
CREATE POLICY "Proverb tags are insertable by admins" ON public.proverb_tags FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Profiles: Public read, User update own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Settings: Public read, Admin write
CREATE POLICY "Settings are viewable by everyone" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Settings updatable by admins" ON public.settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Seed initial settings
INSERT INTO public.settings (key, value) VALUES
('allow_submissions', 'true'::jsonb),
('site_name', '"Amharic Proverbs Archive"'::jsonb),
('seo_description', '"Discover Ethiopian wisdom"'::jsonb);
