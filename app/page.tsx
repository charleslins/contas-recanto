import { Home } from 'lucide-react';
import { TransactionProvider } from '@/components/transaction-context';
import { Dashboard } from '@/components/dashboard';
import { getTransactionsAction } from '@/services/transaction/transaction.actions';

export default async function Page() {
  const transactions = await getTransactionsAction();

  return (
    <TransactionProvider initialData={transactions}>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Home className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Reforma Casa Tamandaré
              </h1>
            </div>
            <div className="text-sm font-medium text-slate-500">
              Dashboard Financeiro
            </div>
          </div>
        </header>

        {/* Main Content */}
        <Dashboard />
      </div>
    </TransactionProvider>
  );
}
