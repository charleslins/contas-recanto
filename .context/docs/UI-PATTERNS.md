# UI-PATTERNS — Heure C2

> **Versão**: 1.0
> **Data**: 2026-02
> **Status**: Documento vivo — atualizar sempre que um padrão for definido ou alterado
> **Localização**: `.context/docs/UI-PATTERNS.md`

---

## ⚠️ INSTRUÇÃO OBRIGATÓRIA PARA A IA

Antes de gerar qualquer código de interface, a IA deve:

1. Ler este documento inteiro
2. Identificar o tipo de página/componente sendo criado
3. Seguir o template correspondente — **nunca improvisar estrutura visual**
4. Usar **apenas** os componentes Shadcn UI listados na seção 3
5. Usar **apenas** as classes Tailwind definidas nos tokens desta seção 1
6. Se o caso não estiver coberto aqui, **perguntar ao usuário** antes de criar

> A inconsistência visual entre páginas é causada pela IA improvisando
> estrutura a cada sessão. Este documento elimina essa improvisação.

---

## 1. Design Tokens — Base Visual

> Estes tokens definem a linguagem visual do Heure C2.
> Nunca usar valores arbitrários de cor, espaçamento ou tipografia fora desta lista.

### 1.1 Paleta de Cores

```
PRIMÁRIA (ações principais, links, foco)
  primary:         Tailwind → bg-primary / text-primary
  primary-hover:   Tailwind → hover:bg-primary/90
  primary-subtle:  Tailwind → bg-primary/10 (badges, highlights)

NEUTRA (backgrounds, bordas, texto)
  background:      bg-background          ← fundo de página
  card:            bg-card                ← fundo de cards e painéis
  muted:           bg-muted               ← fundo de seções secundárias
  border:          border-border          ← todas as bordas
  input:           bg-input               ← campos de formulário

TEXTO
  foreground:      text-foreground        ← texto principal
  muted-fg:        text-muted-foreground  ← texto secundário / labels / hints
  primary-fg:      text-primary-foreground ← texto sobre fundo primary

STATUS (feedback ao usuário)
  success:         text-emerald-600 / bg-emerald-50 / border-emerald-200
  warning:         text-amber-600   / bg-amber-50   / border-amber-200
  error:           text-destructive / bg-destructive/10
  info:            text-blue-600    / bg-blue-50    / border-blue-200

TIPOS DE ENTRADA (EntryType — badges e marcadores de calendário)
  REGULAR:         bg-blue-100    text-blue-700
  VACANCE:         bg-green-100   text-green-700
  FERIE:           bg-purple-100  text-purple-700
  RECUPERATION:    bg-orange-100  text-orange-700
  MALADIE:         bg-red-100     text-red-700
  TELE:            bg-cyan-100    text-cyan-700
  FIDE:            bg-yellow-100  text-yellow-700
```

### 1.2 Tipografia

```
HIERARQUIA DE TÍTULOS
  Título de página (H1):    text-2xl font-bold tracking-tight
  Título de seção (H2):     text-xl  font-semibold
  Título de card (H3):      text-base font-semibold
  Subtítulo / label:        text-sm  font-medium text-muted-foreground
  Corpo:                    text-sm  (padrão)
  Caption / hint:           text-xs  text-muted-foreground

NUNCA USAR
  ❌ text-3xl ou maior em páginas internas (só landing pages)
  ❌ font-bold em body text
  ❌ text-base para labels de formulário (usar text-sm)
```

### 1.3 Espaçamento e Layout

```
PÁGINA
  Container máximo:         max-w-7xl mx-auto
  Padding horizontal:       px-4 sm:px-6 lg:px-8
  Padding vertical:         py-6 (páginas normais) / py-8 (páginas de configuração)
  Gap entre seções:         space-y-6

CARDS E PAINÉIS
  Padding interno:          p-4 (card compacto) / p-6 (card normal)
  Gap entre cards:          gap-4 (grid compacto) / gap-6 (grid normal)
  Border radius:            rounded-lg (padrão) / rounded-xl (destaque)
  Sombra:                   shadow-sm (sutil) / sem shadow em cards dentro de cards

FORMULÁRIOS
  Gap entre campos:         space-y-4
  Label → Input:            gap implícito do componente Shadcn (não adicionar)
  Botões de ação:           mt-6 pt-6 border-t border-border (separar do formulário)

TABELAS
  Container:                rounded-lg border border-border overflow-hidden
  Padding de célula:        padrão Shadcn Table (não sobrescrever)
  Linha hover:              hover:bg-muted/50

GRIDS RESPONSIVOS
  4 métricas:               grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4
  3 colunas:                grid grid-cols-1 md:grid-cols-3 gap-6
  2 colunas:                grid grid-cols-1 md:grid-cols-2 gap-6
  Sidebar + conteúdo:       grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6
```

