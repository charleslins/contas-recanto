'use client';

import { Transaction } from '@/lib/parser';
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ExpenseChartsProps {
  transactions: Transaction[];
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b', '#ec4899', '#06b6d4'];

export function ExpenseCharts({ transactions }: ExpenseChartsProps) {
  // Focus only on expenses
  const expenseTransactions = useMemo(() => 
    transactions.filter(t => t.type === 'expense' || !t.type), 
  [transactions]);

  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    expenseTransactions.forEach((t) => {
      const current = map.get(t.categoryName) || 0;
      map.set(t.categoryName, current + t.amount);
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [expenseTransactions]);

  const monthlyData = useMemo(() => {
    const chronologicalMap = new Map<string, { label: string, value: number }>();
    expenseTransactions.forEach((t) => {
      const key = format(t.date, 'yyyy-MM');
      const label = format(t.date, 'MMM/yy', { locale: ptBR });
      const current = chronologicalMap.get(key)?.value || 0;
      chronologicalMap.set(key, { label, value: current + t.amount });
    });

    return Array.from(chronologicalMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([, data]) => ({ name: data.label, value: data.value }));
  }, [expenseTransactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    if (width < 60) return null;
    
    return (
      <text 
        x={x + width - 10} 
        y={y + height / 2} 
        fill="#fff" 
        textAnchor="end" 
        dominantBaseline="middle"
        className="text-[10px] font-black"
      >
        {formatCurrency(value)}
      </text>
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Category Chart - Only Horizontal Bars as requested */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100/50">
        <div className="mb-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gastos por Categoria</h4>
          <p className="text-xl font-black text-slate-900 tracking-tight">Análise Setorial</p>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={categoryData} 
              layout="vertical" 
              margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false}
                tickLine={false}
                width={110}
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                formatter={(value: any) => formatCurrency(Number(value))}
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                itemStyle={{ fontSize: '12px', fontWeight: '900', color: '#1e293b' }}
              />
              <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={26}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <LabelList dataKey="value" content={renderCustomBarLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Evolution - Area Chart as established before */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white p-6 shadow-xl shadow-indigo-50/20">
        <div className="mb-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Evolução Financeira</h4>
          <p className="text-xl font-black text-slate-900 tracking-tight">Histórico de Despesas</p>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                dy={12}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                tickFormatter={(value) => value >= 1000 ? `${value/1000}k` : value}
              />
              <Tooltip
                formatter={(value: any) => formatCurrency(Number(value))}
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.2)', padding: '12px 16px' }}
                itemStyle={{ fontSize: '13px', fontWeight: '900', color: '#4f46e5' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#6366f1" 
                strokeWidth={5}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
