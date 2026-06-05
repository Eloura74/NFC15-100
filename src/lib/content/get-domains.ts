import type { Domain } from '@/types';
import domainsData from '@/data/domaines/index.json';

export function getAllDomains(): Domain[] {
  return domainsData as Domain[];
}

export function getDomainById(id: string): Domain | null {
  const domains = getAllDomains();
  return domains.find((domain) => domain.id === id) || null;
}
