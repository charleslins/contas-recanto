import { db } from './index';
import { transactions, categories } from './schema';
import { parseTransactions, parseRevenueTransactions } from '../parser';
import { rawCsv, rawRevenueCsv } from '../csv-data';
import { v4 as uuidv4 } from 'uuid';

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

  // 3. Parse and Insert Transactions
  const expenses = parseTransactions(rawCsv);
  const revenues = parseRevenueTransactions(rawRevenueCsv);

  const allData = [...expenses, ...revenues];
  console.log(`Parsed ${expenses.length} expenses and ${revenues.length} revenues.`);

  for (const item of allData) {
    try {
      await db.insert(transactions).values({
        id: item.id || uuidv4(),
        type: item.type,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        date: item.date,
        dateStr: item.dateStr,
        history: item.history,
        amount: item.amount,
        description: item.description || '',
      }).onConflictDoNothing();
    } catch (error) {
      console.error(`Error inserting transaction ${item.id}:`, error);
    }
  }

  console.log('✅ Seeding complete.');
}

seed().catch(console.error);
