'use client';

import { ArrowDownCircle, ArrowUpCircle, Wallet, Edit2, Check, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTransactions } from './transaction-context';
import { useState } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function DashboardCards() {
  const { transactions, revenue, updateRevenue } = useTransactions();
  
  const [isEditing, setIsEditing] = useState(false);
  const [revenueInput, setRevenueInput] = useState(revenue.toString());

  const totalExpense = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = revenue - totalExpense;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleSaveRevenue = () => {
    const val = parseFloat(revenueInput);
    if (!isNaN(val)) {
      updateRevenue(val);
    }
    setIsEditing(false);
  };

  const handleCancelRevenue = () => {
    setRevenueInput(revenue.toString());
    setIsEditing(false);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm group">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-500">Receitas</h3>
          <ArrowUpCircle className="h-5 w-5 text-emerald-500" />
        </div>
        <div className="mt-4">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                step="0.01"
                value={revenueInput}
                onChange={e => setRevenueInput(e.target.value)}
                className="w-full rounded border border-slate-300 px-2 py-1 text-xl font-bold text-slate-900 outline-none focus:border-emerald-500"
                autoFocus
              />
              <button onClick={handleSaveRevenue} className="text-emerald-600 hover:text-emerald-700">
                <Check className="h-5 w-5" />
              </button>
              <button onClick={handleCancelRevenue} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-slate-900">{formatCurrency(revenue)}</p>
              <button 
                onClick={() => setIsEditing(true)} 
                className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600 p-1"
                title="Editar receita"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          )}
          <p className="mt-1 text-sm text-slate-500">Valor inicial destinado</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-500">Despesas</h3>
          <ArrowDownCircle className="h-5 w-5 text-rose-500" />
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-slate-900">{formatCurrency(totalExpense)}</p>
          <p className="mt-1 text-sm text-slate-500">Total gasto na reforma</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-500">Saldo</h3>
          <Wallet className={cn("h-5 w-5", balance >= 0 ? "text-emerald-500" : "text-rose-500")} />
        </div>
        <div className="mt-4">
          <p className={cn("text-3xl font-bold", balance >= 0 ? "text-emerald-600" : "text-rose-600")}>
            {formatCurrency(balance)}
          </p>
          <p className="mt-1 text-sm text-slate-500">Balanço atual</p>
        </div>
      </div>
    </div>
  );
}
