import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getDomainById } from '@/lib/content/get-domains';
import { getSheetsByDomain } from '@/lib/content/get-sheets';

export default function DomainPage({ params }: { params: { domain: string } }) {
  const domain = getDomainById(params.domain);

  if (!domain) {
    notFound();
  }

  const sheets = getSheetsByDomain(params.domain);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/domaines">
          <Button variant="ghost" className="mb-4">
            ← Retour aux domaines
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">{domain.name}</h1>
        <p className="text-muted-foreground text-lg">{domain.description}</p>
      </div>

      {domain.subDomains && domain.subDomains.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sous-domaines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {domain.subDomains.map((sub) => (
              <Link key={sub.id} href={`/domaines/${domain.id}/${sub.id}`}>
                <Card className="hover:bg-accent hover:scale-105 transition-all duration-200 cursor-pointer h-full group border-l-4 border-primary">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {sub.name}
                    </CardTitle>
                    <CardDescription>{sub.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {sub.sheetCount} fiche{sub.sheetCount > 1 ? 's' : ''}
                      </Badge>
                      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

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
                      <div className="flex flex-col gap-2">
                        <Badge
                          variant={
                            sheet.criticality === 'critique'
                              ? 'destructive'
                              : sheet.criticality === 'attention'
                                ? 'warning'
                                : 'secondary'
                          }
                        >
                          {sheet.criticality}
                        </Badge>
                        {sheet.subDomain && (
                          <Badge variant="outline">{sheet.subDomain}</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Aucune fiche disponible pour ce domaine.
          </p>
        )}
      </div>
    </div>
  );
}
