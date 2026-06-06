export type ContentStatus =
  | 'draft'
  | 'in_review'
  | 'technical_review'
  | 'legal_review'
  | 'validated'
  | 'published'
  | 'to_revise'
  | 'obsolete'
  | 'archived';

export type Criticality =
  | 'information'
  | 'conseil'
  | 'attention'
  | 'critique'
  | 'danger_immediat';

export type ConfidenceLevel =
  | 'source_reglementaire'
  | 'source_normative'
  | 'source_institutionnelle'
  | 'interpretation_technique'
  | 'recommandation_professionnelle'
  | 'information_fabricant'
  | 'contenu_pedagogique'
  | 'a_confirmer';

export interface Context {
  type: 'installation' | 'work' | 'room' | 'equipment' | 'domain';
  value: string;
  required?: boolean;
}

export interface Value {
  label?: string;
  parameter?: string;
  context?: string;
  value: string | number;
  unit?: string;
  conditions?: string[];
  source?: string;
}

export interface Risk {
  description: string;
  level: 'faible' | 'moyen' | 'eleve' | 'critique';
  consequences?: string[];
}

export interface Source {
  id: string;
  type:
    | 'reglementaire'
    | 'normative'
    | 'institutionnelle'
    | 'fabricant'
    | 'autre';
  title: string;
  reference: string;
  article?: string;
  date?: string;
  url?: string;
}

export interface HistoryEntry {
  date: string;
  author: string;
  action: 'created' | 'updated' | 'validated' | 'published' | 'archived';
  description: string;
  changes?: string[];
}

export interface ContentSheet {
  id: string;
  title: string;
  summary: string;
  immediateAnswer: string;
  domain: string;
  subDomain?: string;
  keywords: string[];
  synonyms: string[];
  applicableContexts: Context[];
  excludedContexts: Context[];
  version: string;
  lastVerified: string;
  status: ContentStatus;
  criticality: Criticality;
  confidence: ConfidenceLevel;

  content: {
    whenApplies: string;
    requirements: string[];
    values: Value[];
    exceptions: string[];
    specialCases: string[];
    commonErrors: string[];
    risks: Risk[];
    controls: string[];
    checklist?: string[];
  };

  sources: Source[];
  relatedSheets: string[];
  illustrations?: string[];

  author: string;
  verifier?: string;
  history: HistoryEntry[];
  tags: string[];
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  icon?: string;
  subDomains?: SubDomain[];
  sheetCount: number;
}

export interface SubDomain {
  id: string;
  name: string;
  description: string;
  sheetCount: number;
}

export interface Version {
  id: string;
  name: string;
  fullName: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  majorChanges?: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  synonyms?: string[];
  relatedTerms?: string[];
  examples?: string[];
  sources?: Source[];
}
