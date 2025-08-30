const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔍 AUDIT LIGHTHOUSE - SITE ASSOCIATIF');
console.log('=====================================\n');

// Configuration
const LOCAL_URL = 'http://localhost:3001';
const REPORTS_DIR = 'lighthouse-reports';

// Pages à tester
const pages = [
  { name: 'accueil', path: '/', description: 'Page d\'accueil' },
  { name: 'qui-sommes-nous', path: '/qui-sommes-nous', description: 'Qui sommes-nous' },
  { name: 'nos-actions', path: '/nos-actions', description: 'Nos actions' },
  { name: 'actualites', path: '/je-m-informe', description: 'Actualités' },
  { name: 'j-agis', path: '/j-agis', description: 'J\'agis' }
];

// Fonction pour tester la connectivité
function testServer() {
  try {
    console.log('🔗 Test de connectivité du serveur local...');
    // Test simple avec curl (disponible sur Windows 10+)
    const result = execSync(`curl -s -o NUL -w "%{http_code}" ${LOCAL_URL}`,
      { encoding: 'utf8', timeout: 10000 }).trim();

    if (result === '200') {
      console.log('✅ Serveur local accessible\n');
      return true;
    } else {
      console.log(`❌ Serveur retourne le code: ${result}\n`);
      return false;
    }
  } catch (error) {
    console.log('❌ Serveur local non accessible');
    console.log('💡 Assurez-vous que "npm run dev" est lancé\n');
    return false;
  }
}

// Fonction pour exécuter Lighthouse sur une page
function runLighthouseAudit(page) {
  const url = LOCAL_URL + page.path;
  const outputPath = `${REPORTS_DIR}/local-${page.name}`;

  console.log(`🚀 Audit de : ${page.description}`);
  console.log(`   URL: ${url}`);

  try {
    // Commande Lighthouse avec npx (pas besoin d'installation globale)
    const cmd = `npx lighthouse "${url}" ` +
      `--output=html ` +
      `--output-path="${outputPath}" ` +
      `--chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" ` +
      `--quiet ` +
      `--no-enable-error-reporting`;

    console.log('   📊 Analyse en cours...');
    execSync(cmd, { stdio: 'pipe', timeout: 120000 });

    console.log(`   ✅ Rapport généré : ${outputPath}.html\n`);
    return true;
  } catch (error) {
    console.log(`   ❌ Erreur : ${error.message}\n`);
    return false;
  }
}

// Fonction principale
async function main() {
  // Vérifier que le serveur fonctionne
  if (!testServer()) {
    console.log('🔧 Pour démarrer le serveur :');
    console.log('   npm run dev');
    process.exit(1);
  }

  // Créer le dossier de rapports s'il n'existe pas
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR);
    console.log(`📁 Dossier ${REPORTS_DIR} créé\n`);
  }

  console.log('🎯 Démarrage des audits Lighthouse...\n');

  let successCount = 0;
  const totalPages = pages.length;

  // Auditer chaque page
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    console.log(`[${i + 1}/${totalPages}] --------------------------------`);

    if (runLighthouseAudit(page)) {
      successCount++;
    }

    // Pause entre les audits pour éviter la surcharge
    if (i < pages.length - 1) {
      console.log('   ⏳ Pause de 3 secondes...\n');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Résumé final
  console.log('📊 RÉSUMÉ FINAL');
  console.log('===============');
  console.log(`✅ Audits réussis : ${successCount}/${totalPages}`);
  console.log(`📁 Rapports dans : ${REPORTS_DIR}/`);

  if (successCount > 0) {
    console.log('\n🌐 Pour ouvrir un rapport :');
    console.log(`   start ${REPORTS_DIR}/local-accueil.html`);
    console.log('\n📋 Rapports disponibles :');

    pages.forEach(page => {
      const filePath = `${REPORTS_DIR}/local-${page.name}.html`;
      if (fs.existsSync(filePath)) {
        console.log(`   • ${page.description}: ${filePath}`);
      }
    });
  }

  console.log('\n🎉 Audit terminé !');
}

// Lancer le script
main().catch(error => {
  console.error('❌ Erreur fatale :', error.message);
  process.exit(1);
});
