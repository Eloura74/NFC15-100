'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface TableRow {
  cols: string[];
  highlight?: boolean;
}

interface QuickReferenceTableProps {
  title: string;
  headers: string[];
  rows: TableRow[];
}

export function QuickReferenceTable({
  title,
  headers,
  rows,
}: QuickReferenceTableProps) {
  return (
    <Card className="overflow-hidden border-border/50 shadow-sm">
      <CardHeader className="bg-muted/30 py-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/10">
                {headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 sm:px-6 sm:py-4 text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`transition-colors hover:bg-muted/50 ${
                    row.highlight
                      ? 'bg-primary/5 font-semibold text-primary'
                      : 'text-foreground'
                  }`}
                >
                  {row.cols.map((col, j) => (
                    <td
                      key={j}
                      className={`px-3 py-2 sm:px-6 sm:py-4 ${j === 1 ? 'font-bold text-base sm:text-lg' : 'text-xs sm:text-sm'}`}
                    >
                      {j === 0 && row.highlight && (
                        <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2" />
                      )}
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
