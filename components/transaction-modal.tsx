'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/lib/parser';
import { X, ArrowUpCircle, ArrowDownCircle, Calendar, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { clsx } from 'clsx';
import { useTransactions } from './transaction-context';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { CurrencyInput } from '@/components/currency-input';
import { formatNumberToMoneyMask, parseMoneyToNumber } from '@/lib/money-mask';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (t: Omit<Transaction, 'id'>) => void;
  initialData?: Transaction | null;
  defaultType?: 'income' | 'expense';
}

interface IncomeDetails {
  phone: string;
  checkIn: string;
  checkOut: string;
  advancePayment: string;
  finalPayment: string;
  light: string;
  water: string;
}

const EMPTY_INCOME_DETAILS: IncomeDetails = {
  phone: '',
  checkIn: '',
  checkOut: '',
  advancePayment: '',
  finalPayment: '',
  light: '',
  water: '',
};

const parseIncomeDescription = (description: string) => {
  const details = { ...EMPTY_INCOME_DETAILS };
  let note = '';

  description.split('|').map((part) => part.trim()).forEach((part) => {
    if (part.startsWith('Tel:')) details.phone = part.replace('Tel:', '').trim();
    if (part.startsWith('Chegada:')) details.checkIn = part.replace('Chegada:', '').trim();
    if (part.startsWith('Saida:')) details.checkOut = part.replace('Saida:', '').trim();
    if (part.startsWith('Adiantamento:')) details.advancePayment = part.replace('Adiantamento:', '').trim();
    if (part.startsWith('Pagamento final:')) details.finalPayment = part.replace('Pagamento final:', '').trim();
    if (part.startsWith('Aluguel 1:')) details.advancePayment = part.replace('Aluguel 1:', '').trim();
    if (part.startsWith('Aluguel 2:')) details.finalPayment = part.replace('Aluguel 2:', '').trim();
    if (part.startsWith('Luz:')) details.light = part.replace('Luz:', '').trim();
    if (part.startsWith('Agua:')) details.water = part.replace('Agua:', '').trim();
    if (part.startsWith('Obs:')) note = part.replace('Obs:', '').trim();
  });

  return { details, note };
};