CARDS EM GRID
  Cards lado a lado SEMPRE devem ter:  h-full no <Card>
  O grid container deve ter:           items-stretch (padrão do CSS Grid, mas declarar explicitamente)
  ❌ Nunca deixar Card sem h-full dentro de um grid de 2+ colunas
```

### 1.4 Animações

```
Após remoção do Framer Motion, usar apenas CSS/Tailwind:

Transições padrão:    transition-colors duration-200
Hover em cards:       hover:shadow-md transition-shadow duration-200
Fade de conteúdo:     animate-in fade-in duration-300 (Shadcn built-in)
Skeleton loading:     animate-pulse (Tailwind)

NUNCA adicionar Framer Motion em novos componentes sem aprovação explícita.
```

---

## 2. Templates de Página por Tipo

> Cada tipo de página tem uma estrutura fixa.
> A IA deve usar exatamente esta estrutura — não inventar variações.

### 2.1 Página de Dashboard (ex: DashboardPage, AdminOverviewDashboard)

```
ESTRUTURA:
┌─────────────────────────────────────────────┐
│ PAGE HEADER                                 │
│   H1 — título da página                     │
│   texto-muted — subtítulo ou período ativo  │
│   [ações secundárias à direita]             │
├─────────────────────────────────────────────┤
│ MÉTRICAS — grid de 4 cards KPI             │
│   [card] [card] [card] [card]               │
├─────────────────────────────────────────────┤
│ CONTEÚDO PRINCIPAL — 2 colunas             │
│   [componente principal]  [painel lateral]  │
├─────────────────────────────────────────────┤
│ SEÇÃO SECUNDÁRIA (se necessário)            │
│   [tabela ou lista]                         │
└─────────────────────────────────────────────┘

