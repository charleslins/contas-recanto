# PRD — Heure C2

> **Versão**: 2.0
> **Data**: 21/02/2026
> **Status**: Documento vivo — atualizado após cada milestone

---

## 1. Visão Geral

**Heure C2** é uma plataforma de gestão de horas de trabalho e férias para empresas na Suíça, com conformidade às leis trabalhistas cantonais e municipais. O sistema oferece dashboards em tempo real para funcionários e administradores, gestão completa de férias, registro de horas diárias e conformidade GDPR/Swiss FADP.

### Proposta de Valor

- Gestão de horas automatizada com cálculos contratuais por dia da semana
- Sistema de férias com regras baseadas em idade e legislação suíça
- Feriados por cantão e município (Zurich, Genebra, Berna, etc.)
- Conformidade GDPR e Swiss FADP integrada
- Interface multilíngue (PT, FR, EN, ES)

---

## 2. Personas

| Persona | Descrição | Rotas principais |
|---|---|---|
| **Administrador** | Gerencia empresa, funcionários, configurações, férias e compliance | `/admin`, `/painel`, `/admin/employees`, `/admin/vacation-rules` |
| **Funcionário** | Registra horas, solicita férias, gerencia perfil | `/dashboard`, `/vacations`, `/profile`, `/self-service` |
| **Convidado** | Recebeu convite, precisa completar registro | `/accept-invite`, `/invite/:token`, `/activate` |
| **Visitante** | Acessa landing pages antes de autenticação | `/`, `/employee`, `/login` |

---

## 3. Stack Tecnológica

| Camada | Tecnologia | Versão |
|---|---|---|
| **Build** | Vite | 7.0 |
| **Frontend** | React | 18.3 |
| **Linguagem** | TypeScript | 5.3 |
| **Estilização** | Tailwind CSS | 4.1 |
| **UI Kit** | Shadcn UI (Radix UI) | — |
| **Backend** | Supabase (PostgreSQL + Auth + Realtime) | 2.58 |
| **Roteamento** | react-router-dom | 6.28 |
| **Formulários** | React Hook Form + Zod | 7.66 / 3.25 |
| **i18n** | react-i18next | 14.0 |
| **Gráficos** | Recharts | 2.15 |
| **Animações** | Framer Motion | 12.23 |
| **Monitoramento** | Sentry + LogRocket | 10.30 / 10.1 |
| **Testes Unit** | Vitest + Testing Library | 3.2 |
| **Testes E2E** | Playwright (Python) | 1.55 |

---

## 4. Arquitetura

### Padrão: MVC Adaptada com Presenters

```
Components → Hooks → Presenters → Services → Supabase
     ↕           ↕           ↕           ↕
  (UI/View)   (State)    (Logic)    (Data/API)
```

### Estrutura de Diretórios

```
src/
├── models/          # Interfaces de domínio
├── presenters/      # Lógica de controle (1:1 com models)
├── services/        # 39 services (Supabase, APIs)
├── hooks/           # Custom hooks
├── contexts/        # Auth, GlobalData, Notifications, CurrentUserData
├── components/      # UI (inclui ui/, admin/, Dashboard/, Charts/)
├── pages/           # 21 páginas
├── types/           # Tipos compartilhados + Supabase types
├── utils/           # Helpers puros, logger, circuit breaker
├── auth/            # AuthService + types
├── config/          # Configurações centralizadas
├── i18n/            # Traduções por módulo
├── schemas/         # Validação Zod
└── supabase/        # Migrations
```

### Design Patterns

| Padrão | Confiança | Localização |
|---|---|---|
| Presenter | 95% | `src/presenters/` |
| Circuit Breaker | 95% | `src/utils/apiRetryUtils.ts` |
| Service | 90% | `src/services/` |
| Provider (Context) | 90% | `src/contexts/` |
| Observer (Realtime) | 85% | `src/services/realtimeConnectionService.ts` |

---

## 5. Features — Estado Atual

### 5.1 Autenticação e Onboarding

