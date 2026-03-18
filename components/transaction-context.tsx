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
  updateTransaction: (id: string, t: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getCategoryColor: (id: string) => string;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ 
  children, 
  initialData = [],
  initialCategories = []
}: { 
  children: React.ReactNode, 
  initialData?: Transaction[],
  initialCategories?: Category[]
}) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialData);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTransactions(initialData.map(t => ({ ...t, date: new Date(t.date) })));
    setCategories(initialCategories);
    setIsLoaded(true);
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

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-slate-500 text-lg">Carregando dados...</div>
      </div>
    );
  }

  return (
    <TransactionContext.Provider value={{ 
      transactions,
      categories,
      totalIncome, 
      totalExpense, 
      addTransaction, 
      updateTransaction, 
      deleteTransaction,
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
