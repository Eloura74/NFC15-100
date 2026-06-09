'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RotateCcw, Save, CheckCircle2, AlertCircle, FileDown, Loader2 } from 'lucide-react';
import { ChecklistTemplate } from '@/lib/data/checklists';
import { cn } from '@/lib/utils';
import { exportToPdf } from '@/lib/utils/pdf-export';

interface InteractiveChecklistProps {
  template: ChecklistTemplate;
}

export function InteractiveChecklist({ template }: InteractiveChecklistProps) {
  // State for checked items: { "itemId": true/false }
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const storageKey = `elecnorme_checklist_${template.id}`;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load checklist state', e);
    }
    setIsLoaded(true);
  }, [storageKey]);

  // Save to localStorage when checkedItems changes
  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(checkedItems));
      setLastSaved(new Date());
    } catch (e) {
      console.error('Failed to save checklist state', e);
    }
  }, [checkedItems, isLoaded, storageKey]);

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const resetChecklist = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser cette checklist ? Toutes les données cochées seront effacées.')) {
      setCheckedItems({});
      localStorage.removeItem(storageKey);
    }
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      await exportToPdf({
        elementId: `checklist-container-${template.id}`,
        filename: `elecnorme-rapport-${template.id}`,
        title: `Rapport de conformité : ${template.name}`,
      });
    } catch (error) {
      alert("Une erreur est survenue lors de l'export PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  const totalItems = template.items.length;
  const completedItems = template.items.filter(item => checkedItems[item.id]).length;
  const progressPercent = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
  const isComplete = progressPercent === 100;

  if (!isLoaded) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg"></div>;
  }

  return (
    <div className="space-y-6" id={`checklist-container-${template.id}`}>
      {/* Header and Progress */}
      <Card className={cn("transition-colors duration-500", isComplete ? "border-green-500/50" : "")}>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                {template.name}
                {isComplete && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground" data-html2canvas-ignore="true">
              {lastSaved && (
                <span className="flex items-center gap-1">
                  <Save className="w-3 h-3" />
                  Sauvegardé localement ({lastSaved.toLocaleTimeString()})
                </span>
              )}
              <Button variant="outline" size="sm" onClick={resetChecklist} title="Réinitialiser" className="ml-2">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>Progression</span>
            <span className={isComplete ? "text-green-500 font-bold" : ""}>{progressPercent}% ({completedItems}/{totalItems})</span>
          </div>
          <Progress value={progressPercent} className={cn("h-2", isComplete ? "bg-green-500/20" : "")} />
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <div className="space-y-3">
        {template.items.map((item) => {
          const isChecked = !!checkedItems[item.id];
          return (
            <Card 
              key={item.id} 
              className={cn(
                "transition-all duration-200 cursor-pointer hover:border-primary/50",
                isChecked ? "bg-muted/30 border-primary/20" : "bg-card"
              )}
              onClick={() => toggleItem(item.id)}
            >
              <CardContent className="p-4 flex items-start gap-4">
                <div className="mt-0.5">
                  <Checkbox 
                    checked={isChecked}
                    onCheckedChange={() => toggleItem(item.id)}
                    className={cn("w-5 h-5", isChecked ? "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" : "")}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Label 
                    className={cn(
                      "text-base cursor-pointer",
                      isChecked ? "text-muted-foreground line-through" : "text-foreground font-medium"
                    )}
                  >
                    {item.label}
                  </Label>
                  {item.description && (
                    <p className={cn(
                      "text-sm",
                      isChecked ? "text-muted-foreground/50" : "text-muted-foreground"
                    )}>
                      {item.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isComplete && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-sm text-green-700 dark:text-green-300 flex items-start gap-3 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-bold">Félicitations !</p>
            <p>Tous les points de contrôle sont validés. L&apos;installation semble conforme aux exigences de cette checklist.</p>
          </div>
        </div>
      )}
      
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-xs text-yellow-700 dark:text-yellow-400 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          <strong>Rappel :</strong> Cette checklist est un outil d'aide à l'autocontrôle. Elle ne remplace en aucun cas l'expertise ou l'attestation officielle d'un inspecteur Consuel.
        </p>
      </div>

      <div className="flex justify-end pt-4" data-html2canvas-ignore="true">
        <Button 
          onClick={handleExportPdf} 
          disabled={isExporting}
          className="gap-2"
        >
          {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
          {isExporting ? 'Génération du PDF...' : 'Exporter le rapport (PDF)'}
        </Button>
      </div>
    </div>
  );
}