| Feature | Status | Descrição |
|---|---|---|
| Login/Logout | ✅ Implementado | Supabase Auth com refresh tokens |
| Reset de Senha | ✅ Implementado | Via email Supabase |
| Registro de Empresa | ✅ Implementado | Registration Wizard multi-step |
| Sistema de Convites | ✅ Implementado | Token-based, email + link manual |
| Aceitação de Convite | ✅ Implementado | Perfil + ativação de conta |
| Proteção de Rotas | ✅ Implementado | ProtectedRoute com verificação de role |
| Revalidação Inteligente | ✅ Implementado | Cache + visibility change handler |

### 5.2 Dashboard do Funcionário

| Feature | Status | Descrição |
|---|---|---|
| Registro de Horas Diárias | ✅ Implementado | Manhã/Tarde com TimeSegments |
| Contrato Semanal | ✅ Implementado | Horas por dia da semana (Seg-Dom) |
| Resumo Mensal | ✅ Implementado | Horas contratadas vs trabalhadas, saldo |
| Tipos de Entrada | ✅ Implementado | Regular, Férias, Feriado, Recuperação, Doença, Teletrabalho, Fidelidade |
| Cálculo de Horas Extras | ✅ Implementado | Automático com base no contrato |
| Saldo Acumulado | ✅ Implementado | Balance mensal propagado |

### 5.3 Gestão de Férias

| Feature | Status | Descrição |
|---|---|---|
| Calendário de Férias | ✅ Implementado | Seleção visual por mês |
| Solicitação de Férias | ✅ Implementado | Status: Selected → Pending → Approved/Rejected |
| Regras por Idade | ✅ Implementado | Cálculo automático baseado em idade (lei suíça) |
| Feriados por Cantão/Município | ✅ Implementado | Nacional, Cantonal, Municipal, Custom |
| Configuração de Regras | ✅ Implementado | Admin configura VacationRulesConfig |
| Painel Resumo | ✅ Implementado | Dias totais, usados, restantes |

### 5.4 Administração

| Feature | Status | Descrição |
|---|---|---|
| Gestão de Funcionários | ✅ Implementado | CRUD completo via admin |
| Dashboard Admin | ✅ Implementado | Visão geral com abas |
| Aba Férias/Calendários (Admin) | ✅ Implementado | Aba `vacations` no painel admin (`/admin?tab=vacations`) com visão consolidada em `UserVacationSummaryTable` |
| Gestão de Feriados | ✅ Implementado | CRUD de feriados por localidade |
| Regras de Férias | ✅ Implementado | Configuração por empresa |
| Dashboard de Performance | ✅ Implementado | Métricas Supabase |
| Painel GDPR | ✅ Implementado | Compliance dashboard |

### 5.5 Compliance e Segurança

| Feature | Status | Descrição |
|---|---|---|
| RLS (Row Level Security) | ✅ Implementado | Isolamento multi-tenant |
| Auditoria GDPR | ✅ Implementado | GdprAuditService + DataRetentionService |
| Consentimento de Cookies | ✅ Implementado | CookieConsentService |
| Direitos do Titular | ✅ Implementado | Exportação/Exclusão de dados |
| Política de Privacidade | ✅ Implementado | PrivacyPolicyService |

### 5.6 Infraestrutura

| Feature | Status | Descrição |
|---|---|---|
| Internacionalização | ✅ Implementado | 4 idiomas (PT, FR, EN, ES) |
| Sistema de Logging | ✅ Implementado | Logger estruturado com módulos |
| Circuit Breaker | ✅ Implementado | Proteção contra falhas em cascata |
| Modo Offline | ✅ Implementado | OfflineDataService + Service Worker |
| Monitoramento Realtime | ✅ Implementado | RealtimeConnectionService |
| Tradução Inteligente | ✅ Implementado | Multi-provider (DeepL, Google, Azure) |

---

## 6. Entidades de Domínio

