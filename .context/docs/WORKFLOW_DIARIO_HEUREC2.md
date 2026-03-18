# 🗓️ Prompt de Workflow Diário — Heure C2
# Usar no Cursor no início de cada sessão de trabalho
# Colar como primeira mensagem ao abrir o projecto
# v1.1 — com integração PRD automática

---

## COMO USAR

Tens **3 variantes** deste prompt. Copia apenas o bloco correspondente ao que vais fazer hoje.

- **VARIANTE A** → Começar uma nova feature
- **VARIANTE B** → Corrigir um bug
- **VARIANTE C** → Retomar trabalho de uma sessão anterior

---

---

# VARIANTE A — NOVA FEATURE

```
És o meu par de programação para o Heure C2 (React/Vite/TypeScript/Supabase).

@context-driven-development @react-best-practices @typescript-pro @verification-before-completion

## SESSÃO DE HOJE
Feature: [DESCREVE EM 1 LINHA O QUE QUERES FAZER]
Ex: "Adicionar filtro de datas na lista de pedidos de férias"

## ANTES DE COMEÇAR — faz isto primeiro
1. Corre `npx tsc --noEmit 2>&1 | grep -c "error"` → baseline de erros TypeScript.
2. Corre `npm run lint 2>&1 | tail -5` → estado actual do lint.
3. Confirma branch: `git branch --show-current`
4. Se for main/master → `git checkout -b feat/[nome-curto-da-feature]`

## DURANTE O DESENVOLVIMENTO
- Trabalha em passos pequenos. Após cada passo significativo, diz-me o que foi feito.
- Novo componente → segue padrão em src/components/ (Tailwind, TypeScript estrito, sem `any`).
- Nova query Supabase → verifica primeiro se existe algo similar em src/services/ ou src/hooks/.
- Ficheiros i18n → actualiza SEMPRE as 4 línguas (pt, fr, en, es). Nunca só uma.
- Sem console.log → usa src/utils/logger.ts.

## AO TERMINAR A FEATURE — checklist obrigatório antes do commit

### 1. Qualidade de código
- `npx tsc --noEmit` → 0 erros novos vs baseline
- `npm run lint` → sem erros novos
- `git diff --staged | grep "console\."` → sem console.log

### 2. i18n (apenas se tocaste em traduções)
- `grep -r "TODO\|FIXME\|translation_missing" locales/ 2>/dev/null`

### 3. Actualizar PRD (docs/PRD.md) — OBRIGATÓRIO
Abre docs/PRD.md e faz exactamente isto:

a) **Secção 5 — Features**
   - Se a feature é nova → adiciona linha na sub-secção correcta com `| [nome] | ✅ Implementado | [descrição] |`
   - Se completaste algo que estava planeado → muda status para `✅ Implementado`

b) **Secção 10 — Dívida Técnica**
   - Se resolveste algum item da tabela → remove a linha ou adiciona coluna "Resolvido em: [data]"
   - Se introduziste nova dívida conhecida → adiciona linha com severidade e estimativa honesta

c) **Secção 11 — Roadmap**
   - Se o item estava no roadmap → muda `[ ]` para `[x]`
   - Actualiza a data no cabeçalho: `> **Data**: [hoje]`

d) **NÃO alterar** secções 1-4, 6-9, 12 — essas só mudam com decisões técnicas grandes.

### 4. Commit
```bash
git add -A  # inclui sempre o docs/PRD.md
```
Mensagem: `feat(área): descrição curta — PRD actualizado`

@commit
```

---

---

# VARIANTE B — CORRIGIR UM BUG

