// lib/getArticles.js
import { supabase } from './supabaseClient';

// Fonction optimisée pour récupérer les premiers articles rapidement
export async function getInitialArticles(limit = 9) {
    try {
        // Utiliser un select optimisé avec seulement les champs nécessaires pour l'affichage initial
        const { data, error } = await supabase
            .from('articles')
            .select('id, title, short_description, slug, image_url, published_date, is_published')
            .eq('is_published', true)
            .order('published_date', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching initial articles:', error.message);
            return [];
        }

        console.log(`✅ Fetched ${data?.length || 0} initial articles optimized`);
        return data || [];
    } catch (error) {
        console.error('Unexpected error in getInitialArticles:', error);
        return [];
    }
}

// Fonction pour obtenir le nombre total d'articles (pour l'infinite scroll)
export async function getTotalArticlesCount() {
    try {
        const { count, error } = await supabase
            .from('articles')
            .select('*', { count: 'exact', head: true })
            .eq('is_published', true);

        if (error) {
            console.error('Error fetching articles count:', error.message);
            return 0;
        }

        return count || 0;
    } catch (error) {
        console.error('Unexpected error in getTotalArticlesCount:', error);
        return 0;
    }
}

// Fonction pour précharger les métadonnées essentielles
export async function preloadArticlesMetadata() {
    try {
        const { data, error } = await supabase
            .from('articles')
            .select('id, title, slug, published_date')
            .eq('is_published', true)
            .order('published_date', { ascending: false })
            .limit(20); // Précharger les IDs pour la prochaine page

        if (error) {
            console.error('Error preloading articles metadata:', error.message);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Unexpected error in preloadArticlesMetadata:', error);
        return [];
    }
}
