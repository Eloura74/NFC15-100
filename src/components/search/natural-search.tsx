'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Sparkles, ArrowRight, Zap, Home, Shield, Cable, Waves } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
  link: string;
  keywords: string[];
}

const knowledgeBase: SearchResult[] = [
  {
    id: '1',
    question: 'Quelle section de câble pour une prise 16A ?',
    answer: 'Pour un circuit de prises 16A, la section minimale est de 2.5mm² en cuivre. Le calibre du disjoncteur doit être de 16A ou 20A maximum.',
    category: 'Circuits',
    icon: <Cable className="w-5 h-5" />,
    link: '/guides/references',
    keywords: ['prise', '16a', 'section', 'câble', '2.5', 'mm²'],
  },
  {
    id: '2',
    question: 'Quelle section pour un four électrique ?',
    answer: 'Un four nécessite un circuit spécialisé en 2.5mm² avec un disjoncteur 20A. Pour une plaque de cuisson, prévoyez 4mm² avec un disjoncteur 32A.',
    category: 'Circuits',
    icon: <Zap className="w-5 h-5" />,
    link: '/guides/references',
    keywords: ['four', 'plaque', 'cuisson', 'spécialisé', '2.5', '4mm²'],
  },
  {
    id: '3',
    question: 'Quel différentiel pour une salle de bain ?',
    answer: 'En salle de bain, tous les circuits doivent être protégés par un DDR 30mA de type A (ou F pour continuité de service). La liaison équipotentielle supplémentaire (LES) est obligatoire.',
    category: 'Protections',
    icon: <Shield className="w-5 h-5" />,
    link: '/guides/conformite',
    keywords: ['salle de bain', 'sdb', 'différentiel', 'ddr', '30ma', 'type a', 'les'],
  },
  {
    id: '4',
    question: 'Puis-je installer une prise dans le volume 1 de la salle de bain ?',
    answer: 'Non, les prises sont interdites dans les volumes 0 et 1 de la salle de bain. Elles sont autorisées dans le volume 2 à condition d&apos;être alimentées en TBTS (très basse tension de sécurité) ≤ 12V.',
    category: 'Locaux spéciaux',
    icon: <Waves className="w-5 h-5" />,
    link: '/guides/volumes-salle-bain',
    keywords: ['salle de bain', 'volume', 'prise', 'interdit', 'tbts', '12v'],
  },
  {
    id: '5',
    question: 'Combien de prises dans une chambre ?',
    answer: 'Selon la NFC 15-100, une chambre doit avoir au minimum 3 prises 16A (2.5mm²). Elles doivent être réparties sur au moins 2 circuits distincts.',
    category: 'Circuits',
    icon: <Home className="w-5 h-5" />,
    link: '/guides/references',
    keywords: ['chambre', 'prise', 'nombre', 'minimum', '3', '16a'],
  },
  {
    id: '6',
    question: 'Quelle section pour l&apos;éclairage ?',
    answer: 'Les circuits d&apos;éclairage doivent être en 1.5mm² avec un disjoncteur 10A ou 16A maximum. La chute de tension ne doit pas dépasser 3%.',
    category: 'Circuits',
    icon: <Zap className="w-5 h-5" />,
    link: '/guides/references',
    keywords: ['éclairage', 'lumière', '1.5mm²', '10a', 'chute de tension'],
  },
  {
    id: '7',
    question: 'Quel type de différentiel pour le lave-linge ?',
    answer: 'Le lave-linge doit être sur un circuit spécialisé protégé par un DDR 30mA de type A (courant alternatif + composante continue). Le différentiel type F est recommandé pour éviter les déclenchements intempestifs.',
    category: 'Protections',
    icon: <Shield className="w-5 h-5" />,
    link: '/guides/references',
    keywords: ['lave-linge', 'lave-vaisselle', 'différentiel', 'type a', 'type f', '30ma'],
  },
  {
    id: '8',
    question: 'Quelle hauteur pour un tableau électrique ?',
    answer: 'Le tableau électrique doit être installé à une hauteur comprise entre 0.90m et 1.30m du sol pour faciliter l&apos;accès. Il doit être facilement accessible et situé dans un local sec.',
    category: 'Tableau',
    icon: <Zap className="w-5 h-5" />,
    link: '/guides/tableaux-types',
    keywords: ['tableau', 'hauteur', 'installation', '0.90m', '1.30m', 'accessible'],
  },
  {
    id: '9',
    question: 'Combien de circuits prises maximum par différentiel ?',
    answer: 'La NFC 15-100 recommande de ne pas dépasser 8 circuits par DDR 30mA pour assurer une bonne sélectivité et éviter les coupures généralisées.',
    category: 'Protections',
    icon: <Shield className="w-5 h-5" />,
    link: '/guides/conformite',
    keywords: ['différentiel', 'circuit', 'maximum', '8', 'sélectivité'],
  },
  {
    id: '10',
    question: 'Quelle section pour une borne de recharge voiture (IRVE) ?',
    answer: 'Une borne IRVE nécessite un circuit dédié en 6mm² avec un disjoncteur 32A et un DDR 30mA de type B (compatible courant continu). La protection parafoudre est obligatoire.',
    category: 'Énergies renouvelables',
    icon: <Zap className="w-5 h-5" />,
    link: '/guides/references',
    keywords: ['irve', 'voiture', 'électrique', 'recharge', '6mm²', '32a', 'type b'],
  },
  {
    id: '11',
    question: 'Quelle est la résistance de terre maximale ?',
    answer: 'En schéma TT (le plus courant en France), la résistance de terre doit être inférieure à 100Ω pour assurer le bon fonctionnement des dispositifs différentiels 30mA.',
    category: 'Terre',
    icon: <Shield className="w-5 h-5" />,
    link: '/guides/conformite',
    keywords: ['terre', 'résistance', '100ω', 'schéma tt', 'différentiel'],
  },
  {
    id: '12',
    question: 'Puis-je câbler plusieurs prises en série ?',
    answer: 'Non, les prises doivent être câblées en dérivation (parallèle) et non en série. Le câblage en série empêcherait le fonctionnement correct des prises et créerait des risques de surchauffe.',
    category: 'Circuits',
    icon: <Cable className="w-5 h-5" />,
    link: '/guides/references',
    keywords: ['prise', 'série', 'dérivation', 'parallèle', 'câblage'],
  },
];

