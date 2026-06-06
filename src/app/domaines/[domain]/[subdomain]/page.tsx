import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDomainById } from '@/lib/content/get-domains';
import { getAllSheets } from '@/lib/content/get-sheets';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

export default function SubDomainPage({
  params,
}: {
  params: { domain: string; subdomain: string };
}) {
  const domain = getDomainById(params.domain);

  if (!domain) {
    notFound();
  }

  const subDomain = domain.subDomains?.find((sub) => sub.id === params.subdomain);

  if (!subDomain) {
    notFound();
  }

  const allSheets = getAllSheets();
  const sheets = allSheets.filter(
    (sheet) => sheet.domain === params.domain && sheet.subDomain === params.subdomain
  );

  return (
    <div className="container py-8">
      <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl glass-card">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50 z-10"></div>
          <ImageWithFallback 
            src={`/images/domains/${domain.id}.png`} 
            alt={domain.name}
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
          />
        </div>
        <div className="relative z-20 p-8 md:p-12">
          <Link href={`/domaines/${params.domain}`}>
            <Button variant="ghost" className="mb-6 hover:bg-background/20 backdrop-blur-sm">
              ← Retour à {domain.name}
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">{subDomain.name}</h1>
          <p className="text-muted-foreground text-xl max-w-2xl">{subDomain.description}</p>
          <div className="flex gap-2 mt-6">
            <Badge variant="outline" className="backdrop-blur-md bg-background/50">{domain.name}</Badge>
            <Badge variant="secondary" className="backdrop-blur-md bg-background/50">
              {subDomain.sheetCount} fiche{subDomain.sheetCount > 1 ? 's' : ''}
            </Badge>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Fiches disponibles</h2>
        {sheets.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {sheets.map((sheet) => (
              <Link key={sheet.id} href={`/fiches/${sheet.id}`}>
                <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md overflow-hidden flex flex-col sm:flex-row glass-card">
                  <div className="sm:w-48 h-32 sm:h-auto shrink-0 relative overflow-hidden bg-muted/20 border-b sm:border-b-0 sm:border-r border-white/5">
                    <ImageWithFallback 
                      src={`/images/fiches/${sheet.id}.png`} 
                      alt={`Miniature de la fiche ${sheet.title}`}
                      title={sheet.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-screen opacity-90"
                      containerClassName="w-full h-full absolute inset-0 mix-blend-lighten"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <CardHeader className="py-4">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="group-hover:text-primary transition-colors">{sheet.title}</CardTitle>
                          <CardDescription className="mt-2 line-clamp-2">
                            {sheet.summary}
                          </CardDescription>
                        </div>
                        <div className="flex flex-row sm:flex-col gap-2 flex-wrap">
                          <Badge
                            variant={
                              sheet.criticality === 'critique' ||
                              sheet.criticality === 'danger_immediat'
                                ? 'destructive'
                                : sheet.criticality === 'attention'
                                  ? 'warning'
                                  : 'secondary'
                            }
                          >
                            {sheet.criticality}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Les fiches pour ce sous-domaine seront bientôt disponibles.
              </p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                En attendant, consultez les autres domaines ou utilisez la recherche.
              </p>
              <div className="flex justify-center gap-2 mt-4">
                <Link href={`/domaines/${params.domain}`}>
                  <Button variant="outline">Retour au domaine</Button>
                </Link>
                <Link href="/recherche">
                  <Button>Rechercher</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
