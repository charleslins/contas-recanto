'use client';

import { ArrowDownCircle, ArrowUpCircle, RotateCcw, Wallet } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTransactions } from './transaction-context';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DashboardCardsProps {
  onResetType: (type: 'income' | 'expense') => Promise<void>;
}

export function DashboardCards({ onResetType }: DashboardCardsProps) {
  const { totalIncome, totalExpense } = useTransactions();
  const balance = totalIncome - totalExpense;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-4 shadow-lg shadow-emerald-50/10 group transition-all hover:shadow-emerald-100/20">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-emerald-50/50 blur-3xl transition-all group-hover:bg-emerald-100/50" />
          <div className="flex items-center justify-between relative z-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Receitas</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                title="Resetar receitas"
                onClick={async () => {
                  if (!confirm('Apagar somente as receitas?')) return;
                  await onResetType('income');
                }}
                className="rounded-lg p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <ArrowUpCircle className="h-7 w-7 text-emerald-600" />
            </div>
          </div>
          <div className="mt-2 relative z-10">
            <p className="text-3xl font-semibold text-indigo-600 tracking-tight">{formatCurrency(totalIncome)}</p>
            <p className="mt-1 text-sm font-normal text-slate-500">Total de entradas</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-white p-4 shadow-lg shadow-rose-50/10 group transition-all hover:shadow-rose-100/20">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-rose-50/50 blur-3xl transition-all group-hover:bg-rose-100/50" />
          <div className="flex items-center justify-between relative z-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-rose-700">Despesas</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                title="Resetar despesas"
                onClick={async () => {
                  if (!confirm('Apagar somente as despesas?')) return;
                  await onResetType('expense');
                }}
                className="rounded-lg p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <ArrowDownCircle className="h-7 w-7 text-rose-600" />
            </div>
          </div>
          <div className="mt-2 relative z-10">
            <p className="text-3xl font-semibold text-rose-600 tracking-tight">{formatCurrency(totalExpense)}</p>
            <p className="mt-1 text-sm font-normal text-slate-500">Total de saídas</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-100 group transition-all hover:shadow-indigo-100/30">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-indigo-50/50 blur-3xl" />
          <div className="flex items-center justify-between relative z-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-600">Saldo Geral</h3>
            <Wallet className={cn("h-7 w-7", balance >= 0 ? "text-emerald-500" : "text-rose-500")} />
          </div>
          <div className="mt-2 relative z-10">
            <p className={cn(
              "text-3xl font-semibold tracking-tight",
              balance >= 0 ? "text-slate-900" : "text-rose-600"
            )}>
              {formatCurrency(balance)}
            </p>
            <p className="mt-1 text-sm font-normal text-slate-500">Balanco disponivel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
