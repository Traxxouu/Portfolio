# 🚀 Portfolio Maël - Guide Complet Sanity CMS

## ✅ Installation Terminée !

Ton portfolio est maintenant configuré avec Sanity CMS !

### 📊 Informations importantes

**Project ID Sanity :** `i5k5disy`  
**Dataset :** `production`  
**API Version :** `2024-10-18`

---

## 🎨 Accéder au Studio Sanity (Admin)

Ton studio est accessible localement sur : **http://localhost:3000/studio**

Pour déployer ton studio en ligne (accessible partout) :
```bash
cd sanity
npx sanity deploy
```

Choisis un nom (ex: `mael-portfolio`) et ton studio sera sur : `https://mael-portfolio.sanity.studio`

---

## ✍️ Ajouter un projet dans Sanity

1. Va sur http://localhost:3000/studio (ou ton studio déployé)
2. Connecte-toi avec ton compte GitHub
3. Clique sur **"Projets"** dans le menu de gauche
4. Clique sur **"Create"** (bouton bleu en haut à droite)
5. Remplis les champs :

### Exemple de projet

| Champ | Valeur Exemple |
|-------|----------------|
| **Titre** | Portfolio Interactif |
| **Slug** | Clique sur "Generate" |
| **Emoji** | 🚀 |
| **Description** | Site portfolio moderne avec animations fluides, transitions liquides et effets interactifs. Construit avec Next.js et Tailwind CSS. |
| **Technologies** | `Next.js`, `TypeScript`, `Tailwind CSS`, `Framer Motion` |
| **Statut** | Terminé |
| **Gradient (départ)** | `blue-500` |
| **Gradient (arrivée)** | `purple-500` |
| **Ordre** | `1` |
| **URL GitHub** | https://github.com/ton-username/ton-repo |
| **URL du site** | https://ton-site.vercel.app |

6. Clique sur **"Publish"** (bouton vert en bas à droite)

---

## 🎨 Couleurs Gradient Disponibles

Pour les champs "Gradient (départ)" et "Gradient (arrivée)", utilise ces valeurs :

- `blue-500` / `purple-500` → Bleu vers Violet
- `green-500` / `teal-500` → Vert vers Turquoise
- `pink-500` / `rose-500` → Rose vers Rouge rosé
- `orange-500` / `yellow-500` → Orange vers Jaune
- `purple-500` / `pink-500` → Violet vers Rose
- `cyan-500` / `blue-500` → Cyan vers Bleu

---

## 🌐 Voir tes projets sur le site

1. Lance ton site en local : `npm run dev`
2. Va sur http://localhost:3000
3. Clique sur **"Projects"** dans la navigation
4. Tes projets Sanity s'affichent automatiquement !

---

## 🔒 Configuration CORS (Important pour la production)

Quand tu vas déployer sur Vercel, il faut autoriser ton domaine dans Sanity :

1. Va sur https://sanity.io/manage
2. Sélectionne ton projet "Portfolio Mael"
3. **API** → **CORS Origins**
4. Ajoute ces URLs :
   - `http://localhost:3000` (déjà fait automatiquement)
   - `https://ton-domaine.vercel.app` (à ajouter après le déploiement)
5. Coche **"Allow credentials"**

---

## ☁️ Déployer sur Vercel (GRATUIT)

### 1. Push ton code sur GitHub

```bash
git add .
git commit -m "Portfolio avec Sanity CMS intégré"
git push
```

### 2. Déployer sur Vercel

1. Va sur https://vercel.com
2. Clique sur **"Import Project"**
3. Sélectionne ton repo GitHub
4. **Environment Variables** → Ajoute :
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `i5k5disy`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION` = `2024-10-18`
5. Clique sur **"Deploy"**

---

## 📁 Structure des fichiers créés

```
mon-portfolio/
├── .env.local                    ← Variables d'environnement
├── sanity.cli.ts                 ← Configuration CLI Sanity
├── sanity.config.ts              ← Configuration Studio
├── lib/
│   └── sanity.client.ts          ← Client Sanity pour Next.js
├── sanity/
│   ├── env.ts                    ← Variables d'environnement Sanity
│   ├── structure.ts              ← Structure du studio
│   └── schemaTypes/
│       ├── index.ts              ← Export des schémas
│       └── project.ts            ← Schéma "Projets"
└── app/
    ├── page.tsx                  ← Page principale (modifiée)
    └── studio/
        └── [[...tool]]/
            └── page.tsx          ← Page du Studio Sanity
```

---

## 🛠️ Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le site en local (http://localhost:3000) |
| `npm run build` | Build le site pour la production |
| `npm start` | Lance le site en production |
| `cd sanity && npx sanity deploy` | Déploie le studio Sanity |
| `cd sanity && npx sanity manage` | Ouvre le dashboard Sanity |

---

## 🐛 Problèmes courants

### Les projets ne s'affichent pas ?

1. Vérifie que tu as bien publié des projets dans Sanity Studio
2. Vérifie que les variables d'environnement sont correctes dans `.env.local`
3. Ouvre la console du navigateur (F12) pour voir les erreurs
4. Vérifie que le CORS est bien configuré sur https://sanity.io/manage

### Le studio ne charge pas ?

1. Vérifie que tu as bien run `npm install`
2. Vérifie que le Project ID est correct dans `.env.local`
3. Essaye de redémarrer le serveur : Ctrl+C puis `npm run dev`

### Erreur "Module not found" ?

```bash
rm -rf node_modules .next
npm install
npm run dev
```

---

## 📚 Ressources

- **Documentation Sanity :** https://www.sanity.io/docs
- **Documentation Next.js :** https://nextjs.org/docs
- **Dashboard Sanity :** https://sanity.io/manage
- **Ton Studio local :** http://localhost:3000/studio

---

## 🎉 C'est terminé !

Ton portfolio est maintenant complètement fonctionnel avec :
- ✅ Site public sur Next.js
- ✅ CMS Sanity pour gérer tes projets
- ✅ Studio admin séparé (aucun bouton login visible sur le site public)
- ✅ Gratuit jusqu'à 3 utilisateurs et 100k requêtes/mois

**Prochain step :** Ajoute tes projets dans le studio et déploie sur Vercel !

---

**Made with ❤️ by Maël**
