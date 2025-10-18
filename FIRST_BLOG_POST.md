# 🚀 Créer votre premier article de blog

## Étape 1 : Accéder à Sanity Studio

1. Démarrer le serveur de développement :
```bash
npm run dev
```

2. Ouvrir le Studio Sanity :
```
http://localhost:3000/studio
```

## Étape 2 : Créer un auteur (si ce n'est pas déjà fait)

1. Dans le menu de gauche, cliquer sur **"Authors"**
2. Cliquer sur le bouton **"+"** (en haut à droite)
3. Remplir :
   - **Name** : Votre nom (ex: "Maël Barbe")
   - **Slug** : Cliquer sur "Generate" (ex: "mael-barbe")
   - **Image** : Upload votre photo de profil
   - **Bio** : Courte description (optionnel)
4. Cliquer sur **"Publish"**

## Étape 3 : Créer des catégories

1. Cliquer sur **"Categories"** dans le menu
2. Créer quelques catégories (exemples) :
   - **JavaScript** (slug: javascript)
   - **React** (slug: react)
   - **Développement Web** (slug: developpement-web)
   - **Tutoriels** (slug: tutoriels)
3. **Publish** chaque catégorie

## Étape 4 : Créer votre premier article

1. Cliquer sur **"Blog Posts"** dans le menu
2. Cliquer sur **"+"**
3. Remplir les champs :

### 📝 Informations de base

**Titre** :
```
Mon premier article : Les bases de React
```

**Slug** :
- Cliquer sur "Generate" → génère automatiquement `mon-premier-article-les-bases-de-react`

**Extrait** :
```
Découvrez les fondamentaux de React, la bibliothèque JavaScript la plus populaire pour créer des interfaces utilisateur modernes et réactives.
```

### 🖼️ Image principale

1. Cliquer sur "Upload" ou faire glisser une image
2. Choisir une belle image de couverture (1200x800px recommandé)
3. Remplir le **texte alternatif** :
```
Illustration représentant le logo de React sur un fond moderne
```

### 🏷️ Classification

**Catégories** :
- Sélectionner "React" et "Développement Web"

**Auteur** :
- Sélectionner votre nom (créé à l'étape 2)

**Tags** :
- Taper "React" puis Entrée
- Taper "JavaScript" puis Entrée
- Taper "Frontend" puis Entrée

### ⏰ Timing

**Date de publication** :
- Laisser la date du jour (déjà rempli)

**Temps de lecture** :
- Entrer `7` (minutes)

**Article mis en avant** :
- ✅ Cocher cette case pour votre premier article

### ✍️ Contenu

Voici un exemple de contenu à copier-coller :

```
Introduction
React a révolutionné la façon dont nous construisons des applications web modernes. Dans cet article, nous allons explorer les concepts fondamentaux.

Qu'est-ce que React ?
React est une bibliothèque JavaScript développée par Facebook pour créer des interfaces utilisateur. Son approche basée sur les composants permet de créer des applications modulaires et maintenables.

Les composants
Un composant React est comme une brique de construction réutilisable. Voici un exemple simple :

function Welcome(props) {
  return <h1>Bonjour, {props.name}</h1>;
}

Les avantages principaux :
- Réutilisabilité du code
- Performance optimale grâce au Virtual DOM
- Écosystème riche et communauté active
- Facile à apprendre et à utiliser

Le Virtual DOM
Le Virtual DOM est une représentation en mémoire du DOM réel. React l'utilise pour optimiser les mises à jour et améliorer les performances.

État et Props
- Props : Données passées d'un parent à un enfant (immutables)
- État : Données internes au composant (mutables)

Conclusion
React continue d'évoluer et reste un choix excellent pour le développement frontend moderne. N'hésitez pas à explorer sa documentation officielle pour aller plus loin !
```

**Conseil** : Utilisez les boutons de formatage en haut pour :
- Transformer des lignes en **titres** (H2, H3)
- Mettre en **gras** ou *italique*
- Créer des **listes**
- Ajouter des **citations**
- Insérer du **code**

### 🎯 SEO (optionnel mais recommandé)

**Meta Titre** :
```
Les bases de React : Guide complet pour débutants
```

**Meta Description** :
```
Apprenez les fondamentaux de React : composants, props, state et Virtual DOM. Guide pratique avec exemples pour démarrer rapidement.
```

## Étape 5 : Publier

1. Cliquer sur **"Publish"** (bouton vert en haut à droite)
2. Votre article est maintenant en ligne ! 🎉

## Étape 6 : Voir votre article

1. Aller sur votre portfolio : `http://localhost:3000`
2. Cliquer sur le bouton **"Blog"**
3. Votre article apparaît en grand format (article mis en avant)
4. Cliquer dessus pour voir la page complète

## 💡 Conseils pour vos prochains articles

### Idées de sujets

**Tutoriels techniques** :
- "Comment créer une API REST avec Node.js"
- "Les 10 hooks React les plus utiles"
- "Guide complet du CSS Grid"

**Retours d'expérience** :
- "Mon premier projet freelance : leçons apprises"
- "Comment j'ai optimisé les performances de mon site"
- "5 erreurs de débutant que j'ai faites"

**Veille technologique** :
- "Les nouveautés de Next.js 15"
- "Pourquoi TypeScript change la donne"
- "Tendances du développement web en 2025"

**Projets** :
- "Création d'un portfolio moderne avec Next.js"
- "Build d'une app de chat en temps réel"
- "De l'idée au déploiement : mon processus"

### Structure recommandée

1. **Introduction** : Contexte et promesse
2. **Problème** : Quel problème résolvez-vous ?
3. **Solution** : Votre approche étape par étape
4. **Code/Exemples** : Illustrations concrètes
5. **Résultats** : Ce qu'on obtient
6. **Conclusion** : Récapitulatif et call-to-action

### Longueur idéale

- **Article court** : 3-5 minutes (800-1200 mots)
- **Article moyen** : 7-10 minutes (1800-2500 mots)
- **Article long** : 15+ minutes (3500+ mots)

### Images

- **Hero image** : 1200x800px minimum
- **Images dans le contenu** : 800x600px
- **Format** : JPEG pour photos, PNG pour screenshots
- **Compression** : Utiliser TinyPNG ou similaire

### SEO

- **URL** : Courte et descriptive
- **Titre** : Mot-clé principal au début
- **Description** : Incitative, 150-160 caractères
- **Images** : Alt text descriptif
- **Liens** : Internes et externes pertinents

## 🎨 Markdown disponible

Lors de la rédaction, vous pouvez utiliser :

- `**gras**` → **gras**
- `*italique*` → *italique*
- `[lien](url)` → lien cliquable
- `` `code` `` → `code inline`
- `> citation` → blockquote
- `- liste` → liste à puces
- `1. liste` → liste numérotée

## 📊 Suivi

Pour suivre les performances de vos articles :

1. **Google Analytics** : Installer pour voir le trafic
2. **Search Console** : Suivre le référencement
3. **Sanity** : Voir les articles les plus modifiés
4. **Feedback** : Ajouter une section commentaires (optionnel)

## 🆘 Besoin d'aide ?

Consultez le fichier `BLOG_GUIDE.md` pour plus de détails sur :
- Personnalisation du design
- Ajout de composants custom
- Résolution de problèmes courants
- Meilleures pratiques SEO

Bon blogging ! ✨
