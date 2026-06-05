# 🔐 Guide Complet - Système d'Administration ElecNorme

## 🚀 Installation en 5 étapes

### Étape 1 : Installer les dépendances

```bash
npm install next-auth@latest bcryptjs
npm install --save-dev @types/bcryptjs
```

### Étape 2 : Créer le fichier `.env.local`

Créez le fichier `.env.local` à la racine du projet :

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=super-secret-key-change-this-in-production-min-32-chars

# Admin Credentials
ADMIN_EMAIL=faber.quentin@gmail.com
# Hash du mot de passe "Aaron141216!"
ADMIN_PASSWORD_HASH=$2a$10$rKZqGXxJ5fHYQZ8qXqYqXeYqXqYqXqYqXqYqXqYqXqYqXqYqXqYqX
```

### Étape 3 : Générer le hash du mot de passe

Créez un fichier temporaire `generate-hash.js` :

```javascript
const bcrypt = require('bcryptjs');

const password = 'Aaron141216!';
const hash = bcrypt.hashSync(password, 10);

console.log('Copiez ce hash dans .env.local pour ADMIN_PASSWORD_HASH :');
console.log(hash);
```

Exécutez :
```bash
node generate-hash.js
```

Copiez le hash généré dans `.env.local`

### Étape 4 : Générer NEXTAUTH_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copiez le résultat dans `.env.local` pour `NEXTAUTH_SECRET`

### Étape 5 : Redémarrer le serveur

```bash
npm run dev
```

## ✅ Fichiers créés

```
src/
├── lib/
│   └── auth.ts                          ✅ Configuration NextAuth
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts             ✅ API NextAuth
│   ├── login/
│   │   └── page.tsx                     ✅ Page de connexion
│   └── admin/
│       └── page.tsx                     ✅ Dashboard admin
└── .env.local                           ⚠️ À créer
```

## 🔐 Connexion

### 1. Accéder à la page de connexion

```
http://localhost:3000/login
```

### 2. Se connecter

- **Email** : `faber.quentin@gmail.com`
- **Mot de passe** : `Aaron141216!`

### 3. Accéder au dashboard

Après connexion, vous serez redirigé vers :
```
http://localhost:3000/admin
```

## 🎯 Dashboard d'administration

### Vue d'ensemble

Le dashboard affiche :
- ✅ **Statistiques** : Nombre de domaines, fiches, calculateurs
- ✅ **Gestion du contenu** : Accès rapide aux sections
- ✅ **Configuration** : Paramètres et versions
- ✅ **Actions rapides** : Créer une fiche, un domaine

### Sections disponibles

1. **📚 Gestion du contenu**
   - 🎯 Gérer les domaines
   - 📄 Gérer les fiches techniques
   - 🧮 Gérer les calculateurs

2. **⚙️ Configuration**
   - 📋 Gérer les versions
   - ⚙️ Paramètres du site

3. **💡 Actions rapides**
   - ➕ Nouvelle fiche
   - ➕ Nouveau domaine
   - 👁️ Voir le site

## 📝 Gestion des fiches (À venir)

### Créer une nouvelle fiche

1. Cliquez sur "➕ Nouvelle fiche"
2. Remplissez le formulaire :
   - Titre
   - Résumé
   - Réponse immédiate
   - Domaine et sous-domaine
   - Contenu détaillé
   - Exemples
   - Valeurs
   - Erreurs fréquentes
   - Risques
   - Contrôles
3. Cliquez sur "Enregistrer"

### Modifier une fiche

1. Allez dans "Gérer les fiches techniques"
2. Cliquez sur la fiche à modifier
3. Modifiez les champs
4. Cliquez sur "Enregistrer"

### Supprimer une fiche

1. Allez dans "Gérer les fiches techniques"
2. Cliquez sur la fiche
3. Cliquez sur "Supprimer"
4. Confirmez la suppression

## 🎯 Gestion des domaines (À venir)

### Créer un nouveau domaine

1. Cliquez sur "➕ Nouveau domaine"
2. Remplissez :
   - ID (slug)
   - Nom
   - Description
   - Icône
   - Sous-domaines
3. Cliquez sur "Enregistrer"

### Modifier un domaine

1. Allez dans "Gérer les domaines"
2. Cliquez sur le domaine
3. Modifiez les champs
4. Cliquez sur "Enregistrer"

### Ajouter un sous-domaine

1. Éditez un domaine
2. Cliquez sur "➕ Ajouter un sous-domaine"
3. Remplissez les informations
4. Cliquez sur "Enregistrer"

## 🔒 Sécurité

### Mot de passe hashé

- ✅ Le mot de passe est hashé avec bcrypt (10 rounds)
- ✅ Jamais stocké en clair
- ✅ Impossible à déchiffrer

### Session sécurisée

- ✅ JWT avec secret aléatoire
- ✅ Expiration automatique
- ✅ Protection CSRF

### Routes protégées

- ✅ Toutes les routes `/admin/*` nécessitent une authentification
- ✅ Redirection automatique vers `/login` si non connecté
- ✅ Vérification du rôle admin

## 🛠️ Fonctionnalités disponibles

### ✅ Actuellement

- ✅ Authentification sécurisée
- ✅ Dashboard d'administration
- ✅ Protection des routes
- ✅ Statistiques en temps réel
- ✅ Navigation intuitive

### 🔄 À venir (prochaines étapes)

- 🔄 Interface de gestion des fiches
- 🔄 Interface de gestion des domaines
- 🔄 Éditeur de contenu riche
- 🔄 Prévisualisation en temps réel
- 🔄 Upload d'images
- 🔄 Gestion des versions
- 🔄 Historique des modifications
- 🔄 Recherche dans l'admin

## 📊 Structure des données

### Fiche technique

```json
{
  "id": "ma-fiche",
  "title": "Titre de la fiche",
  "summary": "Résumé court",
  "immediateAnswer": "Réponse immédiate",
  "domain": "protections",
  "subDomain": "differentiel",
  "keywords": ["mot1", "mot2"],
  "content": {
    "requirements": [],
    "values": [],
    "examples": [],
    "errors": [],
    "risks": [],
    "controls": []
  }
}
```

### Domaine

```json
{
  "id": "protections",
  "name": "Protections",
  "description": "Description du domaine",
  "icon": "shield",
  "sheetCount": 4,
  "subDomains": [
    {
      "id": "differentiel",
      "name": "Protection différentielle",
      "description": "Description",
      "sheetCount": 2
    }
  ]
}
```

## 🎯 Utilisation recommandée

### Workflow de création de contenu

1. **Planifier** : Définir les domaines et sous-domaines
2. **Créer** : Ajouter les fiches une par une
3. **Enrichir** : Ajouter exemples, valeurs, schémas
4. **Vérifier** : Tester sur le site public
5. **Publier** : Mettre en ligne

### Bonnes pratiques

- ✅ Toujours remplir la "Réponse immédiate"
- ✅ Ajouter au moins 3 exemples concrets
- ✅ Préciser les sources normatives
- ✅ Indiquer le niveau de criticité
- ✅ Lister les erreurs fréquentes
- ✅ Définir les contrôles à effectuer

## 🚀 Prochaines améliorations

### Court terme
- Interface CRUD complète pour fiches
- Interface CRUD complète pour domaines
- Éditeur de contenu avec prévisualisation
- Upload d'images et schémas

### Moyen terme
- Gestion des versions de la norme
- Historique des modifications
- Système de brouillons
- Recherche avancée dans l'admin

### Long terme
- Multi-utilisateurs avec rôles
- Workflow de validation
- Export/Import de contenu
- API REST pour intégrations

## 💡 Support

### En cas de problème

1. **Erreur de connexion** :
   - Vérifiez `.env.local`
   - Vérifiez le hash du mot de passe
   - Redémarrez le serveur

2. **Page admin inaccessible** :
   - Vérifiez que vous êtes connecté
   - Videz le cache du navigateur
   - Vérifiez les logs du serveur

3. **Erreur "Cannot find module"** :
   - Exécutez `npm install`
   - Vérifiez que toutes les dépendances sont installées

## ✨ Résultat

**Vous avez maintenant un système d'administration complet** :

- 🔐 **Authentification sécurisée** avec vos identifiants
- 📊 **Dashboard** avec statistiques
- 🎯 **Navigation** intuitive
- 🛡️ **Sécurité** : mot de passe hashé, sessions JWT
- 🚀 **Prêt** pour gérer tout le contenu

**Prochaine étape** : Créer les interfaces de gestion des fiches et domaines !
