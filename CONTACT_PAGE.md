# 📧 Page Contact - Guide Complet

## ✅ Ce qui a été créé

### 🎨 Page Contact Moderne

Une page de contact professionnelle avec :

#### 📝 Formulaire de contact
- **3 champs** : Nom, Email, Message
- **Validation en temps réel**
- **États visuels** :
  - ⚪ Idle (prêt)
  - 🔵 Sending (envoi en cours avec spinner)
  - ✅ Success (confirmation verte)
  - ❌ Error (erreur rouge)
- **Design responsive** (mobile, tablet, desktop)
- **Animations fluides** sur focus et hover
- **Auto-reset** après envoi réussi

#### 🌐 Réseaux Sociaux

Grid 2x2 avec cartes interactives :

| LinkedIn | GitHub |
|----------|---------|
| **Instagram** | **Twitch** |

Chaque carte :
- **Icône animée** (scale + lift au hover)
- **Bordure colorée** selon le réseau
- **Ombre dynamique** au hover
- **Lien direct** vers le profil

Liens configurés :
- **LinkedIn** : https://www.linkedin.com/in/maël-barbe-44a91b290/
- **GitHub** : https://github.com/Traxxouu
- **Instagram** : https://www.instagram.com/mael_barbe/
- **Twitch** : https://www.twitch.tv/traxxou_

#### 📮 Contact Direct

Carte avec email cliquable :
- **Icône Mail**
- **Email** : pro.mael.dev@gmail.com
- **Lien mailto** pour ouvrir client email

#### 💬 Citation motivante

Texte inspirant en bas de page

---

## 🛠️ Architecture Technique

### Fichiers créés

```
mon-portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         ← API route Resend
│   └── page.tsx                 ← Page Contact ajoutée
├── .env.local                   ← RESEND_API_KEY ajoutée
├── RESEND_SETUP.md              ← Guide setup Resend
└── ANIMATION_IMPROVEMENTS.md    ← Doc animations
```

### Dépendances installées

```json
{
  "resend": "^x.x.x"
}
```

### Variables d'environnement

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=i5k5disy
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-18

# Resend (Formulaire de contact)
RESEND_API_KEY=your_resend_api_key_here  ← À CONFIGURER
```

---

## 🚀 Pour que ça fonctionne

### 1️⃣ Créer un compte Resend

1. Va sur https://resend.com
2. Inscris-toi (gratuit)
3. Confirme ton email

### 2️⃣ Générer une clé API

1. Dashboard Resend > **API Keys**
2. **Create API Key**
3. Nom : `Portfolio Production`
4. Permission : **Full Access**
5. **COPIE LA CLÉ** (re_xxxxxxxxx)

### 3️⃣ Configurer .env.local

Ouvre `.env.local` et remplace :
```env
RESEND_API_KEY=your_resend_api_key_here
```

Par :
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4️⃣ Redémarrer le serveur

**IMPORTANT** : Pour que Next.js prenne en compte la nouvelle variable :

```bash
# Arrête le serveur (Ctrl+C)
# Puis relance :
npm run dev
```

### 5️⃣ Tester

1. Va sur http://localhost:3000
2. Clique sur **"Contact"**
3. Remplis et envoie le formulaire
4. Vérifie **pro.mael.dev@gmail.com**

---

## 📧 Email reçu

Quand quelqu'un envoie un message, tu reçois un email HTML stylisé avec :

```
📬 Sujet : Nouveau message de [NOM] - Portfolio

👤 Nom : John Doe
📧 Email : john@example.com

💬 Message :
Salut Maël ! J'ai vu ton portfolio et j'aimerais
discuter d'un projet avec toi...

