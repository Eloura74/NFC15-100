import type { ContentSheet } from '@/types';
import differentiel30ma from '@/data/fiches/protections/differentiel-30ma.json';
import disjoncteurBranchement from '@/data/fiches/protections/disjoncteur-branchement.json';
import prisesCuisine from '@/data/fiches/circuits/prises-cuisine.json';
import volumesSalleEau from '@/data/fiches/locaux-speciaux/volumes-salle-eau.json';
import priseTerreValeur from '@/data/fiches/terre/prise-terre-valeur.json';
import irveLogement from '@/data/fiches/energie/irve-logement.json';
import eclairageLogement from '@/data/fiches/circuits/eclairage-logement.json';
import disjoncteurBranchementDetail from '@/data/fiches/alimentation/disjoncteur-branchement-detail.json';
import branchementReseau from '@/data/fiches/alimentation/branchement-reseau.json';
import tableauElectrique from '@/data/fiches/alimentation/tableau-electrique.json';
import gaineTechniqueLogement from '@/data/fiches/alimentation/gaine-technique-logement.json';
import comptageElectrique from '@/data/fiches/alimentation/comptage-electrique.json';
import differentielTypeA from '@/data/fiches/protections/differentiel-type-a.json';
import disjoncteurDivisionnaire from '@/data/fiches/protections/disjoncteur-divisionnaire.json';
import liaisonEquipotentielle from '@/data/fiches/terre/liaison-equipotentielle-principale.json';
import sectionsCablesCourant from '@/data/fiches/circuits/sections-cables-courant.json';
import puissanceSouscriteCalibre from '@/data/fiches/alimentation/puissance-souscrite-calibre.json';
import nombreDifferentiels from '@/data/fiches/protections/nombre-differentiels.json';
import calibreDisjoncteur from '@/data/fiches/protections/calibre-disjoncteur.json';
import typeDifferentiel from '@/data/fiches/protections/type-differentiel.json';
import nombrePrisesLogement from '@/data/fiches/circuits/nombre-prises-logement.json';
import hauteurPrisesInterrupteurs from '@/data/fiches/circuits/hauteur-prises-interrupteurs.json';
import parafoudreObligation from '@/data/fiches/protections/parafoudre-obligation.json';
import mesureResistanceTerre from '@/data/fiches/terre/mesure-resistance-terre.json';
import circuitPlaquesCuisson from '@/data/fiches/circuits/circuit-plaques-cuisson.json';
import circuitChauffage from '@/data/fiches/circuits/circuit-chauffage.json';
import eclairageDcl from '@/data/fiches/circuits/eclairage-dcl.json';
import prisesCommunicationRj45 from '@/data/fiches/reseau/prises-communication-rj45.json';
import gtlEtel from '@/data/fiches/tableau/gaine-technique-logement.json';
import piscineElectrique from '@/data/fiches/locaux-speciaux/piscine-electrique.json';
import installationExterieure from '@/data/fiches/locaux-speciaux/installation-exterieure.json';
import photovoltaiqueLogement from '@/data/fiches/energie/photovoltaique-logement.json';

export function getAllSheets(): ContentSheet[] {
  return [
    differentiel30ma as unknown as ContentSheet,
    disjoncteurBranchement as unknown as ContentSheet,
    prisesCuisine as unknown as ContentSheet,
    volumesSalleEau as unknown as ContentSheet,
    priseTerreValeur as unknown as ContentSheet,
    irveLogement as unknown as ContentSheet,
    eclairageLogement as unknown as ContentSheet,
    disjoncteurBranchementDetail as unknown as ContentSheet,
    branchementReseau as unknown as ContentSheet,
    tableauElectrique as unknown as ContentSheet,
    gaineTechniqueLogement as unknown as ContentSheet,
    comptageElectrique as unknown as ContentSheet,
    differentielTypeA as unknown as ContentSheet,
    disjoncteurDivisionnaire as unknown as ContentSheet,
    liaisonEquipotentielle as unknown as ContentSheet,
    sectionsCablesCourant as unknown as ContentSheet,
    puissanceSouscriteCalibre as unknown as ContentSheet,
    nombreDifferentiels as unknown as ContentSheet,
    calibreDisjoncteur as unknown as ContentSheet,
    typeDifferentiel as unknown as ContentSheet,
    nombrePrisesLogement as unknown as ContentSheet,
    hauteurPrisesInterrupteurs as unknown as ContentSheet,
    parafoudreObligation as unknown as ContentSheet,
    mesureResistanceTerre as unknown as ContentSheet,
    circuitPlaquesCuisson as unknown as ContentSheet,
    circuitChauffage as unknown as ContentSheet,
    eclairageDcl as unknown as ContentSheet,
    prisesCommunicationRj45 as unknown as ContentSheet,
    gtlEtel as unknown as ContentSheet,
    piscineElectrique as unknown as ContentSheet,
    installationExterieure as unknown as ContentSheet,
    photovoltaiqueLogement as unknown as ContentSheet,
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
