# Inventário — IA, skills, workflows e agentes (Recanto)

Documento único com **título**, **descrição** e **função** de cada recurso de apoio à IA e ao desenvolvimento no repositório **Recanto**.

> **Lista completa só de skills + workflows + agentes (com adaptações ao Recanto):** [`.context/CATALOGO_RECANTO_SKILLS_WORKFLOWS_AGENTES.md`](./CATALOGO_RECANTO_SKILLS_WORKFLOWS_AGENTES.md)

---

## 1. Regras e configuração raiz

| Título | Descrição | Função |
|--------|-----------|--------|
| **`.cursorrules`** | Regras consolidadas aplicadas pelo Cursor (stack Next.js, Drizzle, Neon, pastas do repo). | Orientar a IA e contribuintes em cada sessão. |
| **`.cursor/hooks.json`** | Hooks opcionais (ex.: integração context-mode no pretooluse/posttooluse/sessionStart). | Automatizar telemetria ou sandbox de ferramentas, se a CLI estiver instalada. |
| **`.agent/REGRAS_CONSOLIDADAS.md`** | Complemento às regras: TypeScript, Drizzle, actions, UI, qualidade. | Detalhe operacional sem duplicar o `.cursorrules`. |
| **`.agent/rules/README.md`** | Índice da hierarquia de regras e stack resumida. | Ponto de entrada humano para políticas do repo. |

---

## 2. Documentação técnica (`.context/docs/`)

| Título | Descrição | Função |
|--------|-----------|--------|
| **`README.md`** | Índice dos guias em `.context/docs/`. | Navegação para overview, arquitectura, glossário, etc. |
| **`project-overview.md`** | Stack, scripts, variáveis, estrutura de pastas. | Fonte de verdade rápida sobre o Recanto. |
| **`architecture.md`** | Camadas, fluxo de dados, CI de schema. | Decisões técnicas e limites de módulos. |
| **`glossary.md`** | Termos de domínio (transação, categoria, Drizzle, etc.). | Alinhar linguagem de produto e código. |
| **`development-workflow.md`** | Branches, ambiente local, PR, comandos. | Fluxo de trabalho diário. |
| **`data-flow.md`** | Fluxo UI → server actions → Drizzle → Neon. | Entender movimento de dados. |
| **`testing-strategy.md`** | Lint/build e orientação para futuros testes. | Planear qualidade além do build. |
| **`security.md`** | Segredos, validação, dependências, evolução de auth. | Checklist de segurança do projeto. |
| **`tooling.md`** | npm, Drizzle, IDE, CI. | Ferramentas usadas no dia a dia. |
| **`UI-PATTERNS.md`** | shadcn, formulários, estados de UI, a11y. | Consistência de interface. |
| **`codebase-map.json`** | Mapa JSON resumido de entradas e pastas. | Navegação mecânica para IAs. |
| **`PRD.md`** (em `.context/docs`) | Aponta para `PRD.md` na raiz. | Ligação ao documento de produto. |

---

## 3. Skills — `.context/skills/`

Cada skill é um **`SKILL.md`** com instruções accionáveis.

| Título | Descrição | Função |
|--------|-----------|--------|
| **code-review** | Checklist de revisão (Drizzle, Next, UI, TS). | Revisar código antes de merge. |
| **pre-merge-check** | Gate final: diff, lint, build, schema, secrets. | Decidir se está pronto para integrar na main. |
| **style-review** | ESLint, TS, estrutura Recanto, convenções. | Rever estilo e consistência no diff. |
| **pr-review** | Revisão de PR alinhada ao repo. | Segunda leitura de mudanças agregadas. |
| **pr-description** | Modelo de descrição de PR (contexto, testes, riscos). | Abrir PRs claros no GitHub. |
| **commit-message** | Commits convencionais em português. | Mensagens de histórico legíveis. |
| **feature-breakdown** | Quebrar feature em tarefas (schema, service, UI). | Planeamento antes de implementar. |
| **refactoring** | Refactor seguro com lint/build. | Melhorar código sem mudar comportamento. |
| **bug-investigation** | Passos de diagnóstico no stack Recanto. | Encontrar causa raiz de bugs. |
| **test-generation** | Casos de teste sugeridos (quando houver runner). | Preparar suíte futura ou local. |
| **documentation** | Actualizar `.context/docs` e `.env.example`. | Manter docs alinhadas ao código. |
| **api-design** | Contratos de Route Handlers ou boundaries server. | Desenhar APIs quando forem necessárias. |
| **security-audit** | Checklist de segurança focada no repo. | Revisão de risco antes de release. |
| **security-scan** | `npm audit` e grep de segredos. | Varredura rápida de dependências e leaks. |
| **perf-review** | Bundle, listas, gráficos, queries. | Otimização de performance. |
| **severity-review** | Níveis P0–P3 para triagem. | Priorizar bugs e incidentes. |

**Índice:** [`.context/skills/README.md`](./skills/README.md)

---

## 4. Agentes (playbooks) — `.context/agents/`

