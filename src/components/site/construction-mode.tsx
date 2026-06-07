'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HardHat, X, Zap, Shield, Calculator, CheckCircle2, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConstructionModeProps {
  children: React.ReactNode;
}

export function ConstructionMode({ children }: ConstructionModeProps) {
  const [isActive, setIsActive] = useState(false);

  if (!isActive) {
    return (
      <>
        <Button
          onClick={() => setIsActive(true)}
          className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
          size="lg"
        >
          <HardHat className="w-5 h-5 mr-2" />
          Mode Chantier
        </Button>
        {children}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header simplifié */}
      <div className="bg-orange-500 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <HardHat className="w-6 h-6" />
          <div>
            <h1 className="text-xl font-bold">Mode Chantier</h1>
            <p className="text-sm opacity-90">ElecNorme NFC 15-100</p>
          </div>
        </div>
        <Button
          onClick={() => setIsActive(false)}
          variant="secondary"
          size="sm"
          className="bg-white text-orange-500 hover:bg-orange-50"
        >
          <X className="w-4 h-4 mr-2" />
          Quitter
        </Button>
      </div>

      {/* Contenu simplifié */}
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Accès rapide aux tableaux */}
          <Card className="border-2 border-orange-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-orange-500" />
                Sections & Calibres
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">Éclairage</span>
                <Badge className="bg-orange-500 text-white">1.5mm² / 10A</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">Prises 16A</span>
                <Badge className="bg-orange-500 text-white">2.5mm² / 16A</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">Prises 20A</span>
                <Badge className="bg-orange-500 text-white">2.5mm² / 20A</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">Four</span>
                <Badge className="bg-orange-500 text-white">2.5mm² / 20A</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">Plaque</span>
                <Badge className="bg-orange-500 text-white">4mm² / 32A</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">IRVE</span>
                <Badge className="bg-orange-500 text-white">6mm² / 32A</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Différentiels */}
          <Card className="border-2 border-orange-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-orange-500" />
                Différentiels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">Type A</span>
                <Badge className="bg-green-600 text-white">30mA - Normaux</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">Type B</span>
                <Badge className="bg-green-600 text-white">30mA - PV/IRVE</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">Type F</span>
                <Badge className="bg-green-600 text-white">30mA - Continuité</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">Type AC</span>
                <Badge className="bg-green-600 text-white">30mA - Éclairage</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="font-medium">Type S</span>
                <Badge className="bg-blue-600 text-white">300mA - Tête</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Longueurs maximales */}
        <Card className="border-2 border-orange-500 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Home className="w-5 h-5 text-orange-500" />
              Longueurs Maximales (Chute de tension 5%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="p-3 bg-gray-100 rounded text-center">
                <div className="text-2xl font-bold text-orange-600">33m</div>
                <div className="text-sm">2.5mm² / 16A</div>
              </div>
              <div className="p-3 bg-gray-100 rounded text-center">
                <div className="text-2xl font-bold text-orange-600">27m</div>
                <div className="text-sm">2.5mm² / 20A</div>
              </div>
              <div className="p-3 bg-gray-100 rounded text-center">
                <div className="text-2xl font-bold text-orange-600">46m</div>
                <div className="text-sm">4mm² / 25A</div>
              </div>
              <div className="p-3 bg-gray-100 rounded text-center">
                <div className="text-2xl font-bold text-orange-600">42m</div>
                <div className="text-sm">6mm² / 32A</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checklist rapide */}
        <Card className="border-2 border-orange-500 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="w-5 h-5 text-orange-500" />
              Checklist Rapide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                'Tableau accessible (< 1.30m)',
                'Réserve 20% disponible',
                'Différentiel 30mA type A présent',
                'Terre < 100Ω',
                'Circuits spécialisés dédiés',
                'Volumes salle de bain respectés',
              ].map((item, idx) => (
                <label key={idx} className="flex items-center gap-3 p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                  <input type="checkbox" className="w-5 h-5 accent-orange-500" />
                  <span className="font-medium">{item}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calculatrice rapide */}
        <Card className="border-2 border-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="w-5 h-5 text-orange-500" />
              Calculatrice Rapide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Puissance (W)</label>
                <input
                  type="number"
                  placeholder="Ex: 2000"
                  className="w-full p-2 border-2 border-gray-300 rounded focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tension (V)</label>
                <input
                  type="number"
                  defaultValue="230"
                  className="w-full p-2 border-2 border-gray-300 rounded focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-3 p-3 bg-orange-100 rounded text-center">
              <div className="text-sm text-gray-600">Intensité estimée</div>
              <div className="text-2xl font-bold text-orange-600">-- A</div>
            </div>
          </CardContent>
        </Card>

        {/* Avertissement */}
        <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-500 rounded-lg">
          <p className="font-bold text-yellow-800 mb-1">⚠️ Mode Chantier</p>
          <p className="text-sm text-yellow-700">
            Ce mode est optimisé pour une utilisation sur le terrain. Les valeurs sont indicatives.
            Toujours vérifier les conditions spécifiques de votre installation.
          </p>
        </div>
      </div>
    </div>
  );
}
