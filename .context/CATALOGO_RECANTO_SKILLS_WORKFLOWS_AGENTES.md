# Catálogo Recanto — Skills, workflows e agentes

Este ficheiro lista **todos** os recursos de IA que o projeto **Recanto** pode usar — **skills** (`.context/skills/`), **agentes** (`.context/agents/`) e **workflows** (`.agent/workflows/`) — e resume **as adaptações feitas** em relação a templates genéricos (outro stack, outra estrutura de pastas).

**Outros documentos:** regras em `.cursorrules`, visão técnica em `.context/docs/project-overview.md`. Inventário mais largo (inclui CI, `.agent/skills`, etc.): [`INVENTARIO_IA_RECANTO.md`](./INVENTARIO_IA_RECANTO.md).

---

## Padrão de adaptação (o que mudou em relação a um kit “neutro”)

| Área | Adaptação no Recanto |
|------|----------------------|
| **Stack de referência** | Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, **Drizzle ORM** + **Postgres Neon** (`lib/db/`, `services/`). |
| **Pastas** | Código de app em **`app/`**, **`components/`**, **`lib/`**, **`services/`**, **`hooks/`** na **raiz** — **sem** assumir `src/` como raiz da app (diferente de muitos templates Vite/CRA). |
| **Dados** | Schema em `lib/db/schema.ts`; cliente em `lib/db/index.ts`; fluxo típico `npm run db:push` em dev; CI com `.github/workflows/drizzle-push.yml` e `DATABASE_URL`. |
| **Domínio** | Persistência e regras em `services/<domínio>/*.service.ts`; mutações servidor em `*.actions.ts` (padrão do repo). |
| **Workflows (ficheiros `.md`)** | Quase todos começam com o bloco **“Projeto Recanto”** + linha **“Adaptação”** (não assumir Vite/Supabase/`src/`). Vários têm secção extra **`## Recanto (...)`** com caminhos e comandos concretos. Corpo dos passos em **PT-BR**; comandos e APIs mantêm inglês técnico quando é o padrão da ferramenta. |
| **Skills** | Cada `SKILL.md` em `.context/skills/` menciona o Recanto no `description` e/ou no corpo (pastas, Drizzle, actions). |
| **Agentes** | Playbooks em `.context/agents/` descrevem missão e stack Recanto; o agente **`recanto-developer`** é o playbook âncora do repositório. |

---

## 1. Skills — `.context/skills/`

Cada skill = pasta com **`SKILL.md`**. Invocar pelo caminho (ex.: leitura por IA em Cursor).

