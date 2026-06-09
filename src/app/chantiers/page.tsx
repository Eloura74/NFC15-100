"use client"

import { useState, useEffect } from 'react';
import { Plus, FolderOpen, Calendar, MapPin, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { getAllChantiers, createChantier, Chantier } from '@/lib/db/chantiers';

export default function ChantiersPage() {
  const [chantiers, setChantiers] = useState<Chantier[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // New Chantier Form State
  const [newName, setNewName] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    loadChantiers();
  }, []);

  const loadChantiers = async () => {
    try {
      const data = await getAllChantiers();
      setChantiers(data);
    } catch (error) {
      console.error("Erreur de chargement des chantiers", error);
    } finally {
      setIsLoaded(true);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newClient) return;

    try {
      await createChantier({
        name: newName,
        client: newClient,
        address: newAddress,
        notes: '',
        date: new Date(),
        status: 'en_cours'
      });
      setIsDialogOpen(false);
      setNewName('');
      setNewClient('');
      setNewAddress('');
      await loadChantiers();
    } catch (error) {
      alert("Erreur lors de la création du chantier");
    }
  };

  const filteredChantiers = chantiers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en_cours':
        return <Badge className="bg-blue-500 hover:bg-blue-600">En cours</Badge>;
      case 'termine':
        return <Badge className="bg-green-500 hover:bg-green-600">Terminé</Badge>;
      case 'en_attente':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">En attente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Mes Chantiers</h1>
          <p className="text-muted-foreground">
            Gérez vos projets, centralisez vos calculs et vos rapports d'autocontrôle.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nouveau Chantier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau chantier</DialogTitle>
              <DialogDescription>
                Renseignez les informations de base pour ce nouveau projet.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du projet (ex: Rénovation T3)</Label>
                <Input 
                  id="name" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)} 
                  required 
                  placeholder="Nom du projet"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input 
                  id="client" 
                  value={newClient} 
                  onChange={e => setNewClient(e.target.value)} 
                  required 
                  placeholder="Nom du client"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse (optionnel)</Label>
                <Input 
                  id="address" 
                  value={newAddress} 
                  onChange={e => setNewAddress(e.target.value)} 
                  placeholder="Adresse du chantier"
                />
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                <Button type="submit">Créer le chantier</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2 max-w-md relative">
        <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
        <Input 
          placeholder="Rechercher par client ou projet..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {!isLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filteredChantiers.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <FolderOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">Aucun chantier trouvé</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {searchQuery ? "Aucun projet ne correspond à votre recherche." : "Vous n'avez pas encore créé de dossier de chantier. Commencez dès maintenant !"}
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Créer mon premier chantier
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChantiers.map((chantier) => (
            <Link key={chantier.id} href={`/chantiers/${chantier.id}`}>
              <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    {getStatusBadge(chantier.status)}
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(chantier.updatedAt), 'dd MMM yyyy', { locale: fr })}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                    {chantier.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {chantier.address || 'Aucune adresse'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-medium mb-4">
                    Client : {chantier.client}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                    <div className="flex gap-4">
                      <span>{chantier.linkedItems?.checklists?.length || 0} checklist(s)</span>
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
