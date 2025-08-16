#!/usr/bin/env node

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const LOCAL_BASE_URL = 'http://localhost:3002';
const PRODUCTION_URL = 'https://votre-site.vercel.app'; // À remplacer par votre URL

// Pages à auditer
const pages = [
  { name: 'accueil', path: '/' },
  { name: 'qui-sommes-nous', path: '/qui-sommes-nous' },
  { name: 'nos-actions', path: '/nos-actions' },
  { name: 'actualites', path: '/je-m-informe' },
  { name: 'j-agis', path: '/j-agis' }
];

// Options Lighthouse
const lighthouseOptions = {
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  formFactor: 'desktop',
  throttling: {
    rttMs: 40,
    throughputKbps: 10240,
    cpuSlowdownMultiplier: 1,
    requestLatencyMs: 0,
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0
  },
  screenEmulation: {
    mobile: false,
    width: 1350,
    height: 940,
    deviceScaleFactor: 1,
    disabled: false
  }
};

// Fonction pour créer le dossier de rapports
async function createReportsDirectory() {
  const reportsDir = path.join(process.cwd(), 'lighthouse-reports');
  try {
    await fs.access(reportsDir);
  } catch (error) {
    await fs.mkdir(reportsDir, { recursive: true });
    console.log('📁 Dossier lighthouse-reports créé');
  }
  return reportsDir;
}

// Fonction pour exécuter Lighthouse sur une URL
async function runLighthouse(url, outputPath) {
  console.log(`🚀 Audit de : ${url}`);

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const runnerResult = await lighthouse(url, {
      ...lighthouseOptions,
      port: chrome.port,
    });

    // Sauvegarder le rapport HTML
    const htmlReport = runnerResult.report;
    await fs.writeFile(`${outputPath}.html`, htmlReport);

    // Extraire les scores principaux
    const scores = {
      performance: Math.round(runnerResult.lhr.categories.performance.score * 100),
      accessibility: Math.round(runnerResult.lhr.categories.accessibility.score * 100),
      'best-practices': Math.round(runnerResult.lhr.categories['best-practices'].score * 100),
      seo: Math.round(runnerResult.lhr.categories.seo.score * 100)
    };

    console.log(`✅ Rapport généré : ${outputPath}.html`);
    console.log(`   📊 Scores - Performance: ${scores.performance}% | Accessibilité: ${scores.accessibility}% | Bonnes pratiques: ${scores['best-practices']}% | SEO: ${scores.seo}%`);

    return scores;
  } catch (error) {
    console.error(`❌ Erreur lors de l'audit : ${error.message}`);
    return null;
  } finally {
    await chrome.kill();
  }
}

// Fonction pour tester la connectivité
async function testConnectivity(url) {
  try {
    const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(10000) });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Fonction principale
async function main() {
  console.log('🔍 AUDIT LIGHTHOUSE - SITE ASSOCIATIF');
  console.log('=====================================\n');

  const reportsDir = await createReportsDirectory();
  const results = [];

  // Tests locaux
  console.log('🏠 TESTS LOCAUX (localhost:3002)');
  console.log('=================================');

  const isLocalAvailable = await testConnectivity(LOCAL_BASE_URL);
  if (isLocalAvailable) {
    console.log('✅ Serveur local accessible\n');

    for (const page of pages) {
      const url = LOCAL_BASE_URL + page.path;
      const outputPath = path.join(reportsDir, `local-${page.name}`);
      const scores = await runLighthouse(url, outputPath);

      if (scores) {
        results.push({
          environment: 'local',
          page: page.name,
          url: url,
          ...scores
        });
      }

      // Pause entre les analyses
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } else {
    console.log('❌ Serveur local non accessible. Lancez "npm run dev" d\'abord.\n');
  }

  // Tests en production (si configuré)
  if (PRODUCTION_URL !== 'https://votre-site.vercel.app') {
    console.log('\n🌐 TESTS PRODUCTION');
    console.log('==================');

    const isProdAvailable = await testConnectivity(PRODUCTION_URL);
    if (isProdAvailable) {
      console.log('✅ Site en production accessible\n');

      for (const page of pages) {
        const url = PRODUCTION_URL + page.path;
        const outputPath = path.join(reportsDir, `prod-${page.name}`);
        const scores = await runLighthouse(url, outputPath);

        if (scores) {
          results.push({
            environment: 'production',
            page: page.name,
            url: url,
            ...scores
          });
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } else {
      console.log(`❌ Site en production non accessible : ${PRODUCTION_URL}\n`);
    }
  } else {
    console.log('\n⚠️  URL de production non configurée');
    console.log('Modifiez PRODUCTION_URL dans lighthouse-audit.js\n');
  }

  // Résumé des résultats
  console.log('\n📊 RÉSUMÉ DES SCORES');
  console.log('===================');

  if (results.length > 0) {
    console.table(results);

    // Sauvegarder les résultats en JSON
    await fs.writeFile(
      path.join(reportsDir, 'lighthouse-results.json'),
      JSON.stringify(results, null, 2)
    );

    console.log(`\n📁 Rapports disponibles dans : ${reportsDir}`);
    console.log('🌐 Ouvrez les fichiers .html dans votre navigateur pour voir les détails complets.');
  } else {
    console.log('Aucun audit réalisé avec succès.');
  }
}

// Lancement du script
main().catch(console.error);
