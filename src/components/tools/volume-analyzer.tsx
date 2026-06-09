"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon, RotateCcw, Crosshair, Info, CheckCircle2, AlertTriangle, AlertCircle, PlusCircle, Plug, Zap, Lightbulb, WashingMachine, Droplets } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Point {
  x: number;
  y: number;
}

type EquipmentType = 'prise230' | 'prise_rasoir' | 'spot230' | 'spot12v' | 'chauffe_eau' | 'lave_linge';

interface PlacedEquipment {
  id: string;
  type: EquipmentType;
  x: number;
  y: number;
  volume: number; // 1, 2, or 3 (Hors Volume)
  isValid: boolean;
  message: string;
}

const EQUIPMENT_CATALOG: Record<EquipmentType, { name: string, icon: React.ReactNode, vols: number[], message: (vol: number) => string }> = {
  prise230: { 
    name: 'Prise 230V classique', 
    icon: <Plug className="w-4 h-4" />,
    vols: [3], 
    message: (v) => v < 3 ? "Interdit en Volume 0, 1 et 2." : "Autorisé Hors Volume (à &gt;60cm)." 
  },
  prise_rasoir: { 
    name: 'Prise Rasoir (Transfo séparé)', 
    icon: <Plug className="w-4 h-4" />,
    vols: [2, 3], 
    message: (v) => v < 2 ? "Interdit en Volume 0/1." : "Autorisé avec transformateur de séparation." 
  },
  spot230: { 
    name: 'Luminaire 230V (Classe II)', 
    icon: <Lightbulb className="w-4 h-4" />,
    vols: [2, 3], 
    message: (v) => v < 2 ? "Interdit. TBTS 12V obligatoire." : "Autorisé si Classe II et IPX4." 
  },
  spot12v: { 
    name: 'Spot TBTS 12V', 
    icon: <Zap className="w-4 h-4" />,
    vols: [1, 2, 3], 
    message: (v) => "Autorisé (Source TBTS doit être hors volume 0/1/2)." 
  },
  chauffe_eau: { 
    name: 'Chauffe-eau électrique', 
    icon: <Droplets className="w-4 h-4" />,
    vols: [1, 2, 3], 
    message: (v) => v === 1 ? "Autorisé au-dessus du receveur si horizontal et IPX5." : "Autorisé." 
  },
  lave_linge: { 
    name: 'Lave-linge', 
    icon: <WashingMachine className="w-4 h-4" />,
    vols: [3], 
    message: (v) => v < 3 ? "Totalement interdit en Volume 0, 1 et 2." : "Autorisé Hors Volume." 
  }
};

