import { randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from '@/lib/db/schema';
import { categories } from '@/lib/db/schema';
import { defaultColorForDespesasCategoryName } from '@/lib/despesas-csv-categories';

/** Insere categorias de despesa em falta (nome exacto). */
export async function ensureDespesasCsvCategoryNamesInDb(
  db: NeonHttpDatabase<typeof schema>,
  names: readonly string[]
): Promise<{ inserted: number; skipped: number }> {
  let inserted = 0;
  let skipped = 0;

  for (const name of names) {
    if (!name.trim()) continue;
    const existing = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.name, name))
      .limit(1);

    if (existing.length > 0) {
      skipped += 1;
      continue;
    }

    await db.insert(categories).values({
      id: randomUUID(),
      name,
      color: defaultColorForDespesasCategoryName(name),
      type: 'expense',
    });
    inserted += 1;
    console.log('  +', name);
  }

  return { inserted, skipped };
}
