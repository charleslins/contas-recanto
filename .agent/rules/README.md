# Agent Rules — Heure C2

## Hierarquia de Regras

As regras do projeto estão organizadas hierarquicamente:

1. **`.cursorrules`** (raiz) — Regras consolidadas, aplicadas automaticamente pelo Cursor.
2. **`.agent/REGRAS_CONSOLIDADAS.md`** — Documento detalhado com logging, autenticação, roadmap, e regras específicas.
3. **`.cursor/rules/regras-projeto.md`** — Resumo rápido para referência.
4. **`.context/docs/`** — Documentação técnica (arquitetura, segurança, glossário).

## Stack do Projeto

- **Build**: Vite (NÃO Next.js)
- **Frontend**: React 18 + TypeScript + Tailwind CSS + Shadcn UI
- **Backend**: Supabase (Auth, PostgreSQL, RLS, Realtime)
- **Roteamento**: react-router-dom v6
- **Arquitetura**: MVC Adaptada com Presenters
- **i18n**: react-i18next (pt, fr, en, es)

## Workflows

Consulte `.agent/workflows/registry.json` para lista completa de 45 workflows disponíveis.