CÓDIGO BASE:
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
  {/* Header */}
  <div className="flex items-start justify-between">
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        {t('dashboard.title')}
      </h1>
      <p className="text-sm text-muted-foreground mt-1">
        {t('dashboard.subtitle')}
      </p>
    </div>
    <div className="flex items-center gap-2">
      {/* botões de ação */}
    </div>
  </div>

  {/* KPIs */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <KpiCard ... />
  </div>

  {/* Conteúdo principal */}
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
    <MainContent />
    <SidePanel />
  </div>
</div>
```

---

### 2.2 Página de Listagem/Tabela (ex: EmployeeManagementPage)

```
ESTRUTURA:
┌─────────────────────────────────────────────┐
│ PAGE HEADER                                 │
│   H1 + subtítulo           [+ Novo botão]   │
├─────────────────────────────────────────────┤
│ BARRA DE FILTROS                            │
│   [search input]  [filtro]  [filtro]        │
├─────────────────────────────────────────────┤
│ TABELA                                      │
│   cabeçalho | col1 | col2 | col3 | ações   │
│   ─────────────────────────────────────     │
│   linha...                                  │
│   linha...                                  │
├─────────────────────────────────────────────┤
│ PAGINAÇÃO (se necessário)                   │
└─────────────────────────────────────────────┘

CÓDIGO BASE:
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{t('employees.title')}</h1>
      <p className="text-sm text-muted-foreground mt-1">{t('employees.subtitle')}</p>
    </div>
    <Button onClick={handleNew}>
      <Plus className="h-4 w-4 mr-2" />
      {t('actions.newEmployee')}
    </Button>
  </div>

  {/* Filtros */}
  <div className="flex items-center gap-3">
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input className="pl-9" placeholder={t('common.searchPlaceholder')} />
    </div>
    {/* filtros adicionais */}
  </div>

  {/* Tabela */}
  <div className="rounded-lg border border-border overflow-hidden">
    <Table>...</Table>
  </div>
</div>
```

---

### 2.3 Página de Formulário/Configuração (ex: VacationRulesConfigPage, UserProfilePage)

```
ESTRUTURA:
┌─────────────────────────────────────────────┐
│ PAGE HEADER                                 │
│   H1 + subtítulo                            │
├─────────────────────────────────────────────┤
│ FORMULÁRIO em Card                          │
│   ┌───────────────────────────────────┐     │
│   │ SEÇÃO 1 — título da seção         │     │
│   │   campo | campo                   │     │
│   │   campo                           │     │
│   ├───────────────────────────────────┤     │
│   │ SEÇÃO 2 — título da seção         │     │
│   │   campo | campo                   │     │
│   ├───────────────────────────────────┤     │
│   │         [Cancelar] [Salvar]       │     │
│   └───────────────────────────────────┘     │
└─────────────────────────────────────────────┘

CÓDIGO BASE:
<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
  {/* Header */}
  <div>
    <h1 className="text-2xl font-bold tracking-tight">{t('profile.title')}</h1>
    <p className="text-sm text-muted-foreground mt-1">{t('profile.subtitle')}</p>
  </div>

  {/* Card de formulário */}
  <Card>
    <CardHeader>
      <CardTitle className="text-base">{t('profile.personalData')}</CardTitle>
      <CardDescription>{t('profile.personalDataDesc')}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField ... />
        <FormField ... />
      </div>
      <FormField ... />
    </CardContent>
    <CardFooter className="border-t border-border pt-6 flex justify-end gap-2">
      <Button variant="outline">{t('actions.cancel')}</Button>
      <Button type="submit">{t('actions.save')}</Button>
    </CardFooter>
  </Card>
</div>
```

---

### 2.4 Página com Abas (ex: AdminTabbedPage)

```
ESTRUTURA:
┌─────────────────────────────────────────────┐
│ PAGE HEADER                                 │
├─────────────────────────────────────────────┤
│ TABS                                        │
│  [Aba 1] [Aba 2] [Aba 3] [Aba 4]           │
│  ─────────────────────────────────          │
│  CONTEÚDO DA ABA ATIVA                      │
│  (seguir template do tipo de conteúdo)      │
└─────────────────────────────────────────────┘

CÓDIGO BASE:
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
  <div>
    <h1 className="text-2xl font-bold tracking-tight">{t('admin.title')}</h1>
    <p className="text-sm text-muted-foreground mt-1">{t('admin.subtitle')}</p>
  </div>

  <Tabs defaultValue="overview">
    <TabsList className="w-full justify-start border-b border-border rounded-none h-auto p-0 bg-transparent">
      <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
        {t('admin.tabs.overview')}
      </TabsTrigger>
      {/* mais tabs */}
    </TabsList>
    <TabsContent value="overview" className="mt-6">
      {/* conteúdo */}
    </TabsContent>
  </Tabs>
</div>
```

---

### 2.5 Página de Onboarding/Wizard (ex: AcceptInvitePage, EmployeeProfileCompletionPage)

```
ESTRUTURA:
┌─────────────────────────────────────────────┐
│              LOGO / MARCA                   │
├─────────────────────────────────────────────┤
│         INDICADOR DE PROGRESSO              │
│         Step 1 → Step 2 → Step 3           │
├─────────────────────────────────────────────┤
│              CARD CENTRAL                   │
│   (max-w-lg mx-auto)                        │
│   ┌─────────────────────────────────────┐   │
│   │ título do step                      │   │
│   │ subtítulo                           │   │
│   │ ─────────────────────────────────── │   │
│   │ campos do formulário                │   │
│   │ ─────────────────────────────────── │   │
│   │ [Voltar]              [Continuar]   │   │
│   └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘

CÓDIGO BASE:
<div className="min-h-screen bg-muted flex flex-col items-center justify-center px-4 py-12">
  {/* Logo */}
  <div className="mb-8">
    <img src="/logo.svg" alt="Heure C2" className="h-8" />
  </div>

  {/* Progress */}
  <div className="flex items-center gap-2 mb-8">
    {steps.map((step, i) => (
      <div key={i} className={cn(
        "h-2 w-16 rounded-full transition-colors duration-300",
        i <= currentStep ? "bg-primary" : "bg-border"
      )} />
    ))}
  </div>

  {/* Card */}
  <Card className="w-full max-w-lg">
    <CardHeader>
      <CardTitle>{t(`wizard.step${currentStep}.title`)}</CardTitle>
      <CardDescription>{t(`wizard.step${currentStep}.subtitle`)}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* campos */}
    </CardContent>
    <CardFooter className="border-t border-border pt-6 flex justify-between">
      <Button variant="ghost" onClick={handleBack}>{t('actions.back')}</Button>
      <Button onClick={handleNext}>{t('actions.continue')}</Button>
    </CardFooter>
  </Card>
