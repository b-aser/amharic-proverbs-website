import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

export default async function AdminSubmissionsPage() {
  const supabase = await createClient();
  
  const { data: submissions } = await supabase
    .from('submissions')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  async function approveSubmission(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const id = formData.get('id') as string;

    const { data: submission } = await supabase.from('submissions').select('*').eq('id', id).single();
    if (!submission) return;

    // Strict slugification for URL safety
    const slug = slugify(submission.english_translation, { lower: true, strict: true });

    // 1. insert proverb
    const { data: proverb, error: proverbError } = await supabase
      .from("proverbs")
      .insert({
        slug,
        amharic_text: submission.amharic_text,
        english_translation: submission.english_translation,
        meaning_amharic: submission.meaning_amharic,
        meaning_english: submission.meaning_english,
      })
      .select()
      .single();

    if (proverbError) {
      console.error("Proverb Insert Error:", proverbError);
      return;
    }

    // 2. handle tags (controlled)
    for (const tagName of submission.suggested_tags || []) {
      const cleanTag = tagName.trim().toLowerCase();
      if (!cleanTag) continue;

      let { data: tag } = await supabase
        .from("tags")
        .select("*")
        .eq("name", cleanTag)
        .single();

      if (!tag) {
        const { data: newTag } = await supabase
          .from("tags")
          .insert({ name: cleanTag })
          .select()
          .single();
        tag = newTag;
      }

      if (tag) {
        await supabase.from("proverb_tags").insert({
          proverb_id: proverb.id,
          tag_id: tag.id,
        });
      }
    }

    // 3. mark submission
    await supabase
      .from("submissions")
      .update({ status: "approved" })
      .eq("id", id);

    revalidatePath('/admin/submissions');
    revalidatePath('/proverbs');
  }

  async function rejectSubmission(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const id = formData.get('id') as string;
    
    await supabase
      .from("submissions")
      .update({ status: "rejected" })
      .eq("id", id);

    revalidatePath('/admin/submissions');
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-display text-[var(--color-earth-dark)] mb-8">Pending Submissions</h1>
      
      {!submissions || submissions.length === 0 ? (
        <div className="bg-white p-12 rounded-xl text-center border shadow-sm">
          <p className="text-[var(--color-ink-soft)] text-lg">No pending submissions to review.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map((sub: any) => (
            <div key={sub.id} className="bg-white p-6 rounded-xl border border-[var(--color-border-eth)] shadow-[var(--shadow-card)]">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <strong className="block text-sm text-[var(--color-ink-soft)]">Amharic Text</strong>
                  <p className="font-serif-am text-lg text-[var(--color-earth-dark)]">{sub.amharic_text}</p>
                </div>
                <div>
                  <strong className="block text-sm text-[var(--color-ink-soft)]">English Translation</strong>
                  <p className="text-[var(--color-earth-dark)]">{sub.english_translation}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <strong className="block text-sm text-[var(--color-ink-soft)]">Meaning (Amharic)</strong>
                  <p className="font-serif-am text-sm">{sub.meaning_amharic}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <strong className="block text-sm text-[var(--color-ink-soft)]">Meaning (English)</strong>
                  <p className="text-sm">{sub.meaning_english}</p>
                </div>
                <div className="col-span-2">
                  <strong className="block text-sm text-[var(--color-ink-soft)]">Suggested Tags</strong>
                  <div className="flex gap-2 mt-2">
                    {sub.suggested_tags?.map((t: string) => (
                      <span key={t} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold uppercase">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 border-t border-gray-100 pt-5 mt-5">
                <form action={approveSubmission}>
                  <input type="hidden" name="id" value={sub.id} />
                  <button className="px-5 py-2 bg-[var(--color-green-eth)] text-white rounded-md font-semibold hover:bg-opacity-90 transition-colors shadow-sm">
                    Approve & Publish
                  </button>
                </form>
                <form action={rejectSubmission}>
                  <input type="hidden" name="id" value={sub.id} />
                  <button className="px-5 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-opacity-90 transition-colors shadow-sm">
                    Reject
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
