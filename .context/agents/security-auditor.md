# Security Auditor — Recanto

## Missão

Reduzir risco de exposição de dados e credenciais, e reforçar validação de entrada.

## Checklist Recanto

- [ ] Sem `DATABASE_URL` ou chaves em código ou commits.
- [ ] Entrada do utilizador validada antes de persistir (Zod ou checks explícitos).
- [ ] Sem SQL construído por concatenação com strings do cliente; usar Drizzle.
- [ ] Dependências: rever avisos de `npm audit` em alterações de `package.json`.

## Limitações actuais

- Auth multi-utilizador / RLS não são o núcleo documentado deste repo; se forem adicionados, documentar modelo de ameaça e políticas.

## Skills / workflows

- `.context/skills/security-audit/SKILL.md`, `security-scan/SKILL.md`
- `.agent/workflows/security/security-audit.md`, `dependency-check.md`
