import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const calculators = [
  {
    id: 'ohm',
    name: "Loi d'Ohm",
    description: 'Calculer tension, intensité ou résistance',
  },
  {
    id: 'puissance',
    name: 'Puissance',
    description: 'Calculer la puissance monophasée ou triphasée',
  },
  {
    id: 'chute-tension',
    name: 'Chute de tension',
    description: 'Calculer la chute de tension dans un câble',
  },
  {
    id: 'section-cable',
    name: 'Section de câble',
    description: 'Calculer la section de câble selon puissance et distance',
  },
  {
    id: 'tableau-sections',
    name: 'Tableaux comparatifs',
    description: 'Sections de câbles vs intensité, puissance et chute de tension',
  },
];

export default function CalculateursPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Calculateurs</h1>
        <p className="text-muted-foreground">
          Outils de calcul pour vos chantiers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.map((calc) => (
          <Link key={calc.id} href={`/calculateurs/${calc.id}`}>
            <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle>{calc.name}</CardTitle>
                <CardDescription>{calc.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
