'use client';

import { useState } from 'react';

export function VolumesSalleEauSchema() {
  const [activeVolume, setActiveVolume] = useState<string | null>(null);

  const volumes = {
    v0: {
      name: 'Volume 0',
      description: 'Intérieur baignoire/douche',
      protection: 'IPX7 - TBTS 12V uniquement',
      color: '#dc2626',
    },
    v1: {
      name: 'Volume 1',
      description: "Jusqu'à 2,25m au-dessus",
      protection: 'IPX4 minimum',
      color: '#f59e0b',
    },
    v2: {
      name: 'Volume 2',
      description: "Jusqu'à 60cm autour du V1",
      protection: 'IPX4 - Pas de prises sauf rasoir',
      color: '#3b82f6',
    },
    hv: {
      name: 'Hors volumes',
      description: 'Au-delà du volume 2',
      protection: 'Installation normale',
      color: '#10b981',
    },
  };

  return (
    <div className="space-y-4">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto border rounded-lg bg-card"
      >
        <rect x="0" y="0" width="800" height="400" fill="#0a0f1e" />

        <text
          x="400"
          y="30"
          textAnchor="middle"
          fill="#f8fafc"
          fontSize="20"
          fontWeight="bold"
        >
          Volumes de salle d&apos;eau (vue de côté)
        </text>

        <rect
          x="50"
          y="300"
          width="700"
          height="80"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="2"
        />
        <text x="400" y="345" textAnchor="middle" fill="#94a3b8" fontSize="14">
          Sol
        </text>

        <rect
          x="250"
          y="200"
          width="150"
          height="100"
          fill={activeVolume === 'v0' ? volumes.v0.color : '#7f1d1d'}
          fillOpacity={activeVolume === 'v0' ? 0.8 : 0.4}
          stroke={volumes.v0.color}
          strokeWidth="3"
          className="cursor-pointer transition-all"
          onMouseEnter={() => setActiveVolume('v0')}
          onMouseLeave={() => setActiveVolume(null)}
        />
        <text
          x="325"
          y="250"
          textAnchor="middle"
          fill="#f8fafc"
          fontSize="16"
          fontWeight="bold"
        >
          V0
        </text>

        <rect
          x="200"
          y="75"
          width="250"
          height="125"
          fill={activeVolume === 'v1' ? volumes.v1.color : '#78350f'}
          fillOpacity={activeVolume === 'v1' ? 0.6 : 0.3}
          stroke={volumes.v1.color}
          strokeWidth="3"
          strokeDasharray="5,5"
          className="cursor-pointer transition-all"
          onMouseEnter={() => setActiveVolume('v1')}
          onMouseLeave={() => setActiveVolume(null)}
        />
        <text
          x="325"
          y="140"
          textAnchor="middle"
          fill="#f8fafc"
          fontSize="16"
          fontWeight="bold"
        >
          V1
        </text>
        <text x="325" y="160" textAnchor="middle" fill="#f8fafc" fontSize="12">
          2,25m
        </text>

        <rect
          x="140"
          y="75"
          width="60"
          height="225"
          fill={activeVolume === 'v2' ? volumes.v2.color : '#1e3a8a'}
          fillOpacity={activeVolume === 'v2' ? 0.6 : 0.3}
          stroke={volumes.v2.color}
          strokeWidth="3"
          strokeDasharray="10,5"
          className="cursor-pointer transition-all"
          onMouseEnter={() => setActiveVolume('v2')}
          onMouseLeave={() => setActiveVolume(null)}
        />
        <text
          x="170"
          y="190"
          textAnchor="middle"
          fill="#f8fafc"
          fontSize="14"
          fontWeight="bold"
        >
          V2
        </text>

        <rect
          x="450"
          y="75"
          width="60"
          height="225"
          fill={activeVolume === 'v2' ? volumes.v2.color : '#1e3a8a'}
          fillOpacity={activeVolume === 'v2' ? 0.6 : 0.3}
          stroke={volumes.v2.color}
          strokeWidth="3"
          strokeDasharray="10,5"
          className="cursor-pointer transition-all"
          onMouseEnter={() => setActiveVolume('v2')}
          onMouseLeave={() => setActiveVolume(null)}
        />
        <text
          x="480"
          y="190"
          textAnchor="middle"
          fill="#f8fafc"
          fontSize="14"
          fontWeight="bold"
        >
          V2
        </text>

        <rect
          x="50"
          y="75"
          width="90"
          height="225"
          fill={activeVolume === 'hv' ? volumes.hv.color : '#064e3b'}
          fillOpacity={activeVolume === 'hv' ? 0.6 : 0.2}
          stroke={volumes.hv.color}
          strokeWidth="2"
          className="cursor-pointer transition-all"
          onMouseEnter={() => setActiveVolume('hv')}
          onMouseLeave={() => setActiveVolume(null)}
        />
        <text x="95" y="190" textAnchor="middle" fill="#f8fafc" fontSize="12">
          Hors
        </text>
        <text x="95" y="205" textAnchor="middle" fill="#f8fafc" fontSize="12">
          volumes
        </text>

        <line
          x1="200"
          y1="300"
          x2="200"
          y2="320"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <line
          x1="450"
          y1="300"
          x2="450"
          y2="320"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="310"
          x2="450"
          y2="310"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <text x="325" y="335" textAnchor="middle" fill="#f59e0b" fontSize="12">
          60cm
        </text>
      </svg>

      {activeVolume && (
        <div
          className="p-4 rounded-lg border"
          style={{
            borderColor: volumes[activeVolume as keyof typeof volumes].color,
          }}
        >
          <h3
            className="font-semibold text-lg mb-2"
            style={{
              color: volumes[activeVolume as keyof typeof volumes].color,
            }}
          >
            {volumes[activeVolume as keyof typeof volumes].name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {volumes[activeVolume as keyof typeof volumes].description}
          </p>
          <p className="text-sm font-medium">
            Protection :{' '}
            {volumes[activeVolume as keyof typeof volumes].protection}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.entries(volumes).map(([key, vol]) => (
          <div
            key={key}
            className="p-2 rounded border cursor-pointer hover:bg-accent transition-colors"
            style={{ borderColor: vol.color }}
            onMouseEnter={() => setActiveVolume(key)}
            onMouseLeave={() => setActiveVolume(null)}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: vol.color }}
              />
              <span className="text-sm font-medium">{vol.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
