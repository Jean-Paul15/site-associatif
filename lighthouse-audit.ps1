# Script PowerShell pour auditer le site avec Lighthouse
# Analyse des performances locales et en production

Write-Host "🔍 AUDIT LIGHTHOUSE - SITE ASSOCIATIF" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Créer le dossier de rapports s'il n'existe pas
$reportsDir = "lighthouse-reports"
if (!(Test-Path $reportsDir)) {
    New-Item -ItemType Directory -Path $reportsDir
    Write-Host "📁 Dossier $reportsDir créé" -ForegroundColor Green
}

# URLs à tester
$localBaseUrl = "http://localhost:3002"
$prodBaseUrl = "https://votre-site-en-production.vercel.app"  # À remplacer par votre URL de production

# Pages à auditer
$pages = @(
    @{ name = "accueil"; path = "/" },
    @{ name = "qui-sommes-nous"; path = "/qui-sommes-nous" },
    @{ name = "nos-actions"; path = "/nos-actions" },
    @{ name = "actualites"; path = "/je-m-informe" },
    @{ name = "j-agis"; path = "/j-agis" }
)

# Fonction pour exécuter Lighthouse
function Run-Lighthouse {
    param(
        [string]$url,
        [string]$outputFile,
        [string]$environment
    )
    
    Write-Host "🚀 Analyse $environment : $url" -ForegroundColor Yellow
    
    # Commande Lighthouse avec options optimisées
    $lighthouseCmd = "lighthouse `"$url`" --output=html --output=json --output-path=`"$outputFile`" --chrome-flags=`"--headless --no-sandbox --disable-dev-shm-usage`" --quiet"
    
    try {
        Invoke-Expression $lighthouseCmd
        Write-Host "✅ Rapport généré : $outputFile.html" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Erreur lors de l'analyse : $_" -ForegroundColor Red
    }
}

# Test de connectivité local
Write-Host "`n🏠 TESTS LOCAUX (localhost:3002)" -ForegroundColor Magenta
Write-Host "=================================" -ForegroundColor Magenta

try {
    $response = Invoke-WebRequest -Uri $localBaseUrl -Method Head -TimeoutSec 10
    Write-Host "✅ Serveur local accessible" -ForegroundColor Green
    
    foreach ($page in $pages) {
        $url = $localBaseUrl + $page.path
        $outputFile = "$reportsDir/local-$($page.name)"
        Run-Lighthouse -url $url -outputFile $outputFile -environment "LOCAL"
        Start-Sleep -Seconds 2
    }
}
catch {
    Write-Host "❌ Serveur local non accessible. Assurez-vous que 'npm run dev' est lancé." -ForegroundColor Red
}

# Tests en production (si l'URL est configurée)
if ($prodBaseUrl -ne "https://votre-site-en-production.vercel.app") {
    Write-Host "`n🌐 TESTS PRODUCTION" -ForegroundColor Magenta
    Write-Host "==================" -ForegroundColor Magenta
    
    try {
        $response = Invoke-WebRequest -Uri $prodBaseUrl -Method Head -TimeoutSec 10
        Write-Host "✅ Site en production accessible" -ForegroundColor Green
        
        foreach ($page in $pages) {
            $url = $prodBaseUrl + $page.path
            $outputFile = "$reportsDir/prod-$($page.name)"
            Run-Lighthouse -url $url -outputFile $outputFile -environment "PRODUCTION"
            Start-Sleep -Seconds 2
        }
    }
    catch {
        Write-Host "❌ Site en production non accessible : $prodBaseUrl" -ForegroundColor Red
    }
}
else {
    Write-Host "`n⚠️  URL de production non configurée" -ForegroundColor Yellow
    Write-Host "Modifiez la variable `$prodBaseUrl dans ce script" -ForegroundColor Yellow
}

Write-Host "`n📊 RÉSUMÉ" -ForegroundColor Cyan
Write-Host "========" -ForegroundColor Cyan
Write-Host "Les rapports Lighthouse sont disponibles dans le dossier : $reportsDir" -ForegroundColor White
Write-Host "Ouvrez les fichiers .html dans votre navigateur pour voir les détails." -ForegroundColor White

# Lister les rapports générés
Write-Host "`n📋 Rapports générés :" -ForegroundColor Green
Get-ChildItem -Path $reportsDir -Filter "*.html" | ForEach-Object {
    Write-Host "  - $($_.Name)" -ForegroundColor Gray
}

Write-Host "`n🎯 Pour ouvrir un rapport, utilisez :" -ForegroundColor Cyan
Write-Host "Start-Process '$reportsDir/local-accueil.html'" -ForegroundColor Gray