| Entidade | Descrição | Campos-chave |
|---|---|---|
| **User** | Funcionário/Admin | id, email, role, company_id, canton, municipality |
| **DailyLogEntry** | Registro diário de horas | date, morning, afternoon, isWorkingDay |
| **TimeSegment** | Bloco de tempo | start (HH:MM), end (HH:MM), type (EntryType) |
| **WeeklyContractHours** | Contrato semanal | sunday..saturday: { morning, afternoon } |
| **VacationDay** | Dia de férias | date, status (Selected/Pending/Approved/Rejected) |
| **Holiday** | Feriado | name, date, type (National/Cantonal/Municipal/Custom) |
| **SummaryData** | Resumo mensal | contractedHours, workedHours, overtime, balance |
| **PendingRequest** | Solicitação pendente | userId, date, status, type, comment |

### Tipos de Entrada (EntryType)

| Código | Significado |
|---|---|
| `REGULAR` | Trabalho regular |
| `VACANCE` | Férias |
| `FERIE` | Feriado |
| `RECUPERATION` | Recuperação/compensação |
| `MALADIE` | Doença/atestado |
| `TELE` | Teletrabalho |
| `FIDE` | Dia de fidelidade |

---

## 7. Rotas da Aplicação

### Públicas e utilitárias (13 rotas)

| Rota | Página |
|---|---|
| `/` | CompanyLandingPage |
| `/login` | NewLoginPage |
| `/entrar` | EmployeeLandingPage |
| `/employee` | Redirect → `/entrar` |
| `/reset-password` | ResetPasswordPage |
| `/activate` | ActivateAccountPage |
| `/accept-invite` | AcceptInvitePage |
| `/invite/:token` | EmployeeProfileCompletionPage |
| `/test-visual` | TestVisualPage |
| `/portal/empresa` | Redirect → `/login?type=company` |
| `/portal/funcionario` | Redirect → `/entrar` |
| `/app` | Redirect autenticado/não autenticado |
| `/auto-redirect` | AutoRedirect |
| `/dev/header` | Rota de desenvolvimento (somente `import.meta.env.DEV`) |

### Protegidas — Funcionário (5 rotas)

| Rota | Página |
|---|---|
| `/dashboard` | DashboardPage |
| `/vacations` | VacationConfigPage |
| `/profile` | UserProfilePage |
| `/reports` | ReportsPage |
| `/self-service` | SelfServiceDashboardPage |

### Protegidas — Admin (9 rotas)

| Rota | Página |
|---|---|
| `/painel` | AdminOverviewDashboard |
| `/admin` | AdminTabbedPage |
| `/admin/employees` | EmployeeManagementPage |
| `/admin/vacation-rules` | VacationRulesConfigPage |
| `/admin/performance` | PerformanceDashboard |
| `/admin/translation-demo` | SmartTranslationDemo |
| `/translation-debug` | SmartTranslationDemo (rota de debug) |
| `/demo/superuser` | SuperUserDemo |
| `/access-denied` | AccessDeniedMessage |

---

## 8. Services (39 arquivos)

### Core (domínio principal)

| Service | Responsabilidade |
|---|---|
| `userService.ts` | CRUD de usuários |
| `employeeApiService.ts` | API de funcionários |
| `vacationApiService.ts` | API de férias |
| `vacationRulesCalculator.ts` | Cálculo de regras de férias por idade |
| `locationService.ts` / `locationApiService.ts` | Cantões, municípios, feriados |
| `companyService.ts` / `companyConfigService.ts` | Configuração de empresa |

### Autenticação e Convites

| Service | Responsabilidade |
|---|---|
| `inviteService.ts` | Criação de convites |
| `userInviteService.ts` / `userInviteServiceEnhanced.ts` | Fluxo completo de convites |
| `inviteAcceptanceService.ts` | Aceitação de convites |
| `inviteValidationService.ts` | Validação de tokens |
| `inviteEmailService.ts` / `emailService.ts` | Envio de emails |
| `userActivationService.ts` | Ativação de contas |

### Infraestrutura

| Service | Responsabilidade |
|---|---|
| `LoggingService.ts` | Logging estruturado |
| `cacheService.ts` | Cache local |
| `offlineDataService.ts` | Persistência offline |
| `realtimeConnectionService.ts` | Conexão Supabase Realtime |
| `networkMonitoringService.ts` | Monitoramento de rede |
| `requestThrottleService.ts` | Rate limiting |
| `ConnectionFallbackService.ts` | Fallback de conexão |
| `performanceMonitoring.ts` | Métricas de performance |
| `translationService.ts` | Tradução multi-provider |

