import { jsPDF } from 'jspdf';
import { Quotation } from '../types';
import { formatINR, formatDate } from './formatter';

export function generateQuotationPDF(quotation: Quotation): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryNavy = '#0f172a';
  const solarGold = '#f59e0b';
  const textDark = '#1e293b';

  // Background Header
  doc.setFillColor(15, 23, 42); // #0f172a
  doc.rect(0, 0, 210, 38, 'F');

  // Sun Logo circle
  doc.setFillColor(245, 158, 11); // #f59e0b
  doc.circle(18, 19, 8, 'F');
  doc.setFillColor(255, 255, 255);
  doc.circle(18, 19, 4, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('VIZON SOLAR', 30, 20);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Clean Energy Solutions • Certified Rooftop Installer', 30, 26);

  // Quote Badge (Top Right)
  doc.setFillColor(245, 158, 11);
  doc.roundedRect(145, 10, 50, 18, 3, 3, 'F');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('SOLAR QUOTATION', 148, 17);
  doc.setFontSize(9);
  doc.text(quotation.quotationNumber, 148, 23);

  // Customer & Quote Details Box
  let y = 48;

  // Box 1: Customer Details
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(12, y, 90, 36, 2, 2, 'FD');

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('QUOTATION PREPARED FOR:', 16, y + 6);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(quotation.customerName || 'Valued Customer', 16, y + 13);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(`Phone: ${quotation.customerPhone || 'N/A'}`, 16, y + 19);
  doc.text(`Email: ${quotation.customerEmail || 'N/A'}`, 16, y + 25);
  doc.text(`Address: ${(quotation.customerAddress || 'Customer Site').slice(0, 38)}`, 16, y + 31);

  // Box 2: Quote Metadata
  doc.roundedRect(108, y, 90, 36, 2, 2, 'FD');

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('QUOTATION DETAILS:', 112, y + 6);

  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date Issued: ${formatDate(quotation.createdAt)}`, 112, y + 13);
  doc.text(`Validity: ${formatDate(quotation.validUntil)}`, 112, y + 19);
  doc.text(`Status: ${quotation.status}`, 112, y + 25);
  doc.text(`GSTIN: 27AAAAA0000A1Z5`, 112, y + 31);

  y += 44;

  // Line Items Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(12, y, 186, 8, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('#', 16, y + 5.5);
  doc.text('ITEM & DESCRIPTION', 26, y + 5.5);
  doc.text('QTY', 125, y + 5.5);
  doc.text('UNIT PRICE', 145, y + 5.5);
  doc.text('TOTAL (INR)', 175, y + 5.5);

  y += 8;

  // Items
  quotation.items.forEach((item, index) => {
    doc.setFillColor(index % 2 === 0 ? 255 : 248, index % 2 === 0 ? 255 : 250, index % 2 === 0 ? 255 : 252);
    doc.rect(12, y, 186, 10, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(12, y + 10, 198, y + 10);

    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    doc.text(`${index + 1}`, 16, y + 6.5);
    
    const nameText = `${item.product.name} (${item.product.capacityValue}${item.product.capacityUnit})`;
    doc.text(nameText.slice(0, 48), 26, y + 6.5);
    
    doc.text(`${item.quantity}`, 127, y + 6.5);
    doc.text(formatINR(item.unitPriceINR), 145, y + 6.5);
    doc.text(formatINR(item.quantity * item.unitPriceINR), 175, y + 6.5);

    y += 10;
  });

  // Installation row if enabled
  if (quotation.includeInstallation && quotation.installationCostINR > 0) {
    doc.setFillColor(248, 250, 252);
    doc.rect(12, y, 186, 10, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(12, y + 10, 198, y + 10);

    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    doc.text(`${quotation.items.length + 1}`, 16, y + 6.5);
    doc.text('Rooftop Structure, Wiring, Earthing & Commissioning', 26, y + 6.5);
    doc.text('1 Set', 125, y + 6.5);
    doc.text(formatINR(quotation.installationCostINR), 145, y + 6.5);
    doc.text(formatINR(quotation.installationCostINR), 175, y + 6.5);

    y += 10;
  }

  y += 4;

  // Financial Breakdown Box (Bottom Right)
  const breakdownX = 118;
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(breakdownX, y, 80, 44, 2, 2, 'S');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);

  let bY = y + 7;
  doc.text('Subtotal:', breakdownX + 6, bY);
  doc.text(formatINR(quotation.subtotalINR), breakdownX + 74, bY, { align: 'right' });

  if (quotation.subsidyDiscountINR > 0) {
    bY += 6;
    doc.setTextColor(16, 185, 129); // green
    doc.text('Govt. Subsidy (PM Surya Ghar):', breakdownX + 6, bY);
    doc.text(`- ${formatINR(quotation.subsidyDiscountINR)}`, breakdownX + 74, bY, { align: 'right' });
    doc.setTextColor(71, 85, 105);
  }

  if (quotation.promoDiscountINR > 0) {
    bY += 6;
    doc.setTextColor(16, 185, 129);
    doc.text(`Discount (${quotation.promoCodeApplied || 'Promo'}):`, breakdownX + 6, bY);
    doc.text(`- ${formatINR(quotation.promoDiscountINR)}`, breakdownX + 74, bY, { align: 'right' });
    doc.setTextColor(71, 85, 105);
  }

  bY += 6;
  doc.text(`GST (${quotation.gstRatePct}%):`, breakdownX + 6, bY);
  doc.text(formatINR(quotation.gstAmountINR), breakdownX + 74, bY, { align: 'right' });

  bY += 8;
  doc.setFillColor(15, 23, 42);
  doc.rect(breakdownX, bY - 5, 80, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('FINAL NET PAYABLE:', breakdownX + 6, bY + 1.5);
  doc.text(formatINR(quotation.finalTotalINR), breakdownX + 74, bY + 1.5, { align: 'right' });

  // Warranty & Benefits Box (Left Side)
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(12, y, 100, 44, 2, 2, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('WARRANTY & ASSURANCE GUARANTEE', 16, y + 7);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('• 25-Year Linear Power Performance Warranty on Panels', 16, y + 14);
  doc.text('• 10-Year Comprehensive Inverter Replacement Warranty', 16, y + 20);
  doc.text('• 5-Year Free On-Site Workmanship & Maintenance', 16, y + 26);
  doc.text('• Net Metering & DISCOM Approval Processing Included', 16, y + 32);

  // Terms & Signature
  y += 52;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('TERMS & CONDITIONS:', 12, y);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('1. Quotation is valid for 30 days from issue date. Prices subject to DISCOM policy changes.', 12, y + 5);
  doc.text('2. Installation subject to rooftop structural feasibility assessment by Vizon Solar engineer.', 12, y + 9);
  doc.text('3. Government subsidy is disbursed directly to customer bank account post DISCOM net-metering setup.', 12, y + 13);

  // Digital Badge / Stamp
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.5);
  doc.roundedRect(142, y - 2, 56, 18, 2, 2, 'S');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(245, 158, 11);
  doc.text('Vizon Solar India', 146, y + 4);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Digitally Authorized Quote', 146, y + 9);
  doc.text('Ref: ' + quotation.quotationNumber, 146, y + 13);

  // Footer Line
  doc.setDrawColor(226, 232, 240);
  doc.line(12, 280, 198, 280);

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Vizon Solar Mobile App • Official Solar Quotation Document • www.vizonsolar.app', 105, 285, { align: 'center' });

  // Save PDF
  doc.save(`SolarQuotation_${quotation.quotationNumber}.pdf`);
}
