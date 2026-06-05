# ElecNorme - Detailed File Structure

## Complete File Tree

```
Nfc15100/
│
├── .windsurf/
│   └── workflows/
│       ├── dev-cycle.md
│       └── master.md
│
├── public/
│   ├── icons/
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   └── icon-512x512.png
│   ├── images/
│   │   ├── logo.svg
│   │   ├── offline.svg
│   │   └── illustrations/
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout with providers
│   │   ├── page.tsx                      # Homepage
│   │   ├── globals.css                   # Global styles
│   │   ├── not-found.tsx                 # 404 page
│   │   ├── offline/
│   │   │   └── page.tsx                  # Offline fallback
│   │   ├── recherche/
│   │   │   ├── page.tsx                  # Search page
│   │   │   └── layout.tsx                # Search layout
│   │   ├── domaines/
│   │   │   ├── page.tsx                  # Domains overview
│   │   │   └── [domain]/
│   │   │       ├── page.tsx              # Domain detail
│   │   │       └── [subdomain]/
│   │   │           └── page.tsx          # Subdomain detail
│   │   ├── fiches/
│   │   │   ├── page.tsx                  # All sheets
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Sheet detail
│   │   ├── calculateurs/
│   │   │   ├── page.tsx                  # Calculators list
│   │   │   ├── ohm/
│   │   │   │   └── page.tsx              # Ohm's law
│   │   │   ├── puissance/
│   │   │   │   └── page.tsx              # Power calculator
│   │   │   ├── chute-tension/
│   │   │   │   └── page.tsx              # Voltage drop
│   │   │   ├── section/
│   │   │   │   └── page.tsx              # Cable section
│   │   │   └── conversions/
│   │   │       └── page.tsx              # Unit conversions
│   │   ├── checklists/
│   │   │   ├── page.tsx                  # Checklists overview
│   │   │   ├── nouvelle/
│   │   │   │   └── page.tsx              # New checklist
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Checklist detail
│   │   ├── favoris/
│   │   │   └── page.tsx                  # Favorites
│   │   ├── historique/
│   │   │   └── page.tsx                  # History
│   │   ├── urgence/
│   │   │   └── page.tsx                  # Emergency mode
│   │   ├── versions/
│   │   │   ├── page.tsx                  # Versions overview
│   │   │   └── [version]/
│   │   │       └── page.tsx              # Version detail
│   │   ├── sources/
│   │   │   ├── page.tsx                  # Sources list
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Source detail
│   │   ├── glossaire/
│   │   │   ├── page.tsx                  # Glossary
│   │   │   └── [term]/
│   │   │       └── page.tsx              # Term detail
│   │   ├── parametres/
│   │   │   └── page.tsx                  # Settings
│   │   ├── a-propos/
│   │   │   └── page.tsx                  # About
│   │   ├── mentions-legales/
│   │   │   └── page.tsx                  # Legal notices
│   │   ├── confidentialite/
│   │   │   └── page.tsx                  # Privacy policy
│   │   └── signaler/
│   │       └── page.tsx                  # Report error
│   │
│   ├── components/
│   │   ├── ui/                           # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── toast.tsx
│   │   │   └── toaster.tsx
│   │   ├── layout/
│   │   │   ├── header.tsx                # Main header
│   │   │   ├── footer.tsx                # Main footer
│   │   │   ├── navigation.tsx            # Navigation menu
│   │   │   ├── mobile-nav.tsx            # Mobile navigation
│   │   │   ├── breadcrumbs.tsx           # Breadcrumb navigation
│   │   │   └── offline-indicator.tsx     # Online/offline status
│   │   ├── search/
│   │   │   ├── search-bar.tsx            # Main search input
│   │   │   ├── search-results.tsx        # Results display
│   │   │   ├── search-filters.tsx        # Filter panel
│   │   │   ├── search-suggestions.tsx    # Auto-suggestions
│   │   │   ├── voice-search.tsx          # Voice input
│   │   │   └── recent-searches.tsx       # History display
│   │   ├── content/
│   │   │   ├── sheet-card.tsx            # Sheet preview card
│   │   │   ├── sheet-detail.tsx          # Full sheet display
│   │   │   ├── sheet-section.tsx         # Sheet section
│   │   │   ├── value-display.tsx         # Technical value
│   │   │   ├── source-reference.tsx      # Source citation
│   │   │   ├── version-badge.tsx         # Version indicator
│   │   │   ├── criticality-badge.tsx     # Criticality level
│   │   │   ├── warning-box.tsx           # Warning display
│   │   │   └── related-sheets.tsx        # Related content
│   │   ├── calculators/
│   │   │   ├── calculator-layout.tsx     # Common layout
│   │   │   ├── calculator-input.tsx      # Input field
│   │   │   ├── calculator-result.tsx     # Result display
│   │   │   ├── unit-selector.tsx         # Unit selection
│   │   │   └── formula-display.tsx       # Formula explanation
│   │   ├── checklists/
│   │   │   ├── checklist-card.tsx        # Checklist preview
│   │   │   ├── checklist-item.tsx        # Checkbox item
│   │   │   ├── checklist-progress.tsx    # Progress bar
│   │   │   ├── checklist-notes.tsx       # Notes section
│   │   │   └── checklist-export.tsx      # Export button
│   │   ├── favorites/
│   │   │   ├── favorite-button.tsx       # Toggle favorite
│   │   │   └── favorites-list.tsx        # Favorites display
│   │   └── common/
│   │       ├── loading-spinner.tsx       # Loading state
│   │       ├── error-boundary.tsx        # Error handling
│   │       ├── empty-state.tsx           # No content state
│   │       └── theme-toggle.tsx          # Theme switcher
│   │
│   ├── lib/
│   │   ├── search/
│   │   │   ├── search-engine.ts          # Core search logic
│   │   │   ├── search-index.ts           # Index management
│   │   │   ├── search-filters.ts         # Filter logic
│   │   │   ├── search-synonyms.ts        # Synonym handling
│   │   │   ├── search-ranking.ts         # Result ranking
│   │   │   └── search-normalization.ts   # Text normalization
│   │   ├── storage/
│   │   │   ├── favorites.ts              # Favorites CRUD
│   │   │   ├── history.ts                # History management
│   │   │   ├── preferences.ts            # User settings
│   │   │   ├── checklists.ts             # Checklist storage
│   │   │   ├── local-db.ts               # IndexedDB wrapper
│   │   │   └── export-import.ts          # Data portability
│   │   ├── offline/
│   │   │   ├── cache-strategy.ts         # Caching rules
│   │   │   ├── offline-detector.ts       # Network status
│   │   │   └── sync-manager.ts           # Future sync
│   │   ├── validation/
│   │   │   ├── content-validator.ts      # Content validation
│   │   │   ├── schema.ts                 # Zod schemas
│   │   │   └── build-checks.ts           # Build-time checks
│   │   ├── calculators/
│   │   │   ├── ohm.ts                    # Ohm's law
│   │   │   ├── power.ts                  # Power calculations
│   │   │   ├── voltage-drop.ts           # Voltage drop
│   │   │   ├── cable-section.ts          # Section calculation
│   │   │   └── conversions.ts            # Unit conversions
│   │   ├── content/
│   │   │   ├── get-sheets.ts             # Fetch sheets
│   │   │   ├── get-domains.ts            # Fetch domains
│   │   │   ├── get-versions.ts           # Fetch versions
│   │   │   ├── get-sources.ts            # Fetch sources
│   │   │   └── get-glossary.ts           # Fetch glossary
│   │   └── utils.ts                      # Utility functions
│   │
│   ├── data/
│   │   ├── fiches/
│   │   │   ├── index.json                # All sheets index
│   │   │   ├── alimentation/
│   │   │   │   ├── branchement.json
│   │   │   │   ├── comptage.json
│   │   │   │   └── coupure-generale.json
│   │   │   ├── tableaux/
│   │   │   │   ├── tableau-principal.json
│   │   │   │   ├── divisionnaire.json
│   │   │   │   └── gtl.json
│   │   │   ├── protections/
│   │   │   │   ├── differentiel.json
│   │   │   │   ├── surintensites.json
│   │   │   │   └── parafoudre.json
│   │   │   ├── terre/
│   │   │   │   ├── prise-terre.json
│   │   │   │   ├── liaisons-equipotentielles.json
│   │   │   │   └── conducteur-protection.json
│   │   │   ├── circuits/
│   │   │   │   ├── eclairage.json
│   │   │   │   ├── prises.json
│   │   │   │   └── chauffage.json
│   │   │   ├── locaux-speciaux/
│   │   │   │   ├── salle-eau.json
│   │   │   │   ├── piscine.json
│   │   │   │   └── exterieur.json
│   │   │   └── energie/
│   │   │       ├── irve.json
│   │   │       └── photovoltaique.json
│   │   ├── domaines/
│   │   │   ├── index.json                # Domains structure
│   │   │   └── taxonomy.json             # Full taxonomy
│   │   ├── versions/
│   │   │   ├── index.json                # Versions list
│   │   │   └── nfc15100/
│   │   │       ├── 2015.json
│   │   │       └── 2020.json
│   │   ├── sources/
│   │   │   ├── index.json                # Sources list
│   │   │   ├── reglementaires.json       # Regulatory sources
│   │   │   ├── normatives.json           # Standards
│   │   │   └── institutionnelles.json    # Institutional
│   │   ├── glossaire/
│   │   │   └── index.json                # Glossary terms
│   │   ├── metadata/
│   │   │   ├── contexts.json             # Context definitions
│   │   │   ├── equipment.json            # Equipment types
│   │   │   └── rooms.json                # Room types
│   │   └── search/
│   │       ├── synonyms.json             # Synonym mappings
│   │       └── abbreviations.json        # Abbreviation mappings
│   │
│   ├── types/
│   │   ├── content.ts                    # Content types
│   │   ├── search.ts                     # Search types
│   │   ├── user.ts                       # User data types
│   │   ├── calculator.ts                 # Calculator types
│   │   ├── checklist.ts                  # Checklist types
│   │   └── index.ts                      # Type exports
│   │
│   └── styles/
│       └── globals.css                   # Global CSS
│
├── scripts/
│   ├── validate-content.ts               # Content validation
│   ├── build-index.ts                    # Search index builder
│   ├── check-links.ts                    # Link checker
│   ├── generate-manifest.ts              # PWA manifest
│   └── optimize-images.ts                # Image optimization
│
├── tests/
│   ├── unit/
│   │   ├── search.test.ts
│   │   ├── calculators.test.ts
│   │   ├── storage.test.ts
│   │   └── validation.test.ts
│   ├── integration/
│   │   ├── search-flow.test.ts
│   │   ├── offline.test.ts
│   │   └── favorites.test.ts
│   └── e2e/
│       ├── homepage.spec.ts
│       ├── search.spec.ts
│       └── calculator.spec.ts
│
├── .env.local.example                    # Environment template
├── .gitignore
├── .eslintrc.json                        # ESLint config
├── .prettierrc                           # Prettier config
├── next.config.js                        # Next.js config
├── tailwind.config.ts                    # Tailwind config
├── tsconfig.json                         # TypeScript config
├── postcss.config.js                     # PostCSS config
├── package.json
├── pnpm-lock.yaml
├── README.md
├── ARCHITECTURE.md                       # This document
├── FILE_STRUCTURE.md                     # File structure
└── CONTRIBUTING.md                       # Contribution guide
```

