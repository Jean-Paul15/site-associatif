// Test des filtres de pagination améliorés

/**
 * Script de test pour vérifier le bon fonctionnement des filtres
 * Exécuter dans la console du navigateur sur la page je-m-informe
 */

function testFilters() {
    console.log('🧪 Test des filtres de pagination...');

    // Test 1: Vérifier que les paramètres URL sont bien synchronisés
    console.log('Test 1: Paramètres URL');
    const params = new URLSearchParams(window.location.search);
    console.log('- Page:', params.get('page') || '1');
    console.log('- Tri:', params.get('sort') || 'date_desc');
    console.log('- Filtre date:', params.get('dateFilter') || 'all');
    console.log('- Recherche:', params.get('search') || 'aucune');
    console.log('- Vue:', params.get('view') || 'grid');

    // Test 2: Vérifier les options de tri
    console.log('\nTest 2: Options de tri disponibles');
    const sortSelect = document.querySelector('select[value*="date"]');
    if (sortSelect) {
        Array.from(sortSelect.options).forEach(option => {
            console.log(`- ${option.value}: ${option.text}`);
        });
    }

    // Test 3: Vérifier les filtres de période
    console.log('\nTest 3: Filtres de période');
    const dateSelect = document.querySelector('select[value*="all"]');
    if (dateSelect) {
        Array.from(dateSelect.options).forEach(option => {
            console.log(`- ${option.value}: ${option.text}`);
        });
    }

    // Test 4: Simulation de changement de tri
    console.log('\nTest 4: Test de changement de tri');
    if (sortSelect) {
        console.log('Changement vers tri alphabétique...');
        sortSelect.value = 'title_asc';
        sortSelect.dispatchEvent(new Event('change'));

        setTimeout(() => {
            const newParams = new URLSearchParams(window.location.search);
            console.log('Nouveau tri dans URL:', newParams.get('sort'));
            console.log('Page reset à:', newParams.get('page'));
        }, 1000);
    }

    console.log('\n✅ Tests terminés. Vérifiez les logs ci-dessus et l\'interface.');
}

// Export pour utilisation dans la console
window.testFilters = testFilters;

console.log('🔧 Script de test chargé. Tapez testFilters() dans la console pour lancer les tests.');
