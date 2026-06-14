'use client';

const SOS_STORAGE_KEY = 'elecnorme-theme-sos';
const CHANTIER_STORAGE_KEY = 'elecnorme-mode-chantier';

export type ThemeMode = 'dark' | 'sos' | 'chantier';

export class ThemeManager {
  static getCurrentMode(): ThemeMode {
    if (typeof window === 'undefined') return 'dark';
    
    const isChantier = localStorage.getItem(CHANTIER_STORAGE_KEY) === 'true';
    const isSos = localStorage.getItem(SOS_STORAGE_KEY) === 'true';
    
    if (isChantier) return 'chantier';
    if (isSos) return 'sos';
    return 'dark';
  }

  static setMode(mode: ThemeMode) {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('dark', 'theme-sos', 'theme-chantier');
    
    // Apply new theme
    switch (mode) {
      case 'sos':
        root.classList.add('theme-sos');
        localStorage.setItem(SOS_STORAGE_KEY, 'true');
        localStorage.setItem(CHANTIER_STORAGE_KEY, 'false');
        break;
      case 'chantier':
        root.classList.add('theme-chantier');
        localStorage.setItem(CHANTIER_STORAGE_KEY, 'true');
        localStorage.setItem(SOS_STORAGE_KEY, 'false');
        break;
      case 'dark':
      default:
        root.classList.add('dark');
        localStorage.setItem(SOS_STORAGE_KEY, 'false');
        localStorage.setItem(CHANTIER_STORAGE_KEY, 'false');
        break;
    }
  }

  static toggleChantierMode(): boolean {
    const current = this.getCurrentMode();
    if (current === 'chantier') {
      this.setMode('dark');
      return false;
    } else {
      this.setMode('chantier');
      return true;
    }
  }

  static toggleSosMode(): boolean {
    const current = this.getCurrentMode();
    if (current === 'sos') {
      this.setMode('dark');
      return false;
    } else {
      this.setMode('sos');
      return true;
    }
  }

  static initializeTheme() {
    if (typeof window === 'undefined') return;
    
    const mode = this.getCurrentMode();
    this.setMode(mode);
  }
}