## File Count Summary

- **Total files**: ~150+
- **React components**: ~50
- **TypeScript modules**: ~30
- **Data files**: ~40
- **Test files**: ~15
- **Configuration files**: ~10
- **Documentation files**: ~5

## Module Organization Principles

### 1. Small, Focused Files
- Each file has a single responsibility
- Maximum ~200-300 lines per file
- Clear naming conventions
- Logical grouping

### 2. Component Structure
- One component per file
- Co-located types when specific
- Shared types in `types/` directory
- Reusable UI in `components/ui/`

### 3. Data Organization
- Grouped by domain
- JSON for static content
- Index files for navigation
- Separate metadata

### 4. Library Functions
- Grouped by feature
- Pure functions when possible
- Clear interfaces
- Minimal dependencies

### 5. Type Safety
- TypeScript everywhere
- Zod for runtime validation
- Shared types in `types/`
- Strict mode enabled

## Next Steps

This file structure will be implemented progressively:

1. **Foundation** (Day 1)
   - Project setup
   - Configuration files
   - Basic structure

2. **Design System** (Day 1-2)
   - UI components
   - Layout components
   - Styling

3. **Data Layer** (Day 2-3)
   - Type definitions
   - Data structure
   - Sample content

4. **Core Features** (Day 3-5)
   - Search engine
   - Content display
   - Navigation

5. **Advanced Features** (Day 5-7)
   - Calculators
   - Checklists
   - Offline mode

6. **Polish** (Day 7-8)
   - Testing
   - Optimization
   - Documentation
