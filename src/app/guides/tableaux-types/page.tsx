import { TableauTypes } from '@/components/project/tableau-types';
import { Disclaimer } from '@/components/ui/disclaimer';
import { AnimatedSection } from '@/components/sheet/animated-section';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';

export const metadata = {
  title: 'Tableaux Types | ElecNorme',
  description:
    'Schémas de tableaux électriques types T1 à T5 conformes NFC 15-100 : circuits recommandés, protections et sections selon la surface du logement.',
};

export default function TableauxTypesPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <AnimatedSection>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <span className="p-3 bg-primary/10 text-primary rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Home className="w-8 h-8" />
            </span>
            Tableaux Types
          </h1>
          <p className="text-lg text-muted-foreground">
            Schémas de tableaux électriques conformes NFC 15-100 pour tous les types de logements
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <Disclaimer className="mb-8" variant="info" />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <TableauTypes />
      </AnimatedSection>
    </div>
  );
}
