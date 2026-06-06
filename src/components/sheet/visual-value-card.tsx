'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, CheckCircle2 } from 'lucide-react';

interface VisualValueCardProps {
  label: string;
  value: string;
  unit?: string;
  context?: string;
  highlight?: boolean;
}

export function VisualValueCard({
  label,
  value,
  unit,
  context,
  highlight,
}: VisualValueCardProps) {
  return (
    <Card
      className={`relative overflow-hidden p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${highlight ? 'border-primary/50 shadow-sm' : 'border-border/50'}`}
    >
      {highlight && (
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
      )}
      <div className="flex flex-col h-full justify-between gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="text-sm font-semibold text-muted-foreground leading-snug">
            {label}
          </div>
          <div
            className={`p-1.5 rounded-md shrink-0 ${highlight ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
          >
            {highlight ? (
              <Zap className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span
              className={`text-3xl font-black tracking-tight ${highlight ? 'text-primary' : 'text-foreground'}`}
            >
              {value}
            </span>
            {unit && (
              <span className="text-base font-semibold text-muted-foreground">
                {unit}
              </span>
            )}
          </div>

          {context && (
            <Badge
              variant="secondary"
              className="text-xs bg-muted/50 hover:bg-muted/80 transition-colors font-normal"
            >
              {context}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
