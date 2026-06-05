# Getting Started with ElecNorme

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **pnpm** / **yarn**)
- **Git** (for version control)
- A code editor (VS Code recommended)

## 🚀 Installation Steps

### 1. Install Dependencies

All TypeScript and CSS errors you're seeing are expected before installing dependencies. Run:

```bash
npm install
```

This will install all required packages including:
- Next.js 14+
- React 18+
- TailwindCSS
- shadcn/ui components
- Fuse.js (search)
- IndexedDB wrapper
- PWA support
- And all development tools

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

The default values are sufficient for development.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Status

### ✅ Completed

- [x] Project architecture designed
- [x] File structure planned
- [x] Configuration files created
- [x] TypeScript types defined
- [x] Basic Next.js setup
- [x] PWA manifest
- [x] Sample data structure
- [x] Global styles with dark theme

### 🚧 In Progress

The foundation is ready. Next steps:

1. **Install dependencies** (npm install)
2. **Verify the build** (npm run build)
3. **Create UI components** (shadcn/ui)
4. **Implement search engine**
5. **Build main pages**
6. **Add calculators**
7. **Implement offline mode**

## 📂 Current File Structure

```
Nfc15100/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ✅ Root layout
│   │   ├── page.tsx            ✅ Homepage
│   │   └── globals.css         ✅ Global styles
│   ├── types/
│   │   ├── content.ts          ✅ Content types
│   │   ├── search.ts           ✅ Search types
│   │   ├── user.ts             ✅ User data types
│   │   ├── calculator.ts       ✅ Calculator types
│   │   ├── checklist.ts        ✅ Checklist types
│   │   └── index.ts            ✅ Type exports
│   ├── lib/
│   │   └── utils.ts            ✅ Utility functions
│   └── data/
│       ├── versions/
│       │   └── index.json      ✅ Version data
│       ├── domaines/
│       │   └── index.json      ✅ Domain structure
│       └── fiches/
│           └── protections/
│               └── differentiel-30ma.json  ✅ Sample sheet
├── public/
│   └── manifest.json           ✅ PWA manifest
├── Configuration files         ✅ All created
└── Documentation              ✅ Complete
```

## 🎯 Next Actions

### Immediate (After npm install)

1. **Verify TypeScript compilation**:
   ```bash
   npm run type-check
   ```

2. **Test the development server**:
   ```bash
   npm run dev
   ```

3. **Install shadcn/ui components**:
   ```bash
   npx shadcn-ui@latest init
   ```
   Choose:
   - Style: Default
   - Base color: Slate
   - CSS variables: Yes

4. **Add essential UI components**:
   ```bash
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add card
   npx shadcn-ui@latest add input
   npx shadcn-ui@latest add badge
   npx shadcn-ui@latest add alert
   ```

### Short-term (This week)

1. Create layout components (Header, Footer, Navigation)
2. Implement search engine with Fuse.js
3. Create content display components
4. Build domain navigation
5. Add first calculator (Ohm's law)

### Medium-term (Next 2 weeks)

1. Complete all core pages
2. Implement PWA offline functionality
3. Add IndexedDB storage for favorites
4. Create all calculators
5. Build checklist system
6. Add more content sheets

## 🛠️ Development Workflow

### Adding a New Content Sheet

1. Create JSON file in `src/data/fiches/[domain]/`
2. Follow the structure in `differentiel-30ma.json`
3. Include all required fields
4. Add sources and verification date
5. Test with the search engine

### Creating a New Component

1. Create file in appropriate `src/components/` subdirectory
2. Use TypeScript
3. Follow naming conventions (kebab-case for files)
4. Use Tailwind for styling
5. Make it responsive (mobile-first)

### Running Tests

```bash
# Unit tests
npm test

# E2E tests (when implemented)
npm run test:e2e

# Content validation
npm run validate

# Link checking
npm run check-links
```

## 📱 PWA Testing

### Desktop (Chrome/Edge)

1. Open DevTools
2. Go to Application tab
3. Check Manifest
4. Test Service Worker
5. Install as app

### Mobile

1. Open in mobile browser
2. Look for "Add to Home Screen"
3. Install
4. Test offline mode

## 🎨 Design System

### Colors (Dark Theme)

- **Background**: `#0a0f1e` (Very dark blue-gray)
- **Foreground**: `#f8fafc` (Off-white)
- **Primary**: `#3b82f6` (Electric blue)
- **Warning**: `#f59e0b` (Orange)
- **Success**: `#10b981` (Green)
- **Destructive**: `#dc2626` (Red)

### Typography

- Base: 16px (14px on mobile)
- Line height: 1.5
- Font: System font stack

### Spacing

- Touch targets: Minimum 44x44px
- Padding: Consistent 4px increments
- Responsive breakpoints: 320px, 768px, 1024px, 1440px

## 🔍 Troubleshooting

### TypeScript Errors Before npm install

**Expected**. All errors about missing modules will resolve after `npm install`.

### Build Fails

1. Delete `node_modules` and `.next`
2. Run `npm install` again
3. Check Node.js version (>= 18)

### PWA Not Working

1. Check manifest.json is accessible
2. Verify HTTPS (or localhost)
3. Check Service Worker registration
4. Clear browser cache

### Styles Not Applied

1. Verify Tailwind config
2. Check PostCSS config
3. Restart dev server
4. Clear `.next` folder

## 📚 Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

### Project Docs

- `ARCHITECTURE.md` - Technical architecture
- `FILE_STRUCTURE.md` - Complete file tree
- `README.md` - Project overview

### Standards

- NF C 15-100 (purchase required)
- Promotelec guides
- CONSUEL documentation

## 🤝 Contributing

### Code Standards

- TypeScript strict mode
- ESLint + Prettier
- Meaningful commit messages
- Small, focused files (< 300 lines)
- SOLID principles

### Content Standards

- All sheets must have sources
- All sheets must have verification dates
- No copyrighted content without permission
- Clear distinction between obligation and recommendation
- Explicit application contexts

## 📞 Support

For questions or issues:

1. Check existing documentation
2. Review TypeScript types
3. Examine sample data structure
4. Test with provided examples

---

**Ready to start?** Run `npm install` and let's build ElecNorme! 🚀
