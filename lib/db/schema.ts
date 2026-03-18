import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  color: text('color').notNull().default('#64748b'), // Default slate-500
  type: text('type', { enum: ['income', 'expense', 'both'] }).notNull().default('expense'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey(),
  type: text('type', { enum: ['income', 'expense'] }).notNull().default('expense'),
  categoryId: text('category_id').notNull().references(() => categories.id),
  categoryName: text('category_name').notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  dateStr: text('date_str').notNull(),
  history: text('history').notNull(),
  amount: real('amount').notNull(),
  description: text('description').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
