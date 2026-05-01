'use client';

import { useState, useMemo } from 'react';
import { ProverbCard } from './ProverbCard';

const CATEGORIES = ['all', 'wisdom', 'patience', 'unity', 'family', 'work', 'character'];
const PAGE_SIZE = 9;

export function ProverbGrid({ initialProverbs }: { initialProverbs: any[] }) {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);

  const filteredProverbs = useMemo(() => {
    return initialProverbs.filter(p => currentCategory === 'all' || p.category?.toLowerCase() === currentCategory);
  }, [currentCategory, initialProverbs]);

  const displayedProverbs = filteredProverbs.slice(0, displayedCount);
  const hasMore = displayedCount < filteredProverbs.length;

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap mb-10 pb-6 border-b border-[var(--color-border-eth)]">
        <span className="text-[0.8rem] text-[var(--color-ink-soft)] tracking-[0.06em] uppercase">Category:</span>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setCurrentCategory(cat);
              setDisplayedCount(PAGE_SIZE);
            }}
            className={`px-4 py-1.5 rounded-full border border-[var(--color-border-strong)] font-serif-en text-[0.82rem] cursor-pointer transition-all capitalize
              ${currentCategory === cat 
                ? 'bg-[var(--color-earth-dark)] text-[var(--color-gold-light)] border-[var(--color-earth-dark)]' 
                : 'bg-transparent text-[var(--color-ink-mid)] hover:bg-[var(--color-earth-dark)] hover:text-[var(--color-gold-light)] hover:border-[var(--color-earth-dark)]'
              }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-[0.8rem] text-[var(--color-ink-soft)]" aria-live="polite">
          {filteredProverbs.length} proverbs
        </span>
      </div>

      {/* Grid */}
      {displayedProverbs.length === 0 ? (
        <p className="text-center py-16 text-[var(--color-ink-soft)] italic col-span-full">
          No proverbs found. Try a different category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProverbs.map((p, i) => {
            const isFeatured = p.featured && i === 0 && currentCategory === 'all';
            return <ProverbCard key={p.id} proverb={p} isFeatured={isFeatured} />;
          })}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-12">
          <button 
            onClick={() => setDisplayedCount(prev => prev + PAGE_SIZE)}
            className="px-10 py-3 rounded-full border border-[var(--color-border-strong)] bg-transparent text-[var(--color-earth)] font-display text-[1rem] italic cursor-pointer transition-all hover:bg-[var(--color-earth-dark)] hover:text-[var(--color-gold-light)] hover:border-[var(--color-earth-dark)]"
          >
            Load more proverbs ↓
          </button>
        </div>
      )}
    </div>
  );
}
