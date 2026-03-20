# Vercel presa no commit antigo (`ab10415` + erro `parseString`)

## O que está acontecendo

- **GitHub `main`** já pode estar em `c37ec95` (ou mais novo).
- **Vercel** continua mostrando **Commit: `ab10415` — Initial commit** e o erro `parseString`.

Isso **não** é “o código não foi corrigido”: é a Vercel **nunca ter disparado build do commit novo**.  
Cada **Redeploy** no painel reusa o **mesmo SHA** (`meta.action: redeploy` nos logs da API).

## Resolução (faça nesta ordem)

### 1) Confirme o topo da `main` no GitHub

Na página do repositório, o commit mais recente da branch **main** **não** pode ser só `ab10415`.  
Se ainda for, faça push do seu código corrigido antes de qualquer coisa.

### 2) Pare de usar só “Redeploy” no deploy antigo

Isso **recompila o `ab10415` de novo**. Não resolve.

### 3) Force um deploy **novo** a partir do Git

**Opção A — recomendada (1 comando)**

Na pasta do repo que aponta para `charleslins/conta-recanto`:

```bash
git pull origin main
git commit --allow-empty -m "chore: disparar build Vercel a partir do main atual"
git push origin main
```

Abra a Vercel → **Deployments**: o próximo item deve mostrar um **SHA novo** (não `ab10415`).

**Opção B — integração Git**

1. Vercel → projeto **conta-recanto** → **Settings** → **Git**  
2. Confira **Connected Repository** = `charleslins/conta-recanto` e **Production Branch** = `main`.  
3. Se estiver tudo certo e mesmo assim não dispara: **Disconnect** e conecte de novo o mesmo repo (reativa o webhook do GitHub).

### 4) Checagem final

No card do deploy, o **Commit** deve ser **igual** ao último da `main` no GitHub.  
Se continuar `ab10415`, o push não foi para o repositório que a Vercel usa (remote errado) ou a branch de produção não é `main`.

---

## Referência rápida

| Onde        | O que verificar        |
|------------|-------------------------|
| GitHub     | SHA no topo da `main`   |
| Vercel     | SHA no deploy (deve bater) |
| Erro build | Se SHA = `ab10415`, ignore o erro até o SHA mudar |
