import Link from 'next/link';
import { Suspense } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { createClient } from '@/lib/supabase/server';

async function HeaderContent() {
  let amharicName = 'ምሳሌያዊ አነጋገሮች';
  let englishName = 'Amharic Proverbs Archive';
  let logoUrl = '';

  try {
    const supabase = await createClient();
    const { data: settingsData } = await supabase
      .from('settings')
      .select('key, value')
      .in('key', ['websiteNameAmharic', 'websiteName', 'logoUrl']);

    if (settingsData) {
      settingsData.forEach((setting: any) => {
        if (setting.key === 'websiteNameAmharic') amharicName = setting.value || amharicName;
        if (setting.key === 'websiteName') englishName = setting.value || englishName;
        if (setting.key === 'logoUrl') logoUrl = setting.value || '';
      });
    }
  } catch (error) {
    console.error('Failed to load header settings:', error);
  }

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-earth-dark)] text-white px-8 py-0 border-b-[3px] border-[var(--color-gold)]">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between h-16 gap-4">
        <Link 
          href="/" 
          className="flex items-center gap-3 text-[var(--color-gold-light)] font-semibold leading-tight decoration-transparent hover:opacity-90 transition-opacity flex-shrink-0"
        >
          {logoUrl && (
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div className="flex flex-col">
            <span className="font-serif-am text-[1.1rem] tracking-[0.01em]">{amharicName}</span>
            <span className="font-serif-en text-[0.7rem] text-white/50 uppercase tracking-[0.08em] font-light">{englishName}</span>
          </div>
        </Link>
        <Suspense fallback={<div className="flex-1 max-w-[400px]" />}>
          <SearchBar />
        </Suspense>
        <nav className="hidden md:flex gap-6">
          <Link href="/proverbs" className="text-white/65 hover:text-[var(--color-gold-light)] text-[0.85rem] tracking-[0.04em] transition-colors">Proverbs</Link>
          <Link href="/#about" className="text-white/65 hover:text-[var(--color-gold-light)] text-[0.85rem] tracking-[0.04em] transition-colors">About</Link>
          {/* <Link href="/submit" className="text-white/65 hover:text-[var(--color-gold-light)] text-[0.85rem] tracking-[0.04em] transition-colors">Submit</Link> */}
        </nav>
      </div>
    </header>
  );
}

export function DynamicHeader() {
  return (
    <Suspense fallback={<StaticHeader />}>
      <HeaderContent />
    </Suspense>
  );
}

// Fallback static header
export function StaticHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-earth-dark)] text-white px-8 py-0 border-b-[3px] border-[var(--color-gold)]">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between h-16 gap-4">
        <Link href="/" className="flex flex-col text-[var(--color-gold-light)] font-semibold leading-tight decoration-transparent hover:opacity-90 transition-opacity">
          <span className="font-serif-am text-[1.1rem] tracking-[0.01em]">ምሳሌያዊ አነጋገሮች</span>
          <span className="font-serif-en text-[0.7rem] text-white/50 uppercase tracking-[0.08em] font-light">Amharic Proverbs Archive</span>
        </Link>
        <Suspense fallback={<div className="flex-1 max-w-[400px]" />}>
          <SearchBar />
        </Suspense>
        <nav className="hidden md:flex gap-6">
          <Link href="/proverbs" className="text-white/65 hover:text-[var(--color-gold-light)] text-[0.85rem] tracking-[0.04em] transition-colors">Proverbs</Link>
          <Link href="/#about" className="text-white/65 hover:text-[var(--color-gold-light)] text-[0.85rem] tracking-[0.04em] transition-colors">About</Link>
        </nav>
      </div>
    </header>
  );
}
