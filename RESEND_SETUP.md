# 📧 Configuration Resend - Formulaire de Contact

## ✅ Ce qui a été fait

### 1. Installation
```bash
npm install resend
```

### 2. Fichiers créés/modifiés

#### ✨ `app/api/contact/route.ts`
- API route pour gérer l'envoi des emails
- Validation des données
- Email HTML stylisé avec informations du visiteur
- Gestion des erreurs

#### ✨ `app/page.tsx`
- Nouvelle page "Contact" avec formulaire complet
- États pour gérer le formulaire (formData, formStatus, formMessage)
- Fonction `handleSubmitContact()` pour l'envoi
- Formulaire avec champs : Nom, Email, Message
- Réseaux sociaux : LinkedIn, GitHub, Instagram, Twitch
- Email direct cliquable
- Design responsive et moderne

#### ✨ `.env.local`
```env
RESEND_API_KEY=your_resend_api_key_here
```

---

## 🚀 Prochaines étapes (À FAIRE)

### Étape 1 : Créer un compte Resend

1. Va sur **https://resend.com**
2. Clique sur **"Start Building"**
3. Inscris-toi avec ton email ou GitHub
4. Confirme ton email

### Étape 2 : Obtenir ta clé API

1. Dans le dashboard Resend, clique sur **"API Keys"** (menu de gauche)
2. Clique sur **"Create API Key"**
3. Nomme-la : `Portfolio Production`
4. Permission : **Full Access**
5. **COPIE LA CLÉ** (tu ne pourras la voir qu'une fois !)

### Étape 3 : Ajouter la clé dans .env.local

Ouvre ton fichier `.env.local` et remplace :
```env
RESEND_API_KEY=your_resend_api_key_here
```

Par :
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
```
(Ta vraie clé API Resend)

### Étape 4 : Redémarrer le serveur

**Important** : Il faut redémarrer le serveur pour que les variables d'environnement soient prises en compte !

```bash
# Arrête le serveur (Ctrl+C dans le terminal)
# Puis relance :
npm run dev
```

### Étape 5 : Tester le formulaire

1. Va sur http://localhost:3000
2. Clique sur **"Contact"** dans la navigation
3. Remplis le formulaire :
   - Nom : Test
   - Email : ton_email@gmail.com
   - Message : Ceci est un test !
4. Clique sur **"Envoyer le message"**
5. Vérifie ta boîte mail **pro.mael.dev@gmail.com**

---

## 📋 Fonctionnalités du formulaire

### ✨ Expérience utilisateur

- **Validation en temps réel** (champs requis)
- **États visuels** :
  - `idle` : Formulaire prêt
  - `sending` : Spinner pendant l'envoi
  - `success` : Message de confirmation vert
  - `error` : Message d'erreur rouge
- **Réinitialisation automatique** après succès
- **Design responsive** (mobile, tablet, desktop)
- **Animations fluides** sur les inputs et boutons
- **Hover effects** sur tous les éléments interactifs

### 📧 Email reçu

L'email que tu recevras contient :
- **Sujet** : `Nouveau message de [NOM] - Portfolio`
- **De** : `Portfolio Contact <onboarding@resend.dev>`
- **Répondre à** : L'email du visiteur (pour répondre directement)
- **Contenu HTML** avec :
  - Nom du visiteur
  - Email du visiteur
  - Message complet
  - Design professionnel avec couleurs

### 🌐 Réseaux sociaux affichés

- **LinkedIn** : https://www.linkedin.com/in/maël-barbe-44a91b290/
- **GitHub** : https://github.com/Traxxouu
- **Instagram** : https://www.instagram.com/mael_barbe/
- **Twitch** : https://www.twitch.tv/traxxou_
- **Email** : pro.mael.dev@gmail.com (cliquable)

---

## 🐛 Dépannage

### Le bouton "Envoyer" ne fait rien ?
- Vérifie la console du navigateur (F12)
- Vérifie les logs dans le terminal
- Assure-toi que tous les champs sont remplis

### Erreur "Invalid API Key" ?
- Ta clé Resend n'est pas configurée correctement
- Vérifie `.env.local`
- **Redémarre le serveur** après avoir modifié `.env.local`

### L'email n'arrive pas ?
1. Vérifie ta boîte spam
2. Va sur https://resend.com/logs pour voir les logs d'envoi
3. Vérifie que ta clé API est valide
4. Assure-toi que l'email `pro.mael.dev@gmail.com` est correct

### Erreur CORS ou fetch failed ?
- L'API route doit être dans `app/api/contact/route.ts`
- Vérifie que le serveur Next.js tourne bien

---

## 💡 Limites gratuites Resend

- ✅ **3000 emails/mois gratuits**
- ✅ **100 emails/jour**
- ✅ Parfait pour un portfolio personnel

---

## 🎨 Personnalisation

### Changer l'email de réception

Dans `app/api/contact/route.ts`, ligne 20 :
```ts
to: ['pro.mael.dev@gmail.com'], // ← Change ici
```

### Changer l'expéditeur (si tu as un domaine)

Si tu possèdes un domaine (ex: `maelbarbe.com`) :

1. Configure-le dans Resend (Dashboard > Domains)
2. Dans `app/api/contact/route.ts`, ligne 19 :
```ts
from: 'Portfolio Contact <contact@tondomaine.com>',
```

### Ajouter d'autres réseaux sociaux

Dans `app/page.tsx`, section "Réseaux sociaux", ajoute :
```tsx
<a href="https://twitter.com/ton_twitter" ...>
  <Twitter size={32} />
  <span>Twitter</span>
</a>
```

---

## 📦 Déploiement sur Vercel

Quand tu déploies sur Vercel :

1. Va dans **Settings** > **Environment Variables**
2. Ajoute :
   - **Key** : `RESEND_API_KEY`
   - **Value** : `re_xxxxxxxxxxxxxx` (ta clé Resend)
   - **Environments** : Production, Preview, Development
3. Redéploie ton site

---

## ✅ Checklist finale

- [ ] Compte Resend créé
- [ ] Clé API générée et copiée
- [ ] Clé ajoutée dans `.env.local`
- [ ] Serveur redémarré
- [ ] Page Contact accessible
- [ ] Formulaire testé et fonctionne
- [ ] Email de test reçu sur `pro.mael.dev@gmail.com`
- [ ] Liens réseaux sociaux vérifiés
- [ ] Tout fonctionne en local

---

## 🎉 C'est prêt !

Une fois que tu as ta clé API Resend et que tu l'as ajoutée dans `.env.local`, ton formulaire de contact est **100% fonctionnel** !

Les visiteurs pourront t'envoyer des messages directement depuis ton portfolio, et tu recevras tout sur **pro.mael.dev@gmail.com**.

**Gratuit** et **illimité** (jusqu'à 3000 emails/mois) ! 🚀

---

**Made with ❤️ by Maël**
