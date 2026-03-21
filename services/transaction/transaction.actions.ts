'use server';

import {
  getTransactions,
  addTransaction,
  addTransactionsBatch,
  deleteTransaction,
  updateTransaction,
  clearTransactions,
  clearTransactionsByType,
} from './transaction.service';
import { revalidatePath } from 'next/cache';
import {
  insertTransactionSchema,
  insertTransactionBatchSchema,
  updateTransactionSchema,
} from '@/lib/validations/transaction';

export async function getTransactionsAction() {
  return await getTransactions();
}

export async function addTransactionAction(data: unknown) {
  const parsed = insertTransactionSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join('; ') || 'Dados da transação inválidos');
  }
  const result = await addTransaction(parsed.data);
  revalidatePath('/');
  return result;
}

export async function addTransactionsBulkAction(rows: unknown) {
  const parsed = insertTransactionBatchSchema.safeParse(rows);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join('; ') || 'Lote de transações inválido');
  }
  const result = await addTransactionsBatch(parsed.data);
  revalidatePath('/');
  return result;
}

export async function updateTransactionAction(id: string, data: unknown) {
  const parsed = updateTransactionSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join('; ') || 'Dados da transação inválidos');
  }
  const result = await updateTransaction(id, parsed.data);
  revalidatePath('/');
  return result;
}

export async function deleteTransactionAction(id: string) {
  await deleteTransaction(id);
  revalidatePath('/');
}

export async function clearTransactionsAction() {
  await clearTransactions();
  revalidatePath('/');
}

export async function clearTransactionsByTypeAction(type: 'income' | 'expense') {
  await clearTransactionsByType(type);
  revalidatePath('/');
}
