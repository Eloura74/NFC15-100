'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Disclaimer } from '@/components/ui/disclaimer';
import { CheckCircle2, AlertCircle, Shield, Home, Zap, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  category: string;
  question: string;
  description: string;
  reference: string;
  critical: boolean;
}

const checklistData: ChecklistItem[] = [
  // Tableau électrique
  {
    id: 't1',
    category: 'Tableau électrique',
    question: 'Le tableau est-il accessible et situé à moins de 1,30m du sol ?',
    description: 'Le tableau doit être facilement accessible pour la maintenance',
    reference: 'NFC 15-100 §771.558',
    critical: true,
  },
  {
    id: 't2',
    category: 'Tableau électrique',
    question: 'Une réserve de 20% minimum est-elle disponible ?',
    description: 'Réserve obligatoire pour extensions futures',
    reference: 'NFC 15-100 §771.558.3',
    critical: true,
  },
  {
    id: 't3',
    category: 'Tableau électrique',
    question: 'Chaque circuit est-il repéré clairement ?',
    description: 'Étiquetage obligatoire de chaque circuit',
    reference: 'NFC 15-100 §771.558.4',
    critical: false,
  },
  // Différentiels
  {
    id: 'd1',
    category: 'Différentiels',
    question: 'Un différentiel 30mA type A est-il présent pour les circuits normaux ?',
    description: 'Protection des personnes contre les contacts indirects',
    reference: 'NFC 15-100 §411.3.3',
    critical: true,
  },
  {
    id: 'd2',
    category: 'Différentiels',
    question: 'Un différentiel 30mA type B est-il présent si photovoltaïque ou IRVE ?',
    description: 'Protection spécifique pour courant continu',
    reference: 'NFC 15-100 §411.3.3',
    critical: true,
  },
  {
    id: 'd3',
    category: 'Différentiels',
    question: 'La sélectivité différentielle est-elle respectée ?',
    description: 'Différentiels en cascade avec sélectivité',
    reference: 'NFC 15-100 §535.4',
    critical: false,
  },
  // Terre
  {
    id: 'e1',
    category: 'Terre',
    question: 'La résistance de terre est-elle inférieure à 100Ω ?',
    description: 'Valeur maximale pour schéma TT',
    reference: 'NFC 15-100 §411.5.3',
    critical: true,
  },
  {
    id: 'e2',
    category: 'Terre',
    question: 'Une liaison équipotentielle principale est-elle présente ?',
    description: 'Relie toutes les canalisations métalliques',
    reference: 'NFC 15-100 §411.3.1.2',
    critical: true,
  },
  {
    id: 'e3',
    category: 'Terre',
    question: 'Les conducteurs de protection ont-ils les sections minimales ?',
    description: 'Section PE selon la section des phases',
    reference: 'NFC 15-100 §543.1',
    critical: true,
  },
  // Circuits
  {
    id: 'c1',
    category: 'Circuits',
    question: 'Les circuits spécialisés (LL, LV, Four) sont-ils dédiés ?',
    description: 'Circuits non partagés avec d&apos;autres usages',
    reference: 'NFC 15-100 §771.314',
    critical: true,
  },
  {
    id: 'c2',
    category: 'Circuits',
    question: 'Les sections de câble sont-elles adaptées aux protections ?',
    description: 'Section selon calibre du disjoncteur',
    reference: 'NFC 15-100 §771.314',
    critical: true,
  },
  {
    id: 'c3',
    category: 'Circuits',
    question: 'La chute de tension est-elle inférieure à 3% (éclairage) ou 5% (force) ?',
    description: 'Vérification des longueurs de câble',
    reference: 'NFC 15-100 §525',
    critical: true,
  },
  // Locaux spéciaux
  {
    id: 's1',
    category: 'Salle de bain',
    question: 'Les volumes 0, 1, 2 sont-ils respectés ?',
    description: 'Aucun appareil dans le volume 0',
    reference: 'NFC 15-100 §701',
    critical: true,
  },
  {
    id: 's2',
    category: 'Salle de bain',
    question: 'Une liaison équipotentielle supplémentaire est-elle présente ?',
    description: 'LES obligatoire en salle de bain',
    reference: 'NFC 15-100 §701.415.2',
    critical: true,
  },
  {
    id: 's3',
    category: 'Salle de bain',
    question: 'Les indices de protection (IP) sont-ils adaptés ?',
    description: 'IP minimum selon le volume',
    reference: 'NFC 15-100 §701.30',
    critical: true,
  },
];

