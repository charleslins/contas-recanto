# Segurança — Recanto

## Superfícies

- **Aplicação web** Next.js (servidor + cliente).
- **Base de dados** PostgreSQL na Neon; acesso apenas via `DATABASE_URL` no servidor.

## Credenciais e segredos

- Nunca commitar `.env`, `.env.local` ou tokens em código.
- Secrets de CI: GitHub → *Repository secrets* (ex.: `DATABASE_URL` para `drizzle-push`).

## Dados e validação

- Validar input do utilizador nas **server actions** antes de persistir.
- Usar API tipada do **Drizzle**; evitar SQL dinâmico com concatenação de input.

## Dependências

- Ao alterar `package.json`, verificar `npm audit` e actualizar dependências vulneráveis quando possível.

## Evolução

- Se forem adicionados **auth**, **multi-tenant** ou exposição pública de API, documentar modelo de ameaça, sessões e políticas de acesso aqui e em `architecture.md`.

## Skills / workflows

- `.context/skills/security-audit/SKILL.md`, `security-scan/SKILL.md`
- `.agent/workflows/security/security-audit.md`, `dependency-check.md`, `auth-implementation.md`
