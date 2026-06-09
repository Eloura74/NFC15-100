import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportPdfOptions {
  elementId: string;
  filename: string;
  title: string;
  onProgress?: (progress: number) => void;
}

export async function exportToPdf({ elementId, filename, title, onProgress }: ExportPdfOptions): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  try {
    if (onProgress) onProgress(20);
    
    // Convert DOM to Canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });
    
    if (onProgress) onProgress(60);

    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF (A4 size)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Header
    pdf.setFontSize(22);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Rapport d\'autocontrôle', 15, 20);
    
    pdf.setFontSize(14);
    pdf.setTextColor(100, 100, 100);
    pdf.text(title, 15, 30);
    
    pdf.setFontSize(10);
    const dateStr = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    pdf.text(`Généré le ${dateStr} via ElecNorme`, 15, 40);
    
    // Divider
    pdf.setDrawColor(200, 200, 200);
    pdf.line(15, 45, pdfWidth - 15, 45);

    // Calculate image dimensions to fit A4
    const imgProps = pdf.getImageProperties(imgData);
    const margin = 15;
    const availableWidth = pdfWidth - (margin * 2);
    const availableHeight = pdfHeight - 50 - margin; // 50 is header space
    
    const imgWidth = availableWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let positionY = 50;
    
    // If image is taller than one page, we need to add pages (pagination logic omitted for simplicity, 
    // assuming checklists fit on 1-2 pages mostly. We'll implement a simple single page or stretched for now)
    // A better approach for long checklists is clipping, but for now we scale or let it overflow to next page manually.
    
    if (imgHeight > availableHeight) {
      // Split into multiple pages
      let heightLeft = imgHeight;
      let yOffset = 0;
      
      while (heightLeft > 0) {
        if (yOffset > 0) {
          pdf.addPage();
          positionY = 15;
        }
        
        pdf.addImage(
          imgData, 
          'PNG', 
          margin, 
          positionY - yOffset, 
          imgWidth, 
          imgHeight
        );
        
        heightLeft -= availableHeight;
        yOffset += availableHeight;
      }
    } else {
      pdf.addImage(imgData, 'PNG', margin, positionY, imgWidth, imgHeight);
    }
    
    // Footer with Signature
    pdf.setDrawColor(0, 0, 0);
    pdf.line(pdfWidth - 70, pdfHeight - 30, pdfWidth - 15, pdfHeight - 30);
    pdf.setFontSize(10);
    pdf.text('Signature du professionnel', pdfWidth - 65, pdfHeight - 20);
    
    if (onProgress) onProgress(90);

    // Save
    pdf.save(`${filename}.pdf`);
    
    if (onProgress) onProgress(100);
  } catch (error) {
    console.error('PDF Export failed:', error);
    throw error;
  }
}
