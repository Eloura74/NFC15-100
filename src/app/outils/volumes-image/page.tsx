import { Metadata } from 'next';
import { VolumeAnalyzer } from '@/components/tools/volume-analyzer';

export const metadata: Metadata = {
  title: 'Analyseur de Volumes NFC 15-100 | ElecNorme',
  description: 'Outil interactif pour visualiser les volumes de sécurité dans une salle de bain à partir d\'une photo.',
};

export default function VolumeAnalyzerPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Calcul des Volumes par l&apos;Image</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Importez une photo de la salle de bain et tracez le receveur pour visualiser instantanément l&apos;emprise des Volumes 1 et 2 selon la norme NFC 15-100.
        </p>
      </div>

      <VolumeAnalyzer />
    </div>
  );
}
