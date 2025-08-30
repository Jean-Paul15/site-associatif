// scripts/performance-test.js
const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 TEST DE PERFORMANCE - OPTIMISATIONS');
console.log('=======================================\n');

// Configuration
const LOCAL_URL = 'http://localhost:3001';
const TARGET_SCORES = {
    performance: 95,
    accessibility: 90,
    bestPractices: 90,
    seo: 90
};

// Pages critiques à tester
const criticalPages = [
    { name: 'accueil', path: '/', priority: 'high' },
    { name: 'qui-sommes-nous', path: '/qui-sommes-nous', priority: 'high' },
    { name: 'nos-actions', path: '/nos-actions', priority: 'medium' },
];

// Fonction pour tester une page avec Lighthouse
async function testPagePerformance(page) {
    const url = LOCAL_URL + page.path;
    const outputPath = `lighthouse-reports/perf-test-${page.name}`;

    console.log(`⚡ Test de performance : ${page.name}`);
    console.log(`   URL: ${url}`);
    console.log(`   Priorité: ${page.priority}`);

    try {
        // Configuration Lighthouse optimisée pour la performance
        const lighthouseCmd = `npx lighthouse "${url}" ` +
            `--output=html --output-path="${outputPath}.html" ` +
            `--only-categories=performance,accessibility,best-practices,seo ` +
            `--form-factor=desktop ` +
            `--throttling-method=devtools ` +
            `--no-enable-error-reporting ` +
            `--quiet`;

        execSync(lighthouseCmd, { stdio: 'inherit' });

        // Analyser les résultats
        const jsonOutputPath = `${outputPath}.json`;
        const jsonCmd = `npx lighthouse "${url}" ` +
            `--output=json --output-path="${jsonOutputPath}" ` +
            `--only-categories=performance,accessibility,best-practices,seo ` +
            `--quiet`;

        execSync(jsonCmd, { stdio: 'pipe' });

        // Lire et analyser les scores
        if (fs.existsSync(jsonOutputPath)) {
            const report = JSON.parse(fs.readFileSync(jsonOutputPath, 'utf8'));
            const scores = {
                performance: Math.round(report.categories.performance.score * 100),
                accessibility: Math.round(report.categories.accessibility.score * 100),
                bestPractices: Math.round(report.categories['best-practices'].score * 100),
                seo: Math.round(report.categories.seo.score * 100)
            };

            return { page: page.name, scores, report };
        }

        return null;
    } catch (error) {
        console.error(`❌ Erreur lors du test de ${page.name}:`, error.message);
        return null;
    }
}

// Fonction pour analyser les métriques Core Web Vitals
function analyzeCoreWebVitals(report) {
    const audits = report.audits;

    const metrics = {
        LCP: audits['largest-contentful-paint']?.numericValue || 0,
        FID: audits['max-potential-fid']?.numericValue || 0,
        CLS: audits['cumulative-layout-shift']?.numericValue || 0,
        FCP: audits['first-contentful-paint']?.numericValue || 0,
        TTI: audits['interactive']?.numericValue || 0,
        TBT: audits['total-blocking-time']?.numericValue || 0
    };

    const status = {
        LCP: metrics.LCP <= 2500 ? '✅' : metrics.LCP <= 4000 ? '⚠️' : '❌',
        FID: metrics.FID <= 100 ? '✅' : metrics.FID <= 300 ? '⚠️' : '❌',
        CLS: metrics.CLS <= 0.1 ? '✅' : metrics.CLS <= 0.25 ? '⚠️' : '❌',
        FCP: metrics.FCP <= 1800 ? '✅' : metrics.FCP <= 3000 ? '⚠️' : '❌',
    };

    return { metrics, status };
}

// Fonction pour générer des recommandations
function generateRecommendations(results) {
    const recommendations = [];

    results.forEach(result => {
        if (!result) return;

        const { page, scores, report } = result;

        if (scores.performance < TARGET_SCORES.performance) {
            recommendations.push(`📈 ${page}: Performance ${scores.performance}% < ${TARGET_SCORES.performance}%`);

            // Analyser les opportunités d'optimisation
            const opportunities = report.audits;

            if (opportunities['unused-css-rules']?.score < 0.9) {
                recommendations.push(`  • Supprimer le CSS inutilisé`);
            }
            if (opportunities['offscreen-images']?.score < 0.9) {
                recommendations.push(`  • Différer le chargement des images hors écran`);
            }
            if (opportunities['unminified-javascript']?.score < 0.9) {
                recommendations.push(`  • Minifier le JavaScript`);
            }
            if (opportunities['render-blocking-resources']?.score < 0.9) {
                recommendations.push(`  • Éliminer les ressources bloquant le rendu`);
            }
        }

        if (scores.accessibility < TARGET_SCORES.accessibility) {
            recommendations.push(`♿ ${page}: Accessibilité ${scores.accessibility}% < ${TARGET_SCORES.accessibility}%`);
        }
    });

    return recommendations;
}

