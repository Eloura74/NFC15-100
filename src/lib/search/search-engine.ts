import Fuse from 'fuse.js';
import type { ContentSheet } from '@/types';
import type { SearchOptions, SearchResult } from '@/types/search';

export class SearchEngine {
  private fuse: Fuse<ContentSheet> | null = null;
  private sheets: ContentSheet[] = [];

  constructor(sheets: ContentSheet[]) {
    this.sheets = sheets;
    this.initializeFuse();
  }

  private initializeFuse() {
    const options = {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'summary', weight: 2 },
        { name: 'keywords', weight: 2.5 },
        { name: 'synonyms', weight: 2 },
        { name: 'immediateAnswer', weight: 1.5 },
        { name: 'domain', weight: 1 },
        { name: 'subDomain', weight: 1 },
      ],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
    };

    this.fuse = new Fuse(this.sheets, options);
  }

  search(options: SearchOptions): SearchResult[] {
    if (!this.fuse || !options.query.trim()) {
      return [];
    }

    const results = this.fuse.search(options.query, {
      limit: options.limit || 20,
    });

    return results
      .map((result) => ({
        sheet: result.item,
        score: 1 - (result.score || 0),
        matches:
          result.matches?.map((match) => ({
            field: match.key as any,
            value: match.value || '',
          })) || [],
      }))
      .filter((result) => {
        if (!options.filters) return true;

        const { filters } = options;
        const { sheet } = result;

        if (filters.domains && !filters.domains.includes(sheet.domain)) {
          return false;
        }

        if (
          filters.subDomains &&
          sheet.subDomain &&
          !filters.subDomains.includes(sheet.subDomain)
        ) {
          return false;
        }

        if (filters.versions && !filters.versions.includes(sheet.version)) {
          return false;
        }

        if (
          filters.criticality &&
          !filters.criticality.includes(sheet.criticality)
        ) {
          return false;
        }

        if (filters.status && !filters.status.includes(sheet.status)) {
          return false;
        }

        return true;
      })
      .slice(0, options.limit || 20);
  }

  getAllSheets(): ContentSheet[] {
    return this.sheets;
  }

  getSheetById(id: string): ContentSheet | undefined {
    return this.sheets.find((sheet) => sheet.id === id);
  }

  getSheetsByDomain(domain: string): ContentSheet[] {
    return this.sheets.filter((sheet) => sheet.domain === domain);
  }

  getSheetsBySubDomain(domain: string, subDomain: string): ContentSheet[] {
    return this.sheets.filter(
      (sheet) => sheet.domain === domain && sheet.subDomain === subDomain
    );
  }
}
