'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">ElecNorme</span>
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
            <Button variant="outline" size="sm">🔐 Admin</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