export function VolumeAnalyzer() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [equipments, setEquipments] = useState<PlacedEquipment[]>([]);
  const [mode, setMode] = useState<'upload' | 'draw' | 'place'>('upload');
  const [selectedEq, setSelectedEq] = useState<EquipmentType>('prise230');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setMode('draw');
        setPoints([]);
        setEquipments([]);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (mode === 'draw' || mode === 'place') {
      drawImageAndOverlays();
    }
  }, [imageSrc, points, mode, equipments]);

  // --- MATH UTILS ---
  const isPointInPolygon = (point: Point, vs: Point[]) => {
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      let xi = vs[i].x, yi = vs[i].y;
      let xj = vs[j].x, yj = vs[j].y;
      let intersect = ((yi > point.y) !== (yj > point.y)) && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const distToSegmentSquared = (p: Point, v: Point, w: Point) => {
    let l2 = (v.x - w.x)*(v.x - w.x) + (v.y - w.y)*(v.y - w.y);
    if (l2 === 0) return (p.x - v.x)*(p.x - v.x) + (p.y - v.y)*(p.y - v.y);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return (p.x - (v.x + t * (w.x - v.x)))**2 + (p.y - (v.y + t * (w.y - v.y)))**2;
  };

  const distToPolygon = (p: Point, vs: Point[]) => {
    let minD = Infinity;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      minD = Math.min(minD, distToSegmentSquared(p, vs[i], vs[j]));
    }
    return Math.sqrt(minD);
  };

  const getPointVolume = (p: Point, vs: Point[]) => {
    if (vs.length < 4) return 3; // Hors volume par défaut si non tracé
    
    // Si à l'intérieur du polygone tracé -> Volume 1
    if (isPointInPolygon(p, vs)) return 1;

    // Estimation de l'échelle des 60cm : on prend la largeur du polygone comme environ 80cm
    const minX = Math.min(...vs.map(pt => pt.x));
    const maxX = Math.max(...vs.map(pt => pt.x));
    const width = maxX - minX;
    
    const scalePxPerCm = width / 80; 
    const distPx = distToPolygon(p, vs);
    const distCm = distPx / scalePxPerCm;

    if (distCm <= 60) return 2;
    return 3; // Hors Volume
  };

  // --- DRAWING ---
  const drawImageAndOverlays = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const containerWidth = containerRef.current?.clientWidth || 800;
      const scale = containerWidth / img.width;
      const canvasWidth = containerWidth;
      const canvasHeight = img.height * scale;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      // Draw Base Polygon (Volume 1)
      if (points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        
        if (points.length === 4) {
          ctx.lineTo(points[0].x, points[0].y);
          ctx.fillStyle = mode === 'draw' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(220, 38, 38, 0.2)';
          ctx.fill();
        }

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw points markers in draw mode
        if (mode === 'draw') {
          points.forEach((p, i) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#ef4444';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
          });
        }
      }

      // Draw Volume 2 Area visualization (approximate expanded box)
      if (mode === 'place' && points.length === 4) {
        const minX = Math.min(...points.map(p => p.x));
        const maxX = Math.max(...points.map(p => p.x));
        const minY = Math.min(...points.map(p => p.y));
        const maxY = Math.max(...points.map(p => p.y));
        
        const width = maxX - minX;
        const expand = (width / 80) * 60; // Expand by 60cm equivalent

        ctx.beginPath();
        ctx.rect(minX - expand, minY - expand, width + (expand * 2), (maxY - minY) + (expand * 2));
        ctx.fillStyle = 'rgba(245, 158, 11, 0.15)'; 
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]); 

        // Labels
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(minX + width/2 - 35, minY + (maxY-minY)/2 - 15, 70, 30);
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Vol 0/1', minX + width/2 - 25, minY + (maxY-minY)/2 + 5);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(minX - expand + 10, minY - expand + 10, 60, 25);
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Vol 2', minX - expand + 20, minY - expand + 28);
      }

      // Draw Equipments
      equipments.forEach((eq, i) => {
        // Draw connecting line to pin
        ctx.beginPath();
        ctx.moveTo(eq.x, eq.y);
        ctx.lineTo(eq.x + 20, eq.y - 20);
        ctx.lineTo(eq.x + 120, eq.y - 20);
        ctx.strokeStyle = eq.isValid ? '#10b981' : '#ef4444'; // green or red
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Pin point
        ctx.beginPath();
        ctx.arc(eq.x, eq.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = eq.isValid ? '#10b981' : '#ef4444';
        ctx.fill();

        // Draw Badge Label
        ctx.fillStyle = eq.isValid ? '#10b981' : '#ef4444';
        ctx.fillRect(eq.x + 20, eq.y - 35, 120, 30);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(EQUIPMENT_CATALOG[eq.type].name.substring(0, 15) + '...', eq.x + 25, eq.y - 15);
      });
    };
    img.src = imageSrc;
  };

  // --- INTERACTIONS ---
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (mode === 'draw') {
      if (points.length >= 4) return;
      const newPoints = [...points, { x, y }];
      setPoints(newPoints);

      if (newPoints.length === 4) {
        setTimeout(() => setMode('place'), 400);
      }
    } else if (mode === 'place') {
      // Place equipment
      const vol = getPointVolume({ x, y }, points);
      const cat = EQUIPMENT_CATALOG[selectedEq];
      const isValid = cat.vols.includes(vol);
      
      const newEq: PlacedEquipment = {
        id: Math.random().toString(),
        type: selectedEq,
        x, y,
        volume: vol,
        isValid,
        message: cat.message(vol)
      };

      setEquipments([...equipments, newEq]);
    }
  };

  const resetTool = () => {
    setImageSrc(null);
    setPoints([]);
    setEquipments([]);
    setMode('upload');
  };

  const resetPoints = () => {
    setPoints([]);
    setEquipments([]);
    setMode('draw');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Banner indicating current step */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-xl border text-sm sm:text-base">
        <div className={`flex items-center gap-1.5 sm:gap-2 ${mode === 'upload' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${mode === 'upload' ? 'border-primary bg-primary/10' : 'border-muted-foreground'}`}>1</div>
          Photo
        </div>
        <div className="w-4 sm:w-8 h-px bg-border hidden sm:block" />
        <div className={`flex items-center gap-1.5 sm:gap-2 ${mode === 'draw' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${mode === 'draw' ? 'border-primary bg-primary/10' : 'border-muted-foreground'}`}>2</div>
          Volume
        </div>
        <div className="w-4 sm:w-8 h-px bg-border hidden sm:block" />
        <div className={`flex items-center gap-1.5 sm:gap-2 ${mode === 'place' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${mode === 'place' ? 'border-primary bg-primary/10' : 'border-muted-foreground'}`}>3</div>
          Équipements
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        <Card className="xl:col-span-2 shadow-sm border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-primary" />
              Simulateur Interactif
            </CardTitle>
            <CardDescription>
              {mode === 'upload' && "Prenez ou importez une photo de la salle de bain."}
              {mode === 'draw' && `Tracez le sol de la douche ou de la baignoire (${points.length}/4)`}
              {mode === 'place' && "Sélectionnez un équipement à droite et cliquez sur l'image pour le placer."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mode === 'upload' ? (
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-12 text-center flex flex-col items-center justify-center bg-muted/10 hover:bg-muted/20 transition-colors">
                <ImageIcon className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Importer une photo</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  Utilisez une photo bien éclairée montrant clairement la baignoire ou le receveur de douche.
                </p>
                <div className="relative">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button>Choisir une image</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4" ref={containerRef}>
                <div className="relative border rounded-lg overflow-hidden bg-black/5">
                  <canvas 
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    className={`w-full h-auto object-contain touch-none ${mode === 'draw' && points.length < 4 ? 'cursor-crosshair' : ''} ${mode === 'place' ? 'cursor-copy' : ''}`}
                  />
                  {mode === 'draw' && points.length < 4 && (
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      Tracez le contour ({points.length}/4)
                    </div>
                  )}
                  {mode === 'place' && (
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur flex items-center gap-2">
                      <PlusCircle className="w-4 h-4 text-primary" />
                      Cliquez pour placer : {EQUIPMENT_CATALOG[selectedEq].name}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center sm:justify-end mt-4">
                  <Button variant="outline" onClick={() => setEquipments([])} className="gap-2 w-full sm:w-auto" disabled={equipments.length === 0}>
                    <RotateCcw className="w-4 h-4" /> Vider
                  </Button>
                  <Button variant="outline" onClick={resetPoints} className="gap-2 w-full sm:w-auto">
                    <Crosshair className="w-4 h-4" /> Refaire tracé
                  </Button>
                  <Button variant="ghost" onClick={resetTool} className="text-muted-foreground w-full sm:w-auto">
                    Nouvelle photo
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Panneau de droite : Bibliothèque ou Diagnostic */}
        <div className="space-y-6">
          <Card className="h-fit border-primary/20">
            <CardHeader className="bg-primary/5 pb-4 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-primary" />
                Bibliothèque
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              <div className="text-sm text-muted-foreground mb-4">
                Sélectionnez l&apos;équipement à vérifier :
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-1 gap-2">
                {(Object.entries(EQUIPMENT_CATALOG) as [EquipmentType, any][]).map(([key, data]) => (
                  <Button
                    key={key}
                    variant={selectedEq === key ? 'default' : 'outline'}
                    className={`justify-start gap-3 h-12 ${selectedEq === key ? 'shadow-md ring-2 ring-primary/20' : ''}`}
                    onClick={() => {
                      if (mode === 'upload') return;
                      setSelectedEq(key);
                    }}
                    disabled={mode === 'upload' || mode === 'draw'}
                  >
                    {data.icon}
                    <span className="text-sm truncate">{data.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Liste des équipements placés (Diagnostic) */}
          {equipments.length > 0 && (
            <Card className="animate-in slide-in-from-right-4">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg">Diagnostic</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {equipments.map((eq) => (
                  <div key={eq.id} className={`p-3 rounded-lg border text-sm ${eq.isValid ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold flex items-center gap-2">
                        {EQUIPMENT_CATALOG[eq.type].icon}
                        {EQUIPMENT_CATALOG[eq.type].name}
                      </div>
                      {eq.isValid ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      Emplacement : {eq.volume === 3 ? "Hors Volume" : `Volume ${eq.volume}`}
                    </div>
                    <div className={`text-xs font-medium ${eq.isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {eq.message}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Aide si rien de placé */}
          {equipments.length === 0 && mode === 'place' && (
            <div className="p-4 bg-blue-500/10 text-blue-800 dark:text-blue-200 rounded-lg text-sm flex gap-3 border border-blue-500/20">
              <Info className="w-5 h-5 shrink-0" />
              <p>Cliquez sur l&apos;image pour placer un équipement. L&apos;outil vérifiera instantanément sa conformité.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
