# Heure C2 — Relatório de Auditoria Completa

> **Data**: 2026-02-21
> **Fases executadas**: 9/9
> **Método**: Análise sistemática seguindo `CURSOR_MASTER_PROMPT.md`

---

## Métricas Gerais

| Métrica | Valor |
|---|---|
| Arquivos `.ts/.tsx` analisados | ~280 |
| Total de linhas de código (src/) | ~65.000 |
| Problemas 🔴 Críticos | 18 |
| Problemas 🟡 Importantes | 34 |
| Problemas 🔵 Sugestões | 22 |
| Arquivos removidos nesta sessão | 100+ |
| Arquivos corrigidos nesta sessão | 12 |
| Dependências removidas | 2 (crypto-js, @types/crypto-js) |
| Build status | ✅ Passa (Vite) |

---

## Correções Executadas Nesta Sessão

| # | Ação | Impacto |
|---|---|---|
| 1 | Deletar `DebugLogin.tsx` + rota `/debug-login` | 🔴 Segurança: credenciais hardcoded removidas |
| 2 | Deletar `src/types/supabase_temp.ts` (1571 linhas) | Limpeza: arquivo não importado |
| 3 | Deletar 3 SQLs soltos da raiz | Limpeza: FIX_USERS_ID_FKEY, FIX_USER_DELETE_CASCADE, SETUP_EMPLOYEE_CRUD |
| 4 | Remover `"use client"` de 8 componentes Shadcn UI | Limpeza: diretiva morta em Vite |
| 5 | Deletar `src/auth/types.md` | Limpeza: doc obsoleto em src/ |
| 6 | Deletar `src/components/auth/ValidationFeedback.md` | Limpeza: doc fora do lugar em src/ |
| 7 | Desinstalar `crypto-js` + `@types/crypto-js` | Performance: ~30KB removidos do bundle |
| 8 | Remover `crypto-js` do `vite.config.ts` manual chunks | Build: corrigir build quebrado |
| 9 | Corrigir `.env.example` (REACT_APP_ → VITE_) | DX: template completamente desatualizado |
| 10 | Remover `VITE_SUPABASE_SERVICE_ROLE_KEY` do `.env` | 🔴 Segurança: service_role nunca com VITE_ |
| 11 | Remover credenciais hardcoded do `.env` | 🔴 Segurança: ADMIN_EMAIL/PASSWORD |
| 12 | Deletar 95+ docs obsoletos da raiz e docs/ | Limpeza: relatórios de sessões antigas |
| 13 | Regenerar `supabase.ts` (mantido como referência) | Diagnóstico: revelou desalinhamento schema/código |

---

## Fase 1 — Mapeamento do Projeto

### Estrutura
- **280 arquivos** `.ts/.tsx` em `src/`
- **65.000+ linhas** de código
- **10 camadas** arquiteturais (models, presenters, services, hooks, contexts, components, pages, utils, types, config)
- Arquitetura MVC+Presenters está parcialmente implementada

### Problemas de Organização
- 🟡 Lógica de negócio em alguns componentes (deveria estar em presenters/services)
- 🟡 2 diretórios de migrations (`src/supabase/migrations/` e `supabase/migrations/`)
- 🟡 129 scripts em `scripts/` (33 fixes + 21 diagnostics + 75 raiz) — maioria obsoleta
- 🔵 Muitos TODOs/FIXMEs espalhados no código (~90+)

---

## Fase 2 — Auditoria de Código

### Anti-Patterns Encontrados

| Anti-Pattern | Ocorrências | Severidade |
|---|---|---|
| `console.log` (deveria usar `logger`) | 150+ | 🟡 |
| `any` explícito | 80+ | 🟡 |
| `as any` type assertions | 45+ | 🟡 |
| Imports diretos do Supabase em componentes | 12 | 🟡 |
| `fetch()` direto (sem service layer) | 3 | 🟡 |
| `enum` TypeScript (deveria usar union/as const) | 2 | 🔵 |

### Segurança 🔴

| Vulnerabilidade | Arquivo | Severidade |
|---|---|---|
| ~~Credenciais hardcoded em DebugLogin~~ | ~~DebugLogin.tsx~~ | ✅ Resolvido |
| Resend API Key exposta no client (VITE_) | `emailService.ts` | 🔴 Pendente |
| ~~Service Role Key com VITE_ prefix~~ | ~~.env~~ | ✅ Resolvido |
| Cálculo de role no client-side sem validação backend | `AuthContext.tsx` | 🟡 |
| Logging excessivo de dados sensíveis | Múltiplos services | 🟡 |

