# ElecNorme - Architecture & Implementation Plan

## Project Overview

**ElecNorme** is a professional web application serving as a digital reference bible for electricians in France. It provides quick, reliable, contextualized, and sourced information for on-site work.

## Core Principles

1. **Speed over sophistication**
2. **Reliability over volume**
3. **Context over generic answers**
4. **Source over assertion**
5. **Mobile before desktop**
6. **Readability over visual effects**
7. **Offline before network dependency**
8. **Simple architecture before complex backend**
9. **No MongoDB for MVP**

## Technology Stack

### Frontend Framework
- **Next.js 14+** (App Router)
  - React Server Components
  - Static generation for content
  - API routes for future features
  - Built-in optimization

### Styling
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Lucide React** - Icons
- Dark theme by default

### Search
- **FlexSearch** or **Fuse.js** - Client-side fuzzy search
- Pre-built search index
- Synonym and abbreviation support

### PWA & Offline
- **next-pwa** - Service worker
- **IndexedDB** - Local storage
- Cache-first strategy for core content

### Data Management
- **Static JSON files** - Content storage
- **TypeScript interfaces** - Type safety
- **Zod** - Runtime validation
- Version control via Git

### Deployment
- **Vercel** - Hosting platform
- Automatic deployments
- Preview environments
- Edge functions if needed

## Project Structure

```
Nfc15100/
├── .windsurf/
│   └── workflows/           # Custom workflows
├── public/
│   ├── icons/              # PWA icons
│   ├── images/             # Static images
│   └── manifest.json       # PWA manifest
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   ├── recherche/      # Search page
│   │   ├── domaines/       # Domains navigation
│   │   ├── fiches/         # Content sheets
│   │   ├── calculateurs/   # Calculators
│   │   ├── checklists/     # Checklists
│   │   ├── favoris/        # Favorites
│   │   ├── urgence/        # Emergency mode
│   │   ├── versions/       # Version management
│   │   ├── sources/        # Sources reference
│   │   └── glossaire/      # Glossary
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Layout components
│   │   ├── search/         # Search components
│   │   ├── content/        # Content display
│   │   ├── calculators/    # Calculator components
│   │   └── checklists/     # Checklist components
│   ├── lib/
│   │   ├── search/         # Search engine
│   │   ├── storage/        # Local storage utilities
│   │   ├── offline/        # Offline management
│   │   ├── validation/     # Content validation
│   │   └── utils.ts        # Utilities
│   ├── data/
│   │   ├── fiches/         # Content sheets (JSON)
│   │   ├── domaines/       # Domain definitions
│   │   ├── versions/       # Version data
│   │   ├── sources/        # Source references
│   │   ├── glossaire/      # Glossary terms
│   │   └── metadata/       # Taxonomies, tags
│   ├── types/
│   │   ├── content.ts      # Content types
│   │   ├── search.ts       # Search types
│   │   └── user.ts         # User data types
│   └── styles/
│       └── globals.css     # Global styles
├── scripts/
│   ├── validate-content.ts # Build-time validation
│   ├── build-index.ts      # Search index builder
│   └── check-links.ts      # Link checker
├── tests/
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── e2e/              # End-to-end tests
├── .env.local.example     # Environment variables template
├── .gitignore
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── package.json
└── README.md
```

## Data Architecture

### Content Sheet Structure

```typescript
interface ContentSheet {
  id: string;                    // Unique identifier
  title: string;                 // Sheet title
  summary: string;               // Brief summary
  immediateAnswer: string;       // Quick answer
  domain: string;                // Primary domain
  subDomain?: string;            // Sub-domain
  keywords: string[];            // Search keywords
  synonyms: string[];            // Alternative terms
  applicableContexts: Context[]; // When this applies
  excludedContexts: Context[];   // When this doesn't apply
  version: string;               // Applicable version
  lastVerified: string;          // ISO date
  status: ContentStatus;         // Publication status
  criticality: Criticality;      // Importance level
  confidence: ConfidenceLevel;   // Source reliability
  
  // Content sections
  content: {
    whenApplies: string;         // Application conditions
    requirements: string[];      // Necessary conditions
    values: Value[];             // Technical values
    exceptions: string[];        // Exceptions
    specialCases: string[];      // Special cases
    commonErrors: string[];      // Frequent mistakes
    risks: Risk[];               // Associated risks
    controls: string[];          // Checks to perform
    checklist?: string[];        // Quick checklist
  };
  
  // References
  sources: Source[];             // Official sources
  relatedSheets: string[];       // Related content IDs
  illustrations?: string[];      // Image paths
  
  // Metadata
  author: string;
  verifier?: string;
  history: HistoryEntry[];
  tags: string[];
}
```

