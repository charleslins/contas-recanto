---
description: Implementar padrões de autenticação para qualquer stack
---

# Implementação de autenticação

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

> **Recanto:** o núcleo actual pode não ter auth; este fluxo aplica-se quando for adicionar login/sessões.

Este workflow ajuda a implementar autenticação de forma segura.

## Limites e cuidados

- Nunca guardar palavras-passe em texto plano
- Usar bibliotecas consolidadas — não inventar criptografia própria
- Detectar auth existente antes de acrescentar
- Seguir boas práticas de segurança

## Passos

### 1. Requisitos

- Método: email/senha, OAuth, *magic link*…
- Fornecedores (Google, GitHub…)?
- Sessão no servidor vs JWT?
- Papéis e permissões (RBAC)?

### 2. Analisar a stack

- Auth.js / NextAuth
- Passport
- Auth do Django
- Firebase Auth
- Outro

### 3. Estratégia

- **Sessão:** tradicional, lado servidor
- **JWT:** stateless, APIs
- **OAuth:** login social
- **Magic link:** sem palavra-passe

### 4. Implementar

- Modelo/tabela de utilizador
- Fluxos de registo e login
- Gestão de sessão ou tokens
- Rotas protegidas
- Logout

### 5. Endurecer

- *Hash* de palavras-passe (argon2/bcrypt…)
- *Rate limiting*
- Protecção CSRF
- *Cookies* seguros (`HttpOnly`, `Secure`…)
- Validação de entrada

### 6. Verificar

- Fluxos felizes e de erro
- Expiração de sessão/token
- Acesso negado onde deve

## Princípios

- Bibliotecas testadas em produção
- Falhar de forma segura (*deny by default*)
- Registar eventos de segurança relevantes
- Rever segurança periodicamente
