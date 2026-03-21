import type { Category } from '@/lib/db/schema';

function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/** Rótulo normalizado para comparação (acentos, espaços). */
export function normalizeCategoryLabelForMatch(s: string): string {
  return stripDiacritics(s.trim().toLowerCase()).replace(/\s+/g, ' ');
}

/**
 * Cruza o texto da coluna `categoria` do CSV com categorias na BD.
 * Trata "Serviços - Diversos" (CSV) vs "Serviços > Diversos" (UI) e variações sem hífen.
 */
export function matchCategoryFromCsvLabel(
  categories: Category[],
  csvLabel: string,
  transactionType: 'income' | 'expense'
): Category | undefined {
  const raw = csvLabel.trim();
  if (!raw) return undefined;

  const pool = categories.filter(
    (c) => c.type === transactionType || c.type === 'both'
  );
  if (pool.length === 0) return undefined;

  const n = normalizeCategoryLabelForMatch(raw);
  const variants = new Set<string>([n]);
  variants.add(n.replace(/\s*-\s*/g, ' > '));
  variants.add(n.replace(/\s*-\s*/g, ' '));
  variants.add(n.replace(/\s*>\s*/g, ' - '));

  for (const v of variants) {
    if (!v) continue;
    const hit = pool.find((c) => normalizeCategoryLabelForMatch(c.name) === v);
    if (hit) return hit;
  }

  for (const v of variants) {
    if (v.length < 3) continue;
    const partial = pool.filter((c) => {
      const cn = normalizeCategoryLabelForMatch(c.name);
      return cn.includes(v) || v.includes(cn);
    });
    if (partial.length === 1) return partial[0];
  }

  const parts = n.split(/[\s>-]+/).filter((p) => p.length >= 2);
  if (parts.length >= 2) {
    const multi = pool.filter((c) => {
      const cn = normalizeCategoryLabelForMatch(c.name);
      return parts.every((p) => cn.includes(p));
    });
    if (multi.length === 1) return multi[0];
  }

  return undefined;
}

/**
 * Quando o CSV não casa com nenhuma categoria: preferir uma categoria "Outros" se existir;
 * senão a primeira compatível com o tipo (comportamento anterior).
 */
export function fallbackCategoryForImport(
  categories: Category[],
  type: 'income' | 'expense',
  hadCsvCategoryLabel: boolean
): Category | undefined {
  const pool = categories.filter((c) => c.type === type || c.type === 'both');
  if (hadCsvCategoryLabel && pool.length > 0) {
    const outros = pool.find((c) => normalizeCategoryLabelForMatch(c.name).includes('outros'));
    if (outros) return outros;
  }
  return defaultCategoryForType(categories, type);
}

/** Primeira categoria compatível com o tipo de transação (dados reais na BD). */
export function defaultCategoryForType(
  categories: Category[],
  type: 'income' | 'expense'
): Category | undefined {
  if (type === 'income') {
    return categories.find((c) => c.type === 'income') ?? categories.find((c) => c.type === 'both');
  }
  return categories.find((c) => c.type === 'expense') ?? categories.find((c) => c.type === 'both');
}

export function defaultCategoryIdForType(categories: Category[], type: 'income' | 'expense'): string {
  return defaultCategoryForType(categories, type)?.id ?? '';
}

export function resolveCategoryIdForForm(
  categories: Category[],
  initialData: { categoryId?: string; type?: 'income' | 'expense' } | null | undefined,
  defaultType: 'income' | 'expense'
): string {
  const t = initialData?.type ?? defaultType;
  if (initialData?.categoryId && categories.some((c) => c.id === initialData.categoryId)) {
    return initialData.categoryId;
  }
  return defaultCategoryIdForType(categories, t);
}
