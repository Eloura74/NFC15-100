'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20 shadow-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-black tracking-tight text-white group-hover:glow-text transition-all duration-300">ElecNorme</span>
        </Link>

        <nav className="ml-auto flex items-center space-x-4">
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
            <Button variant="outline" size="sm"><Lock className="w-4 h-4 mr-1" /> Admin</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
