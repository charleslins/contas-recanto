'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/lib/parser';
import { X, ArrowUpCircle, ArrowDownCircle, Calendar, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { useTransactions } from './transaction-context';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (t: Omit<Transaction, 'id'>) => void;
  initialData?: Transaction | null;
  defaultType?: 'income' | 'expense';
}

export function TransactionModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  defaultType = 'expense' 
}: TransactionModalProps) {
  const { categories } = useTransactions();
  const [type, setType] = useState<'income' | 'expense'>(defaultType);
  const [date, setDate] = useState<Date>(new Date());
  const [history, setHistory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('5');

  // Reset/Initialize the form
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setType(initialData.type || 'expense');
        setDate(initialData.date ? new Date(initialData.date) : new Date());
        setHistory(initialData.history || '');
        setDescription(initialData.description || '');
        setAmount(initialData.amount?.toString() || '');
        setCategoryId(initialData.categoryId || '5');
      } else {
        setType(defaultType);
        setDate(new Date());
        setHistory('');
        setDescription('');
        setAmount('');
        setCategoryId(type === 'income' ? 'income' : '5');
      }
    }
  }, [initialData, isOpen, defaultType, type]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find(c => c.id === categoryId);

    onSave({
      type,
      categoryId,
      categoryName: cat ? cat.name : 'Outros',
      date,
      dateStr: format(date, 'dd/MM/yyyy'),
      history,
      description,
      amount: parseFloat(amount) || 0,
    });
    onClose();
  };

  const filteredCategories = categories.filter(c =>
    c.type === 'both' || c.type === type || (type === 'income' && c.id === 'income')
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-all"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl transition-all animate-in zoom-in-95 duration-200">
        {/* Header decoration */}
        <div className={clsx(
          "h-2 w-full",
          type === 'income' ? "bg-emerald-500" : "bg-indigo-600"
        )} />

        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {initialData ? 'Editar Registro' : 'Novo Registro'}
            </h2>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Preencha os dados da transação</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-6 space-y-6">
          {/* Type Selector Toggle */}
          <div className="flex rounded-2xl bg-slate-100 p-1.5 ring-1 ring-slate-200/50 shadow-inner">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-widest",
                type === 'expense' ? "bg-white text-rose-600 shadow-md ring-1 ring-rose-100" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <ArrowDownCircle className="h-4 w-4" />
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-widest",
                type === 'income' ? "bg-white text-emerald-600 shadow-md ring-1 ring-emerald-100" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <ArrowUpCircle className="h-4 w-4" />
              Receita
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  <Calendar className="h-3 w-3" /> Data
                </label>
                <input
                  type="date"
                  required
                  value={format(date, 'yyyy-MM-dd')}
                  onChange={e => setDate(new Date(e.target.value + 'T00:00:00'))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-bold text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 appearance-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Valor (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="0,00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-black text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Título / Histórico</label>
              <input
                type="text"
                required
                placeholder={type === 'expense' ? "Ex: Material Hidráulico" : "Ex: Recebimento Aluguel"}
                value={history}
                onChange={e => setHistory(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-bold text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Categoria</label>
                <select
                  value={categoryId}
                  onChange={e => setCategoryId(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-bold text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 appearance-none cursor-pointer"
                >
                  {filteredCategories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Descrição</label>
                <input
                  type="text"
                  placeholder="Detalhes adicionais..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-bold text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl py-4 text-xs font-black text-slate-500 hover:bg-slate-100 transition-all uppercase tracking-widest"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black text-white transition-all shadow-lg hover:offset-2 active:scale-[0.98] uppercase tracking-widest",
                type === 'income' ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20"
              )}
            >
              <PlusCircle className="h-5 w-5" />
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
