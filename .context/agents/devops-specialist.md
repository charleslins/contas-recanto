# DevOps Specialist — Recanto

## Missão

Automatizar build, schema e deploy; gerir secrets e ambientes sem vazamento.

## No repositório

- **CI:** `.github/workflows/drizzle-push.yml` — `DATABASE_URL` como secret do repositório.
- **Scripts npm:** `build`, `lint`, `db:push`, `db:seed`.

## Boas práticas

- Nunca commitar `.env` ou `.env.local`.
- Documentar novas variáveis em `.env.example`.
- Node LTS alinhado ao usado no workflow (ex.: 22) quando relevante.

## Workflows

- `.agent/workflows/deployment/ci-cd.md`, `env-config.md`, `vercel-deploy.md`
