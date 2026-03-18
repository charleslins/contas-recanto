'use server';

import { getTransactions, addTransaction, deleteTransaction, updateTransaction } from './transaction.service';
import { revalidatePath } from 'next/cache';

export async function getTransactionsAction() {
  return await getTransactions();
}

export async function addTransactionAction(data: any) {
  const result = await addTransaction(data);
  revalidatePath('/');
  return result;
}

export async function updateTransactionAction(id: string, data: any) {
  const result = await updateTransaction(id, data);
  revalidatePath('/');
  return result;
}

export async function deleteTransactionAction(id: string) {
  await deleteTransaction(id);
  revalidatePath('/');
}
