'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Lock,
  Menu,
  Zap,
  Command,
  Sparkles,
  Network,
  Home,
  Shield,
  BookOpen,
} from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              className="p-0 w-full sm:w-80 h-full bg-background/95 border-r border-white/10"
            >
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Accédez aux domaines, calculatrices et recherches.
              </SheetDescription>
              <div className="h-full overflow-y-auto">
                <Sidebar className="block w-full border-none h-auto" />
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
          <div className="relative flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              ElecNorme
            </span>
          </div>
        </Link>

        <nav className="ml-auto hidden xl:flex items-center space-x-2">
          <div className="flex items-center space-x-1 mr-2 px-2.5 py-1.5 rounded-md bg-muted border text-muted-foreground">
            <Command className="w-3.5 h-3.5" />
            <span className="text-xs font-mono font-semibold">K</span>
          </div>
          <Link href="/recherche">
            <Button variant="ghost" size="sm">
              Recherche
            </Button>
          </Link>
          <Link href="/domaines">
            <Button variant="ghost" size="sm">
              Domaines
            </Button>
          </Link>
          <Link href="/calculateurs">
            <Button variant="ghost" size="sm">
              Calculateurs
            </Button>
          </Link>
          <Link href="/favoris">
            <Button variant="ghost" size="sm">
              Favoris
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">
              <Lock className="w-3.5 h-3.5 mr-1.5" /> Admin
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
