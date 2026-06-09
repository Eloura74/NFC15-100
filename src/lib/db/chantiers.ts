import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface Chantier {
  id: string;
  name: string;
  client: string;
  address: string;
  date: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'en_cours' | 'termine' | 'en_attente';
  linkedItems: {
    checklists: string[]; // checklist IDs (e.g., 'logement-neuf')
    calculators: {
      type: string;
      data: any;
      date: Date;
    }[];
  };
}

interface ElecnormeDB extends DBSchema {
  chantiers: {
    key: string;
    value: Chantier;
    indexes: {
      'by-date': Date;
      'by-status': string;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<ElecnormeDB>> | null = null;

function getDB() {
  if (typeof window === 'undefined') return null;
  
  if (!dbPromise) {
    dbPromise = openDB<ElecnormeDB>('elecnorme_db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('chantiers')) {
          const store = db.createObjectStore('chantiers', { keyPath: 'id' });
          store.createIndex('by-date', 'date');
          store.createIndex('by-status', 'status');
        }
      },
    });
  }
  return dbPromise;
}

export async function createChantier(data: Omit<Chantier, 'id' | 'createdAt' | 'updatedAt' | 'linkedItems'>): Promise<string> {
  const db = await getDB();
  if (!db) throw new Error('Database not available');

  const id = crypto.randomUUID();
  const now = new Date();
  
  const chantier: Chantier = {
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
    linkedItems: {
      checklists: [],
      calculators: [],
    }
  };

  await db.add('chantiers', chantier);
  return id;
}

export async function getChantier(id: string): Promise<Chantier | undefined> {
  const db = await getDB();
  if (!db) return undefined;
  return db.get('chantiers', id);
}

export async function getAllChantiers(): Promise<Chantier[]> {
  const db = await getDB();
  if (!db) return [];
  const chantiers = await db.getAll('chantiers');
  return chantiers.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

export async function updateChantier(id: string, updates: Partial<Chantier>): Promise<void> {
  const db = await getDB();
  if (!db) return;

  const tx = db.transaction('chantiers', 'readwrite');
  const store = tx.objectStore('chantiers');
  const chantier = await store.get(id);

  if (!chantier) throw new Error('Chantier non trouvé');

  const updatedChantier = {
    ...chantier,
    ...updates,
    updatedAt: new Date(),
  };

  await store.put(updatedChantier);
  await tx.done;
}

export async function deleteChantier(id: string): Promise<void> {
  const db = await getDB();
  if (!db) return;
  await db.delete('chantiers', id);
}

export async function linkChecklistToChantier(chantierId: string, checklistId: string): Promise<void> {
  const db = await getDB();
  if (!db) return;

  const tx = db.transaction('chantiers', 'readwrite');
  const store = tx.objectStore('chantiers');
  const chantier = await store.get(chantierId);

  if (!chantier) throw new Error('Chantier non trouvé');

  if (!chantier.linkedItems.checklists.includes(checklistId)) {
    chantier.linkedItems.checklists.push(checklistId);
    chantier.updatedAt = new Date();
    await store.put(chantier);
  }
  
  await tx.done;
}
