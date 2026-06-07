'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, Zap, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type TableauType = 'T1' | 'T2' | 'T3' | 'T4' | 'T5';

interface Circuit {
  id: string;
  name: string;
  protection: string;
  section: string;
  color: string;
}

interface TableauInfo {
  type: TableauType;
  surface: string;
  description: string;
  circuits: Circuit[];
  totalCircuits: number;
  reserve: number;
}

const tableauxData: Record<TableauType, TableauInfo> = {
  T1: {
    type: 'T1',
    surface: '≤ 35 m²',
    description: 'Studio ou T1',
    circuits: [
      { id: 'E1', name: 'Éclairage 1', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E2', name: 'Éclairage 2', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'P1', name: 'Prises 1', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P2', name: 'Prises 2', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P3', name: 'Prises 3', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P4', name: 'Prises 4', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'S1', name: 'Spécialisé LL', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
      { id: 'S2', name: 'Spécialisé LV', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
    ],
    totalCircuits: 8,
    reserve: 2,
  },
  T2: {
    type: 'T2',
    surface: '35-50 m²',
    description: 'T2',
    circuits: [
      { id: 'E1', name: 'Éclairage 1', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E2', name: 'Éclairage 2', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E3', name: 'Éclairage 3', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E4', name: 'Éclairage 4', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'P1', name: 'Prises 1', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P2', name: 'Prises 2', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P3', name: 'Prises 3', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P4', name: 'Prises 4', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P5', name: 'Prises 5', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P6', name: 'Prises 6', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'S1', name: 'Spécialisé LL', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
      { id: 'S2', name: 'Spécialisé LV', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
    ],
    totalCircuits: 12,
    reserve: 3,
  },
  T3: {
    type: 'T3',
    surface: '50-70 m²',
    description: 'T3',
    circuits: [
      { id: 'E1', name: 'Éclairage 1', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E2', name: 'Éclairage 2', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E3', name: 'Éclairage 3', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E4', name: 'Éclairage 4', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'P1', name: 'Prises 1', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P2', name: 'Prises 2', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P3', name: 'Prises 3', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P4', name: 'Prises 4', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P5', name: 'Prises 5', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P6', name: 'Prises 6', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P7', name: 'Prises 7', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P8', name: 'Prises 8', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'S1', name: 'Spécialisé LL', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
      { id: 'S2', name: 'Spécialisé LV', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
      { id: 'S3', name: 'Spécialisé Four', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
      { id: 'S4', name: 'Spécialisé Plaque', protection: '32A', section: '4mm²', color: 'text-purple-400' },
    ],
    totalCircuits: 16,
    reserve: 4,
  },
  T4: {
    type: 'T4',
    surface: '70-100 m²',
    description: 'T4',
    circuits: [
      { id: 'E1', name: 'Éclairage 1', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E2', name: 'Éclairage 2', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E3', name: 'Éclairage 3', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E4', name: 'Éclairage 4', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E5', name: 'Éclairage 5', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E6', name: 'Éclairage 6', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'P1', name: 'Prises 1', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P2', name: 'Prises 2', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P3', name: 'Prises 3', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P4', name: 'Prises 4', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P5', name: 'Prises 5', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P6', name: 'Prises 6', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P7', name: 'Prises 7', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P8', name: 'Prises 8', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P9', name: 'Prises 9', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P10', name: 'Prises 10', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'S1', name: 'Spécialisé LL', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
      { id: 'S2', name: 'Spécialisé LV', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
      { id: 'S3', name: 'Spécialisé Four', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
      { id: 'S4', name: 'Spécialisé Plaque', protection: '32A', section: '4mm²', color: 'text-purple-400' },
    ],
    totalCircuits: 20,
    reserve: 5,
  },
  T5: {
    type: 'T5',
    surface: '> 100 m²',
    description: 'T5 et plus',
    circuits: [
      { id: 'E1', name: 'Éclairage 1', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E2', name: 'Éclairage 2', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E3', name: 'Éclairage 3', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E4', name: 'Éclairage 4', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E5', name: 'Éclairage 5', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'E6', name: 'Éclairage 6', protection: '10A', section: '1.5mm²', color: 'text-yellow-400' },
      { id: 'P1', name: 'Prises 1', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P2', name: 'Prises 2', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P3', name: 'Prises 3', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P4', name: 'Prises 4', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P5', name: 'Prises 5', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P6', name: 'Prises 6', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P7', name: 'Prises 7', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P8', name: 'Prises 8', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P9', name: 'Prises 9', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P10', name: 'Prises 10', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P11', name: 'Prises 11', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'P12', name: 'Prises 12', protection: '16A', section: '2.5mm²', color: 'text-blue-400' },
      { id: 'S1', name: 'Spécialisé LL', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
      { id: 'S2', name: 'Spécialisé LV', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
      { id: 'S3', name: 'Spécialisé Four', protection: '20A', section: '2.5mm²', color: 'text-purple-400' },
      { id: 'S4', name: 'Spécialisé Plaque', protection: '32A', section: '4mm²', color: 'text-purple-400' },
      { id: 'S5', name: 'Spécialisé IRVE', protection: '32A', section: '6mm²', color: 'text-purple-400' },
    ],
    totalCircuits: 24,
    reserve: 6,
  },
};

export function TableauTypes() {
  const [selectedType, setSelectedType] = useState<TableauType>('T2');
  const tableau = tableauxData[selectedType];

  return (
    <div className="space-y-6">
      {/* Sélecteur de type */}
      <div className="grid grid-cols-5 gap-2">
        {(Object.keys(tableauxData) as TableauType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-300 text-center',
              selectedType === type
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground'
            )}
          >
            <div className="font-bold text-lg mb-1">{type}</div>
            <div className="text-xs opacity-70">{tableauxData[type].surface}</div>
          </button>
        ))}
      </div>

      {/* Détails du tableau */}
      <Card className="border-primary/20 bg-gradient-to-br from-slate-900/90 to-slate-950/95">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Home className="w-6 h-6 text-primary" />
                Tableau {tableau.type}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {tableau.description} - {tableau.surface}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              NFC 15-100
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10 text-center">
              <div className="text-3xl font-bold text-primary">
                {tableau.totalCircuits}
              </div>
              <div className="text-sm text-muted-foreground">Circuits</div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10 text-center">
              <div className="text-3xl font-bold text-green-400">
                {tableau.reserve}
              </div>
              <div className="text-sm text-muted-foreground">Réserve</div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10 text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {tableau.totalCircuits + tableau.reserve}
              </div>
              <div className="text-sm text-muted-foreground">Total emplacements</div>
            </div>
          </div>

          {/* Liste des circuits */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Circuits recommandés
            </h3>
            <div className="space-y-2">
              {tableau.circuits.map((circuit) => (
                <div
                  key={circuit.id}
                  className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                      {circuit.id}
                    </div>
                    <div>
                      <div className="font-semibold">{circuit.name}</div>
                      <div className="text-xs text-muted-foreground">{circuit.section}</div>
                    </div>
                  </div>
                  <Badge className={circuit.color}>{circuit.protection}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Légende */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-200">
            <p className="font-semibold mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Légende des couleurs
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <span>Éclairage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                <span>Prises</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-400" />
                <span>Spécialisés</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1" size="lg">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Vérifier la conformité
            </Button>
            <Button variant="outline" size="lg">
              <Info className="w-4 h-4 mr-2" />
              En savoir plus
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
