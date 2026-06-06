import { CircuitSchematics } from '@/components/interactive/circuit-schematics';
import { Disclaimer } from '@/components/ui/disclaimer';
import { AnimatedSection } from '@/components/sheet/animated-section';
import Link from 'next/link';
import { ChevronLeft, Network } from 'lucide-react';

export const metadata = {
  title: 'Schémas de circuits | ElecNorme',
  description:
    'Guide interactif des schémas de circuits électriques : va-et-vient, télérupteur, minuterie et allumage simple selon la NFC 15-100.',
};

export default function SchemaCircuitsPage() {
  return (
    <div className="container py-12 max-w-5xl">
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
              <Network className="w-8 h-8" />
            </span>
            Schémas de circuits
          </h1>
          <p className="text-lg text-muted-foreground">
            Guide interactif des schémas de câblage conformes NFC 15-100
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <Disclaimer className="mb-8" variant="warning" />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <CircuitSchematics />
      </AnimatedSection>
    </div>
  );
}
