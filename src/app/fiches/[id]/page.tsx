import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSheetById } from '@/lib/content/get-sheets';
import { VolumesSalleEauSchema } from '@/components/schemas/volumes-salle-eau-schema';

export default function SheetPage({ params }: { params: { id: string } }) {
  const sheet = getSheetById(params.id);

  if (!sheet) {
    notFound();
  }

  const hasSchema = sheet.id === 'volumes-salle-eau';

  return (
    <div className="container py-8 max-w-4xl">
      <Link href={`/domaines/${sheet.domain}`}>
        <Button variant="ghost" className="mb-4">
          ← Retour au domaine
        </Button>
      </Link>

      <div className="space-y-6">
        <div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-4xl font-bold">{sheet.title}</h1>
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
          <p className="text-lg text-muted-foreground">{sheet.summary}</p>
          <div className="flex gap-2 mt-4">
            <Badge variant="outline">{sheet.domain}</Badge>
            {sheet.subDomain && (
              <Badge variant="outline">{sheet.subDomain}</Badge>
            )}
            <Badge variant="outline">{sheet.version}</Badge>
          </div>
        </div>

        <Card className="bg-primary/10 border-primary">
          <CardHeader>
            <CardTitle>Réponse immédiate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{sheet.immediateAnswer}</p>
          </CardContent>
        </Card>

        {hasSchema && (
          <Card>
            <CardHeader>
              <CardTitle>Schéma interactif</CardTitle>
              <CardDescription>
                Survolez les zones pour voir les détails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VolumesSalleEauSchema />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Quand cette fiche s&apos;applique</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{sheet.content.whenApplies}</p>
          </CardContent>
        </Card>

        {sheet.content.requirements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Conditions nécessaires</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {sheet.content.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {sheet.content.values.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Valeurs et limites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sheet.content.values.map((value, i) => (
                  <div key={i} className="border-l-4 border-primary pl-4">
                    <p className="font-semibold">{value.label}</p>
                    <p className="text-2xl font-bold text-primary">
                      {value.value} {value.unit}
                    </p>
                    {value.conditions && value.conditions.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Conditions : {value.conditions.join(', ')}
                      </p>
                    )}
                    {value.source && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Source : {value.source}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {sheet.content.exceptions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Exceptions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {sheet.content.exceptions.map((exception, i) => (
                  <li key={i}>{exception}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {sheet.content.commonErrors.length > 0 && (
          <Card className="border-warning">
            <CardHeader>
              <CardTitle>Erreurs fréquentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {sheet.content.commonErrors.map((error, i) => (
                  <li key={i} className="text-warning-foreground">
                    {error}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {sheet.content.risks.length > 0 && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle>Risques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sheet.content.risks.map((risk, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          risk.level === 'critique' ? 'destructive' : 'warning'
                        }
                      >
                        {risk.level}
                      </Badge>
                      <p className="font-semibold">{risk.description}</p>
                    </div>
                    {risk.consequences && risk.consequences.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                        {risk.consequences.map((cons, j) => (
                          <li key={j}>{cons}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {sheet.content.controls.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Contrôles à effectuer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sheet.content.controls.map((control, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold">{i + 1}.</span>
                    <span>{control}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sheet.sources.map((source, i) => (
                <div key={i} className="text-sm">
                  <p className="font-semibold">{source.title}</p>
                  <p className="text-muted-foreground">
                    {source.reference}
                    {source.article && ` - ${source.article}`}
                    {source.date && ` (${source.date})`}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Dernière vérification :{' '}
              {new Date(sheet.lastVerified).toLocaleDateString('fr-FR')}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Cette fiche est une aide à la consultation. Elle ne remplace pas
              les textes officiels ni l&apos;intervention d&apos;un
              professionnel habilité.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
