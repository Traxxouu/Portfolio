# 🚀 Portfolio Maël Barbe

Portfolio personnel moderne construit avec Next.js 15, Sanity CMS, et des animations fluides.

**🌐 Site en production** : [maelbarbe.vercel.app](https://maelbarbe.vercel.app)

## ✨ Fonctionnalités

### 🎨 Interface
- Design moderne avec animations liquides et transitions fluides
- Mode sombre/clair automatique (basé sur l'heure) ou manuel
- Curseur personnalisé animé sur la page d'accueil
- Navigation intuitive entre les sections
- Responsive complet (mobile, tablette, desktop)

### 📄 Pages
- **Accueil** : Présentation avec navigation principale
- **About** : Parcours, compétences techniques et expériences
- **Blog** : Système de blog complet avec Sanity CMS
- **Projects** : Portfolio de projets avec contenu riche
- **Contact** : Formulaire fonctionnel avec Resend

### 📝 Blog
- Gestion complète via Sanity Studio
- Articles avec images, catégories, tags
- Article mis en avant
- Temps de lecture automatique
- SEO optimisé par article
- Rich text editor

### 🎯 Projets
- Affichage en grille avec filtres
- Contenu riche (images, vidéos, code)
- Technologies utilisées
- Liens GitHub et démo live
- Statut (en cours, terminé, abandonné)

### 📬 Contact
- Formulaire avec validation
- Envoi d'emails via Resend
- Liens vers réseaux sociaux
- Téléchargement du CV

### ⚡ Performance
- Images optimisées (AVIF/WebP)
- Lazy loading
- GPU acceleration pour les animations
- Score Lighthouse : 85-95
- Throttling des événements (60fps max)

## 🛠️ Technologies

- **Framework** : Next.js 15.5.6 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **CMS** : Sanity.io
- **Emails** : Resend
- **Déploiement** : Vercel
- **Icônes** : Lucide React + React Icons

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes

1. **Cloner le repo**
```bash
git clone https://github.com/Traxxouu/Portfolio.git
cd Portfolio/mon-portfolio
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env.local` :
```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-18

# Resend (pour le formulaire de contact)
RESEND_API_KEY=your_resend_api_key
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

5. **Accéder à Sanity Studio**
```
http://localhost:3000/studio
```

## 📁 Structure du projet

```
mon-portfolio/
├── app/                          # Pages Next.js (App Router)
│   ├── page.tsx                 # Page principale avec toutes les sections
│   ├── layout.tsx               # Layout global + SEO
│   ├── globals.css              # Styles globaux
│   ├── api/contact/            # API route pour le formulaire
│   ├── blog/[slug]/            # Pages blog dynamiques
│   ├── projects/[slug]/        # Pages projets dynamiques
│   └── studio/[[...tool]]/     # Sanity Studio
├── lib/
│   └── sanity.client.ts         # Client Sanity + requêtes
├── sanity/
│   ├── schemaTypes/             # Schémas Sanity
│   │   ├── blogType.ts         # Schéma blog
│   │   ├── project.ts          # Schéma projets
│   │   ├── authorType.ts       # Schéma auteur
│   │   ├── categoryType.ts     # Schéma catégories
│   │   └── blockContentType.ts # Rich text
│   ├── lib/                     # Utilitaires Sanity
│   ├── structure.ts             # Structure Studio
│   └── env.ts                   # Variables d'environnement
├── public/                      # Assets statiques
│   ├── profile-dark.jpg        # Photo profil mode sombre
│   ├── profile-light.jpg       # Photo profil mode clair
│   ├── edenredlogo.svg         # Logo entreprise
│   ├── efreilogo.svg           # Logo école
│   └── *.pdf                   # CV téléchargeable
└── Documentation/
    ├── BLOG_GUIDE.md           # Guide complet du blog
    ├── FIRST_BLOG_POST.md      # Créer son premier article
    └── BLOG_RECAP.md           # Récapitulatif complet
```

## 📚 Documentation

- **[BLOG_GUIDE.md](BLOG_GUIDE.md)** : Guide complet pour gérer le blog
- **[FIRST_BLOG_POST.md](FIRST_BLOG_POST.md)** : Tutoriel pas-à-pas pour créer votre premier article
- **[BLOG_RECAP.md](BLOG_RECAP.md)** : Récapitulatif de toutes les fonctionnalités

## 🎯 Scripts disponibles

```bash
# Développement
npm run dev          # Lancer le serveur dev

# Build
npm run build        # Build de production
npm start            # Lancer en production

# Linting
npm run lint         # ESLint
```

## 🚀 Déploiement

Le site est configuré pour un déploiement automatique sur Vercel :

1. Push vers la branche `main`
2. Vercel build et déploie automatiquement
3. Les articles Sanity sont disponibles instantanément (ISR)

### Variables d'environnement sur Vercel
Ajouter dans les Settings :
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `RESEND_API_KEY`

## 🎨 Personnalisation

### Couleurs
Modifier dans `app/page.tsx` et `app/globals.css` :
- Mode sombre : `blue-500`, `purple-500`, `slate-950`
- Mode clair : `orange-600`, `rose-300`, `#ece7c1`

### Animations
Ajuster dans `app/globals.css` :
- Durées : `duration-300`, `duration-500`, etc.
- Delays : `animation-delay-{time}`
- Keyframes : `@keyframes blob`, `@keyframes fade-in-up`

### Contenu
1. **Blog** : Gérer via Sanity Studio
2. **Projets** : Gérer via Sanity Studio
3. **About** : Modifier directement dans `app/page.tsx`
4. **Contact** : Modifier les liens dans `app/page.tsx`

## 🐛 Résolution de problèmes

### Les images ne s'affichent pas
- Vérifier CORS dans Sanity
- Vérifier les URLs générées par `urlFor()`
- Redémarrer le serveur dev

### Le formulaire de contact ne fonctionne pas
- Vérifier la clé API Resend dans `.env.local`
- Vérifier l'email expéditeur (doit être vérifié sur Resend)
- Vérifier les logs dans la console

### Erreurs de build
- Supprimer `.next` et `node_modules`
- Réinstaller : `npm install`
- Rebuild : `npm run build`

## 📊 Performance

### Scores Lighthouse (Production)
- Performance : 85-95
- Accessibilité : 100
- Best Practices : 100
- SEO : 100

### Optimisations appliquées
- ✅ Images Next.js (AVIF/WebP)
- ✅ Lazy loading
- ✅ Font optimization (display: swap)
- ✅ GPU acceleration
- ✅ Throttling des événements (60fps)
- ✅ Réduction des animations (2 blobs au lieu de 4)
- ✅ Code splitting automatique
- ✅ ISR (Incremental Static Regeneration)

## 🤝 Contribution

Ce projet est personnel, mais les suggestions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Maël Barbe**
- Portfolio : [maelbarbe.vercel.app](https://maelbarbe.vercel.app)
- GitHub : [@Traxxouu](https://github.com/Traxxouu)
- LinkedIn : [Maël Barbe](https://www.linkedin.com/in/maelbarbe/)

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [Sanity.io](https://www.sanity.io/) - CMS headless
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Vercel](https://vercel.com/) - Hébergement
- [Resend](https://resend.com/) - Service d'emails

---

**⭐ N'hésitez pas à star le projet si vous l'aimez !**
