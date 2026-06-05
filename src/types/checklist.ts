export type ChecklistCategory =
  | 'preparation'
  | 'reception'
  | 'logement-neuf'
  | 'renovation'
  | 'mise-securite'
  | 'tableau'
  | 'salle-eau'
  | 'cuisine'
  | 'garage'
  | 'exterieur'
  | 'piscine'
  | 'irve'
  | 'photovoltaique'
  | 'terre'
  | 'controle'
  | 'consuel'
  | 'maintenance'
  | 'depannage';

export interface ChecklistTemplate {
  id: string;
  title: string;
  description: string;
  category: ChecklistCategory;
  items: ChecklistTemplateItem[];
  estimatedDuration?: number;
  requiredTools?: string[];
  safetyWarnings?: string[];
  relatedSheets?: string[];
}

export interface ChecklistTemplateItem {
  id: string;
  text: string;
  required: boolean;
  category?: string;
  helpText?: string;
  relatedSheet?: string;
  warningLevel?: 'info' | 'warning' | 'critical';
}
