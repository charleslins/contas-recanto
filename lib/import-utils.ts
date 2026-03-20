import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Transaction } from '@/lib/parser';
import { format } from 'date-fns';
import { parse as parseOfx } from 'ofx-js';

export async function exportToPDF(transactions: Transaction[], title: string) {
  const doc = new jsPDF();
  
  doc.text(title, 14, 15);
  doc.setFontSize(10);
  doc.text(`Gerado em: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, 14, 22);

  const tableData = transactions.map(t => [
    format(t.date, 'dd/MM/yyyy'),
    t.history,
    t.categoryName,
    t.type === 'income' ? `+ R$ ${t.amount.toLocaleString('pt-BR')}` : `- R$ ${t.amount.toLocaleString('pt-BR')}`,
    t.description || '-'
  ]);

  (doc as any).autoTable({
    head: [['Data', 'Histórico', 'Categoria', 'Valor', 'Descrição']],
    body: tableData,
    startY: 28,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [79, 70, 229] }, // indigo-600
  });

  doc.save(`${title.toLowerCase().replace(/\s/g, '_')}_${format(new Date(), 'yyyyMMdd')}.pdf`);
}

export async function parseOFX(fileContent: string): Promise<Partial<Transaction>[]> {
  try {
    const data = await parseOfx(fileContent);
    const stmtTrn = data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
    
    // OFX structures vary, handle array or single object
    const transactions = Array.isArray(stmtTrn) ? stmtTrn : [stmtTrn];
    
    return transactions.map((t: any) => {
      const amount = parseFloat(t.TRNAMT);
      const rawDate = t.DTPOSTED; // format YYYYMMDDHHMMSS
      const year = parseInt(rawDate.substring(0, 4));
      const month = parseInt(rawDate.substring(4, 6)) - 1;
      const day = parseInt(rawDate.substring(6, 8));
      
      return {
        type: amount > 0 ? 'income' : 'expense',
        amount: Math.abs(amount),
        history: t.MEMO || t.NAME || 'Importado OFX',
        date: new Date(year, month, day),
        dateStr: `${day}/${month + 1}/${year}`,
        categoryId: '5', // Default to Outros
        categoryName: 'Outros'
      };
    });
  } catch (error) {
    console.error('Error parsing OFX:', error);
    throw new Error('Falha ao processar arquivo OFX.');
  }
}
