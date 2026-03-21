# Skills — `.context/skills/`

Procedimentos sob demanda para agentes (revisão, commits, testes, etc.) — calibrados para **Recanto** (Next.js, Drizzle, Neon).

**Catálogo com todos os skills/workflows/agentes e adaptações:** [CATALOGO_RECANTO_SKILLS_WORKFLOWS_AGENTES.md](../CATALOGO_RECANTO_SKILLS_WORKFLOWS_AGENTES.md)

## Skills disponíveis

| Skill | Pasta | Uso |
|-------|--------|-----|
| Code Review | [code-review](./code-review/SKILL.md) | Qualidade e padrões Recanto |
| PR Review | [pr-review](./pr-review/SKILL.md) | Revisão de PR |
| Pre-merge | [pre-merge-check](./pre-merge-check/SKILL.md) | Gate antes de merge |
| Style | [style-review](./style-review/SKILL.md) | ESLint/Prettier/convenções |
| Commit | [commit-message](./commit-message/SKILL.md) | Mensagens convencionais |
| Testes | [test-generation](./test-generation/SKILL.md) | Gerar casos de teste |
| Documentação | [documentation](./documentation/SKILL.md) | Docs técnicas |
| Refatoração | [refactoring](./refactoring/SKILL.md) | Refactor seguro |
| Bugs | [bug-investigation](./bug-investigation/SKILL.md) | Investigação |
| Features | [feature-breakdown](./feature-breakdown/SKILL.md) | Quebrar épicos |
| API | [api-design](./api-design/SKILL.md) | Desenho de API |
| Segurança | [security-audit](./security-audit/SKILL.md), [security-scan](./security-scan/SKILL.md) | Revisão de segurança |
| Outros | perf-review, severity-review, pr-description | Conforme descrição em cada `SKILL.md` |

## Formato

Cada skill vive numa pasta com **`SKILL.md`** (frontmatter YAML + instruções).

## Duplicados removidos

A pasta `code_reviewer/` foi **removida** — continha conteúdo corrupto/duplicado; usar **`code-review/`** e **`pre-merge-check/`**.
