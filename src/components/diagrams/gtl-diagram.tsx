'use client';

export function GTLDiagram() {
  return (
    <div className="w-full bg-card rounded-xl p-6 border shadow-sm flex justify-center">
      <svg
        viewBox="0 0 600 500"
        className="w-full max-w-2xl h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ETEL (Espace Technique Electrique du Logement) */}
        <rect x="150" y="50" width="300" height="400" className="fill-muted/30 stroke-muted-foreground stroke-dashed" strokeWidth="2" strokeDasharray="5,5" />
        <text x="300" y="40" textAnchor="middle" className="fill-muted-foreground font-bold text-lg">ETEL (Volume réservé : sol au plafond)</text>
        
        {/* Dimensions ETEL */}
        <line x1="150" y1="470" x2="450" y2="470" className="stroke-muted-foreground" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
        <text x="300" y="490" textAnchor="middle" className="fill-muted-foreground text-sm">Largeur min: 60 cm (ou largeur GTL + 10cm)</text>
        
        {/* GTL (Gaine Technique Logement) */}
        <rect x="200" y="100" width="200" height="350" className="fill-card stroke-border" strokeWidth="2" />
        <text x="300" y="90" textAnchor="middle" className="fill-foreground font-bold">GTL (Gaine Technique)</text>

        {/* Panneau de contrôle (Compteur/Disjoncteur) */}
        <rect x="220" y="120" width="160" height="80" rx="4" className="fill-primary/10 stroke-primary" strokeWidth="2" />
        <text x="300" y="150" textAnchor="middle" className="fill-primary font-bold">Panneau de Contrôle</text>
        <text x="300" y="170" textAnchor="middle" className="fill-primary text-xs">(Compteur + Disjoncteur EDF)</text>
        
        {/* Hauteur Disjoncteur */}
        <line x1="130" y1="160" x2="190" y2="160" className="stroke-muted-foreground" strokeWidth="1" />
        <text x="120" y="165" textAnchor="end" className="fill-foreground text-xs">0.90m à 1.30m (PMR)</text>

        {/* Tableau de répartition */}
        <rect x="220" y="220" width="160" height="100" rx="4" className="fill-warning/10 stroke-warning" strokeWidth="2" />
        <text x="300" y="260" textAnchor="middle" className="fill-warning font-bold">Tableau de Répartition</text>
        <text x="300" y="280" textAnchor="middle" className="fill-warning text-xs">(Disjoncteurs divisionnaires)</text>

        {/* Hauteur Tableau */}
        <line x1="410" y1="270" x2="470" y2="270" className="stroke-muted-foreground" strokeWidth="1" />
        <text x="480" y="275" textAnchor="start" className="fill-foreground text-xs">1.00m à 1.80m</text>

        {/* Tableau de communication */}
        <rect x="220" y="340" width="160" height="80" rx="4" className="fill-success/10 stroke-success" strokeWidth="2" />
        <text x="300" y="375" textAnchor="middle" className="fill-success font-bold">Coffret Communication</text>
        <text x="300" y="395" textAnchor="middle" className="fill-success text-xs">(Prises RJ45, Box)</text>
        
        {/* Hauteur Communication */}
        <line x1="130" y1="380" x2="190" y2="380" className="stroke-muted-foreground" strokeWidth="1" />
        <text x="120" y="385" textAnchor="end" className="fill-foreground text-xs">Min 5 cm du sol</text>

      </svg>
    </div>
  );
}
