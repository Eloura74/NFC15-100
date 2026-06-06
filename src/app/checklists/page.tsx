import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const checklistTemplates = [
  {
    id: 'logement-neuf',
    name: 'Logement neuf',
    description: 'Checklist complète pour une installation neuve',
    itemCount: 25,
  },
  {
    id: 'tableau',
    name: 'Tableau électrique',
    description: "Contrôle d'un tableau électrique",
    itemCount: 15,
  },
  {
    id: 'salle-eau',
    name: "Salle d'eau",
    description: "Vérifications pour une salle d'eau",
    itemCount: 12,
  },
];

export default function ChecklistsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Checklists</h1>
        <p className="text-muted-foreground">
          Listes de contrôle pour vos chantiers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {checklistTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {template.itemCount} points de contrôle
              </p>
              <Button variant="outline" className="w-full" disabled>
                Créer une checklist (à venir)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Fonctionnalité en développement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Les checklists personnalisables seront bientôt disponibles avec :
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>Création de checklists personnalisées</li>
            <li>Sauvegarde locale sur votre appareil</li>
            <li>Ajout de photos et notes</li>
            <li>Export en PDF</li>
            <li>Disponible hors ligne</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