```
És o meu par de programação para o Heure C2 (React/Vite/TypeScript/Supabase).

@systematic-debugging @error-detective @verification-before-completion @typescript-pro

## BUG A CORRIGIR
Descrição: [DESCREVE O BUG]
Onde acontece: [PÁGINA OU COMPONENTE]
Quando acontece: [CONDIÇÕES / PASSOS PARA REPRODUZIR]

## PROCESSO DE DEBUG — segue esta ordem
1. **Isola** — identifica o ficheiro/função mais provável antes de tocar em código.
2. **Reproduz** — confirma que consegues reproduzir.
3. **Hipótese** — diz-me a causa provável em 1 frase antes de corrigir.
4. **Corrige** — mínima intervenção possível. Não refactorizes enquanto corriges.
5. **Verifica** — confirma que o bug está resolvido e sem regressões nos ficheiros adjacentes.

## ANTES DO COMMIT — checklist
- `npx tsc --noEmit` → 0 erros novos
- `git diff --name-only` → ficheiros alterados devem ser mínimos
- `git diff --staged | grep "console\."` → sem console.log

## ACTUALIZAR PRD (docs/PRD.md) — apenas se relevante
- Se o bug revelou dívida técnica não registada → adiciona linha na Secção 10
- Se o bug estava relacionado com uma feature que afinal não está 100% → ajusta status na Secção 5
- Actualiza data no cabeçalho
- `git add docs/PRD.md`

Mensagem: `fix(área): descrição curta do que foi corrigido`

@commit
```

---

---

# VARIANTE C — RETOMAR SESSÃO ANTERIOR

```
És o meu par de programação para o Heure C2 (React/Vite/TypeScript/Supabase).

@context-management-context-restore @code-review-excellence @verification-before-completion

## RESTORE DE CONTEXTO — faz isto automaticamente

1. `git log --oneline -10` → últimos commits
2. `git status` → trabalho não commitado?
3. `git stash list` → stashes esquecidos?
4. `git diff --stat HEAD` → o que está modificado mas não commitado?
5. `npx tsc --noEmit 2>&1 | grep -c "error"` → estado TypeScript
6. Lê as últimas 20 linhas de docs/PRD.md → confirma data e o que estava em curso

Após os comandos, dá-me um **resumo em 3 pontos**:
- Onde ficou o trabalho (último commit + pendentes)
- Estado de saúde do código (erros TS, lint)
- Próximo passo mais lógico

## DEPOIS DO RESTORE
Indica se queres:
- Continuar (passa para Variante A ou B)
- Commitar trabalho pendente antes de continuar
- Review rápido do último bloco feito

## SE HOUVER TRABALHO NÃO COMMITADO
1. `npx tsc --noEmit` → conta erros
2. `npm run lint` → conta warnings
3. Limpo → commit com @commit (inclui docs/PRD.md se foi alterado)
4. Não limpo → lista problemas por prioridade antes de continuar

@commit
```

---

---

## CONVENÇÃO DE COMMITS — REFERÊNCIA RÁPIDA

```
feat(área):     nova funcionalidade
fix(área):      correcção de bug
chore(área):    manutenção, dependências, limpeza
refactor(área): refactoring sem mudança de comportamento
style(área):    formatação, CSS, UI sem lógica
test(área):     testes
docs(área):     documentação, PRD
db(área):       migrations, seeds, queries Supabase
i18n(área):     traduções
```

**Áreas do Heure C2:**
`dashboard` · `auth` · `vacation` · `employees` · `admin` · `holidays` · `settings` · `notifications` · `ui` · `db` · `i18n` · `perf` · `cleanup`

**Exemplos reais:**
```
feat(vacation): adicionar filtro por período na lista de pedidos — PRD actualizado
fix(auth): corrigir redirect após reset de password em mobile
refactor(employees): simplificar lógica de validação do formulário
db(migrations): adicionar índice em employee_records.company_id
i18n(vacation): sincronizar chaves em falta para fr e es
docs(prd): actualizar roadmap Q1 2026 após milestone de estabilização
```

---

## QUANDO ACTUALIZAR CADA SECÇÃO DO PRD

