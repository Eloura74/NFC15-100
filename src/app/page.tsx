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
import { getAllSheets } from '@/lib/content/get-sheets';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
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
} from 'lucide-react';

export default function HomePage() {
  const domains = getAllDomains();
  const currentVersion = getCurrentVersion();
  const sheets = getAllSheets();
  const totalSheets = sheets.length;

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

  const popularSheets = sheets.slice(0, 6);

  return (
    <div className="container py-8 space-y-12 max-w-7xl relative">
      {/* Animated background particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '7s', animationDelay: '0.5s' }}
        />
      </div>
      <AnimatedSection>
        <section className="text-center space-y-3 py-8 relative rounded-xl overflow-hidden border border-primary/20 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-sm animate-[fadeIn_0.6s_ease-out]">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-background/50 to-background"></div>
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
              <h1 className="relative text-2xl md:text-4xl font-bold tracking-tight text-white animate-[fadeIn_1s_ease-out]">
                ElecNorme
              </h1>
            </div>
            <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto font-normal leading-relaxed text-balance">
              La référence visuelle de la norme{' '}
              <span className="text-primary font-medium animate-[pulse_2s_ease-in-out_infinite]">
                NFC 15-100
              </span>
            </p>
            {/* Integrated search bar */}
            <div className="max-w-lg mx-auto animate-[fadeIn_1.2s_ease-out]">
              <div className="relative flex gap-2 p-1.5 bg-slate-900/60 backdrop-blur-md rounded-xl border border-primary/30 focus-within:border-primary/50 transition-all">
                <Input
                  type="search"
                  placeholder="Rechercher une règle, un circuit, une section..."
                  className="flex-1 border-0 focus-visible:ring-0 text-sm bg-transparent placeholder:text-muted-foreground/50 h-9 px-3"
                />
                <Link href="/recherche" tabIndex={-1}>
                  <Button
                    size="sm"
                    className="px-4 h-9 text-sm font-medium bg-primary hover:bg-primary/90 text-white"
                  >
                    Rechercher
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="text-xs px-2.5 py-0.5 border-primary/30 bg-primary/5 text-primary flex items-center gap-1"
              >
                <Zap className="w-3 h-3" /> {totalSheets} fiches
              </Badge>
              <Badge
                variant="outline"
                className="text-xs px-2.5 py-0.5 border-primary/30 bg-primary/5 text-primary flex items-center gap-1"
              >
                <Folder className="w-3 h-3" /> {domains.length} domaines
              </Badge>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <Disclaimer className="mb-8" />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="p-2 bg-primary/10 text-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Flame className="w-6 h-6" />
            </span>{' '}
            Fiches populaires
          </h2>
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
                          {Math.floor(Math.random() * 5) + 2} min
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

      <AnimatedSection delay={300}>
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="p-2 bg-primary/10 text-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Folder className="w-6 h-6" />
            </span>{' '}
            Explorer par domaine
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
