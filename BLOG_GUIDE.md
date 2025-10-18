# 📝 Blog - Guide d'utilisation

## Vue d'ensemble

Le blog est intégré au portfolio avec une gestion complète via Sanity CMS. Il offre une expérience de lecture moderne avec les mêmes animations fluides que le reste du site.

## Fonctionnalités

### 🎨 Interface

- **Page liste** : Grille responsive avec article mis en avant
- **Page article** : Layout magazine avec image pleine largeur
- **Animations** : Transitions liquides cohérentes avec le reste du site
- **Responsive** : Adapté à tous les écrans (mobile, tablette, desktop)
- **Mode sombre/clair** : Thème adaptatif automatique

### 📊 Schéma Sanity

Le schéma `blog` comprend :

- **Titre & Slug** : Identification de l'article
- **Extrait** : Résumé court (150-200 caractères)
- **Image principale** : Image de couverture avec texte alt
- **Catégories** : Classification par thèmes
- **Auteur** : Référence à l'auteur (avec photo)
- **Date de publication** : Avec tri automatique
- **Temps de lecture** : En minutes
- **Article mis en avant** : Booléen pour l'affichage prioritaire
- **Contenu** : Rich text avec `blockContent`
- **Tags** : Mots-clés pour le référencement
- **SEO** : Meta titre et description personnalisés

### 🎯 Affichage

#### Page liste (`/` → Blog)
- **Header** : Navigation avec boutons Accueil/Projets + toggle dark mode
- **Article vedette** : Layout 2 colonnes (image + contenu) si `featured: true`
- **Grille** : 3 colonnes desktop, 2 tablette, 1 mobile
- **Cards** : Image, catégories, titre, extrait, date, temps de lecture, tags
- **Animations** : Hover scale + translate-y, effet de delay progressif

#### Page article (`/blog/[slug]`)
- **Hero** : Image pleine largeur avec overlay gradient
- **Meta** : Auteur avec photo, date, temps de lecture
- **Contenu** : Typography optimisée avec Tailwind prose
- **Tags** : Liste en bas d'article
- **Auteur** : Carte "À propos" en fin d'article
- **CTA** : Bouton retour au blog

## 🛠️ Comment créer un article

### 1. Accéder à Sanity Studio

```bash
npm run dev
```

Puis ouvrir : `http://localhost:3000/studio`

### 2. Créer un article

1. Cliquer sur **"Blog Posts"** dans le menu
2. Cliquer sur **"+"** pour créer
3. Remplir les champs :

#### Obligatoires
- **Titre** : Titre accrocheur de l'article
- **Slug** : Généré automatiquement (cliquer sur "Generate")
- **Extrait** : 150-200 caractères pour la preview
- **Image principale** : Image de couverture (1200x800px recommandé)
  - Ajouter un texte alt pour l'accessibilité
- **Date de publication** : Par défaut = aujourd'hui
- **Temps de lecture** : Estimation en minutes
- **Contenu** : Corps de l'article (voir ci-dessous)

#### Optionnels
- **Catégories** : Sélectionner parmi les existantes (créer si besoin)
- **Auteur** : Vous-même (créer votre profil auteur)
- **Article mis en avant** : Cocher pour afficher en grand
- **Tags** : Mots-clés séparés (appuyez sur Entrée)
- **SEO** : Meta titre et description personnalisés

### 3. Rédiger le contenu

Le champ "Contenu" utilise le **Rich Text Editor** de Sanity :

#### Styles disponibles
- **Titres** : H2, H3, H4
- **Paragraphes** : Texte normal
- **Gras** : Texte important
- **Italique** : Emphase
- **Liens** : URL externes ou internes
- **Listes** : À puces ou numérotées
- **Citations** : Blockquote
- **Code** : Inline ou bloc

#### Insertion d'images
1. Cliquer sur l'icône image
2. Upload ou sélectionner depuis la bibliothèque
3. Ajouter un texte alt
4. L'image s'affiche en pleine largeur dans l'article

