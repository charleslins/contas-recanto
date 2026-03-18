'use client';

import { useState } from 'react';
import { DashboardCards } from '@/components/dashboard-cards';
import { ExpenseCharts } from '@/components/expense-charts';
import { TransactionTable } from '@/components/transaction-table';
import { useTransactions } from '@/components/transaction-context';
import { TransactionModal } from './transaction-modal';
import { Transaction } from '@/lib/parser';

export function Dashboard() {
  const { transactions, addTransaction, updateTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [defaultType, setDefaultType] = useState<'income' | 'expense'>('expense');

  const handleAdd = (type: 'income' | 'expense' = 'expense') => {
    setDefaultType(type);
    setEditingTx(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleSave = (t: Omit<Transaction, 'id'>) => {
    if (editingTx) {
      updateTransaction(editingTx.id, t);
    } else {
      addTransaction(t);
    }
    setIsModalOpen(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <DashboardCards onAdd={handleAdd} />
      <ExpenseCharts transactions={transactions} />
      <TransactionTable onAdd={handleAdd} onEdit={handleEdit} />
      
      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingTx}
        defaultType={defaultType}
      />
    </main>
  );
}