| ID (pasta) | Ficheiro | Descrição (resumo) | Adaptações Recanto |
|------------|----------|--------------------|--------------------|
| **api-design** | [`api-design/SKILL.md`](./skills/api-design/SKILL.md) | Contratos de API ou limites server. | Route Handlers `app/api` / server actions; sem assumir backend externo fixo. |
| **bug-investigation** | [`bug-investigation/SKILL.md`](./skills/bug-investigation/SKILL.md) | Diagnóstico sistemático de bugs. | UI, actions, Drizzle, importação — vocabulário do domínio Recanto. |
| **code-review** | [`code-review/SKILL.md`](./skills/code-review/SKILL.md) | Revisão de qualidade e padrões. | Checklist: `services/*.service.ts`, `*.actions.ts`, `hooks/`, sem `any`, DOM de tabelas válido. |
| **commit-message** | [`commit-message/SKILL.md`](./skills/commit-message/SKILL.md) | Commits convencionais. | **Mensagens em português**, alinhadas ao histórico do repo. |
| **documentation** | [`documentation/SKILL.md`](./skills/documentation/SKILL.md) | Actualizar docs técnicas. | `.context/docs/`, README; variáveis em `.env.example`. |
| **feature-breakdown** | [`feature-breakdown/SKILL.md`](./skills/feature-breakdown/SKILL.md) | Partir feature em tarefas. | Pipeline schema → service → actions → UI no padrão Recanto. |
| **perf-review** | [`perf-review/SKILL.md`](./skills/perf-review/SKILL.md) | Rever performance. | Bundle, listas, gráficos, **queries Drizzle**. |
| **pre-merge-check** | [`pre-merge-check/SKILL.md`](./skills/pre-merge-check/SKILL.md) | Gate antes de merge. | lint/build/schema/secrets no contexto deste repo. |
| **pr-description** | [`pr-description/SKILL.md`](./skills/pr-description/SKILL.md) | Texto de PR. | Contexto, como testar, riscos — GitHub do Recanto. |
| **pr-review** | [`pr-review/SKILL.md`](./skills/pr-review/SKILL.md) | Revisão de PR agregada. | Contra Next.js, Drizzle e estrutura de pastas do repo. |
| **refactoring** | [`refactoring/SKILL.md`](./skills/refactoring/SKILL.md) | Refactor sem mudar comportamento. | Lint/build do projeto; não quebrar actions/services. |
| **security-audit** | [`security-audit/SKILL.md`](./skills/security-audit/SKILL.md) | Checklist de segurança. | Secrets, validação, uso seguro de Drizzle (`DATABASE_URL`). |
| **security-scan** | [`security-scan/SKILL.md`](./skills/security-scan/SKILL.md) | Varrimento rápido deps / superfície. | `npm audit`, padrões óbvios no Recanto. |
| **severity-review** | [`severity-review/SKILL.md`](./skills/severity-review/SKILL.md) | P0–P3 / triagem. | Priorização no contexto do produto Recanto. |
| **style-review** | [`style-review/SKILL.md`](./skills/style-review/SKILL.md) | ESLint, TS, convenções. | Estrutura real do repo (não `src/` por defeito). |
| **test-generation** | [`test-generation/SKILL.md`](./skills/test-generation/SKILL.md) | Casos de teste sugeridos. | Quando existir runner; foco em `lib/` e services. |

**Índice curto:** [`.context/skills/README.md`](./skills/README.md)  
**Nota:** existiu pasta corrupta `code_reviewer/` — usar **`code-review/`** e **`pre-merge-check/`**.

---

## 2. Agentes (playbooks) — `.context/agents/`

Ficheiros **`.md`** por papel (exceto `README.md`, que é índice).

| Ficheiro | Papel | Adaptações Recanto |
|----------|--------|-------------------|
| [`recanto-developer.md`](./agents/recanto-developer.md) | Desenvolvimento full-stack **âncora** do repo. | Stack fechada: App Router, Drizzle, Neon, `services/*`, shadcn; proíbe assumir Vite/Supabase/`src/`. |
| [`feature-developer.md`](./agents/feature-developer.md) | Features dados + UI. | Mesmo alinhamento de pastas e camada de dados. |
| [`code-reviewer.md`](./agents/code-reviewer.md) | Gate de qualidade. | Critérios do monorepo Next + Drizzle. |
| [`backend-specialist.md`](./agents/backend-specialist.md) | Camada de dados e servidor. | Drizzle, Neon, server actions / services. |
| [`frontend-specialist.md`](./agents/frontend-specialist.md) | UI e App Router. | `components/`, shadcn, dashboard. |
| [`architect-specialist.md`](./agents/architect-specialist.md) | Decisões estruturais. | Módulos e limites do Recanto. |
| [`database-specialist.md`](./agents/database-specialist.md) | Schema e dados. | `lib/db/schema.ts`, seed, `db:push`. |
| [`devops-specialist.md`](./agents/devops-specialist.md) | CI, secrets, scripts. | `drizzle-push.yml`, envs. |
| [`security-auditor.md`](./agents/security-auditor.md) | Risco e credenciais. | Validação, deps, sem secrets no código. |
| [`bug-fixer.md`](./agents/bug-fixer.md) | Correcção de defeitos. | Stack e fluxos reais do app. |
| [`refactoring-specialist.md`](./agents/refactoring-specialist.md) | Refactor incremental. | Sem regressões no padrão service/action. |
| [`documentation-writer.md`](./agents/documentation-writer.md) | Documentação. | `.context/docs/` e artefactos do repo. |
| [`test-writer.md`](./agents/test-writer.md) | Estratégia de testes. | Quando houver suíte; alinhar a `testing-strategy.md`. |
| [`performance-optimizer.md`](./agents/performance-optimizer.md) | Performance. | Bundle, renders, queries. |
| [`mobile-specialist.md`](./agents/mobile-specialist.md) | Responsive / PWA web. | Next.js + Tailwind do projeto. |

