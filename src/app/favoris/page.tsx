import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FavorisPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Favoris</h1>
        <p className="text-muted-foreground">
          Vos fiches sauvegardées (fonctionnalité à venir)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aucun favori pour le moment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Parcourez les fiches et ajoutez-les à vos favoris pour un accès
            rapide.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Les favoris seront sauvegardés localement sur votre appareil et
            disponibles hors ligne.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
