'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function TableauSectionsPage() {
  // Données conformes NFC 15-100 (2020)
  const cableSections = [
    {
      section: 1.5,
      maxCurrent: 16,
      maxPower230: 3680,
      maxPower400: 11040,
      usage: 'Éclairage, prises 16A',
      protection: '16A',
    },
    {
      section: 2.5,
      maxCurrent: 20,
      maxPower230: 4600,
      maxPower400: 13800,
      usage: 'Prises 20A, circuits spécialisés',
      protection: '20A',
    },
    {
      section: 4,
      maxCurrent: 25,
      maxPower230: 5750,
      maxPower400: 17250,
      usage: 'Prises 32A, chauffage',
      protection: '25A',
    },
    {
      section: 6,
      maxCurrent: 32,
      maxPower230: 7360,
      maxPower400: 22080,
      usage: 'Cuisinière, plaques de cuisson',
      protection: '32A',
    },
    {
      section: 10,
      maxCurrent: 40,
      maxPower230: 9200,
      maxPower400: 27600,
      usage: 'Alimentation principale, gros appareils',
      protection: '40A',
    },
    {
      section: 16,
      maxCurrent: 63,
      maxPower230: 14490,
      maxPower400: 43470,
      usage: 'Tableau divisionnaire',
      protection: '63A',
    },
    {
      section: 25,
      maxCurrent: 80,
      maxPower230: 18400,
      maxPower400: 55200,
      usage: 'Alimentation générale',
      protection: '80A',
    },
  ];

  const voltageDrop = [
    { distance: 10, section1_5: 1.5, section2_5: 0.9, section4: 0.6, section6: 0.4 },
    { distance: 20, section1_5: 3.1, section2_5: 1.8, section4: 1.1, section6: 0.8 },
    { distance: 30, section1_5: 4.6, section2_5: 2.8, section4: 1.7, section6: 1.1 },
    { distance: 50, section1_5: 7.7, section2_5: 4.6, section4: 2.9, section6: 1.9 },
    { distance: 75, section1_5: 11.5, section2_5: 6.9, section4: 4.3, section6: 2.9 },
    { distance: 100, section1_5: 15.3, section2_5: 9.2, section4: 5.8, section6: 3.8 },
  ];

  return (
    <div className="container py-8 max-w-6xl">
      <Link href="/calculateurs">
        <Button variant="ghost" className="mb-4">
          ← Retour aux calculateurs
        </Button>
      </Link>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Tableaux comparatifs - Sections de câbles
          </h1>
          <p className="text-muted-foreground">
            Tableaux de référence conformes NFC 15-100 (2020) pour le
            dimensionnement des câbles électriques
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sections vs Intensité et Puissance</CardTitle>
            <CardDescription>
              Intensité maximale admissible et puissance correspondante selon la
              section du câble (cuivre, pose encastrée)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section (mm²)</TableHead>
                  <TableHead>Intensité max (A)</TableHead>
                  <TableHead>Puissance 230V (W)</TableHead>
                  <TableHead>Puissance 400V (W)</TableHead>
                  <TableHead>Usage courant</TableHead>
                  <TableHead>Protection</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cableSections.map((row) => (
                  <TableRow key={row.section}>
                    <TableCell className="font-medium">
                      <Badge variant="outline">{row.section} mm²</Badge>
                    </TableCell>
                    <TableCell>{row.maxCurrent} A</TableCell>
                    <TableCell>{row.maxPower230.toLocaleString()} W</TableCell>
                    <TableCell>{row.maxPower400.toLocaleString()} W</TableCell>
                    <TableCell className="text-sm">{row.usage}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{row.protection}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chute de tension (%) - 230V Monophasé</CardTitle>
            <CardDescription>
              Chute de tension en % pour 16A selon la distance et la section
              (ρ cuivre = 0,023 Ω·mm²/m)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Distance (m)</TableHead>
                  <TableHead>1,5 mm²</TableHead>
                  <TableHead>2,5 mm²</TableHead>
                  <TableHead>4 mm²</TableHead>
                  <TableHead>6 mm²</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {voltageDrop.map((row) => (
                  <TableRow key={row.distance}>
                    <TableCell className="font-medium">{row.distance} m</TableCell>
                    <TableCell>
                      <span
                        className={
                          row.section1_5 > 5
                            ? 'text-destructive font-semibold'
                            : row.section1_5 > 3
                              ? 'text-warning font-semibold'
                              : ''
                        }
                      >
                        {row.section1_5}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          row.section2_5 > 5
                            ? 'text-destructive font-semibold'
                            : row.section2_5 > 3
                              ? 'text-warning font-semibold'
                              : ''
                        }
                      >
                        {row.section2_5}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          row.section4 > 5
                            ? 'text-destructive font-semibold'
                            : row.section4 > 3
                              ? 'text-warning font-semibold'
                              : ''
                        }
                      >
                        {row.section4}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          row.section6 > 5
                            ? 'text-destructive font-semibold'
                            : row.section6 > 3
                              ? 'text-warning font-semibold'
                              : ''
                        }
                      >
                        {row.section6}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 p-4 bg-muted rounded-lg text-sm space-y-2">
              <p className="font-semibold">Légende :</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>
                  <span className="text-destructive font-semibold">&gt; 5%</span> :
                  Non conforme (chute excessive)
                </li>
                <li>
                  <span className="text-warning font-semibold">3-5%</span> : Limite
                  acceptable
                </li>
                <li>&lt; 3% : Conforme NFC 15-100</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>Notes importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              • Ces valeurs sont données pour des câbles en cuivre, pose encastrée,
              température ambiante 30°C
            </p>
            <p>
              • Pour des poses différentes (apparent, enterré, groupé), appliquer les
              coefficients de correction appropriés
            </p>
            <p>
              • La chute de tension maximale admissible est de 3% pour l&apos;éclairage
              et 5% pour les autres usages
            </p>
            <p>
              • Au-delà de 100m, augmenter la section d&apos;un cran pour compenser la
              chute de tension
            </p>
            <p className="font-semibold text-primary">
              ⚠️ Toujours vérifier la conformité avec la NFC 15-100 en vigueur et
              consulter un professionnel qualifié
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
