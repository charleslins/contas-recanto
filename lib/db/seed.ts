import { db } from './index';
import { transactions } from './schema';
import { parseTransactions } from '../parser';
import { v4 as uuidv4 } from 'uuid';

async function seed() {
  console.log('🌱 Seeding database...');
  
  const data = parseTransactions();
  console.log(`Parsed ${data.length} transactions from CSV.`);

  for (const item of data) {
    try {
      await db.insert(transactions).values({
        id: item.id || uuidv4(),
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        date: item.date,
        dateStr: item.dateStr,
        history: item.history,
        amount: item.amount,
        description: item.description,
      }).onConflictDoNothing();
    } catch (error) {
      console.error(`Error inserting transaction ${item.id}:`, error);
    }
  }

  console.log('✅ Seeding complete.');
}

seed().catch(console.error);
