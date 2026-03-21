---
name: security-audit
description: Checklist de revisão de segurança para o Recanto (secrets, validação, Drizzle)
---

# Security audit — Recanto

## Quando usar

- Antes de release; PRs que tocam em auth, uploads, env ou schema sensível.

## Checklist

- [ ] Sem credenciais no código ou histórico recente do PR.
- [ ] `DATABASE_URL` só em env/CI secrets.
- [ ] Input validado nas server actions.
- [ ] Sem SQL raw com interpolação de utilizador.
- [ ] Dependências sem vulnerabilidades conhecidas críticas (`npm audit`).

## Workflow

- `.agent/workflows/security/security-audit.md`
