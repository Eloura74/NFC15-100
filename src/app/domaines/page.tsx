import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllDomains } from '@/lib/content/get-domains';
import { AnimatedSection } from '@/components/sheet/animated-section';

export default function DomainesPage() {
  const domains = getAllDomains();

  const domainIcons: Record<string, string> = {
    alimentation: '⚡',
    protections: '🛡️',
    terre: '⚓',
    circuits: '🔌',
    'locaux-speciaux': '💧',
    energie: '🔋',
  };

  return (
    <div className="container py-12 max-w-5xl">
      <AnimatedSection>
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <span className="text-primary">🎯</span> Domaines
          </h1>
          <p className="text-xl text-muted-foreground">
            Explorez les différents domaines de la norme NFC 15-100
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domains.map((domain, index) => (
          <AnimatedSection key={domain.id} delay={100 + index * 50}>
            <Link href={`/domaines/${domain.id}`}>
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-card rounded-xl shadow-sm border group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
                      <span className="text-3xl">
                        {domainIcons[domain.id] || '📁'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">{domain.name}</CardTitle>
                        <Badge variant="secondary" className="group-hover:bg-primary/20 transition-colors shrink-0">{domain.sheetCount} fiches</Badge>
                      </div>
                      <CardDescription className="text-base mt-2">
                        {domain.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {domain.subDomains && domain.subDomains.length > 0 && (
                  <CardContent className="pt-0">
                    <div className="ml-16">
                      <p className="text-sm font-semibold mb-3 text-muted-foreground">Sous-domaines :</p>
                      <div className="flex flex-wrap gap-2">
                        {domain.subDomains.map((sub) => (
                          <Badge key={sub.id} variant="outline" className="bg-background/50 hover:bg-primary/10 transition-colors">
                            {sub.name} <span className="ml-1 text-muted-foreground opacity-70">({sub.sheetCount})</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
