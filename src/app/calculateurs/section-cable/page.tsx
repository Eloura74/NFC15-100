'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SectionCableCalculatorPage() {
  const [power, setPower] = useState('');
  const [distance, setDistance] = useState('');
  const [voltage, setVoltage] = useState<'230' | '400' | '12' | '24'>('230');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const p = parseFloat(power);
    const d = parseFloat(distance);

    if (isNaN(p) || isNaN(d)) {
      setResult('Veuillez remplir tous les champs');
      return;
    }

    // Calcul de l'intensité
    const voltageValue = parseFloat(voltage);
    const current = p / voltageValue;

    // Calcul de la section minimale selon la NFC 15-100
    // Formule simplifiée : S = (ρ × L × I) / ΔU
    // ρ = 0,023 (cuivre), ΔU = 3% (éclairage) ou 5% (autres)
    const rho = 0.023;
    const deltaU = 0.05; // 5% pour usage général
    const section = (rho * 2 * d * current) / (voltageValue * deltaU);

    // Sections normalisées
    const standardSections = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95];
    const recommendedSection = standardSections.find((s) => s >= section) || 95;

    setResult(
      `Intensité : ${current.toFixed(2)} A | Section recommandée : ${recommendedSection} mm²`
    );
  };

  const reset = () => {
    setPower('');
    setDistance('');
    setVoltage('230');
    setResult(null);
  };

  return (
    <div className="container py-8 max-w-2xl">
      <Link href="/calculateurs">
        <Button variant="ghost" className="mb-4">
          ← Retour aux calculateurs
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Section de câble</CardTitle>
          <CardDescription>
            Calculez la section de câble selon la puissance et la distance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Formule :</p>
            <p className="text-lg font-mono">S = (ρ × 2 × L × I) / (U × ΔU)</p>
            <p className="text-sm text-muted-foreground mt-2">
              ρ = 0,023 (cuivre) | L = longueur | I = intensité | U = tension |
              ΔU = 5%
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Puissance (W)
              </label>
              <Input
                type="number"
                placeholder="Puissance en Watts"
                value={power}
                onChange={(e) => setPower(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Distance du câble (m)
              </label>
              <Input
                type="number"
                placeholder="Distance en mètres"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tension</label>
              <Select
                value={voltage}
                onValueChange={(v: '230' | '400' | '12' | '24') =>
                  setVoltage(v)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="230">230V (Monophasé)</SelectItem>
                  <SelectItem value="400">400V (Triphasé)</SelectItem>
                  <SelectItem value="12">12V (Basse tension)</SelectItem>
                  <SelectItem value="24">24V (Basse tension)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1">
              Calculer
            </Button>
            <Button onClick={reset} variant="outline">
              Réinitialiser
            </Button>
          </div>

          {result && (
            <div className="bg-primary/10 border border-primary rounded-lg p-4">
              <p className="text-lg font-semibold text-center">{result}</p>
            </div>
          )}

          <div className="bg-muted p-4 rounded-lg text-sm">
            <p className="font-semibold mb-2">Sections normalisées (mm²) :</p>
            <p className="text-muted-foreground">
              1,5 | 2,5 | 4 | 6 | 10 | 16 | 25 | 35 | 50 | 70 | 95
            </p>
            <p className="font-semibold mt-4 mb-2">Usage courant :</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>1,5 mm² : Éclairage, prises 16A</li>
              <li>2,5 mm² : Prises 20A, circuits spécialisés</li>
              <li>4 mm² : Prises 32A, chauffage</li>
              <li>6 mm² : Cuisinière, gros appareils</li>
              <li>10 mm² : Alimentation principale</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
