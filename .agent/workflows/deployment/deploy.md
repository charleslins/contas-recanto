---
description: Fazer deploy de aplicações em qualquer plataforma
---

# Deploy

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a fazer *deploy* da aplicação na plataforma escolhida.

## Limites e cuidados

- Detectar configuração de deploy existente antes de sugerir
- Nunca deploy para produção sem confirmação explícita
- Verificar variáveis de ambiente
- Garantir que o *build* passa localmente (ou em CI) primeiro

## Passos

### 1. Perceber requisitos

- Destino? (Vercel, AWS, Railway, etc.)
- Produção ou *staging*?
- Requisitos especiais? (região, escala)
- CI/CD já ligado ao repo?

### 2. Detectar plataforma

- `vercel.json` → Vercel
- `railway.json` → Railway
- `Dockerfile` → plataformas de contentores
- `.github/workflows` → automação GitHub

### 3. Preparar o deploy

- Build a passar
- Variáveis de ambiente definidas
- Migrações/schema alinhados (ex.: Drizzle + Neon)
- Assets estáticos optimizados

### 4. Configurar a plataforma

- Ligar repositório
- Definir variáveis de ambiente
- Comandos de build/start
- Domínios

### 5. Executar o deploy

- Comando ou push que dispara o deploy
- Acompanhar logs
- Confirmar sucesso

### 6. Verificar

- URL acessível
- Fluxos críticos da app
- Monitorização de erros

## Princípios

- Testar antes de produção
- *Secrets* só em variáveis de ambiente
- *Previews* de PR quando a plataforma suportar
