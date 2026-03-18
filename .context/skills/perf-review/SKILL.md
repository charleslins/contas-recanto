---
name: perf-review
description: Use ao revisar código para problemas de performance, quando um desenvolvedor pede para otimizar código, ou ao investigar comportamento lento no projeto Heure C2
---

# Performance Review

Analisar código alterado para gargalos de performance e oportunidades de otimização.

## Quando Usar

- Desenvolvedor pede para checar performance ou otimizar código
- Revisando código que processa grandes datasets, trata alto tráfego ou roda em loops
- Após notar comportamento lento na aplicação
- Antes de merge de features de dashboard ou relatórios com múltiplas queries

## Steps

### 1. Obter arquivos alterados e diff

```bash
git diff --name-only HEAD~1
git diff HEAD~1
```

### 2. Ler cada arquivo alterado por completo

Problemas de performance frequentemente dependem do contexto ao redor.

### 3. Analisar nestas categorias

---

#### Complexidade de Tempo

- Identificar algoritmos O(n²) ou pior
- Procurar loops aninhados sobre os mesmos dados
- Sugerir alternativas mais eficientes

**Padrões problemáticos no Heure C2:**
```ts
// ❌ N+1 clássico — loop com query dentro
for (const user of users) {
  const vacations = await supabase.from("user_vacations").select("*").eq("user_id", user.id);
}

// ✅ Correto — uma query com join
const { data } = await supabase
  .from("users")
  .select("*, user_vacations(*)")
  .eq("company_id", companyId);
```

---

#### Uso de Memória

- Alocações de objetos desnecessárias em caminhos críticos
- Potencial de memory leak (recursos não fechados, caches crescendo)
- Cópia de objetos grandes onde referências serviriam

---

#### Operações de I/O

- Chamadas bloqueantes que poderiam ser assíncronas
- Padrões N+1 de queries — crítico com Supabase
- Chamadas de API sequenciais que poderiam ser paralelizadas com `Promise.all`

**Padrão correto no Heure C2:**
```ts
// ✅ Queries paralelas em vez de sequenciais
const [
  { count: pendingCount },
  { count: usersCount },
  { data: vacations },
] = await Promise.all([
  supabase.from("user_vacations").select("*", { count: "exact", head: true }).eq("status", "pending"),
  supabase.from("users").select("*", { count: "exact", head: true }),
  supabase.from("user_vacations").select("*"),
]);
```

---

#### Oportunidades de Caching

- Computações caras repetidas (usar `useMemo` ou `SessionCache`)
- Fetches de dados cacheáveis (usar `DataCache` ou `PersistentCache`)
- `useCallback` ausente em funções passadas como props

**Caches disponíveis no projeto:**
- `SessionCache` — dados de sessão atual
- `DataCache` — dados de domínio
- `PersistentCache` — dados persistentes entre sessões
- `SupabasePerformanceMonitor` — monitorar queries lentas

---

#### React / Frontend

- Re-renders desnecessários por falta de `React.memo`, `useMemo`, `useCallback`
- Dependency arrays incorretos em `useEffect` causando loops
- Componentes grandes que poderiam ser divididos para renderização parcial
- Imagens/assets não otimizados

---

#### Supabase Específico

- Queries sem index nas colunas mais filtradas
- `select("*")` quando apenas alguns campos são necessários
- Falta de paginação em listas longas
- Subscriptions Realtime não canceladas no cleanup do `useEffect`

```ts
// ❌ Selecionar tudo
const { data } = await supabase.from("user_vacations").select("*");

// ✅ Selecionar apenas campos necessários
const { data } = await supabase
  .from("user_vacations")
  .select("user_id, vacation_date, status");
```

---

### 4. Reportar cada issue

```
Impacto: ALTO / MÉDIO / BAIXO
Localização: arquivo:linha
Atual: O que está acontecendo agora
Otimizado: A versão melhorada com código
Ganho Esperado: ex., "~10x mais rápido para arrays grandes", "elimina N+1 queries"
```

---

## Regras

- Sinalizar apenas problemas reais de performance, não micro-otimizações.
- Sempre mostrar o código otimizado, não apenas o problema.
- Considerar o contexto de uso real — O(n²) em um array de 10 itens é aceitável.
- Priorizar I/O e problemas algorítmicos sobre micro-otimizações de memória.
- Para o Heure C2: N+1 queries com Supabase são o problema mais comum e impactante. Verificar sempre.
