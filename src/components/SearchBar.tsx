'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition, FormEvent, useRef } from 'react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleSearchChange = (term: string) => {
    setQuery(term);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        if (term) {
          router.push(`/proverbs?q=${encodeURIComponent(term)}`);
        } else {
          router.push('/proverbs');
        }
      });
    }, 300);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    startTransition(() => {
      if (query) {
        router.push(`/proverbs?q=${encodeURIComponent(query)}`);
      } else {
        router.push('/proverbs');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-[400px] relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-white/20 border-t-[var(--color-gold)] rounded-full animate-spin"></div>
        </div>
      )}
      <input 
        type="search" 
        value={query}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search proverbs... ፈልግ" 
        className="w-full py-2 pl-10 pr-10 rounded-full border border-white/20 bg-white/10 text-white font-serif-en text-[0.9rem] outline-none transition-colors focus:bg-white/15 focus:border-[var(--color-gold)] placeholder:text-white/40"
      />
    </form>
  );
}
