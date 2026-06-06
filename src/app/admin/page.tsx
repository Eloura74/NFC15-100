'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Lock,
  BookOpen,
  Settings,
  Zap,
  Plus,
  Eye,
  Target,
  FileText,
  Calculator,
  Shield,
  Sliders,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Lock className="w-8 h-8 text-primary" /> Administration
          </h1>
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
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Gestion du contenu
            </CardTitle>
            <CardDescription>
              Gérez les domaines, fiches et calculateurs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/admin/domaines"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md"
            >
              <Target className="w-4 h-4 mr-2" /> Gérer les domaines
            </Link>
            <Link
              href="/admin/fiches"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md"
            >
              <FileText className="w-4 h-4 mr-2" /> Gérer les fiches techniques
            </Link>
            <Link
              href="/admin/calculateurs"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md"
            >
              <Calculator className="w-4 h-4 mr-2" /> Gérer les calculateurs
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" /> Configuration
            </CardTitle>
            <CardDescription>
              Paramètres et versions de la norme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/admin/versions"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md"
            >
              <Shield className="w-4 h-4 mr-2" /> Gérer les versions
            </Link>
            <Link
              href="/admin/parametres"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md"
            >
              <Sliders className="w-4 h-4 mr-2" /> Paramètres du site
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" /> Actions rapides
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Nouvelle fiche
          </Button>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Nouveau domaine
          </Button>
          <Link href="/">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" /> Voir le site
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
