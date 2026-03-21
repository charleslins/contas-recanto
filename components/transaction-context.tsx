'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Transaction } from '@/lib/parser';
import { Category } from '@/lib/db/schema';

interface TransactionContextType {
  transactions: Transaction[];
  categories: Category[];
  totalIncome: number;
  totalExpense: number;
  addTransaction: (t: Omit<Transaction, 'id'>) => Promise<void>;
  addTransactionsBulk: (rows: Omit<Transaction, 'id'>[]) => Promise<void>;
  updateTransaction: (id: string, t: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  resetTransactions: () => Promise<void>;
  resetTransactionsByType: (type: 'income' | 'expense') => Promise<void>;
  addCategory: (category: { name: string; color: string; type: 'income' | 'expense' | 'both' }) => Promise<void>;
  updateCategory: (id: string, data: { name?: string; color?: string; type?: 'income' | 'expense' | 'both' }) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  getCategoryColor: (id: string) => string;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

function normalizeTransactions(data: Transaction[]): Transaction[] {
  return data.map((t) => ({
    ...t,
    date: t.date instanceof Date ? t.date : new Date(t.date as string | number),
    credor: t.credor ?? '',
  }));
}

export function TransactionProvider({ 
  children, 
  initialData = [],
  initialCategories = []
}: { 
  children: React.ReactNode, 
  initialData?: Transaction[],
  initialCategories?: Category[]
}) {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    normalizeTransactions(initialData)
  );
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    setTransactions(normalizeTransactions(initialData));
    setCategories(initialCategories);
  }, [initialData, initialCategories]);

  const totalIncome = useMemo(() => 
    transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0)
  , [transactions]);

  const totalExpense = useMemo(() => 
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)
  , [transactions]);

  const getCategoryColor = (id: string) => {
    const category = categories.find(c => c.id === id);
    return category?.color || '#64748b'; // Default to slate-500
  };

  const addTransaction = async (t: Omit<Transaction, 'id'>) => {
    const { addTransactionAction } = await import('@/services/transaction/transaction.actions');
    const result = await addTransactionAction(t);
    if (result && result.length > 0) {
      const newTx = { ...result[0], date: new Date(result[0].date) };
      setTransactions(prev => [newTx, ...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
    }
  };

  const addTransactionsBulk = async (rows: Omit<Transaction, 'id'>[]) => {
    if (rows.length === 0) return;
    const { addTransactionsBulkAction } = await import('@/services/transaction/transaction.actions');
    const result = await addTransactionsBulkAction(rows);
    if (result.length > 0) {
      const mapped = result.map((row) => ({ ...row, date: new Date(row.date) }));
      setTransactions((prev) =>
        [...mapped, ...prev].sort((a, b) => b.date.getTime() - a.date.getTime())
      );
    }
  };

  const updateTransaction = async (id: string, t: Omit<Transaction, 'id'>) => {
    const { updateTransactionAction } = await import('@/services/transaction/transaction.actions');
    const result = await updateTransactionAction(id, t);
    if (result && result.length > 0) {
      const updatedTx = { ...result[0], date: new Date(result[0].date) };
      setTransactions(prev => prev.map(tx => tx.id === id ? updatedTx : tx).sort((a, b) => b.date.getTime() - a.date.getTime()));
    }
  };

  const deleteTransaction = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      const { deleteTransactionAction } = await import('@/services/transaction/transaction.actions');
      await deleteTransactionAction(id);
      setTransactions(prev => prev.filter(tx => tx.id !== id));
    }
  };

  const resetTransactions = async () => {
    const { clearTransactionsAction } = await import('@/services/transaction/transaction.actions');
    await clearTransactionsAction();
    setTransactions([]);
  };

  const resetTransactionsByType = async (type: 'income' | 'expense') => {
    const { clearTransactionsByTypeAction } = await import('@/services/transaction/transaction.actions');
    await clearTransactionsByTypeAction(type);
    setTransactions(prev => prev.filter(transaction => transaction.type !== type));
  };

  const addCategory = async (category: { name: string; color: string; type: 'income' | 'expense' | 'both' }) => {
    const { addCategoryAction } = await import('@/services/category/category.actions');
    const payload = {
      id: crypto.randomUUID(),
      name: category.name.trim(),
      color: category.color,
      type: category.type,
    };
    const result = await addCategoryAction(payload);
    if (result && result.length > 0) {
      setCategories(prev => [...prev, result[0]].sort((a, b) => a.name.localeCompare(b.name)));
    }
  };

  const updateCategory = async (id: string, data: { name?: string; color?: string; type?: 'income' | 'expense' | 'both' }) => {
    const { updateCategoryAction } = await import('@/services/category/category.actions');
    const payload = {
      ...(data.name ? { name: data.name.trim() } : {}),
      ...(data.color ? { color: data.color } : {}),
      ...(data.type ? { type: data.type } : {}),
    };
    const result = await updateCategoryAction(id, payload);
    if (result && result.length > 0) {
      const updatedCategory = result[0];
      setCategories(prev =>
        prev
          .map(category => (category.id === id ? updatedCategory : category))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
      setTransactions(prev =>
        prev.map(transaction =>
          transaction.categoryId === id
            ? { ...transaction, categoryName: updatedCategory.name }
            : transaction
        )
      );
    }
  };

  const deleteCategory = async (id: string) => {
    const categoryInUse = transactions.some(transaction => transaction.categoryId === id);
    if (categoryInUse) {
      throw new Error('Esta categoria possui transações associadas. Reclassifique antes de remover.');
    }

    const { deleteCategoryAction } = await import('@/services/category/category.actions');
    await deleteCategoryAction(id);
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions,
      categories,
      totalIncome, 
      totalExpense, 
      addTransaction,
      addTransactionsBulk,
      updateTransaction, 
      deleteTransaction,
      resetTransactions,
      resetTransactionsByType,
      addCategory,
      updateCategory,
      deleteCategory,
      getCategoryColor
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error('useTransactions must be used within TransactionProvider');
  return context;
};
