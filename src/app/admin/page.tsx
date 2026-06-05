'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signOut } from 'next-auth/react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="container py-8">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const stats = [
    { label: 'Domaines', value: 6, link: '/admin/domaines' },
    { label: 'Fiches techniques', value: 12, link: '/admin/fiches' },
    { label: 'Calculateurs', value: 3, link: '/admin/calculateurs' },
    { label: 'Versions', value: 2, link: '/admin/versions' },
  ];

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">🔐 Administration</h1>
          <p className="text-muted-foreground">
            Bienvenue {session.user?.email}
          </p>
        </div>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
          Se déconnecter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.link}>
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-3xl">{stat.value}</CardTitle>
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>📚 Gestion du contenu</CardTitle>
            <CardDescription>
              Gérez les domaines, fiches et calculateurs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/domaines">
              <Button variant="outline" className="w-full justify-start">
                🎯 Gérer les domaines
              </Button>
            </Link>
            <Link href="/admin/fiches">
              <Button variant="outline" className="w-full justify-start">
                📄 Gérer les fiches techniques
              </Button>
            </Link>
            <Link href="/admin/calculateurs">
              <Button variant="outline" className="w-full justify-start">
                🧮 Gérer les calculateurs
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⚙️ Configuration</CardTitle>
            <CardDescription>
              Paramètres et versions de la norme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/versions">
              <Button variant="outline" className="w-full justify-start">
                📋 Gérer les versions
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full justify-start">
                ⚙️ Paramètres du site
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>💡 Actions rapides</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 flex-wrap">
          <Link href="/admin/fiches/nouveau">
            <Button>➕ Nouvelle fiche</Button>
          </Link>
          <Link href="/admin/domaines/nouveau">
            <Button variant="outline">➕ Nouveau domaine</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">👁️ Voir le site</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