const suggestedQuestions = [
  'Quelle section pour une prise 16A ?',
  'Combien de prises dans une chambre ?',
  'Quel différentiel pour la salle de bain ?',
  'Quelle hauteur pour le tableau ?',
  'Section pour un four ?',
];

export function NaturalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchKnowledgeBase = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const normalizedQuery = searchQuery.toLowerCase();
    const scoredResults = knowledgeBase.map((item) => {
      let score = 0;

      // Score exact match
      if (item.question.toLowerCase().includes(normalizedQuery)) {
        score += 10;
      }

      // Score keywords
      item.keywords.forEach((keyword) => {
        if (normalizedQuery.includes(keyword.toLowerCase())) {
          score += 5;
        }
      });

      // Score answer
      if (item.answer.toLowerCase().includes(normalizedQuery)) {
        score += 3;
      }

      // Score category
      if (item.category.toLowerCase().includes(normalizedQuery)) {
        score += 2;
      }

      return { ...item, score };
    });

    const filtered = scoredResults
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setResults(filtered);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        setIsSearching(true);
        searchKnowledgeBase(query);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSuggestedClick = (question: string) => {
    setQuery(question);
    searchKnowledgeBase(question);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Posez votre question en langage naturel..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-4 h-14 text-lg bg-slate-900/60 border-primary/30 focus:border-primary/50 backdrop-blur-xl"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <Sparkles className="w-4 h-4" />
            </Button>
          )}
        </div>

        {isSearching && (
          <div className="mt-4 text-center text-muted-foreground">
            Recherche en cours...
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span>{results.length} réponse(s) trouvée(s)</span>
            </div>
            {results.map((result) => (
              <Card
                key={result.id}
                className="bg-slate-900/60 border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {result.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2">{result.question}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {result.answer}
                      </p>
                      <a
                        href={result.link}
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        En savoir plus
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!query && results.length === 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span>Questions suggérées</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedClick(question)}
                  className="text-sm bg-slate-900/40 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {query && results.length === 0 && !isSearching && (
          <div className="mt-6 text-center text-muted-foreground">
            <p>Aucun résultat trouvé pour cette question.</p>
            <p className="text-sm mt-2">
              Essayez d&apos;utiliser d&apos;autres mots-clés ou consultez les tableaux de
              référence.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
