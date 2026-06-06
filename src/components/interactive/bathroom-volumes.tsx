'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Droplets, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Volume = '0' | '1' | '2' | 'hors';

interface VolumeInfo {
  name: string;
  description: string;
  color: string;
  borderColor: string;
  bgColor: string;
  equipment: string[];
  ip: string;
  restrictions: string[];
}

const volumesData: Record<Volume, VolumeInfo> = {
  '0': {
    name: 'Volume 0',
    description: 'Intérieur de la baignoire ou du receveur de douche',
    color: 'text-red-400',
    borderColor: 'border-red-500/50',
    bgColor: 'bg-red-500/10',
    equipment: ['Aucun appareil électrique autorisé', 'Sauf TBTS 12V si transformateur hors volume'],
    ip: 'IPX7 minimum (immersion)',
    restrictions: ['Interdit : prises, interrupteurs, luminaires 230V', 'Seuls équipements TBTS ≤ 12V'],
  },
  '1': {
    name: 'Volume 1',
    description: 'Au-dessus de la baignoire/douche jusqu\'à 2,25m de hauteur',
    color: 'text-orange-400',
    borderColor: 'border-orange-500/50',
    bgColor: 'bg-orange-500/10',
    equipment: [
      'Chauffe-eau instantané',
      'Luminaires classe II (IPX4 minimum)',
      'Interrupteurs TBTS ≤ 12V',
    ],
    ip: 'IPX4 minimum (projections d\'eau)',
    restrictions: [
      'Interdit : prises 230V',
      'Interdit : interrupteurs 230V',
      'Boîtes de connexion interdites',
    ],
  },
  '2': {
    name: 'Volume 2',
    description: '60cm autour du volume 1 (horizontal) jusqu\'à 3m de hauteur',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/50',
    bgColor: 'bg-yellow-500/10',
    equipment: [
      'Luminaires classe II (IPX4)',
      'Prises rasoir 20-50V avec transformateur',
      'Chauffe-eau',
      'Sèche-serviettes classe II',
      'Interrupteurs TBTS',
    ],
    ip: 'IPX4 minimum (projections d\'eau)',
    restrictions: [
      'Interdit : prises 230V classiques',
      'Boîtes de connexion autorisées si IPX4',
      'Appareils classe II obligatoire',
    ],
  },
  hors: {
    name: 'Hors volumes',
    description: 'Au-delà de 60cm du volume 2 ou au-dessus de 3m',
    color: 'text-green-400',
    borderColor: 'border-green-500/50',
    bgColor: 'bg-green-500/10',
    equipment: [
      'Prises 230V avec DDR 30mA',
      'Interrupteurs 230V',
      'Luminaires standards',
      'Tous appareils électriques',
    ],
    ip: 'Aucune exigence particulière',
    restrictions: [
      'DDR 30mA obligatoire',
      'Liaison équipotentielle supplémentaire recommandée',
      'Respect des distances de sécurité',
    ],
  },
};

export function BathroomVolumes() {
  const [selectedVolume, setSelectedVolume] = useState<Volume>('0');
  const currentVolume = volumesData[selectedVolume];

  return (
    <div className="space-y-6">
      {/* Schéma interactif */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            Volumes de salle de bain - NFC 15-100
          </CardTitle>
          <CardDescription>
            Cliquez sur un volume pour voir les règles applicables
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Schéma simplifié */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {(['0', '1', '2', 'hors'] as Volume[]).map((vol) => (
              <button
                key={vol}
                onClick={() => setSelectedVolume(vol)}
                className={cn(
                  'p-4 rounded-lg border-2 transition-all duration-300',
                  selectedVolume === vol
                    ? `${volumesData[vol].borderColor} ${volumesData[vol].bgColor} scale-105`
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                )}
              >
                <div className={cn('font-bold text-lg', volumesData[vol].color)}>
                  {volumesData[vol].name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {vol === '0' && 'Baignoire'}
                  {vol === '1' && 'Au-dessus'}
                  {vol === '2' && '60cm autour'}
                  {vol === 'hors' && 'Reste'}
                </div>
              </button>
            ))}
          </div>

          {/* Détails du volume sélectionné */}
          <div
            className={cn(
              'rounded-lg border-2 p-6 space-y-4 animate-[fadeIn_0.3s_ease-out]',
              currentVolume.borderColor,
              currentVolume.bgColor
            )}
          >
            <div>
              <h3 className={cn('text-xl font-bold mb-2', currentVolume.color)}>
                {currentVolume.name}
              </h3>
              <p className="text-sm text-muted-foreground">{currentVolume.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Équipements autorisés */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="font-semibold text-sm">Équipements autorisés</span>
                </div>
                <ul className="space-y-2">
                  {currentVolume.equipment.map((item, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Restrictions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span className="font-semibold text-sm">Restrictions</span>
                </div>
                <ul className="space-y-2">
                  {currentVolume.restrictions.map((item, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Indice de protection */}
            <div className="pt-4 border-t border-white/10">
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Indice de protection : {currentVolume.ip}
              </Badge>
            </div>
          </div>

          {/* Légende */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
              <div className="text-xs text-blue-200">
                <p className="font-semibold mb-1">Points importants :</p>
                <ul className="space-y-1 ml-4">
                  <li>• Liaison équipotentielle supplémentaire (LES) obligatoire en volume 1 et 2</li>
                  <li>• DDR 30mA obligatoire pour tous les circuits</li>
                  <li>• Classe II = double isolation (pas de terre nécessaire)</li>
                  <li>• TBTS = Très Basse Tension de Sécurité (≤ 12V ou 50V selon contexte)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
