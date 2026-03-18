---
name: severity-review
description: Use quando um desenvolvedor pede uma revisão com profundidade específica — "só os problemas críticos", "revisão completa", ou "revisão com nitpicks" — no projeto Heure C2
---

# Review por Severidade

Realizar uma revisão de código com profundidade configurável, desde apenas-críticos até completo com nitpicks.

## Quando Usar

- Desenvolvedor especifica profundidade: "só o crítico" ou "vai fundo"
- Verificação rápida pré-merge (somente críticos)
- Revisão detalhada para features importantes (completo)

## Modos

Determinar o modo pelo pedido do desenvolvedor:

---

### 🔴 Somente Crítico

**Palavras-chave:** "rápido", "crítico", "só o importante", "sanity check"

Focar APENAS em:
- Vulnerabilidades de segurança (auth, RLS, dados expostos)
- Riscos de perda de dados (mutations sem validação, deletes sem confirmação)
- Bugs que causam crash
- Breaking changes não documentados
- Multi-tenancy comprometido (falta de `company_id`)

Pular: estilo, otimizações menores, sugestões.

---

### 🟡 Padrão

**Palavras-chave:** padrão quando nenhuma preferência é declarada, "review", "checar"

Reportar todos os issues significativos:

| Severidade | Exemplos |
|---|---|
| **CRÍTICO** | Segurança, crash, perda de dados, RLS quebrada |
| **ALTO** | Bugs, erros de lógica, race conditions, `company_id` ausente |
| **MÉDIO** | Problemas de performance, lacunas no error handling, `any` sem justificativa |
| **BAIXO** | Inconsistências de estilo, melhorias menores, `console.log` esquecido |

---

### 🟢 Completo

**Palavras-chave:** "completo", "detalhado", "tudo", "nitpick"

Reportar tudo incluindo:
- Todos os níveis do modo padrão
- **NITPICK:** Nomenclatura de variáveis, formatação, qualidade de comentários, ordem de imports
- Strings não traduzidas (sem `t()`)
- JSDoc ausente em functions públicas
- Oportunidades de DRY

---

## Steps

### 1. Determinar o modo pelo pedido do desenvolvedor (padrão: Standard)

### 2. Obter arquivos alterados

```bash
git diff --name-only HEAD~1
git diff HEAD~1
```

### 3. Ler e revisar cada arquivo alterado

Para o Heure C2, verificar também:

```bash
# Checar tipos
npx tsc --noEmit 2>&1 | head -30

# Checar i18n
npm run check:hardcode

# Checar lint
npm run lint
```

### 4. Formatar cada issue como

```
[SEVERIDADE] arquivo:linha — Descrição breve
  Problema: O que está errado
  Fix: Como corrigir
```

### 5. Terminar com contagem resumida

```
Crítico: 0 | Alto: 1 | Médio: 2 | Baixo: 3
```

Incluir contagem de Nitpicks apenas no modo Completo.

---

## Checklist por Camada (Heure C2)

### Services
- [ ] Usa `withRetryAndCircuitBreaker` para operações críticas
- [ ] Filtra por `company_id` em todas as queries
- [ ] `ErrorHandlingService.handleError` nos catch blocks
- [ ] Sem `console.log` — usar `logger`

### Componentes / Pages
- [ ] 4 estados de UI: loading, error, empty, data
- [ ] Props totalmente tipadas
- [ ] Sem lógica de negócio direta
- [ ] Strings via `t()`

### Hooks
- [ ] Sem chamadas diretas ao Supabase
- [ ] Dependency arrays corretos no `useEffect`
- [ ] Cleanup functions presentes onde necessário

### Tipos
- [ ] Sem `any` sem justificativa
- [ ] Interfaces em vez de type aliases para objetos
- [ ] Sem `enum` — usar `const` objects

---

## Regras

- Adaptar a profundidade ao modo solicitado. Não fazer nitpick no modo Somente Crítico.
- CRÍTICO significa "vai quebrar produção ou comprometer dados". Usar com parcimônia.
- No modo Padrão, pular problemas de formatação pura (Prettier resolve).
- Sempre fornecer o fix, não apenas o problema.
- Para o Heure C2, CRÍTICO inclui: RLS removida/enfraquecida, `company_id` ausente em queries, secrets expostos, auth bypass.
