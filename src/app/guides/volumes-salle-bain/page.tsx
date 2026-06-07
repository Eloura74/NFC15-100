import { BathroomVolumes } from '@/components/interactive/bathroom-volumes';
import { Disclaimer } from '@/components/ui/disclaimer';
import { AnimatedSection } from '@/components/sheet/animated-section';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Volumes de salle de bain | ElecNorme',
  description:
    'Guide interactif des volumes de salle de bain selon la NFC 15-100 : équipements autorisés, indices de protection et restrictions par volume.',
};

export default function VolumesSalleBainPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <AnimatedSection>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Volumes de salle de bain</h1>
          <p className="text-lg text-muted-foreground">
            Comprendre les règles d&apos;installation électrique dans les salles
            de bain selon la NFC 15-100
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <Disclaimer className="mb-8" variant="warning" />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <BathroomVolumes />
      </AnimatedSection>

      <AnimatedSection delay={250}>
        <div className="mt-8 p-6 bg-slate-900/60 border border-white/10 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Règles générales</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">
                Liaison équipotentielle supplémentaire (LES) :
              </strong>{' '}
              Obligatoire pour relier toutes les masses métalliques accessibles
              (baignoire, tuyauterie, huisserie métallique).
            </p>
            <p>
              <strong className="text-foreground">
                Protection différentielle :
              </strong>{' '}
              Tous les circuits doivent être protégés par un DDR 30mA maximum.
            </p>
            <p>
              <strong className="text-foreground">Boîtes de connexion :</strong>{' '}
              Interdites en volumes 0 et 1. Autorisées en volume 2 si IPX4
              minimum.
            </p>
            <p>
              <strong className="text-foreground">Hauteur des volumes :</strong>{' '}
              Volume 0 et 1 : jusqu&apos;à 2,25m. Volume 2 : jusqu&apos;à 3m.
              Au-delà de 3m : hors volumes.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
