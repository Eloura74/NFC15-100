import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { checklistsData } from '@/lib/data/checklists';
import { AnimatedSection } from '@/components/sheet/animated-section';
import Link from 'next/link';
import { CheckSquare, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Checklists Consuel | ElecNorme',
  description: 'Listes de contrôle interactives pour vérifier la conformité de vos installations électriques.',
};

export default function ChecklistsPage() {
  return (
    <div className="container py-12 max-w-5xl">
      <AnimatedSection className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <CheckSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Checklists d&apos;Autocontrôle</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Préparez le passage du Consuel avec nos listes de contrôle interactives. Vos avancées sont sauvegardées automatiquement hors-ligne sur votre appareil.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklistsData.map((template, index) => (
          <AnimatedSection key={template.id} delay={100 + index * 50}>
            <Link href={`/checklists/${template.id}`} className="block h-full group">
              <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="text-sm font-medium text-muted-foreground">
                      {template.items.length} points de contrôle
                    </span>
                    <Button variant="ghost" size="sm" className="group-hover:bg-primary/10 group-hover:text-primary">
                      Commencer <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
