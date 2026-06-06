'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, FileText, Home, Search, Star } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getAllSheets } from '@/lib/content/get-sheets';
import { getAllDomains } from '@/lib/content/get-domains';

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const sheets = getAllSheets();
  const domains = getAllDomains();

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Rechercher une fiche, un domaine..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Accueil</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/recherche'))}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Recherche</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/calculateurs'))}
          >
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculateurs</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/favoris'))}
          >
            <Star className="mr-2 h-4 w-4" />
            <span>Favoris</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Domaines">
          {domains.slice(0, 5).map((domain) => (
            <CommandItem
              key={domain.id}
              onSelect={() =>
                runCommand(() => router.push(`/domaines/${domain.id}`))
              }
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{domain.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Fiches récentes">
          {sheets.slice(0, 5).map((sheet) => (
            <CommandItem
              key={sheet.id}
              onSelect={() =>
                runCommand(() => router.push(`/fiches/${sheet.id}`))
              }
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{sheet.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