**Índice:** [`.context/agents/README.md`](./agents/README.md)

---

## 3. Workflows — `.agent/workflows/`

**Registry:** [`.agent/workflows/registry.json`](../.agent/workflows/registry.json) (**44** entradas). Mais **2** ficheiros na pasta do workflows **sem** entrada no registry: `pwa-setup.md`, `ui-ux-homogenize.md` → **46** ficheiros `.md` no total.

**Legenda “Secção Recanto”:** workflows com bloco adicional `## Recanto` (além do preâmbulo fixo em blockquote).

### 3.1 `ai-tools/`

| ID | Ficheiro | Descrição (registry) | Secção Recanto extra |
|----|----------|----------------------|----------------------|
| ai-agent | `ai-tools/ai-agent.md` | Agentes IA com ferramentas. | Não |
| prompt-engineering | `ai-tools/prompt-engineering.md` | Prompts para apps LLM. | Não |
| rag-pipeline | `ai-tools/rag-pipeline.md` | Pipelines RAG. | Não |
| workflow-creator | `ai-tools/workflow-creator.md` | Criar workflows em `.agent/workflows` (Recanto). | Não (meta; já cita Recanto no registry) |

### 3.2 `creative/`

| ID | Ficheiro | Descrição (registry) | Secção Recanto extra |
|----|----------|----------------------|----------------------|
| dashboard-ui | `creative/dashboard-ui.md` | Dashboards admin. | Não |
| design-system | `creative/design-system.md` | Design tokens. | Não |
| email-template | `creative/email-template.md` | Emails HTML. | Não |
| landing-page | `creative/landing-page.md` | Landing pages. | Não |

### 3.3 `database/`

| ID | Ficheiro | Descrição (registry) | Secção Recanto extra |
|----|----------|----------------------|----------------------|
| db-migrate | `database/db-migrate.md` | Migrações seguras. | **Sim** — Drizzle Kit, `lib/db/schema.ts`, `db:push`, CI drizzle-push |
| db-schema | `database/db-schema.md` | Desenho de schema. | **Sim** — Drizzle + Neon, `schema.ts` |
| db-seed | `database/db-seed.md` | Seed / fixtures. | **Sim** — paths e hábitos do repo |

### 3.4 `debugging/`

| ID | Ficheiro | Descrição (registry) | Secção Recanto extra |
|----|----------|----------------------|----------------------|
| debug-error | `debugging/debug-error.md` | Analisar erros. | Não |
| debug-log | `debugging/debug-log.md` | Logging estratégico. | Não |
| performance | `debugging/performance.md` | Optimizar caminhos lentos. | Não |

### 3.5 `deployment/`

| ID | Ficheiro | Descrição (registry) | Secção Recanto extra |
|----|----------|----------------------|----------------------|
| ci-cd | `deployment/ci-cd.md` | Pipelines CI/CD. | Não |
| deploy | `deployment/deploy.md` | Deploy genérico. | Não |
| docker | `deployment/docker.md` | Docker. | Não |
| env-config | `deployment/env-config.md` | Env / secrets. | Não |
| railway-deploy | `deployment/railway-deploy.md` | Railway. | **Sim** — health check Next App Router |
| vercel-deploy | `deployment/vercel-deploy.md` | Vercel. | **Sim** — `DATABASE_URL`, alinhamento Drizzle/produção |

