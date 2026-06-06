import { ShortCircuitCalculator } from '@/components/calculators/short-circuit-calculator';
import { Disclaimer } from '@/components/ui/disclaimer';
import { AnimatedSection } from '@/components/sheet/animated-section';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Calculateur de courant de court-circuit | ElecNorme',
  description:
    'Calculateur de courant de court-circuit présumé selon NFC 15-100 : estimation du Icc pour dimensionner les protections.',
};

export default function CourtCircuitCalculatorPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <AnimatedSection>
        <Link
          href="/calculateurs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour aux calculateurs
        </Link>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <Disclaimer className="mb-8" variant="warning" />
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <ShortCircuitCalculator />
      </AnimatedSection>
    </div>
  );
}
