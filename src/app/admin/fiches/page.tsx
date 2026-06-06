'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllSheets } from '@/lib/content/get-sheets';

export default function AdminFichesPage() {
  const sheets = getAllSheets();
  const [search, setSearch] = useState('');

  const filteredSheets = sheets.filter(
    (sheet) =>
      sheet.title.toLowerCase().includes(search.toLowerCase()) ||
      sheet.domain.toLowerCase().includes(search.toLowerCase()) ||
      sheet.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()))
  );

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case 'critique':
      case 'danger_immediat':
        return 'destructive';
      case 'attention':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">📄 Gestion des fiches</h1>
          <p className="text-muted-foreground">
            {sheets.length} fiches techniques disponibles
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin">
            <Button variant="outline">← Retour</Button>
          </Link>
          <Link href="/admin/fiches/nouveau">
            <Button>➕ Nouvelle fiche</Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <Input
          placeholder="🔍 Rechercher une fiche..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSheets.map((sheet) => (
          <Card key={sheet.id} className="hover:bg-accent transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>{sheet.title}</CardTitle>
                    <Badge variant={getCriticalityColor(sheet.criticality)}>
                      {sheet.criticality}
                    </Badge>
                  </div>
                  <CardDescription>{sheet.summary}</CardDescription>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline">{sheet.domain}</Badge>
                    {sheet.subDomain && (
                      <Badge variant="outline">{sheet.subDomain}</Badge>
                    )}
                    <Badge variant="secondary">
                      {sheet.keywords.length} mots-clés
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/fiches/${sheet.id}`}>
                    <Button variant="outline" size="sm">
                      👁️ Voir
                    </Button>
                  </Link>
                  <Link href={`/admin/fiches/${sheet.id}`}>
                    <Button size="sm">✏️ Éditer</Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold mb-1">Réponse immédiate :</p>
                <p className="italic">{sheet.immediateAnswer}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSheets.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Aucune fiche trouvée pour "{search}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
