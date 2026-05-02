import { DynamicHeader } from '@/components/layout/DynamicHeader';
import { Footer } from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/server';
import { ProverbCard } from '@/components/ProverbCard';
import { getTransliteration } from '@/utils/transliterate';

export default async function ProverbsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const { q } = await searchParams;
  let proverbs: any[] = [];
  let error = null;

  try {
    const supabase = await createClient();
    let query = supabase.from('proverbs').select('*');

    if (q) {
      // Format query for prefix matching (e.g. "one" becomes "one:*", "one hand" becomes "one:* & hand:*")
      // This enables search-as-you-type without needing the full word.
      const formattedQuery = q
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(word => `${word}:*`)
        .join(' & ');

      query = query.textSearch('search_vector', formattedQuery);
    }

    const { data, error: dbError } = await query.limit(20);
    if (dbError) throw dbError;
    proverbs = data || [];
  } catch (err) {
    error = err;
    console.error("Database fetch failed:", err);
  }

  return (
    <>
      <DynamicHeader />
      <main className="max-w-[1100px] mx-auto px-6 py-8 pb-16 flex-1 w-full">
        <h1 className="font-display text-3xl text-[var(--color-earth-dark)] mb-6">
          {q ? `Search Results for "${q}"` : 'All Proverbs'}
        </h1>
        
        {error ? (
          <div className="bg-yellow-50 text-yellow-800 p-6 rounded-lg border border-yellow-200">
            <p className="font-semibold">Supabase is not yet configured.</p>
            <p className="text-sm mt-2">Please set your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables, and run the migration script.</p>
          </div>
        ) : proverbs.length === 0 ? (
          <p className="text-center py-16 text-[var(--color-ink-soft)] italic">
            No proverbs found. Try a different search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {proverbs.map((p: any) => (
              <ProverbCard 
                key={p.id} 
                proverb={{
                  id: p.id,
                  am: p.amharic_text,
                  translit: getTransliteration(p.amharic_text),
                  en: p.english_translation,
                  meaningAm: p.meaning_amharic || '',
                  meaningEn: p.meaning_english || '',
                  category: 'General', // Would be fetched from proverb_tags
                  featured: false
                }} 
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
