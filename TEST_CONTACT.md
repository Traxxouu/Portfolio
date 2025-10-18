# 🚀 Guide de Test - Page Contact

## ✅ Étape 1 : Redémarrer le serveur (OBLIGATOIRE)

**Pourquoi ?** Next.js doit recharger les variables d'environnement.

### Dans le terminal qui tourne `npm run dev` :

1. **Appuie sur `Ctrl + C`** pour arrêter le serveur
2. **Relance** avec :
   ```bash
   npm run dev
   ```
3. **Attends** que le message "Ready in Xs" s'affiche

---

## 🎨 Étape 2 : Accéder à la page Contact

1. Ouvre ton navigateur
2. Va sur **http://localhost:3000**
3. Clique sur **"Contact"** dans la navigation (3ème bouton)
4. **Regarde la transition liquide** avec les vagues ! 🌊

---

## 📋 Étape 3 : Tester le formulaire

### Remplis le formulaire :

**Nom :** Ton prénom  
**Email :** Ton email perso (pour tester)  
**Message :** "Test du formulaire de contact"

### Clique sur "Envoyer le message"

Tu devrais voir :
1. ⏳ **Spinner** + "Envoi en cours..."
2. ✅ **Message vert** : "Message envoyé avec succès ! Je te répondrai très vite 🚀"
3. 🔄 Le formulaire se **vide automatiquement**

---

## 📧 Étape 4 : Vérifier l'email reçu

1. Va sur **https://gmail.com**
2. Connecte-toi avec **pro.mael.dev@gmail.com**
3. Cherche l'email avec le sujet : **"Nouveau message de [TON NOM] - Portfolio"**

**L'email contiendra :**
- 👤 Ton nom
- 📧 Ton email
- 💬 Ton message
- 🎨 Design HTML stylisé

---

## 🌐 Étape 5 : Vérifier les réseaux sociaux

Sur la page Contact, vérifie que les 4 cartes sont présentes :

| LinkedIn | GitHub |
|----------|--------|
| **Instagram** | **Twitch** |

### Clique sur chaque carte :
- ✅ **LinkedIn** → Doit ouvrir ton LinkedIn
- ✅ **GitHub** → Doit ouvrir ton GitHub
- ✅ **Instagram** → Doit ouvrir ton Instagram
- ✅ **Twitch** → Doit ouvrir ton Twitch

---

## 🎭 Étape 6 : Tester le mode Dark/Light

1. Clique sur l'icône **Lune/Soleil** en haut à droite
2. Le thème devrait changer **instantanément**
3. Toute la page Contact change de couleurs :
   - **Dark** : Fond noir + accents bleus/violets
   - **Light** : Fond beige + accents oranges

---

## 🌊 Étape 7 : Tester les transitions

### Retour à l'accueil :
1. Clique sur **"← Accueil"** en haut à gauche
2. **Regarde les vagues liquides** qui montent ! 🌊
3. Tu arrives sur la page d'accueil

### Revenir au Contact :
1. Clique sur **"Contact"**
2. **Nouvelle transition liquide** !

---

## 📱 Étape 8 : Tester le responsive

### Ouvre les DevTools (F12)
1. Clique sur l'icône **mobile** (Toggle device toolbar)
2. Teste différentes tailles :
   - 📱 **iPhone** (375px)
   - 📲 **iPad** (768px)
   - 💻 **Desktop** (1920px)

### Vérifie que :
- Le formulaire s'adapte bien
- Les cartes réseaux sociaux restent 2x2
- Le titre est lisible
- Les boutons sont cliquables

---

## ✨ Animations présentes

### Page Contact

| Élément | Animation | Délai |
|---------|-----------|-------|
| Titre | Fade in + scale | 0ms |
| Sous-titre | Fade in up | 0ms |
| Formulaire | Fade in up | 200ms |
| Email direct | Fade in up | 400ms |
| Réseaux sociaux | Fade in up | 600ms |
| Citation | Fade in up | 800ms |

### Interactions

