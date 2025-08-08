# Script PowerShell pour construire et lancer l'application Next.js dans Docker

# Fonction pour obtenir le chemin du script actuel
function Get-ScriptDirectory {
    Split-Path -Parent $MyInvocation.MyCommand.Definition
}

# Naviguer vers le répertoire du projet (le parent du répertoire où se trouve ce script si le script est à la racine du projet)
$ProjectRoot = Get-ScriptDirectory
Set-Location -Path $ProjectRoot

Write-Host "--- Lancement de l'application Next.js via Docker ---" -ForegroundColor Green

# Demander à l'utilisateur le nom du fichier de variables d'environnement
$envFileName = Read-Host "Entrez le nom de votre fichier de variables d'environnement (ex: .env.production ou .env.local)"

# Vérifier si le fichier d'environnement existe
$envFilePath = Join-Path -Path $ProjectRoot -ChildPath $envFileName
if (-not (Test-Path $envFilePath -PathType Leaf)) {
    Write-Error "Erreur : Le fichier '$envFileName' n'a pas été trouvé dans le répertoire '$ProjectRoot'."
    Write-Host "Assurez-vous que le fichier existe et que vous avez tapé son nom correctement." -ForegroundColor Yellow
    exit 1
}

Write-Host "`nConstruction de l'image Docker 'your-nextjs-app'..." -ForegroundColor Cyan
# Construire l'image Docker
$buildResult = docker build -t your-nextjs-app .
if ($LASTEXITCODE -ne 0) {
    Write-Error "Erreur lors de la construction de l'image Docker. Veuillez vérifier les messages ci-dessus."
    exit 1
}
Write-Host "Construction de l'image Docker terminée avec succès." -ForegroundColor Green

Write-Host "`nDémarrage du conteneur Docker sur le port 3000..." -ForegroundColor Cyan
# Lancer le conteneur Docker
# Nous passons le chemin complet du fichier d'environnement au paramètre --env-file
$runResult = docker run -d -p 3000:3000 --env-file "$envFilePath" --name nextjs-app-container your-nextjs-app
if ($LASTEXITCODE -ne 0) {
    Write-Error "Erreur lors du démarrage du conteneur Docker. Veuillez vérifier les messages ci-dessus."
    Write-Host "Assurez-vous qu'aucun autre conteneur nommé 'nextjs-app-container' ne tourne déjà ou que le port 3000 n'est pas déjà utilisé." -ForegroundColor Yellow
    exit 1
}
Write-Host "Conteneur Docker 'nextjs-app-container' démarré avec succès." -ForegroundColor Green
Write-Host "L'application devrait être accessible à l'adresse : http://localhost:3000" -ForegroundColor Green
Write-Host "`nPour arrêter le conteneur ultérieurement, utilisez : docker stop nextjs-app-container" -ForegroundColor DarkGray
Write-Host "Pour supprimer le conteneur (après l'avoir arrêté) : docker rm nextjs-app-container" -ForegroundColor DarkGray
Write-Host "Pour voir les logs du conteneur : docker logs -f nextjs-app-container" -ForegroundColor DarkGray
