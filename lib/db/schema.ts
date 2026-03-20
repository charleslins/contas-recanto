import {
  doublePrecision,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const categoryTypeEnum = pgEnum('category_type', ['income', 'expense', 'both']);
export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'expense']);

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  color: text('color').notNull().default('#64748b'),
  type: categoryTypeEnum('type').notNull().default('expense'),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  type: transactionTypeEnum('type').notNull().default('expense'),
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id),
  categoryName: text('category_name').notNull(),
  date: timestamp('date', { mode: 'date' }).notNull(),
  dateStr: text('date_str').notNull(),
  history: text('history').notNull(),
  amount: doublePrecision('amount').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
