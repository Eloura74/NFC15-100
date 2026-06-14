import fs from 'fs';
import path from 'path';

// ... (imports will be sorted out below)
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
import { GTLDiagram } from '@/components/diagrams/gtl-diagram';
import { EarthDiagram } from '@/components/diagrams/earth-diagram';
import { DiffDiagram } from '@/components/diagrams/diff-diagram';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { FavoriteButton } from '@/components/ui/favorite-button';
import { SheetViewTracker } from '@/components/sheet/sheet-view-tracker';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Info,
  CheckCircle2,
  AlertOctagon,
  Settings,
  Zap,
  Search,
  Layers,
  FileText,
  Image as ImageIcon,
  Ruler,
  Activity,
  ShieldCheck,
  Cable,
  Home,
  Wifi,
  Droplets,
  Network,
  Power,
  Battery,
  Shield,
  Waves,
  Globe,
  Pin,
  ClipboardList,
  AlertTriangle,
  ShieldAlert,
  BookOpen,
  Link as LinkIcon,
  Eye,
} from 'lucide-react';

export default function SheetPage({ params }: { params: { id: string } }) {
  const sheet = getSheetById(params.id);

  if (!sheet) {
    return notFound();
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
      case 'gaine-technique-logement':
        return <GTLDiagram />;
      case 'prise-terre-valeur':
      case 'mesure-resistance-terre':
      case 'liaison-equipotentielle-principale':
        return <EarthDiagram />;
      case 'diff-30ma-logement':
      case 'differentiel-type-a':
        return <DiffDiagram />;
      default: {
        const imagePath = path.join(
          process.cwd(),
          'public',
          'images',
          'fiches',
          `${sheet.id}.png`
        );
        if (fs.existsSync(imagePath)) {
          return (
            <div className="w-full max-w-3xl mx-auto rounded-xl border border-border/50 shadow-xl overflow-hidden bg-muted/20">
              <img
                src={`/images/fiches/${sheet.id}.png`}
                alt={`Illustration ${sheet.title}`}
                className="w-full h-auto object-contain"
              />
            </div>
          );
        }
        return null;
      }
    }
  };

  const diagram = renderDiagram();

  // Parsing intelligent de la réponse immédiate pour une lecture instantanée
  const immediateAnswers = sheet.immediateAnswer
    .split(/\|/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const useTableForValues =
    sheet.content.values && sheet.content.values.length >= 4;

  return (
    <div className="container py-8 max-w-4xl space-y-8">
      <SheetViewTracker sheetId={sheet.id} />
      <AnimatedSection>
        <div className="relative rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-2xl glass-card">
          <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50 z-10"></div>
            <ImageWithFallback
              src={`/images/domains/${sheet.domain}.png`}
              alt={sheet.domain}
              title={sheet.title}
              className="w-full h-full object-cover opacity-30 mix-blend-screen"
            />
          </div>
          <div className="p-8">
            {/* Navigation Breadcrumb */}
            <nav
              className="flex text-sm text-muted-foreground mb-6 bg-background/40 backdrop-blur-md p-3 rounded-xl border border-white/10"
              aria-label="Breadcrumb"
            >
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" /> Accueil
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 opacity-50">/</span>
                    <Link
                      href="/domaines"
                      className="hover:text-primary transition-colors"
                    >
                      Domaines
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 opacity-50">/</span>
                    <Link
                      href={`/domaines/${sheet.domain}`}
                      className="hover:text-primary transition-colors capitalize"
                    >
                      {sheet.domain.replace('-', ' ')}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 opacity-50">/</span>
                    <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-none">
                      {sheet.title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="text-center space-y-4 mt-8 relative z-10">
              {/* MÉMO RAPIDE - OPTIMISÉ MOBILE CHANTIER */}
              {sheet.immediateAnswer && (
                <div className="bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 border-4 border-primary/60 rounded-2xl p-5 md:p-6 mb-6 backdrop-blur-md shadow-xl">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Zap className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    <span className="text-sm md:text-base font-bold uppercase tracking-wider text-primary">
                      Mémo rapide
                    </span>
                  </div>
                  <p className="text-lg md:text-2xl font-black text-foreground leading-relaxed text-center">
                    {sheet.immediateAnswer}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 flex-wrap">
                <FavoriteButton sheetId={sheet.id} size="sm" showLabel />
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary bg-primary/10 backdrop-blur-md"
                >
                  {sheet.domain}
                </Badge>
                {sheet.subDomain && (
                  <Badge
                    variant="outline"
                    className="backdrop-blur-md bg-background/50 border-white/10"
                  >
                    {sheet.subDomain}
                  </Badge>
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
                  className="uppercase tracking-widest text-xs font-bold shadow-lg"
                >
                  {sheet.criticality}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-balance text-white drop-shadow-lg glow-text">
                {sheet.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto text-balance">
                {sheet.summary}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section "L'essentiel" supprimée - déjà affiché dans le mémo rapide en haut */}

      {diagram && (
        <AnimatedSection delay={200}>
          <div className="mt-8 mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <span className="p-2 bg-primary/10 text-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Eye className="w-6 h-6" />
              </span>
              Aperçu visuel
            </h2>
            {diagram}
          </div>
        </AnimatedSection>
      )}

      {sheet.content.values && sheet.content.values.length > 0 && (
        <AnimatedSection delay={300}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="p-2 bg-primary/10 text-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Pin className="w-6 h-6" />
              </span>
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
        {sheet.content.requirements &&
          sheet.content.requirements.length > 0 && (
            <AnimatedSection delay={400}>
              <Card className="h-full border-border/50 shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ClipboardList className="w-6 h-6 text-primary" />
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
          {sheet.content.commonErrors &&
            sheet.content.commonErrors.length > 0 && (
              <AnimatedSection delay={500}>
                <Card className="border-warning/50 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-warning" />
                  <CardHeader className="bg-warning/5 pb-3">
                    <CardTitle className="flex items-center gap-2 text-warning text-lg">
                      <AlertTriangle className="w-6 h-6" /> À ne surtout pas
                      faire
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

          {sheet.content.risks && sheet.content.risks.length > 0 && (
            <AnimatedSection delay={600}>
              <Card className="border-destructive/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-destructive" />
                <CardHeader className="bg-destructive/5 pb-3">
                  <CardTitle className="flex items-center gap-2 text-destructive text-lg">
                    <ShieldAlert className="w-6 h-6" />
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
              <BookOpen className="w-5 h-5" />
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

      {sheet.relatedSheets && sheet.relatedSheets.length > 0 && (
        <AnimatedSection delay={800}>
          <div className="mt-8">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <span className="p-2 bg-primary/10 text-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <LinkIcon className="w-6 h-6" />
              </span>
              Fiches connexes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sheet.relatedSheets.map((relatedId) => {
                const relatedSheet = getSheetById(relatedId);
                if (!relatedSheet) return null;
                return (
                  <Link key={relatedId} href={`/fiches/${relatedId}`}>
                    <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {relatedSheet.title}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                          {relatedSheet.summary}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Badge variant="outline" className="text-xs">
                          {relatedSheet.domain}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