</div>
```

---

### 2.6 Página de Login/Auth (ex: NewLoginPage, ResetPasswordPage)

```
ESTRUTURA:
┌─────────────────────────────────────────────┐
│  [metade esq — visual/branding]  [form]     │
│  (apenas desktop)                           │
│                                             │
│  Mobile: apenas o card de formulário        │
│  centralizado em fundo muted                │
└─────────────────────────────────────────────┘

CÓDIGO BASE (mobile-first, desktop split):
<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
  {/* Lado visual — oculto em mobile */}
  <div className="hidden lg:flex bg-primary items-center justify-center p-12">
    <div className="text-primary-foreground space-y-4 max-w-sm">
      <h1 className="text-3xl font-bold">{t('login.visual.title')}</h1>
      <p className="text-primary-foreground/80">{t('login.visual.subtitle')}</p>
    </div>
  </div>

  {/* Lado do formulário */}
  <div className="flex items-center justify-center p-6 bg-background">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{t('login.title')}</CardTitle>
        <CardDescription>{t('login.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* campos */}
      </CardContent>
    </Card>
  </div>
</div>
```

---

## 3. Componentes Shadcn UI — Uso Padronizado

> Apenas estes componentes são aprovados. Não criar componentes UI do zero
> quando existe um equivalente Shadcn disponível.

### 3.1 Componentes Aprovados e Seu Uso

| Componente | Uso correto no Heure C2 |
|---|---|
| `Card / CardHeader / CardContent / CardFooter` | Todo container de conteúdo agrupado |
| `Button` | Todas as ações. Variants: default, outline, ghost, destructive |
| `Input` | Campos de texto simples |
| `Select` | Dropdowns de seleção |
| `Tabs / TabsList / TabsTrigger / TabsContent` | Navegação por abas |
| `Table / TableHeader / TableBody / TableRow / TableCell` | Toda listagem tabular |
| `Badge` | Status, EntryType, tipos de feriado |
| `Dialog / DialogContent / DialogHeader` | Modais de confirmação e formulários rápidos |
| `Sheet` | Painéis laterais deslizantes (mobile) |
| `Skeleton` | Loading state de todos os componentes |
| `Alert / AlertDescription` | Mensagens de feedback inline |
| `Tooltip` | Informações contextuais em ícones |
| `Avatar` | Foto de perfil de funcionários |
| `Separator` | Divisor visual entre seções |
| `ScrollArea` | Listas longas com scroll controlado |
| `Form / FormField / FormItem / FormLabel / FormMessage` | Todos os formulários com React Hook Form |
| `Popover` | Calendários e seletores de data |
| `Switch` | Toggles boolean em configurações |
| `Checkbox` | Seleção múltipla |

### 3.2 Variantes de Button por Contexto

```
Ação principal (salvar, confirmar):   <Button>
Ação secundária (cancelar, voltar):   <Button variant="outline">
Ação terciária (link, navegação):     <Button variant="ghost">
Ação destrutiva (excluir):            <Button variant="destructive">
Ação em tabela (editar):              <Button variant="ghost" size="sm">
Ação com ícone apenas:                <Button variant="ghost" size="icon">

TAMANHOS:
  Botão padrão em formulários:        size="default"
  Botão em tabelas/listas:            size="sm"
  Botão apenas ícone:                 size="icon"
  Botão de destaque (CTAs):           size="lg"
```

### 3.3 Badge por EntryType

```tsx
// Componente padrão para exibir EntryType
const ENTRY_TYPE_STYLES: Record<EntryType, string> = {
  REGULAR:      'bg-blue-100 text-blue-700 border-blue-200',
  VACANCE:      'bg-green-100 text-green-700 border-green-200',
  FERIE:        'bg-purple-100 text-purple-700 border-purple-200',
  RECUPERATION: 'bg-orange-100 text-orange-700 border-orange-200',
  MALADIE:      'bg-red-100 text-red-700 border-red-200',
  TELE:         'bg-cyan-100 text-cyan-700 border-cyan-200',
  FIDE:         'bg-yellow-100 text-yellow-700 border-yellow-200',
}

<Badge
  variant="outline"
  className={ENTRY_TYPE_STYLES[type]}
>
  {t(`entryTypes.${type.toLowerCase()}`)}
</Badge>
```

---

## 4. Componentes de Estado — Padrão Obrigatório

> Toda página e todo componente que carrega dados deve implementar
> os 4 estados abaixo. Nunca renderizar apenas o estado de sucesso.

### 4.1 Os 4 Estados Obrigatórios

```tsx
// ESTADO 1 — LOADING
if (isLoading) return <PageSkeleton />

// ESTADO 2 — ERRO
if (error) return (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{t('errors.loadFailed')}</AlertDescription>
  </Alert>
)

// ESTADO 3 — VAZIO
if (!data || data.length === 0) return <EmptyState />

// ESTADO 4 — SUCESSO
return <ConteudoNormal data={data} />
```

### 4.2 Skeleton Loading — Padrão por Tipo

```tsx
// Skeleton de KPI card
const KpiCardSkeleton = () => (
  <Card>
    <CardContent className="p-6 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </CardContent>
  </Card>
)

// Skeleton de linha de tabela
const TableRowSkeleton = () => (
  <TableRow>
    {Array.from({ length: 5 }).map((_, i) => (
      <TableCell key={i}><Skeleton className="h-4 w-full" /></TableCell>
    ))}
  </TableRow>
)

// Skeleton de formulário
const FormSkeleton = () => (
  <Card>
    <CardContent className="p-6 space-y-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
)
```

### 4.3 Empty State — Padrão Visual

```tsx
const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="rounded-full bg-muted p-4 mb-4">
      <Icon className="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
    {action && action}
  </div>
)

// Uso:
<EmptyState
  icon={CalendarOff}
  title={t('vacations.empty.title')}
  description={t('vacations.empty.description')}
  action={<Button onClick={handleNew}>{t('vacations.empty.action')}</Button>}
/>
```

### 4.4 Error State — Padrão Visual

```tsx
const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <Alert variant="destructive" className="max-w-lg mx-auto">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription className="flex items-center justify-between">
      <span>{message}</span>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="ml-4 shrink-0">
          <RefreshCw className="h-3 w-3 mr-1" />
          {t('actions.retry')}
        </Button>
      )}
    </AlertDescription>
  </Alert>
)
```

---

## 5. KPI Card — Componente Padrão

> Todo dashboard usa este padrão de card de métrica. Não criar variações.

```tsx
interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: { value: number; positive: boolean }
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const VARIANT_STYLES = {
  default: 'text-foreground',
  success: 'text-emerald-600',
  warning: 'text-amber-600',
  error:   'text-destructive',
}

