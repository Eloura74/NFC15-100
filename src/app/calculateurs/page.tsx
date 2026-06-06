import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Disclaimer } from '@/components/ui/disclaimer';
import { AnimatedSection } from '@/components/sheet/animated-section';
import {
  Calculator,
  Zap,
  TrendingDown,
  Cable,
  Table,
  Gauge,
  Target,
} from 'lucide-react';

const calculators = [
  {
    id: 'section-cable',
    name: 'Section de câble',
    description: 'Calculer la section minimale selon puissance, longueur et mode de pose',
    icon: Cable,
    badge: 'Populaire',
    badgeVariant: 'default' as const,
  },
  {
    id: 'chute-tension',
    name: 'Chute de tension',
    description: 'Vérifier la chute de tension dans un circuit',
    icon: TrendingDown,
    badge: 'Nouveau',
    badgeVariant: 'success' as const,
  },
  {
    id: 'puissance',
    name: 'Puissance & Intensité',
    description: 'Convertir puissance, tension et intensité (mono/tri)',
    icon: Zap,
  },
  {
    id: 'protection',
    name: 'Calibre de protection',
    description: 'Déterminer le calibre du disjoncteur selon le circuit',
    icon: Target,
  },
  {
    id: 'court-circuit',
    name: 'Courant de court-circuit',
    description: 'Calculer le courant de court-circuit présumé',
    icon: Gauge,
    badge: 'Avancé',
    badgeVariant: 'warning' as const,
  },
  {
    id: 'tableau-sections',
    name: 'Tableaux de référence',
    description: 'Sections normalisées, intensités admissibles et protections',
    icon: Table,
  },
];

export default function CalculateursPage() {
  return (
    <div className="container py-12 max-w-6xl">
      <AnimatedSection>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <span className="p-3 bg-primary/10 text-primary rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Calculator className="w-8 h-8" />
            </span>
            Calculateurs électriques
          </h1>
          <p className="text-lg text-muted-foreground">
            Outils de calcul conformes NFC 15-100 pour vos installations
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <Disclaimer className="mb-8" variant="info" />
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc, index) => {
          const Icon = calc.icon;
          return (
            <AnimatedSection key={calc.id} delay={150 + index * 50}>
              <Link href={`/calculateurs/${calc.id}`}>
                <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      {calc.badge && (
                        <Badge variant={calc.badgeVariant} className="text-xs">
                          {calc.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {calc.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {calc.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
