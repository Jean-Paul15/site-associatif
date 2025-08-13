// lib/getNews.js
import { supabase } from './supabaseClient';
import { logEnvironmentInfo, logDataFreshness } from './diagnostics';

export async function getNewsItems(limit) {
  try {
    // Log des informations de diagnostic
    logEnvironmentInfo();

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching news items from server:', error.message);
      return [];
    }

    // Log de la fraîcheur des données
    logDataFreshness(data, 'getNewsItems server function');

    console.log(`✅ Fetched ${data?.length || 0} articles from server at ${new Date().toISOString()}`);
    return data || [];
  } catch (error) {
    console.error('Unexpected error in getNewsItems:', error);
    return [];
  }
}