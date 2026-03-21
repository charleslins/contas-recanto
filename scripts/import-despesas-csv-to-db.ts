/**
 * Fonte de verdade: `lib/Despesas.csv` (não alterar o ficheiro).
 *
 * 1. Garante na BD todas as categorias de despesa listadas no CSV.
 * 2. Remove todas as transações com type = expense.
 * 3. Reinsere as despesas do CSV com categoryId/categoryName alinhados ao texto do CSV.
 *
 * Receitas (income) na BD não são alteradas.
 *
 * Uso: npm run db:import-despesas
 */
import * as dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../lib/db/schema';
import { categories, transactions, type NewTransaction } from '../lib/db/schema';
import {
  despesasRowToInsertInput,
  parseDespesasCsvContent,
  uniqueCategoryNamesFromDespesasCsvRaw,
} from '../lib/despesas-csv-parse';
import { ensureDespesasCsvCategoryNamesInDb } from '../lib/despesas-csv-sync-categories';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

dotenv.config({ path: path.join(root, '.env.local') });
dotenv.config({ path: path.join(root, '.env') });

const CHUNK = 400;

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL não definida (.env ou .env.local).');
    process.exit(1);
  }

  const csvPath = path.join(root, 'lib', 'Despesas.csv');
  if (!fs.existsSync(csvPath)) {
    console.error('Ficheiro não encontrado:', csvPath);
    process.exit(1);
  }

  const content = fs.readFileSync(csvPath, 'utf8');
  const parsedRows = parseDespesasCsvContent(content);
  if (parsedRows.length === 0) {
    console.error('Nenhuma linha válida (categoria + valor > 0) no CSV.');
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  const categoryNames = uniqueCategoryNamesFromDespesasCsvRaw(content);
  console.log('Sincronizar categorias a partir do CSV…');
  const catResult = await ensureDespesasCsvCategoryNamesInDb(db, categoryNames);
  console.log(`  Categorias: ${catResult.inserted} nova(s), ${catResult.skipped} já existentes.`);

  const allCats = await db.select().from(categories);
  const nameToId = new Map(allCats.map((c) => [c.name, c.id]));

  const missingCats = new Set<string>();
  for (const r of parsedRows) {
    if (!nameToId.has(r.categoria)) missingCats.add(r.categoria);
  }
  if (missingCats.size > 0) {
    console.error('Categorias sem correspondência na BD:', [...missingCats].join(', '));
    process.exit(1);
  }

  console.log('A remover despesas existentes na BD (receitas mantidas)…');
  await db.delete(transactions).where(eq(transactions.type, 'expense'));
  console.log('  Remoção de despesas concluída.');

  const inserts: NewTransaction[] = [];
  for (const row of parsedRows) {
    const categoryId = nameToId.get(row.categoria)!;
    const input = despesasRowToInsertInput(row, categoryId, row.categoria);
    inserts.push({
      id: randomUUID(),
      type: input.type,
      categoryId: input.categoryId,
      categoryName: input.categoryName,
      date: input.date,
      dateStr: input.dateStr,
      history: input.history,
      credor: input.credor,
      amount: input.amount,
      description: input.description,
    });
  }

  console.log(`A inserir ${inserts.length} despesas do CSV…`);
  for (let i = 0; i < inserts.length; i += CHUNK) {
    const chunk = inserts.slice(i, i + CHUNK);
    await db.insert(transactions).values(chunk);
  }

  console.log('\nConcluído: despesas na BD = conteúdo de lib/Despesas.csv (categorias alinhadas ao texto do CSV).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
