import { supabase } from './supabaseClient';

// Cache pour les engagements avec timestamp
let engagementsCache = {
    data: null,
    timestamp: 0,
    // Cache pendant 24 heures (86400000 ms) car le contenu est rarement modifié
    maxAge: 24 * 60 * 60 * 1000
};

/**
 * Récupère tous les engagements actifs depuis Supabase avec mise en cache
 * Cache pendant 24h car c'est du contenu rarement modifié
 */
export async function getEngagements() {
    try {
        const now = Date.now();

        // Vérifier si le cache est encore valide
        if (engagementsCache.data && (now - engagementsCache.timestamp) < engagementsCache.maxAge) {
            console.log('✅ Engagements récupérés depuis le cache');
            return engagementsCache.data;
        }

        console.log('🔄 Chargement des engagements depuis Supabase...');

        const { data, error } = await supabase
            .from('engagements')
            .select(`
        id,
        title,
        description,
        image_url,
        ordre,
        created_at,
        updated_at
      `)
            .eq('is_active', true)
            .order('ordre', { ascending: true }); // Triés par ordre d'affichage

        if (error) {
            console.error('❌ Erreur lors de la récupération des engagements:', error);
            throw error;
        }

        // Mettre à jour le cache
        engagementsCache = {
            data: data || [],
            timestamp: now,
            maxAge: engagementsCache.maxAge
        };

        console.log(`✅ ${data?.length || 0} engagements chargés et mis en cache`);
        console.log('Cache Info:', {
            dataCount: data?.length || 0,
            timestamp: new Date(now).toISOString(),
            nextRefresh: new Date(now + engagementsCache.maxAge).toISOString()
        });

        return data || [];

    } catch (error) {
        console.error('❌ Erreur dans getEngagements:', error);

        // Si on a des données en cache, les retourner même si elles sont expirées
        if (engagementsCache.data) {
            console.log('⚠️ Utilisation du cache expiré en fallback');
            return engagementsCache.data;
        }

        return [];
    }
}

/**
 * Force le rechargement du cache des engagements
 * Utile pour l'administration ou après modification
 */
export async function refreshEngagementsCache() {
    console.log('🔄 Rechargement forcé du cache des engagements...');

    // Invalider le cache
    engagementsCache.timestamp = 0;

    // Recharger les données
    return await getEngagements();
}

/**
 * Récupère un engagement spécifique par son ID
 */
export async function getEngagementById(id) {
    try {
        const { data, error } = await supabase
            .from('engagements')
            .select('*')
            .eq('id', id)
            .eq('is_active', true)
            .single();

        if (error) {
            console.error('❌ Erreur lors de la récupération de l\'engagement:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('❌ Erreur dans getEngagementById:', error);
        return null;
    }
}

/**
 * Obtient les informations du cache (pour debug/admin)
 */
export function getEngagementsCacheInfo() {
    const now = Date.now();
    return {
        hasData: !!engagementsCache.data,
        dataCount: engagementsCache.data?.length || 0,
        cacheAge: now - engagementsCache.timestamp,
        maxAge: engagementsCache.maxAge,
        isExpired: (now - engagementsCache.timestamp) > engagementsCache.maxAge,
        lastUpdate: new Date(engagementsCache.timestamp).toISOString(),
        nextExpiry: new Date(engagementsCache.timestamp + engagementsCache.maxAge).toISOString()
    };
}
