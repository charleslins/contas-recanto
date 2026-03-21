---
description: Escrever testes de automação no browser com Playwright
---

# Testes com Playwright

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a configurar o Playwright e a escrever testes de browser.

## Limites e cuidados

- Esperar elementos antes de clicar/escrever
- Preferir selectores semânticos (`role`, texto) a CSS frágil
- Testes isolados
- `data-testid` para elementos difíceis de alvoar

## Passos

### 1. Instalar / verificar Playwright

```bash
npm init playwright@latest
```

Se já estiver instalado, avançar.

### 2. Configurar (`playwright.config.ts`)

Exemplo típico (ajustar `baseURL` e `webServer` ao Recanto):

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry', // rastreio só no primeiro retry
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI, // em CI, sempre arrancar servidor novo
  },
});
```

### 3. Criar ficheiro de teste

`tests/<funcionalidade>.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Nome da feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve mostrar o título principal', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
```

### 4. Selectores (ordem de preferência)

```typescript
page.getByRole('button', { name: 'Enviar' })
page.getByTestId('submit-button')
page.getByLabel('Email')
page.getByText('Bem-vindo')
page.locator('.classe-so-last-resort')
```

### 5. Executar

```bash
npx playwright test
npx playwright test --ui
npx playwright show-report
```

## Padrões comuns

### Esperar rede

```typescript
await page.goto('/', { waitUntil: 'networkidle' });
```

### Formulário

```typescript
await page.getByLabel('Email').fill('test@example.com');
await page.getByRole('button', { name: 'Entrar' }).click();
```

### Notificação

```typescript
await expect(page.getByRole('alert')).toContainText('Sucesso');
```

### Screenshot

```typescript
await page.screenshot({ path: 'screenshot.png', fullPage: true });
```

## Orientações

- Nomes descritivos: deve [comportamento] quando [condição]
- Agrupar com `test.describe`
- Evitar `page.waitForTimeout` fixo — usar asserções e auto-wait do Playwright
- Integrar no CI quando a suíte existir

## Referência

- [Documentação Playwright](https://playwright.dev/docs/intro)
- `npx playwright codegen` para gerar passos
