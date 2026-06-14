'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeManager, type ThemeMode } from '@/lib/theme/theme-manager';
import { Lock, Menu, Zap, Command, Sun, Moon, HardHat } from 'lucide-react';
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
  const [currentMode, setCurrentMode] = useState<ThemeMode>('dark');
  const pathname = usePathname();

  // Sync with current theme on mount
  useEffect(() => {
    setCurrentMode(ThemeManager.getCurrentMode());
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleSosMode = () => {
    ThemeManager.toggleSosMode();
    // Force re-render with updated mode
    setTimeout(() => {
      setCurrentMode(ThemeManager.getCurrentMode());
    }, 0);
  };

  const toggleChantierMode = () => {
    ThemeManager.toggleChantierMode();
    // Force re-render with updated mode
    setTimeout(() => {
      setCurrentMode(ThemeManager.getCurrentMode());
    }, 0);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center relative z-10">
        {/* Menu burger — mobile */}
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
              className="p-0 w-full sm:w-80 h-full bg-background/95 border-r border-border"
            >
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Accédez aux domaines, calculatrices et recherches.
              </SheetDescription>
              <div className="h-full overflow-y-auto">
                <Sidebar className="block w-full border-none h-auto" />
                <div className="border-t border-border p-4 space-y-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="w-4 h-4 mr-2" /> Administration
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              ElecNorme
            </span>
          </div>
        </Link>

        {/* Bouton Mode Chantier — Prioritaire pour électriciens */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleChantierMode}
          className={`ml-2 shrink-0 ${
            currentMode === 'chantier'
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'text-orange-500 hover:text-orange-600 hover:bg-orange-500/10'
          }`}
          title={
            currentMode === 'chantier'
              ? 'Désactiver le Mode Chantier'
              : "Activer le Mode Chantier (gros texte, pas d'animations)"
          }
        >
          <HardHat className="w-5 h-5" />
        </Button>

        {/* Bouton Plein Soleil */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSosMode}
          className={`ml-1 shrink-0 ${
            currentMode === 'sos'
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'text-amber-500 hover:text-amber-600 hover:bg-amber-500/10'
          }`}
          style={
            currentMode === 'sos'
              ? { animation: 'sunPulse 2s ease-in-out infinite' }
              : undefined
          }
          title={
            currentMode === 'sos'
              ? 'Désactiver le Mode Plein Soleil'
              : 'Activer le Mode Plein Soleil'
          }
        >
          {currentMode === 'sos' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>

        {/* Nav desktop */}
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
