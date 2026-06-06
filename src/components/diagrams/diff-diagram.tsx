'use client';

export function DiffDiagram() {
  return (
    <div className="w-full bg-card rounded-xl p-6 border shadow-sm flex flex-col items-center gap-6">
      <h3 className="text-xl font-bold text-foreground">
        Choix du type de différentiel
      </h3>
      <svg
        viewBox="0 0 600 300"
        className="w-full max-w-2xl h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Type AC */}
        <rect
          x="50"
          y="50"
          width="140"
          height="80"
          rx="8"
          className="fill-muted/30 stroke-border"
          strokeWidth="2"
        />
        <text
          x="120"
          y="80"
          textAnchor="middle"
          className="fill-foreground font-bold text-xl"
        >
          Type AC
        </text>
        <text
          x="120"
          y="105"
          textAnchor="middle"
          className="fill-muted-foreground text-xs"
        >
          Standard (Courant alternatif)
        </text>

        <path
          d="M 90 150 Q 120 180 120 200"
          fill="none"
          className="stroke-muted-foreground"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        <rect
          x="70"
          y="210"
          width="100"
          height="60"
          rx="4"
          className="fill-card stroke-border"
          strokeWidth="1"
        />
        <text
          x="120"
          y="235"
          textAnchor="middle"
          className="fill-foreground text-sm"
        >
          Prises classiques
        </text>
        <text
          x="120"
          y="255"
          textAnchor="middle"
          className="fill-foreground text-sm"
        >
          Éclairage
        </text>

        {/* Type A */}
        <rect
          x="230"
          y="50"
          width="140"
          height="80"
          rx="8"
          className="fill-primary/10 stroke-primary"
          strokeWidth="2"
        />
        <text
          x="300"
          y="80"
          textAnchor="middle"
          className="fill-primary font-bold text-xl"
        >
          Type A
        </text>
        <text
          x="300"
          y="105"
          textAnchor="middle"
          className="fill-primary/80 text-xs"
        >
          Composantes continues
        </text>
        <text
          x="300"
          y="120"
          textAnchor="middle"
          className="fill-primary font-bold text-xs"
        >
          OBLIGATOIRE (min. 1)
        </text>

        <path
          d="M 300 150 L 300 200"
          fill="none"
          className="stroke-primary"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        <rect
          x="230"
          y="210"
          width="140"
          height="60"
          rx="4"
          className="fill-card stroke-primary/50"
          strokeWidth="2"
        />
        <text
          x="300"
          y="235"
          textAnchor="middle"
          className="fill-foreground text-sm font-bold"
        >
          Plaques de cuisson
        </text>
        <text
          x="300"
          y="255"
          textAnchor="middle"
          className="fill-foreground text-sm font-bold"
        >
          Lave-linge, IRVE
        </text>

        {/* Type F (HPI/HI) */}
        <rect
          x="410"
          y="50"
          width="140"
          height="80"
          rx="8"
          className="fill-success/10 stroke-success"
          strokeWidth="2"
        />
        <text
          x="480"
          y="80"
          textAnchor="middle"
          className="fill-success font-bold text-xl"
        >
          Type F (HPI)
        </text>
        <text
          x="480"
          y="105"
          textAnchor="middle"
          className="fill-success/80 text-xs"
        >
          Haute immunité
        </text>
        <text
          x="480"
          y="120"
          textAnchor="middle"
          className="fill-success/80 text-xs"
        >
          Recommandé
        </text>

        <path
          d="M 480 150 L 480 200"
          fill="none"
          className="stroke-success"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        <rect
          x="410"
          y="210"
          width="140"
          height="60"
          rx="4"
          className="fill-card stroke-success/50"
          strokeWidth="2"
        />
        <text
          x="480"
          y="235"
          textAnchor="middle"
          className="fill-foreground text-sm"
        >
          Congélateur
        </text>
        <text
          x="480"
          y="255"
          textAnchor="middle"
          className="fill-foreground text-sm"
        >
          Alarme, Informatique
        </text>
      </svg>
    </div>
  );
}
