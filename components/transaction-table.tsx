'use client';

import { useState } from 'react';
import { 
  Search, Edit2, Trash2, Plus, ArrowUpCircle, 
  ArrowDownCircle, Filter, FileText,
  Upload, ChevronLeft, ChevronRight, ChevronDown 
} from 'lucide-react';
import { format, isValid, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTransactions } from './transaction-context';
import { clsx } from 'clsx';
import { exportToPDF } from '@/lib/import-utils';
import { Transaction } from '@/lib/parser';
import { CategoryManager } from './category-manager';

interface TransactionTableProps {
  onAdd: (type?: 'income' | 'expense') => void;
  onEdit: (tx: Transaction) => void;
}

interface PendingImport {
  fileName: string;
  detectedType: string;
  rows: Omit<Transaction, 'id'>[];
  total: number;
}

export function TransactionTable({ onAdd, onEdit }: TransactionTableProps) {
  const { transactions, categories, addTransaction, deleteTransaction, getCategoryColor } = useTransactions();
  const [importMode, setImportMode] = useState<'auto' | 'expense' | 'income'>('auto');
  const [pendingImport, setPendingImport] = useState<PendingImport | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('expense');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const filteredTransactions = transactions.filter((t) => {
    const term = normalizeText(searchTerm.trim());
    const dateLabel = format(t.date, 'dd/MM/yyyy');
    const amountLabel = formatCurrency(t.amount);
    const searchableFields = [
      t.history,
      t.description || '',
      t.categoryName,
      dateLabel,
      amountLabel,
      t.amount.toString(),
    ].map(normalizeText);
    const matchesSearch = !term || searchableFields.some((field) => field.includes(term));
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || t.categoryId === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + pageSize);

  const parseAmount = (raw: string) => {
    const normalized = raw.replace(/[R$\s"]/g, '');
    let cleaned = normalized;

    if (normalized.includes(',') && normalized.includes('.')) {
      // Formato pt-BR com milhar e decimal (ex: 1.044,00)
      cleaned = normalized.replace(/\./g, '').replace(',', '.');
    } else if (normalized.includes(',')) {
      // Decimal com vírgula (ex: 74,34)
      cleaned = normalized.replace(',', '.');
    } else {
      // Decimal com ponto (ex: 74.34)
      cleaned = normalized;
    }

    const amount = Number.parseFloat(cleaned);
    return Number.isFinite(amount) ? amount : 0;
  };

  const parseAmountLikeBrazilianSheets = (raw: string) => {
    const normalized = raw.replace(/[R$\s"]/g, '');
    // Em planilhas pt-BR, valores como "74.34" costumam ser texto e não entram no SUM.
    if (normalized.includes('.') && !normalized.includes(',')) return 0;
    return parseAmount(raw);
  };

  const parseDate = (value: string) => {
    const nativeDate = new Date(value);
    if (isValid(nativeDate)) return nativeDate;
    const brDate = parse(value, 'dd/MM/yyyy', new Date());
    if (isValid(brDate)) return brDate;
    return new Date();
  };

  const getDefaultCategory = (type: 'income' | 'expense') => {
    if (type === 'income') {
      return categories.find((category) => category.id === 'income' || category.type === 'income' || category.type === 'both');
    }
    return categories.find((category) => category.type === 'expense' || category.type === 'both');
  };

  const matchCategoryByName = (name: string) => {
    const normalized = name.trim().toLowerCase();
    if (!normalized) return null;
    return categories.find((category) => category.name.trim().toLowerCase() === normalized) ?? null;
  };

  const buildRowsFromFileContent = async (content: string, fileName: string) => {
    const rows: Omit<Transaction, 'id'>[] = [];
    let detectedType = 'Misto (auto)';

    if (fileName.toLowerCase().endsWith('.ofx')) {
      detectedType = 'OFX';
      const { parseOFX } = await import('@/lib/import-utils');
      const imported = await parseOFX(content);
      for (const tx of imported) {
        const detectedType = tx.type === 'income' ? 'income' : 'expense';
        const type = importMode === 'auto' ? detectedType : importMode;
        const fallbackCategory = getDefaultCategory(type);
        rows.push({
          date: tx.date ? new Date(tx.date) : new Date(),
          history: tx.history || 'Importado OFX',
          amount: Math.abs(tx.amount || 0),
          categoryId: tx.categoryId || fallbackCategory?.id || (type === 'income' ? 'income' : '5'),
          categoryName: tx.categoryName || fallbackCategory?.name || 'Outros',
          type,
          dateStr: tx.dateStr || format(new Date(), 'dd/MM/yyyy'),
          description: tx.description || ''
        });
      }
      return { rows, detectedType };
    }

    const Papa = (await import('papaparse')).default;
    const firstLine = content.split('\n')[0] || '';
    const delimiter = (firstLine.match(/;/g)?.length || 0) > (firstLine.match(/,/g)?.length || 0) ? ';' : ',';
    const parsed = Papa.parse<Record<string, string>>(content, {
      header: true,
      delimiter,
      skipEmptyLines: true,
    });

    const normalizedHeaders = (parsed.meta.fields || []).map((field) =>
      field
        .replace(/^\uFEFF/, '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
    );
    const isRevenueTemplate =
      normalizedHeaders.includes('nome') &&
      normalizedHeaders.includes('chegada') &&
      normalizedHeaders.includes('total');
    const isExpenseTemplate =
      normalizedHeaders.includes('data') &&
      normalizedHeaders.includes('valor') &&
      (normalizedHeaders.includes('descricao') || normalizedHeaders.includes('historico'));

    if (isRevenueTemplate) {
      detectedType = 'Receitas (template completo)';
    } else if (isExpenseTemplate) {
      detectedType = 'Despesas (template simples)';
    }

    for (const rawRow of parsed.data) {
      const rowEntries = Object.entries(rawRow || {}).map(([key, value]) => [
        key
          .replace(/^\uFEFF/, '')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .trim(),
        (value || '').toString().trim(),
      ] as const);
      const row = Object.fromEntries(rowEntries);

      const dateRaw = row['data'] || row['date'] || row['dt'] || row['chegada'] || '';
      const legacyCategoryRaw = row[''] || '';
      const categoryRaw = row['categoria'] || row['category'] || '';
      const typeRaw = (row['tipo'] || row['type'] || '').toLowerCase();
      const debitRaw = row['debito'] || row['saida'] || '';
      const creditRaw = row['credito'] || row['entrada'] || '';
      const valueRaw = row['valor'] || row['amount'] || '';
      const totalRaw = row['total'] || valueRaw;

      let history = row['historico'] || row['descricao'] || row['memo'] || row['nome'] || 'Importado CSV';
      let description = '';
      let type: 'income' | 'expense' = importMode === 'auto' ? 'expense' : importMode;
      let amount = 0;

      if (isRevenueTemplate) {
        history = row['nome'] || history;
        amount = Math.abs(parseAmount(totalRaw));
        type = importMode === 'auto' ? 'income' : importMode;
        description = [
          row['telefone'] ? `Tel: ${row['telefone']}` : '',
          row['chegada'] ? `Chegada: ${row['chegada']}` : '',
          row['saida'] ? `Saida: ${row['saida']}` : '',
          row['aluguel 1'] ? `Aluguel 1: ${row['aluguel 1']}` : '',
          row['aluguel 2'] ? `Aluguel 2: ${row['aluguel 2']}` : '',
          row['luz'] ? `Luz: ${row['luz']}` : '',
          row['agua'] ? `Agua: ${row['agua']}` : '',
          row['outros'] ? `Outros: ${row['outros']}` : '',
          row['total'] ? `Total: ${row['total']}` : '',
        ]
          .filter(Boolean)
          .join(' | ');
      } else if (isExpenseTemplate) {
        history = row['descricao'] || row['historico'] || history;
        amount = Math.abs(parseAmountLikeBrazilianSheets(valueRaw));
        type = importMode === 'auto' ? 'expense' : importMode;
      } else {
        const debit = debitRaw ? Math.abs(parseAmount(debitRaw)) : 0;
        const credit = creditRaw ? Math.abs(parseAmount(creditRaw)) : 0;
        const total = totalRaw ? parseAmount(totalRaw) : 0;

        if (importMode === 'auto') {
          if (debit > 0 && credit === 0) {
            type = 'expense';
            amount = debit;
          } else if (credit > 0 && debit === 0) {
            type = 'income';
            amount = credit;
          } else if (total !== 0) {
            type = total < 0 ? 'expense' : 'income';
            amount = Math.abs(total);
          } else if (typeRaw.includes('receita') || typeRaw.includes('income') || typeRaw.includes('credit')) {
            type = 'income';
          } else if (typeRaw.includes('desp') || typeRaw.includes('expense') || typeRaw.includes('debit')) {
            type = 'expense';
          }
        } else {
          type = importMode;
          amount =
            type === 'income'
              ? (credit > 0 ? credit : Math.abs(total))
              : (debit > 0 ? debit : Math.abs(total));
        }
      }

      if (amount <= 0) continue;

      const matchedCategory = /^\d+$/.test(legacyCategoryRaw)
        ? categories.find((category) => category.id === legacyCategoryRaw)
        : matchCategoryByName(categoryRaw);
      const fallbackCategory = getDefaultCategory(type);
      const transactionDate = dateRaw ? parseDate(dateRaw) : new Date();

      rows.push({
        date: transactionDate,
        history,
        amount,
        categoryId: matchedCategory?.id || fallbackCategory?.id || (type === 'income' ? 'income' : '5'),
        categoryName: matchedCategory?.name || fallbackCategory?.name || 'Outros',
        type,
        dateStr: format(transactionDate, 'dd/MM/yyyy'),
        description
      });
    }

    return { rows, detectedType };
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      try {
        const { rows, detectedType } = await buildRowsFromFileContent(content, file.name);
        const total = rows.reduce((sum, row) => sum + row.amount, 0);
        if (rows.length === 0) {
          alert('Nenhum registro valido encontrado no arquivo.');
          setPendingImport(null);
          return;
        }
        setPendingImport({
          fileName: file.name,
          detectedType,
          rows,
          total,
        });
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Falha ao importar arquivo.');
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const confirmImport = async () => {
    if (!pendingImport || pendingImport.rows.length === 0) return;
    try {
      setIsImporting(true);
      const hasIncome = pendingImport.rows.some((row) => row.type === 'income');
      const hasExpense = pendingImport.rows.some((row) => row.type === 'expense');
      for (const row of pendingImport.rows) {
        await addTransaction(row);
      }
      setCurrentPage(1);
      setSearchTerm('');
      setCategoryFilter('all');
      if (hasIncome && hasExpense) {
        setTypeFilter('all');
      } else if (hasIncome) {
        setTypeFilter('income');
      } else {
        setTypeFilter('expense');
      }
      alert(`Importacao concluida: ${pendingImport.rows.length} registros (${formatCurrency(pendingImport.total)}).`);
      setPendingImport(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Falha ao confirmar importacao.');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden transition-all">
      <div className="flex flex-col border-b border-slate-100 p-6 gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Transações</h2>
            <p className="mt-1 text-sm font-normal text-slate-500">Gestão de fluxo de caixa</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={importMode}
              onChange={(e) => setImportMode(e.target.value as 'auto' | 'expense' | 'income')}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-600 outline-none"
              title="Modo de importacao"
            >
              <option value="auto">Importação: Automático</option>
              <option value="expense">Importacao: Despesas</option>
              <option value="income">Importacao: Receitas</option>
            </select>
            <button 
              onClick={() => exportToPDF(filteredTransactions, 'Relatório de Transações')}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
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
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
              onClick={() => document.getElementById('import-tx-file-table')?.click()}
            >
              <Upload className="h-4 w-4 text-emerald-500" />
              <span>Importar dados</span>
            </button>

            <button 
              onClick={() => onAdd()}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-all active:scale-95 shadow-md shadow-indigo-200"
            >
              <Plus className="h-4 w-4" />
              <span>Novo registro</span>
            </button>
          </div>
        </div>

        {pendingImport && (
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-700">Prévia da importação</p>
            <p className="mt-1 text-sm font-normal text-slate-700">
              Arquivo: <span className="font-medium">{pendingImport.fileName}</span>
            </p>
            <p className="text-sm font-normal text-slate-700">
              Tipo detectado: <span className="font-medium">{pendingImport.detectedType}</span>
            </p>
            <p className="text-sm font-normal text-slate-700">
              Registros: <span className="font-medium">{pendingImport.rows.length}</span> | Soma esperada:{' '}
              <span className="font-semibold text-indigo-700">{formatCurrency(pendingImport.total)}</span>
            </p>
            <div className="mt-3 overflow-x-auto rounded-lg border border-indigo-100 bg-white">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-3 py-2 font-semibold text-slate-500">Data</th>
                    <th className="px-3 py-2 font-semibold text-slate-500">Historico</th>
                    <th className="px-3 py-2 font-semibold text-slate-500">Categoria</th>
                    <th className="px-3 py-2 font-semibold text-slate-500">Tipo</th>
                    <th className="px-3 py-2 text-right font-semibold text-slate-500">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingImport.rows.slice(0, 5).map((row, idx) => (
                    <tr key={`${row.history}-${idx}`} className="border-t border-slate-100">
                      <td className="px-3 py-2">{row.dateStr}</td>
                      <td className="px-3 py-2">{row.history}</td>
                      <td className="px-3 py-2">{row.categoryName}</td>
                      <td className="px-3 py-2">{row.type === 'income' ? 'Receita' : 'Despesa'}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(row.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pendingImport.rows.length > 5 && (
              <p className="mt-2 text-xs text-slate-500">
                Mostrando 5 de {pendingImport.rows.length} registros.
              </p>
            )}
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={confirmImport}
                disabled={isImporting}
                className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {isImporting ? 'Importando...' : 'Confirmar importação'}
              </button>
              <button
                type="button"
                onClick={() => setPendingImport(null)}
                disabled={isImporting}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl ring-1 ring-slate-200/70 shadow-inner">
            <button
              onClick={() => { setTypeFilter('all'); setCurrentPage(1); }}
              className={clsx(
                "px-4 py-2 text-xs font-medium rounded-lg transition-all",
                typeFilter === 'all' ? "bg-white text-slate-900 shadow-md" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Todos
            </button>
            <button
              onClick={() => { setTypeFilter('income'); setCurrentPage(1); }}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all",
                typeFilter === 'income' ? "bg-white text-emerald-600 shadow-md" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <ArrowUpCircle className="h-4 w-4" />
              Receitas
            </button>
            <button
              onClick={() => { setTypeFilter('expense'); setCurrentPage(1); }}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all",
                typeFilter === 'expense' ? "bg-white text-rose-600 shadow-md" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <ArrowDownCircle className="h-4 w-4" />
              Despesas
            </button>
          </div>

          <div className="flex items-center gap-2 min-w-[260px]">
            <div className="relative flex items-center bg-slate-100 p-1 rounded-xl ring-1 ring-slate-200/70 flex-1">
              <Filter className="h-3.5 w-3.5 text-slate-400 ml-3" />
              <select 
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                className="flex-1 bg-transparent border-none py-2 pl-2 pr-10 focus:ring-0 text-sm text-slate-900 font-normal cursor-pointer appearance-none"
              >
                <option value="all">Filtro por categoria</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            <CategoryManager iconOnly />
          </div>

          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar nos registros"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-12 pr-4 text-sm font-normal outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 bg-slate-50/50 hover:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-xs uppercase font-semibold tracking-widest text-slate-500 border-b border-slate-100">
            <tr>
              <th className="px-8 py-3">Data</th>
              <th className="px-8 py-3">Histórico e detalhes</th>
              <th className="px-8 py-3">Categoria</th>
              <th className="px-8 py-3 text-right">Valor</th>
              <th className="px-8 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="whitespace-nowrap px-8 py-4">
                    <div className="text-xs font-normal text-slate-500">
                       {format(tx.date, 'EEEE', { locale: ptBR })}
                    </div>
                    <div className="text-sm font-medium text-slate-900 mt-0.5">
                       {format(tx.date, 'dd/MM/yyyy')}
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="text-sm font-normal text-slate-900 leading-normal">{tx.history}</div>
                    {tx.description && (
                      <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-indigo-50/50 px-2.5 py-1 text-xs font-normal text-indigo-600 border border-indigo-100/50">
                        <FileText className="h-3 w-3" />
                        <span title={tx.description}>
                          {tx.type === 'income' && tx.description.includes('Tel:')
                            ? 'Detalhes da receita'
                            : tx.description}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-4">
                    <span 
                      className="inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium text-white shadow-sm shadow-current/10"
                      style={{ backgroundColor: getCategoryColor(tx.categoryId) }}
                    >
                      {tx.categoryName}
                    </span>
                  </td>
                  <td className={clsx(
                    "whitespace-nowrap px-8 py-4 text-right font-semibold tabular-nums text-base",
                    tx.type === 'income' ? "text-emerald-600" : "text-slate-800"
                  )}>
                    {tx.type === 'income' ? '+' : ''} {formatCurrency(tx.amount)}
                  </td>
                  <td className="whitespace-nowrap px-8 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(tx)}
                        className="rounded-lg bg-white p-2 text-slate-400 hover:text-indigo-600 hover:shadow transition-all active:scale-90 border border-slate-100"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="rounded-lg bg-white p-2 text-slate-400 hover:text-rose-600 hover:shadow transition-all active:scale-90 border border-slate-100"
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
                <td colSpan={5} className="px-8 py-16 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-slate-50 p-6 rounded-full ring-4 ring-slate-100">
                      <Search className="h-8 w-8 text-slate-300" />
                    </div>
                    <div className="space-y-1">
                       <p className="text-slate-900 font-semibold text-sm">Nada por aqui</p>
                       <p className="text-slate-500 text-xs font-normal">Ajuste os filtros para encontrar transacoes</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-8 py-4">
        <div className="text-xs font-normal text-slate-500">
          Visualizando <span className="text-indigo-600 font-medium">{paginatedTransactions.length}</span> de <span className="text-slate-900 font-medium">{filteredTransactions.length}</span> registros
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); }}
            disabled={currentPage === 1}
            className="flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-all shadow-sm active:scale-90"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2 px-2">
             <span className="text-sm font-medium text-slate-900">Página {currentPage} / {totalPages || 1}</span>
          </div>

          <button
            onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); }}
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-all shadow-sm active:scale-90"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