Guias de **papel** para IA ou equipa.

| Título | Descrição | Função |
|--------|-----------|--------|
| **README.md** | Tabela de todos os agentes. | Escolher o playbook certo. |
| **recanto-developer.md** | Implementação full-stack no padrão do repo. | Playbook principal de desenvolvimento. |
| **feature-developer.md** | Features dados + UI. | Entregar capacidades end-to-end. |
| **code-reviewer.md** | Foco em qualidade e segurança básica. | Gate de revisão. |
| **backend-specialist.md** | Drizzle, Neon, server actions. | Endurecer camada de dados. |
| **frontend-specialist.md** | App Router, shadcn, dashboard. | Evoluir UI/UX técnica. |
| **architect-specialist.md** | Decisões e módulos. | Manter coerência estrutural. |
| **database-specialist.md** | Schema, seed, push. | Modelo relacional e migrações. |
| **devops-specialist.md** | CI, secrets, scripts. | Automação e ambientes. |
| **security-auditor.md** | Credenciais, validação, deps. | Reduzir superfície de ataque. |
| **bug-fixer.md** | Diagnóstico e correção. | Resolver defeitos. |
| **refactoring-specialist.md** | Refactor incremental seguro. | Reduzir dívida sem regressões. |
| **documentation-writer.md** | Docs técnicas. | Comunicar mudanças ao equipa/futuro. |
| **test-writer.md** | Estratégia quando existir runner. | Preparar testes automatizados. |
| **performance-optimizer.md** | Bundle e dados. | Melhorar tempos de resposta. |
| **mobile-specialist.md** | Responsive web / PWA opcional. | Usabilidade em telemóvel. |

---

## 5. Workflows — `.agent/workflows/`

O ficheiro **`registry.json`** lista **44** workflows (id → descrição). O caminho do ficheiro segue `categoria/nome.md` (excepto dois à raiz).

**Cada ficheiro `.md`** começa por um bloco fixo **Projeto Recanto** (stack, pastas, links para `project-overview.md` e `.cursorrules`) e uma linha de **adaptação** para não assumir `src/` ou Vite. Vários workflows têm secção extra **Recanto** com caminhos concretos (ex.: `lib/db/schema.ts`, `npm run db:push`). O **corpo** dos workflows (passos, princípios, `description` no YAML) está em **português (PT-BR)**; blocos de código e comandos mantêm-se em inglês técnico quando é o padrão da ferramenta.

### 5.1 AI & LLM (`ai-tools/`)

| ID (título) | Descrição (registry) | Função no Recanto |
|-------------|----------------------|-------------------|
| **ai-agent** | Criar agentes de IA com ferramentas e capacidades. | Meta/automação; raramente núcleo do produto. |
| **prompt-engineering** | Desenhar e optimizar prompts para aplicações LLM. | Melhorar uso de modelos em scripts ou features IA. |
| **rag-pipeline** | Construir pipelines RAG (embeddings, vector search). | Se se integrar busca semântica sobre dados. |
| **workflow-creator** | Criar novos workflows (template meta). | Manter `.agent/workflows/` organizado. |

### 5.2 Creative & UI (`creative/`)

| ID | Descrição | Função no Recanto |
|----|-----------|-------------------|
| **dashboard-ui** | Interfaces de dashboard admin profissionais. | Inspirar/evoluir o dashboard financeiro. |
| **design-system** | Tokens e análise de design system. | Alinhar shadcn/Tailwind. |
| **email-template** | Templates HTML de email responsivos. | Se notificações por email forem necessárias. |
| **landing-page** | Landing pages para qualquer stack. | Marketing/site externo, não o app principal. |

### 5.3 Database (`database/`)

| ID | Descrição | Função no Recanto |
|----|-----------|-------------------|
| **db-migrate** | Criar e correr migrações com segurança. | Evolução de schema (Drizzle Kit). |
| **db-schema** | Desenhar schemas para ORM/SQL. | Modelar `lib/db/schema.ts`. |
| **db-seed** | Dados de seed e fixtures. | Alargar `lib/db/seed.ts` ou dados de dev. |

### 5.4 Debugging & Performance (`debugging/`)

| ID | Descrição | Função no Recanto |
|----|-----------|-------------------|
| **debug-error** | Analisar erros e stack traces. | Corrigir falhas em dev/prod. |
| **debug-log** | Adicionar logging estratégico. | Instrumentar fluxos difíceis. |
| **performance** | Optimizar caminhos lentos. | Melhorar tempo de resposta e bundle. |

### 5.5 Deployment (`deployment/`)

| ID | Descrição | Função no Recanto |
|----|-----------|-------------------|
| **ci-cd** | Pipelines CI/CD. | Estender GitHub Actions além de Drizzle push. |
| **deploy** | Deploy em plataformas genéricas. | Publicar a app Next.js. |
| **docker** | Containerizar aplicação. | Ambiente reprodutível opcional. |
| **env-config** | Variáveis de ambiente e secrets. | Gerir `DATABASE_URL` e futuras keys. |
| **railway-deploy** | Deploy no Railway. | Hosting alternativo. |
| **vercel-deploy** | Deploy na Vercel. | Hosting natural para Next.js. |

