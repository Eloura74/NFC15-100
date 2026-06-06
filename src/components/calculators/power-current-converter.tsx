'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calculator, Zap, ArrowRightLeft, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type PhaseType = 'mono' | 'tri';
type ConversionType = 'power-to-current' | 'current-to-power';

export function PowerCurrentConverter() {
  const [phaseType, setPhaseType] = useState<PhaseType>('mono');
  const [conversionType, setConversionType] = useState<ConversionType>('power-to-current');
  const [voltage, setVoltage] = useState<string>('230');
  const [inputValue, setInputValue] = useState<string>('');
  const [powerFactor, setPowerFactor] = useState<string>('0.9');
  const [result, setResult] = useState<{
    result: number;
    unit: string;
    formula: string;
  } | null>(null);

  const convert = () => {
    const U = parseFloat(voltage);
    const input = parseFloat(inputValue);
    const cosPhi = parseFloat(powerFactor);

    if (!U || !input || !cosPhi) return;

    let resultValue: number;
    let formula: string;
    let unit: string;

    if (conversionType === 'power-to-current') {
      // I = P / (U × cosφ × √3) pour triphasé
      // I = P / (U × cosφ) pour monophasé
      if (phaseType === 'tri') {
        resultValue = input / (U * cosPhi * Math.sqrt(3));
        formula = `I = ${input} / (${U} × ${cosPhi} × √3)`;
      } else {
        resultValue = input / (U * cosPhi);
        formula = `I = ${input} / (${U} × ${cosPhi})`;
      }
      unit = 'A';
    } else {
      // P = U × I × cosφ × √3 pour triphasé
      // P = U × I × cosφ pour monophasé
      if (phaseType === 'tri') {
        resultValue = U * input * cosPhi * Math.sqrt(3);
        formula = `P = ${U} × ${input} × ${cosPhi} × √3`;
      } else {
        resultValue = U * input * cosPhi;
        formula = `P = ${U} × ${input} × ${cosPhi}`;
      }
      unit = 'W';
    }

    setResult({
      result: resultValue,
      unit,
      formula,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-primary" />
          Convertisseur Puissance / Intensité
        </CardTitle>
        <CardDescription>
          Convertir entre puissance (W/kW) et intensité (A) selon le type de réseau
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Type de conversion */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setConversionType('power-to-current');
              setResult(null);
            }}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-300 text-center',
              conversionType === 'power-to-current'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground'
            )}
          >
            <div className="font-semibold mb-1">Puissance → Intensité</div>
            <div className="text-xs opacity-70">W/kW → A</div>
          </button>

          <button
            onClick={() => {
              setConversionType('current-to-power');
              setResult(null);
            }}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-300 text-center',
              conversionType === 'current-to-power'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground'
            )}
          >
            <div className="font-semibold mb-1">Intensité → Puissance</div>
            <div className="text-xs opacity-70">A → W/kW</div>
          </button>
        </div>

        {/* Type de phase */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setPhaseType('mono');
              setVoltage('230');
              setResult(null);
            }}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-300 text-center',
              phaseType === 'mono'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground'
            )}
          >
            <div className="font-semibold mb-1">Monophasé</div>
            <div className="text-xs opacity-70">230V</div>
          </button>

          <button
            onClick={() => {
              setPhaseType('tri');
              setVoltage('400');
              setResult(null);
            }}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-300 text-center',
              phaseType === 'tri'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground'
            )}
          >
            <div className="font-semibold mb-1">Triphasé</div>
            <div className="text-xs opacity-70">400V</div>
          </button>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="voltage">Tension (V)</Label>
            <Input
              id="voltage"
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="bg-slate-900/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">
              {conversionType === 'power-to-current' ? 'Puissance (W)' : 'Intensité (A)'}
            </Label>
            <Input
              id="input"
              type="number"
              placeholder={conversionType === 'power-to-current' ? '3500' : '16'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-slate-900/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="powerFactor">Cos φ (facteur de puissance)</Label>
            <Input
              id="powerFactor"
              type="number"
              step="0.1"
              min="0.1"
              max="1"
              value={powerFactor}
              onChange={(e) => setPowerFactor(e.target.value)}
              className="bg-slate-900/60"
            />
            <p className="text-xs text-muted-foreground">Défaut : 0.9</p>
          </div>
        </div>

        <Button onClick={convert} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Convertir
        </Button>

        {/* Results */}
        {result && (
          <div className="rounded-lg border-2 border-primary/50 bg-primary/10 p-6 space-y-4 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Résultat</h3>
              <Zap className="w-6 h-6 text-primary" />
            </div>

            <div className="text-center p-6 bg-slate-900/60 rounded-lg">
              <div className="text-5xl font-bold text-primary mb-2">
                {result.result.toFixed(2)}
              </div>
              <div className="text-xl text-muted-foreground">{result.unit}</div>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Formule utilisée :</div>
              <div className="text-lg font-mono text-primary">{result.formula}</div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900/60 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">
                  {(result.result / 1000).toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {result.unit === 'A' ? 'kA' : 'kW'}
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">
                  {phaseType === 'mono' ? '230V' : '400V'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {phaseType === 'mono' ? 'Monophasé' : 'Triphasé'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-200">
          <p className="font-semibold mb-2">ℹ️ Formules :</p>
          <ul className="space-y-1 ml-4">
            <li>
              <strong>Monophasé :</strong> P = U × I × cosφ | I = P / (U × cosφ)
            </li>
            <li>
              <strong>Triphasé :</strong> P = U × I × cosφ × √3 | I = P / (U × cosφ × √3)
            </li>
            <li>
              <strong>Cos φ :</strong> Facteur de puissance (0.8 à 1 pour la plupart des appareils)
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
