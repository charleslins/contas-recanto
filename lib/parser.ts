export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  categoryId: string;
  categoryName: string;
  date: Date;
  dateStr: string;
  /** Compatível com OFX e busca; despesas novas: credor + descrição. */
  history: string;
  /** Fornecedor / credor (despesas); receitas costumam usar só `history` (nome). */
  credor: string;
  amount: number;
  description: string;
}