### 3.6 `development/`

| ID | Ficheiro | Descrição (registry) | Secção Recanto extra |
|----|----------|----------------------|----------------------|
| cli-tool | `development/cli-tool.md` | CLI. | Não |
| library | `development/library.md` | Pacotes publicáveis. | Não |
| migrate | `development/migrate.md` | Migrações de tecnologia. | Não |
| new-api | `development/new-api.md` | Novos endpoints. | **Sim** — Next.js / `app/api` |
| new-component | `development/new-component.md` | Componentes UI. | Não |
| new-feature | `development/new-feature.md` | Feature completa. | **Sim** — pipeline típico Recanto |
| new-project | `development/new-project.md` | Scaffold de projeto. | Não |
| nextjs-app | `development/nextjs-app.md` | App Next.js / boas práticas. | **Sim** — repo actual sem `src/`, estrutura como Recanto |
| refactor | `development/refactor.md` | Refactor / qualidade. | Não |
| code-review | `development/code-review.md` | Revisão de código. | Não |

### 3.7 `documentation/`

| ID | Ficheiro | Descrição (registry) | Secção Recanto extra |
|----|----------|----------------------|----------------------|
| api-docs | `documentation/api-docs.md` | Docs de API. | Não |
| architecture | `documentation/architecture.md` | Diagramas (Mermaid, etc.). | Não |
| readme | `documentation/readme.md` | READMEs. | Não |

### 3.8 `git/`

| ID | Ficheiro | Descrição (registry) | Secção Recanto extra |
|----|----------|----------------------|----------------------|
| git-commit | `git/git-commit.md` | Commits convencionais. | Não |
| git-conflict | `git/git-conflict.md` | Conflitos de merge. | Não |
| git-pr | `git/git-pr.md` | Descrições de PR. | Não |
| git-rebase | `git/git-rebase.md` | Rebase interactivo. | Não |

### 3.9 `security/`

| ID | Ficheiro | Descrição (registry) | Secção Recanto extra |
|----|----------|----------------------|----------------------|
| auth-implementation | `security/auth-implementation.md` | Padrões de auth. | Não |
| dependency-check | `security/dependency-check.md` | Deps vulneráveis. | Não |
| security-audit | `security/security-audit.md` | Auditoria / secrets. | Não |

### 3.10 `testing/`

| ID | Ficheiro | Descrição (registry) | Secção Recanto extra |
|----|----------|----------------------|----------------------|
| e2e-test | `testing/e2e-test.md` | E2E (framework detectado). | Não |
| playwright-test | `testing/playwright-test.md` | Playwright. | Não |
| test-coverage | `testing/test-coverage.md` | Cobertura. | Não |
| unit-test | `testing/unit-test.md` | Testes unitários. | **Sim** — estado actual do repo |

### 3.11 Extra (fora do `registry.json`)

| Ficheiro | Uso | Secção Recanto extra |
|----------|-----|----------------------|
| `pwa-setup.md` | Configurar PWA no Next.js. | Conforme preâmbulo + passos do ficheiro |
| `ui-ux-homogenize.md` | Homogeneizar UI/UX. | Conforme preâmbulo + passos do ficheiro |

---

## 4. Como usar este catálogo

1. **Tarefa pontual com passos longos** → workflow em `.agent/workflows/<categoria>/<id>.md`.  
2. **Checklist ou ritual curto** → skill em `.context/skills/<id>/SKILL.md`.  
3. **Definir “papel” da IA na conversa** → agente em `.context/agents/*.md` (preferir `recanto-developer.md` como default).  

**Última revisão:** alinhado ao repositório Recanto (Next.js, Drizzle, Neon, workflows em PT-BR com preâmbulo Recanto).
