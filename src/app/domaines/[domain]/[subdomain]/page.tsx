import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDomainById } from '@/lib/content/get-domains';
import { getAllSheets } from '@/lib/content/get-sheets';

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
      <div className="mb-8">
        <Link href={`/domaines/${params.domain}`}>
          <Button variant="ghost" className="mb-4">
            ← Retour à {domain.name}
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">{subDomain.name}</h1>
        <p className="text-muted-foreground text-lg">{subDomain.description}</p>
        <div className="flex gap-2 mt-4">
          <Badge variant="outline">{domain.name}</Badge>
          <Badge variant="secondary">
            {subDomain.sheetCount} fiche{subDomain.sheetCount > 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Fiches disponibles</h2>
        {sheets.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {sheets.map((sheet) => (
              <Link key={sheet.id} href={`/fiches/${sheet.id}`}>
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle>{sheet.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {sheet.summary}
                        </CardDescription>
                      </div>
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
                  </CardHeader>
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
