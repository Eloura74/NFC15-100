export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  description: string;
  items: ChecklistItem[];
}

export const checklistsData: ChecklistTemplate[] = [
  {
    id: 'logement-neuf',
    name: 'Logement neuf',
    description: 'Checklist de pré-réception pour une installation neuve (Consuel)',
    items: [
      { id: 't1', label: 'Présence de l\'AGCP (Disjoncteur de branchement)', description: 'Accessible à l\'intérieur du logement' },
      { id: 't2', label: 'Prise de terre mesurée', description: 'Valeur < 100 ohms' },
      { id: 't3', label: 'Liaison équipotentielle principale (LEP)', description: 'Section minimum 16mm² cuivre' },
      { id: 't4', label: 'Tableau électrique (ETEL)', description: 'Espace technique respecté (largeur 60cm)' },
      { id: 't5', label: 'Protection différentielle 30mA', description: 'Sur l\'ensemble des circuits' },
      { id: 't6', label: 'Type A 30mA présent', description: 'Pour plaque de cuisson, lave-linge, IRVE' },
      { id: 't7', label: 'Réserve au tableau', description: '20% minimum pour le logement' },
      { id: 't8', label: 'Repérage des circuits', description: 'Étiquetage clair et pérenne sur le tableau' },
      { id: 't9', label: 'DCL (Dispositif Connexion Luminaire)', description: 'Présent à chaque point d\'éclairage' },
      { id: 't10', label: 'Prises de courant', description: 'Nombre respecté par pièce (ex: 5 minimum dans séjour > 28m²)' },
      { id: 't11', label: 'Réseau de communication (RJ45)', description: 'Coffret de communication présent et prises câblées' }
    ]
  },
  {
    id: 'tableau',
    name: 'Tableau électrique',
    description: 'Contrôle spécifique du tableau de répartition',
    items: [
      { id: 'tb1', label: 'Hauteur d\'installation', description: 'Manettes entre 0.90m et 1.80m du sol fini' },
      { id: 'tb2', label: 'Gaine Technique Logement (GTL)', description: 'Matérialisée du sol au plafond' },
      { id: 'tb3', label: 'Sectionnement général', description: 'Coupure d\'urgence facilement identifiable' },
      { id: 'tb4', label: 'Parafoudre', description: 'Installé si zone AQ2 ou alimentation aérienne' },
      { id: 'tb5', label: 'Serrage des connexions', description: 'Vérification de tous les couples de serrage' },
      { id: 'tb6', label: 'Absence de fils nus', description: 'Isolants bien en place, pas de cuivre visible' },
      { id: 'tb7', label: 'Schéma unifilaire', description: 'Présent et affiché/disponible' }
    ]
  },
  {
    id: 'salle-eau',
    name: 'Salle d\'eau',
    description: 'Vérifications des volumes et liaisons dans une salle de bain',
    items: [
      { id: 's1', label: 'Volume 0', description: 'Aucun appareillage électrique' },
      { id: 's2', label: 'Volume 1', description: 'Uniquement IPX5, 12V TBTS ou chauffe-eau si contrainte' },
      { id: 's3', label: 'Volume 2', description: 'Appareillage classe II, IPX4 minimum' },
      { id: 's4', label: 'Liaison équipotentielle supplémentaire (LES)', description: 'Relie tous les éléments métalliques (huisseries, baignoire, canalisations)' },
      { id: 's5', label: 'Prise de courant hors volume', description: 'Prise de courant > 60cm de la baignoire/douche' },
      { id: 's6', label: 'Éclairage DCL', description: 'Autorisé hors volume ou en volume 2 si IPX4 classe II' }
    ]
  }
];
