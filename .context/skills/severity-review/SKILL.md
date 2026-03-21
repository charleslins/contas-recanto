---
name: severity-review
description: Classificar gravidade de bugs ou riscos (Recanto) para priorização
---

# Severity review — Recanto

## Quando usar

- Triagem de issues; decisão de bloquear release ou merge.

## Escala sugerida

| Nível | Critério exemplo |
|-------|------------------|
| **P0** | Perda/corrupção de dados; exposição de `DATABASE_URL` ou PII |
| **P1** | Dashboard inutilizável; erro em fluxo principal (criar transação) |
| **P2** | Bug UI menor; importação falha em caso extremo |
| **P3** | Cosmético; melhoria de performance não bloqueante |

## Saída

- Nível, justificativa, se bloqueia merge, próximo passo sugerido.
