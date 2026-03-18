'use server';

import { getTransactions, addTransaction, deleteTransaction } from './transaction.service';
import { revalidatePath } from 'next/cache';

export async function getTransactionsAction() {
  return await getTransactions();
}

export async function addTransactionAction(data: any) {
  const result = await addTransaction(data);
  revalidatePath('/');
  return result;
}

export async function deleteTransactionAction(id: string) {
  await deleteTransaction(id);
  revalidatePath('/');
}
