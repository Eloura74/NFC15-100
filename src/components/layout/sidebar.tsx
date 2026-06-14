'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getAllDomains } from '@/lib/content/get-domains';
import { useState } from 'react';
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
  ChevronDown,
  ChevronRight,
  CheckSquare,
  Crosshair,
} from 'lucide-react';

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const domains = getAllDomains();
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(
    new Set()
  );

  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'alimentation':
        return <Power className="w-5 h-5" />;
      case 'protections':
        return <Shield className="w-5 h-5" />;
      case 'terre':
        return <Globe className="w-5 h-5" />;
      case 'circuits':
        return <Cable className="w-5 h-5" />;
      case 'locaux-speciaux':
        return <Waves className="w-5 h-5" />;
      case 'energie':
        return <Battery className="w-5 h-5" />;
      case 'reseau':
        return <Network className="w-5 h-5" />;
      default:
        return <Folder className="w-5 h-5" />;
    }
  };

  const toggleDomain = (domainId: string) => {
    const newExpanded = new Set(expandedDomains);
    if (newExpanded.has(domainId)) {
      newExpanded.delete(domainId);
    } else {
      newExpanded.add(domainId);
    }
    setExpandedDomains(newExpanded);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        className ? '' : 'hidden xl:block',
        'w-64 border-r bg-background',
        className ? 'h-auto' : 'sticky top-16 h-[calc(100vh-4rem)]',
        'overflow-y-auto',
        className
      )}
    >
      <div className="p-4 space-y-2">
        <div className="mb-4">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative',
              isActive('/')
                ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
                : 'hover:bg-primary/5 hover:text-primary text-muted-foreground'
            )}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Accueil</span>
          </Link>
        </div>

        <div className="space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Domaines
          </div>
          {domains.map((domain) => (
            <div key={domain.id}>
              <button
                onClick={() => toggleDomain(domain.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 text-left relative',
                  isActive(`/domaines/${domain.id}`)
                    ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
                    : 'hover:bg-primary/5 hover:text-primary text-muted-foreground'
                )}
              >
                <div className="flex items-center gap-3 max-w-[70%]">
                  <span
                    className={cn(
                      'shrink-0',
                      isActive(`/domaines/${domain.id}`) ? 'text-primary' : ''
                    )}
                  >
                    {getDomainIcon(domain.id)}
                  </span>
                  <span className="text-sm font-medium leading-tight">
                    {domain.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0.5 bg-background/50"
                  >
                    {domain.sheetCount}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {expandedDomains.has(domain.id) ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </span>
                </div>
              </button>

              {expandedDomains.has(domain.id) &&
                domain.subDomains &&
                domain.subDomains.length > 0 && (
                  <div className="ml-4 mt-1 space-y-1">
                    {domain.subDomains.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/domaines/${domain.id}/${sub.id}`}
                        className={cn(
                          'flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm',
                          isActive(`/domaines/${domain.id}/${sub.id}`)
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'hover:bg-accent text-muted-foreground'
                        )}
                      >
                        <span className="text-xs leading-tight pr-2">
                          {sub.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1 py-0 h-4 border-border shrink-0"
                        >
                          {sub.sheetCount}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border mt-4 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Outils
          </div>
          <Link
            href="/checklists"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative',
              isActive('/checklists')
                ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
                : 'hover:bg-primary/5 hover:text-primary text-muted-foreground'
            )}
          >
            <CheckSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Checklists</span>
          </Link>
          <Link
            href="/recherche"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative',
              isActive('/recherche')
                ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
                : 'hover:bg-primary/5 hover:text-primary text-muted-foreground'
            )}
          >
            <Search className="w-4 h-4" />
            <span className="text-sm font-medium">Recherche</span>
          </Link>
          <Link
            href="/calculateurs"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative',
              isActive('/calculateurs')
                ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
                : 'hover:bg-primary/5 hover:text-primary text-muted-foreground'
            )}
          >
            <Calculator className="w-4 h-4" />
            <span className="text-sm font-medium">Calculateurs</span>
          </Link>
          <Link
            href="/outils/volumes-image"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative',
              isActive('/outils/volumes-image')
                ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
                : 'hover:bg-primary/5 hover:text-primary text-muted-foreground'
            )}
          >
            <Crosshair className="w-4 h-4" />
            <span className="text-sm font-medium">Analyseur Volumes</span>
          </Link>
          <Link
            href="/favoris"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative',
              isActive('/favoris')
                ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
                : 'hover:bg-primary/5 hover:text-primary text-muted-foreground'
            )}
          >
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Favoris</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
