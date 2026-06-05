import type { ContentSheet } from '@/types';
import differentiel30ma from '@/data/fiches/protections/differentiel-30ma.json';
import disjoncteurBranchement from '@/data/fiches/protections/disjoncteur-branchement.json';
import prisesCuisine from '@/data/fiches/circuits/prises-cuisine.json';
import volumesSalleEau from '@/data/fiches/locaux-speciaux/volumes-salle-eau.json';
import priseTerreValeur from '@/data/fiches/terre/prise-terre-valeur.json';
import irveLogement from '@/data/fiches/energie/irve-logement.json';
import eclairageLogement from '@/data/fiches/circuits/eclairage-logement.json';
import disjoncteurBranchementDetail from '@/data/fiches/alimentation/disjoncteur-branchement-detail.json';
import gaineTechniqueLogement from '@/data/fiches/alimentation/gaine-technique-logement.json';
import differentielTypeA from '@/data/fiches/protections/differentiel-type-a.json';
import disjoncteurDivisionnaire from '@/data/fiches/protections/disjoncteur-divisionnaire.json';
import liaisonEquipotentielle from '@/data/fiches/terre/liaison-equipotentielle-principale.json';

export function getAllSheets(): ContentSheet[] {
  return [
    differentiel30ma as ContentSheet,
    disjoncteurBranchement as ContentSheet,
    prisesCuisine as ContentSheet,
    volumesSalleEau as ContentSheet,
    priseTerreValeur as ContentSheet,
    irveLogement as ContentSheet,
    eclairageLogement as ContentSheet,
    disjoncteurBranchementDetail as ContentSheet,
    gaineTechniqueLogement as ContentSheet,
    differentielTypeA as ContentSheet,
    disjoncteurDivisionnaire as ContentSheet,
    liaisonEquipotentielle as ContentSheet,
  ];
}

export function getSheetById(id: string): ContentSheet | null {
  const sheets = getAllSheets();
  return sheets.find((sheet) => sheet.id === id) || null;
}

export function getSheetsByDomain(domain: string): ContentSheet[] {
  const sheets = getAllSheets();
  return sheets.filter((sheet) => sheet.domain === domain);
}
