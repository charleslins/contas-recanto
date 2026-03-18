import { db } from '@/lib/db';
import { transactions } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function getTransactions() {
  return await db.query.transactions.findMany({
    orderBy: [desc(transactions.date)],
  });
}

export async function addTransaction(data: any) {
  return await db.insert(transactions).values(data).returning();
}

export async function updateTransaction(id: string, data: any) {
  return await db.update(transactions).set(data).where(eq(transactions.id, id)).returning();
}

export async function deleteTransaction(id: string) {
  return await db.delete(transactions).where(eq(transactions.id, id));
}
