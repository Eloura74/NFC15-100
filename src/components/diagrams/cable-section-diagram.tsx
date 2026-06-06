'use client';

export function CableSectionDiagram() {
  return (
    <div className="w-full bg-card rounded-lg p-6 border">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cableGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(47, 96%, 53%)', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(47, 96%, 40%)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        <text x="400" y="30" textAnchor="middle" className="fill-foreground text-xl font-bold">
          Sections de câbles selon intensité
        </text>

        <g className="animate-pulse">
          <rect x="50" y="80" width="120" height="60" rx="8" className="fill-primary/20 stroke-primary" strokeWidth="2" />
          <text x="110" y="105" textAnchor="middle" className="fill-foreground font-bold">10A</text>
          <text x="110" y="125" textAnchor="middle" className="fill-primary text-2xl font-bold">1,5mm²</text>
        </g>

        <line x1="170" y1="110" x2="230" y2="110" className="stroke-muted-foreground" strokeWidth="2" markerEnd="url(#arrow)" />

        <g>
          <rect x="230" y="80" width="120" height="60" rx="8" className="fill-primary/20 stroke-primary" strokeWidth="2" />
          <text x="290" y="105" textAnchor="middle" className="fill-foreground font-bold">16A</text>
          <text x="290" y="125" textAnchor="middle" className="fill-primary text-2xl font-bold">1,5mm²</text>
          <text x="290" y="155" textAnchor="middle" className="fill-muted-foreground text-xs">max 40m</text>
        </g>

        <line x1="350" y1="110" x2="410" y2="110" className="stroke-muted-foreground" strokeWidth="2" />

        <g>
          <rect x="410" y="80" width="120" height="60" rx="8" className="fill-primary/20 stroke-primary" strokeWidth="2" />
          <text x="470" y="105" textAnchor="middle" className="fill-foreground font-bold">20A</text>
          <text x="470" y="125" textAnchor="middle" className="fill-primary text-2xl font-bold">2,5mm²</text>
        </g>

        <line x1="530" y1="110" x2="590" y2="110" className="stroke-muted-foreground" strokeWidth="2" />

        <g>
          <rect x="590" y="80" width="120" height="60" rx="8" className="fill-primary/20 stroke-primary" strokeWidth="2" />
          <text x="650" y="105" textAnchor="middle" className="fill-foreground font-bold">32A</text>
          <text x="650" y="125" textAnchor="middle" className="fill-primary text-2xl font-bold">6mm²</text>
        </g>

        <g transform="translate(50, 200)">
          <text x="0" y="0" className="fill-foreground font-semibold text-sm">⚠️ Chute de tension :</text>
          <rect x="0" y="10" width="700" height="40" rx="4" className="fill-destructive/10 stroke-destructive" strokeWidth="1" />
          <text x="350" y="35" textAnchor="middle" className="fill-foreground text-sm">
            Éclairage : max 3% | Autres usages : max 5%
          </text>
        </g>

        <g transform="translate(50, 280)">
          <circle cx="10" cy="10" r="8" className="fill-success" />
          <text x="25" y="15" className="fill-foreground text-sm">Section adaptée = Protection optimale</text>
          
          <circle cx="10" cy="40" r="8" className="fill-destructive" />
          <text x="25" y="45" className="fill-foreground text-sm">Section insuffisante = DANGER incendie</text>
          
          <circle cx="10" cy="70" r="8" className="fill-warning" />
          <text x="25" y="75" className="fill-foreground text-sm">Longueur excessive = Chute de tension</text>
        </g>
      </svg>
    </div>
  );
}
