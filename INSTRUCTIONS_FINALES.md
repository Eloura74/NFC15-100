# 🔧 Instructions finales pour corriger l'authentification

## Problème identifié

Next.js tronque le hash dans `.env.local` à cause des caractères `$`.

## ✅ Solution : Supprimer la ligne de `.env.local`

### 1. Ouvrez `.env.local`

### 2. **SUPPRIMEZ** ou **COMMENTEZ** cette ligne :

```env
ADMIN_PASSWORD_HASH="$2b$10$vGh8EBMor6L9.L8TqpDAGu.aL9yOFTK62r2md57Ira4x7ICsd5FoC"
```

Remplacez par :

```env
# ADMIN_PASSWORD_HASH="$2b$10$vGh8EBMor6L9.L8TqpDAGu.aL9yOFTK62r2md57Ira4x7ICsd5FoC"
```

Ou supprimez complètement la ligne.

### 3. Fichier `.env.local` final

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=changez-moi-par-une-chaine-aleatoire-de-32-caracteres-minimum

# Admin
ADMIN_EMAIL=faber.quentin@gmail.com
# Le hash est hardcodé dans src/lib/auth.ts
```

### 4. Redémarrez le serveur

```bash
npm run dev
```

### 5. Connectez-vous

Allez sur `http://localhost:3000/login` et connectez-vous.

## Pourquoi ça va marcher ?

En supprimant la ligne de `.env.local`, `process.env.ADMIN_PASSWORD_HASH` sera `undefined`, et le code utilisera le fallback hardcodé :

```typescript
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '$2b$10$vGh8EBMor6L9.L8TqpDAGu.aL9yOFTK62r2md57Ira4x7ICsd5FoC';
```

Le hash complet sera utilisé et la connexion fonctionnera ! ✅

## Après connexion

Vous accéderez au dashboard admin où vous pourrez gérer tout le contenu du site !
