---
name: pre-merge-check
description: Use antes de merge para main ou quando for pedida validação final / prontidão para merge no Recanto
---

# Pre-merge — Recanto

Checklist antes de integrar código na branch principal.

## Quando usar

- Antes de merge para `main` / `master`
- Perguntas do tipo: "está pronto para merge?"

## 1. Escopo

```bash
git log --oneline main...HEAD
git diff --stat main...HEAD
```

(Ajuste `main` se a branch base tiver outro nome.)

## 2. Checklist

### Qualidade

- [ ] Sem `debugger` ou ruído de debug em código de app
- [ ] Sem TODO/FIXME críticos sem issue ou nota no PR
- [ ] Tratamento de erro em fluxos async (actions, fetch)
- [ ] Sem secrets ou URLs de DB no diff
- [ ] `any` só com justificativa breve

### Testes e build

- [ ] Se existirem testes no repo, correr e reportar falhas
- [ ] `npx tsc --noEmit` sem erros novos (amostra: `| head -40` se output grande)
- [ ] `npm run build` passa
- [ ] `npm run lint` passa

### Dados (Drizzle)

- [ ] Mudanças em `lib/db/schema.ts` documentadas no PR
- [ ] CI/workflow de schema (`drizzle-push`) considerado se aplicável

### Documentação

- [ ] Novas variáveis em `.env.example`
- [ ] Breaking changes descritos no PR

### Ficheiros a não commitar

- [ ] Sem `.env`, `.env.local`, `node_modules`, `.DS_Store` no diff

## 3. Veredicto

**Pronto:** Sim / Não / Com correções  

**Passa:** …  
**Atenção:** …  
**Recomendação:** …

## Regras

- Foco em **gate** (merge sim/não), não em micro-estilo — para estilo usar `style-review`.
- Projeto: **Recanto** — ver `.cursorrules` e `.context/docs/project-overview.md`.
