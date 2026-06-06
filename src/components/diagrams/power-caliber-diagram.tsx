'use client';

export function PowerCaliberDiagram() {
  const data = [
    { power: '3 kVA', caliber: '15A', color: 'hsl(142, 76%, 36%)' },
    { power: '6 kVA', caliber: '30A', color: 'hsl(47, 96%, 53%)' },
    { power: '9 kVA', caliber: '45A', color: 'hsl(38, 92%, 50%)' },
    { power: '12 kVA', caliber: '60A', color: 'hsl(0, 72%, 51%)' },
  ];

  return (
    <div className="w-full bg-card rounded-lg p-6 border">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="300" y="30" textAnchor="middle" className="fill-foreground text-xl font-bold">
          Puissance souscrite → Calibre DB
        </text>

        {data.map((item, i) => (
          <g key={i} transform={`translate(${50 + i * 140}, 80)`}>
            <rect
              x="0"
              y="0"
              width="120"
              height="140"
              rx="8"
              className="fill-card stroke-border hover:scale-105 transition-transform"
              strokeWidth="2"
              style={{ fill: `${item.color}20`, stroke: item.color }}
            />
            
            <circle cx="60" cy="40" r="25" style={{ fill: item.color }} opacity="0.3" />
            <text x="60" y="48" textAnchor="middle" className="fill-foreground text-2xl font-bold">
              {item.power}
            </text>
            
            <line x1="20" y1="80" x2="100" y2="80" className="stroke-muted-foreground" strokeWidth="2" />
            
            <text x="60" y="110" textAnchor="middle" className="fill-foreground text-3xl font-bold">
              {item.caliber}
            </text>
            
            <text x="60" y="130" textAnchor="middle" className="fill-muted-foreground text-xs">
              Disjoncteur
            </text>
          </g>
        ))}

        <text x="300" y="260" textAnchor="middle" className="fill-muted-foreground text-sm italic">
          6 kVA = configuration la plus courante en France
        </text>
      </svg>
    </div>
  );
}
