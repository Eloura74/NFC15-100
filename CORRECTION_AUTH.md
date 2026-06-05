# 🔧 Correction de l'authentification

## ✅ Correction appliquée

J'ai ajouté des logs de débogage dans `src/lib/auth.ts` pour identifier le problème.

## 🔍 Vérifications à faire

### 1. Vérifier que `.env.local` existe

Le fichier `.env.local` doit être à la racine du projet (même niveau que `package.json`).

### 2. Vérifier le contenu de `.env.local`

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=changez-moi-par-une-chaine-aleatoire-de-32-caracteres-minimum

# Admin
ADMIN_EMAIL=faber.quentin@gmail.com
ADMIN_PASSWORD_HASH=$2b$10$ZU.fVk48trkhvWFBYFGPT.f/XVO2ApwvnLXIRdbcTdGORCRTBBb1.
```

**Important** : Pas d'espaces autour du `=`

### 3. Redémarrer le serveur

Après avoir modifié `.env.local`, vous DEVEZ redémarrer :

```bash
# Arrêter le serveur (Ctrl+C)
npm run dev
```

### 4. Regarder les logs du serveur

Quand vous essayez de vous connecter, vous devriez voir dans le terminal :

```
Login attempt: faber.quentin@gmail.com
Expected email: faber.quentin@gmail.com
Hash exists: true
Password valid: true
```

Si vous voyez `Hash exists: false`, c'est que `.env.local` n'est pas chargé.

## 🐛 Problèmes possibles

### Problème 1 : `.env.local` pas chargé

**Solution** : 
- Vérifiez que le fichier est bien à la racine
- Redémarrez le serveur
- Vérifiez qu'il n'y a pas de `.env.local.example` à la place

### Problème 2 : Hash incorrect

**Solution** :
```bash
node generate-hash.js
```
Copiez le nouveau hash dans `.env.local`

### Problème 3 : Email incorrect

**Solution** :
Utilisez exactement : `faber.quentin@gmail.com`

## ✅ Test de connexion

1. Allez sur `http://localhost:3000/login`
2. Entrez :
   - Email : `faber.quentin@gmail.com`
   - Mot de passe : `Aaron141216!`
3. Regardez les logs dans le terminal
4. Si `Password valid: true`, vous devriez être redirigé vers `/admin`

## 🔐 Générer un nouveau NEXTAUTH_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Remplacez `changez-moi-par-une-chaine-aleatoire-de-32-caracteres-minimum` par le résultat.

## 📝 Exemple de `.env.local` complet

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=Kx8vN2mP9qR4sT6wY8zA1bC3dE5fG7hJ9kL0mN2oP4qR6sT8uV0w

# Admin Credentials
ADMIN_EMAIL=faber.quentin@gmail.com
ADMIN_PASSWORD_HASH=$2b$10$ZU.fVk48trkhvWFBYFGPT.f/XVO2ApwvnLXIRdbcTdGORCRTBBb1.
```

## 🚀 Après correction

Une fois connecté, vous verrez le dashboard avec :
- Statistiques (6 domaines, 12 fiches)
- Gestion du contenu
- Actions rapides

Vous pourrez ensuite gérer tout le contenu du site !
