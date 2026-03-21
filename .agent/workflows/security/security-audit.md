---
description: Varrimento de código à procura de vulnerabilidades, secrets e más práticas
---

# Auditoria de segurança

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow orienta uma revisão de segurança do codebase.

## Limites e cuidados

- Não expor *secrets* encontrados em logs ou PRs públicos
- Reduzir falsos positivos
- Priorizar gravidade alta
- Sugerir correcções, não só listar problemas

## Passos

### 1. Âmbito

- Todo o repo ou pastas específicas?
- Tipo de aplicação (web, API, CLI)?
- Ferramentas de segurança já configuradas?

### 2. Secrets expostos

Padrões comuns: `API_KEY`, `password`, tokens, chaves privadas PEM, *connection strings*.

Ficheiros: `.env` (deve estar no `.gitignore`), configs, código com valores hardcoded.

### 3. Autenticação e autorização

- Credenciais fixas no código
- Rotas sem protecção
- Sessões mal configuradas
- CSRF em formulários sensíveis

### 4. Validação de entrada

- SQL injection (queries não parametrizadas)
- XSS (HTML com input do utilizador)
- *Command injection*
- Path traversal

### 5. Dependências

- `npm audit` / equivalente
- Pacotes desactualizados com CVE

### 6. Relatório

Tabela: gravidade, problema, localização, recomendação.

### 7. Correcções

- Explicar o risco
- Trecho problemático
- Proposta segura
- Ligações a documentação (OWASP, etc.)

## Gravidade

| Nível | Exemplos |
|-------|-----------|
| **Crítica** | Secrets expostos, RCE, SQL injection explorável |
| **Alta** | Bypass de auth, XSS persistente, exposição de dados sensíveis |
| **Média** | CSRF, cabeçalhos em falta, config fraca |
| **Baixa** | Informação menor, deps sem CVE crítico |

## Princípios

- Tratar input de utilizador como não confiável
- Não confiar só em validação no cliente
- *Secrets* fora do código
- Queries parametrizadas (Drizzle/ORM)
- Sanitizar saída quando renderizar HTML

## Referência

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- `npm audit`
- `.env.example` como documentação segura de variáveis