export function ConformityChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const getProgress = () => {
    const total = checklistData.length;
    const checked = checkedItems.size;
    return { total, checked, percentage: Math.round((checked / total) * 100) };
  };

  const getResults = () => {
    const criticalItems = checklistData.filter((item) => item.critical);
    const criticalChecked = criticalItems.filter((item) => checkedItems.has(item.id));
    const nonCriticalItems = checklistData.filter((item) => !item.critical);
    const nonCriticalChecked = nonCriticalItems.filter((item) => checkedItems.has(item.id));

    return {
      critical: { total: criticalItems.length, checked: criticalChecked.length },
      nonCritical: { total: nonCriticalItems.length, checked: nonCriticalChecked.length },
    };
  };

  const resetChecklist = () => {
    setCheckedItems(new Set());
    setShowResults(false);
  };

  const progress = getProgress();
  const results = getResults();
  const isConform = results.critical.checked === results.critical.total;

  const categories = Array.from(new Set(checklistData.map((item) => item.category)));

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <div>
                <div className="font-semibold">Progression de la vérification</div>
                <div className="text-sm text-muted-foreground">
                  {progress.checked} / {progress.total} points vérifiés
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {progress.percentage}%
            </Badge>
          </div>
          <div className="h-3 bg-slate-900/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Checklist by category */}
      {categories.map((category) => (
        <Card key={category} className="border-white/10">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              {category === 'Tableau électrique' && <Home className="w-5 h-5 text-primary" />}
              {category === 'Différentiels' && <Zap className="w-5 h-5 text-primary" />}
              {category === 'Terre' && <Shield className="w-5 h-5 text-primary" />}
              {category === 'Circuits' && <Wrench className="w-5 h-5 text-primary" />}
              {category === 'Salle de bain' && <Home className="w-5 h-5 text-primary" />}
              {category}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {checklistData
              .filter((item) => item.category === category)
              .map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-all cursor-pointer',
                    checkedItems.has(item.id)
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-white/10 bg-slate-900/60 hover:bg-slate-900/80'
                  )}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5',
                        checkedItems.has(item.id)
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-white/30'
                      )}
                    >
                      {checkedItems.has(item.id) && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{item.question}</span>
                        {item.critical && (
                          <Badge variant="destructive" className="text-xs">
                            Critique
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </div>
                      <div className="text-xs text-primary/70">
                        Réf : {item.reference}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      ))}

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={() => setShowResults(true)}
          disabled={progress.checked === 0}
          className="flex-1"
          size="lg"
        >
          <Shield className="w-4 h-4 mr-2" />
          Vérifier la conformité
        </Button>
        <Button onClick={resetChecklist} variant="outline" size="lg">
          Réinitialiser
        </Button>
      </div>

      {/* Results */}
      {showResults && (
        <Card
          className={cn(
            'border-2 animate-[fadeIn_0.3s_ease-out]',
            isConform ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'
          )}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isConform ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  Installation conforme
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  Installation non conforme
                </>
              )}
            </CardTitle>
            <CardDescription>
              {isConform
                ? 'Tous les points critiques sont conformes à la NFC 15-100'
                : 'Des points critiques doivent être corrigés'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10">
                <div className="text-sm text-muted-foreground mb-1">Points critiques</div>
                <div className="text-2xl font-bold">
                  {results.critical.checked} / {results.critical.total}
                </div>
                <div
                  className={cn(
                    'text-sm mt-1',
                    results.critical.checked === results.critical.total
                      ? 'text-green-400'
                      : 'text-red-400'
                  )}
                >
                  {results.critical.checked === results.critical.total ? 'Conforme' : 'Non conforme'}
                </div>
              </div>
              <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10">
                <div className="text-sm text-muted-foreground mb-1">Points recommandés</div>
                <div className="text-2xl font-bold">
                  {results.nonCritical.checked} / {results.nonCritical.total}
                </div>
                <div className="text-sm mt-1 text-blue-400">
                  {results.nonCritical.checked === results.nonCritical.total
                    ? 'Optimal'
                    : 'Améliorations possibles'}
                </div>
              </div>
            </div>

            {!isConform && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="font-semibold mb-2 flex items-center gap-2 text-red-200">
                  <AlertCircle className="w-4 h-4" />
                  Points à corriger
                </div>
                <ul className="space-y-1 text-sm text-red-200">
                  {checklistData
                    .filter((item) => item.critical && !checkedItems.has(item.id))
                    .map((item) => (
                      <li key={item.id}>• {item.question}</li>
                    ))}
                </ul>
              </div>
            )}

            <Disclaimer variant="warning" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
