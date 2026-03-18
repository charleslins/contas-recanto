'use client';

import { useState } from 'react';
import { 
  Search, Edit2, Trash2, Plus, ArrowUpCircle, 
  ArrowDownCircle, Filter, FileText, Download, 
  Upload, ChevronLeft, ChevronRight, ChevronDown 
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTransactions } from './transaction-context';
import { clsx } from 'clsx';
import { exportToPDF } from '@/lib/import-utils';
import { Transaction } from '@/lib/parser';

interface TransactionTableProps {
  onAdd: (type?: 'income' | 'expense') => void;
  onEdit: (tx: Transaction) => void;
}

export function TransactionTable({ onAdd, onEdit }: TransactionTableProps) {
  const { transactions, categories, addTransaction, deleteTransaction, getCategoryColor } = useTransactions();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const filteredTransactions = transactions.filter((t) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term || (
      t.history.toLowerCase().includes(term) ||
      (t.description || '').toLowerCase().includes(term) ||
      t.categoryName.toLowerCase().includes(term)
    );
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || t.categoryId === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + pageSize);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (file.name.endsWith('.ofx')) {
        const { parseOFX } = await import('@/lib/import-utils');
        const imported = await parseOFX(content);
        imported.forEach((tx: any) => addTransaction(tx));
      } else {
        // Simple CSV parser for quick imports
        const lines = content.split('\n').filter(l => l.trim());
        const startIdx = lines[0].toLowerCase().includes('data') ? 1 : 0;
        lines.slice(startIdx).forEach(line => {
          const parts = line.split(',');
          if (parts.length >= 3) {
            const [dateStr, history, amountStr] = parts;
            const amount = parseFloat(amountStr?.replace(/"/g, '').replace(/\./g, '').replace(',', '.') || '0');
            addTransaction({
              date: new Date(dateStr),
              history: history || 'Importado',
              amount: Math.abs(amount),
              categoryId: '5',
              categoryName: 'Outros',
              type: amount >= 0 ? 'income' : 'expense',
              dateStr: dateStr,
              description: ''
            });
          }
        });
      }
      alert('Importação concluída!');
    };
    reader.readAsText(file);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden transition-all">
      <div className="flex flex-col border-b border-slate-100 p-8 gap-8">
        {/* Row 1: Large Title */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Transações</h2>
            <p className="text-xs font-black text-indigo-500 mt-2 uppercase tracking-[0.2em] opacity-80">Gestão de Fluxo de Caixa</p>
          </div>
          
          {/* Action Buttons Group - Proeminent with Text */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => exportToPDF(filteredTransactions, 'Relatório de Transações')}
              className="flex items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white px-6 py-3.5 text-[10px] font-black text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 shadow-sm uppercase tracking-widest"
            >
              <FileText className="h-4 w-4 text-indigo-500" />
              <span>Exportar PDF</span>
            </button>

            <input
              type="file"
              id="import-tx-file-table"
              className="hidden"
              accept=".csv,.ofx"
              onChange={handleFileUpload}
            />
            <button 
              className="flex items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white px-6 py-3.5 text-[10px] font-black text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 shadow-sm uppercase tracking-widest"
              onClick={() => document.getElementById('import-tx-file-table')?.click()}
            >
              <Upload className="h-4 w-4 text-emerald-500" />
              <span>Importar Dados</span>
            </button>

            <button 
              onClick={() => onAdd()}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-xs font-black text-white hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200 uppercase tracking-widest"
            >
              <Plus className="h-5 w-5" />
              <span>1 Novo registro</span>
            </button>
          </div>
        </div>
        
        {/* Row 2: Filters and Search */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          {/* Type Filters */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl ring-1 ring-slate-200/50 shadow-inner">
            <button
              onClick={() => { setTypeFilter('all'); setCurrentPage(1); }}
              className={clsx(
                "px-6 py-2.5 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest",
                typeFilter === 'all' ? "bg-white text-slate-900 shadow-md" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Todos
            </button>
            <button
              onClick={() => { setTypeFilter('income'); setCurrentPage(1); }}
              className={clsx(
                "flex items-center gap-2 px-6 py-2.5 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest",
                typeFilter === 'income' ? "bg-white text-emerald-600 shadow-md" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <ArrowUpCircle className="h-4 w-4" />
              Receitas
            </button>
            <button
              onClick={() => { setTypeFilter('expense'); setCurrentPage(1); }}
              className={clsx(
                "flex items-center gap-2 px-6 py-2.5 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest",
                typeFilter === 'expense' ? "bg-white text-rose-600 shadow-md" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <ArrowDownCircle className="h-4 w-4" />
              Despesas
            </button>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden md:block" />

          {/* Category Filter - Proeminent */}
          <div className="relative flex items-center bg-slate-100 p-1.5 rounded-2xl ring-1 ring-slate-200/50 min-w-[240px]">
            <Filter className="h-3.5 w-3.5 text-slate-400 ml-3" />
            <select 
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="flex-1 text-[10px] bg-transparent border-none py-2 pl-2 pr-10 focus:ring-0 text-slate-900 font-black cursor-pointer appearance-none uppercase tracking-widest"
            >
              <option value="all">Filtro por Categoria</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Search Bar - Expanded */}
          <div className="relative flex-1 min-w-[320px]">
            <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="PESQUISAR NOS REGISTROS..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-2xl border-2 border-slate-100 py-3.5 pl-14 pr-6 text-[10px] font-black outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 bg-slate-50/50 hover:bg-white transition-all uppercase tracking-widest placeholder:text-slate-300"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-[10px] uppercase font-black tracking-widest text-slate-400 border-b border-slate-100">
            <tr>
              <th className="px-10 py-6">Data</th>
              <th className="px-10 py-6">Histórico & Detalhes</th>
              <th className="px-10 py-6">Faturamento</th>
              <th className="px-10 py-6 text-right">Valor Líquido</th>
              <th className="px-10 py-6 text-center">Gestão</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="whitespace-nowrap px-10 py-7">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                       {format(tx.date, 'EEEE', { locale: ptBR })}
                    </div>
                    <div className="text-sm font-black text-slate-900 mt-0.5">
                       {format(tx.date, 'dd/MM/yyyy')}
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="font-black text-slate-900 text-lg tracking-tight leading-none">{tx.history}</div>
                    {tx.description && (
                      <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-indigo-50/50 px-2.5 py-1.5 text-[10px] font-bold text-indigo-500/80 border border-indigo-100/50">
                        <FileText className="h-3 w-3" />
                        {tx.description}
                      </div>
                    )}
                  </td>
                  <td className="px-10 py-7">
                    <span 
                      className="inline-flex items-center rounded-xl px-4 py-2 text-[10px] uppercase tracking-widest font-black text-white shadow-lg shadow-current/10"
                      style={{ backgroundColor: getCategoryColor(tx.categoryId) }}
                    >
                      {tx.categoryName}
                    </span>
                  </td>
                  <td className={clsx(
                    "whitespace-nowrap px-10 py-7 text-right font-black tabular-nums text-lg tracking-tight",
                    tx.type === 'income' ? "text-emerald-600" : "text-slate-800"
                  )}>
                    {tx.type === 'income' ? '+' : ''} {formatCurrency(tx.amount)}
                  </td>
                  <td className="whitespace-nowrap px-10 py-7 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(tx)}
                        className="rounded-xl bg-white p-2.5 text-slate-400 hover:text-indigo-600 hover:shadow-xl transition-all active:scale-90 border border-slate-100"
                        title="Configurações"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="rounded-xl bg-white p-2.5 text-slate-400 hover:text-rose-600 hover:shadow-xl transition-all active:scale-90 border border-slate-100"
                        title="Remover"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-10 py-32 text-center">
                  <div className="flex flex-col items-center gap-6">
                    <div className="bg-slate-50 p-10 rounded-full ring-8 ring-slate-25">
                      <Search className="h-12 w-12 text-slate-200" />
                    </div>
                    <div className="space-y-1">
                       <p className="text-slate-900 font-black uppercase tracking-widest text-sm">Nada por aqui</p>
                       <p className="text-slate-400 text-xs font-bold">Ajuste seus filtros para encontrar transações</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer styled as Premium */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-10 py-8">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Visualizando <span className="text-indigo-600">{paginatedTransactions.length}</span> de <span className="text-slate-900">{filteredTransactions.length}</span> registros
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); }}
            disabled={currentPage === 1}
            className="flex items-center justify-center h-12 w-12 rounded-2xl border-2 border-slate-100 bg-white text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-all shadow-sm active:scale-90"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-2 px-2">
             <span className="text-xs font-black text-slate-900">Página {currentPage} / {totalPages || 1}</span>
          </div>

          <button
            onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); }}
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex items-center justify-center h-12 w-12 rounded-2xl border-2 border-slate-100 bg-white text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-all shadow-sm active:scale-90"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
