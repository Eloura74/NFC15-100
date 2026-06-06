'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calculator, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type CableType = 'cuivre' | 'aluminium';
type InstallationType = 'encastre' | 'apparent' | 'combles' | 'gaine';

interface CalculationResult {
  section: number;
  maxCurrent: number;
  voltDrop: number;
  isValid: boolean;
  warnings: string[];
  recommendations: string[];
}

export function CableSectionCalculator() {
  const [power, setPower] = useState<string>('');
  const [voltage, setVoltage] = useState<string>('230');
  const [length, setLength] = useState<string>('');
  const [cableType, setCableType] = useState<CableType>('cuivre');
  const [installationType, setInstallationType] = useState<InstallationType>('encastre');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateSection = () => {
    const P = parseFloat(power);
    const U = parseFloat(voltage);
    const L = parseFloat(length);

    if (!P || !U || !L) return;

    // Calcul du courant
    const I = P / U;

    // Résistivité (Ω·mm²/m)
    const rho = cableType === 'cuivre' ? 0.023 : 0.037;

    // Chute de tension maximale autorisée
    const maxVoltDrop = U <= 230 ? 0.03 * U : 0.05 * U; // 3% éclairage, 5% autres

    // Section minimale pour chute de tension
    const sectionVoltDrop = (2 * rho * L * I) / maxVoltDrop;

    // Sections normalisées (mm²)
    const standardSections = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];

    // Courants admissibles selon section et mode de pose (simplifié)
    const currentCapacity: Record<InstallationType, Record<number, number>> = {
      encastre: {
        1.5: 14.5,
        2.5: 19.5,
        4: 26,
        6: 34,
        10: 46,
        16: 61,
        25: 82,
        35: 103,
        50: 126,
      },
      apparent: {
        1.5: 17.5,
        2.5: 24,
        4: 32,
        6: 41,
        10: 57,
        16: 76,
        25: 101,
        35: 125,
        50: 153,
      },
      combles: {
        1.5: 13.5,
        2.5: 18,
        4: 23,
        6: 29,
        10: 40,
        16: 53,
        25: 70,
        35: 89,
        50: 110,
      },
      gaine: {
        1.5: 12.5,
        2.5: 16.5,
        4: 21,
        6: 27,
        10: 37,
        16: 49,
        25: 64,
        35: 82,
        50: 101,
      },
    };

    // Trouver la section minimale qui satisfait les deux critères
    let selectedSection = 1.5;
    for (const section of standardSections) {
      const maxI = currentCapacity[installationType][section] || 0;
      if (section >= sectionVoltDrop && maxI >= I) {
        selectedSection = section;
        break;
      }
    }

    // Calcul de la chute de tension réelle
    const actualVoltDrop = (2 * rho * L * I) / selectedSection;
    const voltDropPercent = (actualVoltDrop / U) * 100;

    // Vérifications
    const warnings: string[] = [];
    const recommendations: string[] = [];
    let isValid = true;

    if (voltDropPercent > 3 && U <= 230) {
      warnings.push('Chute de tension > 3% pour circuit d\'éclairage');
      isValid = false;
    }
    if (voltDropPercent > 5) {
      warnings.push('Chute de tension > 5% - Non conforme NFC 15-100');
      isValid = false;
    }
    if (L > 100) {
      recommendations.push('Longueur importante : vérifier la section avec un professionnel');
    }
    if (I > 32) {
      recommendations.push('Courant élevé : prévoir une protection adaptée');
    }
    if (cableType === 'aluminium') {
      recommendations.push('Aluminium : vérifier compatibilité avec les bornes de connexion');
    }

    setResult({
      section: selectedSection,
      maxCurrent: currentCapacity[installationType][selectedSection] || 0,
      voltDrop: voltDropPercent,
      isValid,
      warnings,
      recommendations,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Calculateur de section de câble
        </CardTitle>
        <CardDescription>
          Calcul conforme NFC 15-100 - Méthode des chutes de tension et intensités admissibles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="power">Puissance (W)</Label>
            <Input
              id="power"
              type="number"
              placeholder="3500"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              className="bg-slate-900/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="voltage">Tension (V)</Label>
            <select
              id="voltage"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-slate-900/60 text-sm"
            >
              <option value="230">230V (monophasé)</option>
              <option value="400">400V (triphasé)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="length">Longueur (m)</Label>
            <Input
              id="length"
              type="number"
              placeholder="25"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="bg-slate-900/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cable-type">Type de câble</Label>
            <select
              id="cable-type"
              value={cableType}
              onChange={(e) => setCableType(e.target.value as CableType)}
              className="w-full h-10 px-3 rounded-md border border-input bg-slate-900/60 text-sm"
            >
              <option value="cuivre">Cuivre</option>
              <option value="aluminium">Aluminium</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="installation">Mode de pose</Label>
            <select
              id="installation"
              value={installationType}
              onChange={(e) => setInstallationType(e.target.value as InstallationType)}
              className="w-full h-10 px-3 rounded-md border border-input bg-slate-900/60 text-sm"
            >
              <option value="encastre">Encastré dans mur isolant</option>
              <option value="apparent">Apparent (plafond/mur)</option>
              <option value="combles">Sous combles isolés</option>
              <option value="gaine">En gaine enterrée</option>
            </select>
          </div>
        </div>

        <Button onClick={calculateSection} className="w-full" size="lg">
          <Zap className="w-4 h-4 mr-2" />
          Calculer la section
        </Button>

        {/* Results */}
        {result && (
          <div
            className={cn(
              'rounded-lg border-2 p-6 space-y-4 animate-[fadeIn_0.3s_ease-out]',
              result.isValid
                ? 'border-green-500/50 bg-green-500/10'
                : 'border-red-500/50 bg-red-500/10'
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Résultat</h3>
              {result.isValid ? (
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-400" />
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-900/60 rounded-lg">
                <div className="text-3xl font-bold text-primary">{result.section} mm²</div>
                <div className="text-sm text-muted-foreground mt-1">Section minimale</div>
              </div>

              <div className="text-center p-4 bg-slate-900/60 rounded-lg">
                <div className="text-3xl font-bold text-primary">{result.maxCurrent} A</div>
                <div className="text-sm text-muted-foreground mt-1">Courant max admissible</div>
              </div>

              <div className="text-center p-4 bg-slate-900/60 rounded-lg">
                <div className="text-3xl font-bold text-primary">{result.voltDrop.toFixed(2)} %</div>
                <div className="text-sm text-muted-foreground mt-1">Chute de tension</div>
              </div>
            </div>

            {result.warnings.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  Avertissements
                </div>
                {result.warnings.map((warning, idx) => (
                  <div key={idx} className="text-sm text-red-200 flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            )}

            {result.recommendations.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-yellow-400 font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  Recommandations
                </div>
                {result.recommendations.map((rec, idx) => (
                  <div key={idx} className="text-sm text-yellow-200 flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-white/10">
              <div className="text-xs text-muted-foreground space-y-1">
                <p>
                  <strong>Protection recommandée :</strong>{' '}
                  {Math.ceil((parseFloat(power) / parseFloat(voltage)) * 1.25)} A
                </p>
                <p>
                  <strong>Câble conseillé :</strong> {result.section} mm² -{' '}
                  {voltage === '230' ? '3G' : '5G'}{result.section}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-200">
          <p className="font-semibold mb-2">ℹ️ Informations importantes :</p>
          <ul className="space-y-1 ml-4">
            <li>• Calcul basé sur la méthode des chutes de tension (NFC 15-100)</li>
            <li>• Valeurs indicatives - Vérifier avec les tableaux officiels</li>
            <li>• Ne tient pas compte des facteurs de correction (température, groupement)</li>
            <li>• Consulter un professionnel pour validation finale</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
