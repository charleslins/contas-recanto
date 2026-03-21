---
description: Criar templates HTML de email responsivos compatíveis com vários clientes
---

# Template de email HTML

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a criar templates HTML de email responsivos e compatíveis com vários clientes.

## Limites e cuidados

- Layout baseado em **tabelas** para máxima compatibilidade
- CSS **inline** na maior parte dos estilos
- Testar em Gmail, Outlook, Apple Mail, etc.
- Manter o email abaixo de ~100KB quando possível

## Passos

### 1. Definir requisitos

- Tipo: transaccional, marketing, newsletter?
- Secções de conteúdo?
- Cores de marca e logótipo?
- Botões e ligações?

### 2. Estrutura base

Criar `emails/<nome-template>.html` (ou pasta acordada). Incluir:

- `<!DOCTYPE html>` e meta viewport
- Blocos condicionais para **Outlook** (`<!--[if mso]>`) quando necessário
- Tabela exterior `width="100%"` e contentor central (~600px)
- Estilos inline nos elementos; `<style>` no `<head>` apenas para media queries simples

Exemplo mínimo de estrutura (adaptar textos e URLs):

```html
<!DOCTYPE html>
<html lang="pt" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assunto do email</title>
  <style>
    @media screen and (max-width: 600px) {
      .responsive-table { width: 100% !important; }
      .mobile-padding { padding: 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding:40px 10px;">
        <table role="presentation" width="600" class="responsive-table" cellspacing="0" cellpadding="0" border="0" style="background:#fff;border-radius:8px;">
          <tr>
            <td class="mobile-padding" style="padding:40px 30px;font-family:Arial,sans-serif;font-size:16px;color:#333;">
              <h1 style="margin:0 0 16px;font-size:24px;">Título</h1>
              <p style="margin:0 0 24px;line-height:1.5;">Corpo da mensagem.</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:6px;background:#4F46E5;">
                    <a href="https://exemplo.com" style="display:inline-block;padding:14px 30px;color:#fff;text-decoration:none;font-weight:bold;">Chamada à ação</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;text-align:center;font-size:12px;color:#999;background:#f8f8f8;">
              © Recanto — <a href="#">Cancelar subscrição</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

### 3. Componentes comuns

- **Duas colunas:** tabela interior com `width="48%"` e classe para empilhar em mobile (`display:block;width:100%`)
- **Imagens:** `width` explícito, `style="display:block;max-width:100%;height:auto;"`

### 4. Outlook

- Fundos complexos: considerar VML (`v:rect`) conforme documentação Microsoft
- Testar sempre no Outlook desktop

### 5. Testar

- Ferramentas: Litmus, Email on Acid, Mailtrap (sandbox)
- [Can I Email](https://www.caniemail.com/) — suporte CSS

## Clientes de email

| Cliente | Notas |
|---------|--------|
| **Outlook** | Motor tipo Word; CSS limitado |
| **Gmail** | Pode remover `<style>`; preferir inline |
| **Apple Mail** | Geralmente bom suporte |
| **Yahoo** | Testar bem |

## Orientações

- Disponibilizar versão **texto simples**
- Fontes seguras (Arial, Georgia, Times)
- Linha de assunto curta; texto de pré-visualização (preheader)
- Testar em telemóvel

## Referência

- [Can I Email](https://www.caniemail.com/)
- Partilha de mercado: ver estatísticas actuais nos sites das ferramentas de teste