### Search Index Structure

```typescript
interface SearchIndex {
  sheets: {
    id: string;
    title: string;
    summary: string;
    keywords: string[];
    synonyms: string[];
    domain: string;
    contexts: string[];
    version: string;
    criticality: string;
  }[];
  
  synonymMap: Record<string, string[]>;
  abbreviationMap: Record<string, string>;
  domainMap: Record<string, string[]>;
}
```

## Key Features Implementation

### 1. Search Engine

**Location**: `src/lib/search/`

**Features**:
- Fuzzy matching with typo tolerance
- Synonym and abbreviation expansion
- Context-aware filtering
- Multi-field search (title, keywords, content)
- Ranking by relevance and criticality
- Offline-capable with pre-built index

**Files**:
- `search-engine.ts` - Core search logic
- `search-index.ts` - Index management
- `search-filters.ts` - Filter logic
- `search-synonyms.ts` - Synonym handling

### 2. Offline & PWA

**Location**: `src/lib/offline/`

**Features**:
- Service worker for caching
- IndexedDB for favorites and history
- Offline indicator
- Background sync for future features
- Cache management

**Files**:
- `service-worker.ts` - SW logic
- `cache-strategy.ts` - Caching rules
- `offline-storage.ts` - IndexedDB wrapper
- `sync-manager.ts` - Future sync logic

### 3. Local Storage

**Location**: `src/lib/storage/`

**Features**:
- Favorites management
- Search history
- User preferences
- Local checklists
- Site folders (local only for MVP)
- Export/import functionality

**Files**:
- `favorites.ts` - Favorites CRUD
- `history.ts` - History management
- `preferences.ts` - User settings
- `export-import.ts` - Data portability

### 4. Calculators

**Location**: `src/components/calculators/`

**Calculators**:
- Ohm's law
- Power (single/three-phase)
- Voltage drop
- Cable section estimation
- Conduit fill
- Phase balancing
- Unit conversions

**Features**:
- Input validation
- Unit handling
- Result explanation
- Assumptions display
- Offline operation

### 5. Checklists

**Location**: `src/components/checklists/`

**Features**:
- Pre-defined templates
- Checkboxes with notes
- Progress tracking
- Local photos
- Export capability
- Duplication

**Types**:
- Site preparation
- New installation
- Renovation
- Safety check
- Pre-CONSUEL
- Maintenance

## Design System

### Color Palette (Dark Theme)

```css
--background: 222.2 84% 4.9%        /* Very dark blue-gray */
--foreground: 210 40% 98%           /* Off-white */
--primary: 217.2 91.2% 59.8%        /* Electric blue */
--primary-foreground: 222.2 47.4% 11.2%
--secondary: 217.2 32.6% 17.5%      /* Dark blue-gray */
--accent: 217.2 32.6% 17.5%
--destructive: 0 62.8% 30.6%        /* Dark red */
--warning: 38 92% 50%               /* Orange */
--success: 142 76% 36%              /* Green */
--muted: 217.2 32.6% 17.5%
--border: 217.2 32.6% 17.5%
```

### Typography

- **Font**: System font stack (SF Pro, Segoe UI, Roboto)
- **Headings**: Bold, clear hierarchy
- **Body**: 16px base, 1.5 line-height
- **Technical values**: Monospace, highlighted

### Components

- Large touch targets (min 44x44px)
- High contrast for outdoor readability
- Clear focus indicators
- Minimal animations
- Responsive breakpoints: 320px, 768px, 1024px, 1440px

