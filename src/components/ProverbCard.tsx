'use client';

import { useState } from 'react';
import { Proverb } from '@/data/proverbs';

interface Props {
  proverb: Proverb;
  isFeatured?: boolean;
}

export function ProverbCard({ proverb: p, isFeatured = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = encodeURIComponent(`https://amharicproverbs.com/proverb/${p.id}`);
  const text = encodeURIComponent(`"${p.en}" — Amharic Proverb: ${p.am}`);
  const whatsapp = `https://wa.me/?text=${text}%20${url}`;
  const twitter = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=AmharicProverbs,Ethiopia`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

  const copyProverb = () => {
    const copyText = `${p.am}\n"${p.en}"\n— Amharic Proverb | amharicproverbs.com`;
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isFeatured) {
    return (
      <article className="col-span-full bg-[var(--color-earth-dark)] text-white rounded-xl p-6 md:p-10 relative overflow-hidden border-none shadow-[0_4px_30px_rgba(60,20,0,0.2)] flex flex-col h-full" role="listitem" lang="am">
        <div className="absolute -top-2 left-6 font-display text-[8rem] text-[rgba(201,149,42,0.12)] pointer-events-none leading-none">❝</div>
        <div className="text-[0.7rem] tracking-[0.12em] uppercase text-[var(--color-gold)] mb-4">✦ Featured Proverb of the Day</div>
        <div className="flex-1">
          <div className="inline-block text-[0.7rem] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded-full bg-[rgba(201,149,42,0.15)] text-[var(--color-gold)] mb-3">
            {p.category}
          </div>
          <h2 className="font-serif-am text-[1.6rem] font-semibold text-[var(--color-gold-light)] leading-relaxed mb-2" lang="am">{p.am}</h2>
          <p className="font-serif-en text-[0.78rem] text-white/35 italic mb-3 tracking-[0.02em]" lang="la">{p.translit}</p>
          <blockquote className="font-display text-[1.1rem] italic text-white/70 mb-5 leading-relaxed pl-3 border-l-2 border-[rgba(201,149,42,0.4)]" lang="en">"{p.en}"</blockquote>
          
          <div className="mt-1">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 bg-none border-none p-0 cursor-pointer font-serif-en text-[0.78rem] text-[var(--color-gold)] tracking-[0.04em] font-semibold uppercase hover:opacity-80 transition-opacity"
              aria-expanded={isOpen}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
              Meaning / ትርጉም
            </button>
            <div className={`mt-3 space-y-3 ${isOpen ? 'block' : 'hidden'}`} aria-hidden={!isOpen}>
              <div>
                <div className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase mb-1.5 flex items-center gap-1.5 text-[var(--color-gold)]">
                  <span className="text-base">🇪🇹</span> ትርጉም — Amharic
                </div>
                <p className="text-[0.82rem] leading-[1.65] bg-white/5 text-white/75 rounded-md px-3 py-2 font-serif-am" lang="am">{p.meaningAm}</p>
              </div>
              <div>
                <div className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase mb-1.5 flex items-center gap-1.5 text-[#7EC8A0]">
                  <span className="text-base">🇬🇧</span> Meaning — English
                </div>
                <p className="text-[0.88rem] leading-[1.65] bg-white/5 text-white/75 rounded-md px-3 py-2" lang="en">{p.meaningEn}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2 bg-white/5 -mx-6 md:-mx-10 -mb-6 md:-mb-10 px-6 md:px-10 pb-6 md:pb-10">
           <div className="flex items-center gap-4">
             <span className="hidden sm:inline text-[0.72rem] text-white/50 tracking-[0.04em] uppercase">Share</span>
             <div className="flex gap-1.5">
                <a href={twitter} target="_blank" rel="noopener" className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:bg-[var(--color-gold)] hover:text-[var(--color-earth-dark)] hover:border-[var(--color-gold)] transition-all">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.733-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href={facebook} target="_blank" rel="noopener" className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:bg-[var(--color-gold)] hover:text-[var(--color-earth-dark)] hover:border-[var(--color-gold)] transition-all">
                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
             </div>
           </div>
           <button onClick={copyProverb} className={`text-[0.72rem] px-3 py-1.5 rounded-full border border-white/20 bg-transparent text-white/60 font-serif-en transition-all ${copied ? 'bg-[var(--color-green-light-eth)] text-[var(--color-green-eth)] border-[var(--color-green-eth)]' : 'hover:bg-[var(--color-gold-pale)] hover:text-[var(--color-earth)] hover:border-[var(--color-gold)]'}`}>
             {copied ? 'Copied!' : 'Copy'}
           </button>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white border border-[var(--color-border-eth)] rounded-xl overflow-hidden shadow-[var(--shadow-card)] flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_32px_rgba(60,30,0,0.12)] h-full" role="listitem" lang="am">
      <div className="h-1 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-earth)]"></div>
      <div className="p-6 flex-1">
        <div className="inline-block text-[0.7rem] font-semibold tracking-[0.06em] uppercase px-2.5 py-1 rounded-full bg-[var(--color-green-light-eth)] text-[var(--color-green-eth)] mb-3">
          {p.category}
        </div>
        <h2 className="font-serif-am text-[1.15rem] font-semibold text-[var(--color-earth-dark)] leading-relaxed mb-2" lang="am">{p.am}</h2>
        <p className="font-serif-en text-[0.78rem] text-[var(--color-ink-soft)] italic mb-3 tracking-[0.02em]" lang="la">{p.translit}</p>
        <blockquote className="font-display text-[1rem] italic text-[var(--color-ink-mid)] mb-5 leading-relaxed pl-3 border-l-2 border-[var(--color-gold-light)]" lang="en">"{p.en}"</blockquote>
        
        <div className="mt-1">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 bg-none border-none p-0 cursor-pointer font-serif-en text-[0.78rem] text-[var(--color-green-eth)] tracking-[0.04em] font-semibold uppercase hover:text-[var(--color-earth)] transition-colors"
            aria-expanded={isOpen}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
            Meaning / ትርጉም
          </button>
          <div className={`mt-3 space-y-3 ${isOpen ? 'block' : 'hidden'}`} aria-hidden={!isOpen}>
            <div>
              <div className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase mb-1.5 flex items-center gap-1.5 text-[var(--color-earth)]">
                <span className="text-base">🇪🇹</span> ትርጉም — Amharic
              </div>
              <p className="text-[0.82rem] leading-[1.65] bg-[var(--color-parchment)] text-[var(--color-ink-mid)] rounded-md px-3 py-2 font-serif-am" lang="am">{p.meaningAm}</p>
            </div>
            <div>
              <div className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase mb-1.5 flex items-center gap-1.5 text-[var(--color-green-eth)]">
                <span className="text-base">🇬🇧</span> Meaning — English
              </div>
              <p className="text-[0.88rem] leading-[1.65] bg-[var(--color-parchment)] text-[var(--color-ink-mid)] rounded-md px-3 py-2" lang="en">{p.meaningEn}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-3 px-6 border-t border-[var(--color-border-eth)] flex items-center justify-between gap-2 bg-[var(--color-parchment)] mt-auto">
        <span className="hidden sm:inline text-[0.72rem] text-[var(--color-ink-soft)] tracking-[0.04em] uppercase">Share</span>
        <div className="flex gap-1.5">
          <a href={twitter} target="_blank" rel="noopener" className="w-8 h-8 rounded-full border border-[var(--color-border-strong)] bg-white flex items-center justify-center text-[var(--color-ink-mid)] hover:bg-[var(--color-earth-dark)] hover:text-white hover:border-[var(--color-earth-dark)] transition-all">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.733-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href={facebook} target="_blank" rel="noopener" className="w-8 h-8 rounded-full border border-[var(--color-border-strong)] bg-white flex items-center justify-center text-[var(--color-ink-mid)] hover:bg-[var(--color-earth-dark)] hover:text-white hover:border-[var(--color-earth-dark)] transition-all">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href={whatsapp} target="_blank" rel="noopener" className="w-8 h-8 rounded-full border border-[var(--color-border-strong)] bg-white flex items-center justify-center text-[var(--color-ink-mid)] hover:bg-[var(--color-earth-dark)] hover:text-white hover:border-[var(--color-earth-dark)] transition-all">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
        <button onClick={copyProverb} className={`text-[0.72rem] px-3 py-1 rounded-full border border-[var(--color-border-strong)] bg-white font-serif-en transition-all ${copied ? 'bg-[var(--color-green-light-eth)] text-[var(--color-green-eth)] border-[var(--color-green-eth)]' : 'text-[var(--color-ink-mid)] hover:bg-[var(--color-gold-pale)] hover:text-[var(--color-earth)] hover:border-[var(--color-gold)]'}`}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </article>
  );
}
