'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getAllDomains } from '@/lib/content/get-domains';
import { getCurrentVersion } from '@/lib/content/get-versions';
import { getAllSheets, getSheetById } from '@/lib/content/get-sheets';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { FavoritesManager } from '@/lib/favorites/favorites-manager';
import { AnimatedSection } from '@/components/sheet/animated-section';
import { Disclaimer } from '@/components/ui/disclaimer';
import {
  Power,
  Shield,
  Globe,
  Clock,
  Cable,
  Waves,
  Battery,
  Network,
  Home,
  Search,
  Calculator,
  Star,
  Folder,
  Settings,
  BookOpen,
  Wrench,
  ChevronRight,
  ArrowRight,
  Flame,
  CheckCircle2,
  Zap,
  CheckSquare,
  Crosshair,
  History,
} from 'lucide-react';

export default function HomePage() {
  const domains = getAllDomains();
  const currentVersion = getCurrentVersion();
  const sheets = getAllSheets();
  const totalSheets = sheets.length;
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  async function loadRecentlyViewed() {
    try {
      const recent = await FavoritesManager.getRecentlyViewed(6);
      setRecentlyViewed(recent.map((r) => r.id));
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    }
  }

  const getDomainIcon = (id: string, className: string = 'w-6 h-6') => {
    switch (id) {
      case 'alimentation':
        return <Power className={className} />;
      case 'protections':
        return <Shield className={className} />;
      case 'terre':
        return <Globe className={className} />;
      case 'circuits':
        return <Cable className={className} />;
      case 'locaux-speciaux':
        return <Waves className={className} />;
      case 'energie':
        return <Battery className={className} />;
      case 'reseau':
        return <Network className={className} />;
      default:
        return <Folder className={className} />;
    }
  };

  // Get most critical sheets for quick access
  const popularSheets = sheets
    .filter(
      (s) => s.criticality === 'critique' || s.criticality === 'danger_immediat'
    )
    .slice(0, 6)
    .concat(
      sheets.slice(
        0,
        6 -
          Math.min(
            6,
            sheets.filter(
              (s) =>
                s.criticality === 'critique' ||
                s.criticality === 'danger_immediat'
            ).length
          )
      )
    );

  return (
    <div className="container py-8 space-y-12 max-w-7xl relative">
      {/* Subtle background gradient - Mode Chantier compatible */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
      </div>
      <AnimatedSection>
        <section className="text-center space-y-3 py-8 relative rounded-xl overflow-hidden border border-border bg-card backdrop-blur-sm animate-[fadeIn_0.6s_ease-out]">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-card via-background/50 to-background"></div>
            {/* Tech grid pattern */}
            <div className="absolute inset-0 opacity-15">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.15) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              ></div>
            </div>
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/5 animate-[pulse_6s_ease-in-out_infinite]"></div>
            {/* Animated corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/40 animate-[pulse_3s_ease-in-out_infinite]"></div>
            <div
              className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/40 animate-[pulse_3s_ease-in-out_infinite]"
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/40 animate-[pulse_3s_ease-in-out_infinite]"
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/40 animate-[pulse_3s_ease-in-out_infinite]"
              style={{ animationDelay: '1.5s' }}
            ></div>
          </div>
          <div className="relative z-10 p-5 space-y-4">
            <div className="inline-block animate-[fadeIn_0.8s_ease-out]">
              <h1 className="relative text-2xl md:text-4xl font-bold tracking-tight text-foreground animate-[fadeIn_1s_ease-out]">
                ElecNorme
              </h1>
              <p className="text-xs md:text-sm text-primary/80 font-medium mt-1">
                Référence NFC 15-100 pour professionnels
              </p>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed text-balance">
              Accédez rapidement aux valeurs normatives, tableaux de
              dimensionnement et règles essentielles de la{' '}
              <span className="text-primary font-semibold">
                NF C 15-100 édition 2020
              </span>{' '}
              pour vos installations électriques en France.
            </p>
            {/* Quick access search */}
            <div className="max-w-lg mx-auto animate-[fadeIn_1.2s_ease-out]">
              <Link href="/recherche" className="block">
                <div className="relative flex gap-2 p-1.5 bg-muted/60 backdrop-blur-md rounded-xl border border-border hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="flex-1 flex items-center px-3 h-9 text-sm text-muted-foreground/70 group-hover:text-foreground transition-colors">
                    <Search className="w-4 h-4 mr-2" />
                    Rechercher une règle, un circuit, une section...
                  </div>
                  <Button
                    size="sm"
                    className="px-4 h-9 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Rechercher
                  </Button>
                </div>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="text-xs px-2.5 py-0.5 border-primary/30 bg-primary/5 text-primary flex items-center gap-1"
              >
                <Zap className="w-3 h-3" /> {totalSheets} fiches techniques
              </Badge>
              <Badge
                variant="outline"
                className="text-xs px-2.5 py-0.5 border-primary/30 bg-primary/5 text-primary flex items-center gap-1"
              >
                <Folder className="w-3 h-3" /> {domains.length} domaines
              </Badge>
              <Badge
                variant="outline"
                className="text-xs px-2.5 py-0.5 border-green-500/30 bg-green-500/5 text-green-600 dark:text-green-400 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3" /> Conforme NFC 15-100:2020
              </Badge>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <Disclaimer className="mb-8" />
      </AnimatedSection>

      {recentlyViewed.length > 0 && (
        <AnimatedSection delay={150}>
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="p-2 bg-primary/10 text-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <History className="w-6 h-6" />
              </span>{' '}
              Récemment consultées
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentlyViewed.map((sheetId, index) => {
                const sheet = getSheetById(sheetId);
                if (!sheet) return null;

                return (
                  <AnimatedSection key={sheet.id} delay={150 + index * 30}>
                    <Link href={`/fiches/${sheet.id}`}>
                      <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md overflow-hidden flex flex-col">
                        <CardHeader className="pb-3 pt-4 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
                              {sheet.title}
                            </CardTitle>
                            <Badge
                              variant="secondary"
                              className="text-xs shrink-0"
                            >
                              {sheet.domain}
                            </Badge>
                          </div>
                          <CardDescription className="text-sm line-clamp-2 mt-2">
                            {sheet.summary}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </section>
        </AnimatedSection>
      )}

      <AnimatedSection delay={200}>
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="p-2 bg-red-500/10 text-red-500 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <Flame className="w-6 h-6" />
            </span>{' '}
            Valeurs essentielles - Accès rapide
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Les valeurs normatives les plus consultées sur chantier
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularSheets.map((sheet, index) => (
              <AnimatedSection key={sheet.id} delay={200 + index * 30}>
                <Link href={`/fiches/${sheet.id}`}>
                  <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md overflow-hidden flex flex-col">
                    <ImageWithFallback
                      src={`/images/fiches/${sheet.id}.png`}
                      alt={sheet.title}
                      title={sheet.title}
                      containerClassName="h-32 w-full relative overflow-hidden bg-muted/20 border-b border-white/5 shrink-0"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 mix-blend-screen"
                    />
                    <CardHeader className="pb-3 pt-4 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
                          {sheet.title}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {sheet.domain}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm line-clamp-2 mt-2">
                        {sheet.summary}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {sheet.content?.values?.length
                            ? `${sheet.content.values.length} valeurs`
                            : '2-3 min'}
                        </span>
                        <span>•</span>
                        <span>Mis à jour récemment</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* MÉMO TECHNIQUE CHANTIER - Format ultra-compact tableau */}
      <AnimatedSection delay={250}>
        <section className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border-4 border-primary/50 rounded-2xl p-3 md:p-5 shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="w-7 h-7 md:w-8 md:h-8 text-primary animate-pulse" />
            <h3 className="text-xl md:text-3xl font-black text-primary uppercase tracking-wide">
              Mémo Technique Chantier
            </h3>
            <Zap className="w-7 h-7 md:w-8 md:h-8 text-primary animate-pulse" />
          </div>

          {/* Format tableau ultra-compact - TOUT visible sans scroll */}
          <div className="bg-card/95 backdrop-blur rounded-xl border-2 border-primary/30 overflow-hidden">
            <div className="divide-y-2 divide-border">
              {/* Ligne 1 */}
              <div className="grid grid-cols-2 divide-x-2 divide-border">
                <div className="p-2 md:p-3 hover:bg-primary/5 transition-colors">
                  <div className="text-xs md:text-sm font-bold text-primary mb-1">
                    ⚡ DIFFÉRENTIEL 30mA
                  </div>
                  <div className="text-sm md:text-lg font-black text-foreground">
                    Min 2 DDR · 1 Type A
                  </div>
                </div>
                <div className="p-2 md:p-3 hover:bg-primary/5 transition-colors">
                  <div className="text-xs md:text-sm font-bold text-primary mb-1">
                    🔌 SECTIONS CÂBLES
                  </div>
                  <div className="text-xs md:text-base font-bold text-foreground leading-tight">
                    10A→1.5 | 16A→1.5 | 20A→2.5 | 32A→6mm²
                  </div>
                </div>
              </div>

              {/* Ligne 2 */}
              <div className="grid grid-cols-2 divide-x-2 divide-border">
                <div className="p-2 md:p-3 hover:bg-primary/5 transition-colors">
                  <div className="text-xs md:text-sm font-bold text-primary mb-1">
                    🌍 TERRE
                  </div>
                  <div className="text-sm md:text-lg font-black text-foreground">
                    ≤ 100Ω · Mesure oblig.
                  </div>
                </div>
                <div className="p-2 md:p-3 hover:bg-primary/5 transition-colors">
                  <div className="text-xs md:text-sm font-bold text-primary mb-1">
                    🍳 PRISES CUISINE
                  </div>
                  <div className="text-sm md:text-lg font-black text-foreground">
                    Min 6 · 4 au plan 8-25cm
                  </div>
                </div>
              </div>

              {/* Ligne 3 */}
              <div className="grid grid-cols-2 divide-x-2 divide-border">
                <div className="p-2 md:p-3 hover:bg-primary/5 transition-colors">
                  <div className="text-xs md:text-sm font-bold text-primary mb-1">
                    💡 ÉCLAIRAGE
                  </div>
                  <div className="text-sm md:text-lg font-black text-foreground">
                    Max 8 pts/circuit 16A
                  </div>
                </div>
                <div className="p-2 md:p-3 hover:bg-primary/5 transition-colors">
                  <div className="text-xs md:text-sm font-bold text-primary mb-1">
                    📦 GTL
                  </div>
                  <div className="text-sm md:text-lg font-black text-foreground">
                    600×250mm · Sol→Plafond
                  </div>
                </div>
              </div>

              {/* Ligne 4 */}
              <div className="grid grid-cols-2 divide-x-2 divide-border">
                <div className="p-2 md:p-3 hover:bg-primary/5 transition-colors">
                  <div className="text-xs md:text-sm font-bold text-primary mb-1">
                    📉 CHUTE TENSION
                  </div>
                  <div className="text-sm md:text-lg font-black text-foreground">
                    Éclairage ≤3% · Autres ≤5%
                  </div>
                </div>
                <div className="p-2 md:p-3 hover:bg-primary/5 transition-colors">
                  <div className="text-xs md:text-sm font-bold text-primary mb-1">
                    🚿 VOLUMES SALLE EAU
                  </div>
                  <div className="text-sm md:text-lg font-black text-foreground">
                    V0:baignoire · V1:2.25m · V2:60cm
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-3 text-xs md:text-sm text-muted-foreground font-medium">
            ⚠️ Valeurs NFC 15-100 · Vérifier conditions spécifiques
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={300}>
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="p-2 bg-primary/10 text-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Folder className="w-6 h-6" />
            </span>{' '}
            Tous les domaines
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {domains.map((domain, index) => (
              <AnimatedSection key={domain.id} delay={300 + index * 30}>
                <Link href={`/domaines/${domain.id}`}>
                  <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md text-center">
                    <CardHeader className="pb-3">
                      <div className="mb-4 flex justify-center text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        {getDomainIcon(domain.id, 'w-12 h-12')}
                      </div>
                      <CardTitle className="text-sm group-hover:text-primary transition-colors">
                        {domain.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="text-xs">
                        {domain.sheetCount} fiche
                        {domain.sheetCount > 1 ? 's' : ''}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={400}>
        <section className="pt-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="p-2 bg-primary/10 text-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Wrench className="w-6 h-6" />
            </span>{' '}
            Outils
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <Link href="/checklists">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                      <CheckSquare className="w-6 h-6" />
                    </span>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      Checklists
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    Autocontrôle Consuel
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/calculateurs">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                      <Calculator className="w-6 h-6" />
                    </span>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      Calculateurs
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    Outils de dimensionnement
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/outils/volumes-image">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                      <Crosshair className="w-6 h-6" />
                    </span>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      Analyseur Volumes
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    Vérification sur photo
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/recherche">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                      <Search className="w-6 h-6" />
                    </span>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      Recherche
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    Trouvez facilement
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/favoris">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                      <Star className="w-6 h-6" />
                    </span>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      Favoris
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    Vos fiches sauvegardées
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
