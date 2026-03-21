import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Papa from 'papaparse';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'lib', 'Despesas.csv');

const content = fs.readFileSync(src, 'utf8');
const lines = content.split(/\r?\n/);
// Linha 1: título "DESPESAS"; linha 2: cabeçalhos legados
const body = lines.slice(1).join('\n');

const parsed = Papa.parse(body, {
  header: true,
  skipEmptyLines: true,
});

const outRows = [];
for (const raw of parsed.data) {
  const norm = (k) =>
    String(k || '')
      .replace(/^\uFEFF/, '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  const row = {};
  for (const [k, v] of Object.entries(raw || {})) {
    row[norm(k)] = (v ?? '').toString().trim();
  }

  const data = row['data'] || '';
  const categoria = row['categoria'] || '';
  const credor = row['credor'] || '';
  const descricao = row['descricao'] || '';
  const valor = row['valor'] || '';

  if (!data && !categoria && !credor && !descricao && !valor) continue;

  outRows.push({
    data,
    categoria,
    credor,
    'descrição': descricao,
    valor,
  });
}

const out = Papa.unparse(outRows, {
  columns: ['data', 'categoria', 'credor', 'descrição', 'valor'],
  quotes: true,
});

fs.writeFileSync(src, out, 'utf8');
console.log('OK:', outRows.length, 'linhas ->', src);
