import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[var(--color-earth-dark)] text-white/50 text-center py-8 text-[0.82rem] leading-[1.8] border-t-[3px] border-[var(--color-gold)] mt-auto">
      <p><strong className="text-white/75 font-serif-am text-[0.88rem]">ምሳሌያዊ አነጋገሮች — Amharic Proverbs Archive</strong></p>
      <p>Preserving Ethiopian oral wisdom · Accessible to humans and AI alike</p>
      <div className="mt-2 space-x-3">
        <Link href="/sitemap.xml" className="text-[var(--color-gold-light)] hover:underline">Sitemap</Link>
        <span>·</span>
        <Link href="/api/proverbs.json" className="text-[var(--color-gold-light)] hover:underline">JSON API</Link>
        <span>·</span>
        <Link href="#submit" className="text-[var(--color-gold-light)] hover:underline">Submit a Proverb</Link>
        <span>·</span>
        <Link href="#about" className="text-[var(--color-gold-light)] hover:underline">About</Link>
        <span>·</span>
        <Link href="/login" className="text-white/30 hover:text-[var(--color-gold-light)] transition-colors">Admin Login</Link>
      </div>
      <p className="mt-4 text-[0.75rem] opacity-50">
        &copy; {new Date().getFullYear()} Amharic Proverbs Archive · Kakros Systems LLC · All rights reserved
      </p>
    </footer>
  );
}
