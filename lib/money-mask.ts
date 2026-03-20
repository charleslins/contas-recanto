/**
 * Máscara estilo app bancário (pt-BR): dígitos entram da direita como centavos.
 * Ex.: "1" → "0,01"; "10000" → "100,00"
 */
export function formatMoneyMask(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  const numeric = Number.parseInt(digits || '0', 10) / 100;
  return numeric.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatNumberToMoneyMask(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Converte string mascarada ou texto livre (R$, milhar) para número. */
export function parseMoneyToNumber(value: string): number {
  const raw = value.replace(/[R$\s]/g, '');
  let normalized = raw;

  if (raw.includes(',') && raw.includes('.')) {
    normalized = raw.replace(/\./g, '').replace(',', '.');
  } else if (raw.includes(',')) {
    normalized = raw.replace(',', '.');
  } else {
    normalized = raw;
  }

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}
