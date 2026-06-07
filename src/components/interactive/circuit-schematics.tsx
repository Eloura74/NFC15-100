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

// SVG Schematics for each circuit type
const CircuitSVG = ({ type }: { type: CircuitType }) => {
  if (type === 'va-et-vient') {
    return (
      <svg
        viewBox="0 0 400 250"
        className="w-full h-auto bg-slate-900/50 rounded-lg p-4"
      >
        <line
          x1="20"
          y1="50"
          x2="380"
          y2="50"
          stroke="#f59e0b"
          strokeWidth="3"
        />
        <text x="25" y="40" fill="#f59e0b" fontSize="14" fontWeight="bold">
          L (Phase)
        </text>

        <rect
          x="60"
          y="80"
          width="60"
          height="80"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          rx="4"
        />
        <text x="90" y="120" fill="#3b82f6" fontSize="12" textAnchor="middle">
          INT 1
        </text>
        <circle cx="90" cy="95" r="5" fill="#3b82f6" />
        <line
          x1="90"
          y1="95"
          x2="110"
          y2="85"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <rect
          x="280"
          y="80"
          width="60"
          height="80"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          rx="4"
        />
        <text x="310" y="120" fill="#3b82f6" fontSize="12" textAnchor="middle">
          INT 2
        </text>
        <circle cx="310" cy="95" r="5" fill="#3b82f6" />
        <line
          x1="310"
          y1="95"
          x2="330"
          y2="85"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <line
          x1="120"
          y1="110"
          x2="280"
          y2="110"
          stroke="#10b981"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <line
          x1="120"
          y1="130"
          x2="280"
          y2="130"
          stroke="#10b981"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <text x="200" y="105" fill="#10b981" fontSize="10" textAnchor="middle">
          Voyageuses
        </text>

        <line
          x1="90"
          y1="160"
          x2="90"
          y2="190"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        <line
          x1="90"
          y1="190"
          x2="200"
          y2="190"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        <text x="145" y="185" fill="#8b5cf6" fontSize="10" textAnchor="middle">
          Navette
        </text>

        <circle
          cx="200"
          cy="210"
          r="20"
          fill="none"
          stroke="#eab308"
          strokeWidth="2"
        />
        <text x="200" y="215" fill="#eab308" fontSize="12" textAnchor="middle">
          L
        </text>

        <line
          x1="220"
          y1="210"
          x2="380"
          y2="210"
          stroke="#64748b"
          strokeWidth="3"
        />
        <text x="230" y="230" fill="#64748b" fontSize="14" fontWeight="bold">
          N (Neutre)
        </text>

        <line
          x1="220"
          y1="225"
          x2="380"
          y2="225"
          stroke="#22c55e"
          strokeWidth="3"
        />
        <text x="230" y="245" fill="#22c55e" fontSize="14" fontWeight="bold">
          PE (Terre)
        </text>

        <text x="20" y="245" fill="#94a3b8" fontSize="10">
          Schéma va-et-vient NFC 15-100
        </text>
      </svg>
    );
  }

  if (type === 'telerupteur') {
    return (
      <svg
        viewBox="0 0 400 250"
        className="w-full h-auto bg-slate-900/50 rounded-lg p-4"
      >
        <line
          x1="20"
          y1="50"
          x2="380"
          y2="50"
          stroke="#f59e0b"
          strokeWidth="3"
        />
        <text x="25" y="40" fill="#f59e0b" fontSize="14" fontWeight="bold">
          L (Phase)
        </text>

        <rect
          x="80"
          y="80"
          width="80"
          height="100"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          rx="4"
        />
        <text x="120" y="120" fill="#3b82f6" fontSize="12" textAnchor="middle">
          TÉLÉ
        </text>
        <text x="120" y="135" fill="#3b82f6" fontSize="10" textAnchor="middle">
          RUPTEUR
        </text>
        <circle cx="120" cy="95" r="5" fill="#3b82f6" />
        <line
          x1="120"
          y1="95"
          x2="140"
          y2="85"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <rect
          x="100"
          y="145"
          width="40"
          height="25"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2"
          rx="2"
        />
        <text x="120" y="162" fill="#8b5cf6" fontSize="8" textAnchor="middle">
          Bobine
        </text>

        <rect
          x="220"
          y="80"
          width="50"
          height="50"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          rx="4"
        />
        <text x="245" y="110" fill="#10b981" fontSize="10" textAnchor="middle">
          BP1
        </text>

        <rect
          x="220"
          y="140"
          width="50"
          height="50"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          rx="4"
        />
        <text x="245" y="170" fill="#10b981" fontSize="10" textAnchor="middle">
          BP2
        </text>

        <line
          x1="140"
          y1="157"
          x2="220"
          y2="105"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        <line
          x1="140"
          y1="157"
          x2="220"
          y2="165"
          stroke="#8b5cf6"
          strokeWidth="2"
        />

        <circle
          cx="320"
          cy="130"
          r="20"
          fill="none"
          stroke="#eab308"
          strokeWidth="2"
        />
        <text x="320" y="135" fill="#eab308" fontSize="12" textAnchor="middle">
          L
        </text>

        <line
          x1="160"
          y1="95"
          x2="300"
          y2="130"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <line
          x1="340"
          y1="130"
          x2="380"
          y2="130"
          stroke="#64748b"
          strokeWidth="3"
        />
        <text x="345" y="150" fill="#64748b" fontSize="12" fontWeight="bold">
          N
        </text>

        <line
          x1="340"
          y1="145"
          x2="380"
          y2="145"
          stroke="#22c55e"
          strokeWidth="3"
        />
        <text x="345" y="165" fill="#22c55e" fontSize="12" fontWeight="bold">
          PE
        </text>

        <text x="20" y="245" fill="#94a3b8" fontSize="10">
          Schéma télérupteur NFC 15-100
        </text>
      </svg>
    );
  }

  if (type === 'minuterie') {
    return (
      <svg
        viewBox="0 0 400 250"
        className="w-full h-auto bg-slate-900/50 rounded-lg p-4"
      >
        <line
          x1="20"
          y1="50"
          x2="380"
          y2="50"
          stroke="#f59e0b"
          strokeWidth="3"
        />
        <text x="25" y="40" fill="#f59e0b" fontSize="14" fontWeight="bold">
          L (Phase)
        </text>

        <rect
          x="80"
          y="80"
          width="80"
          height="100"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          rx="4"
        />
        <text x="120" y="115" fill="#3b82f6" fontSize="12" textAnchor="middle">
          MINUTERIE
        </text>
        <circle cx="120" cy="95" r="5" fill="#3b82f6" />
        <line
          x1="120"
          y1="95"
          x2="140"
          y2="85"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <circle
          cx="120"
          cy="150"
          r="15"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        <line
          x1="120"
          y1="150"
          x2="120"
          y2="140"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        <line
          x1="120"
          y1="150"
          x2="128"
          y2="155"
          stroke="#8b5cf6"
          strokeWidth="2"
        />

        <rect
          x="220"
          y="100"
          width="50"
          height="50"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          rx="4"
        />
        <text x="245" y="130" fill="#10b981" fontSize="10" textAnchor="middle">
          BP
        </text>

        <line
          x1="140"
          y1="150"
          x2="220"
          y2="125"
          stroke="#8b5cf6"
          strokeWidth="2"
        />

        <circle
          cx="320"
          cy="130"
          r="20"
          fill="none"
          stroke="#eab308"
          strokeWidth="2"
        />
        <text x="320" y="135" fill="#eab308" fontSize="12" textAnchor="middle">
          L
        </text>

        <line
          x1="160"
          y1="95"
          x2="300"
          y2="130"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <line
          x1="340"
          y1="130"
          x2="380"
          y2="130"
          stroke="#64748b"
          strokeWidth="3"
        />
        <text x="345" y="150" fill="#64748b" fontSize="12" fontWeight="bold">
          N
        </text>

        <line
          x1="340"
          y1="145"
          x2="380"
          y2="145"
          stroke="#22c55e"
          strokeWidth="3"
        />
        <text x="345" y="165" fill="#22c55e" fontSize="12" fontWeight="bold">
          PE
        </text>

        <text x="20" y="245" fill="#94a3b8" fontSize="10">
          Schéma minuterie NFC 15-100
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 400 250"
      className="w-full h-auto bg-slate-900/50 rounded-lg p-4"
    >
      <line x1="20" y1="50" x2="380" y2="50" stroke="#f59e0b" strokeWidth="3" />
      <text x="25" y="40" fill="#f59e0b" fontSize="14" fontWeight="bold">
        L (Phase)
      </text>

      <rect
        x="150"
        y="80"
        width="60"
        height="80"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        rx="4"
      />
      <text x="180" y="120" fill="#3b82f6" fontSize="12" textAnchor="middle">
        INT
      </text>
      <circle cx="180" cy="95" r="5" fill="#3b82f6" />
      <line
        x1="180"
        y1="95"
        x2="200"
        y2="85"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <circle
        cx="280"
        cy="130"
        r="20"
        fill="none"
        stroke="#eab308"
        strokeWidth="2"
      />
      <text x="280" y="135" fill="#eab308" fontSize="12" textAnchor="middle">
        L
      </text>

      <line
        x1="210"
        y1="95"
        x2="260"
        y2="130"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      <line
        x1="300"
        y1="130"
        x2="380"
        y2="130"
        stroke="#64748b"
        strokeWidth="3"
      />
      <text x="305" y="150" fill="#64748b" fontSize="12" fontWeight="bold">
        N
      </text>

      <line
        x1="300"
        y1="145"
        x2="380"
        y2="145"
        stroke="#22c55e"
        strokeWidth="3"
      />
      <text x="305" y="165" fill="#22c55e" fontSize="12" fontWeight="bold">
        PE
      </text>

      <text x="20" y="245" fill="#94a3b8" fontSize="10">
        Schéma allumage simple NFC 15-100
      </text>
    </svg>
  );
};

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

          {/* Schéma SVG détaillé */}
          {showSchematic && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="text-center mb-4 text-sm text-muted-foreground">
                Schéma de principe NFC 15-100
              </div>
              <CircuitSVG type={selectedCircuit} />
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-200">
                <p className="font-semibold mb-1">ℹ️ Note :</p>
                <p>
                  Schéma conforme NFC 15-100. Toujours se référer aux schémas
                  normalisés officiels pour le câblage réel.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
