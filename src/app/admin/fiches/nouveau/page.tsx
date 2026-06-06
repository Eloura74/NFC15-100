'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewSheetPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    summary: '',
    immediateAnswer: '',
    domain: '',
    subDomain: '',
    keywords: '',
    criticality: 'normale',
    requirements: '',
    values: '',
    examples: '',
    errors: '',
    risks: '',
    controls: '',
  });

  const domains = [
    { id: 'alimentation', name: 'Alimentation' },
    { id: 'protections', name: 'Protections' },
    { id: 'terre', name: 'Terre' },
    { id: 'circuits', name: 'Circuits' },
    { id: 'locaux-speciaux', name: 'Locaux spéciaux' },
    { id: 'energie', name: 'Énergie' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer l'objet JSON de la fiche
    const sheet = {
      id: formData.id,
      title: formData.title,
      summary: formData.summary,
      immediateAnswer: formData.immediateAnswer,
      domain: formData.domain,
      subDomain: formData.subDomain,
      keywords: formData.keywords.split(',').map(k => k.trim()),
      synonyms: [],
      applicableContexts: [{ type: 'installation', value: 'Toute installation', required: true }],
      excludedContexts: [],
      version: 'nfc15100-2020',
      lastVerified: new Date().toISOString().split('T')[0],
      status: 'published',
      criticality: formData.criticality,
      confidence: 'source_normative',
      content: {
        whenApplies: formData.summary,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        values: [],
        exceptions: [],
        specialCases: formData.examples.split('\n').filter(e => e.trim()),
        commonErrors: formData.errors.split('\n').filter(e => e.trim()),
        risks: formData.risks.split('\n').map(r => ({
          description: r.trim(),
          level: formData.criticality,
          consequences: [],
        })).filter(r => r.description),
        controls: formData.controls.split('\n').filter(c => c.trim()),
        checklist: [],
      },
      sources: [
        { id: 'nfc15100', type: 'normative', title: 'NF C 15-100', reference: 'NF C 15-100', date: '2020' },
      ],
      relatedSheets: [],
      author: 'Admin',
      verifier: 'Admin',
      history: [
        { date: new Date().toISOString().split('T')[0], author: 'Admin', action: 'created', description: 'Création de la fiche' },
      ],
      tags: formData.keywords.split(',').map(k => k.trim()),
    };

    // Afficher le JSON dans la console
    console.log('Nouvelle fiche créée :');
    console.log(JSON.stringify(sheet, null, 2));

    // Afficher une alerte avec les instructions
    alert(
      `Fiche créée avec succès !\n\n` +
      `Pour l'ajouter au site :\n\n` +
      `1. Créez le fichier : src/data/fiches/${formData.domain}/${formData.id}.json\n` +
      `2. Copiez le JSON affiché dans la console\n` +
      `3. Ajoutez l'import dans src/lib/content/get-sheets.ts\n\n` +
      `ID de la fiche : ${formData.id}`
    );

    // Rediriger vers la liste
    router.push('/admin/fiches');
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">➕ Nouvelle fiche technique</h1>
          <p className="text-muted-foreground">
            Créez une nouvelle fiche conforme NFC 15-100
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/admin/fiches')}>
          ← Retour
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
            <CardDescription>Identité et classification de la fiche</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="id">ID de la fiche *</Label>
                <Input
                  id="id"
                  placeholder="ex: disjoncteur-divisionnaire"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Slug unique (minuscules, tirets)
                </p>
              </div>

              <div>
                <Label htmlFor="criticality">Criticité *</Label>
                <Select
                  value={formData.criticality}
                  onValueChange={(value) => setFormData({ ...formData, criticality: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normale">Normale</SelectItem>
                    <SelectItem value="attention">Attention</SelectItem>
                    <SelectItem value="critique">Critique</SelectItem>
                    <SelectItem value="danger_immediat">Danger immédiat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                placeholder="ex: Disjoncteurs divisionnaires - Calibres et sections"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="summary">Résumé court *</Label>
              <Input
                id="summary"
                placeholder="ex: Correspondance entre calibre du disjoncteur et section de câble"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="immediateAnswer">Réponse immédiate *</Label>
              <Textarea
                id="immediateAnswer"
                placeholder="ex: Disjoncteur 10A → 1,5mm² | 16A → 1,5mm² | 20A → 2,5mm² | 32A → 6mm²"
                value={formData.immediateAnswer}
                onChange={(e) => setFormData({ ...formData, immediateAnswer: e.target.value })}
                rows={2}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Ce que l'électricien doit retenir en priorité
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="domain">Domaine *</Label>
                <Select
                  value={formData.domain}
                  onValueChange={(value) => setFormData({ ...formData, domain: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un domaine" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain.id} value={domain.id}>
                        {domain.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subDomain">Sous-domaine</Label>
                <Input
                  id="subDomain"
                  placeholder="ex: surintensites"
                  value={formData.subDomain}
                  onChange={(e) => setFormData({ ...formData, subDomain: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="keywords">Mots-clés *</Label>
              <Input
                id="keywords"
                placeholder="ex: disjoncteur, calibre, section, câble, protection"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Séparés par des virgules
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contenu technique</CardTitle>
            <CardDescription>Exigences, valeurs et exemples</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="requirements">Exigences normatives</Label>
              <Textarea
                id="requirements"
                placeholder="Une exigence par ligne&#10;ex: Calibre adapté à la section&#10;Courbe C pour usage domestique&#10;Pouvoir de coupure suffisant"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={5}
              />
            </div>

            <div>
              <Label htmlFor="examples">Exemples concrets (5 minimum recommandés)</Label>
              <Textarea
                id="examples"
                placeholder="Un exemple par ligne&#10;ex: Circuit prises 16A avec câble 1,5mm² → OK&#10;Circuit 20A avec câble 1,5mm² → DANGER !"
                value={formData.examples}
                onChange={(e) => setFormData({ ...formData, examples: e.target.value })}
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="errors">Erreurs fréquentes</Label>
              <Textarea
                id="errors"
                placeholder="Une erreur par ligne&#10;ex: Calibre trop élevé pour la section&#10;Section insuffisante pour le calibre"
                value={formData.errors}
                onChange={(e) => setFormData({ ...formData, errors: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="risks">Risques</Label>
              <Textarea
                id="risks"
                placeholder="Un risque par ligne&#10;ex: Échauffement du câble si calibre trop élevé&#10;Incendie possible"
                value={formData.risks}
                onChange={(e) => setFormData({ ...formData, risks: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="controls">Contrôles à effectuer</Label>
              <Textarea
                id="controls"
                placeholder="Un contrôle par ligne&#10;ex: Vérifier la section du câble&#10;Vérifier le calibre du disjoncteur"
                value={formData.controls}
                onChange={(e) => setFormData({ ...formData, controls: e.target.value })}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" size="lg" className="flex-1">
            ✅ Créer la fiche
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.push('/admin/fiches')}
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}