const buildIncomeDescription = (details: IncomeDetails, note: string) => {
  const total = (
    parseMoneyToNumber(details.advancePayment) +
    parseMoneyToNumber(details.finalPayment) +
    parseMoneyToNumber(details.light) +
    parseMoneyToNumber(details.water)
  ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return [
    details.phone ? `Tel: ${details.phone}` : '',
    details.checkIn ? `Chegada: ${details.checkIn}` : '',
    details.checkOut ? `Saida: ${details.checkOut}` : '',
    details.advancePayment ? `Adiantamento: ${details.advancePayment}` : '',
    details.finalPayment ? `Pagamento final: ${details.finalPayment}` : '',
    details.light ? `Luz: ${details.light}` : '',
    details.water ? `Agua: ${details.water}` : '',
    `Total: ${total}`,
    note.trim() ? `Obs: ${note.trim()}` : '',
  ]
    .filter(Boolean)
    .join(' | ');
};

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
  const [incomeDetails, setIncomeDetails] = useState<IncomeDetails>(EMPTY_INCOME_DETAILS);
  const incomeTotal = (
    parseMoneyToNumber(incomeDetails.advancePayment) +
    parseMoneyToNumber(incomeDetails.finalPayment) +
    parseMoneyToNumber(incomeDetails.light) +
    parseMoneyToNumber(incomeDetails.water)
  );

  // Reset/Initialize the form
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setType(initialData.type || 'expense');
        setDate(initialData.date ? new Date(initialData.date) : new Date());
        setHistory(initialData.history || '');
        if (initialData.type === 'income') {
          const parsed = parseIncomeDescription(initialData.description || '');
          setIncomeDetails(parsed.details);
          setDescription(parsed.note);
        } else {
          setIncomeDetails(EMPTY_INCOME_DETAILS);
          setDescription(initialData.description || '');
        }
        setAmount(formatNumberToMoneyMask(initialData.amount || 0));
        setCategoryId(initialData.categoryId || '5');
      } else {
        setType(defaultType);
        setDate(new Date());
        setHistory('');
        setDescription('');
        setAmount('0,00');
        setIncomeDetails(EMPTY_INCOME_DETAILS);
        setCategoryId(defaultType === 'income' ? 'income' : '5');
      }
    }
  }, [initialData, isOpen, defaultType]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveCategoryId = type === 'income' ? 'income' : categoryId;
    const cat = categories.find(c => c.id === effectiveCategoryId);
    const finalAmount = type === 'income'
      ? (incomeTotal > 0 ? incomeTotal : parseMoneyToNumber(amount))
      : parseMoneyToNumber(amount);
    const finalDescription = type === 'income'
      ? buildIncomeDescription(incomeDetails, description)
      : description;

    onSave({
      type,
      categoryId: effectiveCategoryId,
      categoryName: cat ? cat.name : 'Outros',
      date,
      dateStr: format(date, 'dd/MM/yyyy'),
      history,
      description: finalDescription,
      amount: finalAmount,
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

      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all animate-in zoom-in-95 duration-200">
        {/* Header decoration */}
        <div className={clsx(
          "h-2 w-full",
          type === 'income' ? "bg-emerald-500" : "bg-indigo-600"
        )} />

        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {initialData ? 'Editar Registro' : 'Novo Registro'}
            </h2>
            <p className="text-sm font-normal text-slate-500">Preencha os dados da transacao</p>
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
                "flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-xl transition-all duration-200 uppercase tracking-widest",
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
                "flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-xl transition-all duration-200 uppercase tracking-widest",
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
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">
                  <Calendar className="h-3 w-3" /> Data
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start rounded-2xl border-slate-200 bg-slate-50 p-3.5 text-sm font-normal text-slate-900 hover:bg-white"
                    >
                      <Calendar className="mr-2 h-4 w-4 text-slate-500" />
                      {format(date, 'dd/MM/yyyy')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="z-[140] w-auto p-0" align="start">
                    <CalendarUI
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        if (selectedDate) setDate(selectedDate);
                      }}
                      locale={ptBR}
                      className="rounded-xl"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">
                  Valor (R$)
                </label>
                <CurrencyInput
                  required={type === 'expense'}
                  readOnly={type === 'income'}
                  placeholder="0,00"
                  value={type === 'income' ? formatNumberToMoneyMask(incomeTotal) : amount}
                  onChange={type === 'expense' ? setAmount : undefined}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">
                {type === 'income' ? 'Nome' : 'Titulo / Historico'}
              </label>
              <input
                type="text"
                required
                  placeholder={type === 'expense' ? "Ex: Material hidraulico" : "Ex: Aline Barros"}
                value={history}
                onChange={e => setHistory(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-normal text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {type === 'expense' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">Categoria</label>
                  <select
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-normal text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 appearance-none cursor-pointer"
                  >
                    {filteredCategories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {type === 'income' && (
              <div className="space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Dados da receita</p>
                <div className="grid grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Telefone</label>
                    <input
                      placeholder="81 99999-9999"
                      value={incomeDetails.phone}
                      onChange={(e) => setIncomeDetails(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Chegada</label>
                    <input
                      placeholder="dd/mm/aaaa"
                      value={incomeDetails.checkIn}
                      onChange={(e) => setIncomeDetails(prev => ({ ...prev, checkIn: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Saida</label>
                    <input
                      placeholder="dd/mm/aaaa"
                      value={incomeDetails.checkOut}
                      onChange={(e) => setIncomeDetails(prev => ({ ...prev, checkOut: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Adiantamento</label>
                    <CurrencyInput
                      compact
                      placeholder="0,00"
                      value={incomeDetails.advancePayment}
                      onChange={(v) => setIncomeDetails(prev => ({ ...prev, advancePayment: v }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Pagamento final</label>
                    <CurrencyInput
                      compact
                      placeholder="0,00"
                      value={incomeDetails.finalPayment}
                      onChange={(v) => setIncomeDetails(prev => ({ ...prev, finalPayment: v }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Luz</label>
                    <CurrencyInput
                      compact
                      placeholder="0,00"
                      value={incomeDetails.light}
                      onChange={(v) => setIncomeDetails(prev => ({ ...prev, light: v }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Agua</label>
                    <CurrencyInput
                      compact
                      placeholder="0,00"
                      value={incomeDetails.water}
                      onChange={(v) => setIncomeDetails(prev => ({ ...prev, water: v }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Total calculado</label>
                    <input
                      value={incomeTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      readOnly
                      className="w-full rounded-xl border border-emerald-200 bg-emerald-100/50 p-3 text-sm font-semibold text-emerald-800 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {type === 'income' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">Observacoes</label>
                <Textarea
                  placeholder="Observacoes adicionais..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-2xl border-slate-200 bg-slate-50 p-3 text-sm font-normal text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 resize-none"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">Descricao</label>
                <Textarea
                  placeholder="Detalhes adicionais..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border-slate-200 bg-slate-50 p-3.5 text-sm font-normal text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 resize-none"
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl py-4 text-xs font-medium text-slate-500 hover:bg-slate-100 transition-all uppercase tracking-widest"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 rounded-2xl py-4 text-xs font-semibold text-white transition-all shadow-lg hover:offset-2 active:scale-[0.98] uppercase tracking-widest",
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
