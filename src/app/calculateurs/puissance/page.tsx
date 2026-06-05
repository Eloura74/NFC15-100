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
import { Badge } from '@/components/ui/badge';

export default function PuissanceCalculatorPage() {
  const [voltage, setVoltage] = useState('230');
  const [current, setCurrent] = useState('');
  const [type, setType] = useState<'mono' | 'tri'>('mono');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);

    if (isNaN(v) || isNaN(i)) {
      setResult('Veuillez remplir tous les champs');
      return;
    }

    let power: number;
    if (type === 'mono') {
      power = v * i;
    } else {
      power = Math.sqrt(3) * v * i;
    }

    setResult(`Puissance = ${power.toFixed(2)} W (${(power / 1000).toFixed(2)} kW)`);
  };

  const reset = () => {
    setVoltage('230');
    setCurrent('');
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
          <CardTitle className="text-3xl">Calcul de puissance</CardTitle>
          <CardDescription>
            Calculez la puissance électrique monophasée ou triphasée
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Formules :</p>
            <p className="text-lg font-mono">Monophasé : P = U × I</p>
            <p className="text-lg font-mono">Triphasé : P = √3 × U × I</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={type === 'mono' ? 'default' : 'outline'}
              onClick={() => setType('mono')}
              className="flex-1"
            >
              Monophasé
            </Button>
            <Button
              variant={type === 'tri' ? 'default' : 'outline'}
              onClick={() => setType('tri')}
              className="flex-1"
            >
              Triphasé
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Tension (V)
              </label>
              <Input
                type="number"
                placeholder="230 pour monophasé, 400 pour triphasé"
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

          <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
            <p className="font-semibold">Exemples :</p>
            <div className="space-y-1 text-muted-foreground">
              <p>• Monophasé 230V × 16A = 3680 W (3,68 kW)</p>
              <p>• Triphasé 400V × 32A = 22166 W (22,17 kW)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
