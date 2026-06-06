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
import { AnimatedSection } from '@/components/sheet/animated-section';
import { VisualValueCard } from '@/components/sheet/visual-value-card';
import { QuickReferenceTable } from '@/components/sheet/quick-reference-table';
import { CableSectionDiagram } from '@/components/diagrams/cable-section-diagram';
import { PowerCaliberDiagram } from '@/components/diagrams/power-caliber-diagram';

export default function SheetPage({ params }: { params: { id: string } }) {
  const sheet = getSheetById(params.id);

  if (!sheet) {
    notFound();
  }

  // Sélection dynamique du schéma
  const renderDiagram = () => {
    switch (sheet.id) {
      case 'volumes-salle-eau':
        return <VolumesSalleEauSchema />;
      case 'sections-cables-courant':
        return <CableSectionDiagram />;
      case 'puissance-souscrite-calibre':
        return <PowerCaliberDiagram />;
      default:
        return null;
    }
  };

  const diagram = renderDiagram();

  // Parsing intelligent de la réponse immédiate pour une lecture instantanée
  const immediateAnswers = sheet.immediateAnswer
    .split(/\|/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const useTableForValues = sheet.content.values.length >= 4;

  return (
    <div className="container py-8 max-w-4xl space-y-8">
      <AnimatedSection>
        <Link href={`/domaines/${sheet.domain}`}>
          <Button variant="ghost" className="mb-4">
            ← Retour au domaine
          </Button>
        </Link>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className="border-primary/30 text-primary bg-primary/5"
            >
              {sheet.domain}
            </Badge>
            {sheet.subDomain && (
              <Badge variant="outline">{sheet.subDomain}</Badge>
            )}
            <Badge
              variant={
                sheet.criticality === 'critique' ||
                sheet.criticality === 'danger_immediat'
                  ? 'destructive'
                  : sheet.criticality === 'attention'
                    ? 'warning'
                    : 'secondary'
              }
              className="uppercase tracking-widest text-xs font-bold"
            >
              {sheet.criticality}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
            {sheet.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            {sheet.summary}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <Card className="bg-primary/5 border-primary shadow-lg overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2 text-primary">
              <span className="text-2xl">⚡</span>
              L&apos;essentiel en 3 secondes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {immediateAnswers.length > 1 ? (
              <ul className="space-y-3">
                {immediateAnswers.map((answer, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-lg font-medium leading-relaxed">
                      {answer}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xl font-medium leading-relaxed">
                {sheet.immediateAnswer}
              </p>
            )}
          </CardContent>
        </Card>
      </AnimatedSection>

      {diagram && (
        <AnimatedSection delay={200}>
          <div className="mt-8 mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <span className="text-primary">�️</span>
              Aperçu visuel
            </h2>
            {diagram}
          </div>
        </AnimatedSection>
      )}

      {sheet.content.values.length > 0 && (
        <AnimatedSection delay={300}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-primary">📌</span>
              Valeurs normatives
            </h2>

            {useTableForValues ? (
              <QuickReferenceTable
                title="Tableau des correspondances"
                headers={[
                  'Paramètre / Élément',
                  'Valeur Requise',
                  'Contexte / Conditions',
                ]}
                rows={sheet.content.values.map((v, i) => ({
                  cols: [
                    v.label || v.parameter || '-',
                    `${v.value} ${v.unit || ''}`.trim(),
                    [v.context, ...(v.conditions || [])]
                      .filter(Boolean)
                      .join(', ') || '-',
                  ],
                  highlight:
                    i === 0 || v.value.toString().includes('obligatoire'),
                }))}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sheet.content.values.map((value, i) => (
                  <VisualValueCard
                    key={i}
                    label={value.label || value.parameter || ''}
                    value={value.value.toString()}
                    unit={value.unit}
                    context={value.context}
                    highlight={
                      i === 0 || value.value.toString().includes('obligatoire')
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {sheet.content.requirements.length > 0 && (
          <AnimatedSection delay={400}>
            <Card className="h-full border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-primary">📋</span>
                  Règles d&apos;installation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {sheet.content.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm font-bold border border-primary/20">
                        {i + 1}
                      </div>
                      <span className="leading-relaxed text-muted-foreground">
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        <div className="space-y-6">
          {sheet.content.commonErrors.length > 0 && (
            <AnimatedSection delay={500}>
              <Card className="border-warning/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-warning" />
                <CardHeader className="bg-warning/5 pb-3">
                  <CardTitle className="flex items-center gap-2 text-warning text-lg">
                    <span>⚠️</span>À ne surtout pas faire
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {sheet.content.commonErrors.map((error, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="text-warning mt-1 font-bold text-lg leading-none">
                          ×
                        </span>
                        <span className="leading-relaxed">{error}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}

          {sheet.content.risks.length > 0 && (
            <AnimatedSection delay={600}>
              <Card className="border-destructive/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-destructive" />
                <CardHeader className="bg-destructive/5 pb-3">
                  <CardTitle className="flex items-center gap-2 text-destructive text-lg">
                    <span>🚨</span>
                    Risques encourus
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {sheet.content.risks.map((risk, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-background p-3 rounded-lg border border-border/50"
                    >
                      <Badge
                        variant={
                          risk.level === 'critique' ? 'destructive' : 'warning'
                        }
                        className="shrink-0 mt-0.5"
                      >
                        {risk.level}
                      </Badge>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {risk.description}
                        </p>
                        {risk.consequences && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {risk.consequences.join(' • ')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AnimatedSection>
          )}
        </div>
      </div>

      <AnimatedSection delay={700}>
        <Card className="bg-muted/50 border-border/50 mt-8">
          <CardContent className="p-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span className="text-lg">📚</span>
              Source officielle :{' '}
              <strong className="text-foreground">
                {sheet.sources[0]?.title}
              </strong>
              <Badge variant="outline" className="ml-2">
                {sheet.sources[0]?.reference}
              </Badge>
            </p>
            <p className="text-xs text-muted-foreground/70">
              Dernière vérification :{' '}
              {new Date(sheet.lastVerified).toLocaleDateString('fr-FR')} • Cette
              fiche ne remplace pas les textes officiels ni l&apos;intervention
              d&apos;un professionnel habilité.
            </p>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
