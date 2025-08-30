// scripts/clear-engagements-cache.js
// Script pour nettoyer le cache des engagements

const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function clearEngagementsCache() {
    try {
        console.log('🧹 Nettoyage du cache des engagements...');

        const response = await fetch(`${API_BASE_URL}/api/engagements/cache`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            console.log('✅ Cache nettoyé avec succès!');
            console.log(`📊 ${result.data.engagementsCount} engagements rechargés`);
            console.log('Cache Info:', result.data.cache);
        } else {
            console.error('❌ Erreur:', result.error);
        }

    } catch (error) {
        console.error('❌ Erreur lors du nettoyage du cache:', error.message);
    }
}

// Exécuter le script si appelé directement
if (require.main === module) {
    clearEngagementsCache();
}

module.exports = { clearEngagementsCache };