### 5.6 Development (`development/`)

| ID | Descrição | Função no Recanto |
|----|-----------|-------------------|
| **cli-tool** | Aplicações CLI. | Scripts em `scripts/` se crescerem. |
| **library** | Pacotes npm publicáveis. | Extrair libs se necessário. |
| **migrate** | Migrações de tecnologia (JS→TS, upgrades). | Actualizar Next/React/Drizzle. |
| **new-api** | Endpoints de API. | `app/api` ou backends futuros. |
| **new-component** | Componentes reutilizáveis. | UI em `components/`. |
| **new-feature** | Feature completa design→deploy. | Entregas grandes. |
| **new-project** | Scaffolding de projectos. | Menos relevante dentro do repo. |
| **nextjs-app** | Novas apps Next.js com boas práticas. | Referência para estrutura App Router. |
| **refactor** | Melhorar qualidade e reduzir duplicação. | Limpeza contínua. |
| **code-review** | Revisão abrangente de código. | Processo de PR. |

### 5.7 Documentation (`documentation/`)

| ID | Descrição | Função no Recanto |
|----|-----------|-------------------|
| **api-docs** | Documentação de API (OpenAPI, JSDoc). | Documentar endpoints futuros. |
| **architecture** | Diagramas (Mermaid, C4). | Actualizar `architecture.md`. |
| **readme** | READMEs completos. | Raiz do repo ou módulos. |

### 5.8 Git (`git/`)

| ID | Descrição | Função no Recanto |
|----|-----------|-------------------|
| **git-commit** | Commits convencionais a partir de staged changes. | Alinhar com `commit-message` skill. |
| **git-conflict** | Resolver conflitos de merge. | Integração de branches. |
| **git-pr** | Descrições de pull request. | Alinhar com `pr-description` skill. |
| **git-rebase** | Rebase interactivo. | Histórico linear. |

### 5.9 Security (`security/`)

| ID | Descrição | Função no Recanto |
|----|-----------|-------------------|
| **auth-implementation** | Padrões de autenticação. | Se login for adicionado. |
| **dependency-check** | Vulnerabilidades em dependências. | `npm audit` e upgrades. |
| **security-audit** | Scan de código, secrets, riscos. | Auditorias periódicas. |

### 5.10 Testing (`testing/`)

| ID | Descrição | Função no Recanto |
|----|-----------|-------------------|
| **e2e-test** | Testes E2E com framework detectado. | Fluxos críticos no browser. |
| **playwright-test** | E2E com Playwright. | Suíte browser dedicada. |
| **test-coverage** | Aumentar cobertura. | Quando testes existirem. |
| **unit-test** | Testes unitários (Jest/Vitest/pytest). | Lógica em `lib/` e services. |

### 5.11 Ficheiros extra (fora do `registry.json`)

| Título | Descrição | Função |
|--------|-----------|--------|
| **`pwa-setup.md`** | Configuração PWA. | Se o Recanto precisar de instalável offline. |
| **`ui-ux-homogenize.md`** | Homogeneizar UI/UX. | Passes de consistência visual. |

**Registry:** [`.agent/workflows/registry.json`](../.agent/workflows/registry.json)

---

## 6. Skills em `.agent/skills/`

| Título | Descrição | Função |
|--------|-----------|--------|
| **neon-postgres** (`SKILL.md`) | Boas práticas Neon (Postgres serverless, branching, docs). | Operações e dúvidas sobre a BD Neon usada pelo Recanto. |
| **criador-de-habilidades** | Scaffolding de novas skills. | Manter pastas `SKILL.md` padronizadas. |

---

## 7. Claude (`.claude/`)

| Título | Descrição | Função |
|--------|-----------|--------|
| **`napkin.md`** | Runbook curto priorizado para sessões. | Lembretes de workflow da equipa/IA. |
| **`skills/neon-postgres/SKILL.md`** | Cópia/espelho da skill Neon (se mantida). | Mesmo uso que `.agent/skills/neon-postgres`. |

---

## 8. GitHub Actions (`.github/workflows/`)

| Título | Descrição | Função |
|--------|-----------|--------|
| **`drizzle-push.yml`** | Push do schema Drizzle para Neon em `push`/`workflow_dispatch` quando `schema.ts` ou `drizzle.config.ts` mudam. | Manter BD alinhada ao código na main. |

---

## 9. Como usar este inventário

1. **Dúvida de stack ou pastas** → `project-overview.md` + `.cursorrules`.  
2. **Tarefa concreta (commit, PR, bug)** → skill em `.context/skills/`.  
3. **Papel da IA** → agente em `.context/agents/`.  
4. **Processo longo passo-a-passo** → workflow em `.agent/workflows/`.  

**Última actualização:** consolidado para o repositório Recanto (Next.js, Drizzle, Neon).
