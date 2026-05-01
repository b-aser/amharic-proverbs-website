import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/layout/Hero';
import { Footer } from '@/components/layout/Footer';
import { ProverbGrid } from '@/components/ProverbGrid';
import { createClient } from '@/lib/supabase/server';
import { getTransliteration } from '@/utils/transliterate';
import Script from 'next/script';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let dbProverbs: any[] = [];
  
  try {
    const supabase = await createClient();
    
    // Fetch proverbs from database
    const { data } = await supabase
      .from('proverbs')
      .select('*, proverb_tags(tags(name))')
      .order('created_at', { ascending: false });
      
    if (data) {
      dbProverbs = data;
    }
  } catch (error) {
    console.error('Failed to fetch proverbs:', error);
  }

  const mappedProverbs = dbProverbs.map((p, i) => {
    const tags = p.proverb_tags?.map((pt: any) => pt.tags?.name).filter(Boolean) || [];
    const category = tags.length > 0 ? tags[0] : 'wisdom';

    return {
      id: p.id,
      am: p.amharic_text,
      en: p.english_translation,
      meaningAm: p.meaning_amharic || '',
      meaningEn: p.meaning_english || '',
      translit: getTransliteration(p.amharic_text),
      category: category,
      featured: p.featured || (i === 0)
    };
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Amharic Proverbs Archive",
    "url": "https://amharicproverbs.com",
    "description": "A comprehensive collection of Amharic proverbs (የአማርኛ ምሳሌያዊ አነጋገሮች) with English translations and cultural meanings from Ethiopia.",
    "inLanguage": ["am", "en"],
  };

  const collectionData = {
    "@context": "https://schema.org",
    "@type": "Collection",
    "name": "Amharic Proverbs Collection",
    "description": "Curated Amharic proverbs representing Ethiopian cultural wisdom, each with Amharic text, English translation, and cultural meaning.",
    "url": "https://amharicproverbs.com",
    "inLanguage": "am",
    "genre": "Proverb",
    "hasPart": mappedProverbs.slice(0, 3).map(p => ({
      "@type": "CreativeWork",
      "name": p.am,
      "text": p.am,
      "description": p.en,
      "inLanguage": "am",
      "genre": "Proverb",
      "about": p.category
    }))
  };

  return (
    <>
      <Script id="website-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Script id="collection-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionData) }} />

      <Header />
      <main>
        <Hero totalCount={mappedProverbs.length} />
        <div className="text-center text-[var(--color-gold)] text-[1.5rem] tracking-[0.5rem] pt-6 pb-2 opacity-60" aria-hidden="true">✦ ✦ ✦</div>
        
        <section id="proverbs" className="max-w-[1100px] mx-auto px-6 py-8 pb-16">
          <ProverbGrid initialProverbs={mappedProverbs} />
        </section>

        <section id="about" className="max-w-[1100px] mx-auto px-6 pb-16">
          <div className="bg-[var(--color-parchment-mid)] rounded-xl p-8 md:p-12 border border-[var(--color-border-eth)] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="font-display text-[1.6rem] text-[var(--color-earth-dark)] mb-4">About Amharic Proverbs</h2>
              <p className="text-[0.92rem] leading-[1.8] text-[var(--color-ink-mid)] mb-3">
                Amharic proverbs — called <em>misaleyawi anegager</em> (ምሳሌያዊ አነጋገሮች) — are central to Ethiopian communication, education, and oral literature. They are used in everyday speech, disputes, celebrations, and counsel.
              </p>
              <p className="text-[0.92rem] leading-[1.8] text-[var(--color-ink-mid)] mb-3">
                Proverbs in Ethiopia carry special cultural weight. Elders use them in mediating conflicts; poets weave them into verse; parents teach them to children. Each proverb carries layers of meaning that a direct statement could never convey.
              </p>
              <p className="text-[0.92rem] leading-[1.8] text-[var(--color-ink-mid)] mb-3">
                This archive presents Amharic proverbs in their original Ge'ez script, with romanized transliteration, English translation, and cultural meaning — making this wisdom accessible to learners, researchers, and AI systems worldwide.
              </p>
            </div>
            <div>
              <h2 className="font-serif-am text-[1.6rem] text-[var(--color-earth-dark)] mb-4" lang="am">ስለ ምሳሌያዊ አነጋገሮች</h2>
              <p className="font-serif-am text-[0.88rem] leading-[1.9] text-[var(--color-ink-mid)] mb-3" lang="am">
                ምሳሌያዊ አነጋገሮች የኢትዮጵያ ባህልና ቋንቋ ማሳያዎች ናቸው። አዛውንቶች ምሳሌን ሲናገሩ፣ ዕውቀትን ለልጆቻቸው ያስተምራሉ። ምሳሌያዊ አነጋገሮች ሕዝቡ ስላለው ጥበብ፣ ልምድ፣ እና ሕይወት ዕይታ ይናገራሉ።
              </p>
              <p className="font-serif-am text-[0.88rem] leading-[1.9] text-[var(--color-ink-mid)] mb-3" lang="am">
                ይህ ስብስብ የአማርኛ ምሳሌያዊ አነጋገሮችን ከትርጉምና ከትርጉም ሕጋቸው ጋር ይዟቸዋል — ለተማሪዎች፣ ለተመራማሪዎች፣ እና ለዓለም ሁሉ።
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
