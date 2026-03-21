import { format, isValid, parse } from 'date-fns';
import Papa from 'papaparse';
import { buildExpenseHistory } from '@/lib/transaction-fields';
import type { InsertTransactionInput } from '@/lib/validations/transaction';

export interface DespesasCsvRow {
  categoria: string;
  credor: string;
  description: string;
  amount: number;
  date: Date;
}

export function normalizeDespesasHeaderKey(key: string): string {
  return String(key || '')
    .replace(/^\uFEFF/, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/** Lê valor monetário pt-BR como no import da tabela (vírgula decimal, milhares com ponto). */
export function parseDespesasAmount(raw: string): number {
  const normalized = raw.replace(/[R$\s"]/g, '');
  let cleaned = normalized;
  if (normalized.includes(',') && normalized.includes('.')) {
    cleaned = normalized.replace(/\./g, '').replace(',', '.');
  } else if (normalized.includes(',')) {
    cleaned = normalized.replace(',', '.');
  }
  const amount = Number.parseFloat(cleaned);
  return Number.isFinite(amount) ? amount : 0;
}

export function parseDespesasDateBr(raw: string): Date {
  const t = raw.trim();
  const brDate = parse(t, 'dd/MM/yyyy', new Date());
  if (isValid(brDate)) return brDate;
  const native = new Date(t);
  if (isValid(native)) return native;
  return new Date();
}

function cell(row: Record<string, unknown>, ...normalizedKeys: string[]): string {
  for (const [k, v] of Object.entries(row)) {
    const nk = normalizeDespesasHeaderKey(k);
    if (normalizedKeys.includes(nk)) {
      return String(v ?? '').trim();
    }
  }
  return '';
}

/**
 * Parse de `lib/Despesas.csv` (colunas data, categoria, credor, descrição, valor).
 * Ignora linhas sem categoria ou valor ≤ 0.
 */
export function parseDespesasCsvContent(content: string): DespesasCsvRow[] {
  const parsed = Papa.parse<Record<string, unknown>>(content, {
    header: true,
    skipEmptyLines: true,
  });

  const out: DespesasCsvRow[] = [];
  for (const raw of parsed.data) {
    const row = raw || {};
    const dataRaw = cell(row, 'data');
    const categoria = cell(row, 'categoria');
    const credor = cell(row, 'credor');
    const description = cell(row, 'descricao');
    const valorRaw = cell(row, 'valor');
    const amount = parseDespesasAmount(valorRaw);
    if (!categoria || amount <= 0) continue;

    out.push({
      categoria,
      credor,
      description,
      amount,
      date: parseDespesasDateBr(dataRaw),
    });
  }
  return out;
}

export function uniqueSortedCategoryNames(rows: DespesasCsvRow[]): string[] {
  return [...new Set(rows.map((r) => r.categoria))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

/** Todas as categorias mencionadas no CSV (mesmo em linhas ignoradas pelo parse de valores). */
export function uniqueCategoryNamesFromDespesasCsvRaw(content: string): string[] {
  const parsed = Papa.parse<Record<string, unknown>>(content, {
    header: true,
    skipEmptyLines: true,
  });
  const set = new Set<string>();
  for (const raw of parsed.data) {
    const cat = cell(raw || {}, 'categoria');
    if (cat) set.add(cat);
  }
  return [...set].sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

export function despesasRowToInsertInput(
  row: DespesasCsvRow,
  categoryId: string,
  categoryName: string
): InsertTransactionInput {
  const history = buildExpenseHistory(row.credor, row.description);
  return {
    type: 'expense',
    categoryId,
    categoryName,
    date: row.date,
    dateStr: format(row.date, 'dd/MM/yyyy'),
    history,
    credor: row.credor.trim(),
    amount: row.amount,
    description: row.description.trim(),
  };
}
