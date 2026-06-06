'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Lock, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Sidebar } from '@/components/layout/sidebar';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20 shadow-sm">
      <div className="container flex h-16 items-center">
        <div className="flex items-center max-xl:mr-2 xl:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Menu principal</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 w-80 bg-background/95 border-r border-white/10"
            >
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Accédez aux domaines, calculatrices et recherches.
              </SheetDescription>
              <div className="h-full overflow-y-auto">
                <Sidebar className="block w-full border-none h-auto sticky top-0" />
                <div className="border-t border-white/10 p-4 space-y-2">
                  <Link href="/recherche" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Recherche
                    </Button>
                  </Link>
                  <Link href="/domaines" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Domaines
                    </Button>
                  </Link>
                  <Link href="/calculateurs" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Calculateurs
                    </Button>
                  </Link>
                  <Link href="/favoris" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Favoris
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="w-4 h-4 mr-2" /> Admin
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-black tracking-tight text-white group-hover:glow-text transition-all duration-300">
            ElecNorme
          </span>
        </Link>

        <nav className="ml-auto hidden xl:flex items-center space-x-4">
          <Link href="/recherche">
            <Button variant="ghost">Recherche</Button>
          </Link>
          <Link href="/domaines">
            <Button variant="ghost">Domaines</Button>
          </Link>
          <Link href="/calculateurs">
            <Button variant="ghost">Calculateurs</Button>
          </Link>
          <Link href="/favoris">
            <Button variant="ghost">Favoris</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">
              <Lock className="w-4 h-4 mr-1" /> Admin
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
