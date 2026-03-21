'use client';

import { useState } from 'react';
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
import { buildExpenseHistory, parseLegacyExpenseForForm } from '@/lib/transaction-fields';
import type { Category } from '@/lib/db/schema';
import {
  defaultCategoryIdForType,
  resolveCategoryIdForForm,
} from '@/lib/category-helpers';

interface TransactionModalProps {
  onClose: () => void;
  onSave: (t: Omit<Transaction, 'id'>) => void;
  initialData?: Transaction | null;
  defaultType?: 'income' | 'expense';
}

interface ModalFormState {
  type: 'income' | 'expense';
  date: Date;
  history: string;
  credor: string;
  description: string;
  amount: string;
  categoryId: string;
  incomeDetails: IncomeDetails;
}

function buildModalFormState(
  initialData: Transaction | null | undefined,
  defaultType: 'income' | 'expense',
  categories: Category[]
): ModalFormState {
  const resolvedCat = resolveCategoryIdForForm(categories, initialData, defaultType);
  if (initialData) {
    if (initialData.type === 'income') {
      const parsed = parseIncomeDescription(initialData.description || '');
      return {
        type: initialData.type || 'expense',
        date: initialData.date ? new Date(initialData.date) : new Date(),
        history: initialData.history || '',
        credor: '',
        description: parsed.note,
        amount: formatNumberToMoneyMask(initialData.amount || 0),
        categoryId: resolvedCat,
        incomeDetails: parsed.details,
      };
    }
    const { credor: c, description: d } = parseLegacyExpenseForForm(initialData);
    return {
      type: initialData.type || 'expense',
      date: initialData.date ? new Date(initialData.date) : new Date(),
      history: '',
      credor: c,
      description: d,
      amount: formatNumberToMoneyMask(initialData.amount || 0),
      categoryId: resolvedCat,
      incomeDetails: { ...EMPTY_INCOME_DETAILS },
    };
  }
  return {
    type: defaultType,
    date: new Date(),
    history: '',
    credor: '',
    description: '',
    amount: '0,00',
    categoryId: defaultCategoryIdForType(categories, defaultType),
    incomeDetails: { ...EMPTY_INCOME_DETAILS },
  };
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
  onClose,
  onSave,
  initialData,
  defaultType = 'expense',
}: TransactionModalProps) {
  const { categories } = useTransactions();
  const [form, setForm] = useState<ModalFormState>(() =>
    buildModalFormState(initialData, defaultType, categories)
  );
  const { type, date, history, credor, description, amount, categoryId, incomeDetails } = form;
  const incomeTotal = (
    parseMoneyToNumber(incomeDetails.advancePayment) +
    parseMoneyToNumber(incomeDetails.finalPayment) +
    parseMoneyToNumber(incomeDetails.light) +
    parseMoneyToNumber(incomeDetails.water)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveCategoryId =
      type === 'income'
        ? categories.some(
            (c) => c.id === categoryId && (c.type === 'income' || c.type === 'both')
          )
          ? categoryId
          : defaultCategoryIdForType(categories, 'income')
        : categoryId;
    if (!effectiveCategoryId) {
      alert(
        type === 'income'
          ? 'Crie pelo menos uma categoria de receita (ou tipo Ambos) antes de registar.'
          : 'Escolha uma categoria de despesa ou crie uma em Gerenciar categorias.'
      );
      return;
    }
    const cat = categories.find((c) => c.id === effectiveCategoryId);
    if (!cat) {
      alert('Categoria não encontrada. Atualize a página ou crie a categoria de novo.');
      return;
    }
    const finalAmount = type === 'income'
      ? (incomeTotal > 0 ? incomeTotal : parseMoneyToNumber(amount))
      : parseMoneyToNumber(amount);
    const finalDescription = type === 'income'
      ? buildIncomeDescription(incomeDetails, description)
      : description.trim();

    if (type === 'expense' && !credor.trim() && !finalDescription) {
      alert('Preencha credor ou descrição da despesa.');
      return;
    }

    onSave({
      type,
      categoryId: effectiveCategoryId,
      categoryName: cat.name,
      date,
      dateStr: format(date, 'dd/MM/yyyy'),
      history:
        type === 'income'
          ? history.trim()
          : buildExpenseHistory(credor, finalDescription),
      credor: type === 'income' ? '' : credor.trim(),
      description: finalDescription,
      amount: finalAmount,
    });
    onClose();
  };

  const filteredCategories = categories.filter(
    (c) => c.type === 'both' || c.type === type
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
              onClick={() => setForm((f) => ({ ...f, type: 'expense' }))}
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
              onClick={() => setForm((f) => ({ ...f, type: 'income' }))}
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
                        if (selectedDate) setForm((f) => ({ ...f, date: selectedDate }));
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
                  onChange={type === 'expense' ? (v) => setForm((f) => ({ ...f, amount: v })) : undefined}
                />
              </div>
            </div>

            {type === 'income' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">
                  Nome
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aline Barros"
                  value={history}
                  onChange={(e) => setForm((f) => ({ ...f, history: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-normal text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">
                    Credor
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: ARMAZEM AVENIDA"
                    value={credor}
                    onChange={(e) => setForm((f) => ({ ...f, credor: e.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-normal text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">
                    Categoria
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-normal text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 appearance-none cursor-pointer"
                  >
                    {filteredCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
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
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          incomeDetails: { ...f.incomeDetails, phone: e.target.value },
                        }))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Chegada</label>
                    <input
                      placeholder="dd/mm/aaaa"
                      value={incomeDetails.checkIn}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          incomeDetails: { ...f.incomeDetails, checkIn: e.target.value },
                        }))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Saida</label>
                    <input
                      placeholder="dd/mm/aaaa"
                      value={incomeDetails.checkOut}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          incomeDetails: { ...f.incomeDetails, checkOut: e.target.value },
                        }))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Adiantamento</label>
                    <CurrencyInput
                      compact
                      placeholder="0,00"
                      value={incomeDetails.advancePayment}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          incomeDetails: { ...f.incomeDetails, advancePayment: v },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Pagamento final</label>
                    <CurrencyInput
                      compact
                      placeholder="0,00"
                      value={incomeDetails.finalPayment}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          incomeDetails: { ...f.incomeDetails, finalPayment: v },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Luz</label>
                    <CurrencyInput
                      compact
                      placeholder="0,00"
                      value={incomeDetails.light}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          incomeDetails: { ...f.incomeDetails, light: v },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-emerald-800">Agua</label>
                    <CurrencyInput
                      compact
                      placeholder="0,00"
                      value={incomeDetails.water}
                      onChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          incomeDetails: { ...f.incomeDetails, water: v },
                        }))
                      }
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
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full rounded-2xl border-slate-200 bg-slate-50 p-3 text-sm font-normal text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 resize-none"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">
                  Descrição
                </label>
                <Textarea
                  placeholder="Detalhes da despesa (como no CSV)..."
                  value={description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
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
