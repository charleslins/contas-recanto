---
description: Revisão de código focada em qualidade, segurança e manutenibilidade
---

# Revisão de código

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow orienta uma revisão de código rigorosa.

## Limites e cuidados

- Priorizar problemas significativos, não *nitpicks* de estilo (salvo violações graves)
- Feedback construtivo com sugestões de correção
- Respeitar contexto e restrições do projecto
- Evitar pedir grandes refactors não solicitados

## Passos

### 1. Perceber o contexto

- Objectivo da alteração?
- Ficheiros tocados?
- Testes relacionados?

### 2. Checklist

#### Segurança

- [ ] Sem secrets hardcoded
- [ ] Validação de entrada
- [ ] SQL parametrizado (Drizzle/query segura)
- [ ] Prevenção XSS onde aplicável
- [ ] Auth/autorização correctas

#### Lógica e bugs

- [ ] Casos extremos
- [ ] Null/undefined
- [ ] async/await correcto
- [ ] Condições de corrida
- [ ] Tratamento de erros

#### Arquitectura

- [ ] Responsabilidade única
- [ ] Sem dependências circulares
- [ ] Nível de abstracção adequado
- [ ] Alinhado aos padrões do Recanto (services, actions, components)

#### Testes

- [ ] Nova lógica coberta quando há suíte
- [ ] Testes com significado, não só cobertura

#### Legibilidade

- [ ] Nomes claros
- [ ] Lógica complexa comentada quando necessário
- [ ] Evitar números mágicos sem nome
- [ ] Formatação consistente

#### Desempenho

- [ ] Evitar N+1
- [ ] Operações caras fora de loops
- [ ] Memoização quando justificada

### 3. Documentar achados

Por issue:

```markdown
### [Gravidade: Alta/Média/Baixa] Título

**Ficheiro:** `caminho/ficheiro.ts:42`

**Problema:** descrição

**Sugestão:**
```typescript
// correção sugerida
```

**Porquê:** impacto
```

### 4. Resumo

- Contagem por gravidade
- Avaliação global
- Recomendação (aprovar / pedir alterações)

## Gravidade

- **Alta:** segurança, perda de dados, bugs bloqueantes
- **Média:** lógica, validação, desempenho relevante
- **Baixa:** estilo, melhorias opcionais

## Orientações

- Tom respeitoso e construtivo
- Assumir boa intenção
- Destacar também o que está bem feito

## Referência

- `.context/skills/code-review/SKILL.md`
- ESLint do projecto; `npm run lint` / `npm run build`
