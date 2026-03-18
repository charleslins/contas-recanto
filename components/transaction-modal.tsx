'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/lib/parser';
import { X } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (t: Omit<Transaction, 'id'>) => void;
  initialData?: Transaction | null;
}

const CATEGORIES = [
  { id: '1', name: 'Mão de obra' },
  { id: '2', name: 'Contas' },
  { id: '3', name: 'Material' },
  { id: '4', name: 'Serviços' },
  { id: '5', name: 'Outros' },
];

export function TransactionModal({ isOpen, onClose, onSave, initialData }: TransactionModalProps) {
  const [dateStr, setDateStr] = useState('');
  const [history, setHistory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('5');

  useEffect(() => {
    if (initialData) {
      setDateStr(format(initialData.date, 'yyyy-MM-dd'));
      setHistory(initialData.history);
      setDescription(initialData.description);
      setAmount(initialData.amount.toString());
      setCategoryId(initialData.categoryId);
    } else {
      setDateStr(format(new Date(), 'yyyy-MM-dd'));
      setHistory('');
      setDescription('');
      setAmount('');
      setCategoryId('5');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = CATEGORIES.find(c => c.id === categoryId);
    
    // Parse date from YYYY-MM-DD
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    onSave({
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            {initialData ? 'Editar Despesa' : 'Nova Despesa'}
          </h2>
          <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
            <input 
              type="date" 
              required 
              value={dateStr} 
              onChange={e => setDateStr(e.target.value)} 
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Histórico (Título)</label>
            <input 
              type="text" 
              required 
              placeholder="Ex: Compra de cimento"
              value={history} 
              onChange={e => setHistory(e.target.value)} 
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descrição (Opcional)</label>
            <input 
              type="text" 
              placeholder="Detalhes adicionais..."
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
              <select 
                value={categoryId} 
                onChange={e => setCategoryId(e.target.value)} 
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-white"
              >
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Valor (R$)</label>
              <input 
                type="number" 
                step="0.01" 
                min="0"
                required 
                placeholder="0,00"
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" 
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose} 
              className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Salvar Despesa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
