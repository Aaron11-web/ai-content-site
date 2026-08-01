# Architecture du site — Pages à trafic IA maximisé

---

## 1. Recherche : requêtes/thématiques les plus traitées par les IA (2026)

### Répartition des usages ChatGPT (source Sensor Tower / OpenAI, données 2025-2026)
| Catégorie | Part des requêtes |
|---|---|
| Recherche générale / questions factuelles | 36-37% |
| Développement logiciel / code | 14-29% (en baisse depuis 2024) |
| Recherche académique | 18-19% |
| Rédaction / amélioration de contenu (emails, articles) | 28% |
| Guidance pratique ("comment faire X") | 28-29% |
| Histoire & société | 15% |

**Répartition par intention (étude OpenAI, mai 2025)** : 49% "poser une question", 40% "faire" (rédaction, code, planification), 11% "explorer/discuter".

### Ce que confirme la recherche GEO (Generative Engine Optimization, étude Princeton/Georgia Tech/Wix AI Search Lab, 2026)
- Les contenus **> 20 000 caractères** sont cités **4,3x plus souvent** que les formats courts → privilégier des pages piliers longues plutôt que des fiches courtes
- **60%+ des pages citées** utilisent un balisage **JSON-LD structuré** (schema.org)
- Le comportement de citation **varie selon le secteur** : e-commerce, santé/bien-être, réparation à domicile, services professionnels, SaaS ont chacun des patterns différents
- Wikipédia = source n°1 citée par ChatGPT ; Reddit = source n°1 citée par Perplexity → le format "communautaire/référence" fonctionne bien
- La fraîcheur du contenu compte fortement sur les sujets sensibles à l'actualité

### Conclusion pour le site
Les catégories à plus fort volume de requêtes IA sont : **questions factuelles générales, guides "comment faire", définitions techniques, rédaction/exemples, comparatifs**. Ce sont ces formats qu'il faut prioriser.

---

## 2. Catégories retenues (multi-verticales)

1. **Tech / IA / Dev** — définitions, comparatifs d'outils, glossaire technique, snippets de code commentés
2. **Finance / Crypto** — définitions, conversions, comparatifs de plateformes, "comment faire X"
3. **Droit & démarches administratives** — délais légaux, définitions, procédures pas-à-pas
4. **Science & culture générale** — faits vérifiés, "pourquoi/comment ça marche", chiffres sourcés
5. **Pratique / Lifestyle** — recettes, conversions d'unités, calculs courants, DIY
6. **Rédaction & exemples de contenu** — templates d'emails, lettres types, structures de documents (aligné avec le plus gros usage réel de ChatGPT : la rédaction)

Chaque catégorie doit viser au moins une page "pilier" longue (20 000+ caractères) + un ensemble de pages courtes liées (longue traîne).

---

## 3. Architecture de rédaction — Template de page (à ne pas oublier)

### A. Metadata / Head
- [ ] `<title>` = question précise, sans fioriture
- [ ] `<meta description>` = réponse résumée en 1 phrase
- [ ] Balise `canonical`
- [ ] JSON-LD `schema.org` : `FAQPage`, `HowTo` ou `Article` selon le type
- [ ] `og:` tags (peu utile pour les bots IA mais utile pour le partage humain)
- [ ] Date de publication + date de mise à jour visibles (`datePublished`, `dateModified`)

### B. Structure du corps (HTML pré-rendu, zéro dépendance JS)
1. **H1** = la question exacte, formulée comme la tape un utilisateur
2. **Réponse directe** en 1-3 phrases immédiatement sous le H1 (zone la plus citée/extraite)
3. **Section développée** :
   - Contexte / définitions
   - Données chiffrées, statistiques sourcées
   - Tableau comparatif si pertinent
4. **Variantes de la question** (longue traîne) en H2, 3-5 par page, chacune avec sa mini-réponse
5. **Sources citées** (liens externes vers données primaires) — renforce la crédibilité perçue par les LLM
6. **Maillage interne** : 3-5 liens vers pages liées de la même catégorie (favorise le crawl profond = plus de pages facturables par visite de bot)
7. **FAQ finale** balisée en JSON-LD `FAQPage` (reprend les variantes de la section 4)

### C. Exigences techniques transversales
- [ ] HTML statique généré (Astro), aucun rendu conditionné au JS
- [ ] Temps de chargement minimal (pas d'images lourdes non optimisées)
- [ ] `robots.txt` explicitement ouvert aux crawlers IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
- [ ] `sitemap.xml` complet et à jour
- [ ] `llms.txt` (optionnel mais recommandé en 2026) résumant la structure du site pour les agents IA
- [ ] URLs propres et stables (pas de paramètres dynamiques)

### D. Configuration billing (hors rédaction, à ne pas oublier côté infra)
- [ ] Détection des bots via Cloudflare (Web Bot Auth / Pay Per Crawl)
- [ ] Prix par page défini (ex. 0,001$)
- [ ] Wallet de destination configuré (USDC / Base ou Solana)
- [ ] Dashboard de suivi des revenus par page/catégorie

---

### E. Images (à partir du lot 2 — catégories à forte composante visuelle)
- [ ] Emplacement d'image prévu dans le template (`page.image.src` / `alt` / `credit`)
- [ ] ⚠️ Ne jamais republier une image trouvée par recherche web sans certitude de licence — risque de copyright
- [ ] Sources sûres : photos personnelles, banques sous licence libre (ex. Pexels, Unsplash — vérifier la licence exacte), Wikimedia Commons pour les sujets factuels/scientifiques (vérifier la licence par image)
- [ ] `alt` toujours descriptif et informatif (pas décoratif) — c'est ce que ClaudeBot exploite le plus

## 4. Checklist de production par page (à cocher pour chaque contenu)

- [ ] Question formulée telle qu'un utilisateur la poserait
- [ ] Réponse directe en tête d'article
- [ ] Au moins 1 donnée chiffrée sourcée
- [ ] Balisage JSON-LD présent
- [ ] 3-5 variantes de la question traitées
- [ ] 3-5 liens internes vers contenus liés
- [ ] Date de mise à jour renseignée
- [ ] Vérifié : pas de dépendance JS pour afficher le contenu principal
