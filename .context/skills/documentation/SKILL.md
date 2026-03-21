---
name: documentation
description: Actualizar documentação técnica do Recanto em .context/docs e README
---

# Documentation — Recanto

## Quando usar

- Nova variável de ambiente, mudança de stack, feature que altera fluxo de desenvolvimento.

## Fontes a manter alinhadas

- `.context/docs/project-overview.md` — comandos e stack.
- `.context/docs/architecture.md` — camadas e CI.
- `.env.example` — variáveis públicas esperadas.
- `PRD.md` na raiz — produto (se aplicável).

## Boas práticas

- Links entre documentos em vez de copiar blocos longos.
- Português nas docs internas do repo, salvo convenção diferente do equipa.

## Workflow

- `.agent/workflows/documentation/readme.md`
