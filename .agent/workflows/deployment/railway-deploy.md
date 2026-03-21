---
description: Deploy na Railway com base de dados e variáveis de ambiente
---

# Deploy na Railway

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

## Recanto

- O Recanto usa **Neon** para Postgres; em Railway pode usar Postgres da Railway **ou** manter Neon e definir `DATABASE_URL` apontando para Neon.
- Scripts típicos: `npm run build`, `npm run start` (Next.js).

Este workflow ajuda a fazer *deploy* na Railway com configuração adequada.

## Limites e cuidados

- Nunca commitar *secrets*
- Variáveis sensíveis só nas variáveis de ambiente da Railway
- Configurar *health checks* quando a plataforma exigir
- Limites de recursos adequados ao tráfego

## Passos

### 1. Checklist pré-deploy

- `package.json` com script `start` (e `build` se aplicável)
- `Procfile` ou comando de arranque definido na plataforma, se necessário
- `.gitignore` a cobrir ficheiros sensíveis

### 2. CLI da Railway (opcional)

```bash
npm install -g @railway/cli
railway login
```

### 3. Inicializar projecto

**Opção A — CLI**

```bash
railway init
```

**Opção B — Dashboard**

1. [railway.app](https://railway.app) → New Project  
2. Deploy from GitHub → autorizar e escolher o repositório  

### 4. Variáveis de ambiente

**CLI:**

```bash
railway variables set DATABASE_URL="sua-connection-string"
railway variables set NODE_ENV="production"
```

**Dashboard:** separador Variables → pares chave/valor.

### 5. Base de dados (se na Railway)

```bash
railway add --plugin postgresql
# ou redis, mongodb, conforme necessidade
```

A Railway injeta URLs de ligação como variáveis de ambiente.

### 6. Build (`railway.toml` opcional)

```toml
[build]
builder = "nixpacks"
buildCommand = "npm run build"

[deploy]
startCommand = "npm start"
healthcheckPath = "/api/health"
healthcheckTimeout = 300
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 3
```

(Ajustar `healthcheckPath` ao endpoint real — ver secção abaixo.)

### 7. Next.js (App Router)

Em `package.json`:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p $PORT"
  }
}
```

(`$PORT` é comum na Railway.)

### 8. Deploy

```bash
railway up
```

Ou *push* para o branch ligado ao deploy automático.

### 9. Domínio personalizado

```bash
railway domain
```

Ou no Dashboard → Settings → Domains.

### 10. Logs

```bash
railway logs
```

Ou Deployments → View Logs.

## Endpoint de health check

Next.js 15 (App Router), exemplo `app/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server'

// Resposta mínima para health checks (Railway, load balancers, etc.)
export function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() })
}
```

## Resolução de problemas

### Falhas de build

```bash
railway logs --build
railway up --clear-build-cache
```

### Memória

Ajustar réplicas ou plano na Railway; rever `railway.toml`.

### Ligação à base de dados

- Confirmar `DATABASE_URL`
- Plugin da BD activo
- *Pooling* adequado em ambientes *serverless*

## Orientações

- Ambientes de pré-visualização para PRs
- Notificações para falhas de deploy
- Monitorizar uso no dashboard

## Referência

- [Documentação Railway](https://docs.railway.app)
- [Nixpacks](https://nixpacks.com/docs)
