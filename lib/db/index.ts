import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL não configurada. Defina a variável no ambiente (.env.local/.env ou Vercel).');
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });