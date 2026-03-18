---
name: pr-description
description: Use ao criar um pull request, ou quando um desenvolvedor pede para gerar uma descrição de PR, escrever resumo de PR, ou documentar mudanças para um PR no projeto Heure C2
---

# PR Description Generator

Gerar automaticamente uma descrição profissional de pull request a partir do histórico git e diffs.

## Quando Usar

- Desenvolvedor está prestes a criar um PR
- Desenvolvedor pede para "escrever a descrição do PR" ou "resumir minhas mudanças"
- Após completar trabalho em uma feature branch

## Steps

### 1. Coletar contexto

```bash
git log --oneline main...HEAD
git diff --stat main...HEAD
git diff main...HEAD
```

### 2. Detectar o tipo de PR pelo nome da branch

| Padrão de branch | Tipo |
|---|---|
| `feat/` ou `feature/` | Nova Feature |
| `fix/` ou `bugfix/` | Bug Fix |
| `refactor/` | Refatoração |
| `docs/` | Documentação |
| `test/` | Testes |
| `chore/` | Manutenção |
| `hotfix/` | Hotfix urgente |

### 3. Checar ID de ticket

Procurar nos nomes de branch ou mensagens de commit: `JIRA-123`, `#456`, `task-123` (Taskmaster).

### 4. Gerar a descrição do PR usando esta estrutura

```markdown
## Resumo
[1-2 frases resumindo o que este PR faz e por quê]

## Mudanças Realizadas
- [Bullet point para cada mudança significativa]
- [3-5 bullets, focados no que mudou]
- [Incluir novas dependências se houver]
- [Mencionar se afeta RLS, multi-tenancy ou i18n]

## Tipo
[Feature | Bug Fix | Refatoração | Docs | Testes | Manutenção | Hotfix]

## Impacto

### Arquivos Principais Alterados
- `src/...` — [descrição]

### Breaking Changes
- [ ] Nenhum / [Descrever se houver]

### Requer Migração de Banco
- [ ] Não / [ ] Sim — [descrever migration]

## Como Testar
- [ ] [Como verificar que funciona]
- [ ] [Edge cases para checar]
- [ ] [Cenário específico do Heure C2 se aplicável]

## Checklist
- [ ] Testes adicionados/atualizados
- [ ] Sem `console.log` — usando `logger`
- [ ] Strings de UI via `t()` — sem hardcoded
- [ ] Sem `any` sem justificativa
- [ ] Filtra por `company_id` onde necessário
- [ ] RLS policies não enfraquecidas
- [ ] `npm run lint` passou
- [ ] `npm run check:hardcode` passou

## Relacionado
[Closes #ticket-id se encontrado]
```

---

### 5. Ajustar ênfase por tipo de PR

**Feature:** Enfatizar comportamento do usuário, novas capacidades, impacto nos dashboards.

**Bug Fix:** Enfatizar o que estava quebrado, causa raiz, como foi corrigido.

**Refatoração:** Enfatizar por que era necessário, confirmar que nenhum comportamento mudou.

**Docs/Testes:** Manter breve.

**Hotfix:** Enfatizar urgência, impacto em produção, como foi validado.

---

## Regras

- Manter o resumo em 1-2 frases.
- Listar 3-5 bullet points para mudanças — não cada arquivo, apenas mudanças significativas.
- Ser escaneável. Revisores devem entender o PR em 15 segundos.
- Não incluir detalhes de implementação a menos que afetem a revisão.
- Para o Heure C2, sempre mencionar se houve impacto em: multi-tenancy, RLS, i18n, ou dívida técnica.
