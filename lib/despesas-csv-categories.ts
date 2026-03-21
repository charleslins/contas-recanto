/**
 * Cores estáveis por nome de categoria para alinhar com `lib/Despesas.csv`.
 * O script `npm run db:sync-categories` lê o CSV; aqui definimos a paleta para os nomes conhecidos.
 */
const COLOR_BY_NAME: Record<string, string> = {
  Compras: '#f59e0b',
  'Conta - Compesa': '#06b6d4',
  'Conta - IPTU': '#ea580c',
  'Contas - Internet': '#0ea5e9',
  'Contas - Luz': '#eab308',
  Material: '#3b82f6',
  'Mão de obra': '#f43f5e',
  Outros: '#64748b',
  Serviços: '#8b5cf6',
  'Serviços - Diversos': '#6366f1',
  'Serviços - Faxina': '#14b8a6',
};

/** Cor para uma categoria do CSV (nome exacto); fallback determinístico para nomes novos no ficheiro. */
export function defaultColorForDespesasCategoryName(name: string): string {
  const fixed = COLOR_BY_NAME[name];
  if (fixed) return fixed;
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  const hue = h % 360;
  return `hsl(${hue} 42% 40%)`;
}
