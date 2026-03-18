'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, parseTransactions } from '@/lib/parser';

interface TransactionContextType {
  transactions: Transaction[];
  revenue: number;
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, t: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateRevenue: (amount: number) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ 
  children, 
  initialData = [] 
}: { 
  children: React.ReactNode, 
  initialData?: Transaction[] 
}) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialData);
  const [revenue, setRevenue] = useState(19141.35);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedRev = localStorage.getItem('finance_revenue');
    if (savedRev) {
      setRevenue(parseFloat(savedRev));
    }

    if (initialData && initialData.length > 0) {
      setTransactions(initialData);
      setIsLoaded(true);
      return;
    }

    const savedTx = localStorage.getItem('finance_transactions');
    if (savedTx) {
      try {
        const parsed = JSON.parse(savedTx).map((t: any) => ({
          ...t, 
          date: new Date(t.date)
        }));
        setTransactions(parsed);
      } catch (e) {
        setTransactions(parseTransactions());
      }
    } else {
      setTransactions(parseTransactions());
    }
    
    setIsLoaded(true);
  }, [initialData]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('finance_transactions', JSON.stringify(transactions));
      localStorage.setItem('finance_revenue', revenue.toString());
    }
  }, [transactions, revenue, isLoaded]);

  const addTransaction = async (t: Omit<Transaction, 'id'>) => {
    const { addTransactionAction } = await import('@/services/transaction/transaction.actions');
    const result = await addTransactionAction(t);
    if (result && result.length > 0) {
      setTransactions(prev => [result[0], ...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
    }
  };

  const updateTransaction = (id: string, t: Omit<Transaction, 'id'>) => {
    // For now, keep local if not implemented in server yet
    setTransactions(prev => prev.map(tx => tx.id === id ? { ...t, id } : tx).sort((a, b) => b.date.getTime() - a.date.getTime()));
  };

  const deleteTransaction = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      const { deleteTransactionAction } = await import('@/services/transaction/transaction.actions');
      await deleteTransactionAction(id);
      setTransactions(prev => prev.filter(tx => tx.id !== id));
    }
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-pulse text-slate-500">Carregando dados...</div></div>;
  }

  return (
    <TransactionContext.Provider value={{ transactions, revenue, addTransaction, updateTransaction, deleteTransaction, updateRevenue: setRevenue }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error('useTransactions must be used within TransactionProvider');
  return context;
};
