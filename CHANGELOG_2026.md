# Changelog ElecNorme - Juin 2026

## 🎉 Version 1.1.0 - Améliorations majeures (7 juin 2026)

### ✅ Phase 1 : Conformité et contenu critique

#### 1. Disclaimer légal
- ✅ Composant `Disclaimer` réutilisable avec 3 variants (warning, info, critical)
- ✅ Ajouté sur page d'accueil et toutes les pages de calculateurs/guides
- ✅ Mentionne NFC 15-100 édition 2020 + amendements 2021-2026
- ✅ Style tech cohérent avec animations fluides

#### 2. Fiche différentiels type B/F
- ✅ Guide complet sur différentiels type B et F
- ✅ **Type B obligatoire** : photovoltaïque > 3kVA, IRVE triphasée
- ✅ **Type F recommandé** : continuité de service (congélateur, alarme)
- ✅ Tableau comparatif des 4 types (AC, A, F, B)
- ✅ Conforme NFC 15-100 amendement A5 (2021)
- ✅ Fichier : `/src/data/fiches/protections/differentiel-type-b-f.json`

#### 3. Volumes salle de bain interactif
- ✅ Composant interactif avec 4 volumes cliquables (0, 1, 2, hors)
- ✅ Affichage dynamique des règles par volume
- ✅ Équipements autorisés/interdits par volume
- ✅ Indices de protection (IPX4, IPX7)
- ✅ Liaison équipotentielle supplémentaire (LES)
- ✅ Style tech avec animations fluides
- ✅ Page dédiée : `/guides/volumes-salle-bain`
- ✅ Fichier : `/src/components/interactive/bathroom-volumes.tsx`

### ✅ Phase 2 : Calculateurs avancés

#### 4. Calculateur de section de câble
- ✅ Calcul conforme NFC 15-100 (chute de tension + intensités admissibles)
- ✅ Paramètres :
  - Puissance (W)
  - Tension (230V mono / 400V tri)
  - Longueur du câble (m)
  - Type de câble (cuivre / aluminium)
  - Mode de pose (encastré, apparent, combles, gaine)
- ✅ Résultats :
  - Section minimale (mm²)
  - Courant max admissible (A)
  - Chute de tension (%)
  - Validation conformité NFC 15-100
  - Avertissements et recommandations
- ✅ Sections normalisées : 1.5 à 240 mm²
- ✅ Courants admissibles selon mode de pose
- ✅ Protection recommandée calculée
- ✅ Fichier : `/src/components/calculators/cable-section-calculator.tsx`
- ✅ Page : `/calculateurs/section-cable`

#### 5. Page calculateurs améliorée
- ✅ Design moderne avec icônes et badges
- ✅ 6 calculateurs listés :
  - Section de câble (Populaire)
  - Chute de tension (Nouveau)
  - Puissance & Intensité
  - Calibre de protection
  - Courant de court-circuit (Avancé)
  - Tableaux de référence
- ✅ Animations fluides et hover effects
- ✅ Disclaimer intégré
- ✅ Fichier : `/src/app/calculateurs/page.tsx`

---

## 📊 Statistiques

### Fichiers créés
- `src/components/ui/disclaimer.tsx` - Composant disclaimer légal
- `src/data/fiches/protections/differentiel-type-b-f.json` - Fiche type B/F
- `src/components/interactive/bathroom-volumes.tsx` - Volumes salle de bain
- `src/app/guides/volumes-salle-bain/page.tsx` - Page volumes
- `src/components/calculators/cable-section-calculator.tsx` - Calculateur section
- `AMELIORATIONS_NECESSAIRES.md` - Roadmap complète

### Fichiers modifiés
- `src/app/page.tsx` - Ajout disclaimer homepage
- `src/app/calculateurs/page.tsx` - Design amélioré
- `src/app/calculateurs/section-cable/page.tsx` - Intégration calculateur avancé

### Lignes de code
- **~1200 lignes** de code ajoutées
- **100%** style cohérent avec le design tech
- **0** breaking changes

---

## 🎯 Prochaines étapes (Roadmap)

### Phase 3 : Calculateurs complémentaires (À venir)
- [ ] Calculateur de chute de tension
- [ ] Calculateur puissance/intensité (mono/tri)
- [ ] Calculateur calibre de protection
- [ ] Calculateur courant de court-circuit
- [ ] Tableaux de référence interactifs

### Phase 4 : Schémas interactifs (À venir)
- [ ] Schémas unifilaires types par pièce
- [ ] Schémas va-et-vient, télérupteur, minuterie
- [ ] Schémas de tableaux types (T1 à T5)
- [ ] Symboles électriques normalisés

### Phase 5 : Assistant projet (À venir)
- [ ] Wizard questions → recommandations
- [ ] Générateur de liste de matériel
- [ ] Estimateur de budget
- [ ] Export PDF du projet

### Phase 6 : Mode chantier (À venir)
- [ ] Interface simplifiée
- [ ] Gros boutons tactiles
- [ ] Mode offline (PWA)
- [ ] Accès rapide favoris

### Phase 7 : Fonctionnalités innovantes (À venir)
- [ ] Scan & Check : Photo tableau → analyse IA
- [ ] Simulateur 3D volumes salle de bain
- [ ] Assistant vocal
- [ ] Détecteur d'anomalies sur schémas

---

## 🔧 Améliorations techniques

### Performance
- Animations optimisées (GPU)
- Lazy loading des composants
- Code splitting automatique (Next.js)

### Accessibilité
- Contraste WCAG AA respecté
- Navigation clavier
- Labels ARIA
- Animations respectant `prefers-reduced-motion`

### SEO
- Metadata optimisés
- Structured data (à venir)
- Sitemap dynamique (à venir)

---

## 📝 Notes de conformité

### NFC 15-100
- Version : Édition 2020
- Amendements : A5 (2021), A6 (2023)
- Dernière vérification : Juin 2026
- Prochaine révision : Septembre 2026

### Disclaimer
Toutes les pages critiques incluent maintenant un disclaimer précisant :
- Les données sont informatives
- Seuls les textes officiels font foi
- Consulter un professionnel qualifié
- Version de la norme référencée

---

## 🎨 Design System

### Couleurs
- Primary : `hsl(217, 91%, 60%)` - Bleu tech
- Success : Vert pour validations
- Warning : Jaune pour avertissements
- Critical : Rouge pour erreurs

### Animations
- fadeIn : 0.3-1.2s ease-out
- pulse : 2-6s ease-in-out infinite
- hover : translate-y + scale + shadow
- Durée transitions : 300ms

### Composants
- Card : Gradient slate-900/950, shadow-lg
- Badge : Variants outline/default/success/warning
- Disclaimer : 3 variants avec icônes
- Calculator : Inputs + validation + résultats

---

## 🚀 Déploiement

### Environnements
- **Dev** : localhost:3000
- **Staging** : À configurer
- **Production** : À configurer

### CI/CD
- Build automatique sur commit
- Tests (à implémenter)
- Déploiement automatique (à configurer)

---

## 👥 Contributeurs

- Équipe éditoriale : Création contenu
- Expert technique : Validation conformité
- Développeur : Implémentation features

---

## 📞 Support

Pour toute question ou suggestion :
- Issues GitHub (à configurer)
- Email support (à configurer)
- Documentation (à compléter)

---

**Dernière mise à jour** : 7 juin 2026, 00:15 UTC+02:00
