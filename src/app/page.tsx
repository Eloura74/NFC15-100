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
    <div className="container py-8 space-y-12">
      <section className="text-center space-y-6 py-8">
        <div className="inline-block">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-pulse">
            ElecNorme
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Votre référence métier pour l&apos;électricité en France
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {currentVersion && (
            <Badge variant="outline" className="text-sm">
              📋 {currentVersion.name}
            </Badge>
          )}
          <Badge variant="secondary" className="text-sm">
            📚 {totalSheets} fiches disponibles
          </Badge>
          <Badge variant="secondary" className="text-sm">
            🎯 {domains.length} domaines
          </Badge>
        </div>
      </section>

      <section className="max-w-2xl mx-auto">
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Rechercher une norme, règle ou équipement..."
            className="flex-1"
          />
          <Link href="/recherche">
            <Button>Rechercher</Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span>🎯</span> Domaines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.map((domain) => (
            <Link key={domain.id} href={`/domaines/${domain.id}`}>
              <Card className="hover:bg-accent hover:scale-105 transition-all duration-200 cursor-pointer h-full group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl group-hover:scale-110 transition-transform">
                      {domainIcons[domain.id] || '📁'}
                    </span>
                    <div className="flex-1">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {domain.name}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription>{domain.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">
                      {domain.sheetCount} fiche
                      {domain.sheetCount > 1 ? 's' : ''}
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
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span>🛠️</span> Outils
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/calculateurs">
            <Card className="hover:bg-accent hover:scale-105 transition-all duration-200 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    🧮
                  </span>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    Calculateurs
                  </CardTitle>
                </div>
                <CardDescription>
                  Outils de calcul pour le chantier
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/checklists">
            <Card className="hover:bg-accent hover:scale-105 transition-all duration-200 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    ✅
                  </span>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    Checklists
                  </CardTitle>
                </div>
                <CardDescription>
                  Listes de contrôle personnalisables
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/favoris">
            <Card className="hover:bg-accent hover:scale-105 transition-all duration-200 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    ⭐
                  </span>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    Favoris
                  </CardTitle>
                </div>
                <CardDescription>Vos fiches sauvegardées</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>

      <section className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>💡</span> Astuce du jour
        </h3>
        <p className="text-muted-foreground">
          Utilisez la recherche rapide (en haut) pour trouver instantanément une
          norme ou une règle. Tapez simplement quelques mots-clés comme
          &quot;différentiel&quot; ou &quot;cuisine&quot;.
        </p>
      </section>
    </div>
  );
}
