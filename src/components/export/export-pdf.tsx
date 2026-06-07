'use client';

import { Button } from '@/components/ui/button';
import { Download, FileText, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExportPDFProps {
  title: string;
  content: string;
  filename?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function ExportPDF({
  title,
  content,
  filename = 'document',
  variant = 'outline',
  size = 'default',
  className,
}: ExportPDFProps) {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              line-height: 1.6;
              color: #333;
            }
            h1 {
              color: #2563eb;
              border-bottom: 2px solid #2563eb;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            h2 {
              color: #1e40af;
              margin-top: 30px;
              margin-bottom: 15px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
            }
            .disclaimer {
              background: #fef3c7;
              border: 1px solid #f59e0b;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .disclaimer-title {
              font-weight: bold;
              color: #92400e;
              margin-bottom: 5px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background: #f3f4f6;
              font-weight: bold;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">ElecNorme - NFC 15-100</div>
            <p>Document généré le ${new Date().toLocaleDateString('fr-FR')}</p>
          </div>
          ${content}
          <div class="footer">
            <p>Ce document est généré par ElecNorme et est fourni à titre informatif.</p>
            <p>Toujours se référer aux textes officiels NFC 15-100 pour toute application.</p>
            <p>© ${new Date().getFullYear()} ElecNorme</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleDownload = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              line-height: 1.6;
              color: #333;
            }
            h1 {
              color: #2563eb;
              border-bottom: 2px solid #2563eb;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">ElecNorme - NFC 15-100</div>
            <p>Document généré le ${new Date().toLocaleDateString('fr-FR')}</p>
          </div>
          ${content}
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn('flex gap-2', className)}>
      <Button onClick={handlePrint} variant={variant} size={size}>
        <Printer className="w-4 h-4 mr-2" />
        Imprimer
      </Button>
      <Button onClick={handleDownload} variant={variant} size={size}>
        <Download className="w-4 h-4 mr-2" />
        Télécharger
      </Button>
    </div>
  );
}
