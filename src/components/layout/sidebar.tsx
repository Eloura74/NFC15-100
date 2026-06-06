'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getAllDomains } from '@/lib/content/get-domains';
import { useState } from 'react';

const domainIcons: Record<string, string> = {
  alimentation: '⚡',
  protections: '🛡️',
  terre: '⚓',
  circuits: '🔌',
  'locaux-speciaux': '💧',
  energie: '🔋',
  reseau: '📡',
};

export function Sidebar() {
  const pathname = usePathname();
  const domains = getAllDomains();
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set());

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
    <aside className="w-64 border-r bg-card/50 backdrop-blur sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4 space-y-2">
        <div className="mb-4">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              isActive('/') ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-accent'
            )}
          >
            <span className="text-xl">🏠</span>
            <span>Accueil</span>
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
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left',
                  isActive(`/domaines/${domain.id}`) ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-accent'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{domainIcons[domain.id] || '📁'}</span>
                  <span className="truncate">{domain.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    {domain.sheetCount}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {expandedDomains.has(domain.id) ? '▼' : '▶'}
                  </span>
                </div>
              </button>

              {expandedDomains.has(domain.id) && domain.subDomains && domain.subDomains.length > 0 && (
                <div className="ml-4 mt-1 space-y-1">
                  {domain.subDomains.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/domaines/${domain.id}/${sub.id}`}
                      className={cn(
                        'flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors text-sm',
                        isActive(`/domaines/${domain.id}/${sub.id}`) ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-accent text-muted-foreground'
                      )}
                    >
                      <span className="truncate">{sub.name}</span>
                      <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                        {sub.sheetCount}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t mt-4 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Outils
          </div>
          <Link
            href="/recherche"
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              isActive('/recherche') ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-accent'
            )}
          >
            <span className="text-xl">🔍</span>
            <span>Recherche</span>
          </Link>
          <Link
            href="/calculateurs"
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              isActive('/calculateurs') ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-accent'
            )}
          >
            <span className="text-xl">🧮</span>
            <span>Calculateurs</span>
          </Link>
          <Link
            href="/favoris"
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
              isActive('/favoris') ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-accent'
            )}
          >
            <span className="text-xl">⭐</span>
            <span>Favoris</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