const KpiCard = ({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: KpiCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn("text-2xl font-bold", VARIANT_STYLES[variant])}>{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="rounded-lg bg-muted p-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      {trend && (
        <div className={cn("flex items-center gap-1 mt-3 text-xs font-medium",
          trend.positive ? "text-emerald-600" : "text-destructive"
        )}>
          {trend.positive
            ? <TrendingUp className="h-3 w-3" />
            : <TrendingDown className="h-3 w-3" />
          }
          <span>{trend.positive ? '+' : ''}{trend.value}%</span>
        </div>
      )}
    </CardContent>
  </Card>
)
```

---

## 6. Padrões de Formulário

### 6.1 Estrutura Obrigatória com React Hook Form + Shadcn

```tsx
// Todo formulário deve seguir esta estrutura
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

    <FormField
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('form.fieldLabel')}</FormLabel>
          <FormControl>
            <Input placeholder={t('form.fieldPlaceholder')} {...field} />
          </FormControl>
          <FormDescription>{t('form.fieldHint')}</FormDescription>
          <FormMessage /> {/* erros de validação automáticos */}
        </FormItem>
      )}
    />

    <div className="flex justify-end gap-2 pt-4 border-t border-border">
      <Button type="button" variant="outline" onClick={onCancel}>
        {t('actions.cancel')}
      </Button>
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting
          ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{t('actions.saving')}</>
          : t('actions.save')
        }
      </Button>
    </div>
  </form>
</Form>
```

### 6.2 Feedback de Sucesso/Erro com Toast

```tsx
// Sucesso
toast({
  title: t('common.success'),
  description: t('messages.savedSuccessfully'),
})

// Erro
toast({
  title: t('common.error'),
  description: t('errors.saveFailed'),
  variant: 'destructive',
})