// Fonction principale
async function runPerformanceTests() {
    console.log('🔗 Vérification du serveur...');

    // Test de connectivité
    try {
        execSync(`curl -s -o NUL -w "%{http_code}" ${LOCAL_URL}`, { timeout: 5000 });
        console.log('✅ Serveur accessible\n');
    } catch (error) {
        console.log('❌ Serveur non accessible');
        console.log('💡 Lancez "npm run dev" d\'abord\n');
        process.exit(1);
    }

    // Créer le dossier de rapports
    if (!fs.existsSync('lighthouse-reports')) {
        fs.mkdirSync('lighthouse-reports', { recursive: true });
    }

    console.log('🎯 Tests de performance en cours...\n');

    const results = [];

    for (const page of criticalPages) {
        const result = await testPagePerformance(page);
        if (result) {
            results.push(result);

            const { scores } = result;
            console.log(`📊 Scores pour ${page.name}:`);
            console.log(`   Performance: ${scores.performance}% ${scores.performance >= TARGET_SCORES.performance ? '✅' : '❌'}`);
            console.log(`   Accessibilité: ${scores.accessibility}% ${scores.accessibility >= TARGET_SCORES.accessibility ? '✅' : '❌'}`);
            console.log(`   Bonnes pratiques: ${scores.bestPractices}% ${scores.bestPractices >= TARGET_SCORES.bestPractices ? '✅' : '❌'}`);
            console.log(`   SEO: ${scores.seo}% ${scores.seo >= TARGET_SCORES.seo ? '✅' : '❌'}`);

            // Analyser Core Web Vitals
            const { metrics, status } = analyzeCoreWebVitals(result.report);
            console.log(`   Core Web Vitals:`);
            console.log(`     LCP: ${Math.round(metrics.LCP)}ms ${status.LCP}`);
            console.log(`     FID: ${Math.round(metrics.FID)}ms ${status.FID}`);
            console.log(`     CLS: ${metrics.CLS.toFixed(3)} ${status.CLS}`);
            console.log(`     FCP: ${Math.round(metrics.FCP)}ms ${status.FCP}\n`);
        }

        // Pause entre les tests
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Générer le rapport final
    console.log('📈 RAPPORT FINAL');
    console.log('================');

    const overallScores = {
        performance: Math.round(results.reduce((sum, r) => sum + r.scores.performance, 0) / results.length),
        accessibility: Math.round(results.reduce((sum, r) => sum + r.scores.accessibility, 0) / results.length),
        bestPractices: Math.round(results.reduce((sum, r) => sum + r.scores.bestPractices, 0) / results.length),
        seo: Math.round(results.reduce((sum, r) => sum + r.scores.seo, 0) / results.length)
    };

    console.log(`\n🎯 SCORES MOYENS:`);
    console.log(`Performance: ${overallScores.performance}% (Objectif: ${TARGET_SCORES.performance}%) ${overallScores.performance >= TARGET_SCORES.performance ? '🎉' : '⚠️'}`);
    console.log(`Accessibilité: ${overallScores.accessibility}% (Objectif: ${TARGET_SCORES.accessibility}%) ${overallScores.accessibility >= TARGET_SCORES.accessibility ? '🎉' : '⚠️'}`);
    console.log(`Bonnes pratiques: ${overallScores.bestPractices}% (Objectif: ${TARGET_SCORES.bestPractices}%) ${overallScores.bestPractices >= TARGET_SCORES.bestPractices ? '🎉' : '⚠️'}`);
    console.log(`SEO: ${overallScores.seo}% (Objectif: ${TARGET_SCORES.seo}%) ${overallScores.seo >= TARGET_SCORES.seo ? '🎉' : '⚠️'}`);

    // Recommandations
    const recommendations = generateRecommendations(results);
    if (recommendations.length > 0) {
        console.log(`\n🔧 RECOMMANDATIONS:`);
        recommendations.forEach(rec => console.log(rec));
    } else {
        console.log(`\n🎉 Tous les objectifs de performance sont atteints !`);
    }

    console.log(`\n📁 Rapports détaillés dans: lighthouse-reports/`);
}

// Exécuter les tests
runPerformanceTests().catch(console.error);
