---
description: Criar aplicação Next.js com TypeScript, Tailwind, ESLint e boas práticas actuais
---

# Nova aplicação Next.js

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).


Este workflow cobre a criação ou alinhamento de um projecto Next.js às boas práticas actuais.

## Limites e cuidados

- TypeScript para segurança de tipos
- App Router (não Pages Router) salvo pedido explícito
- Preferir Server Components quando possível
- Dependências mínimas e justificadas

## Recanto (repositório actual)

O **Recanto** já é Next.js 15 com `app/`, `components/`, `lib/`, `services/`, alias `@/*` na **raiz** (sem pasta `src/`). Use este workflow para **novos** projectos ou para alinhar um scaffold ao mesmo padrão.

## Passos

### 1. Inicializar o projeto (greenfield)

Para projeto novo na raiz (sem `src/`, alinhado ao Recanto):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --import-alias "@/*"
```

(Se o wizard perguntar pela pasta `src/`, escolher **não**, para ficar alinhado ao Recanto: `app/` na raiz.)

Se o repositório **já existir** (como o Recanto), **não** correr `create-next-app` por cima — apenas comparar estrutura com os passos seguintes.

### 2. Instalar dependências essenciais

```bash
npm install clsx tailwind-merge lucide-react
```

Opcional (o Recanto já usa Zod noutros contextos):

```bash
npm install zod
```

### 3. Set Up Utilities

Criar ou manter `lib/utils.ts` na raiz (não em `src/lib/`):

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 4. Configurar Tailwind (`content`)

Garantir que `tailwind.config` inclui caminhos **sem** `src/`:

```typescript
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./lib/**/*.{js,ts,jsx,tsx,mdx}",
],
```

### 5. App Router

Ficheiros em `app/layout.tsx`, `app/page.tsx`, estilos globais em `app/globals.css` (ou equivalente do template).

### 6. Estrutura alvo (como o Recanto)

```
app/
components/
  ui/
lib/
  db/
services/
hooks/
```

### 7. Verificar a configuração

```bash
npm run dev
```

Abrir http://localhost:3000 para confirmar que a app está a correr.

## Orientações

- Alias `@/` para imports limpos
- Componentes pequenos e focados
- TypeScript em modo `strict`
- Preferir Tailwind ou CSS Modules a CSS-in-JS pesado
- Usar recursos nativos do Next.js (`Image`, `Link`, optimização de fontes)

## Referência

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Tailwind](https://tailwindcss.com/docs)
