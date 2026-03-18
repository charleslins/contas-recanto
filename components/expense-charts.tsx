'use client';

import { Transaction } from '@/lib/parser';
import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ExpenseChartsProps {
  transactions: Transaction[];
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export function ExpenseCharts({ transactions }: ExpenseChartsProps) {
  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    transactions.forEach((t) => {
      const current = map.get(t.categoryName) || 0;
      map.set(t.categoryName, current + t.amount);
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const map = new Map<string, number>();
    transactions.forEach((t) => {
      const monthYear = format(t.date, 'MMM/yy', { locale: ptBR });
      const current = map.get(monthYear) || 0;
      map.set(monthYear, current + t.amount);
    });
    
    // To keep chronological order, we can group by YYYY-MM and then format
    const chronologicalMap = new Map<string, { label: string, value: number }>();
    transactions.forEach((t) => {
      const key = format(t.date, 'yyyy-MM');
      const label = format(t.date, 'MMM/yy', { locale: ptBR });
      const current = chronologicalMap.get(key)?.value || 0;
      chronologicalMap.set(key, { label, value: current + t.amount });
    });

    return Array.from(chronologicalMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([, data]) => ({ name: data.label, value: data.value }));
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-slate-800">Despesas por Categoria</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => formatCurrency(Number(value))}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-slate-800">Despesas por Mês</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => `R$ ${value / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: '#f1f5f9' }}
                formatter={(value: any) => formatCurrency(Number(value))}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
