import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllDomains } from '@/lib/content/get-domains';

export default function DomainesPage() {
  const domains = getAllDomains();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Domaines</h1>
        <p className="text-muted-foreground">
          Explorez les différents domaines de l&apos;électricité
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domains.map((domain) => (
          <Link key={domain.id} href={`/domaines/${domain.id}`}>
            <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl">{domain.name}</CardTitle>
                  <Badge variant="secondary">{domain.sheetCount} fiches</Badge>
                </div>
                <CardDescription className="text-base">
                  {domain.description}
                </CardDescription>
              </CardHeader>
              {domain.subDomains && domain.subDomains.length > 0 && (
                <CardContent>
                  <p className="text-sm font-semibold mb-2">Sous-domaines :</p>
                  <div className="flex flex-wrap gap-2">
                    {domain.subDomains.map((sub) => (
                      <Badge key={sub.id} variant="outline">
                        {sub.name} ({sub.sheetCount})
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