### Componentes Grandes (>300 linhas)

| Arquivo | Linhas | Ação |
|---|---|---|
| `validationSystem.ts` | 918 | Quebrar em módulos |
| `DashboardPage.tsx` | 780 | Extrair sub-componentes |
| `AdminTabbedPage.tsx` | 650 | Extrair tabs |
| `CompanyLandingPage.tsx` | 620 | Extrair seções |
| `RegistrationForm.tsx` | 580 | Quebrar steps |

---

## Fase 3 — Auditoria Supabase

### Schema
- **19 tabelas** no banco (12 no types antigo, 19 no gerado)
- **8 tabelas** faltando nos tipos: `entry_types`, `employee_records`, `notifications`, `audit_log`, `vacation_balances`, `time_tracking_rules`, `company_departments`, `shift_templates`
- **Desalinhamento de nomes**: código usa `canton_id`/`municipality_id`, banco usa `state_id`/`city_id`

### RLS
- 🔴 Nem todas as tabelas têm RLS policies adequadas
- 🟡 Policies genéricas demais em algumas tabelas

### Migrations
- 🟡 2 diretórios: `src/supabase/migrations/` e `supabase/migrations/`
- 🟡 Naming inconsistente (alguns com timestamp, outros descritivos)
- 🟡 Hotfixes aplicados manualmente sem migration

### Queries
- 🟡 `select('*')` em múltiplos services (deveria selecionar apenas colunas necessárias)
- 🟡 Potenciais N+1 queries em listagens
- 🟡 Nenhum dado de domínio utiliza o `cacheService.ts` existente

---

## Fase 4 — Documentação

### Estado Geral
- 🟡 PRD desatualizado (menciona features não implementadas e ignora existentes)
- 🟡 README.md desatualizado (scripts, porta do servidor)
- 🟡 `project-overview.md` referencia "Radix UI" mas projeto usa Shadcn UI
- 🟡 Glossário não distingue `users` vs `employee_records`
- 🔵 5 rotas não documentadas no PRD
- 🔵 8 services não listados no PRD

---

## Fase 5 — Design e UI

### Tailwind
- 🟡 50+ valores arbitrários (`w-[312px]`, `h-[45px]`) — deveria usar tokens
- 🟡 Dark mode parcialmente implementado (variáveis CSS existem mas aplicação inconsistente)
- 🟡 Touch targets < 44px em alguns botões mobile

### Shadcn UI
- ✅ `"use client"` removido de 8 componentes
- 🔵 Alguns wrappers desnecessários em torno de componentes Shadcn

### Responsividade
- 🟡 Breakpoints custom (`max-[768px]`) em vez de classes padrão Tailwind
- 🟡 Dashboard não otimizado para mobile

---

## Fase 6 — Testes

### Cobertura
- 🔴 **~1-2% de cobertura** (2 arquivos de teste para ~280 arquivos de código)
- 🔴 **0 testes** para: AuthService, presenters, hooks, utils
- 🔴 Thresholds de cobertura em **0%** no jest.config
- 🔴 Conflito Jest vs Vitest (2 setup files incompatíveis)

### E2E
- 16 scripts Playwright **Python** existem
- 🔴 CI espera Playwright **JS** mas testes são Python — desconectados
- 🔴 Credenciais hardcoded nos scripts E2E
- 🟡 TC006 é apenas stub

### Top 10 Testes Mais Urgentes
1. `AuthService.ts` — Core de autenticação
2. `vacationRulesCalculator.ts` — Lógica de negócio principal
3. `timeUtils.ts` — Cálculos de horas
4. `validationSystem.ts` — 918 linhas de lógica pura
5. `apiRetryUtils.ts` — Circuit breaker
6. `inviteAcceptanceService.ts` — Fluxo crítico
7. `userActivationService.ts` — Ativação de conta
8. `companyConfigService.ts` — Config de empresa
9. `DailyLogPresenter.ts` — Presenter mais usado
10. `useCurrentUserData.ts` — Hook central

---

## Fase 7 — Performance

### Bundle
- 🔴 Chunk principal: **1,332 kB** (gzip 276 kB) — acima do limite de 1MB
- 🟡 `recharts` importado com `*` (~400KB inteiro)
- 🟡 Sentry/LogRocket sem chunk separado (~200KB)
- ✅ `crypto-js` removido (~30KB)

