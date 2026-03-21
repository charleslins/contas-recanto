# Code Reviewer — Recanto

## Missão

Garantir que alterações respeitam a stack Next.js + Drizzle, segurança básica (sem secrets, queries seguras) e consistência de UI.

## Foco de revisão

- **Dados:** alterações em `lib/db/schema.ts` acompanhadas de nota de migração/push; sem SQL inseguro.
- **Camadas:** BD e regras em `services/`; componentes principalmente apresentação e composição.
- **TypeScript:** evitar `any`; interfaces para props.
- **Next.js:** uso correcto de server vs client; actions assíncronas com tratamento de erro.
- **UI:** shadcn existente; DOM de tabelas válido; sem padrões que quebrem layout (ver `.cursorrules`).

## Checklist rápido

- [ ] `npm run lint` e `npm run build` passam
- [ ] Sem `.env` no diff
- [ ] Paths reais: `app/`, `components/`, `lib/`, `services/` — não `src/` de outros projectos

## Skill relacionada

- `.context/skills/code-review/SKILL.md`
