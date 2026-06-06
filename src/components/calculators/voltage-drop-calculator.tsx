'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calculator, AlertCircle, CheckCircle2, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type CableType = 'cuivre' | 'aluminium';

interface CalculationResult {
  voltDrop: number;
  voltDropPercent: number;
  isValid: boolean;
  warnings: string[];
  recommendations: string[];
}

export function VoltageDropCalculator() {
  const [current, setCurrent] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [section, setSection] = useState<string>('2.5');
  const [voltage, setVoltage] = useState<string>('230');
  const [cableType, setCableType] = useState<CableType>('cuivre');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateVoltageDrop = () => {
    const I = parseFloat(current);
    const L = parseFloat(length);
    const S = parseFloat(section);
    const U = parseFloat(voltage);

    if (!I || !L || !S || !U) return;

    // Résistivité (Ω·mm²/m) à 20°C
    const rho = cableType === 'cuivre' ? 0.023 : 0.037;

    // Chute de tension : ΔU = (ρ × L × I) / S
    // Pour circuit monophasé : ΔU = (2 × ρ × L × I) / S (aller + retour)
    const voltDrop = (2 * rho * L * I) / S;
    const voltDropPercent = (voltDrop / U) * 100;

    // Vérifications NFC 15-100
    const warnings: string[] = [];
    const recommendations: string[] = [];
    let isValid = true;

    // Éclairage : max 3%
    // Force motrice : max 5%
    const maxPercent = U <= 230 ? 3 : 5;

    if (voltDropPercent > maxPercent) {
      warnings.push(
        `Chute de tension ${voltDropPercent.toFixed(2)}% > ${maxPercent}% (max autorisé)`
      );
      isValid = false;
    }

    if (voltDropPercent > maxPercent * 0.8) {
      recommendations.push(
        'Chute de tension proche de la limite. Envisager une section supérieure.'
      );
    }

    if (L > 100) {
      recommendations.push(
        'Longueur importante. Vérifier la chute de tension avec précision.'
      );
    }

    if (I > 32) {
      recommendations.push('Courant élevé. Vérifier la capacité du câble.');
    }

    setResult({
      voltDrop,
      voltDropPercent,
      isValid,
      warnings,
      recommendations,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-primary" />
          Calculateur de chute de tension
        </CardTitle>
        <CardDescription>
          Calcul conforme NFC 15-100 - Vérification de la chute de tension dans les câbles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="current">Courant (A)</Label>
            <Input
              id="current"
              type="number"
              placeholder="16"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="bg-slate-900/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="length">Longueur du câble (m)</Label>
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
            <Label htmlFor="section">Section du câble (mm²)</Label>
            <select
              id="section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-slate-900/60 text-sm"
            >
              <option value="1.5">1.5 mm²</option>
              <option value="2.5">2.5 mm²</option>
              <option value="4">4 mm²</option>
              <option value="6">6 mm²</option>
              <option value="10">10 mm²</option>
              <option value="16">16 mm²</option>
              <option value="25">25 mm²</option>
              <option value="35">35 mm²</option>
              <option value="50">50 mm²</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="voltage">Tension (V)</Label>
            <select
              id="voltage"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-slate-900/60 text-sm"
            >
              <option value="230">230V (Monophasé)</option>
              <option value="400">400V (Triphasé)</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="cable-type">Type de câble</Label>
            <select
              id="cable-type"
              value={cableType}
              onChange={(e) => setCableType(e.target.value as CableType)}
              className="w-full h-10 px-3 rounded-md border border-input bg-slate-900/60 text-sm"
            >
              <option value="cuivre">Cuivre (ρ = 0.023 Ω·mm²/m)</option>
              <option value="aluminium">Aluminium (ρ = 0.037 Ω·mm²/m)</option>
            </select>
          </div>
        </div>

        <Button onClick={calculateVoltageDrop} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Calculer la chute de tension
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-900/60 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {result.voltDrop.toFixed(2)} V
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Chute de tension absolue
                </div>
              </div>

              <div className="text-center p-4 bg-slate-900/60 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {result.voltDropPercent.toFixed(2)} %
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Chute de tension relative
                </div>
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
                  <strong>Limite NFC 15-100 :</strong>{' '}
                  {parseFloat(voltage) <= 230 ? '3% (éclairage)' : '5% (force motrice)'}
                </p>
                <p>
                  <strong>Formule :</strong> ΔU = (2 × ρ × L × I) / S
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-200">
          <p className="font-semibold mb-2">ℹ️ Informations importantes :</p>
          <ul className="space-y-1 ml-4">
            <li>• Éclairage : chute de tension max 3%</li>
            <li>• Force motrice : chute de tension max 5%</li>
            <li>• Calcul monophasé (aller + retour)</li>
            <li>• Résistivité à 20°C (augmente avec la température)</li>
            <li>• Valeurs indicatives - Vérifier avec les tableaux officiels</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