### 4. Publier

1. Cliquer sur **"Publish"** en haut à droite
2. L'article apparaît immédiatement sur le site
3. Vous pouvez le modifier à tout moment

## 🎨 Bonnes pratiques

### Images
- **Format** : JPEG pour photos, PNG pour illustrations
- **Résolution** : 1200x800px minimum pour l'image principale
- **Poids** : < 500KB (Sanity optimise automatiquement)
- **Alt text** : Toujours remplir pour l'accessibilité

### Contenu
- **Extrait** : Phrase accrocheuse qui donne envie de lire
- **Titres** : Hiérarchie claire (H2 pour sections, H3 pour sous-sections)
- **Paragraphes** : Courts (3-4 lignes max) pour la lisibilité
- **Longueur** : 5-15 minutes de lecture idéal

### SEO
- **Meta titre** : 50-60 caractères avec mot-clé principal
- **Meta description** : 150-160 caractères engageants
- **Tags** : 3-5 tags pertinents maximum
- **Slug** : Court, descriptif, sans caractères spéciaux

### Article mis en avant
- **Choisir** : Votre meilleur article ou le plus récent
- **Attention** : Un seul à la fois pour l'impact visuel
- **Vérifier** : Que l'image soit particulièrement belle

## 🚀 Déploiement

Les articles sont automatiquement disponibles après publication dans Sanity :

1. **Sanity Studio** → Publier l'article
2. **Next.js** → Récupère automatiquement (ISR)
3. **Vercel** → Affiche sur le site en production

Pas besoin de rebuild ou redéploiement ! 🎉

## 📱 Responsive

L'affichage s'adapte automatiquement :

### Mobile (< 640px)
- Grille 1 colonne
- Article vedette empilé (image en haut)
- Texte optimisé pour la lecture

### Tablette (640px - 1024px)
- Grille 2 colonnes
- Article vedette côte à côte

### Desktop (> 1024px)
- Grille 3 colonnes
- Article vedette large format
- Animations hover complètes

## 🎭 Animations

### Page liste
- **Fade in** : Apparition progressive
- **Delay progressif** : Cards apparaissent une par une
- **Hover** : Scale 1.05 + translate-y -8px
- **Image** : Scale 1.1 au survol

### Page article
- **Hero** : Parallax subtil sur l'image
- **Prose** : Typography fluide et lisible
- **Transitions** : Smooth entre les sections

## 🔧 Personnalisation

### Modifier les couleurs
Dans `app/blog/[slug]/page.tsx`, modifier les classes Tailwind :
- `blue-500` → Votre couleur principale
- `slate-950` → Votre fond
- `gray-300` → Votre texte

### Ajouter des composants custom
Dans `blockContentType.ts`, ajouter de nouveaux types de blocs :
```typescript
{
  name: 'customComponent',
  type: 'object',
  fields: [...]
}
```

### Modifier la typography
Dans `page.tsx`, ajuster les classes `prose-*` :
```tsx
prose-h2:text-4xl  // Plus grand
prose-p:text-lg    // Plus lisible
```

## 📈 Analytics

Pour suivre les performances de vos articles :

1. Ajouter Google Analytics
2. Tracker les clics sur les articles
3. Mesurer le temps de lecture réel
4. Analyser les pages les plus consultées

## 🐛 Dépannage

### L'article n'apparaît pas
- Vérifier qu'il est bien publié dans Sanity
- Vérifier le slug (pas d'espaces, caractères spéciaux)
- Attendre 30s pour l'ISR de Next.js

### Image ne s'affiche pas
- Vérifier que `mainImage` est bien rempli
- Vérifier les permissions Sanity (CORS)
- Tester l'URL de l'image directement

### Erreur 404
- Vérifier que le slug correspond exactement
- Vérifier que le dossier `[slug]` existe
- Redémarrer le serveur dev

## 📚 Ressources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Portable Text](https://portabletext.org/)
- [Next.js ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)
