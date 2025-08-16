const fs = require('fs');
const path = require('path');

console.log('📊 ANALYSE DES RÉSULTATS LIGHTHOUSE');
console.log('===================================\n');

const reportsDir = 'lighthouse-reports';
const pages = [
  { name: 'accueil', file: 'local-accueil.html', description: 'Page d\'accueil' },
  { name: 'qui-sommes-nous', file: 'local-qui-sommes-nous.html', description: 'Qui sommes-nous' },
  { name: 'nos-actions', file: 'local-nos-actions.html', description: 'Nos actions' },
  { name: 'actualites', file: 'local-actualites.html', description: 'Actualités' },
  { name: 'j-agis', file: 'local-j-agis.html', description: 'J\'agis' }
];

console.log('🎯 RAPPORTS DISPONIBLES :');
console.log('=========================\n');

pages.forEach((page, index) => {
  const filePath = path.join(reportsDir, page.file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const fileSize = (stats.size / 1024).toFixed(1);

    console.log(`${index + 1}. ${page.description}`);
    console.log(`   📄 Fichier : ${page.file}`);
    console.log(`   📏 Taille  : ${fileSize} KB`);
    console.log(`   🕒 Créé    : ${stats.mtime.toLocaleString('fr-FR')}`);
    console.log(`   🌐 Ouvrir  : start ${filePath}`);
    console.log('');
  } else {
    console.log(`❌ ${page.description} - Rapport manquant`);
  }
});

console.log('💡 CONSEILS POUR L\'ANALYSE :');
console.log('============================');
console.log('1. 🎯 Performance (> 90) - Vitesse de chargement');
console.log('2. ♿ Accessibilité (> 90) - Utilisabilité pour tous');
console.log('3. ✅ Bonnes pratiques (> 90) - Qualité du code');
console.log('4. 🔍 SEO (> 90) - Référencement naturel');
console.log('');
console.log('🚨 ZONES D\'ATTENTION COMMUNES :');
console.log('==============================');
console.log('• Images non optimisées (WebP, tailles)');
console.log('• Scripts JavaScript trop lourds');
console.log('• Fonts personnalisées lentes');
console.log('• Manque de cache navigateur');
console.log('• Balises alt manquantes sur images');
console.log('• Contrastes de couleurs insuffisants');
console.log('');
console.log('🎯 COMMANDES UTILES :');
console.log('====================');
console.log('• npm run lighthouse:quick  - Audit rapide accueil');
console.log('• npm run lighthouse        - Audit complet 5 pages');
console.log('• npm run build            - Build optimisé production');
console.log('');
console.log('📈 PROCHAINES ÉTAPES :');
console.log('=====================');
console.log('1. Analysez chaque rapport dans votre navigateur');
console.log('2. Notez les scores de performance < 90');
console.log('3. Identifiez les recommandations prioritaires');
console.log('4. Testez en production après déploiement');

// Ouvrir automatiquement le rapport de l'accueil
console.log('\n🚀 Ouverture automatique du rapport principal...');
const { exec } = require('child_process');
exec(`start ${path.join(reportsDir, 'local-accueil.html')}`, (error) => {
  if (error) {
    console.log('💡 Pour ouvrir manuellement :');
    console.log(`   start ${path.join(reportsDir, 'local-accueil.html')}`);
  }
});
