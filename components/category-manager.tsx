'use client';

import { useMemo, useState } from 'react';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useTransactions } from './transaction-context';

type CategoryType = 'income' | 'expense' | 'both';

interface EditableCategory {
  id: string;
  parentName: string;
  childName: string;
  color: string;
  type: CategoryType;
}

interface CategoryManagerProps {
  iconOnly?: boolean;
}

export function CategoryManager({ iconOnly = false }: CategoryManagerProps) {
  const { categories, addCategory, updateCategory, deleteCategory } = useTransactions();
  const [open, setOpen] = useState(false);
  const [newParentName, setNewParentName] = useState('');
  const [newChildName, setNewChildName] = useState('');
  const [newColor, setNewColor] = useState('#64748b');
  const [newType, setNewType] = useState<CategoryType>('expense');
  const [editing, setEditing] = useState<Record<string, EditableCategory>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name)),
    [categories]
  );

  const splitCategoryName = (name: string) => {
    const [parent, child] = name.split('>').map((part) => part.trim());
    return {
      parentName: parent || '',
      childName: child || '',
    };
  };

  const joinCategoryName = (parentName: string, childName: string) => {
    const parent = parentName.trim();
    const child = childName.trim();
    if (!parent) return '';
    return child ? `${parent} > ${child}` : parent;
  };

  const handleStartEdit = (id: string, name: string, color: string, type: CategoryType) => {
    const { parentName, childName } = splitCategoryName(name);
    setEditing((prev) => ({
      ...prev,
      [id]: { id, parentName, childName, color, type },
    }));
  };

  const handleSaveEdit = async (id: string) => {
    const category = editing[id];
    if (!category) return;
    const formattedName = joinCategoryName(category.parentName, category.childName);
    if (!formattedName) return;
    try {
      setBusy(`save-${id}`);
      await updateCategory(id, {
        name: formattedName,
        color: category.color,
        type: category.type,
      });
      setEditing((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Nao foi possivel salvar a categoria.');
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setBusy(`delete-${id}`);
      await deleteCategory(id);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Nao foi possivel remover a categoria.');
    } finally {
      setBusy(null);
    }
  };

  const handleAdd = async () => {
    const formattedName = joinCategoryName(newParentName, newChildName);
    if (!formattedName) return;
    try {
      setBusy('add');
      await addCategory({
        name: formattedName,
        color: newColor,
        type: newType,
      });
      setNewParentName('');
      setNewChildName('');
      setNewColor('#64748b');
      setNewType('expense');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Nao foi possivel criar a categoria.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={clsx(
          "inline-flex items-center gap-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50",
          iconOnly ? "h-10 w-10 justify-center p-0" : "px-4 py-2"
        )}
        title="Gerenciar categorias"
      >
        <Pencil className="h-4 w-4" />
        {!iconOnly && 'Gerenciar categorias'}
      </button>

      {open && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/45" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">Categorias e subcategorias (Pai &gt; Filho)</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
                title="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[50vh] space-y-2 overflow-y-auto pr-1">
              {sortedCategories.map((category) => {
                const local = editing[category.id];
                const isEditing = Boolean(local);
                const split = splitCategoryName(category.name);
                const row = local ?? {
                  id: category.id,
                  parentName: split.parentName,
                  childName: split.childName,
                  color: category.color,
                  type: category.type as CategoryType,
                };

                return (
                  <div key={category.id} className="grid grid-cols-12 items-center gap-2 rounded-xl bg-white p-3 ring-1 ring-slate-200/70">
                    <input
                      value={row.parentName}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          [category.id]: {
                            ...row,
                            parentName: e.target.value,
                          },
                        }))
                      }
                      onFocus={() => handleStartEdit(category.id, category.name, category.color, category.type as CategoryType)}
                      placeholder="Categoria pai (ex: Contas)"
                      className="col-span-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-indigo-400"
                    />
                    <input
                      value={row.childName}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          [category.id]: {
                            ...row,
                            childName: e.target.value,
                          },
                        }))
                      }
                      onFocus={() => handleStartEdit(category.id, category.name, category.color, category.type as CategoryType)}
                      placeholder="Subcategoria (ex: Celpe)"
                      className="col-span-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-indigo-400"
                    />
                    <input
                      type="color"
                      value={row.color}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          [category.id]: {
                            ...row,
                            color: e.target.value,
                          },
                        }))
                      }
                      onFocus={() => handleStartEdit(category.id, category.name, category.color, category.type as CategoryType)}
                      className="col-span-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-1"
                    />
                    <select
                      value={row.type}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          [category.id]: {
                            ...row,
                            type: e.target.value as CategoryType,
                          },
                        }))
                      }
                      onFocus={() => handleStartEdit(category.id, category.name, category.color, category.type as CategoryType)}
                      className="col-span-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-indigo-400"
                    >
                      <option value="expense">Despesa</option>
                      <option value="income">Receita</option>
                      <option value="both">Ambos</option>
                    </select>

                    <div className="col-span-2 flex items-center justify-end gap-1">
                      <button
                        type="button"
                        disabled={!isEditing || busy === `save-${category.id}`}
                        onClick={() => handleSaveEdit(category.id)}
                        className={clsx(
                          'rounded-lg p-2 transition-colors',
                          isEditing ? 'text-indigo-600 hover:bg-indigo-50' : 'text-slate-300'
                        )}
                        title="Salvar"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        disabled={busy === `delete-${category.id}`}
                        onClick={() => handleDelete(category.id)}
                        className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50"
                        title="Remover"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-12 items-center gap-2 rounded-xl bg-white p-3 ring-1 ring-slate-200/70">
              <input
                value={newParentName}
                onChange={(e) => setNewParentName(e.target.value)}
                placeholder="Categoria pai"
                className="col-span-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-indigo-400"
              />
              <input
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                placeholder="Subcategoria (opcional)"
                className="col-span-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-indigo-400"
              />
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="col-span-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-1"
              />
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as CategoryType)}
                className="col-span-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-indigo-400"
              >
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
                <option value="both">Ambos</option>
              </select>
              <button
                type="button"
                onClick={handleAdd}
                disabled={!newParentName.trim() || busy === 'add'}
                className="col-span-2 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
