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
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/60 shadow-lg relative overflow-hidden">
      {/* Animated tech background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-cyan-500/5 animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-[pulse_3s_ease-in-out_infinite]"></div>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>
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
          <div className="relative flex items-center space-x-2">
            <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
            <Zap className="relative w-5 h-5 text-primary animate-[pulse_1.5s_ease-in-out_infinite]" />
            <span className="relative text-xl font-bold tracking-tight bg-gradient-to-r from-white via-primary to-cyan-400 bg-clip-text text-transparent group-hover:animate-[pulse_2s_ease-in-out_infinite]">
              ElecNorme
            </span>
          </div>
        </Link>

        <nav className="ml-auto hidden xl:flex items-center space-x-1">
          <div className="flex items-center space-x-1 mr-3 px-2.5 py-1.5 rounded-lg bg-primary/10 border border-primary/30 animate-[pulse_3s_ease-in-out_infinite]">
            <Command className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-mono font-semibold">
              K
            </span>
          </div>
          <Link href="/recherche">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-slate-300 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              Recherche
            </Button>
          </Link>
          <Link href="/domaines">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-slate-300 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              Domaines
            </Button>
          </Link>
          <Link href="/calculateurs">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-slate-300 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              Calculateurs
            </Button>
          </Link>
          <Link href="/favoris">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-slate-300 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              Favoris
            </Button>
          </Link>
          <Link href="/guides/schema-circuits">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-slate-300 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              <Network className="w-4 h-4 mr-1" />
              Schémas
            </Button>
          </Link>
          <Link href="/guides/tableaux-types">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-slate-300 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              <Home className="w-4 h-4 mr-1" />
              Tableaux
            </Button>
          </Link>
          <Link href="/guides/conformite">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-slate-300 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              <Shield className="w-4 h-4 mr-1" />
              Conformité
            </Button>
          </Link>
          <Link href="/assistant-projet">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-slate-300 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Assistant
            </Button>
          </Link>
          <Link href="/roadmap">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-slate-300 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Roadmap
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              size="sm"
              className="text-sm border-primary/30 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-300 hover:scale-105"
            >
              <Lock className="w-3.5 h-3.5 mr-1.5" /> Admin
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
