'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Lock, Menu, Zap, Command } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20 shadow-sm relative overflow-hidden">
      {/* Animated tech background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-cyan-500/5 animate-[pulse_3s_ease-in-out_infinite]"></div>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </div>
      <div className="container flex h-16 items-center relative z-10">
        <div className="flex items-center xl:hidden mr-2">
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
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative flex items-center space-x-2 bg-background/80 px-3 py-1.5 rounded-lg border border-primary/30">
              <Zap className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                ElecNorme
              </span>
            </div>
          </div>
        </Link>

        <nav className="ml-auto hidden xl:flex items-center space-x-2">
          <div className="flex items-center space-x-1 mr-2 px-2 py-1 rounded-lg bg-muted/30 border border-white/5">
            <Command className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">K</span>
          </div>
          <Link href="/recherche">
            <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors">Recherche</Button>
          </Link>
          <Link href="/domaines">
            <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors">Domaines</Button>
          </Link>
          <Link href="/calculateurs">
            <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors">Calculateurs</Button>
          </Link>
          <Link href="/favoris">
            <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors">Favoris</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 hover:border-primary transition-colors">
              <Lock className="w-4 h-4 mr-1" /> Admin
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
