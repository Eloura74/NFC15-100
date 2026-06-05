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

export default function ChuteTensionCalculatorPage() {
  const [current, setCurrent] = useState('');
  const [length, setLength] = useState('');
  const [section, setSection] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const i = parseFloat(current);
    const l = parseFloat(length);
    const s = parseFloat(section);

    if (isNaN(i) || isNaN(l) || isNaN(s)) {
      setResult('Veuillez remplir tous les champs');
      return;
    }

    const rho = 0.023;
    const chute = (rho * 2 * l * i) / s;
    const pourcentage = (chute / 230) * 100;

    const status =
      pourcentage <= 3
        ? '✅ Conforme'
        : pourcentage <= 5
          ? '⚠️ Limite'
          : '❌ Non conforme';

    setResult(
      `Chute de tension : ${chute.toFixed(2)} V (${pourcentage.toFixed(2)}%) ${status}`
    );
  };

  const reset = () => {
    setCurrent('');
    setLength('');
    setSection('');
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
          <CardTitle className="text-3xl">Chute de tension</CardTitle>
          <CardDescription>
            Calculez la chute de tension dans un câble
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Formule :</p>
            <p className="text-lg font-mono">ΔU = ρ × 2 × L × I / S</p>
            <p className="text-sm text-muted-foreground mt-2">
              ρ = 0,023 (cuivre) | L = longueur | I = intensité | S = section
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Intensité (A)
              </label>
              <Input
                type="number"
                placeholder="Intensité en Ampères"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Longueur du câble (m)
              </label>
              <Input
                type="number"
                placeholder="Longueur en mètres"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Section du câble (mm²)
              </label>
              <Input
                type="number"
                placeholder="Section en mm²"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              />
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
            <p className="font-semibold mb-2">Limites réglementaires :</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Éclairage : 3% maximum</li>
              <li>Autres usages : 5% maximum</li>
              <li>Sections courantes : 1,5 / 2,5 / 6 / 10 mm²</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
