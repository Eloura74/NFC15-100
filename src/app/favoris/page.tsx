'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FavoritesManager } from '@/lib/favorites/favorites-manager';
import { getSheetById } from '@/lib/content/get-sheets';
import { FavoriteButton } from '@/components/ui/favorite-button';
import { Star, Download, Upload, Trash2, Clock } from 'lucide-react';
import { AnimatedSection } from '@/components/sheet/animated-section';

export default function FavorisPage() {
  const [favorites, setFavorites] = useState<
    Array<{ id: string; addedAt: number; notes?: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      const favs = await FavoritesManager.getAllFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExport() {
    try {
      const json = await FavoritesManager.exportFavorites();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `elecnorme-favoris-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting favorites:', error);
    }
  }

  async function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const text = await file.text();
          const count = await FavoritesManager.importFavorites(text);
          alert(`${count} favoris importés avec succès`);
          loadFavorites();
        } catch (error) {
          alert("Erreur lors de l'importation");
        }
      }
    };
    input.click();
  }

  async function handleClearAll() {
    if (confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ?')) {
      for (const fav of favorites) {
        await FavoritesManager.removeFavorite(fav.id);
      }
      loadFavorites();
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Chargement de vos favoris...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-5xl">
      <AnimatedSection>
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                <Star className="w-8 h-8 fill-yellow-500" />
              </span>
              Favoris
            </h1>
            <p className="text-muted-foreground">
              {favorites.length} fiche{favorites.length > 1 ? 's' : ''}{' '}
              sauvegardée{favorites.length > 1 ? 's' : ''} localement
            </p>
          </div>

          {favorites.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button variant="outline" size="sm" onClick={handleImport}>
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                <Trash2 className="w-4 h-4 mr-2" />
                Tout supprimer
              </Button>
            </div>
          )}
        </div>
      </AnimatedSection>

      {favorites.length === 0 ? (
        <AnimatedSection delay={100}>
          <Card>
            <CardHeader>
              <CardTitle>Aucun favori pour le moment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Parcourez les fiches et cliquez sur l&apos;étoile ⭐ pour les
                ajouter à vos favoris.
              </p>
              <p className="text-sm text-muted-foreground">
                Les favoris sont sauvegardés localement sur votre appareil et
                disponibles hors ligne.
              </p>
              <div className="mt-6">
                <Link href="/domaines">
                  <Button>Explorer les domaines</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      ) : (
        <div className="space-y-4">
          {favorites.map((fav, index) => {
            const sheet = getSheetById(fav.id);
            if (!sheet) return null;

            return (
              <AnimatedSection key={fav.id} delay={100 + index * 30}>
                <Link href={`/fiches/${sheet.id}`}>
                  <Card className="hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {sheet.title}
                            </CardTitle>
                          </div>
                          <CardDescription className="mt-2">
                            {sheet.summary}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <FavoriteButton sheetId={sheet.id} />
                          <Badge
                            variant={
                              sheet.criticality === 'critique' ||
                              sheet.criticality === 'danger_immediat'
                                ? 'destructive'
                                : sheet.criticality === 'attention'
                                  ? 'warning'
                                  : 'secondary'
                            }
                          >
                            {sheet.criticality}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="outline">{sheet.domain}</Badge>
                          {sheet.subDomain && (
                            <Badge variant="outline">{sheet.subDomain}</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          Ajouté le{' '}
                          {new Date(fav.addedAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      )}
    </div>
  );
}
