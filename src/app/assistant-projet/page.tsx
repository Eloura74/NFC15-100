import { ProjectWizard } from '@/components/project/project-wizard';
import { Disclaimer } from '@/components/ui/disclaimer';
import { AnimatedSection } from '@/components/sheet/animated-section';
import Link from 'next/link';
import { ChevronLeft, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Assistant Projet | ElecNorme',
  description:
    'Assistant intelligent pour votre projet électrique : calcul automatique des circuits, budget et matériel selon NFC 15-100.',
};

export default function AssistantProjetPage() {
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
              <Sparkles className="w-8 h-8" />
            </span>
            Assistant Projet
          </h1>
          <p className="text-lg text-muted-foreground">
            Répondez à quelques questions pour obtenir une estimation personnalisée de votre installation électrique
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <Disclaimer className="mb-8" variant="info" />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <ProjectWizard />
      </AnimatedSection>
    </div>
  );
}
