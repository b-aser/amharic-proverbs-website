
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function SubmitPage() {
  const supabase = await createClient();
  // Safe default to true if settings aren't loaded yet
  let isSubmissionsAllowed = true;
  console.log(isSubmissionsAllowed);
  
  try {
    const { data: settings } = await supabase.from('settings').select('*');
    if (settings) {
      isSubmissionsAllowed = settings.find(s => s.key === 'allow_submissions')?.value === 'false';
    }
  } catch (e) {
    // ignore
  }

  async function submitProverb(formData: FormData) {
    'use server';
    const supabase = await createClient();
    
    const amharic_text = formData.get('amharic_text') as string;
    const english_translation = formData.get('english_translation') as string;
    const meaning_amharic = formData.get('meaning_amharic') as string;
    const meaning_english = formData.get('meaning_english') as string;
    const suggested_category = formData.get('suggested_category') as string;
    const tagsInput = formData.get('suggested_tags') as string;
    
    const suggested_tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    await supabase.from('submissions').insert({
      amharic_text,
      english_translation,
      meaning_amharic,
      meaning_english,
      suggested_category,
      suggested_tags,
    });
    

    redirect('/submit?success=true');
  }
console.log(isSubmissionsAllowed);
  return (
    <>
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto w-full px-6 py-12">
        <h1 className="font-display text-3xl text-[var(--color-earth-dark)] mb-6">Submit a Proverb</h1>
        
        {!isSubmissionsAllowed ? (
          <div className="bg-[var(--color-parchment-mid)] p-6 rounded-lg text-center">
            <p>Submissions are currently disabled by the administrators.</p>
          </div>
        ) : (
          <form action={submitProverb} className="bg-white p-8 rounded-xl shadow-[var(--shadow-card)] border border-[var(--color-border-eth)] space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">Amharic Text (አማርኛ)</label>
              <input name="amharic_text" required className="w-full px-4 py-2 border rounded-md font-serif-am outline-none focus:border-[var(--color-gold)]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">English Translation</label>
              <input name="english_translation" required className="w-full px-4 py-2 border rounded-md outline-none focus:border-[var(--color-gold)]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">Meaning in Amharic (ትርጉም)</label>
              <textarea name="meaning_amharic" rows={3} className="w-full px-4 py-2 border rounded-md font-serif-am outline-none focus:border-[var(--color-gold)]"></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">Meaning in English</label>
              <textarea name="meaning_english" rows={3} className="w-full px-4 py-2 border rounded-md outline-none focus:border-[var(--color-gold)]"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">Suggested Category</label>
                <input name="suggested_category" placeholder="e.g. Wisdom" className="w-full px-4 py-2 border rounded-md outline-none focus:border-[var(--color-gold)]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2">Suggested Tags</label>
                <input name="suggested_tags" placeholder="Comma separated" className="w-full px-4 py-2 border rounded-md outline-none focus:border-[var(--color-gold)]" />
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-[var(--color-earth-dark)] text-white rounded-md font-semibold hover:bg-[var(--color-gold)] hover:text-[var(--color-earth-dark)] transition-colors">
              Submit for Review
            </button>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}
