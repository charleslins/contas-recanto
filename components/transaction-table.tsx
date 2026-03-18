'use client';

import { useState } from 'react';
import { Transaction } from '@/lib/parser';
import { Search, Edit2, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTransactions } from './transaction-context';
import { TransactionModal } from './transaction-modal';

export function TransactionTable() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter((t) => {
    const term = searchTerm.toLowerCase();
    return (
      t.history.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term) ||
      t.categoryName.toLowerCase().includes(term)
    );
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  const handleSave = (t: Omit<Transaction, 'id'>) => {
    if (editingTx) {
      updateTransaction(editingTx.id, t);
    } else {
      addTransaction(t);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 p-6 gap-4">
        <h3 className="text-lg font-semibold text-slate-800">Transações</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar transação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nova Despesa</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Data</th>
              <th className="px-6 py-4 font-medium">Histórico</th>
              <th className="px-6 py-4 font-medium">Descrição</th>
              <th className="px-6 py-4 font-medium">Categoria</th>
              <th className="px-6 py-4 text-right font-medium">Valor</th>
              <th className="px-6 py-4 text-center font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="whitespace-nowrap px-6 py-4">
                    {format(tx.date, 'dd/MM/yyyy', { locale: ptBR })}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{tx.history}</td>
                  <td className="px-6 py-4">{tx.description || '-'}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                      {tx.categoryName}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-rose-600">
                    - {formatCurrency(tx.amount)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(tx)}
                        className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-indigo-600 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-rose-600 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  Nenhuma transação encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingTx}
      />
    </div>
  );
}
