import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-earth-dark)] text-white px-8 py-0 border-b-[3px] border-[var(--color-gold)]">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between h-16 gap-4">
        <Link href="/" className="flex flex-col text-[var(--color-gold-light)] font-semibold leading-tight decoration-transparent hover:opacity-90 transition-opacity">
          <span className="font-serif-am text-[1.1rem] tracking-[0.01em]">ምሳሌያዊ አነጋገሮች</span>
          <span className="font-serif-en text-[0.7rem] text-white/50 uppercase tracking-[0.08em] font-light">Amharic Proverbs Archive</span>
        </Link>
        <div className="flex-1 max-w-[400px] relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            type="search" 
            placeholder="Search proverbs... ፈልግ" 
            className="w-full py-2 pl-10 pr-4 rounded-full border border-white/20 bg-white/10 text-white font-serif-en text-[0.9rem] outline-none transition-colors focus:bg-white/15 focus:border-[var(--color-gold)] placeholder:text-white/40"
          />
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="#proverbs" className="text-white/65 hover:text-[var(--color-gold-light)] text-[0.85rem] tracking-[0.04em] transition-colors">Proverbs</Link>
          <Link href="#about" className="text-white/65 hover:text-[var(--color-gold-light)] text-[0.85rem] tracking-[0.04em] transition-colors">About</Link>
          <Link href="#submit" className="text-white/65 hover:text-[var(--color-gold-light)] text-[0.85rem] tracking-[0.04em] transition-colors">Submit</Link>
        </nav>
      </div>
    </header>
  );
}
