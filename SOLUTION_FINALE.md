# 🔧 Solution finale pour le hash tronqué

## Problème

Next.js interprète les `$` dans `.env.local` comme des variables, même avec des guillemets !

## ✅ Solutions possibles

### Solution 1 : Échapper les `$` avec `\$`

Dans `.env.local`, remplacez chaque `$` par `\$` :

```env
ADMIN_PASSWORD_HASH="\$2b\$10\$vGh8EBMor6L9.L8TqpDAGu.aL9yOFTK62r2md57Ira4x7ICsd5FoC"
```

### Solution 2 : Utiliser `.env` au lieu de `.env.local`

Next.js charge `.env` différemment. Créez `.env` :

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=changez-moi-par-une-chaine-aleatoire-de-32-caracteres-minimum

# Admin
ADMIN_EMAIL=faber.quentin@gmail.com
ADMIN_PASSWORD_HASH="$2b$10$vGh8EBMor6L9.L8TqpDAGu.aL9yOFTK62r2md57Ira4x7ICsd5FoC"
```

### Solution 3 : Hardcoder temporairement dans auth.ts (pour tester)

Dans `src/lib/auth.ts`, remplacez :

```typescript
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
```

Par :

```typescript
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '$2b$10$vGh8EBMor6L9.L8TqpDAGu.aL9yOFTK62r2md57Ira4x7ICsd5FoC';
```

## 🎯 Recommandation

**Essayez la Solution 1 d'abord** (échapper les `$`).

Si ça ne marche pas, **essayez la Solution 3** (hardcoder temporairement) pour confirmer que le reste fonctionne.
