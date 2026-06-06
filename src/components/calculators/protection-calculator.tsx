'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calculator, Shield, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type CircuitType =
  | 'eclairage'
  | 'prises-16a'
  | 'prises-20a'
  | 'prises-32a'
  | 'cuisiniere'
  | 'chauffage'
  | 'specialise';

interface CircuitInfo {
  name: string;
  defaultSection: number;
  defaultProtection: number;
  maxCircuits: number;
  description: string;
}

const circuitsData: Record<CircuitType, CircuitInfo> = {
  'eclairage': {
    name: 'Éclairage',
    defaultSection: 1.5,
    defaultProtection: 16,
    maxCircuits: 8,
    description: 'Circuits d\'éclairage général',
  },
  'prises-16a': {
    name: 'Prises 16A',
    defaultSection: 2.5,
    defaultProtection: 16,
    maxCircuits: 8,
    description: 'Prises de courant standard',
  },
  'prises-20a': {
    name: 'Prises 20A',
    defaultSection: 2.5,
    defaultProtection: 20,
    maxCircuits: 8,
    description: 'Circuits spécialisés (lave-linge, lave-vaisselle)',
  },
  'prises-32a': {
    name: 'Prises 32A',
    defaultSection: 4,
    defaultProtection: 32,
    maxCircuits: 1,
    description: 'Cuisinière, plaque de cuisson',
  },
  cuisiniere: {
    name: 'Cuisinière',
    defaultSection: 6,
    defaultProtection: 32,
    maxCircuits: 1,
    description: 'Cuisinière électrique',
  },
  chauffage: {
    name: 'Chauffage',
    defaultSection: 4,
    defaultProtection: 20,
    maxCircuits: 5,
    description: 'Radiateurs électriques',
  },
  specialise: {
    name: 'Circuit spécialisé',
    defaultSection: 2.5,
    defaultProtection: 20,
    maxCircuits: 1,
    description: 'VMC, chaudière, etc.',
  },
};

export function ProtectionCalculator() {
  const [circuitType, setCircuitType] = useState<CircuitType>('prises-16a');
  const [power, setPower] = useState<string>('');
  const [customSection, setCustomSection] = useState<string>('');
  const [result, setResult] = useState<{
    recommendedProtection: number;
    section: number;
    maxCurrent: number;
    warnings: string[];
  } | null>(null);

  const calculateProtection = () => {
    const circuit = circuitsData[circuitType];
    const P = parseFloat(power);
    const S = customSection ? parseFloat(customSection) : circuit.defaultSection;

    // Calcul du courant : I = P / U (230V)
    const I = P ? P / 230 : circuit.defaultProtection;

    // Calibres normalisés
    const standardCalibers = [6, 10, 16, 20, 25, 32, 40, 50, 63];

    // Calibre recommandé : immédiatement supérieur au courant calculé
    let recommendedProtection = standardCalibers.find((c) => c >= I) || 63;

    // Si pas de puissance, utiliser le calibre par défaut du circuit
    if (!P) {
      recommendedProtection = circuit.defaultProtection;
    }

    // Vérifications
    const warnings: string[] = [];

    if (S < circuit.defaultSection) {
      warnings.push(
        `Section ${S} mm² inférieure à la section minimale recommandée (${circuit.defaultSection} mm²)`
      );
    }

    if (recommendedProtection > 32 && circuitType !== 'cuisiniere') {
      warnings.push('Calibre élevé : vérifier la capacité du câble');
    }

    setResult({
      recommendedProtection,
      section: S,
      maxCurrent: I,
      warnings,
    });
  };

  const circuit = circuitsData[circuitType];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Calculateur de calibre de protection
        </CardTitle>
        <CardDescription>
          Déterminer le calibre du disjoncteur selon le type de circuit et la puissance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sélecteur de circuit */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(Object.keys(circuitsData) as CircuitType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setCircuitType(type);
                setResult(null);
              }}
              className={cn(
                'p-3 rounded-lg border-2 transition-all duration-300 text-left',
                circuitType === type
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground'
              )}
            >
              <div className="font-semibold text-xs mb-1">{circuitsData[type].name}</div>
              <div className="text-xs opacity-70">{circuitsData[type].defaultProtection}A</div>
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="power">Puissance (W) - Optionnel</Label>
            <Input
              id="power"
              type="number"
              placeholder="3500"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              className="bg-slate-900/60"
            />
            <p className="text-xs text-muted-foreground">
              Si vide, utilise le calibre par défaut du circuit
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="section">Section câble (mm²) - Optionnel</Label>
            <Input
              id="section"
              type="number"
              placeholder={circuit.defaultSection.toString()}
              value={customSection}
              onChange={(e) => setCustomSection(e.target.value)}
              className="bg-slate-900/60"
            />
            <p className="text-xs text-muted-foreground">
              Défaut : {circuit.defaultSection} mm²
            </p>
          </div>
        </div>

        {/* Info circuit */}
        <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">{circuit.name}</span>
            <Badge variant="outline" className="text-xs">
              NFC 15-100
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{circuit.description}</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Section :</span>{' '}
              <span className="font-semibold">{circuit.defaultSection} mm²</span>
            </div>
            <div>
              <span className="text-muted-foreground">Protection :</span>{' '}
              <span className="font-semibold">{circuit.defaultProtection} A</span>
            </div>
            <div>
              <span className="text-muted-foreground">Max circuits :</span>{' '}
              <span className="font-semibold">{circuit.maxCircuits}</span>
            </div>
          </div>
        </div>

        <Button onClick={calculateProtection} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Calculer le calibre
        </Button>

        {/* Results */}
        {result && (
          <div
            className={cn(
              'rounded-lg border-2 p-6 space-y-4 animate-[fadeIn_0.3s_ease-out]',
              result.warnings.length > 0
                ? 'border-orange-500/50 bg-orange-500/10'
                : 'border-green-500/50 bg-green-500/10'
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Résultat</h3>
              {result.warnings.length === 0 ? (
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              ) : (
                <Info className="w-6 h-6 text-orange-400" />
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-900/60 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {result.recommendedProtection} A
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Calibre recommandé
                </div>
              </div>

              <div className="text-center p-4 bg-slate-900/60 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {result.section} mm²
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Section câble
                </div>
              </div>

              <div className="text-center p-4 bg-slate-900/60 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {result.maxCurrent.toFixed(1)} A
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Courant calculé
                </div>
              </div>
            </div>

            {result.warnings.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-orange-400 font-semibold">
                  <Info className="w-4 h-4" />
                  Remarques
                </div>
                {result.warnings.map((warning, idx) => (
                  <div key={idx} className="text-sm text-orange-200 flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-white/10">
              <div className="text-xs text-muted-foreground space-y-1">
                <p>
                  <strong>Calibres normalisés :</strong> 6, 10, 16, 20, 25, 32, 40, 50, 63 A
                </p>
                <p>
                  <strong>Max circuits par différentiel :</strong> {circuit.maxCircuits}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-200">
          <p className="font-semibold mb-2">ℹ️ Informations importantes :</p>
          <ul className="space-y-1 ml-4">
            <li>• Le calibre doit être immédiatement supérieur au courant calculé</li>
            <li>• Toujours vérifier la capacité du câble avec la section</li>
            <li>• Max 8 circuits par DDR 30mA (sauf circuits spécialisés)</li>
            <li>• Respecter les sections minimales NFC 15-100</li>
            <li>• Consulter un professionnel pour validation finale</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
