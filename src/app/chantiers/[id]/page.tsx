"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User, MapPin, Calendar, CheckSquare, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { getChantier, deleteChantier, Chantier } from '@/lib/db/chantiers';
import { getChecklistTemplate } from '@/lib/data/checklists';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ChantierDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [chantier, setChantier] = useState<Chantier | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id && typeof id === 'string') {
      loadChantier(id);
    }
  }, [id]);

  const loadChantier = async (chantierId: string) => {
    try {
      const data = await getChantier(chantierId);
      if (data) {
        setChantier(data);
      } else {
        router.push('/chantiers');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(true);
    }
  };

  const handleDelete = async () => {
    if (confirm("Voulez-vous vraiment supprimer ce chantier ? Cette action est irréversible.")) {
      try {
        await deleteChantier(chantier!.id);
        router.push('/chantiers');
      } catch (e) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  if (!isLoaded) {
    return <div className="container mx-auto py-8 animate-pulse"><div className="h-64 bg-muted rounded-xl w-full"></div></div>;
  }

  if (!chantier) return null;

  return (
    <div className="container mx-auto py-8 max-w-5xl space-y-8 animate-in fade-in">
      <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent" onClick={() => router.push('/chantiers')}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux chantiers
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{chantier.name}</h1>
            <Badge variant={chantier.status === 'termine' ? 'success' : 'default'} className="mt-1">
              {chantier.status === 'termine' ? 'Terminé' : 'En cours'}
            </Badge>
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" /> 
            Créé le {format(new Date(chantier.createdAt), 'dd MMMM yyyy', { locale: fr })}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Edit className="w-4 h-4 mr-2"/> Modifier</Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}><Trash2 className="w-4 h-4 mr-2"/> Supprimer</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Client</p>
                <p className="text-sm text-muted-foreground">{chantier.client}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Adresse</p>
                <p className="text-sm text-muted-foreground">{chantier.address || 'Non spécifiée'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contenu du dossier</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="checklists" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="checklists">Checklists liées</TabsTrigger>
                <TabsTrigger value="calculs">Calculs liés</TabsTrigger>
              </TabsList>
              
              <TabsContent value="checklists" className="pt-4 space-y-4">
                {chantier.linkedItems.checklists.length === 0 ? (
                  <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed">
                    <CheckSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Aucune checklist liée à ce chantier.</p>
                    <Link href={`/checklists`}>
                      <Button variant="outline" size="sm" className="mt-4">Lier une checklist</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {chantier.linkedItems.checklists.map(checklistId => {
                      const template = getChecklistTemplate(checklistId);
                      return (
                        <Link key={checklistId} href={`/checklists/${checklistId}`}>
                          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                            <CardHeader className="py-4">
                              <CardTitle className="text-base flex justify-between items-center">
                                {template?.name || checklistId}
                                <ArrowLeft className="w-4 h-4 rotate-180 text-muted-foreground" />
                              </CardTitle>
                              <CardDescription className="line-clamp-1">{template?.description}</CardDescription>
                            </CardHeader>
                          </Card>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="calculs" className="pt-4">
                <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed">
                  <p className="text-sm text-muted-foreground">La sauvegarde des calculs sera bientôt disponible.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
