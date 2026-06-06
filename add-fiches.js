const fs = require('fs');
const path = require('path');

const fiches = [
  {
    path: "src/data/fiches/tableau/gaine-technique-logement.json",
    content: {
      "id": "gaine-technique-logement",
      "title": "ETEL et GTL",
      "summary": "Règles de dimensionnement de la Gaine Technique du Logement",
      "immediateAnswer": "L'ETEL est un volume du sol au plafond dédié à l'électricité. | Largeur min = 60cm (ou largeur GTL + 10cm). | Profondeur min = 25cm. | La GTL intègre : compteur, disjoncteur général, tableau électrique et coffret de communication.",
      "domain": "tableau",
      "subDomain": "gtl",
      "keywords": ["gtl", "etel", "gaine technique", "espace technique", "tableau"],
      "synonyms": ["gaine technique", "espace electrique"],
      "applicableContexts": [{"type": "installation", "value": "Toute installation", "required": true}],
      "excludedContexts": [],
      "version": "nfc15100-2020",
      "lastVerified": "2024-01-15",
      "status": "published",
      "criticality": "critique",
      "confidence": "source_normative",
      "content": {
        "whenApplies": "Création ou rénovation totale d'une installation électrique",
        "requirements": [
          "L'ETEL doit être exclusivement réservé aux équipements électriques",
          "Aucune canalisation d'eau ou de gaz ne doit traverser l'ETEL",
          "L'ETEL va impérativement du sol au plafond"
        ],
        "values": [
          {"label": "Largeur ETEL", "parameter": "Dimensions", "value": "60 cm", "unit": "minimum", "context": "Ou largeur de la GTL + 10cm"},
          {"label": "Profondeur ETEL", "parameter": "Dimensions", "value": "25 cm", "unit": "minimum", "context": "Depuis le mur fini"},
          {"label": "Disjoncteur EDF", "parameter": "Accessibilité", "value": "0.90m à 1.30m", "unit": "du sol", "context": "Axe de l'organe de manœuvre"},
          {"label": "Tableau (Général)", "parameter": "Accessibilité", "value": "1.00m à 1.80m", "unit": "du sol", "context": "Manettes des disjoncteurs"},
          {"label": "Tableau (PMR)", "parameter": "Accessibilité", "value": "1.00m à 1.30m", "unit": "du sol", "context": "Logement accessible PMR"},
          {"label": "Coffret Com", "parameter": "Accessibilité", "value": "Min 5 cm", "unit": "du sol", "context": "Sous le tableau électrique"}
        ],
        "exceptions": [],
        "specialCases": [
          "Si logement < 35m², l'ETEL peut être réduit à 45cm de large",
          "Rénovation : la GTL peut ne pas être matérialisée par une goulotte si les câbles sont encastrés"
        ],
        "commonErrors": [
          "Faire passer un tuyau d'eau dans le volume de l'ETEL",
          "Placer le tableau trop haut (> 1.80m)",
          "Ne pas prévoir la réserve de 20% dans le tableau"
        ]
      },
      "sources": [{"id": "nfc15100", "type": "normative", "title": "NF C 15-100", "reference": "§ 771.558", "date": "2020"}],
      "relatedSheets": ["tableau-logement"],
      "author": "Expert technique",
      "verifier": "Comité",
      "history": [{"date": "2026-06-06", "author": "Expert", "action": "created", "description": "Création"}],
      "tags": ["gtl", "etel", "tableau"]
    }
  },
  {
    path: "src/data/fiches/reseau/prises-communication-rj45.json",
    content: {
      "id": "prises-communication-rj45",
      "title": "Prises de communication RJ45",
      "summary": "Nombre et type de prises RJ45 obligatoires dans un logement",
      "immediateAnswer": "T1 / T2 = 2 prises RJ45 min | T3 = 3 prises RJ45 min | T4 et + = 4 prises RJ45 min. | Les prises doivent être câblées en étoile depuis le coffret de communication (jamais chaînées). | Câble minimum requis : Grade 2 TV ou Grade 3 TV.",
      "domain": "reseau",
      "subDomain": "communication",
      "keywords": ["rj45", "communication", "internet", "grade 2", "grade 3", "vdi"],
      "synonyms": ["prises réseau", "prises internet"],
      "applicableContexts": [{"type": "installation", "value": "Logement neuf ou rénovation totale", "required": true}],
      "excludedContexts": [],
      "version": "nfc15100-2020",
      "lastVerified": "2024-01-15",
      "status": "published",
      "criticality": "normale",
      "confidence": "source_normative",
      "content": {
        "whenApplies": "Obligatoire pour garantir l'accès aux réseaux de communication dans tout le logement.",
        "requirements": [
          "Câblage en étoile depuis le tableau de communication",
          "Prise RJ45 juxtaposée ou répartie dans les pièces principales",
          "Câbles de communication à distance des câbles de puissance"
        ],
        "values": [
          {"label": "Studio / T1", "parameter": "Quantité", "value": "2 prises", "unit": "minimum", "context": "Juxtaposées ou réparties"},
          {"label": "T2", "parameter": "Quantité", "value": "2 prises", "unit": "minimum", "context": "Juxtaposées ou réparties"},
          {"label": "T3", "parameter": "Quantité", "value": "3 prises", "unit": "minimum", "context": "Juxtaposées ou réparties"},
          {"label": "T4 et plus", "parameter": "Quantité", "value": "4 prises", "unit": "minimum", "context": "Juxtaposées ou réparties"},
          {"label": "Type de câble", "parameter": "Matériel", "value": "Grade 2 TV", "unit": "minimum", "context": "Grade 3 TV recommandé"},
          {"label": "Proximité", "parameter": "Installation", "value": "Près d'une prise 16A", "unit": "", "context": "Obligatoire (pour box/TV)"}
        ],
        "exceptions": [],
        "specialCases": ["Si la TV est distribuée par coaxial, une RJ45 doit tout de même être présente dans la pièce principale"],
        "commonErrors": [
          "Chaîner les prises RJ45 (interdit, réseau en étoile obligatoire)",
          "Passer les câbles réseau dans la même gaine que le 230V sans séparation"
        ]
      },
      "sources": [{"id": "nfc15100", "type": "normative", "title": "NF C 15-100", "reference": "NF C 15-100", "date": "2020"}],
      "relatedSheets": ["gaine-technique-logement"],
      "author": "Expert",
      "verifier": "Comité",
      "history": [{"date": "2026-06-06", "author": "Expert", "action": "created", "description": "Création"}],
      "tags": ["rj45", "reseau", "internet"]
    }
  },
  {
    path: "src/data/fiches/circuits/eclairage-dcl.json",
    content: {
      "id": "eclairage-dcl",
      "title": "Éclairage et Boîtes DCL",
      "summary": "Règles concernant les points d'éclairage et les boîtes de connexion DCL",
      "immediateAnswer": "1 point d'éclairage minimum par pièce | Boîte DCL (Dispositif de Connexion Luminaire) obligatoire | Si DCL impossible, utiliser patère ou hublot. | Extérieur : éclairage obligatoire au-dessus de chaque entrée principale.",
      "domain": "circuits",
      "subDomain": "eclairage",
      "keywords": ["dcl", "éclairage", "plafonnier", "applique", "lumière"],
      "synonyms": ["point lumineux", "centre", "boite dcl"],
      "applicableContexts": [{"type": "installation", "value": "Toute installation", "required": true}],
      "excludedContexts": [],
      "version": "nfc15100-2020",
      "lastVerified": "2024-01-15",
      "status": "published",
      "criticality": "normale",
      "confidence": "source_normative",
      "content": {
        "whenApplies": "Installation de tous les points d'éclairage intérieurs et extérieurs.",
        "requirements": [
          "Boîte DCL obligatoire pour tout centre ou applique",
          "Un point d'éclairage central par pièce principale",
          "Présence d'un socle DCL avec sa douille enfichable (test chantier)"
        ],
        "values": [
          {"label": "Séjour, Chambre, Cuisine", "parameter": "Quantité", "value": "1 centre", "unit": "minimum", "context": "Éclairage au plafond obligatoire"},
          {"label": "Couloir, WC, Salle d'eau", "parameter": "Quantité", "value": "1 point", "unit": "minimum", "context": "Plafond ou applique"},
          {"label": "Boîte DCL", "parameter": "Matériel", "value": "Obligatoire", "unit": "", "context": "Pour raccordement final"},
          {"label": "Calibre protection", "parameter": "Disjoncteur", "value": "16A max", "unit": "", "context": "Généralement 10A utilisé"},
          {"label": "Section câble", "parameter": "Conducteur", "value": "1.5 mm²", "unit": "", "context": "Minimum"}
        ],
        "exceptions": [],
        "specialCases": ["Si volume architectural (poutres, verrières) rend le centre impossible, 2 appliques commandées ou 2 prises commandées (sauf chambre) peuvent remplacer le centre"],
        "commonErrors": ["Laisser les fils nus sans boîte DCL", "Oublier la connexion de terre sur la boîte DCL (obligatoire même si le luminaire est de classe II)"]
      },
      "sources": [{"id": "nfc15100", "type": "normative", "title": "NF C 15-100", "reference": "NF C 15-100", "date": "2020"}],
      "relatedSheets": ["sections-cables-courant"],
      "author": "Expert",
      "verifier": "Comité",
      "history": [{"date": "2026-06-06", "author": "Expert", "action": "created", "description": "Création"}],
      "tags": ["dcl", "eclairage"]
    }
  }
];

fiches.forEach(fiche => {
  const fullPath = path.join(__dirname, fiche.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, JSON.stringify(fiche.content, null, 2), 'utf8');
  console.log(`Created ${fiche.path}`);
});