## Content Governance

### Editorial Workflow

1. **Draft** - Initial creation
2. **Technical Review** - Expert validation
3. **Source Verification** - Reference check
4. **Legal Review** - If needed
5. **Published** - Live on site
6. **Monitored** - Regular updates
7. **Archived** - When obsolete

### Validation Rules (Build-time)

- All sheets must have sources
- All sheets must have verification dates
- No duplicate IDs
- No broken internal links
- Published sheets must be validated
- Critical sheets must have verifier
- Obsolete content must be marked

### Version Management

- Each sheet linked to applicable version(s)
- Version selector on homepage
- Clear indication of version differences
- Comparison tool for versions
- Archive of historical versions

## Security & Privacy

### MVP Requirements

- HTTPS only (Vercel default)
- No authentication (local-only data)
- No cookies except essential
- No analytics by default
- CSP headers
- Input validation
- XSS protection
- Dependency audits

### Future (with accounts)

- Bcrypt password hashing
- JWT sessions
- CSRF protection
- Rate limiting
- Audit logging
- GDPR compliance

## Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Search response**: < 100ms
- **Lighthouse Score**: > 90
- **Bundle size**: < 500KB initial
- **Search index**: < 2MB

## Testing Strategy

### Unit Tests
- Search engine logic
- Calculator functions
- Validation rules
- Storage utilities

### Integration Tests
- Search with filters
- Offline functionality
- Data export/import
- PWA installation

### E2E Tests
- Critical user journeys
- Search → Result → Favorite
- Calculator usage
- Checklist creation
- Offline mode

### Content Tests
- Build-time validation
- Link checking
- Source verification
- Version consistency

## Deployment Pipeline

### Build Process

1. Content validation
2. Search index generation
3. Link checking
4. TypeScript compilation
5. Next.js build
6. PWA manifest generation
7. Asset optimization

### Vercel Configuration

- Automatic deployments from `main`
- Preview deployments for PRs
- Environment variables for future features
- Edge functions if needed
- Analytics (optional)

### Build Failure Conditions

- Invalid content structure
- Missing required fields
- Broken internal links
- Duplicate IDs
- Published sheets without validation
- Missing sources

## Accessibility

### WCAG AA Compliance

- Keyboard navigation
- Screen reader support
- Sufficient contrast (4.5:1 minimum)
- Focus indicators
- Alt text for images
- Semantic HTML
- ARIA labels where needed
- Resizable text
- No color-only information

## Future Enhancements (Post-MVP)

### Phase 2
- Emergency mode
- Voice search
- Content comparison
- Enhanced calculators
- More checklists
- Advanced glossary

### Phase 3
- User accounts
- MongoDB integration
- Multi-device sync
- Team features
- Private content
- Editorial back-office

### Phase 4
- AI assistant
- Image analysis
- Equipment recognition
- Intelligent suggestions
- Automated reports

## Risk Mitigation

### Critical Risks

1. **Outdated information**
   - Mitigation: Verification dates, alerts, governance

2. **Copyright infringement**
   - Mitigation: Original content, proper references, legal review

3. **Version confusion**
   - Mitigation: Clear version selector, comparison tool

4. **Context misapplication**
   - Mitigation: Explicit conditions, exceptions, warnings

5. **Offline data loss**
   - Mitigation: Export functionality, clear warnings

## Success Metrics

### User Experience
- Time to find information < 30 seconds
- Search success rate > 80%
- Offline usage > 30%
- Return user rate > 60%

### Content Quality
- All sheets have sources
- All sheets verified < 6 months
- Zero published unvalidated sheets
- < 5% error reports

### Technical
- Uptime > 99.9%
- Build success rate > 95%
- Lighthouse score > 90
- Zero critical security issues

## Next Steps

1. Create project foundation
2. Implement design system
3. Build content structure
4. Develop search engine
5. Create core pages
6. Implement PWA
7. Add calculators
8. Add checklists
9. Test thoroughly
10. Deploy to production
