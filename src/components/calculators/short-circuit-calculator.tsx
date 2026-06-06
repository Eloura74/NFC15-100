'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calculator, AlertTriangle, Zap, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type NetworkType = 'bt' | 'hta';

interface CalculationResult {
  icc: number;
  iccMin: number;
  iccMax: number;
  powerFactor: number;
  warnings: string[];
  recommendations: string[];
}

export function ShortCircuitCalculator() {
  const [voltage, setVoltage] = useState<string>('230');
  const [networkType, setNetworkType] = useState<NetworkType>('bt');
  const [cableLength, setCableLength] = useState<string>('');
  const [cableSection, setCableSection] = useState<string>('25');
  const [transformerPower, setTransformerPower] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateShortCircuit = () => {
    const U = parseFloat(voltage);
    const L = parseFloat(cableLength);
    const S = parseFloat(cableSection);
    const P = parseFloat(transformerPower);

    if (!U || !L || !S || !P) return;

    // Calcul simplifié du courant de court-circuit
    // Icc = U / (Z_source + Z_cable)
    
    // Impédance source (simplifiée)
    const Z_source = (U * U) / (P * 1000); // Approximation
    
    // Résistance du câble
    const rho = 0.023; // Cuivre
    const R_cable = (rho * L) / S;
    
    // Réactance du câble (approximation 0.08 Ω/km)
    const X_cable = 0.00008 * L;
    
    // Impédance totale
    const Z_total = Math.sqrt(Math.pow(Z_source + R_cable, 2) + Math.pow(X_cable, 2));
    
    // Courant de court-circuit
    const icc = U / (Math.sqrt(3) * Z_total);
    
    // Icc min et max (variations possibles)
    const iccMin = icc * 0.85;
    const iccMax = icc * 1.15;
    
    // Facteur de puissance
    const powerFactor = (Z_source + R_cable) / Z_total;

    // Vérifications
    const warnings: string[] = [];
    const recommendations: string[] = [];

    if (icc > 20000) {
      warnings.push('Courant de court-circuit très élevé (> 20 kA)');
    }

    if (icc < 1000) {
      warnings.push('Courant de court-circuit faible (< 1 kA)');
      recommendations.push('Vérifier la sélectivité des protections');
    }

    if (L > 100) {
      recommendations.push('Longueur de câble importante : vérifier la chute de tension');
    }

    if (S < 16) {
      recommendations.push('Section de câble faible : vérifier la tenue thermique');
    }

    setResult({
      icc,
      iccMin,
      iccMax,
      powerFactor,
      warnings,
      recommendations,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Calculateur de courant de court-circuit
        </CardTitle>
        <CardDescription>
          Calcul simplifié du courant de court-circuit présumé selon NFC 15-100
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="voltage">Tension (V)</Label>
            <select
              id="voltage"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-slate-900/60 text-sm"
            >
              <option value="230">230V (Basse tension)</option>
              <option value="400">400V (Basse tension)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="network-type">Type de réseau</Label>
            <select
              id="network-type"
              value={networkType}
              onChange={(e) => setNetworkType(e.target.value as NetworkType)}
              className="w-full h-10 px-3 rounded-md border border-input bg-slate-900/60 text-sm"
            >
              <option value="bt">Basse tension (BT)</option>
              <option value="hta">Haute tension A (HTA)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cable-length">Longueur du câble (m)</Label>
            <Input
              id="cable-length"
              type="number"
              placeholder="50"
              value={cableLength}
              onChange={(e) => setCableLength(e.target.value)}
              className="bg-slate-900/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cable-section">Section du câble (mm²)</Label>
            <select
              id="cable-section"
              value={cableSection}
              onChange={(e) => setCableSection(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-slate-900/60 text-sm"
            >
              <option value="16">16 mm²</option>
              <option value="25">25 mm²</option>
              <option value="35">35 mm²</option>
              <option value="50">50 mm²</option>
              <option value="70">70 mm²</option>
              <option value="95">95 mm²</option>
              <option value="120">120 mm²</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="transformer-power">Puissance transformateur (kVA)</Label>
            <Input
              id="transformer-power"
              type="number"
              placeholder="250"
              value={transformerPower}
              onChange={(e) => setTransformerPower(e.target.value)}
              className="bg-slate-900/60"
            />
          </div>
        </div>

        <Button onClick={calculateShortCircuit} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Calculer le courant de court-circuit
        </Button>

        {/* Results */}
        {result && (
          <div className="rounded-lg border-2 border-orange-500/50 bg-orange-500/10 p-6 space-y-4 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Résultat</h3>
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-900/60 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {result.icc.toFixed(0)} A
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Icc présumé
                </div>
              </div>

              <div className="text-center p-4 bg-slate-900/60 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {(result.icc / 1000).toFixed(2)} kA
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  En kA
                </div>
              </div>

              <div className="text-center p-4 bg-slate-900/60 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {result.powerFactor.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Cos φ
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-900/60 rounded-lg">
                <div className="text-xl font-bold text-orange-400">
                  {result.iccMin.toFixed(0)} A
                </div>
                <div className="text-xs text-muted-foreground">Icc min</div>
              </div>

              <div className="text-center p-3 bg-slate-900/60 rounded-lg">
                <div className="text-xl font-bold text-orange-400">
                  {result.iccMax.toFixed(0)} A
                </div>
                <div className="text-xs text-muted-foreground">Icc max</div>
              </div>
            </div>

            {result.warnings.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-orange-400 font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  Avertissements
                </div>
                {result.warnings.map((warning, idx) => (
                  <div key={idx} className="text-sm text-orange-200 flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            )}

            {result.recommendations.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-yellow-400 font-semibold">
                  <Info className="w-4 h-4" />
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
                  <strong>Pouvoir de coupure requis :</strong>{' '}
                  {Math.ceil(result.iccMax / 1000)} kA minimum
                </p>
                <p>
                  <strong>Formule simplifiée :</strong> Icc = U / (√3 × Z_total)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg text-xs text-orange-200">
          <p className="font-semibold mb-2">⚠️ Informations importantes :</p>
          <ul className="space-y-1 ml-4">
            <li>• Calcul simplifié pour estimation rapide</li>
            <li>• Ne remplace pas les calculs détaillés NFC 15-100</li>
            <li>• Consulter le distributeur pour les valeurs exactes</li>
            <li>• Le pouvoir de coupure doit être supérieur à Icc max</li>
            <li>• Valeurs indicatives - Validation professionnelle requise</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