---
Tu peux répondre directement en cliquant sur "Répondre"
```

Le `replyTo` est configuré sur l'email du visiteur, donc tu peux **répondre directement** depuis ta boîte Gmail !

---

## 🎨 Design & UX

### Couleurs

| Mode | Formulaire | Bouton Submit | Bordures |
|------|-----------|---------------|----------|
| **Dark** | Slate 900/50 | Blue 500/20 | Purple 500/30 |
| **Light** | White/50 | Orange 500/20 | Orange 200/40 |

### Animations

- **FadeIn** : Tous les éléments (délais échelonnés)
- **Scale** : Inputs au focus (1.02)
- **Lift** : Cartes réseaux sociaux (-translate-y-1)
- **Hover glow** : Ombres colorées dynamiques
- **Spinner** : Rotation pendant l'envoi

### Responsive

| Breakpoint | Layout | Formulaire |
|------------|--------|------------|
| Mobile | 1 colonne | Full width |
| Tablet | 1 colonne | Full width |
| Desktop | 2 colonnes | 50% width |

---

## 🔒 Sécurité

### Validation côté serveur

```ts
// Dans app/api/contact/route.ts
if (!name || !email || !message) {
  return NextResponse.json(
    { error: 'Tous les champs sont requis' },
    { status: 400 }
  );
}
```

### Protection API Key

- `RESEND_API_KEY` est **côté serveur uniquement**
- Jamais exposée au client
- Stockée dans `.env.local` (ignoré par git)

### CORS

- API route Next.js = pas de problèmes CORS
- Requêtes depuis le même domaine

---

## 💰 Coûts

### Resend (Email)

- ✅ **GRATUIT** : 3000 emails/mois
- ✅ **GRATUIT** : 100 emails/jour
- ✅ **GRATUIT** : API illimitée
- ✅ **Parfait** pour un portfolio

### Vercel (Hébergement)

- ✅ **GRATUIT** : Hobby plan
- ✅ **GRATUIT** : Domaine .vercel.app
- ✅ **GRATUIT** : SSL automatique
- ✅ **GRATUIT** : Déploiements illimités

**Total : 0€ / mois** 🎉

---

## 🐛 Dépannage rapide

### Le formulaire ne s'envoie pas

**Vérifier dans l'ordre :**

1. Console navigateur (F12) → Erreurs ?
2. Terminal Next.js → Erreurs API ?
3. `.env.local` → Clé Resend correcte ?
4. Serveur redémarré après modif `.env.local` ?
5. Tous les champs remplis ?

### L'email n'arrive pas

1. Check boîte **spam** de pro.mael.dev@gmail.com
2. Va sur https://resend.com/logs
3. Vérifie les logs d'envoi
4. Vérifie que ta clé API est valide

### Erreur "Invalid API Key"

```bash
# 1. Vérifie .env.local
cat .env.local

# 2. Redémarre le serveur
# Ctrl+C puis :
npm run dev

# 3. Teste à nouveau
```

---

## 📊 Statistiques d'usage

Tu peux suivre tes emails sur le dashboard Resend :

- **Nombre d'emails envoyés**
- **Taux de délivrabilité**
- **Logs détaillés**
- **Erreurs éventuelles**

Dashboard : https://resend.com/emails

---

## 🎯 Prochaines améliorations possibles

### Version 1.1 (Optionnel)

- [ ] **Captcha** pour éviter le spam (Google reCAPTCHA)
- [ ] **Honeypot** field (piège à bots)
- [ ] **Rate limiting** (limiter à X emails/IP/jour)
- [ ] **Email de confirmation** au visiteur
- [ ] **Template email** personnalisé avec logo
- [ ] **Domaine custom** (contact@tondomaine.com)
- [ ] **Upload de fichiers** (CV, portfolio PDF)
- [ ] **Dropdown** "Sujet du message"

### Version 2.0 (Avancé)

- [ ] **Database** pour stocker les messages (Sanity ?)
- [ ] **Dashboard admin** pour gérer les messages
- [ ] **Système de tickets** avec statuts
- [ ] **Réponses automatiques**
- [ ] **Analytics** (taux de conversion)

---

## ✅ Checklist de lancement

Avant de déployer en production :

- [ ] Compte Resend créé et vérifié
- [ ] Clé API Resend générée
- [ ] `.env.local` configuré localement
- [ ] Formulaire testé en local (message reçu)
- [ ] Liens réseaux sociaux vérifiés
- [ ] Email pro.mael.dev@gmail.com vérifié
- [ ] Variable `RESEND_API_KEY` ajoutée sur Vercel
- [ ] Site déployé sur Vercel
- [ ] Test formulaire en production
- [ ] Email reçu en production

---

## 📚 Documentation

- **Resend Docs** : https://resend.com/docs
- **Next.js API Routes** : https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **React Hook Form** (optionnel) : https://react-hook-form.com

---

## 🎉 Résultat final

Une page Contact **100% fonctionnelle** avec :

✅ Formulaire moderne et fluide  
✅ Envoi d'emails via Resend  
✅ Réseaux sociaux interactifs  
✅ Design responsive  
✅ Animations élégantes  
✅ Gratuit et scalable  
✅ Prêt pour la production  

**Il ne te reste plus qu'à configurer ta clé Resend et c'est parti ! 🚀**

---

**Commit :** `8d0e72a` - "✉️ Ajout page Contact avec formulaire Resend + réseaux sociaux"

**Made with ❤️ by Maël**
