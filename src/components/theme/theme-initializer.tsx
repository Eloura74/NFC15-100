'use client';

import { useEffect } from 'react';
import { ThemeManager } from '@/lib/theme/theme-manager';

export function ThemeInitializer() {
  useEffect(() => {
    ThemeManager.initializeTheme();
  }, []);

  return null;
}
