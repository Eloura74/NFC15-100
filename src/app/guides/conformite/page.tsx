import { ConformityChecklist } from '@/components/project/conformity-checklist';
import { Disclaimer } from '@/components/ui/disclaimer';
import { AnimatedSection } from '@/components/sheet/animated-section';
import Link from 'next/link';
import { ChevronLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'Checklist Conformité | ElecNorme',
  description:
    'Vérifiez la conformité de votre installation électrique NFC 15-100 avec notre checklist interactive : tableau, différentiels, terre, circuits et locaux spéciaux.',
};

export default function ConformitePage() {
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
              <Shield className="w-8 h-8" />
            </span>
            Checklist de Conformité
          </h1>
          <p className="text-lg text-muted-foreground">
            Vérifiez que votre installation électrique respecte la norme NFC 15-100
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <Disclaimer className="mb-8" variant="info" />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <ConformityChecklist />
      </AnimatedSection>
    </div>
  );
}
