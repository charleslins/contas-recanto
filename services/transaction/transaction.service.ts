import { db } from '@/lib/db';
import { transactions } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function getTransactions() {
  return await db.query.transactions.findMany({
    orderBy: [desc(transactions.date)],
  });
}

export async function addTransaction(data: any) {
  const payload = {
    ...data,
    id: data?.id || crypto.randomUUID(),
  };
  return await db.insert(transactions).values(payload).returning();
}

export async function updateTransaction(id: string, data: any) {
  return await db.update(transactions).set(data).where(eq(transactions.id, id)).returning();
}

export async function deleteTransaction(id: string) {
  return await db.delete(transactions).where(eq(transactions.id, id));
}

export async function clearTransactions() {
  return await db.delete(transactions);
}

export async function clearTransactionsByType(type: 'income' | 'expense') {
  return await db.delete(transactions).where(eq(transactions.type, type));
}
