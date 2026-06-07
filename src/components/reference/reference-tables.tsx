'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter, Info, Zap, Cable, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

type TableType = 'sections' | 'calibres' | 'longueurs' | 'differentiels';

interface ReferenceData {
  id: string;
  type: TableType;
  category: string;
  parameter: string;
  value: string;
  condition: string;
  reference: string;
  note?: string;
}

const referenceData: ReferenceData[] = [
  // Sections de câble
  {
    id: 's1',
    type: 'sections',
    category: 'Éclairage',
    parameter: 'Section minimale',
    value: '1.5 mm²',
    condition: 'Circuit éclairage',
    reference: 'NFC 15-100 §771.314.2.1',
  },
  {
    id: 's2',
    type: 'sections',
    category: 'Prises',
    parameter: 'Section minimale',
    value: '2.5 mm²',
    condition: 'Circuit prises 16A',
    reference: 'NFC 15-100 §771.314.2.1',
  },
  {
    id: 's3',
    type: 'sections',
    category: 'Prises',
    parameter: 'Section minimale',
    value: '2.5 mm²',
    condition: 'Circuit prises 20A',
    reference: 'NFC 15-100 §771.314.2.1',
  },
  {
    id: 's4',
    type: 'sections',
    category: 'Cuisinière',
    parameter: 'Section minimale',
    value: '6 mm²',
    condition: 'Cuisinière 32A monophasé',
    reference: 'NFC 15-100 §771.314.2.1',
  },
  {
    id: 's5',
    type: 'sections',
    category: 'Cuisinière',
    parameter: 'Section minimale',
    value: '4 mm²',
    condition: 'Cuisinière 32A triphasé',
    reference: 'NFC 15-100 §771.314.2.1',
  },
  {
    id: 's6',
    type: 'sections',
    category: 'VMC',
    parameter: 'Section minimale',
    value: '1.5 mm²',
    condition: 'Circuit VMC',
    reference: 'NFC 15-100 §771.314.2.1',
  },
  {
    id: 's7',
    type: 'sections',
    category: 'Chauffage',
    parameter: 'Section minimale',
    value: '2.5 mm²',
    condition: 'Circuit chauffage 2250W',
    reference: 'NFC 15-100 §771.314.2.1',
  },
  {
    id: 's8',
    type: 'sections',
    category: 'Chauffage',
    parameter: 'Section minimale',
    value: '4 mm²',
    condition: 'Circuit chauffage 4500W',
    reference: 'NFC 15-100 §771.314.2.1',
  },
  {
    id: 's9',
    type: 'sections',
    category: 'Chauffage',
    parameter: 'Section minimale',
    value: '6 mm²',
    condition: 'Circuit chauffage 5750W',
    reference: 'NFC 15-100 §771.314.2.1',
  },
  {
    id: 's10',
    type: 'sections',
    category: 'IRVE',
    parameter: 'Section minimale',
    value: '6 mm²',
    condition: 'Borne IRVE 32A monophasé',
    reference: 'NFC 15-100 §722.314',
  },
  // Calibres de protection
  {
    id: 'c1',
    type: 'calibres',
    category: 'Éclairage',
    parameter: 'Calibre max',
    value: '16A',
    condition: 'Circuit éclairage',
    reference: 'NFC 15-100 §771.314.2.2',
  },
  {
    id: 'c2',
    type: 'calibres',
    category: 'Prises',
    parameter: 'Calibre max',
    value: '20A',
    condition: 'Circuit prises 2.5mm²',
    reference: 'NFC 15-100 §771.314.2.2',
  },
  {
    id: 'c3',
    type: 'calibres',
    category: 'Prises',
    parameter: 'Calibre max',
    value: '16A',
    condition: 'Circuit prises 2.5mm² (8 max)',
    reference: 'NFC 15-100 §771.314.2.2',
  },
  {
    id: 'c4',
    type: 'calibres',
    category: 'Lave-linge',
    parameter: 'Calibre recommandé',
    value: '20A',
    condition: 'Circuit spécialisé',
    reference: 'NFC 15-100 §771.314.2.2',
  },
  {
    id: 'c5',
    type: 'calibres',
    category: 'Lave-vaisselle',
    parameter: 'Calibre recommandé',
    value: '20A',
    condition: 'Circuit spécialisé',
    reference: 'NFC 15-100 §771.314.2.2',
  },
  {
    id: 'c6',
    type: 'calibres',
    category: 'Four',
    parameter: 'Calibre recommandé',
    value: '20A',
    condition: 'Circuit spécialisé',
    reference: 'NFC 15-100 §771.314.2.2',
  },
  {
    id: 'c7',
    type: 'calibres',
    category: 'Plaque',
    parameter: 'Calibre recommandé',
    value: '32A',
    condition: 'Circuit spécialisé',
    reference: 'NFC 15-100 §771.314.2.2',
  },
  // Longueurs maximales (formule NFC 15-100 : L = (ΔU × S × U) / (2 × ρ × I))
  // avec ρ = 0.0225 Ω·mm²/m pour cuivre, ΔU = 3% ou 5%
  {
    id: 'l1',
    type: 'longueurs',
    category: 'Éclairage',
    parameter: 'Longueur max',
    value: '54 m',
    condition: '1.5mm² / 10A / 230V monophasé',
    reference: 'NFC 15-100 §525',
    note: 'Chute de tension 3%',
  },
  {
    id: 'l2',
    type: 'longueurs',
    category: 'Prises',
    parameter: 'Longueur max',
    value: '40 m',
    condition: '2.5mm² / 16A / 230V monophasé',
    reference: 'NFC 15-100 §525',
    note: 'Chute de tension 5%',
  },
  {
    id: 'l3',
    type: 'longueurs',
    category: 'Prises',
    parameter: 'Longueur max',
    value: '32 m',
    condition: '2.5mm² / 20A / 230V monophasé',
    reference: 'NFC 15-100 §525',
    note: 'Chute de tension 5%',
  },
  {
    id: 'l4',
    type: 'longueurs',
    category: 'Chauffage',
    parameter: 'Longueur max',
    value: '32 m',
    condition: '2.5mm² / 20A / 230V monophasé',
    reference: 'NFC 15-100 §525',
    note: 'Chute de tension 5%',
  },
  {
    id: 'l5',
    type: 'longueurs',
    category: 'Chauffage',
    parameter: 'Longueur max',
    value: '51 m',
    condition: '4mm² / 25A / 230V monophasé',
    reference: 'NFC 15-100 §525',
    note: 'Chute de tension 5%',
  },
  {
    id: 'l6',
    type: 'longueurs',
    category: 'IRVE',
    parameter: 'Longueur max',
    value: '40 m',
    condition: '6mm² / 32A / 230V monophasé',
    reference: 'NFC 15-100 §525',
    note: 'Chute de tension 5%',
  },
  {
    id: 'l7',
    type: 'longueurs',
    category: 'IRVE',
    parameter: 'Longueur max',
    value: '69 m',
    condition: '6mm² / 32A / 400V triphasé',
    reference: 'NFC 15-100 §525',
    note: 'Chute de tension 5%',
  },
  // Différentiels
  {
    id: 'd1',
    type: 'differentiels',
    category: 'Type A',
    parameter: 'Sensibilité',
    value: '30 mA',
    condition: 'Circuits normaux + LL/LV/Four',
    reference: 'NFC 15-100 §411.3.3',
    note: 'Protection des personnes, courant alternatif + composante continue',
  },
  {
    id: 'd2',
    type: 'differentiels',
    category: 'Type B',
    parameter: 'Sensibilité',
    value: '30 mA',
    condition: 'Photovoltaïque / IRVE triphasée',
    reference: 'NFC 15-100 §411.3.3',
    note: 'Courant continu et alternatif',
  },
  {
    id: 'd3',
    type: 'differentiels',
    category: 'Type F',
    parameter: 'Sensibilité',
    value: '30 mA',
    condition: 'Continuité de service',
    reference: 'NFC 15-100 §411.3.3',
    note: 'Anti-déclenchement intempestif (frigo, congélateur)',
  },
  {
    id: 'd4',
    type: 'differentiels',
    category: 'Type AC',
    parameter: 'Sensibilité',
    value: '30 mA',
    condition: 'Circuits éclairage uniquement',
    reference: 'NFC 15-100 §411.3.3',
    note: 'Courant alternatif pur uniquement',
  },
  {
    id: 'd5',
    type: 'differentiels',
    category: 'Type S',
    parameter: 'Sensibilité',
    value: '300 mA',
    condition: 'Tête d&apos;installation (sélectivité)',
    reference: 'NFC 15-100 §535.4',
    note: 'Sélectivité avec 30mA en aval',
  },
  {
    id: 'd6',
    type: 'differentiels',
    category: 'Type Si',
    parameter: 'Sensibilité',
    value: '30 mA',
    condition: 'Sélectivité renforcée',
    reference: 'NFC 15-100 §535.4',
    note: 'Sélectivité avec retard intentionnel',
  },
];

