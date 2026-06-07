import { NaturalSearch } from '@/components/search/natural-search';
import { AnimatedSection } from '@/components/sheet/animated-section';
import { Disclaimer } from '@/components/ui/disclaimer';
import { Search, Sparkles } from 'lucide-react';

export default function RechercheNaturellePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedSection delay={100}>
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Recherche Intelligente</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Posez vos questions en langage naturel et obtenez des réponses
            basées sur la NFC 15-100
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <Disclaimer className="mb-8" variant="warning" />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <NaturalSearch />
      </AnimatedSection>

      <AnimatedSection delay={250}>
        <div className="mt-12 p-6 bg-slate-900/60 border border-white/10 rounded-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Comment utiliser la recherche ?
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">
                Exemples de questions :
              </strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>&quot;Quelle section de câble pour une prise 16A ?&quot;</li>
              <li>&quot;Combien de prises dans une chambre ?&quot;</li>
              <li>&quot;Quel différentiel pour la salle de bain ?&quot;</li>
              <li>&quot;Quelle hauteur pour le tableau électrique ?&quot;</li>
              <li>&quot;Section pour un four ?&quot;</li>
            </ul>
            <p className="mt-4">
              <strong className="text-foreground">Conseils :</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Utilisez des mots-clés simples (prise, section, différentiel...)
              </li>
              <li>
                Soyez précis sur le contexte (salle de bain, chambre,
                cuisine...)
              </li>
              <li>
                Les réponses sont basées sur la NFC 15-100 édition 2020 +
                amendements
              </li>
            </ul>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
