import { notFound } from 'next/navigation';
import { checklistsData } from '@/lib/data/checklists';
import { InteractiveChecklist } from '@/components/checklists/interactive-checklist';
import { AnimatedSection } from '@/components/sheet/animated-section';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export function generateStaticParams() {
  return checklistsData.map((template) => ({
    id: template.id,
  }));
}

export default function ChecklistPage({ params }: { params: { id: string } }) {
  const template = checklistsData.find((c) => c.id === params.id);

  if (!template) {
    notFound();
  }

  return (
    <div className="container py-12 max-w-3xl">
      <AnimatedSection>
        <Link
          href="/checklists"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour aux checklists
        </Link>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <InteractiveChecklist template={template} />
      </AnimatedSection>
    </div>
  );
}
