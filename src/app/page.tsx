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
  };

  return (
    <div className="container py-12 space-y-16 max-w-6xl">
      <AnimatedSection>
        <section className="text-center space-y-8 py-12 relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50 blur-3xl"></div>
          <div className="inline-block">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent pb-2">
              ElecNorme
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed text-balance">
            La référence visuelle et interactive de la norme <strong className="text-foreground">NFC 15-100</strong> pour les professionnels.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap pt-4">
            {currentVersion && (
              <Badge variant="outline" className="text-sm px-4 py-1.5 border-primary/30 bg-primary/5">
                📋 {currentVersion.name}
              </Badge>
            )}
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              📚 {totalSheets} fiches expertes
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              🎯 {domains.length} domaines
            </Badge>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <section className="max-w-3xl mx-auto relative z-10">
          <div className="flex gap-2 p-2 bg-card rounded-xl shadow-lg border border-border/50 focus-within:ring-2 ring-primary transition-all">
            <Input
              type="search"
              placeholder="Ex: Section plaque cuisson, hauteur prise, volume salle d'eau..."
              className="flex-1 border-0 focus-visible:ring-0 text-lg bg-transparent"
            />
            <Link href="/recherche" tabIndex={-1}>
              <Button size="lg" className="px-8 text-base shadow-md hover:scale-105 transition-transform">Rechercher</Button>
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="p-2 bg-primary/10 rounded-lg text-2xl">🎯</span> Domaines de la norme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain, index) => (
              <AnimatedSection key={domain.id} delay={200 + index * 50}>
                <Link href={`/domaines/${domain.id}`}>
                  <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-card rounded-xl shadow-sm border group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
                          <span className="text-4xl">
                            {domainIcons[domain.id] || '📁'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="group-hover:text-primary transition-colors text-xl">
                            {domain.name}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription className="pt-4 text-base leading-relaxed">{domain.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between pt-2">
                        <Badge variant="secondary" className="group-hover:bg-primary/20 transition-colors">
                          {domain.sheetCount} fiche
                          {domain.sheetCount > 1 ? 's' : ''}
                        </Badge>
                        <span className="text-primary font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                          Explorer →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={400}>
        <section className="pt-8">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="p-2 bg-primary/10 rounded-lg text-2xl">🛠️</span> Outils experts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/calculateurs">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-card rounded-xl shadow-sm border group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                      <span className="text-3xl">🧮</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Calculateurs
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Chute de tension, sections, puissance...
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/admin">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-card rounded-xl shadow-sm border group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                      <span className="text-3xl">⚙️</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Administration
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Gérez vos fiches et domaines
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/favoris">
              <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-card rounded-xl shadow-sm border group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                      <span className="text-3xl">⭐</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Favoris
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base">Vos fiches sauvegardées</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={500}>
        <section className="bg-gradient-to-br from-card to-accent border rounded-2xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
              <span className="text-2xl">💡</span> Astuce du pro
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
              Toutes les fiches sont maintenant <strong className="text-foreground">visuelles et animées</strong>. Cherchez par exemple 
              <Link href="/recherche" className="text-primary hover:underline mx-1">"sections"</Link> ou 
              <Link href="/recherche" className="text-primary hover:underline mx-1">"puissance"</Link> 
              pour voir les nouveaux schémas interactifs et tableaux de référence rapide !
            </p>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
