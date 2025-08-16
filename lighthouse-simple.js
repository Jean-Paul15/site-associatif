const { execSync } = require('child_process');
const fs = require('fs');

// Vérifier que le serveur local est en marche
console.log('🔍 Vérification du serveur local...');

try {
  // Test simple avec curl ou équivalent
  const testCmd = 'curl -s -o NUL -w "%{http_code}" http://localhost:3002';
  const statusCode = execSync(testCmd, { encoding: 'utf8', timeout: 5000 }).trim();

  if (statusCode === '200') {
    console.log('✅ Serveur local accessible sur http://localhost:3002');

    // Créer le dossier de rapports
    if (!fs.existsSync('lighthouse-reports')) {
      fs.mkdirSync('lighthouse-reports');
    }

    // Pages à tester
    const pages = [
      { name: 'accueil', path: '/' },
      { name: 'qui-sommes-nous', path: '/qui-sommes-nous' },
      { name: 'nos-actions', path: '/nos-actions' },
      { name: 'actualites', path: '/je-m-informe' }
    ];

    console.log('\n🚀 Démarrage des audits Lighthouse...\n');

    pages.forEach((page, index) => {
      const url = `http://localhost:3002${page.path}`;
      const outputFile = `lighthouse-reports/local-${page.name}`;

      console.log(`${index + 1}/${pages.length} - Audit de : ${page.name}`);
      console.log(`    URL: ${url}`);

      try {
        const lighthouseCmd = `npx lighthouse "${url}" --output=html --output-path="${outputFile}" --chrome-flags="--headless --no-sandbox" --quiet --no-enable-error-reporting`;
        execSync(lighthouseCmd, { stdio: 'inherit', timeout: 60000 });
        console.log(`    ✅ Rapport généré : ${outputFile}.html\n`);
      } catch (error) {
        console.log(`    ❌ Erreur lors de l'audit : ${error.message}\n`);
      }
    });

    console.log('📊 AUDIT TERMINÉ !');
    console.log('=================');
    console.log('Les rapports sont disponibles dans le dossier "lighthouse-reports"');
    console.log('\n🌐 Pour voir un rapport :');
    console.log('Start-Process "lighthouse-reports/local-accueil.html"');

  } else {
    console.log('❌ Serveur local non accessible. Code de statut :', statusCode);
    console.log('Assurez-vous que "npm run dev" est lancé.');
  }
} catch (error) {
  console.log('❌ Impossible de vérifier le serveur local :', error.message);
  console.log('Assurez-vous que "npm run dev" est lancé sur le port 3002.');
}
