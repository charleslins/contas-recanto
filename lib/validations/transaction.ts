import { z } from 'zod';

/** Payload para criar transação (sem `id`; gerado no serviço). */
export const insertTransactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  categoryId: z.string().min(1),
  categoryName: z.string().min(1),
  date: z.coerce.date(),
  dateStr: z.string().min(1),
  history: z.string(),
  credor: z.string(),
  amount: z.number().finite(),
  description: z.string(),
});

export type InsertTransactionInput = z.infer<typeof insertTransactionSchema>;

export const updateTransactionSchema = insertTransactionSchema.partial();

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;

export const insertTransactionBatchSchema = z.array(insertTransactionSchema).min(1).max(5000);
