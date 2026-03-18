import Papa from 'papaparse';
import { rawCsv } from './csv-data';
import { parse, isValid } from 'date-fns';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
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
  '5': 'Outros',
};

export function parseTransactions(csv: string = rawCsv): Transaction[] {
  const parsed = Papa.parse(csv, { skipEmptyLines: true });
  const rows = parsed.data as string[][];

  // Find the header row index
  const headerIndex = rows.findIndex(row => row[1] === 'DATA' && row[2] === 'HISTÓRICO');
  if (headerIndex === -1) return [];

  const transactions: Transaction[] = [];

  for (let i = headerIndex + 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 4) continue;

    let catId = row[0]?.trim() || '5'; // Default to '5' (Outros)

    // Robust parsing: extract only the numeric part if it's like "80: 2"
    if (catId.includes(':')) {
      const parts = catId.split(':');
      catId = parts[parts.length - 1].trim();
    }

    // Ensure we map to a known ID, otherwise '5'
    if (!['1', '2', '3', '4', '5'].includes(catId)) {
      catId = '5';
    }

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
      type: 'expense',
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

export function parseRevenueTransactions(rawRevenueCsv: string): Transaction[] {
  const parsed = Papa.parse(rawRevenueCsv, { skipEmptyLines: true });
  const rows = parsed.data as string[][];

  // Find the header row index (NOME, TELEFONE...)
  const headerIndex = rows.findIndex(row => row[0] === 'NOME' && row[2] === 'CHEGADA');
  if (headerIndex === -1) return [];

  const transactions: Transaction[] = [];

  for (let i = headerIndex + 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 10) continue;

    const name = row[0]?.trim();
    const arrivalDateStr = row[2]?.trim();
    let totalStr = row[9]?.trim() || '0';

    if (!arrivalDateStr || !name) continue;

    // Clean amount string: remove "R$", separators, etc.
    const amount = parseFloat(totalStr.replace(/R\$\s?/, '').replace(/\./g, '').replace(',', '.'));

    if (isNaN(amount) || amount === 0) continue;

    let date = new Date();
    const parsedDate = parse(arrivalDateStr, 'dd/MM/yyyy', new Date());
    if (isValid(parsedDate)) {
      date = parsedDate;
    }

    transactions.push({
      id: `rev-${i}`,
      type: 'income',
      categoryId: 'income',
      categoryName: 'Receita',
      date,
      dateStr: arrivalDateStr,
      history: `Aluguel: ${name}`,
      amount,
      description: `Período: ${arrivalDateStr} a ${row[3] || '?'}`
    });
  }

  return transactions;
}