| Secção | Quando actualizar | Frequência |
|--------|------------------|------------|
| **5 — Features** | Ao terminar qualquer feature | A cada commit de feat() |
| **10 — Dívida Técnica** | Ao resolver ou descobrir dívida | A cada commit relevante |
| **11 — Roadmap** | Ao fechar item do roadmap | A cada milestone |
| **Cabeçalho (Data)** | Sempre que o PRD é tocado | Automático |
| **3 — Stack** | Só ao mudar versão major de dependência | Raramente |
| **4 — Arquitectura** | Só ao mudar padrão arquitectural | Raramente |
| **6 — Entidades** | Só ao adicionar/remover entidade de domínio | Raramente |
| **7 — Rotas** | Só ao adicionar/remover rotas | Raramente |

---

## CHECKLIST PRÉ-COMMIT (sempre, sem excepção)

```bash
# 1. TypeScript limpo
npx tsc --noEmit

# 2. Sem console.log novos
git diff --staged | grep "console\."

# 3. PRD incluído no stage (em commits de feat/fix)
git status docs/PRD.md

# 4. Build não quebrada (apenas antes de PRs)
npm run build
```

---

## SKILLS DE REFERÊNCIA POR SITUAÇÃO

| Situação | Skills a activar |
|----------|-----------------|
| Nova feature complexa | `@react-best-practices` `@typescript-pro` `@frontend-dev-guidelines` |
| Bug difícil de isolar | `@systematic-debugging` `@error-detective` `@distributed-debugging-debug-trace` |
| Código a ficar feio | `@code-refactoring-refactor-clean` `@clean-code` |
| Query Supabase lenta | `@database-optimizer` `@postgres-best-practices` |
| Nova migration | `@database-migrations-sql-migrations` `@supabase-automation` |
| Componente novo complexo | `@react-ui-patterns` `@tailwind-patterns` `@radix-ui-design-system` |
| Review antes de PR | `@code-review-excellence` `@comprehensive-review-full-review` |
| Problema de i18n | `@i18n-localization` |
| Performance lenta | `@application-performance-performance-optimization` `@web-performance-optimization` |
| Dívida técnica (`any`, console.log) | `@code-refactoring-tech-debt` `@typescript-pro` |

---
COMO CRIA UMA NOVA PÁGINA COM TRADUçÃO

@i18n-localization @locales/pt/translation.json

Vou criar uma nova página. Antes de escrever qualquer código:

1. Lê locales/pt/translation.json e identifica se já existe 
   um namespace para esta página. Mostra-me qual é.

2. Se já existir → usa esse namespace. Não cries um novo.

3. Se não existir → propõe o nome do namespace novo baseado 
   no padrão dos existentes (camelCase, ex: userProfilePage, 
   dashboardPage) e aguarda a minha confirmação antes de criar.

4. Só depois de confirmado o namespace é que começas a criar 
   a página — com todas as strings já ligadas ao i18n correcto, 
   nunca hardcoded.

Página a criar: [DESCREVE A PÁGINA]
---

## REFERÊNCIA RÁPIDA — DÍVIDA TÉCNICA ACTUAL (Secção 10 do PRD)

Para consulta rápida durante desenvolvimento:

| Item | Severidade | O que fazer ao encontrar |
|------|------------|--------------------------|
| `any` (~800 ocorrências) | ALTA | Substituir pelo tipo correcto no ficheiro que estás a editar |
| `console.log` (~600) | MÉDIA | Substituir por `logger.info/warn/error` de src/utils/logger.ts |
| Funções sem tipo de retorno (~400) | MÉDIA | Adicionar tipo ao editar a função |
| `crypto-js` não utilizado | BAIXA | Remover de package.json numa sessão de chore() |

*Regra: se tocas num ficheiro com dívida, deixa-o melhor do que encontraste — pelo menos 1 item corrigido.*

---

*Workflow Diário v1.1 — Heure C2 — Março 2026*
*Próxima revisão: quando stack mudar ou Q2 2026 roadmap iniciar*