### Compliance

| Service | Responsabilidade |
|---|---|
| `auditService.ts` / `auditLoggingService.ts` | Auditoria de ações |
| `gdprAuditService.ts` | Compliance GDPR |
| `dataRetentionService.ts` | Retenção e exclusão de dados |
| `cookieConsentService.ts` | Consentimento de cookies |
| `privacyPolicyService.ts` | Política de privacidade |

---

## 9. Qualidade e Testes

| Aspecto | Estado |
|---|---|
| **Cobertura alvo** | 80% (services/utils/presenters), 90% (services críticos) |
| **Framework unit** | Vitest + Testing Library |
| **Framework E2E** | Playwright (Python) |
| **Linting** | ESLint + Prettier |
| **i18n check** | `scripts/check-hardcode.mjs` via Husky pre-commit |
| **TypeScript** | `strictNullChecks: true`, `noImplicitAny: true` |
| **CI/CD** | GitHub Actions (`.github/workflows/`) |

### Scripts Disponíveis

| Script | Função |
|---|---|
| `npm run dev` | Dev server (porta 5188) |
| `npm run build` | Build produção |
| `npm run test` | Testes unitários |
| `npm run e2e` | Testes E2E |
| `npm run lint` | Linting |
| `npm run check:hardcode` | Verificar textos não traduzidos |
| `npm run generate-types` | Gerar tipos do Supabase |

---

## 10. Dívida Técnica Conhecida

| Item | Severidade | Estimativa |
|---|---|---|
| ~800 ocorrências de `any` | ALTA | 2-3 semanas |
| ~600 `console.log` (migrar para logger) | MÉDIA | 1 semana |
| ~400 funções sem tipo de retorno | MÉDIA | 1 semana |
| 3 versões de ProductivityMetricsCard | BAIXA | 2 dias |
| 3 componentes > 400 linhas | BAIXA | 3 dias |
| `crypto-js` no package.json (não utilizado) | BAIXA | 1 hora |
| Emails hardcoded em scripts de teste | MÉDIA | 1 dia |

### 10.1 Revisão baseada nas páginas admin atuais

- **Resolvido nessas 3 páginas**: não há ocorrência de `console.log` em `AdminDashboardPage`, `AdminOverviewDashboard` e `AdminTabbedPage`.
- **Pendente nessas 3 páginas**: ainda existem ocorrências de `any` (0 em `AdminDashboardPage`, 5 em `AdminOverviewDashboard`, 2 em `AdminTabbedPage`).
- **Pendente nessas 3 páginas**: dívida de componentes extensos permanece (`AdminOverviewDashboard` com 2646 linhas e `AdminTabbedPage` com 885 linhas).
- **Itens globais restantes da seção 10**: não foram revalidados nesta revisão por não estarem cobertos pelos 3 arquivos analisados.

---

## 11. Roadmap

### Q1 2026 — Estabilização

- [ ] Eliminar uso de `any` nos services críticos
- [ ] Migrar `console.log` para sistema de logging
- [ ] Consolidar componentes duplicados
- [ ] Regenerar `codebase-map.json`
- [ ] Remover `crypto-js` do package.json

### Q2 2026 — Evolução

- [ ] Dashboard analytics avançado
- [ ] Notificações push (aprovação de férias)
- [ ] Relatórios exportáveis (PDF/Excel)
- [ ] Integração calendário externo (Google Calendar, Outlook)

### Q3 2026 — Escala

- [ ] Multi-empresa (SaaS)
- [ ] API pública documentada
- [ ] Mobile PWA otimizado
- [ ] Auditoria SOC 2

---

## 12. Referências

| Documento | Localização |
|---|---|
| Regras consolidadas | `.cursorrules` |
| Detalhamento (logging, auth, performance) | `.agent/REGRAS_CONSOLIDADAS.md` |
| Arquitetura | `.context/docs/architecture.md` |
| Glossário | `.context/docs/glossary.md` |
| Workflows | `.agent/workflows/registry.json` |
| Segurança | `.context/docs/security.md` |
