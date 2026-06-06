'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchEngine } from '@/lib/search/search-engine';
import { getAllSheets } from '@/lib/content/get-sheets';
import { getAllDomains } from '@/lib/content/get-domains';

export default function RecherchePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedCriticality, setSelectedCriticality] = useState<string>('all');

  const domains = getAllDomains();

  const handleSearch = () => {
    if (!query.trim()) return;

    let sheets = getAllSheets();

    // Apply domain filter
    if (selectedDomain !== 'all') {
      sheets = sheets.filter((sheet) => sheet.domain === selectedDomain);
    }

    // Apply criticality filter
    if (selectedCriticality !== 'all') {
      sheets = sheets.filter(
        (sheet) => sheet.criticality === selectedCriticality
      );
    }

    const searchEngine = new SearchEngine(sheets);
    const searchResults = searchEngine.search({ query, limit: 20 });

    setResults(searchResults);
    setHasSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Recherche</h1>
          <p className="text-muted-foreground">
            Recherchez des normes, règles, équipements ou situations
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="Différentiel 30mA, tableau électrique, prise de terre..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              autoFocus
            />
            <Button onClick={handleSearch}>Rechercher</Button>
          </div>

          <div className="flex gap-2">
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tous les domaines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les domaines</SelectItem>
                {domains.map((domain) => (
                  <SelectItem key={domain.id} value={domain.id}>
                    {domain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedCriticality}
              onValueChange={setSelectedCriticality}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Toutes criticités" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes criticités</SelectItem>
                <SelectItem value="danger_immediat">Danger immédiat</SelectItem>
                <SelectItem value="critique">Critique</SelectItem>
                <SelectItem value="attention">Attention</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasSearched && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              {results.length} résultat{results.length > 1 ? 's' : ''} trouvé
              {results.length > 1 ? 's' : ''}
            </p>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <Link
                    key={result.sheet.id}
                    href={`/fiches/${result.sheet.id}`}
                  >
                    <Card className="hover:bg-accent transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle>{result.sheet.title}</CardTitle>
                            <CardDescription className="mt-2">
                              {result.sheet.summary}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge
                              variant={
                                result.sheet.criticality === 'critique'
                                  ? 'destructive'
                                  : result.sheet.criticality === 'attention'
                                    ? 'warning'
                                    : 'secondary'
                              }
                            >
                              {result.sheet.criticality}
                            </Badge>
                            <Badge variant="outline">
                              Score: {Math.round(result.score * 100)}%
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Badge variant="outline">{result.sheet.domain}</Badge>
                          {result.sheet.subDomain && (
                            <Badge variant="outline">
                              {result.sheet.subDomain}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Aucun résultat trouvé pour &quot;{query}&quot;
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Essayez avec d&apos;autres mots-clés ou parcourez les
                    domaines
                  </p>
                  <div className="flex justify-center mt-4">
                    <Link href="/domaines">
                      <Button variant="outline">Voir les domaines</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {!hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle>Suggestions de recherche</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  'différentiel 30mA',
                  'tableau électrique',
                  'prise de terre',
                  'protection',
                  "salle d'eau",
                  'cuisine',
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery(suggestion);
                      setTimeout(handleSearch, 100);
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
