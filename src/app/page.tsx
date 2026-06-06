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
import { AnimatedSection } from '@/components/sheet/animated-section';

export default function HomePage() {
  const domains = getAllDomains();
  const currentVersion = getCurrentVersion();
  const sheets = getAllSheets();
  const totalSheets = sheets.length;

  const domainIcons: Record<string, string> = {
    alimentation: '⚡',
    protections: '🛡️',
    terre: '⚓',
    circuits: '🔌',
    'locaux-speciaux': '💧',
    energie: '🔋',
    reseau: '📡',
  };

  const popularSheets = sheets.slice(0, 6);

  return (
    <div className="container py-8 space-y-12 max-w-7xl">
      <AnimatedSection>
        <section className="text-center space-y-6 py-8 relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50 blur-3xl"></div>
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent pb-2">
              ElecNorme
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed text-balance">
            La référence visuelle de la norme <strong className="text-foreground">NFC 15-100</strong>
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
            <Badge variant="outline" className="text-sm px-3 py-1 border-primary/30 bg-primary/5">
               {totalSheets} fiches
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 border-primary/30 bg-primary/5">
              🎯 {domains.length} domaines
            </Badge>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <section className="max-w-2xl mx-auto relative z-10">
          <div className="flex gap-2 p-2 bg-card rounded-xl shadow-lg border border-border/50 focus-within:ring-2 ring-primary transition-all">
            <Input
              type="search"
              placeholder="Rechercher une fiche..."
              className="flex-1 border-0 focus-visible:ring-0 text-base bg-transparent"
            />
            <Link href="/recherche" tabIndex={-1}>
              <Button size="default" className="px-6 shadow-md">🔍</Button>
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="p-2 bg-primary/10 rounded-lg text-xl">🔥</span> Fiches populaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularSheets.map((sheet, index) => (
              <AnimatedSection key={sheet.id} delay={200 + index * 30}>
                <Link href={`/fiches/${sheet.id}`}>
                  <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                    <CardHeader className="pb-3">
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
            <span className="p-2 bg-primary/10 rounded-lg text-xl">📂</span> Explorer par domaine
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {domains.map((domain, index) => (
              <AnimatedSection key={domain.id} delay={300 + index * 30}>
                <Link href={`/domaines/${domain.id}`}>
                  <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md text-center">
                    <CardHeader className="pb-3">
                      <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                        {domainIcons[domain.id] || '📁'}
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
            <span className="p-2 bg-primary/10 rounded-lg text-xl">🛠️</span> Outils
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/calculateurs">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🧮</span>
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
                    <span className="text-2xl">🔍</span>
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
                    <span className="text-2xl">⭐</span>
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
