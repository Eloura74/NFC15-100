'use client';

import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  sheetId: string;
  sheetTitle: string;
}

export function PrintButton({ sheetId, sheetTitle }: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button onClick={handlePrint} variant="outline" size="sm">
      <Printer className="w-4 h-4 mr-2" />
      Imprimer
    </Button>
  );
}
