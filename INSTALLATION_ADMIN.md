# 🔐 Installation du système d'administration

## Étape 1 : Installer les dépendances

```bash
npm install next-auth@latest bcryptjs
npm install --save-dev @types/bcryptjs
```

## Étape 2 : Créer les variables d'environnement

Créez le fichier `.env.local` à la racine :

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-secret-tres-long-et-securise-ici-changez-moi

# Admin credentials (hashed)
ADMIN_EMAIL=faber.quentin@gmail.com
ADMIN_PASSWORD_HASH=$2a$10$YourHashedPasswordHere
```

## Étape 3 : Générer le hash du mot de passe

Créez un fichier temporaire `generate-hash.js` :

```javascript
const bcrypt = require('bcryptjs');

const password = 'Aaron141216!';
const hash = bcrypt.hashSync(password, 10);

console.log('Hash à mettre dans .env.local :');
console.log(hash);
```

Exécutez :
```bash
node generate-hash.js
```

Copiez le hash dans `.env.local` pour `ADMIN_PASSWORD_HASH`

## Étape 4 : Générer NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Ou utilisez :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Structure créée

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── admin/
│   │   ├── page.tsx (Dashboard)
│   │   ├── domaines/
│   │   │   ├── page.tsx (Liste)
│   │   │   ├── nouveau/page.tsx
│   │   │   └── [id]/page.tsx (Éditer)
│   │   └── fiches/
│   │       ├── page.tsx (Liste)
│   │       ├── nouveau/page.tsx
│   │       └── [id]/page.tsx (Éditer)
│   └── login/
│       └── page.tsx
├── lib/
│   └── auth.ts
└── components/
    └── admin/
        ├── domain-form.tsx
        ├── sheet-form.tsx
        └── editor.tsx
```

## Fonctionnalités

✅ Authentification sécurisée avec NextAuth  
✅ Mot de passe hashé avec bcrypt  
✅ Protection des routes admin  
✅ Dashboard d'administration  
✅ CRUD complet pour domaines  
✅ CRUD complet pour fiches  
✅ Éditeur de contenu riche  
✅ Prévisualisation en temps réel  

## Utilisation

1. Allez sur `/login`
2. Connectez-vous avec :
   - Email : `faber.quentin@gmail.com`
   - Mot de passe : `Aaron141216!`
3. Accédez au dashboard `/admin`
4. Gérez tout le contenu !
