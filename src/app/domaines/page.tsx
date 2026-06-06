import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllDomains } from '@/lib/content/get-domains';
import { AnimatedSection } from '@/components/sheet/animated-section';
import { 
  Zap, 
  ShieldCheck, 
  ArrowDownToLine, 
  Plug, 
  Droplets, 
  BatteryCharging, 
  Wifi, 
  Folder,
  Target
} from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

export default function DomainesPage() {
  const domains = getAllDomains();

  const getDomainIcon = (id: string, className = "w-8 h-8") => {
    switch(id) {
      case 'alimentation': return <Zap className={className} />;
      case 'protections': return <ShieldCheck className={className} />;
      case 'terre': return <ArrowDownToLine className={className} />;
      case 'circuits': return <Plug className={className} />;
      case 'locaux-speciaux': return <Droplets className={className} />;
      case 'energie': return <BatteryCharging className={className} />;
      case 'reseau': return <Wifi className={className} />;
      default: return <Folder className={className} />;
    }
  };

  return (
    <div className="container py-12 max-w-5xl">
      <AnimatedSection>
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <span className="p-3 bg-primary/10 text-primary rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.3)]"><Target className="w-8 h-8" /></span> Domaines
          </h1>
          <p className="text-xl text-muted-foreground">
            Explorez les différents domaines de la norme NFC 15-100
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domains.map((domain, index) => (
          <AnimatedSection key={domain.id} delay={100 + index * 50}>
            <Link href={`/domaines/${domain.id}`}>
              <Card className="relative overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full group border-white/10 hover:border-primary/50 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] glass-card">
                <div className="absolute inset-0 -z-20 overflow-hidden rounded-2xl">
                  <ImageWithFallback 
                    src={`/images/domains/${domain.id}.png`} 
                    alt={`Illustration du domaine ${domain.name}`}
                    title={domain.name}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500 mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent"></div>
                </div>

                <CardHeader className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-background/50 backdrop-blur-md rounded-xl shadow-sm border border-white/10 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:text-primary transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                      {getDomainIcon(domain.id)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors drop-shadow-md">{domain.name}</CardTitle>
                        <Badge variant="secondary" className="group-hover:bg-primary/20 transition-colors shrink-0 backdrop-blur-md bg-background/50 border-white/10">{domain.sheetCount} fiches</Badge>
                      </div>
                      <CardDescription className="text-base mt-2 text-slate-300">
                        {domain.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {domain.subDomains && domain.subDomains.length > 0 && (
                  <CardContent className="pt-0 relative z-10">
                    <div className="ml-16">
                      <p className="text-sm font-semibold mb-3 text-muted-foreground">Sous-domaines :</p>
                      <div className="flex flex-wrap gap-2">
                        {domain.subDomains.map((sub) => (
                          <Badge key={sub.id} variant="outline" className="bg-background/40 backdrop-blur-sm border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300">
                            {sub.name} <span className="ml-1 text-muted-foreground opacity-70">({sub.sheetCount})</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
