'use client';

import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface FavoritesDB extends DBSchema {
  favorites: {
    key: string;
    value: {
      id: string;
      addedAt: number;
      notes?: string;
    };
  };
  recentlyViewed: {
    key: string;
    value: {
      id: string;
      viewedAt: number;
      viewCount: number;
    };
    indexes: { viewedAt: number };
  };
}

const DB_NAME = 'elecnorme-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<FavoritesDB>> | null = null;

async function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<FavoritesDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('recentlyViewed')) {
          const store = db.createObjectStore('recentlyViewed', {
            keyPath: 'id',
          });
          store.createIndex('viewedAt', 'viewedAt');
        }
      },
    });
  }
  return dbPromise;
}

export class FavoritesManager {
  static async addFavorite(sheetId: string, notes?: string): Promise<void> {
    const db = await getDB();
    await db.put('favorites', {
      id: sheetId,
      addedAt: Date.now(),
      notes,
    });
  }

  static async removeFavorite(sheetId: string): Promise<void> {
    const db = await getDB();
    await db.delete('favorites', sheetId);
  }

  static async isFavorite(sheetId: string): Promise<boolean> {
    const db = await getDB();
    const favorite = await db.get('favorites', sheetId);
    return !!favorite;
  }

  static async getAllFavorites(): Promise<
    Array<{ id: string; addedAt: number; notes?: string }>
  > {
    const db = await getDB();
    const favorites = await db.getAll('favorites');
    return favorites.sort((a, b) => b.addedAt - a.addedAt);
  }

  static async toggleFavorite(sheetId: string): Promise<boolean> {
    const isFav = await this.isFavorite(sheetId);
    if (isFav) {
      await this.removeFavorite(sheetId);
      return false;
    } else {
      await this.addFavorite(sheetId);
      return true;
    }
  }

  static async addRecentlyViewed(sheetId: string): Promise<void> {
    const db = await getDB();
    const existing = await db.get('recentlyViewed', sheetId);
    await db.put('recentlyViewed', {
      id: sheetId,
      viewedAt: Date.now(),
      viewCount: (existing?.viewCount || 0) + 1,
    });
  }

  static async getRecentlyViewed(
    limit: number = 10
  ): Promise<Array<{ id: string; viewedAt: number; viewCount: number }>> {
    const db = await getDB();
    const all = await db.getAll('recentlyViewed');
    return all.sort((a, b) => b.viewedAt - a.viewedAt).slice(0, limit);
  }

  static async clearRecentlyViewed(): Promise<void> {
    const db = await getDB();
    await db.clear('recentlyViewed');
  }

  static async exportFavorites(): Promise<string> {
    const favorites = await this.getAllFavorites();
    return JSON.stringify(favorites, null, 2);
  }

  static async importFavorites(jsonData: string): Promise<number> {
    try {
      const favorites = JSON.parse(jsonData);
      if (!Array.isArray(favorites)) {
        throw new Error('Invalid format');
      }

      const db = await getDB();
      let count = 0;

      for (const fav of favorites) {
        if (fav.id) {
          await db.put('favorites', {
            id: fav.id,
            addedAt: fav.addedAt || Date.now(),
            notes: fav.notes,
          });
          count++;
        }
      }

      return count;
    } catch (error) {
      throw new Error('Failed to import favorites');
    }
  }
}
