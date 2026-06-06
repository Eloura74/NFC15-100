'use client';

export function EarthDiagram() {
  return (
    <div className="w-full bg-card rounded-xl p-6 border shadow-sm flex justify-center">
      <svg
        viewBox="0 0 700 400"
        className="w-full max-w-2xl h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="earthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: 'hsl(142, 76%, 36%)', stopOpacity: 0.8 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: 'hsl(47, 96%, 53%)', stopOpacity: 0.8 }}
            />
          </linearGradient>
          <pattern
            id="soil"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="20"
              y2="20"
              stroke="hsl(240, 5%, 30%)"
              strokeWidth="1"
              opacity="0.3"
            />
          </pattern>
        </defs>

        {/* Ground */}
        <rect x="0" y="250" width="700" height="150" fill="url(#soil)" />
        <line
          x1="0"
          y1="250"
          x2="700"
          y2="250"
          className="stroke-border"
          strokeWidth="4"
        />
        <text
          x="50"
          y="270"
          className="fill-muted-foreground font-bold text-lg"
        >
          Terre (Sol)
        </text>

        {/* Piquet de terre */}
        <rect
          x="200"
          y="250"
          width="10"
          height="120"
          className="fill-primary stroke-primary"
        />
        <path d="M 195 370 L 215 370 L 205 390 Z" className="fill-primary" />
        <text
          x="190"
          y="320"
          textAnchor="end"
          className="fill-primary font-bold"
        >
          Piquet de terre
        </text>
        <text
          x="190"
          y="340"
          textAnchor="end"
          className="fill-muted-foreground text-xs"
        >
          Acier galva ou Cuivre
        </text>

        {/* Conducteur de terre */}
        <line
          x1="205"
          y1="250"
          x2="205"
          y2="150"
          className="stroke-success"
          strokeWidth="6"
        />
        <line
          x1="205"
          y1="150"
          x2="350"
          y2="150"
          className="stroke-success"
          strokeWidth="6"
        />
        <text
          x="250"
          y="140"
          textAnchor="middle"
          className="fill-success font-bold text-sm"
        >
          Conducteur de terre
        </text>
        <text
          x="250"
          y="170"
          textAnchor="middle"
          className="fill-muted-foreground text-xs"
        >
          Cuivre nu 25mm²
        </text>

        {/* Barrette de coupure */}
        <rect
          x="350"
          y="130"
          width="40"
          height="40"
          rx="4"
          className="fill-card stroke-border"
          strokeWidth="2"
        />
        <circle cx="370" cy="140" r="4" className="fill-foreground" />
        <circle cx="370" cy="160" r="4" className="fill-foreground" />
        <line
          x1="370"
          y1="140"
          x2="370"
          y2="160"
          className="stroke-primary"
          strokeWidth="3"
        />
        <text
          x="370"
          y="110"
          textAnchor="middle"
          className="fill-foreground font-bold"
        >
          Barrette de mesure
        </text>
        <text
          x="370"
          y="190"
          textAnchor="middle"
          className="fill-primary font-bold"
        >
          R ≤ 100 Ohms
        </text>

        {/* Conducteur principal de protection */}
        <line
          x1="390"
          y1="150"
          x2="550"
          y2="150"
          className="stroke-success"
          strokeWidth="4"
        />
        <line
          x1="550"
          y1="150"
          x2="550"
          y2="80"
          className="stroke-success"
          strokeWidth="4"
        />
        <text
          x="470"
          y="140"
          textAnchor="middle"
          className="fill-success font-bold text-sm"
        >
          Conducteur Principal
        </text>
        <text
          x="470"
          y="170"
          textAnchor="middle"
          className="fill-muted-foreground text-xs"
        >
          Vert/Jaune 16mm²
        </text>

        {/* Bornier du tableau */}
        <rect
          x="500"
          y="40"
          width="100"
          height="40"
          rx="4"
          className="fill-success/20 stroke-success"
          strokeWidth="2"
        />
        <text
          x="550"
          y="65"
          textAnchor="middle"
          className="fill-success font-bold"
        >
          Bornier Terre
        </text>
        <text
          x="550"
          y="30"
          textAnchor="middle"
          className="fill-foreground font-bold"
        >
          Tableau Électrique
        </text>

        {/* LEP */}
        <line
          x1="550"
          y1="80"
          x2="620"
          y2="80"
          className="stroke-success stroke-dashed"
          strokeWidth="3"
          strokeDasharray="4,4"
        />
        <text x="650" y="85" className="fill-muted-foreground text-xs">
          Vers LEP / Tuyauteries
        </text>
      </svg>
    </div>
  );
}
