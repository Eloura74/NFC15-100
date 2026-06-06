const fs = require('fs');

const file1 = 'src/data/fiches/protections/disjoncteur-divisionnaire.json';
const data1 = JSON.parse(fs.readFileSync(file1, 'utf8'));

data1.immediateAnswer = "Éclairage = 16A max (câble 1.5mm²) | Prises classiques (max 8) = 16A max (câble 1.5mm²) | Prises classiques (max 12) = 20A max (câble 2.5mm²) | Four / Lave-linge = 20A max (câble 2.5mm²) | Plaques de cuisson = 32A max (câble 6mm²)";
data1.content.values = [
  { label: "Éclairage (max 8 points)", parameter: "Circuit", value: "16A max", unit: "1.5 mm²" },
  { label: "Prises classiques (max 8)", parameter: "Circuit", value: "16A max", unit: "1.5 mm²" },
  { label: "Prises classiques (max 12)", parameter: "Circuit", value: "20A max", unit: "2.5 mm²" },
  { label: "Prises Cuisine (max 6)", parameter: "Circuit", value: "20A max", unit: "2.5 mm²" },
  { label: "Lave-linge, Four, Lave-vaisselle", parameter: "Circuit Spécialisé", value: "20A max", unit: "2.5 mm²" },
  { label: "Plaques de cuisson", parameter: "Circuit Spécialisé", value: "32A max", unit: "6 mm²" },
  { label: "Chauffage < 4500W", parameter: "Circuit Spécialisé", value: "20A max", unit: "2.5 mm²" }
];
fs.writeFileSync(file1, JSON.stringify(data1, null, 2));


const file2 = 'src/data/fiches/circuits/hauteur-prises-interrupteurs.json';
const data2 = JSON.parse(fs.readFileSync(file2, 'utf8'));
data2.immediateAnswer = "Prises de courant standard = 5 cm minimum du sol | Prises 32A = 12 cm minimum du sol | Prises plan de travail = 8 cm minimum au-dessus du plan | Interrupteurs = entre 0.90 m et 1.30 m du sol";
data2.content.values = [
  { label: "Prises 16A standard", parameter: "Hauteur mini", value: "5 cm", unit: "du sol fini" },
  { label: "Prises 32A", parameter: "Hauteur mini", value: "12 cm", unit: "du sol fini" },
  { label: "Prises plan de travail", parameter: "Hauteur mini", value: "8 cm", unit: "au-dessus du plan (interdit au-dessus évier/feux)" },
  { label: "Interrupteurs", parameter: "Hauteur d'installation", value: "0.90m à 1.30m", unit: "du sol fini" },
  { label: "Prises PMR", parameter: "Hauteur d'installation", value: "≤ 1.30m", unit: "du sol fini" },
  { label: "Tableau électrique", parameter: "Hauteur d'installation", value: "1.00m à 1.80m", unit: "du sol fini" }
];
fs.writeFileSync(file2, JSON.stringify(data2, null, 2));


const file3 = 'src/data/fiches/circuits/sections-cables-courant.json';
const data3 = JSON.parse(fs.readFileSync(file3, 'utf8'));
data3.immediateAnswer = "10A/16A = câble 1.5mm² (max 40m pour prises) | 20A = câble 2.5mm² (max 50m) | 32A = câble 6mm² (max 50m) | Chute tension max : 3% (éclairage) ou 5% (autres usages).";
data3.content.values = [
  { label: "10A", parameter: "Disjoncteur", value: "1.5 mm²", unit: "(max 64m)", context: "Éclairage" },
  { label: "16A", parameter: "Disjoncteur", value: "1.5 mm²", unit: "(max 40m)", context: "Prises" },
  { label: "20A", parameter: "Disjoncteur", value: "2.5 mm²", unit: "(max 50m)", context: "Circuits spécialisés" },
  { label: "32A", parameter: "Disjoncteur", value: "6.0 mm²", unit: "(max 50m)", context: "Plaques de cuisson" },
  { label: "Éclairage", parameter: "Chute de tension", value: "≤ 3%", unit: "maximum autorisé", context: "Entre disjoncteur de branchement et point d'utilisation" },
  { label: "Autres usages", parameter: "Chute de tension", value: "≤ 5%", unit: "maximum autorisé", context: "Entre disjoncteur de branchement et prise" }
];
fs.writeFileSync(file3, JSON.stringify(data3, null, 2));

const file4 = 'src/data/fiches/locaux-speciaux/volumes-salle-eau.json';
const data4 = JSON.parse(fs.readFileSync(file4, 'utf8'));
data4.immediateAnswer = "Volume 0 = Intérieur baignoire/douche | Volume 1 = Au-dessus jusqu'à 2.25m (IPX4 min) | Volume 2 = 60cm autour du Volume 1 (Prises interdites sauf rasoir) | Hors Volume = Au-delà de 60cm.";
data4.content.values = [
  { label: "Volume 0", parameter: "Définition", value: "Intérieur baignoire/douche", unit: "", context: "Uniquement TBTS 12V (IPX7)" },
  { label: "Volume 1", parameter: "Définition", value: "Jusqu'à 2.25m au-dessus", unit: "du fond", context: "IPX4 minimum" },
  { label: "Volume 2", parameter: "Définition", value: "60 cm", unit: "autour du Volume 1", context: "IPX4 minimum" },
  { label: "Prises 230V classiques", parameter: "Installation", value: "Interdit", unit: "dans volumes 0, 1 et 2", context: "Autorisé Hors Volume" },
  { label: "Matériel Électrique V1", parameter: "Protection minimale", value: "IPX4", unit: "", context: "Chauffe-eau instantané autorisé" }
];
fs.writeFileSync(file4, JSON.stringify(data4, null, 2));

const file5 = 'src/data/fiches/circuits/nombre-prises-logement.json';
const data5 = JSON.parse(fs.readFileSync(file5, 'utf8'));
data5.immediateAnswer = "Séjour ≤ 28m² = 5 prises minimum | Séjour > 28m² = 7 prises minimum | Chambre = 3 prises minimum | Cuisine = 6 prises minimum (dont 4 plan de travail) | Autres pièces (>4m²) = 1 prise minimum.";
data5.content.values = [
  { label: "Séjour ≤ 28m²", parameter: "Prises 16A", value: "5 prises", unit: "minimum", context: "Dont 1 prise commandée / près interrupteur" },
  { label: "Séjour > 28m²", parameter: "Prises 16A", value: "7 prises", unit: "minimum", context: "Dont 1 prise commandée / près interrupteur" },
  { label: "Chambre", parameter: "Prises 16A", value: "3 prises", unit: "minimum", context: "Dont 1 prise commandée / près interrupteur" },
  { label: "Cuisine", parameter: "Prises 16A", value: "6 prises", unit: "minimum", context: "Dont 4 au-dessus du plan de travail" },
  { label: "Autres pièces > 4m²", parameter: "Prises 16A", value: "1 prise", unit: "minimum", context: "Couloir, bureau, WC..." }
];
fs.writeFileSync(file5, JSON.stringify(data5, null, 2));

console.log('JSON files successfully updated with NFC15-100 accurate data.');
