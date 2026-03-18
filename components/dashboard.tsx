'use client';

import { DashboardCards } from '@/components/dashboard-cards';
import { ExpenseCharts } from '@/components/expense-charts';
import { TransactionTable } from '@/components/transaction-table';
import { useTransactions } from '@/components/transaction-context';

export function Dashboard() {
  const { transactions } = useTransactions();
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <DashboardCards />
      <ExpenseCharts transactions={transactions} />
      <TransactionTable />
    </main>
  );
}