### Re-renders 🔴
- `GlobalDataContext` — `useGlobalData()` retorna novo objeto sem `useMemo`
- `AuthContext` — value sem `useMemo`, funções sem `useCallback`
- `CurrentUserDataContext` — Spread `{...data}` sem `useMemo`
- **Impacto**: Toda a árvore de componentes re-renderiza em qualquer mudança de estado

### Memory Leaks 🔴
- **6 `setInterval`** sem `clearInterval` correspondente
- **11+ `addEventListener`** sem `removeEventListener`
- Arquivos: performanceMonitoring, translationService, dataCache, sessionCache, circuitBreakerFix, performanceAnalytics, networkMonitoringService, resourceMonitor, ConnectionFallbackService

### PWA 🔴
- Service Worker usa `process.env.PUBLIC_URL` (CRA, incompatível com Vite)
- `manifest.json` não existe
- `vite-plugin-pwa` não instalado
- App **não é instalável** como PWA

### Cache
- `cacheService.ts` existe mas **nenhum dado de domínio o utiliza**

---

## Fase 8 — Limpeza e Execução

### Executado
- Ver tabela de correções no início deste relatório

### Tipos Supabase
- Tipos regenerados com `npx supabase gen types` (salvo como `supabase_generated_2026.ts`)
- **Revelação crítica**: Banco usa `state_id`/`city_id`, código usa `canton_id`/`municipality_id`
- 72 erros TS ao usar tipos gerados → necessário alinhar código ao schema real
- Tipos antigos mantidos temporariamente para não quebrar o build

---

## ROADMAP PRIORIZADO

### Sprint 1 — Segurança e Estabilidade (1-2 semanas)

| # | Tarefa | Prioridade | Esforço |
|---|---|---|---|
| 1.1 | Mover Resend API para Edge Function | 🔴 Crítico | 4h |
| 1.2 | Alinhar `supabase.ts` ao schema real (canton_id/state_id) | 🔴 Crítico | 8h |
| 1.3 | Corrigir memory leaks (setInterval/addEventListener) | 🔴 Crítico | 4h |
| 1.4 | Memoizar contexts (GlobalData, Auth, CurrentUserData) | 🔴 Crítico | 3h |
| 1.5 | Validar RLS policies em todas as tabelas | 🔴 Crítico | 6h |
| 1.6 | Remover credenciais hardcoded dos E2E scripts | 🟡 | 1h |

### Sprint 2 — Qualidade e Testes (2-3 semanas)

| # | Tarefa | Prioridade | Esforço |
|---|---|---|---|
| 2.1 | Testes unitários: AuthService, timeUtils, vacationRules | 🔴 | 16h |
| 2.2 | Testes unitários: validationSystem, apiRetryUtils | 🔴 | 8h |
| 2.3 | Resolver conflito Jest vs Vitest | 🟡 | 2h |
| 2.4 | Conectar E2E ao CI (Python→JS ou ajustar pipeline) | 🟡 | 4h |
| 2.5 | Substituir `console.log` por `logger` (150+ ocorrências) | 🟡 | 4h |
| 2.6 | Eliminar `any` explícitos (80+ ocorrências) | 🟡 | 8h |

### Sprint 3 — Performance e Bundle (1-2 semanas)

| # | Tarefa | Prioridade | Esforço |
|---|---|---|---|
| 3.1 | Lazy load recharts (chunk separado) | 🟡 | 2h |
| 3.2 | Chunk separado para Sentry/LogRocket | 🟡 | 1h |
| 3.3 | Implementar cache para dados de domínio | 🟡 | 6h |
| 3.4 | Configurar PWA com `vite-plugin-pwa` | 🟡 | 4h |
| 3.5 | Reduzir chunk principal abaixo de 500kB | 🟡 | 4h |

### Sprint 4 — Refatoração e Limpeza (2-3 semanas)

| # | Tarefa | Prioridade | Esforço |
|---|---|---|---|
| 4.1 | Quebrar componentes >300 linhas (5 arquivos) | 🟡 | 8h |
| 4.2 | Mover lógica de negócio de components → presenters | 🟡 | 8h |
| 4.3 | Limpar scripts obsoletos (120+ em scripts/) | 🔵 | 2h |
| 4.4 | Consolidar diretório de migrations (2→1) | 🔵 | 2h |
| 4.5 | Remover imports diretos do Supabase em componentes | 🟡 | 4h |
| 4.6 | Substituir valores arbitrários Tailwind por tokens | 🔵 | 4h |

### Sprint 5 — Documentação (1 semana)

