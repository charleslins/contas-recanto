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
