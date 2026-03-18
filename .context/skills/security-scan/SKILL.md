---
name: security-scan
description: Use ao revisar código para vulnerabilidades de segurança, antes de fazer merge de mudanças sensíveis de segurança, ou quando explicitamente pedido para auditar segurança do código no projeto Heure C2
---

# Security Scan

Realizar uma revisão de código focada em segurança nos arquivos alterados, verificando OWASP Top 10 e vulnerabilidades específicas do stack do Heure C2.

> **Nota:** Esta skill complementa a `security-audit` existente em `.context/skills/security-audit/SKILL.md`.  
> Use `security-scan` para PRs e diffs pontuais.  
> Use `security-audit` para auditorias completas do projeto.

## Quando Usar

- Antes de fazer merge de código que trata autenticação, autorização ou input de usuário
- Quando um desenvolvedor pede revisão ou auditoria de segurança
- Como parte de revisão pré-release
- Após qualquer mudança em: auth, RLS, queries Supabase, ou fluxo de convites

## Steps

### 1. Identificar arquivos alterados

```bash
git diff --name-only main...HEAD
```

### 2. Focar em arquivos de alto risco do Heure C2

Priorizar revisão em:
- `src/auth/` — AuthService, fluxos de login
- `src/services/` — services com acesso ao Supabase
- `src/components/AdminDashboard/` — operações privilegiadas
- `supabase/migrations/` — mudanças de schema e RLS
- Qualquer arquivo com `supabase.from(...)` ou `.rpc(...)`

### 3. Ler e analisar cada arquivo alterado nas categorias abaixo

---

#### Injeção

- SQL injection via queries dinâmicas (o Supabase usa parameterização, mas verificar `.rpc()` customizados)
- Injeção de comando OS
- XSS via strings não sanitizadas em `dangerouslySetInnerHTML`

---

#### Autenticação Quebrada

- Verificação de token ausente em operações sensíveis
- Expiração de sessão não tratada
- Credenciais hardcoded (senhas, API keys, tokens)
- `supabase.auth.getUser()` vs `getSession()` — preferir `getUser()` que valida server-side

```ts
// ❌ getSession() não revalida com o servidor
const { data: { session } } = await supabase.auth.getSession();

// ✅ getUser() sempre valida com o servidor
const { data: { user } } = await supabase.auth.getUser();
```

---

#### Controle de Acesso Quebrado (CRÍTICO para Heure C2)

- [ ] Verificação de `company_id` ausente — permite acesso entre empresas
- [ ] RLS policies não configuradas ou enfraquecidas na migration
- [ ] Operações de admin sem verificação de role no client
- [ ] Acesso a dados de outros usuários via `user_id` sem validação

```ts
// ❌ Sem filtro de company_id — qualquer usuário pode ver dados de outras empresas
const { data } = await supabase.from("user_vacations").select("*");

// ✅ Sempre filtrar por company_id
const { data } = await supabase
  .from("user_vacations")
  .select("*")
  .eq("company_id", companyId); // RLS + filtro explícito = defesa em profundidade
```

---

#### Exposição de Dados Sensíveis

- [ ] Secrets ou credenciais no código ou comentários
- [ ] `service_role` key no código client-side (NUNCA deve aparecer)
- [ ] Dados pessoais (email, telefone, CPF) logados
- [ ] Respostas de erro expondo detalhes internos de banco

```bash
# Quick check para secrets
git diff main...HEAD | grep -iE "(password|secret|api_key|service_role|private_key)\s*="
```

---

#### Configuração de Segurança

- [ ] Debug mode ativo em produção
- [ ] Modo verbose de erros expondo stack traces ao usuário
- [ ] CORS mal configurado
- [ ] Headers de segurança ausentes

---

#### XSS

- [ ] `dangerouslySetInnerHTML` sem sanitização
- [ ] Strings de usuário renderizadas como HTML
- [ ] URLs de input de usuário sem validação (pode ser `javascript:`)

---

#### Dependências Inseguras

```bash
npm audit --audit-level=high
```

Verificar se alguma dependência com CVE alta foi adicionada no diff.

---

#### Multi-tenancy (específico Heure C2)

- [ ] Toda query que toca dados de usuário filtra por `company_id`
- [ ] Operações de admin verificam se o usuário pertence à empresa correta
- [ ] Convites não podem ser aceitos por usuários de outra empresa
- [ ] `currentUser.company_id` é obtido do servidor, não do cliente

---

### 4. Reportar cada issue encontrado

```
Severidade: CRÍTICO / ALTO / MÉDIO / BAIXO
Localização: arquivo:linha
Risco: O que poderia acontecer se explorado
Fix: Mudança exata de código para remediar
```

### 5. Se nenhuma vulnerabilidade for encontrada

Confirmar que o código segue as melhores práticas de segurança e notar o que está bem feito.

---

## Regras

- Focar apenas em segurança. Não comentar sobre estilo ou performance.
- CRÍTICO = ativamente explorável. Não usar demais esta severidade.
- Sempre fornecer o fix, não apenas o problema.
- Verificar secrets hardcoded, API keys e credenciais em toda revisão.
- Para o Heure C2, multi-tenancy (`company_id`) e RLS são as verificações mais críticas.
- Esta skill é para diffs/PRs. Para auditoria completa, usar `.context/skills/security-audit/SKILL.md`.
