// lib/getNews.js
import { supabase } from './supabaseClient';

export async function getNewsItems(limit) {
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
  return data;
}