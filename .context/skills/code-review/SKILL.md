---
type: skill
name: Code Review
description: Revisão de qualidade, padrões e boas práticas no repositório Recanto
skillSlug: code-review
phases: [R, V]
status: filled
scaffoldVersion: "2.0.0"
---

# Code Review — Recanto

## Quando usar

- Antes de merge ou ao pedir revisão de ficheiros alterados.
- Ao validar aderência a Next.js + Drizzle + estrutura do repo.

## Checklist

### Arquitetura

- [ ] **Serviços:** lógica de persistência em `services/*/*.service.ts`, não espalhada em JSX.
- [ ] **Actions:** mutações servidor em `services/*/*.actions.ts` (ou padrão equivalente do projeto).
- [ ] **Hooks:** estado complexo em `hooks/` ou no próprio componente quando local.
- [ ] **Tipos:** sem `any` gratuito; props com interface nomeada.

### Dados (Drizzle / Neon)

- [ ] Alterações de modelo em **`lib/db/schema.ts`** acompanhadas de plano de migração/push.
- [ ] Sem credenciais ou URLs sensíveis no código.
- [ ] Queries via API Drizzle; evitar SQL raw com interpolação de input do utilizador.

### UI e acessibilidade

- [ ] Reutilização de `@/components/ui/*` quando existir equivalente.
- [ ] **Tabelas:** `tbody` só com `tr`; overlays fora da `<table>`.
- [ ] Evitar `opacity-0` sem animação comprovada no projeto.

### Segurança e robustez

- [ ] Validação de inputs (Zod ou similar) antes de gravar.
- [ ] Tratamento de erros em actions/async; mensagens adequadas ao utilizador.
- [ ] Não expor stack traces em produção na UI.

### Qualidade

- [ ] `npm run lint` limpo para ficheiros tocados.
- [ ] Nomes e organização coerentes com pastas existentes.
- [ ] Sem `console.log` de debug em código de app (scripts como seed são excepção).

### Internacionalização

- O projeto **não** usa i18n global ainda; textos em PT na UI são aceitáveis. Se se introduzir i18n, aí sim exigir chaves centralizadas.

## Template de resposta

```markdown
## Resumo da revisão

### Pontos fortes
- …

### Sugestões (não bloqueantes)
- …

### Alterações obrigatórias
- …

### Checklist
- [ ] Arquitetura
- [ ] Drizzle / schema
- [ ] UI / a11y
- [ ] Segurança
- [ ] Lint
```

## Problemas frequentes

| Problema | Orientação |
|----------|------------|
| Lógica DB no componente | Mover para service/action |
| Schema alterado sem push | `npm run db:push` + workflow se aplicável |
| `any` | Tipar ou usar inferência do Drizzle |
| Estrutura `src/` de outro projeto | Raiz: `app/`, `components/`, `lib/`, `services/` |

## Recursos

- [project-overview.md](../../docs/project-overview.md)
- [architecture.md](../../docs/architecture.md)
