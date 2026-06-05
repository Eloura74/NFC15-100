# ElecNorme

> Application web de référence métier pour les électriciens en France

## 🎯 Vision

ElecNorme est une bible numérique pour les professionnels de l'électricité, offrant un accès rapide, fiable et contextualisé aux normes, règles et bonnes pratiques du métier.

## ✨ Fonctionnalités principales

- **Recherche intelligente** - Tolérance aux fautes, synonymes, contextes
- **Fiches métier** - Informations sourcées, versionnées et validées
- **Calculateurs** - Outils de calcul essentiels (Ohm, sections, chute de tension...)
- **Checklists** - Listes de contrôle pour chantiers
- **Mode hors ligne** - Accès aux contenus essentiels sans connexion
- **PWA** - Installation sur mobile et desktop
- **Favoris locaux** - Sauvegarde de vos fiches préférées

## 🏗️ Architecture

### Stack technique

- **Framework**: Next.js 14+ (App Router)
- **UI**: React + TailwindCSS + shadcn/ui
- **Recherche**: Fuse.js (client-side)
- **Stockage**: IndexedDB (local)
- **PWA**: next-pwa
- **Déploiement**: Vercel

### Principes

- Mobile-first
- Offline-first
- Pas de base de données pour le MVP
- Contenus statiques versionnés
- Thème sombre professionnel

## 🚀 Démarrage rapide

### Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Cloner le dépôt
git clone <repository-url>
cd Nfc15100

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.local.example .env.local

# Lancer en développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
Nfc15100/
├── src/
│   ├── app/              # Pages Next.js (App Router)
│   ├── components/       # Composants React
│   ├── lib/             # Logique métier
│   ├── data/            # Contenus JSON
│   ├── types/           # Types TypeScript
│   └── styles/          # Styles globaux
├── public/              # Assets statiques
├── scripts/             # Scripts de build
└── tests/              # Tests
```

## 🛠️ Scripts disponibles

```bash
npm run dev          # Développement
npm run build        # Build production
npm run start        # Serveur production
npm run lint         # Linter
npm run validate     # Validation du contenu
npm run build-index  # Construction de l'index de recherche
npm run test         # Tests unitaires
npm run test:e2e     # Tests end-to-end
```

## 📝 Contribution

### Workflow éditorial

1. **Brouillon** - Création initiale
2. **Vérification technique** - Validation par un expert
3. **Vérification des sources** - Contrôle des références
4. **Publication** - Mise en ligne

### Règles de contenu

- Toutes les fiches doivent avoir des sources
- Toutes les fiches doivent avoir une date de vérification
- Aucune reproduction non autorisée
- Distinction claire entre obligation et recommandation
- Indication des contextes d'application

### Standards de code

- TypeScript strict
- ESLint + Prettier
- Tests pour les fonctions critiques
- Composants réutilisables
- Fichiers < 300 lignes

## 🔒 Sécurité

- HTTPS obligatoire
- Headers de sécurité (CSP, HSTS, etc.)
- Pas de secrets dans Git
- Validation stricte des entrées
- Audit régulier des dépendances

## 📱 PWA

L'application est installable sur:
- Android (Chrome, Edge, Samsung Internet)
- iOS (Safari)
- Desktop (Chrome, Edge)

Fonctionnalités hors ligne:
- Interface complète
- Fiches favorites
- Calculateurs
- Checklists locales

## 🎨 Design

- Thème sombre par défaut
- Palette professionnelle sobre
- Haute lisibilité (extérieur, faible luminosité)
- Zones tactiles >= 44x44px
- Contrastes WCAG AA

## 📊 Performance

Objectifs:
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse Score > 90
- Bundle initial < 500KB

## 🗺️ Roadmap

### Phase 1 - MVP (actuelle)
- ✅ Architecture et design
- 🚧 Recherche et navigation
- 🚧 Fiches de contenu
- 🚧 Calculateurs essentiels
- 🚧 Mode hors ligne

### Phase 2 - Enrichissement
- Mode urgence
- Recherche vocale
- Comparateur de versions
- Plus de calculateurs

### Phase 3 - Fonctionnalités connectées
- Comptes utilisateurs
- Synchronisation multi-appareils
- Équipes
- Back-office éditorial

### Phase 4 - Intelligence
- Assistant conversationnel
- Analyse d'images
- Suggestions intelligentes

## 📄 Licence

Propriétaire - Tous droits réservés

## 📞 Contact

Pour toute question ou suggestion concernant le projet.

---

**Note**: Cette application est une aide à la consultation. Elle ne remplace pas les textes officiels, les normes acquises légalement, ni l'intervention d'un professionnel habilité.
