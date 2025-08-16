import { supabase } from './supabaseClient';

/**
 * Récupère toutes les actions actives depuis Supabase
 * Triées du moins récent au plus récent (ordre chronologique)
 * Filtrées pour l'année en cours seulement
 */
export async function getActions(limit = 20) {
    try {
        // Calculer l'année en cours dynamiquement
        const currentYear = new Date().getFullYear();
        const startOfYear = `${currentYear}-01-01T00:00:00.000Z`;
        const endOfYear = `${currentYear}-12-31T23:59:59.999Z`;

        console.log('Loading actions at', new Date().toISOString());
        console.log('Environment Info:', {
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString(),
            isServer: typeof window === 'undefined',
            userAgent: typeof window === 'undefined' ? 'Server' : navigator.userAgent,
            currentYear: currentYear,
            yearFilter: `${startOfYear} to ${endOfYear}`
        });

        const { data, error } = await supabase
            .from('actions')
            .select(`
        id,
        title,
        image_url,
        full_content,
        created_at,
        updated_at
      `)
            .eq('is_active', true)
            .gte('created_at', startOfYear)  // Supérieur ou égal au 1er janvier de l'année en cours
            .lte('created_at', endOfYear)    // Inférieur ou égal au 31 décembre de l'année en cours
            .order('created_at', { ascending: true }) // Du moins récent au plus récent
            .limit(limit);

        if (error) {
            console.error('❌ Erreur lors de la récupération des actions:', error);
            throw error;
        }

        console.log('Data Freshness:', {
            source: 'getActions server function',
            dataCount: data?.length || 0,
            timestamp: new Date().toISOString(),
            yearFilter: currentYear,
            sampleData: data?.length > 0 ? {
                firstItemId: data[0].id,
                firstItemTitle: data[0].title,
                firstItemDate: data[0].created_at
            } : null
        });

        console.log(`✅ Fetched ${data?.length || 0} actions from server at ${new Date().toISOString()}`);
        console.log(`Loaded ${data?.length || 0} actions for year ${currentYear}`);

        return data || [];

    } catch (error) {
        console.error('❌ Erreur dans getActions:', error);
        return [];
    }
}

/**
 * Récupère une action spécifique par son ID
 */
export async function getActionById(id) {
    try {
        const { data, error } = await supabase
            .from('actions')
            .select('*')
            .eq('id', id)
            .eq('is_active', true)
            .single();

        if (error) {
            console.error('❌ Erreur lors de la récupération de l\'action:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('❌ Erreur dans getActionById:', error);
        return null;
    }
}