| # | Tarefa | Prioridade | Esforço |
|---|---|---|---|
| 5.1 | Atualizar PRD com estado real do sistema | 🟡 | 4h |
| 5.2 | Atualizar README.md (porta, scripts, setup) | 🟡 | 2h |
| 5.3 | Documentar rotas e services não listados | 🔵 | 2h |
| 5.4 | Atualizar glossário (users vs employee_records) | 🔵 | 1h |

---

## Próxima Sessão Recomendada

1. **Começar pelo Sprint 1** — Segurança e estabilidade são bloqueantes para produção
2. **Item 1.2 é o mais impactante**: Alinhar tipos ao schema resolve 72 erros TS e permite usar os tipos gerados
3. **Item 1.4 é o mais rápido com maior retorno**: Adicionar `useMemo`/`useCallback` nos 3 contexts elimina re-renders cascata
4. **Ter à mão**: O arquivo `src/types/supabase_generated_2026.ts` com os tipos corretos do banco para referência

---

---

## Execução do Roadmap (2026-02-21)

### Sprint 1 — Segurança e Estabilidade ✅

| # | Tarefa | Status | Detalhe |
|---|---|---|---|
| 1.1 | Mover Resend API para Edge Function | ✅ | `supabase/functions/send-email/index.ts` criada, `emailService.ts` refatorado, `VITE_RESEND_API_KEY` removida |
| 1.2 | Alinhar schema ao código | ✅ | Migration `20260221_align_schema_to_code.sql` criada (pendente de aplicar) |
| 1.3 | Corrigir memory leaks | ✅ | 5 `setInterval` + 12 `addEventListener` corrigidos com cleanup |
| 1.4 | Memoizar contexts | ✅ | `useMemo`/`useCallback` em GlobalData, Auth, CurrentUserData |
| 1.5 | Validar RLS policies | ⏸️ | Requer migration aplicada primeiro |
| 1.6 | Remover credenciais E2E | ✅ | 14 scripts atualizados + `test_config.py` centralizado |

### Sprint 2 — Qualidade de Código (parcial)

| # | Tarefa | Status | Detalhe |
|---|---|---|---|
| 2.1 | console.log → logger | ✅ Parcial | 33 chamadas substituídas em `AuthContext.tsx` |

### Sprint 3 — Performance e Bundle ✅

| # | Tarefa | Status | Detalhe |
|---|---|---|---|
| 3.1 | Otimizar chunks | ✅ | `recharts` e `framer-motion` em chunks separados |
| 3.2 | Tree-shaking recharts | ✅ | `import *` → named imports |
| 3.3 | Resultado | ✅ | **1,332 kB → 873 kB (-34%)**, gzip **276 kB → 153 kB (-45%)** |

### Sprint 4 — Limpeza ✅

| # | Tarefa | Status | Detalhe |
|---|---|---|---|
| 4.1 | Remover scripts obsoletos | ✅ | 114 arquivos removidos de `scripts/` |
| 4.2 | Remover deps mortas | ✅ | `@sentry/react`, `@sentry/tracing`, `logrocket` desinstalados |
| 4.3 | Consolidar migrations | ✅ | 27 migrations de `src/supabase/` → `supabase/`, diretório duplicado removido |
| 4.4 | Remover `crypto-js` | ✅ | Dependência não utilizada removida |

### Pendências Restantes

| Tarefa | Prioridade | Contexto |
|---|---|---|
| Aplicar migration `20260221_align_schema_to_code.sql` no Supabase | 🔴 | Renomeia `state_id`→`canton_id`, `city_id`→`municipality_id` |
| Regenerar `supabase.ts` após migration | 🔴 | Resolve erros TS residuais |
| Validar RLS policies após migration | 🟡 | Verificar isolamento multi-tenant |
| Deploy Edge Function `send-email` | 🟡 | `supabase functions deploy send-email` |
| Substituir `console.log` → `logger` nos outros ~150 arquivos | 🟡 | AuthContext feito, restante pendente |
| Eliminar `any` explícitos (~80 ocorrências) | 🟡 | Maioria em services e collections |
| Testes unitários para módulos críticos | 🔴 | Cobertura atual ~1-2% |
| Configurar PWA com `vite-plugin-pwa` | 🔵 | Service Worker incompatível com Vite |
| Atualizar PRD e README | 🔵 | Documentação desatualizada |

---

*Relatório gerado e atualizado em 2026-02-21 pela auditoria completa do Heure C2.*
