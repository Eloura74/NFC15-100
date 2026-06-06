import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Disclaimer } from '@/components/ui/disclaimer';
import { AnimatedSection } from '@/components/sheet/animated-section';
import {
  Sparkles,
  Workflow,
  Calculator,
  Hammer,
  Smartphone,
  Brain,
  CheckCircle2,
  Clock,
  Rocket,
  Zap,
  Network,
  FileText,
  Wrench,
  Camera,
} from 'lucide-react';

type PhaseStatus = 'completed' | 'in-progress' | 'planned' | 'future';

const roadmapPhases: Array<{
  phase: string;
  title: string;
  status: PhaseStatus;
  date: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  features: Array<{ name: string; completed: boolean }>;
}> = [
  {
    phase: 'Phase 1',
    title: 'Conformité & Contenu critique',
    status: 'completed' as PhaseStatus,
    date: 'Juin 2026',
    icon: CheckCircle2,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    features: [
      { name: 'Disclaimer légal sur toutes les pages', completed: true },
      {
        name: 'Fiche différentiels type B/F (photovoltaïque, IRVE)',
        completed: true,
      },
      { name: 'Volumes salle de bain interactifs', completed: true },
      { name: 'Calculateur section de câble avancé', completed: true },
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Schémas interactifs',
    status: 'completed',
    date: 'Juin 2026',
    icon: Network,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    features: [
      {
        name: 'Schémas unifilaires types par pièce (chambre, séjour, cuisine)',
        completed: false,
      },
      { name: 'Schémas va-et-vient, télérupteur, minuterie', completed: true },
      {
        name: 'Schémas de tableaux électriques types (T1 à T5)',
        completed: false,
      },
      {
        name: 'Bibliothèque de symboles électriques normalisés',
        completed: false,
      },
      { name: 'Export PDF des schémas', completed: false },
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Calculateurs complémentaires',
    status: 'completed',
    date: 'Juin 2026',
    icon: Calculator,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    features: [
      { name: 'Calculateur de chute de tension détaillé', completed: true },
      { name: 'Calculateur de courant de court-circuit', completed: true },
      { name: 'Calculateur de calibre de protection', completed: true },
      {
        name: 'Convertisseur puissance/intensité (mono/tri)',
        completed: true,
      },
      { name: 'Tableaux de référence interactifs', completed: false },
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Assistant projet',
    status: 'planned',
    date: 'Septembre 2026',
    icon: Workflow,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    features: [
      {
        name: 'Wizard intelligent : questions → recommandations',
        completed: false,
      },
      { name: 'Générateur de liste de matériel automatique', completed: false },
      { name: 'Estimateur de budget avec prix indicatifs', completed: false },
      { name: 'Export PDF du projet complet', completed: false },
      { name: 'Sauvegarde cloud des projets', completed: false },
    ],
  },
  {
    phase: 'Phase 5',
    title: 'Mode chantier',
    status: 'planned',
    date: 'Octobre 2026',
    icon: Hammer,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    features: [
      { name: 'Interface simplifiée pour terrain', completed: false },
      { name: 'Gros boutons tactiles (usage avec gants)', completed: false },
      { name: 'Mode offline (PWA)', completed: false },
      { name: 'Accès rapide aux favoris', completed: false },
      { name: 'Mode sombre optimisé pour extérieur', completed: false },
    ],
  },
  {
    phase: 'Phase 6',
    title: 'Fonctionnalités IA',
    status: 'future',
    date: 'T4 2026',
    icon: Brain,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    features: [
      {
        name: 'Scan & Check : Photo tableau → Analyse conformité IA',
        completed: false,
      },
      { name: 'Simulateur 3D volumes salle de bain (AR)', completed: false },
      {
        name: 'Assistant vocal : "Quelle section pour 32A sur 20m ?"',
        completed: false,
      },
      { name: "Détecteur d'anomalies sur schémas uploadés", completed: false },
      { name: 'Recommandations personnalisées par IA', completed: false },
    ],
  },
];

const statusConfig = {
  completed: {
    label: 'Terminé',
    variant: 'default' as const,
    icon: CheckCircle2,
  },
  'in-progress': {
    label: 'En cours',
    variant: 'default' as const,
    icon: Zap,
  },
  planned: {
    label: 'Planifié',
    variant: 'outline' as const,
    icon: Clock,
  },
  future: {
    label: 'Futur',
    variant: 'outline' as const,
    icon: Rocket,
  },
};

export const metadata = {
  title: 'Roadmap | ElecNorme',
  description:
    'Découvrez les fonctionnalités à venir sur ElecNorme : schémas interactifs, calculateurs avancés, assistant projet, mode chantier et IA.',
};

export default function RoadmapPage() {
  return (
    <div className="container py-12 max-w-6xl">
      <AnimatedSection>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <span className="p-3 bg-primary/10 text-primary rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Sparkles className="w-8 h-8" />
            </span>
            Roadmap & Fonctionnalités à venir
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les prochaines innovations qui feront d&apos;ElecNorme la
            référence incontournable pour les professionnels et passionnés de
            l&apos;électricité
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <Disclaimer className="mb-12" variant="info" />
      </AnimatedSection>

      <div className="space-y-8">
        {roadmapPhases.map((phase, index) => {
          const PhaseIcon = phase.icon;
          const StatusIcon = statusConfig[phase.status].icon;
          const completedCount = phase.features.filter(
            (f) => f.completed
          ).length;
          const totalCount = phase.features.length;
          const progress = (completedCount / totalCount) * 100;

          return (
            <AnimatedSection key={phase.phase} delay={150 + index * 100}>
              <Card
                className={`border-2 ${phase.borderColor} ${phase.bgColor} hover:-translate-y-1 transition-all duration-300`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-4 ${phase.bgColor} ${phase.color} rounded-xl border-2 ${phase.borderColor}`}
                      >
                        <PhaseIcon className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {phase.phase}
                          </Badge>
                          <Badge
                            variant={statusConfig[phase.status].variant}
                            className="text-xs"
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[phase.status].label}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl">
                          {phase.title}
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">
                          Livraison prévue : {phase.date}
                        </CardDescription>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {phase.status !== 'future' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Progression
                        </span>
                        <span className={phase.color}>
                          {completedCount}/{totalCount} fonctionnalités
                        </span>
                      </div>
                      <div className="h-2 bg-slate-900/60 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${phase.bgColor} transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {phase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        {feature.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5 group-hover:border-primary/50 transition-colors" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.completed
                              ? 'text-foreground font-medium'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Call to action */}
      <AnimatedSection delay={800}>
        <Card className="mt-12 border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary" />
              Vous avez une suggestion ?
            </CardTitle>
            <CardDescription>
              Votre avis compte ! Aidez-nous à prioriser les fonctionnalités qui
              vous seront le plus utiles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10">
                <FileText className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold mb-1">
                  Proposer une fonctionnalité
                </h3>
                <p className="text-sm text-muted-foreground">
                  Partagez vos idées pour améliorer ElecNorme
                </p>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10">
                <Wrench className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Signaler un bug</h3>
                <p className="text-sm text-muted-foreground">
                  Aidez-nous à corriger les problèmes rapidement
                </p>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-lg border border-white/10">
                <Camera className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Partager un retour</h3>
                <p className="text-sm text-muted-foreground">
                  Votre expérience nous aide à nous améliorer
                </p>
              </div>
            </div>

            <p className="text-sm text-center text-muted-foreground">
              Contact :{' '}
              <span className="text-primary">feedback@elecnorme.fr</span> (à
              venir)
            </p>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
