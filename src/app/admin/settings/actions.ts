'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface SiteSettings {
  websiteName?: string;
  websiteNameAmharic?: string;
  domainName?: string;
  taglineAmharic?: string;
  taglineEnglish?: string;
  logoUrl?: string;
  aboutTextAmharic?: string;
  aboutTextEnglish?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
  submissionSettings?: {
    allowPublicSubmissions?: boolean;
    requireApproval?: boolean;
    maxSubmissionsPerUser?: number;
  };
}

export async function getSetting(key: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', key)
      .single();

    if (error) return null;
    return data?.value;
  } catch (error) {
    console.error('Error fetching setting:', error);
    return null;
  }
}

export async function getAllSettings() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('key, value');

    if (error) throw error;

    const settings: Record<string, any> = {};
    data?.forEach((item: any) => {
      settings[item.key] = item.value;
    });

    return settings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {};
  }
}

export async function updateSetting(key: string, value: any) {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') throw new Error('Unauthorized');

    // Upsert the setting
    const { error } = await supabase
      .from('settings')
      .upsert({ key, value }, { onConflict: 'key' });

    if (error) throw error;

    revalidatePath('/admin/settings');
    revalidatePath('/');

    return { success: true, message: 'Setting updated successfully' };
  } catch (error) {
    console.error('Error updating setting:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update setting',
    };
  }
}

export async function updateMultipleSettings(settings: SiteSettings) {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') throw new Error('Unauthorized');

    const updates = Object.entries(settings)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => ({ key, value }));

    if (updates.length === 0) {
      return { success: true, message: 'No changes to update' };
    }

    for (const update of updates) {
      const { error } = await supabase
        .from('settings')
        .upsert(update, { onConflict: 'key' });

      if (error) throw error;
    }

    revalidatePath('/admin/settings');
    revalidatePath('/');

    return { success: true, message: 'Settings updated successfully' };
  } catch (error) {
    console.error('Error updating settings:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update settings',
    };
  }
}

// Proverb CRUD operations
export async function addProverb(data: {
  amharicText: string;
  englishTranslation: string;
  meaningAmharic?: string;
  meaningEnglish?: string;
  tags?: string[];
}) {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') throw new Error('Unauthorized');

    const slug = data.amharicText.toLowerCase().replace(/\s+/g, '-').substring(0, 50);

    const { data: proverb, error } = await supabase
      .from('proverbs')
      .insert({
        amharic_text: data.amharicText,
        english_translation: data.englishTranslation,
        meaning_amharic: data.meaningAmharic || null,
        meaning_english: data.meaningEnglish || null,
        slug,
        created_by: user.id,
        approved_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Handle tags if provided
    if (data.tags && data.tags.length > 0 && proverb) {
      for (const tagName of data.tags) {
        let tag = await supabase
          .from('tags')
          .select('id')
          .eq('name', tagName)
          .single();

        let tagId;
        if (tag.error) {
          const newTag = await supabase
            .from('tags')
            .insert({ name: tagName })
            .select()
            .single();
          tagId = newTag.data?.id;
        } else {
          tagId = tag.data?.id;
        }

        if (tagId) {
          await supabase
            .from('proverb_tags')
            .insert({ proverb_id: proverb.id, tag_id: tagId });
        }
      }
    }

    revalidatePath('/proverbs');
    revalidatePath('/admin/settings');

    return { success: true, message: 'Proverb added successfully', proverb };
  } catch (error) {
    console.error('Error adding proverb:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to add proverb',
    };
  }
}

export async function updateProverb(
  id: string,
  data: {
    amharicText?: string;
    englishTranslation?: string;
    meaningAmharic?: string;
    meaningEnglish?: string;
    tags?: string[];
  }
) {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') throw new Error('Unauthorized');

    const updateData: Record<string, any> = {};
    if (data.amharicText) updateData.amharic_text = data.amharicText;
    if (data.englishTranslation) updateData.english_translation = data.englishTranslation;
    if (data.meaningAmharic !== undefined) updateData.meaning_amharic = data.meaningAmharic;
    if (data.meaningEnglish !== undefined) updateData.meaning_english = data.meaningEnglish;

    const { error, data: updated } = await supabase
      .from('proverbs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Handle tags if provided
    if (data.tags && Array.isArray(data.tags)) {
      // Remove existing tags
      await supabase.from('proverb_tags').delete().eq('proverb_id', id);

      // Add new tags
      for (const tagName of data.tags) {
        let tag = await supabase
          .from('tags')
          .select('id')
          .eq('name', tagName)
          .single();

        let tagId;
        if (tag.error) {
          const newTag = await supabase
            .from('tags')
            .insert({ name: tagName })
            .select()
            .single();
          tagId = newTag.data?.id;
        } else {
          tagId = tag.data?.id;
        }

        if (tagId) {
          await supabase
            .from('proverb_tags')
            .insert({ proverb_id: id, tag_id: tagId });
        }
      }
    }

    revalidatePath('/proverbs');
    revalidatePath('/admin/settings');

    return { success: true, message: 'Proverb updated successfully', proverb: updated };
  } catch (error) {
    console.error('Error updating proverb:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update proverb',
    };
  }
}

export async function deleteProverb(id: string) {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') throw new Error('Unauthorized');

    const { error } = await supabase.from('proverbs').delete().eq('id', id);

    if (error) throw error;

    revalidatePath('/proverbs');
    revalidatePath('/admin/settings');

    return { success: true, message: 'Proverb deleted successfully' };
  } catch (error) {
    console.error('Error deleting proverb:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete proverb',
    };
  }
}

export async function getProverbs() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('proverbs')
      .select(`
        id,
        amharic_text,
        english_translation,
        meaning_amharic,
        meaning_english,
        slug,
        created_at,
        proverb_tags (
          tag_id,
          tags (name)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform the data to handle cases where Supabase returns tags as an array
    const transformedData = (data || []).map((proverb: any) => ({
      ...proverb,
      proverb_tags: proverb.proverb_tags?.map((pt: any) => ({
        ...pt,
        tags: Array.isArray(pt.tags) ? pt.tags[0] : pt.tags
      }))
    }));

    return { success: true, proverbs: transformedData };
  } catch (error) {
    console.error('Error fetching proverbs:', error);
    return { success: false, proverbs: [], message: 'Failed to fetch proverbs' };
  }
}