| Élément | Hover Effect |
|---------|--------------|
| Inputs | Scale 1.02 + bordure colorée |
| Bouton Submit | Scale 1.05 + ombre colorée |
| Cartes sociales | Lift -2px + scale 1.05 + ombre |
| Bouton retour | Scale 1.05 + translate |
| Toggle dark/light | Scale 1.1 |

---

## 🐛 Dépannage

### ❌ Le bouton "Contact" ne fait rien

**Solution :**
1. Vérifie que le serveur tourne (`npm run dev`)
2. Ouvre la console (F12) → Onglet Console
3. Regarde s'il y a des erreurs rouges
4. Rafraîchis la page (Ctrl+R)

### ❌ Le formulaire ne s'envoie pas

**Vérifie dans cet ordre :**

1. **Console navigateur** (F12) → Erreurs ?
2. **Terminal** → Erreurs API ?
3. **`.env.local`** → Clé Resend présente ?
4. **Serveur redémarré** après avoir ajouté la clé ?

### ❌ Erreur "Invalid API Key"

```bash
# 1. Vérifie ta clé dans .env.local
# Elle doit commencer par "re_"
RESEND_API_KEY=re_xxxxxxxxxx

# 2. Redémarre le serveur
Ctrl+C
npm run dev
```

### ❌ L'email n'arrive pas

1. **Attends 1 minute** (parfois ça prend un peu)
2. **Check le spam** de pro.mael.dev@gmail.com
3. Va sur **https://resend.com/logs** pour voir les logs
4. Vérifie que tu as bien reçu un message de succès

### ❌ Les transitions ne marchent pas

1. **Vide le cache** : Ctrl+Shift+R
2. **Vérifie** que `globals.css` contient les animations
3. **Redémarre** le serveur

---

## 🎯 Checklist finale

Avant de dire "C'est bon !", vérifie :

- [ ] Serveur redémarré après ajout clé API
- [ ] Page Contact accessible (bouton "Contact")
- [ ] Transition liquide visible
- [ ] Formulaire s'affiche correctement
- [ ] Tous les champs sont présents (Nom, Email, Message)
- [ ] Bouton "Envoyer" fonctionne
- [ ] Spinner s'affiche pendant l'envoi
- [ ] Message de succès s'affiche
- [ ] Email reçu sur pro.mael.dev@gmail.com
- [ ] 4 cartes réseaux sociaux présentes
- [ ] Tous les liens s'ouvrent correctement
- [ ] Toggle dark/light fonctionne
- [ ] Retour accueil fonctionne avec transition
- [ ] Design responsive OK sur mobile
- [ ] Aucune erreur dans la console

---

## 🎉 Si tout fonctionne

**Félicitations ! 🚀**

Ton portfolio a maintenant :
- ✅ Page d'accueil stylée
- ✅ Page About avec CV
- ✅ Page Projects avec Sanity
- ✅ **Page Contact avec formulaire fonctionnel**
- ✅ Transitions liquides entre toutes les pages
- ✅ Animations fluides partout
- ✅ Mode dark/light
- ✅ Design responsive

**C'est prêt à être déployé sur Vercel ! 🌐**

---

## 📸 Screenshots attendus

### Mode Light
- Fond beige clair
- Accents orange
- Formulaire avec bordures oranges
- Cartes réseaux avec hover orange

### Mode Dark
- Fond noir
- Accents bleus/violets
- Formulaire avec bordures violettes
- Cartes réseaux avec hover violet

### Transitions
- Vagues qui montent du bas
- 3 couleurs qui se superposent
- Animation fluide de 1 seconde

---

## 🔗 Liens utiles

- **Resend Dashboard** : https://resend.com/emails
- **Resend Logs** : https://resend.com/logs
- **Resend API Keys** : https://resend.com/api-keys

---

**Bon test ! 🚀**

Si tu as le moindre problème, regarde les erreurs dans la console (F12) et vérifie que le serveur est bien redémarré après avoir ajouté la clé API.
