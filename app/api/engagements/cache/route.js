import { NextResponse } from 'next/server';
import { refreshEngagementsCache, getEngagementsCacheInfo } from '../../../../lib/getEngagements';

/**
 * API Route pour gérer le cache des engagements
 * GET: Obtient les informations du cache
 * POST: Force le rechargement du cache
 */

export async function GET() {
    try {
        const cacheInfo = getEngagementsCacheInfo();

        return NextResponse.json({
            success: true,
            cache: cacheInfo,
            message: 'Informations du cache récupérées'
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des infos cache:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}

export async function POST() {
    try {
        console.log('🔄 Rechargement du cache des engagements via API...');

        const engagements = await refreshEngagementsCache();
        const cacheInfo = getEngagementsCacheInfo();

        return NextResponse.json({
            success: true,
            message: 'Cache des engagements rechargé avec succès',
            data: {
                engagementsCount: engagements.length,
                cache: cacheInfo
            }
        });
    } catch (error) {
        console.error('Erreur lors du rechargement du cache:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors du rechargement du cache' },
            { status: 500 }
        );
    }
}