// NUNCA usar alert() nativo
// NUNCA colocar texto literal no toast
```

---

## 7. Padrões de Navegação e Layout Global

### 7.1 Hierarquia de Layout

```
AppShell (layout raiz autenticado)
├── Sidebar (navegação lateral — desktop)
│   ├── Logo Heure C2
│   ├── Nav items com ícone + label traduzido
│   └── Perfil do usuário (avatar + nome + role)
├── TopBar (mobile)
│   ├── Hamburger menu
│   └── Logo + notificações
└── Main Content
    └── <Outlet /> (página ativa)
```

### 7.2 Nav Items — Ordem e Ícones Padrão

```
FUNCIONÁRIO:
  Dashboard    → LayoutDashboard
  Férias       → CalendarDays
  Relatórios   → BarChart3
  Perfil       → User
  Self-Service → Headphones

ADMIN:
  Painel       → LayoutDashboard
  Administração → Settings2
  Funcionários → Users
  Regras Férias → CalendarClock
  Performance  → Activity
```

### 7.3 Indicador de Role do Usuário

```tsx
// Badge de role sempre visível na sidebar
const ROLE_BADGE = {
  admin: { label: t('roles.admin'), class: 'bg-purple-100 text-purple-700' },
  employee: { label: t('roles.employee'), class: 'bg-blue-100 text-blue-700' },
}
```

---

## 8. Consistência entre Páginas — Checklist para a IA

Antes de entregar qualquer página ou componente, verificar:

**Layout:**
- [ ] Usa `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6`?
- [ ] Tem `space-y-6` entre seções?
- [ ] Header segue o padrão H1 + subtítulo muted?
- [ ] Cards em grid têm h-full?

**Componentes:**
- [ ] Usa apenas componentes Shadcn listados na seção 3?
- [ ] Não criou componente UI do zero quando havia equivalente Shadcn?
- [ ] Cards usam `Card > CardHeader > CardContent > CardFooter`?

**Estados:**
- [ ] Implementou os 4 estados (loading, error, empty, success)?
- [ ] Loading usa `Skeleton` e não spinner genérico?
- [ ] Empty state tem ícone + título + descrição + ação?

**Formulários:**
- [ ] Usa `Form` + `FormField` do Shadcn com React Hook Form?
- [ ] Botão de submit tem estado de loading com `Loader2`?
- [ ] Feedback usa `toast` — nunca `alert()`?

**i18n:**
- [ ] Todo texto usa `t()`?
- [ ] Chaves existem em todos os idiomas (PT, FR, EN, ES)?

**Tipos:**
- [ ] Nenhum `any`?
- [ ] Componente tem interface TypeScript definida?

---

## 9. Anti-Patterns — O Que Nunca Fazer

```
❌ Criar div com classe CSS manual quando há componente Shadcn equivalente
❌ Usar cores fora dos tokens definidos (ex: text-gray-500 — usar text-muted-foreground)
❌ Renderizar sem estado de loading
❌ Renderizar sem estado de vazio
❌ Usar alert() / confirm() nativos
❌ Criar modais com z-index manual — usar Dialog do Shadcn
❌ Usar font-size em px — sempre usar escala Tailwind (text-sm, text-base, etc.)
❌ Espaçamentos arbitrários (mt-7, pb-11) — usar escala Tailwind (mt-6, pb-10, etc.)
❌ Adicionar Framer Motion sem aprovação explícita
❌ Criar variante nova de KpiCard — usar o componente padrão da seção 5
❌ Misturar estrutura de página (ex: layout de formulário em página de dashboard)
❌ Header sem subtítulo muted-foreground
❌ Tabela sem border e rounded-lg no container
❌ Botão de submit sem estado de loading/disabled durante submissão
❌ Card dentro de grid sem h-full — causa cards de alturas desiguais

```

---

## 10. Registro de Decisões Visuais

> Documentar aqui toda decisão visual que foi tomada e o motivo.
> Isso evita que a mesma discussão aconteça duas vezes.

| Data | Decisão | Motivo |
|---|---|---|
| 2026-02 | Remoção de Framer Motion | Redução de bundle (fase de otimização) |
| 2026-02 | i18n via HTTP backend | Traduções fora do bundle JS |
| 2026-02 | `text-muted-foreground` para subtítulos | Consistência com Shadcn design system |
| — | *(adicionar aqui próximas decisões)* | — |