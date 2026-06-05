import type { Version } from '@/types';
import versionsData from '@/data/versions/index.json';

export function getAllVersions(): Version[] {
  return versionsData as Version[];
}

export function getCurrentVersion(): Version | null {
  const versions = getAllVersions();
  return versions.find((v) => v.isCurrent) || null;
}

export function getVersionById(id: string): Version | null {
  const versions = getAllVersions();
  return versions.find((v) => v.id === id) || null;
}
