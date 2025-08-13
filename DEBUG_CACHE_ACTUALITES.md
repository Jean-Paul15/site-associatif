# Guide de résolution des problèmes de cache des actualités

## Problème identifié
Les actualités ne se mettent pas à jour après déploiement, même si elles fonctionnent correctement en local.

## Causes possibles
1. **Cache de Next.js** - Les pages sont mises en cache par défaut en production
2. **Cache de build statique** - Les données sont "bakées" au moment du build
3. **Cache navigateur** - Le navigateur garde en cache l'ancienne version
4. **Cache CDN** - Si vous utilisez un CDN, il peut garder l'ancienne version

## Solutions implémentées

### 1. Configuration Next.js
- Ajout de `revalidate = 60` pour revalider toutes les 60 secondes
- Ajout de `dynamic = 'force-dynamic'` pour éviter le cache statique
- Configuration des headers de cache dans `next.config.mjs`

### 2. Fallback de récupération
- Le composant `NewsSection` récupère les données directement depuis Supabase si elles sont vides
- Logs détaillés pour identifier les problèmes

### 3. API de revalidation
- Route `/api/revalidate` pour forcer la revalidation manuelle
- Utilisable avec `POST /api/revalidate`

### 4. Diagnostics
- Fonction `logEnvironmentInfo()` pour identifier l'environnement
- Fonction `logDataFreshness()` pour tracer la fraîcheur des données

## Tests à effectuer

### 1. Vérifier les logs en production
Après déploiement, vérifiez dans les logs de votre plateforme :
```
✅ Fetched X articles from server at [timestamp]
NewsSection initialized with: X items
```

### 2. Tester la revalidation manuelle
```bash
curl -X POST https://votre-site.com/api/revalidate
```

### 3. Vérifier le temps réel
Les modifications dans Supabase doivent apparaître immédiatement grâce aux WebSockets.

## Commandes de dépannage

### Forcer un nouveau build
```bash
npm run build
```

### Nettoyer le cache Next.js local
```bash
rm -rf .next
npm run build
```

### Vérifier les variables d'environnement
Assurez-vous que `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont correctement configurées en production.

## Si le problème persiste

1. Vérifiez que Supabase RLS (Row Level Security) permet la lecture publique des articles
2. Testez directement la connexion à Supabase depuis la production
3. Vérifiez les logs de votre plateforme de déploiement (Vercel, Netlify, etc.)
4. Utilisez les outils de développement du navigateur pour vérifier les appels réseau
