export function Hero({ totalCount }: { totalCount: number }) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-earth-dark)] text-white text-center py-20 px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,149,42,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative z-10 max-w-[1100px] mx-auto">
        <h1 className="font-serif-am text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[var(--color-gold-light)] mb-2 leading-tight">
          የአማርኛ ምሳሌያዊ አነጋገሮች
        </h1>
        <p className="font-display text-[clamp(1rem,2.5vw,1.5rem)] italic text-white/60 mb-8">
          Amharic Proverbs — The Living Wisdom of Ethiopia
        </p>
        <p className="text-[0.95rem] text-white/50 max-w-[540px] mx-auto leading-[1.7] font-light mb-10">
          Ethiopia's oral heritage encoded in proverbs — each one a window into culture, philosophy, and the Amharic way of seeing the world. With Amharic text, English translation, and full cultural meaning.
        </p>
        <div className="flex justify-center gap-12">
          <div className="text-center">
            <span className="font-display text-[2rem] text-[var(--color-gold)] block">{totalCount}</span>
            <span className="text-[0.75rem] text-white/40 tracking-[0.08em] uppercase mt-1 block">Proverbs</span>
          </div>
          <div className="text-center">
            <span className="font-display text-[2rem] text-[var(--color-gold)] block">12</span>
            <span className="text-[0.75rem] text-white/40 tracking-[0.08em] uppercase mt-1 block">Categories</span>
          </div>
          <div className="text-center">
            <span className="font-display text-[2rem] text-[var(--color-gold)] block">2</span>
            <span className="text-[0.75rem] text-white/40 tracking-[0.08em] uppercase mt-1 block">Languages</span>
          </div>
        </div>
      </div>
    </section>
  );
}
