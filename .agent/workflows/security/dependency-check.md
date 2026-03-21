---
description: Verificar dependências vulneráveis e sugerir actualizações
---

# Verificação de dependências

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a identificar dependências vulneráveis e actualizá-las com segurança.

## Limites e cuidados

- Não actualizar automaticamente sem confirmação
- Verificar *breaking changes* em major versions
- Priorizar por gravidade
- Testar após upgrades

## Passos

### 1. Gestor de pacotes

- `package-lock.json` → npm
- `yarn.lock` → yarn
- `pnpm-lock.yaml` → pnpm
- Python / Go conforme ficheiros do repo

### 2. Auditoria

**Node:**

```bash
npm audit
# ou yarn audit / pnpm audit
```

**Python:** `pip-audit`, `safety`, etc.

### 3. Analisar resultados

- Pacote e versão
- Gravidade
- CVE se existir
- Versão corrigida

### 4. Priorizar

| Prioridade | Acção |
|------------|--------|
| Crítica / alta | Corrigir rapidamente |
| Média | Corrigir em breve |
| Baixa | Quando conveniente |

### 5. Breaking changes

- *Changelog* do pacote
- Major version?
- Dependência directa vs transitiva

### 6. Sugerir upgrades

- Versão actual vs recomendada
- Notas de migração

### 7. Aplicar

```bash
npm audit fix
# ou actualizar package.json manualmente + npm install
```

### 8. Verificar

- `npm audit` de novo
- Testes e `npm run build`

## Princípios

- Manter dependências actualizadas
- *Lockfile* para builds reprodutíveis
- Rever o que se instala
- Preferir pacotes mantidos activamente

## Referência

- Documentação `npm audit` / equivalente
- Base CVE e *changelogs*
