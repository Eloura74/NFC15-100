import { ReferenceTables } from '@/components/reference/reference-tables';
import { Disclaimer } from '@/components/ui/disclaimer';
import { AnimatedSection } from '@/components/sheet/animated-section';
import Link from 'next/link';
import { ChevronLeft, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Tableaux de Référence | ElecNorme',
  description:
    'Tableaux de référence interactifs NFC 15-100 : sections de câble, calibres de protection, longueurs maximales et types de différentiels.',
};

export default function ReferencesPage() {
  return (
    <div className="container py-12 max-w-6xl">
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
              <BookOpen className="w-8 h-8" />
            </span>
            Tableaux de Référence
          </h1>
          <p className="text-lg text-muted-foreground">
            Consultez rapidement les valeurs normatives NFC 15-100 pour vos installations
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <Disclaimer className="mb-8" variant="info" />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <ReferenceTables />
      </AnimatedSection>
    </div>
  );
}
