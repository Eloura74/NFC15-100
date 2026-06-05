export interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  selectedVersion: string;
  searchHistory: boolean;
  voiceSearch: boolean;
  hapticFeedback: boolean;
  emergencyMode: boolean;
  offlineMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reduceAnimations: boolean;
}

export interface Favorite {
  id: string;
  sheetId: string;
  addedAt: string;
  notes?: string;
  tags?: string[];
}

export interface SearchHistoryEntry {
  id: string;
  query: string;
  timestamp: string;
  resultCount: number;
  selectedSheetId?: string;
}

export interface LocalChecklist {
  id: string;
  templateId?: string;
  title: string;
  description?: string;
  category: string;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  siteInfo?: SiteInfo;
  progress: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  notes?: string;
  photos?: string[];
  timestamp?: string;
  required: boolean;
}

export interface SiteInfo {
  name: string;
  address?: string;
  client?: string;
  reference?: string;
  startDate?: string;
  endDate?: string;
}

export interface LocalSiteFolder {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  siteInfo: SiteInfo;
  checklists: string[];
  notes: Note[];
  calculations: Calculation[];
  photos: Photo[];
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface Calculation {
  id: string;
  type: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  timestamp: string;
  notes?: string;
}

export interface Photo {
  id: string;
  dataUrl: string;
  caption?: string;
  timestamp: string;
  location?: string;
}
