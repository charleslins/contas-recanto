---
name: style-review
description: Revisão de estilo e convenções alinhada ao Recanto (ESLint, TS, Next, estrutura de pastas)
---

# Style review — Recanto

## Quando usar

- Pedidos explícitos de revisão de estilo ou consistência com o repo.

## 1. Config do projeto

```bash
cat eslint.config.* 2>/dev/null || cat .eslintrc.* 2>/dev/null
cat .prettierrc* 2>/dev/null
cat .editorconfig 2>/dev/null
```

**Convenções canónicas:** `.cursorrules`, `.context/docs/architecture.md`.

## 2. Diff

```bash
git diff --name-only HEAD~1
git diff HEAD~1
```

(Ajuste o range ao conjunto real de commits/PR.)

## 3. TypeScript / React

- `const` por defeito; sem `var`
- Props com **interface** nomeada
- Evitar `enum`; preferir unions ou `as const`
- Componentes funcionais; hooks no topo

## 4. Estrutura Recanto

- UI em `components/`; primitivos em `components/ui/`
- Dados em `services/*/*.service.ts` e `*.actions.ts`
- Schema Drizzle só em `lib/db/schema.ts`
- Alias `@/` para imports da raiz

## 5. UI / marcação

- Tabelas HTML válidas (`tbody` → `tr` → `td`/`th`)
- Evitar `opacity-0` sem transição definida no projeto

## 6. Logging

- Evitar `console.log` em código de app; scripts (`seed`, etc.) podem usar `console`.

## 7. i18n

- O projeto **não** impõe `t()` globalmente ainda; se existir política futura, alinhar nessa altura.

## Saída sugerida

- **Score** opcional X/10  
- **Violações:** `ficheiro:linha` — problema → sugestão  
- **Positivos:** o que está alinhado  
- Separar **auto-fix** (Prettier/format) vs **manual**

## Regras

- Só reportar problemas **no diff** em revisão de PR, salvo pedido explícito de auditoria completa.
- Não exigir padrões de **outros** projetos (Vite, Supabase, `src/presenters/`).
