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
import { 
  Power, 
  Shield, 
  Globe, 
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
  Zap
} from 'lucide-react';

export default function HomePage() {
  const domains = getAllDomains();
  const currentVersion = getCurrentVersion();
  const sheets = getAllSheets();
  const totalSheets = sheets.length;

  const getDomainIcon = (id: string, className: string = "w-6 h-6") => {
    switch(id) {
      case 'alimentation': return <Power className={className} />;
      case 'protections': return <Shield className={className} />;
      case 'terre': return <Globe className={className} />;
      case 'circuits': return <Cable className={className} />;
      case 'locaux-speciaux': return <Waves className={className} />;
      case 'energie': return <Battery className={className} />;
      case 'reseau': return <Network className={className} />;
      default: return <Folder className={className} />;
    }
  };

  const popularSheets = sheets.slice(0, 6);

  return (
    <div className="container py-8 space-y-12 max-w-7xl">
      <AnimatedSection>
        <section className="text-center space-y-6 py-16 relative rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl">
          <div className="absolute inset-0 -z-10">
            <img src="/images/hero_bg.png" alt="Hero Background" className="w-full h-full object-cover opacity-40 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background"></div>
          </div>
          <div className="relative z-10 p-8">
            <div className="inline-block">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white glow-text pb-2">
                ElecNorme
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed text-balance mt-4">
              La référence visuelle de la norme <strong className="text-white font-medium">NFC 15-100</strong>
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap pt-6">
              <Badge variant="outline" className="text-sm px-4 py-1.5 border-primary/50 bg-primary/10 text-primary backdrop-blur-md flex items-center gap-2">
                <Zap className="w-4 h-4" /> {totalSheets} fiches
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-1.5 border-primary/50 bg-primary/10 text-primary backdrop-blur-md flex items-center gap-2">
                <Folder className="w-4 h-4" /> {domains.length} domaines
              </Badge>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <section className="max-w-2xl mx-auto relative z-20 -mt-8">
          <div className="flex gap-2 p-2 glass rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-primary/30 focus-within:border-primary focus-within:ring-4 ring-primary/20 transition-all glow-border">
            <Input
              type="search"
              placeholder="Rechercher une fiche technique, un schéma..."
              className="flex-1 border-0 focus-visible:ring-0 text-lg bg-transparent placeholder:text-muted-foreground/70 h-12 px-4"
            />
            <Link href="/recherche" tabIndex={-1}>
              <Button size="lg" className="px-8 shadow-lg h-12 text-md font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
                Rechercher
              </Button>
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="p-2 bg-primary/10 text-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]"><Flame className="w-6 h-6" /></span> Fiches populaires
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
            <span className="p-2 bg-primary/10 text-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]"><Folder className="w-6 h-6" /></span> Explorer par domaine
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {domains.map((domain, index) => (
              <AnimatedSection key={domain.id} delay={300 + index * 30}>
                <Link href={`/domaines/${domain.id}`}>
                  <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md text-center">
                    <CardHeader className="pb-3">
                      <div className="mb-4 flex justify-center text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        {getDomainIcon(domain.id, "w-12 h-12")}
                      </div>
                      <CardTitle className="text-sm group-hover:text-primary transition-colors">
                        {domain.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="text-xs">
                        {domain.sheetCount} fiche{domain.sheetCount > 1 ? 's' : ''}
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
            <span className="p-2 bg-primary/10 text-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]"><Wrench className="w-6 h-6" /></span> Outils
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/calculateurs">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary/20 transition-colors"><Calculator className="w-6 h-6" /></span>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      Calculateurs
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    Sections, puissance, chute de tension
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/recherche">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary/20 transition-colors"><Search className="w-6 h-6" /></span>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      Recherche avancée
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    Trouvez exactement ce que vous cherchez
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/favoris">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary/20 transition-colors"><Star className="w-6 h-6" /></span>
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
