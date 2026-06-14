# Test du Mode Chantier

## ✅ Comment tester

### 1. Démarrer l'application
```bash
npm run dev
```

### 2. Ouvrir dans le navigateur
- Aller sur http://localhost:3000

### 3. Tester le bouton Mode Chantier

#### Étape 1: Identifier le bouton
- Chercher l'icône **casque** 🧢 (HardHat) dans le header
- Il est à côté du bouton soleil ☀️

#### Étape 2: Cliquer sur le bouton
- Le bouton devrait devenir **orange** quand actif
- Le bouton devrait être **gris/transparent** quand inactif

#### Étape 3: Vérifier les changements visuels

**Quand Mode Chantier ACTIVÉ:**
- ✅ Texte plus gros (18px au lieu de 16px)
- ✅ Titres plus gros (h1: 2.5rem, h2: 2rem)
- ✅ Boutons plus larges (min 48x48px)
- ✅ Bordures plus épaisses (2px)
- ✅ Pas d'animations
- ✅ Pas d'ombres
- ✅ Fond clair (98%)
- ✅ Contraste élevé

**Quand Mode Chantier DÉSACTIVÉ:**
- ✅ Retour au thème sombre normal
- ✅ Texte taille normale
- ✅ Animations présentes

### 4. Tester la persistance

#### Test 1: Rafraîchir la page
1. Activer le Mode Chantier
2. Rafraîchir la page (F5)
3. **Résultat attendu**: Le Mode Chantier reste activé

#### Test 2: Naviguer entre pages
1. Activer le Mode Chantier
2. Cliquer sur une fiche
3. Revenir à l'accueil
4. **Résultat attendu**: Le Mode Chantier reste activé

#### Test 3: Fermer/Rouvrir navigateur
1. Activer le Mode Chantier
2. Fermer le navigateur
3. Rouvrir et aller sur localhost:3000
4. **Résultat attendu**: Le Mode Chantier reste activé

### 5. Tester l'exclusion mutuelle

#### Test: Mode Chantier + Mode Soleil
1. Activer le Mode Chantier (bouton orange)
2. Cliquer sur Mode Soleil (bouton jaune)
3. **Résultat attendu**: 
   - Mode Chantier se désactive
   - Mode Soleil s'active
   - Un seul mode actif à la fois

## 🐛 Débogage

### Si le bouton ne fait rien:

1. **Ouvrir la console du navigateur** (F12)
2. Vérifier s'il y a des erreurs
3. Taper dans la console:
   ```javascript
   localStorage.getItem('elecnorme-mode-chantier')
   ```
   - Devrait retourner `"true"` si activé, `"false"` sinon

4. Vérifier les classes CSS sur `<html>`:
   ```javascript
   document.documentElement.classList
   ```
   - Devrait contenir `theme-chantier` si activé
   - Devrait contenir `dark` si désactivé

### Si les styles ne s'appliquent pas:

1. Vérifier que `globals.css` contient `.theme-chantier`
2. Vérifier dans DevTools que les styles sont bien appliqués
3. Forcer un rafraîchissement sans cache (Ctrl+Shift+R)

## 📊 Checklist de validation

- [ ] Le bouton casque est visible dans le header
- [ ] Le bouton devient orange quand cliqué
- [ ] Le texte devient plus gros
- [ ] Les boutons deviennent plus larges
- [ ] Les animations disparaissent
- [ ] Le fond devient clair
- [ ] Le mode persiste après rafraîchissement
- [ ] Un seul mode actif à la fois (Chantier OU Soleil)
- [ ] Le mode se désactive en re-cliquant

## 🎯 Résultat attendu

**Mode Chantier activé:**
```
✅ Bouton orange
✅ Texte 18px
✅ Boutons 48x48px
✅ Bordures 2px
✅ Pas d'animations
✅ Fond clair 98%
✅ Contraste élevé
```

**Mode Chantier désactivé:**
```
✅ Bouton gris/transparent
✅ Thème sombre normal
✅ Animations présentes
```

## 💡 Astuce

Pour tester rapidement dans la console:
```javascript
// Activer Mode Chantier
document.documentElement.classList.add('theme-chantier');
document.documentElement.classList.remove('dark', 'theme-sos');

// Désactiver Mode Chantier
document.documentElement.classList.add('dark');
document.documentElement.classList.remove('theme-chantier', 'theme-sos');
```
