'use client';

import { ArrowDownCircle, ArrowUpCircle, Wallet, Plus } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTransactions } from './transaction-context';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DashboardCardsProps {
  onAdd: (type: 'income' | 'expense') => void;
}

export function DashboardCards({ onAdd }: DashboardCardsProps) {
  const { totalIncome, totalExpense } = useTransactions();
  const balance = totalIncome - totalExpense;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Receitas Card */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-50/10 group transition-all hover:shadow-emerald-100/20">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-emerald-50/50 blur-3xl transition-all group-hover:bg-emerald-100/50" />
          <div className="flex items-center justify-between relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-600/70">Receitas</h3>
            <div className="bg-emerald-50 p-2 rounded-xl">
              <ArrowUpCircle className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
          <div className="mt-4 relative z-10">
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{formatCurrency(totalIncome)}</p>
            <p className="mt-1 text-[10px] font-black text-slate-400 uppercase tracking-widest text-opacity-80">Total de entradas</p>
          </div>
          <button
            onClick={() => onAdd('income')}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-[10px] font-black text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 active:scale-[0.98] uppercase tracking-widest"
          >
            <Plus className="h-4 w-4" />
            Nova Receita
          </button>
        </div>

        {/* Despesas Card */}
        <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-50/10 group transition-all hover:shadow-rose-100/20">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-rose-50/50 blur-3xl transition-all group-hover:bg-rose-100/50" />
          <div className="flex items-center justify-between relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-rose-600/70">Despesas</h3>
            <div className="bg-rose-50 p-2 rounded-xl">
              <ArrowDownCircle className="h-5 w-5 text-rose-500" />
            </div>
          </div>
          <div className="mt-4 relative z-10">
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{formatCurrency(totalExpense)}</p>
            <p className="mt-1 text-[10px] font-black text-slate-400 uppercase tracking-widest text-opacity-80">Total de saídas</p>
          </div>
          <button
            onClick={() => onAdd('expense')}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 py-3.5 text-[10px] font-black text-white transition-all hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-200 active:scale-[0.98] uppercase tracking-widest"
          >
            <Plus className="h-4 w-4" />
            Nova Despesa
          </button>
        </div>

        {/* Saldo Geral Card - No Background Preto como solicitado */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 group transition-all hover:shadow-indigo-100/30">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-indigo-50/50 blur-3xl" />
          <div className="flex items-center justify-between relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Saldo Geral</h3>
            <div className="bg-slate-100 p-2 rounded-xl">
              <Wallet className={cn("h-5 w-5", balance >= 0 ? "text-emerald-500" : "text-rose-500")} />
            </div>
          </div>
          <div className="mt-4 relative z-10">
            <p className={cn(
              "text-3xl font-black tracking-tighter",
              balance >= 0 ? "text-slate-900" : "text-rose-600"
            )}>
              {formatCurrency(balance)}
            </p>
            <p className="mt-1 text-[10px] font-black text-slate-400 uppercase tracking-widest text-opacity-80">Balanço disponível</p>
          </div>
          <div className="mt-8 flex items-center justify-between gap-4">
             <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                <div
                  className={cn("h-full rounded-full transition-all duration-700 ease-out", balance >= 0 ? "bg-emerald-500" : "bg-rose-500")}
                  style={{ width: `${Math.min(100, Math.max(5, (totalIncome > 0 ? (balance / totalIncome) * 100 : 0)))}%` }}
                />
             </div>
             <span className="text-[10px] font-black text-slate-400">{Math.round((totalIncome > 0 ? (balance / totalIncome) * 100 : 0))}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
