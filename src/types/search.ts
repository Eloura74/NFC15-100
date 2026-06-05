import { ContentSheet, Criticality } from './content';

export interface SearchResult {
  sheet: ContentSheet;
  score: number;
  matches: SearchMatch[];
  reason?: string;
}

export interface SearchMatch {
  field: 'title' | 'summary' | 'keywords' | 'content' | 'synonyms';
  value: string;
  highlight?: string;
}

export interface SearchFilters {
  domains?: string[];
  subDomains?: string[];
  versions?: string[];
  criticality?: Criticality[];
  contexts?: string[];
  installationType?: string[];
  workContext?: string[];
  rooms?: string[];
  equipment?: string[];
  status?: string[];
}

export interface SearchOptions {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  threshold?: number;
}

export interface SearchIndex {
  sheets: SearchIndexEntry[];
  synonymMap: Record<string, string[]>;
  abbreviationMap: Record<string, string>;
  domainMap: Record<string, string[]>;
}

export interface SearchIndexEntry {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  synonyms: string[];
  domain: string;
  subDomain?: string;
  contexts: string[];
  version: string;
  criticality: string;
  status: string;
}
