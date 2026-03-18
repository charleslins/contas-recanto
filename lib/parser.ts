import Papa from 'papaparse';
import { rawCsv } from './csv-data';
import { parse, isValid } from 'date-fns';

export interface Transaction {
  id: string;
  categoryId: string;
  categoryName: string;
  date: Date;
  dateStr: string;
  history: string;
  amount: number;
  description: string;
}

const CATEGORY_MAP: Record<string, string> = {
  '1': 'Mão de obra',
  '2': 'Contas',
  '3': 'Material',
  '4': 'Serviços',
};

export function parseTransactions(): Transaction[] {
  const parsed = Papa.parse(rawCsv, { skipEmptyLines: true });
  const rows = parsed.data as string[][];

  // Find the header row index
  const headerIndex = rows.findIndex(row => row[1] === 'DATA' && row[2] === 'HISTÓRICO');
  if (headerIndex === -1) return [];

  const transactions: Transaction[] = [];

  for (let i = headerIndex + 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 4) continue;

    const catId = row[0]?.trim() || 'Outros';
    const dateStr = row[1]?.trim();
    const history = row[2]?.trim();
    let amountStr = row[3]?.trim() || '0';

    if (!dateStr && !history) continue;

    // Clean amount string: remove quotes, replace comma with dot
    amountStr = amountStr.replace(/"/g, '').replace(/\./g, '').replace(',', '.');
    const amount = parseFloat(amountStr);

    if (isNaN(amount)) continue;

    const description = row[5]?.trim() || '';

    let date = new Date();
    if (dateStr) {
      const parsedDate = parse(dateStr, 'dd/MM/yyyy', new Date());
      if (isValid(parsedDate)) {
        date = parsedDate;
      }
    }

    transactions.push({
      id: `tx-${i}`,
      categoryId: catId,
      categoryName: CATEGORY_MAP[catId] || 'Outros',
      date,
      dateStr: dateStr || 'N/A',
      history: history || 'Sem histórico',
      amount,
      description
    });
  }

  // Sort by date descending
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
}
