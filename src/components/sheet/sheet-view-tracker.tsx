'use client';

import { useEffect } from 'react';
import { FavoritesManager } from '@/lib/favorites/favorites-manager';

interface SheetViewTrackerProps {
  sheetId: string;
}

export function SheetViewTracker({ sheetId }: SheetViewTrackerProps) {
  useEffect(() => {
    const trackView = async () => {
      try {
        await FavoritesManager.addRecentlyViewed(sheetId);
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    };

    trackView();
  }, [sheetId]);

  return null;
}
