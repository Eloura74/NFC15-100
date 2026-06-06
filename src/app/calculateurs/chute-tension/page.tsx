import { VoltageDropCalculator } from '@/components/calculators/voltage-drop-calculator';
import { Disclaimer } from '@/components/ui/disclaimer';
import { AnimatedSection } from '@/components/sheet/animated-section';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Calculateur de chute de tension | ElecNorme',
  description:
    'Calculateur de chute de tension conforme NFC 15-100 : vérification de la conformité des câbles selon courant, longueur et section.',
};

export default function ChuteTensionCalculatorPage() {
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
        <Disclaimer className="mb-8" variant="info" />
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <VoltageDropCalculator />
      </AnimatedSection>
    </div>
  );
}
