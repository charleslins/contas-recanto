# Checklist E2E — Autenticação Empresa x Funcionário

## Objetivo
Validar que o fluxo de autenticação está separado entre portal da empresa e portal do funcionário convidado, sem permitir auto-cadastro indevido.

## Cenário 1 — Admin/RH acessando portal da empresa
- Acessar `/` e validar CTA principal para empresa.
- Clicar em `Área Admin` e validar abertura do login de empresa.
- Logar com usuário admin/RH válido.
- Confirmar redirecionamento para `/painel`.

## Cenário 2 — Funcionário convidado (com convite válido)
- Abrir link de convite `/invite/:token` válido.
- Concluir criação de senha/perfil.
- Confirmar login automático ou manual subsequente no portal de funcionário.
- Validar redirecionamento final para `/dashboard`.

## Cenário 3 — Funcionário sem convite
- Acessar `/employee`.
- Validar mensagem de primeiro acesso via convite do RH.
- Confirmar ausência de ação de auto-cadastro direto.
- Tentar `/accept-invite` sem token e validar redirecionamento para `/employee`.

## Cenário 4 — Tentativa com convite inválido/expirado
- Abrir `/invite/:token` com token inválido ou expirado.
- Validar bloqueio do onboarding.
- Confirmar mensagem de erro amigável e sem criação de conta.
- Confirmar que não existe sessão autenticada ativa após falha.

## Critérios de aceitação
- Funcionário só entra no fluxo de criação de conta com token de convite válido.
- Landing principal mantém foco B2B (empresa/RH) e não induz funcionário a cadastro.
- Portal do funcionário deixa explícito que primeiro acesso depende de convite.
- Rotas públicas sem token não permitem bypass do processo de convite.
