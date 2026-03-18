---
name: style-review
description: Use ao revisar código para conformidade com o guia de estilo, quando um desenvolvedor pede para checar o estilo do código, ou para enforçar convenções do time no projeto Heure C2
---

# Style Guide Enforcer

Revisar código contra o guia de estilo e convenções de codificação do projeto Heure C2.

## Quando Usar

- Desenvolvedor pede para checar conformidade de estilo
- Revisando código de um novo contribuidor
- Enforçando convenções do time em um PR
- Antes de um merge para garantir consistência

## Steps

### 1. Detectar o guia de estilo do projeto

Verificar arquivos de configuração:

```bash
cat .eslintrc.* 2>/dev/null || cat eslint.config.* 2>/dev/null
cat .prettierrc.* 2>/dev/null
cat .editorconfig 2>/dev/null
```

Para o Heure C2, as convenções principais estão em:
- `.cursorrules` — regras raiz do projeto
- `.agent/REGRAS_CONSOLIDADAS.md` — regras detalhadas complementares
- `.cursor/rules/regras-projeto.md` — resumo das regras para o Cursor

### 2. Obter arquivos alterados e revisar

```bash
git diff --name-only HEAD~1
git diff HEAD~1
```

### 3. Aplicar checagem de estilo específica do Heure C2

---

#### TypeScript / React

- [ ] `const` em vez de `let` onde possível, nunca `var`
- [ ] Arrow functions para callbacks e componentes funcionais
- [ ] Template literals em vez de concatenação de strings
- [ ] Destructuring onde apropriado
- [ ] Sem `any` — usar tipos explícitos ou `unknown`
- [ ] Sem `enum` — usar `const` objects ou union types
- [ ] Interfaces obrigatórias para props de componentes e retorno de functions
- [ ] Exportações: seguir o padrão existente no módulo (default vs named)

---

#### Componentes React

- [ ] Componentes funcionais com TypeScript (`React.FC<Props>` ou tipagem inline)
- [ ] Props tipadas em interface separada acima do componente
- [ ] 4 estados de UI implementados onde aplicável: loading, error, empty, data
- [ ] Sem lógica de negócio diretamente no componente
- [ ] Hooks customizados para lógica complexa de estado
- [ ] Sem chamadas diretas ao Supabase dentro de componentes

---

#### Internacionalização (i18n)

- [ ] **Zero strings hardcoded** na UI — todas as strings passam por `t("chave")`
- [ ] Chaves de tradução seguem o padrão: `componente.subSecao.label`
- [ ] Sem texto em português/francês/inglês hardcoded nos arquivos `.tsx`/`.ts`

```bash
# Quick check para strings hardcoded
npm run check:hardcode
```

---

#### Logging e Erros

- [ ] **Zero `console.log`** — usar `logger` do projeto:
  ```ts
  import { logger } from "../utils/logger";
  logger.info("mensagem", { contexto });
  ```
- [ ] Erros tratados com `ErrorHandlingService` ou `ErrorFactory`
- [ ] Blocos `try/catch` presentes em todas as operações assíncronas com Supabase

---

#### Nomenclatura

- [ ] Componentes: `PascalCase`
- [ ] Funções/variáveis: `camelCase`
- [ ] Constantes: `UPPER_SNAKE_CASE` para valores verdadeiramente constantes
- [ ] Arquivos de componente: `PascalCase.tsx`
- [ ] Arquivos de service/util: `camelCase.ts`
- [ ] Arquivos de hook: `use[Nome].ts`

---

#### Arquitetura

- [ ] Camadas respeitadas: `Components → Hooks → Presenters → Services → Supabase`
- [ ] Services seguem padrão com `withRetryAndCircuitBreaker` onde aplicável
- [ ] Queries ao Supabase incluem filtro `company_id` (multi-tenancy)
- [ ] RLS policies consideradas — não confiar apenas em filtros do client

---

### 4. Formato de saída

**Score de Conformidade de Estilo:** X/10

**Violações:**
```
arquivo:linha — O que está errado → Como deve ser
```

**Notas Positivas:** O que segue bem o guia de estilo.

**Itens auto-corrigíveis** (formatação Prettier):
- [lista]

**Itens de correção manual** (nomenclatura, padrões, arquitetura):
- [lista]

---

## Regras

- Enforçar apenas regras que estão efetivamente configuradas no projeto.
- Não sinalizar problemas de estilo em código que não foi alterado neste diff.
- Distinguir entre problemas auto-corrigíveis (formatação) e de correção manual (nomenclatura, padrões).
- Para o Heure C2, as violações mais críticas são: `console.log`, strings hardcoded sem `t()`, e `any` sem justificativa.
