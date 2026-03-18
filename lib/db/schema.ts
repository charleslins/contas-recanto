import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey(),
  categoryId: text('category_id').notNull(),
  categoryName: text('category_name').notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  dateStr: text('date_str').notNull(),
  history: text('history').notNull(),
  amount: real('amount').notNull(),
  description: text('description').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
