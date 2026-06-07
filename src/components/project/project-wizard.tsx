'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Disclaimer } from '@/components/ui/disclaimer';
import { ExportPDF } from '@/components/export/export-pdf';
import {
  Home,
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calculator,
  FileText,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 1 | 2 | 3 | 4 | 5;

interface ProjectData {
  surface: string;
  type: 'studio' | 't1' | 't2' | 't3' | 't4' | 't5';
  chauffage: 'electrique' | 'gaz' | 'pac';
  cuisine: 'standard' | 'equipee';
  salleBain: number;
  chauffageElectrique: boolean;
  vmc: boolean;
  irve: boolean;
  photovoltaique: boolean;
}

export function ProjectWizard() {
  const [step, setStep] = useState<Step>(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    surface: '',
    type: 't2',
    chauffage: 'gaz',
    cuisine: 'standard',
    salleBain: 1,
    chauffageElectrique: false,
    vmc: false,
    irve: false,
    photovoltaique: false,
  });

  const updateData = (field: keyof ProjectData, value: any) => {
    setProjectData({ ...projectData, [field]: value });
  };

  const nextStep = () => {
    if (step < 5) setStep((step + 1) as Step);
  };

  const prevStep = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  const calculateResults = () => {
    const surface = parseFloat(projectData.surface) || 0;
    const type = projectData.type;

    // Calcul du nombre de circuits selon NFC 15-100
    let circuits = {
      eclairage: 0,
      prises: 0,
      chauffage: 0,
      specialises: 0,
    };

    // Éclairage
    if (surface <= 35) circuits.eclairage = 2;
    else if (surface <= 100) circuits.eclairage = 4;
    else circuits.eclairage = 6;

    // Prises
    if (type === 'studio') circuits.prises = 4;
    else if (type === 't1') circuits.prises = 6;
    else if (type === 't2') circuits.prises = 8;
    else if (type === 't3') circuits.prises = 10;
    else if (type === 't4') circuits.prises = 12;
    else circuits.prises = 14;

    // Chauffage électrique
    if (projectData.chauffageElectrique) {
      circuits.chauffage = Math.ceil(surface / 20);
    }

    // Circuits spécialisés
    circuits.specialises = 2; // Lave-linge + lave-vaisselle minimum
    if (projectData.cuisine === 'equipee') circuits.specialises += 1; // Four
    if (projectData.irve) circuits.specialises += 1;
    if (projectData.photovoltaique) circuits.specialises += 2;

    // Budget estimé
    const budget = {
      materiaux:
        (circuits.eclairage +
          circuits.prises +
          circuits.chauffage +
          circuits.specialises) *
        150,
      mainOeuvre: surface * 40,
      total: 0,
    };
    budget.total = budget.materiaux + budget.mainOeuvre;

    return { circuits, budget };
  };

  const results = calculateResults();

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={cn(
              'flex items-center gap-2',
              step >= s ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                step >= s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-slate-800 text-muted-foreground'
              )}
            >
              {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
            </div>
            {s < 5 && <div className="flex-1 h-0.5 bg-slate-800 mx-2" />}
          </div>
        ))}
      </div>

      {/* Step 1: Surface */}
      {step === 1 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Surface du logement
            </CardTitle>
            <CardDescription>
              Quelle est la surface habitable en m² ?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="surface">Surface (m²)</Label>
              <Input
                id="surface"
                type="number"
                placeholder="Ex: 80"
                value={projectData.surface}
                onChange={(e) => updateData('surface', e.target.value)}
                className="bg-slate-900/60"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['30', '60', '90', '120', '150'].map((val) => (
                <Button
                  key={val}
                  variant={projectData.surface === val ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateData('surface', val)}
                >
                  {val} m²
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Type de logement */}
      {step === 2 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Type de logement
            </CardTitle>
            <CardDescription>
              Quel est le type de votre logement ?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { value: 'studio', label: 'Studio' },
                { value: 't1', label: 'T1' },
                { value: 't2', label: 'T2' },
                { value: 't3', label: 'T3' },
                { value: 't4', label: 'T4' },
                { value: 't5', label: 'T5+' },
              ].map((type) => (
                <Button
                  key={type.value}
                  variant={
                    projectData.type === type.value ? 'default' : 'outline'
                  }
                  onClick={() => updateData('type', type.value)}
                  className="h-16 flex-col"
                >
                  <span className="font-semibold">{type.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Équipements */}
      {step === 3 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Équipements
            </CardTitle>
            <CardDescription>Quels équipements prévoyez-vous ?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg">
                <div>
                  <div className="font-semibold">Chauffage électrique</div>
                  <div className="text-xs text-muted-foreground">
                    Radiateurs ou plancher chauffant
                  </div>
                </div>
                <Button
                  variant={
                    projectData.chauffageElectrique ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() =>
                    updateData(
                      'chauffageElectrique',
                      !projectData.chauffageElectrique
                    )
                  }
                >
                  {projectData.chauffageElectrique ? 'Oui' : 'Non'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg">
                <div>
                  <div className="font-semibold">VMC</div>
                  <div className="text-xs text-muted-foreground">
                    Ventilation mécanique contrôlée
                  </div>
                </div>
                <Button
                  variant={projectData.vmc ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateData('vmc', !projectData.vmc)}
                >
                  {projectData.vmc ? 'Oui' : 'Non'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg">
                <div>
                  <div className="font-semibold">Borne IRVE</div>
                  <div className="text-xs text-muted-foreground">
                    Recharge véhicule électrique
                  </div>
                </div>
                <Button
                  variant={projectData.irve ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateData('irve', !projectData.irve)}
                >
                  {projectData.irve ? 'Oui' : 'Non'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg">
                <div>
                  <div className="font-semibold">Photovoltaïque</div>
                  <div className="text-xs text-muted-foreground">
                    Panneaux solaires
                  </div>
                </div>
                <Button
                  variant={projectData.photovoltaique ? 'default' : 'outline'}
                  size="sm"
                  onClick={() =>
                    updateData('photovoltaique', !projectData.photovoltaique)
                  }
                >
                  {projectData.photovoltaique ? 'Oui' : 'Non'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Cuisine */}
      {step === 4 && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Cuisine
            </CardTitle>
            <CardDescription>
              Quel type de cuisine prévoyez-vous ?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={
                  projectData.cuisine === 'standard' ? 'default' : 'outline'
                }
                onClick={() => updateData('cuisine', 'standard')}
                className="h-20 flex-col"
              >
                <span className="font-semibold">Standard</span>
                <span className="text-xs text-muted-foreground">
                  Lave-linge + lave-vaisselle
                </span>
              </Button>
              <Button
                variant={
                  projectData.cuisine === 'equipee' ? 'default' : 'outline'
                }
                onClick={() => updateData('cuisine', 'equipee')}
                className="h-20 flex-col"
              >
                <span className="font-semibold">Équipée</span>
                <span className="text-xs text-muted-foreground">
                  + Four + plaque
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Résultats */}
      {step === 5 && (
        <div className="space-y-4">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Résultats personnalisés
              </CardTitle>
              <CardDescription>Basé sur vos besoins NFC 15-100</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Circuits */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-primary" />
                  Circuits recommandés
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-primary">
                      {results.circuits.eclairage}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Circuits éclairage
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-primary">
                      {results.circuits.prises}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Circuits prises
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-primary">
                      {results.circuits.chauffage}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Circuits chauffage
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-primary">
                      {results.circuits.specialises}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Circuits spécialisés
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Budget estimé
                </h3>
                <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Matériaux
                      </div>
                      <div className="text-xl font-bold text-primary">
                        {results.budget.materiaux.toLocaleString()} €
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Main d&apos;œuvre
                      </div>
                      <div className="text-xl font-bold text-primary">
                        {results.budget.mainOeuvre.toLocaleString()} €
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total</div>
                      <div className="text-2xl font-bold text-green-400">
                        {results.budget.total.toLocaleString()} €
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <ExportPDF
                  title={`Projet Électrique - ${projectData.type} (${projectData.surface} m²)`}
                  content={`
                <h1>Projet Électrique NFC 15-100</h1>
                <h2>Caractéristiques du projet</h2>
                <ul>
                  <li>Type de logement : ${projectData.type}</li>
                  <li>Surface : ${projectData.surface} m²</li>
                  <li>Chauffage électrique : ${projectData.chauffageElectrique ? 'Oui' : 'Non'}</li>
                  <li>VMC : ${projectData.vmc ? 'Oui' : 'Non'}</li>
                  <li>Borne IRVE : ${projectData.irve ? 'Oui' : 'Non'}</li>
                  <li>Photovoltaïque : ${projectData.photovoltaique ? 'Oui' : 'Non'}</li>
                </ul>
                <h2>Circuits recommandés</h2>
                <ul>
                  <li>Éclairage : ${results.circuits.eclairage} circuits</li>
                  <li>Prises : ${results.circuits.prises} circuits</li>
                  <li>Chauffage : ${results.circuits.chauffage} circuits</li>
                  <li>Spécialisés : ${results.circuits.specialises} circuits</li>
                </ul>
                <h2>Budget estimé</h2>
                <ul>
                  <li>Matériaux : ${results.budget.materiaux.toLocaleString()} €</li>
                  <li>Main d'œuvre : ${results.budget.mainOeuvre.toLocaleString()} €</li>
                  <li><strong>Total : ${results.budget.total.toLocaleString()} €</strong></li>
                </ul>
                <div class="disclaimer">
                  <div class="disclaimer-title">⚠️ Avertissement</div>
                  <p>Ce document est fourni à titre indicatif. Les calculs sont basés sur la NFC 15-100 mais ne remplacent pas une étude professionnelle. Toujours consulter un électricien qualifié pour la réalisation des travaux.</p>
                </div>
              `}
                  filename={`projet-electrique-${projectData.type}-${projectData.surface}m2`}
                  variant="default"
                  size="lg"
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="lg" className="flex-1">
                    <Calculator className="w-4 h-4 mr-2" />
                    Voir les calculateurs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Disclaimer variant="warning" />
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Précédent
        </Button>
        <Button
          onClick={nextStep}
          disabled={step === 5}
          className="flex items-center gap-2"
        >
          {step === 5 ? 'Terminer' : 'Suivant'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
