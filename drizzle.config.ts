import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

const url = process.env.DATABASE_URL || 'file:local.db';

/** Turso / LibSQL remoto — drizzle-kit precisa de dialect `turso` + authToken. */
const isLibsqlRemote = url.startsWith('libsql://');

export default defineConfig(
  isLibsqlRemote
    ? {
        schema: './lib/db/schema.ts',
        out: './drizzle',
        dialect: 'turso',
        dbCredentials: {
          url,
          authToken: process.env.DATABASE_AUTH_TOKEN ?? '',
        },
      }
    : {
        schema: './lib/db/schema.ts',
        out: './drizzle',
        dialect: 'sqlite',
        dbCredentials: { url },
      }
);
