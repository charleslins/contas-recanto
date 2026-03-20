import { db } from './index';
import { transactions, categories } from './schema';

const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Mão de obra', color: '#f43f5e', type: 'expense' as const },
  { id: '2', name: 'Contas', color: '#f59e0b', type: 'expense' as const },
  { id: '3', name: 'Material', color: '#3b82f6', type: 'expense' as const },
  { id: '4', name: 'Serviços', color: '#8b5cf6', type: 'expense' as const },
  { id: 'income', name: 'Receita', color: '#10b981', type: 'income' as const },
  { id: '5', name: 'Outros', color: '#64748b', type: 'both' as const },
];

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Clear existing data
  console.log('Cleaning tables...');
  await db.delete(transactions);
  await db.delete(categories);

  // 2. Insert Categories
  console.log('Inserting categories...');
  await db.insert(categories).values(DEFAULT_CATEGORIES);
  console.log('✅ Seeding complete (somente categorias padrão).');
}

seed().catch(console.error);