export function ReferenceTables() {
  const [selectedType, setSelectedType] = useState<TableType>('sections');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredData = referenceData
    .filter((item) => item.type === selectedType)
    .filter((item) => {
      if (selectedCategory === 'all') return true;
      return item.category === selectedCategory;
    })
    .filter((item) => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        item.parameter.toLowerCase().includes(search) ||
        item.value.toLowerCase().includes(search) ||
        item.condition.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search)
      );
    });

  const categories = Array.from(
    new Set(
      referenceData
        .filter((item) => item.type === selectedType)
        .map((item) => item.category)
    )
  );

  const typeIcons = {
    sections: <Cable className="w-5 h-5" />,
    calibres: <Zap className="w-5 h-5" />,
    longueurs: <Cable className="w-5 h-5" />,
    differentiels: <Shield className="w-5 h-5" />,
  };

  const typeNames = {
    sections: 'Sections de câble',
    calibres: 'Calibres de protection',
    longueurs: 'Longueurs maximales',
    differentiels: 'Différentiels',
  };

  return (
    <div className="space-y-6">
      {/* Type selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(typeNames) as TableType[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelectedType(type);
              setSelectedCategory('all');
              setSearchTerm('');
            }}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-300 text-center',
              selectedType === type
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground'
            )}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              {typeIcons[type]}
              <span className="font-semibold">{typeNames[type]}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-white/10">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Rechercher</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Paramètre, valeur, condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900/60"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-white/10 rounded-md text-sm"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {typeIcons[selectedType]}
            {typeNames[selectedType]}
          </CardTitle>
          <CardDescription>
            {filteredData.length} résultat(s) - NFC 15-100
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-primary">Catégorie</TableHead>
                  <TableHead className="text-primary">Paramètre</TableHead>
                  <TableHead className="text-primary">Valeur</TableHead>
                  <TableHead className="text-primary">Condition</TableHead>
                  <TableHead className="text-primary">Référence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-white/5 hover:bg-white/5"
                  >
                    <TableCell className="font-medium">
                      {item.category}
                    </TableCell>
                    <TableCell>{item.parameter}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-primary border-primary/30"
                      >
                        {item.value}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.condition}
                    </TableCell>
                    <TableCell className="text-xs text-primary/70">
                      {item.reference}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucun résultat pour cette recherche
            </div>
          )}

          {filteredData.length > 0 && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-start gap-2 text-sm text-blue-200">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Note importante</p>
                  <p>
                    Ces valeurs sont issues de la NFC 15-100. Toujours vérifier
                    les conditions spécifiques de votre installation et
                    consulter les textes officiels pour une application
                    conforme.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
