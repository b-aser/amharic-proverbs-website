import { createClient } from './client';

export async function getSettings() {
  const supabase = createClient();

  try {
    const { data, error } = await (await supabase)
      .from('settings')
      .select('key, value');

    if (error) throw error;

    const settings: Record<string, any> = {};
    data?.forEach((item) => {
      settings[item.key] = item.value;
    });

    return settings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {};
  }
}

export async function getSetting(key: string) {
  const supabase = createClient();

  try {
    const { data, error } = await (await supabase)
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
