import type { Transaction } from '@/lib/parser';

/** Histórico compacto para busca / compatibilidade (OFX, PDF antigo). */
export function buildExpenseHistory(credor: string, description: string): string {
  const c = credor.trim();
  const d = description.trim();
  if (c && d) return `${c} — ${d}`;
  return c || d || 'Despesa';
}

/** Preenche credor/descrição ao editar despesa antiga (só history). */
export function parseLegacyExpenseForForm(tx: Pick<Transaction, 'credor' | 'description' | 'history' | 'type'>): {
  credor: string;
  description: string;
} {
  if (tx.type !== 'expense') return { credor: '', description: '' };
  let cred = (tx.credor || '').trim();
  let desc = (tx.description || '').trim();
  if (!cred && !desc && tx.history?.includes(' — ')) {
    const i = tx.history.indexOf(' — ');
    cred = tx.history.slice(0, i).trim();
    desc = tx.history.slice(i + 3).trim();
  } else if (!cred && !desc && tx.history) {
    cred = tx.history.trim();
  }
  return { credor: cred, description: desc };
}

export function displayCredorColumn(tx: Transaction): string {
  if (tx.type === 'income') return tx.history || '';
  const c = (tx.credor || '').trim();
  if (c) return c;
  const h = tx.history || '';
  if (h.includes(' — ')) return h.slice(0, h.indexOf(' — ')).trim();
  return h.trim();
}

export function displayDescricaoColumn(tx: Transaction): string {
  if (tx.type === 'income') return tx.description || '';
  const d = (tx.description || '').trim();
  if (d) return d;
  const h = tx.history || '';
  if (h.includes(' — ')) return h.slice(h.indexOf(' — ') + 3).trim();
  return '';
}
