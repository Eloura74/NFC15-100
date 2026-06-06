'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Lightbulb,
  ToggleLeft,
  Power,
  Zap,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type CircuitType = 'va-et-vient' | 'telerupteur' | 'minuterie' | 'simple';

interface CircuitInfo {
  title: string;
  description: string;
  components: string[];
  steps: string[];
  advantages: string[];
  disadvantages: string[];
  usage: string[];
}

const circuitsData: Record<CircuitType, CircuitInfo> = {
  'va-et-vient': {
    title: 'Va-et-vient',
    description: "Commande d'un éclairage depuis 2 endroits différents",
    components: [
      '2 interrupteurs va-et-vient',
      '1 lampe',
      'Câbles : 3 conducteurs + terre',
    ],
    steps: [
      'Relier les bornes L (phase) des 2 interrupteurs',
      'Relier les bornes voyageuses entre les 2 interrupteurs',
      "Relier la borne navette de l'interrupteur 1 à la lampe",
      'Relier le neutre et la terre à la lampe',
    ],
    advantages: [
      'Commande depuis 2 endroits',
      "Pas d'électronique (fiable)",
      'Coût modéré',
    ],
    disadvantages: ['Limité à 2 commandes', 'Câblage plus complexe que simple'],
    usage: [
      'Chambre (entrée + lit)',
      'Couloir (2 extrémités)',
      'Escalier (haut + bas)',
    ],
  },
  telerupteur: {
    title: 'Télérupteur',
    description: "Commande d'un éclairage depuis plusieurs endroits",
    components: [
      '1 télérupteur',
      'Plusieurs boutons-poussoirs',
      '1 lampe',
      'Câbles : 2 conducteurs + terre par bouton',
    ],
    steps: [
      'Relier la phase au télérupteur (bornes A1/A2)',
      'Relier le neutre à la lampe',
      'Relier les boutons-poussoirs en parallèle',
      'Relier la sortie du télérupteur à la lampe',
    ],
    advantages: [
      'Commande depuis plusieurs endroits',
      'Câblage simple',
      "Facile d'extension",
    ],
    disadvantages: [
      'Nécessite un télérupteur',
      'Bruit de déclenchement',
      'Plus cher que va-et-vient',
    ],
    usage: ['Longs couloirs', 'Grands espaces', 'Plus de 2 commandes'],
  },
  minuterie: {
    title: 'Minuterie',
    description: "Commande temporisée d'un éclairage",
    components: [
      '1 minuterie',
      '1 bouton-poussoir',
      '1 lampe',
      'Câbles : 2 conducteurs + terre',
    ],
    steps: [
      'Relier la phase à la minuterie',
      'Relier le neutre à la minuterie',
      'Relier le bouton-poussoir',
      'Relier la sortie à la lampe',
    ],
    advantages: [
      "Économie d'énergie",
      'Automatique',
      'Idéal pour passages brefs',
    ],
    disadvantages: [
      'Temps limité',
      'Réglage nécessaire',
      'Coût de la minuterie',
    ],
    usage: ['Garage', 'Cave', 'Escalier', 'Couloir'],
  },
  simple: {
    title: 'Allumage simple',
    description: "Commande d'un éclairage depuis 1 endroit",
    components: [
      '1 interrupteur simple',
      '1 lampe',
      'Câbles : 2 conducteurs + terre',
    ],
    steps: [
      "Relier la phase à l'interrupteur",
      "Relier la sortie de l'interrupteur à la lampe",
      'Relier le neutre à la lampe',
      'Relier la terre à la lampe',
    ],
    advantages: ['Câblage très simple', 'Coût minimal', 'Fiable'],
    disadvantages: ['Commande depuis 1 seul endroit'],
    usage: ['Placard', 'Toilettes', 'Petite pièce'],
  },
};

export function CircuitSchematics() {
  const [selectedCircuit, setSelectedCircuit] =
    useState<CircuitType>('va-et-vient');
  const [showSchematic, setShowSchematic] = useState(false);
  const circuit = circuitsData[selectedCircuit];

  return (
    <div className="space-y-6">
      {/* Sélecteur de circuit */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(circuitsData) as CircuitType[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelectedCircuit(type);
              setShowSchematic(false);
            }}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-300 text-left',
              selectedCircuit === type
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground'
            )}
          >
            <div className="font-semibold text-sm mb-1">
              {circuitsData[type].title}
            </div>
            <div className="text-xs opacity-70">
              {circuitsData[type].description}
            </div>
          </button>
        ))}
      </div>

      {/* Détails du circuit */}
      <Card className="border-primary/20 bg-gradient-to-br from-slate-900/90 to-slate-950/95">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                {circuit.title}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {circuit.description}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              NFC 15-100
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Composants */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Power className="w-4 h-4 text-primary" />
              Composants nécessaires
            </h3>
            <div className="grid md:grid-cols-3 gap-2">
              {circuit.components.map((component, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-900/60 rounded-lg border border-white/10 text-sm"
                >
                  {component}
                </div>
              ))}
            </div>
          </div>

          {/* Étapes de câblage */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <ToggleLeft className="w-4 h-4 text-primary" />
              Étapes de câblage
            </h3>
            <div className="space-y-2">
              {circuit.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-slate-900/60 rounded-lg border border-white/10 text-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                    {idx + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Avantages / Inconvénients */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                Avantages
              </h3>
              <ul className="space-y-2">
                {circuit.advantages.map((advantage, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-orange-400">
                <Info className="w-4 h-4" />
                Inconvénients
              </h3>
              <ul className="space-y-2">
                {circuit.disadvantages.map((disadvantage, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    <span>{disadvantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Usage */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              Usage recommandé
            </h3>
            <div className="flex flex-wrap gap-2">
              {circuit.usage.map((use, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {use}
                </Badge>
              ))}
            </div>
          </div>

          {/* Bouton schéma */}
          <Button
            onClick={() => setShowSchematic(!showSchematic)}
            className="w-full"
            variant="outline"
          >
            {showSchematic ? 'Masquer' : 'Afficher'} le schéma de principe
          </Button>

          {/* Schéma simplifié */}
          {showSchematic && (
            <div className="p-6 bg-slate-900/60 rounded-lg border border-white/10 animate-[fadeIn_0.3s_ease-out]">
              <div className="text-center mb-4 text-sm text-muted-foreground">
                Schéma de principe simplifié
              </div>
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <Power className="w-6 h-6 text-primary" />
                  </div>
                  <span>Phase</span>
                </div>
                <div className="h-0.5 w-8 bg-primary/40" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center">
                    <ToggleLeft className="w-6 h-6 text-slate-300" />
                  </div>
                  <span>Commande</span>
                </div>
                <div className="h-0.5 w-8 bg-primary/40" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                  </div>
                  <span>Lampe</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-200">
                <p className="font-semibold mb-1">ℹ️ Note :</p>
                <p>
                  Schéma simplifié pour compréhension. Toujours se référer aux
                  schémas normalisés NFC 15-100 pour le câblage réel.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
