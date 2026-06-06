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

export default function OhmCalculatorPage() {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);

    if (!isNaN(v) && !isNaN(i) && isNaN(r)) {
      const calculatedR = v / i;
      setResistance(calculatedR.toFixed(2));
      setResult(`Résistance = ${calculatedR.toFixed(2)} Ω`);
    } else if (!isNaN(v) && isNaN(i) && !isNaN(r)) {
      const calculatedI = v / r;
      setCurrent(calculatedI.toFixed(2));
      setResult(`Intensité = ${calculatedI.toFixed(2)} A`);
    } else if (isNaN(v) && !isNaN(i) && !isNaN(r)) {
      const calculatedV = i * r;
      setVoltage(calculatedV.toFixed(2));
      setResult(`Tension = ${calculatedV.toFixed(2)} V`);
    } else {
      setResult('Veuillez remplir exactement 2 champs');
    }
  };

  const reset = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
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
          <CardTitle className="text-3xl">Loi d&apos;Ohm</CardTitle>
          <CardDescription>
            Calculez la tension, l&apos;intensité ou la résistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Formule :</p>
            <p className="text-lg font-mono">U = R × I</p>
            <p className="text-sm text-muted-foreground mt-2">
              U = Tension (V) | R = Résistance (Ω) | I = Intensité (A)
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Tension (V)
              </label>
              <Input
                type="number"
                placeholder="Tension en Volts"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
              />
            </div>

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
                Résistance (Ω)
              </label>
              <Input
                type="number"
                placeholder="Résistance en Ohms"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
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
            <p className="font-semibold mb-2">Instructions :</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Remplissez 2 champs sur 3</li>
              <li>Le troisième sera calculé automatiquement</li>
              <li>Les résultats sont arrondis à 2 décimales</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
