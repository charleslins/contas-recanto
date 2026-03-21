/**
 * Lê `lib/Despesas.csv`, extrai valores únicos da coluna categoria e insere na BD
 * as que ainda não existem (comparação pelo nome exacto).
 *
 * Uso: npm run db:sync-categories
 * Requer DATABASE_URL em `.env` ou `.env.local`.
 *
 * Para alinhar também as linhas de despesa na BD ao CSV, use `npm run db:import-despesas`.
 */
import * as dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../lib/db/schema';
import { uniqueCategoryNamesFromDespesasCsvRaw } from '../lib/despesas-csv-parse';
import { ensureDespesasCsvCategoryNamesInDb } from '../lib/despesas-csv-sync-categories';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

dotenv.config({ path: path.join(root, '.env.local') });
dotenv.config({ path: path.join(root, '.env') });

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
  const names = uniqueCategoryNamesFromDespesasCsvRaw(content);
  if (names.length === 0) {
    console.log('Nenhuma categoria encontrada no CSV.');
    return;
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  const { inserted, skipped } = await ensureDespesasCsvCategoryNamesInDb(db, names);

  console.log(
    `\nConcluído: ${inserted} nova(s), ${skipped} já existente(s). Total no CSV: ${names.length}.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
