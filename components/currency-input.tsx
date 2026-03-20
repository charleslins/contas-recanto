'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { formatMoneyMask } from '@/lib/money-mask';

export type CurrencyInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange' | 'inputMode'
> & {
  value: string;
  onChange?: (maskedValue: string) => void;
  /** Estilo menor (grid de receita no modal) */
  compact?: boolean;
};

const defaultClass =
  'w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-normal text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

const compactClass =
  'w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10';

/**
 * Campo monetário com máscara pt-BR (como apps de banco).
 * `value` no formato "0,00" / "1.234,56".
 */
export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  function CurrencyInput(
    { value, onChange, readOnly, disabled, className, compact, onBlur, ...rest },
    ref
  ) {
    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        spellCheck={false}
        readOnly={readOnly}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          if (readOnly || disabled) return;
          onChange?.(formatMoneyMask(e.target.value));
        }}
        onBlur={onBlur}
        className={clsx(compact ? compactClass : defaultClass, className)}
        {...rest}
      />
    );
  }
);
