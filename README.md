# Site de contenu à trafic IA maximisé

## Installation (à faire en local, connexion internet requise)

```bash
npm install
npm run dev      # aperçu local sur http://localhost:4321
npm run build    # génère le site statique dans dist/
```

## Structure

```
src/
  data/categories.json   ← toute la base de contenu (catégories + pages Q&A)
  layouts/BaseLayout.astro
  pages/
    index.astro                 → page d'accueil
    [category]/index.astro      → liste des questions d'une catégorie
    [category]/[slug].astro     → page de détail (template complet)
  styles/global.css
public/
  robots.txt   ← ouvert aux crawlers IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
  llms.txt     ← résumé de site pour agents IA
```

## Ajouter du contenu

Toute la production éditoriale se fait dans **`src/data/categories.json`**.
Ajouter un objet dans `pages` avec :
- `category`, `slug`, `question`
- `directAnswer` (1-3 phrases, c'est la zone la plus citée par les IA)
- `context`, `dataPoints` (chiffres sourcés)
- `variants` (questions longue traîne)
- `sources`, `related` (slugs d'autres pages)

Chaque nouvelle page est générée automatiquement au build (aucune ligne de code à toucher).
Se référer à `html.md` (fourni précédemment) pour la checklist complète avant publication.

## Déploiement (Cloudflare Workers + Static Assets)

Cloudflare recommande désormais **Workers + Static Assets** plutôt que Pages (Pages est en voie d'être legacy). Le projet est déjà configuré (`wrangler.jsonc`) :

```bash
npx wrangler login   # une seule fois, ouvre une fenêtre de connexion
npm run deploy        # build Astro + wrangler deploy
```

Cette étape nécessite une connexion internet et un compte Cloudflare avec un domaine ajouté — je ne peux pas l'exécuter à ta place depuis mon environnement (pas d'accès réseau sortant, et le connecteur Cloudflare disponible ici est en lecture seule).

## Mise en place de la facturation des bots IA (hors périmètre du code)

Ce projet génère uniquement le site statique. La facturation par visite se configure côté infrastructure, une fois le site déployé :

1. Déployer le site via Workers (voir ci-dessus) ou en connectant ton domaine au proxy DNS Cloudflare
2. Activer **Pay Per Crawl** / **Web Bot Auth** dans le dashboard Cloudflare (pas accessible via API pour le moment)
3. Définir le prix par page (ex. 0,001 $)
4. Renseigner le wallet de destination (USDC, Base ou Solana)
5. Vérifier que `robots.txt` autorise bien les bots que vous souhaitez facturer plutôt que bloquer

## Prochaines étapes suggérées

- Enrichir `categories.json` avec davantage de pages par catégorie (viser des pages piliers > 20 000 caractères pour les sujets phares)
- Générer un `sitemap.xml` automatique (plugin `@astrojs/sitemap`)
- Ajouter un système de suivi des visites bot vs humain
