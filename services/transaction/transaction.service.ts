import { db } from '@/lib/db';
import { transactions, type NewTransaction } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { InsertTransactionInput, UpdateTransactionInput } from '@/lib/validations/transaction';

export async function getTransactions() {
  return await db.query.transactions.findMany({
    orderBy: [desc(transactions.date)],
  });
}

function toRow(input: InsertTransactionInput, id: string): NewTransaction {
  return {
    id,
    type: input.type,
    categoryId: input.categoryId,
    categoryName: input.categoryName,
    date: input.date,
    dateStr: input.dateStr,
    history: input.history,
    credor: input.credor,
    amount: input.amount,
    description: input.description,
  };
}

export async function addTransaction(data: InsertTransactionInput) {
  const id = crypto.randomUUID();
  return await db.insert(transactions).values(toRow(data, id)).returning();
}

export async function addTransactionsBatch(rows: InsertTransactionInput[]) {
  if (rows.length === 0) return [];
  const values: NewTransaction[] = rows.map((row) => toRow(row, crypto.randomUUID()));
  return await db.insert(transactions).values(values).returning();
}

export async function updateTransaction(id: string, data: UpdateTransactionInput) {
  const patch: Partial<NewTransaction> = {};
  if (data.type !== undefined) patch.type = data.type;
  if (data.categoryId !== undefined) patch.categoryId = data.categoryId;
  if (data.categoryName !== undefined) patch.categoryName = data.categoryName;
  if (data.date !== undefined) patch.date = data.date;
  if (data.dateStr !== undefined) patch.dateStr = data.dateStr;
  if (data.history !== undefined) patch.history = data.history;
  if (data.credor !== undefined) patch.credor = data.credor;
  if (data.amount !== undefined) patch.amount = data.amount;
  if (data.description !== undefined) patch.description = data.description;
  if (Object.keys(patch).length === 0) {
    return await db.query.transactions.findFirst({ where: eq(transactions.id, id) }).then((r) => (r ? [r] : []));
  }
  return await db.update(transactions).set(patch).where(eq(transactions.id, id)).returning();
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
