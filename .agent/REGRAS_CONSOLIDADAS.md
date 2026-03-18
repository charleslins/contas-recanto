# 📋 Regras Detalhadas — Heure C2

> **Última Atualização**: 15/03/2026
> **Hierarquia**: `.cursorrules` (fonte principal) → **este arquivo** (detalhamento) → `.context/docs/` (técnico)
> **Escopo**: Detalhes de implementação que expandem o `.cursorrules`. NÃO duplica regras básicas.
> **MCPs**: configurados em `mcp-config.json` (fonte única) — nomes alinhados com `.cursorrules` secção 5.
> **Gestão de tarefas**: via `.agent/workflows/` (44 workflows) — task-master-ai removido.

---

## Índice

1. [TypeScript — Exemplos Expandidos](#1-typescript--exemplos-expandidos)
2. [React — Padrões de Componente](#2-react--padrões-de-componente)
3. [Sistema de Logging](#3-sistema-de-logging)
4. [Autenticação — Padrões Detalhados](#4-autenticação--padrões-detalhados)
5. [Qualidade de Código — Métricas e Dívida Técnica](#5-qualidade-de-código--métricas-e-dívida-técnica)
6. [Estilização — Paleta e Props Shadcn](#6-estilização--paleta-e-props-shadcn)
7. [Tratamento de Erros](#7-tratamento-de-erros)
8. [Performance e Otimização](#8-performance-e-otimização)
9. [Roadmap Técnico](#9-roadmap-técnico)
10. [Checklist de Desenvolvimento](#10-checklist-de-desenvolvimento)

---

## 1. TypeScript — Exemplos Expandidos

> Regras básicas em `.cursorrules` seção 4. Aqui: exemplos detalhados.

### 1.1 Substituir `any` por tipos concretos

```typescript
// ❌ EVITAR
function process(data: any) { }

// ✅ CORRETO — Tipos concretos
function process(data: User[]) { }

// ✅ CORRETO — Genéricos
function process<T>(data: T[]): T[] { }

// ✅ CORRETO — Unknown quando tipo realmente desconhecido
function processUnknown(data: unknown) {
  if (typeof data === 'string') { /* TypeScript infere string */ }
}
```

**Status**: ~800 ocorrências no projeto (19% dos problemas de lint)
**Estratégia**: Substituição gradual, começando por `/src/services`

### 1.2 Union Types em vez de `enum`

```typescript
// ❌ EVITAR
enum Status { Active = 'active', Inactive = 'inactive' }

// ✅ CORRETO — Union Types
type Status = 'active' | 'inactive';

// ✅ CORRETO — Objetos constantes (quando precisa de valores em runtime)
const STATUS = { ACTIVE: 'active', INACTIVE: 'inactive' } as const;
type Status = typeof STATUS[keyof typeof STATUS];
```

### 1.3 Tipos de Retorno Explícitos (funções exportadas)

```typescript
// ✅ CORRETO
export async function loadUsers(): Promise<User[]> {
  return await fetchUsers();
}

// ❌ EVITAR — retorno implícito em função exportada
export async function loadUsers() {
  return await fetchUsers();
}
```

**Status**: ~400 ocorrências (10% dos problemas de lint)

---

## 2. React — Padrões de Componente

> Regras básicas em `.cursorrules` seção 3.6 e 4. Aqui: estrutura padrão detalhada.

### Estrutura Padrão de Componente

```typescript
interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  // 1. Hooks de estado
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 2. Hooks de contexto
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  // 3. Custom hooks
  const { data, error } = useUserData(userId);

  // 4. Hooks de efeito
  useEffect(() => { /* ... */ }, [dependencies]);

  // 5. Memoização (criteriosamente)
  const memoizedValue = useMemo(() => heavyCalculation(data), [data]);

  // 6. Handlers
  const handleSubmit = async () => { /* ... */ };

  // 7. Render — 4 estados obrigatórios
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!data) return <EmptyState />;

  return <div>...</div>;
}
```

### Separação de Lógica

```typescript
// ❌ EVITAR — Lógica de negócio no componente
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(data => {
      const processed = data.map(/* ... */);
      setUsers(processed);
    });
  }, []);
  return <div>{/* ... */}</div>;
}

// ✅ CORRETO — Delegar para hooks/services
function UserList() {
  const { users, loading, error } = useUsers();
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState />;
  return <UserListPresentation users={users} />;
}
```

---

## 3. Sistema de Logging

### Status

✅ Sistema estruturado implementado em `/src/utils/logger.ts`

**NUNCA usar `console.log` diretamente**. Sempre usar o logger.

### Loggers Disponíveis

```typescript
import { logger } from '@/utils/logger';
import { authLogger, apiLogger, serviceLogger, routeLogger } from '@/utils/logger';

// Criar logger customizado
import { createLogger } from '@/utils/logger';
const reportLogger = createLogger('Reports');
```

### Métodos

| Método | Emoji | Ambiente | Uso |
|---|---|---|---|
| `logger.info()` | ℹ️ | Dev | Informação geral |
| `logger.success()` | ✅ | Dev | Operação concluída |
| `logger.warn()` | ⚠️ | Dev | Atenção necessária |
| `logger.error()` | ❌ | Dev + Prod | Erro crítico |
| `logger.debug()` | 🔍 | Dev | Estado interno |
| `logger.time()` / `timeEnd()` | ⏱️ | Dev | Performance |
| `logger.table()` | 📊 | Dev | Dados tabulados |

### Comportamento por Ambiente

- **Desenvolvimento**: Todos os logs aparecem com emojis e prefixos automáticos
- **Produção**: Apenas `error()` aparece
- **Integração Futura**: Preparado para Sentry/LogRocket

### Padrões de Uso

```typescript
// ✅ BOM — Logs estruturados com contexto
logger.info('User action', { action: 'update_profile', userId: user.id });

// ✅ BOM — Erros com contexto completo
try {
  await updateUser(userId, data);
  logger.success('User updated', { userId });
} catch (error) {
  logger.error('Failed to update user', error, { userId, attemptedData: data });
  throw error;
}

// ❌ EVITAR — Logs genéricos ou engolir erros silenciosamente
logger.log('Something happened');
try { await op(); } catch (error) { /* silencioso */ }
```

### Prioridade de Migração

1. **Alta**: `/src/services` (lógica crítica)
2. **Média**: `/src/hooks`, `/src/contexts`
3. **Baixa**: `/src/components` (UI)

---

## 4. Autenticação — Padrões Detalhados

> Regras básicas em `.cursorrules` seção 8. Aqui: implementação detalhada.

### Arquitetura

- `AuthContext.tsx`: Estado global de autenticação
- `AuthService.ts`: Lógica de autenticação
- `AuthPersistence.ts`: Cache em sessionStorage (30 min de expiração)
- `ProtectedRoute.tsx`: Proteção de rotas

### Revalidação Inteligente

```typescript
const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    if (AuthPersistence.hasValidAuthData()) {
      authLogger.debug('Cache válido, pulando revalidação');
      AuthPersistence.updateValidationTimestamp();
      return;
    }
    authLogger.debug('Cache inválido ou expirado, revalidando sessão');
    void checkAuth();
  }
};
```

**Benefícios**: Reduz revalidações em ~95%, evita `isLoadingAuth = true` desnecessário.

### Persistência de Estado

Dados persistidos em sessionStorage:
- `user_id`, `user_email`, `user_role`, `is_admin`
- `auth_last_validated`, `user_data_cache`
- Expiração: 30 minutos

### Proteção de Rotas — Fluxo Correto

```
1. isLoadingAuth = true → Mostrar LoadingScreen
2. checkAuth() completa
3. isLoadingAuth = false
4. currentUser definido
5. Verificar role
6. Permitir ou redirecionar
```

```typescript
// ✅ CORRETO — Durante loading, NUNCA redirecionar
if (isLoadingAuth) return <LoadingScreen />;

// ✅ CORRETO — Verificar role após loading
if (requiredRole === 'admin' && currentUser?.role !== 'admin') {
  return <Navigate to="/dashboard" replace />;
}
```

### Resiliência

- Timeout global de 10s para operações de auth
- Circuit breaker: após 3 falhas, modo offline por 1 minuto
- Health check automático a cada 30s

---

## 5. Qualidade de Código — Métricas e Dívida Técnica

### Métricas de Lint (baseline)

| Categoria | Qtd | % | Prioridade |
|---|---|---|---|
| Uso de `any` | ~800 | 19% | ALTA |
| `console.*` | ~600 | 15% | MÉDIA |
| Sem tipo de retorno | ~400 | 10% | MÉDIA |
| Missing await | ~100 | 2% | BAIXA |
| Outros | ~724 | 18% | VARIADA |
| **Total** | **~4124** | 100% | — |

### Componentes Duplicados Identificados

- `ProductivityMetricsCard` (3 versões em Reports e Dashboard)
- Múltiplos formulários de convites

**Ação**: Consolidar em componentes configuráveis com props de `variant`.

### Componentes Grandes (> 250 linhas)

- `GDPRComplianceDashboard.tsx` (~500 linhas)
- `UserInviteForm.tsx` (~400 linhas)
- `AdminUserList.tsx` (~490 linhas)

**Ação**: Quebrar em subcomponentes container/presentational.

---

## 6. Estilização — Paleta e Props Shadcn

> Ordem de classes e princípios em `.cursorrules` seção 4. Aqui: paleta e props detalhadas.

### Paleta de Cores Tailwind

```
bg-success-{50-950}   text-success-{50-950}   border-success-{50-950}
bg-warning-{50-950}   text-warning-{50-950}   border-warning-{50-950}
bg-info-{50-950}      text-info-{50-950}      border-info-{50-950}
bg-error-{50-950}     text-error-{50-950}     border-error-{50-950}

bg-primary            text-primary-foreground
bg-secondary          text-secondary-foreground
```

### Props Shadcn Padronizadas

```typescript
// ✅ CORRETO — Props Shadcn padrão
<Button variant="default" size="default">Salvar</Button>
<TabsTrigger value="tab1">Aba 1</TabsTrigger>

// ❌ EVITAR — Props customizadas legadas (removidas)
<Button variant="primary" size="md">Salvar</Button>
```

---

## 7. Tratamento de Erros

### Padrão Obrigatório

```typescript
async function loadUsers(): Promise<User[]> {
  try {
    const { data, error } = await supabase.from('users').select();
    if (error) throw error;
    logger.success('Users loaded', { count: data.length });
    return data;
  } catch (error) {
    logger.error('Failed to load users', error);
    throw error;
  }
}
```

### Error Boundaries

```tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

### 4 Estados de Interface (obrigatório)

```typescript
function UserList() {
  const { users, loading, error, refetch } = useUsers();

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!users.length) return <EmptyState message={t('common.noData')} />;

  return <UserListPresentation users={users} />;
}
```

---

## 8. Performance e Otimização

### React

- `React.memo` para componentes puros que re-renderizam frequentemente
- `useMemo`/`useCallback` **criteriosamente** (medir antes de otimizar)
- Virtualização para listas grandes
- `logger.time()`/`timeEnd()` para medir operações

### Bundle

- Tree-shaking do Tailwind
- Code splitting por rota (lazy loading)
- Lazy loading de componentes pesados e imagens

---

## 9. Roadmap Técnico

### Fase 1 — Fundação ✅ CONCLUÍDA (Nov 2025)

- [x] `strictNullChecks` ativado
- [x] Sistema de logging estruturado
- [x] Migração 100% Tailwind puro
- [x] Código morto removido (~2870 linhas)
- [x] Lint reduzido: 4680 → 4124 (-12%)

### Fase 2 — Redução de `any` (estimativa: 2-3 semanas)

1. Tipar `/src/services` (authService, userInviteService, userService)
2. Tipar `/src/hooks` (useAuth, useUserPresenter)
3. Tipar `/src/components/admin`
4. Benefício esperado: -800 warnings

### Fase 3 — Migração de `console.log` (estimativa: 1 semana)

- Migrar para sistema de logging (prioridade: services → hooks → components)
- Benefício esperado: -600 warnings

### Fase 4 — Tipos de Retorno (estimativa: 1 semana)

- Adicionar tipos explícitos em funções exportadas
- Benefício esperado: -400 warnings

**Impacto total estimado**: -1800 warnings (-43%)

---

## 10. Checklist de Desenvolvimento

### Antes de criar código novo

- [ ] Sem `any` — tipos concretos ou genéricos
- [ ] Sem `enum` — union types ou objetos constantes
- [ ] Interfaces para objetos, Types para unions
- [ ] Named exports, tipos de retorno explícitos
- [ ] Componente funcional, hooks no topo
- [ ] Lógica extraída para hooks/services
- [ ] Ordem correta de classes Tailwind
- [ ] Import direto do Shadcn (sem wrappers)
- [ ] `logger` em vez de `console.log`
- [ ] Try/catch em operações async
- [ ] 4 estados de interface
- [ ] Textos traduzidos com `t()`
- [ ] Credenciais apenas em `.env`
- [ ] RLS ativo no Supabase

---

**Documentação Relacionada**:
- `.cursorrules` — Regras consolidadas (FONTE PRINCIPAL)
- `.context/docs/` — Documentação técnica (arquitetura, glossário, segurança)
- `.agent/workflows/` — 44 workflows padronizados (ver `registry.json`)
- `.context/agents/` — Playbooks por papel

---

## Comportamento Automático Pós-Tarefa

Após concluir qualquer implementação, o agente deve
executar sem solicitar confirmação:

- Cleanup de i18n: remover segundo argumento (fallback) 
  de todas as chamadas t("chave", "texto") nos arquivos 
  tocados pela tarefa
- Não alterar lógica, apenas a chamada t()
- Incluir no resumo final: lista de arquivos corrigidos
  e quantidade de fallbacks removidos
  
<!-- Regras de comentários de código estão em .cursorrules — não duplicar aqui -->