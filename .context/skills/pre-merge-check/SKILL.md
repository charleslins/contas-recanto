---
name: pre-merge-check
description: Use antes de fazer merge de uma feature branch para main, ou quando for solicitada uma validação final, revisão de prontidão ou checagem pré-merge
---

# Pre-Merge Checklist

Validação abrangente antes de fazer merge de uma feature branch. Verifica qualidade de código, testes, tipos, documentação e breaking changes — alinhado com as regras do projeto Heure C2.

## Quando Usar

- Antes de fazer merge de qualquer feature branch para main
- Quando solicitado: "está pronto para merge?", "revisão final", "pre-merge"
- Antes de criar uma release

## Steps

### 1. Obter escopo completo das mudanças

```bash
git log --oneline main...HEAD
git diff --stat main...HEAD
```

### 2. Percorrer cada categoria do checklist

---

### Qualidade de Código

- [ ] Sem `console.log`, `debugger` ou código de debug (usar `logger` do projeto em vez disso)
- [ ] Sem blocos de código comentados
- [ ] Sem TODO/FIXME sem issue vinculada
- [ ] Error handling presente para casos de falha (usar `ErrorHandlingService` ou `ErrorFactory`)
- [ ] Sem secrets, API keys ou credenciais hardcoded
- [ ] Sem uso de `any` sem justificativa — projeto tem dívida técnica de ~800 ocorrências, não aumentar
- [ ] Textos de UI passam pela função `t()` — sem strings hardcoded em PT/FR/EN/ES
- [ ] Funções com tipo de retorno explícito (projeto tem ~400 sem tipo)

---

### Testes

- [ ] Novo código tem testes correspondentes (Vitest para unit, Playwright para E2E)
- [ ] Verificar se existem testes para arquivos alterados:

```bash
git diff --name-only main...HEAD
```

Buscar arquivos `.test.ts`, `_test.go`, `test_*.py` correspondentes.

- [ ] Testes cobrem o happy path e pelo menos um edge case
- [ ] Testes de resiliência presentes se usar `withRetryAndCircuitBreaker`

---

### Tipos e Build

- [ ] Sem tipos `any` sem justificativa documentada
- [ ] Verificar erros de tipo:

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] Build passa sem erros:

```bash
npm run build
```

- [ ] Lint passa:

```bash
npm run lint
```

- [ ] Checar textos hardcoded:

```bash
npm run check:hardcode
```

---

### Documentação

- [ ] Mudanças de API pública têm docs atualizados (JSDoc nos services/presenters)
- [ ] Breaking changes documentados na descrição do PR
- [ ] Novas variáveis de ambiente documentadas em `.env.example`
- [ ] Novos componentes têm props documentadas via interface TypeScript

---

### Breaking Changes

- [ ] Mudanças de endpoint são backward-compatible (ou sinalizado)
- [ ] Mudanças de schema do Supabase têm migrations
- [ ] Mudanças de formato de configuração estão documentadas
- [ ] RLS policies não foram removidas ou enfraquecidas

---

### Arquitetura (específico Heure C2)

- [ ] Padrão MVC com Presenters respeitado: `Components → Hooks → Presenters → Services → Supabase`
- [ ] Sem lógica de negócio direta em componentes (deve estar em services/presenters)
- [ ] Multi-tenancy preservado: filtros por `company_id` presentes onde necessário
- [ ] Sem chamadas diretas ao Supabase em componentes (usar services)

---

### Arquivos que não deveriam ser commitados

- [ ] Sem `.env` ou `.env.local` no diff
- [ ] Sem `node_modules/` no diff
- [ ] Sem `.DS_Store` ou arquivos de IDE no diff

```bash
git diff --name-only main...HEAD | grep -E "\.env$|node_modules|\.DS_Store"
```

---

### 3. Fornecer avaliação de prontidão para merge

**Pronto para merge:** Sim / Não / Com correções

**Passando:**
- [Listar o que está bem]

**Precisa de atenção:**
- [Listar o que precisa corrigir antes do merge]

**Veredicto:** [Recomendação em 1-2 frases]

---

## Regras

- Esta é uma verificação de gate final, não uma revisão de código. Focar em prontidão para merge, não estilo.
- Verificar arquivos que não deveriam ser commitados: `.env`, `node_modules`, `.DS_Store`.
- Se testes existem, tentar rodá-los. Se falharem, reportar quais.
- Ser decisivo. Dar um veredicto claro de Sim / Não / Com-correções.
- Para o projeto Heure C2, atenção especial a: multi-tenancy, RLS, i18n e dívida técnica acumulada.
