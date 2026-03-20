# PRD — Recanto (Dashboard financeiro)

| Campo | Valor |
|--------|--------|
| **Produto** | Recanto — controle de fluxo de caixa (reforma / gestão financeira) |
| **Versão do doc** | 1.0 |
| **Status** | Documento vivo |

---

## 1. Visão geral

Aplicação web para **registrar, classificar e visualizar receitas e despesas**, com totais no painel, tabela filtrável, gráficos de despesas e **importação** de planilhas (CSV) e extratos (OFX). Público-alvo: uso **individual ou pequena operação** (ex.: obra / temporada), com foco em **pt-BR** e formatos numéricos brasileiros.

### Proposta de valor

- Visão rápida de **receitas, despesas e saldo**
- **Categorias** editáveis, com suporte a **subcategorias** (nome composto `Pai > Filho`) na UI
- **Importação com prévia** (nome do arquivo, tipo detectado, quantidade de linhas, soma esperada, amostra das primeiras linhas)
- **Formulário de receita** alinhado a planilha de temporada (telefone, datas, pagamentos, utilidades, total calculado)
- **Máscara monetária** tipo app bancário (`0,00` → digitação por centavos)
- **Exportação PDF** da lista filtrada

---

## 2. Escopo funcional

### 2.1 Implementado (MVP+)

| Área | Funcionalidade |
|------|----------------|
| Dashboard | Cards de totais (receita / despesa / saldo); reset por tipo (ícone no card) |
| Transações | Lista paginada; filtros por tipo, categoria; busca global (texto, data formatada, valor) |
| CRUD | Criar, editar, excluir transação (modal) |
| Categorias | CRUD em modal; proteção de categorias padrão e com transações vinculadas |
| Importação | CSV (delimitador auto; templates receita/despesa; regras alinhadas a planilhas pt-BR) e OFX; modo auto/receita/despesa |
| Exportação | PDF |
| UX | Calendário no modal; tipografia hierárquica; cores distintas para totais receita/despesa |

### 2.2 Fora de escopo (por ora)

- Multiusuário, login e permissões
- API pública documentada
- App mobile nativo
- Conciliação bancária automática contínua

---

## 3. Personas

| Persona | Necessidade |
|---------|-------------|
| **Gestor financeiro (donos da obra / temporada)** | Lançar e importar movimentos, ver totais e categorias |
| **Operador** | Manter categorias e corrigir lançamentos |

---

## 4. Requisitos funcionais (resumo)

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF1 | Cadastrar transação receita ou despesa com data, histórico, valor, categoria (despesa) | Alta |
| RF2 | Listar e filtrar transações; busca por múltiplos campos | Alta |
| RF3 | Gerenciar categorias (incl. subcategorias via nome) | Alta |
| RF4 | Importar CSV/OFX com prévia e soma antes de confirmar | Alta |
| RF5 | Exportar relatório em PDF | Média |
| RF6 | Valores monetários com máscara pt-BR consistente | Alta |
| RF7 | Persistência em banco relacional (SQLite local / LibSQL remoto) | Alta |

---

## 5. Regras de negócio relevantes

- **Receitas** podem usar descrição estruturada (campos concatenados) e total calculado a partir de subcampos.
- **Importação CSV** de despesas: valores só com ponto decimal (ex. `14.99`) podem ser tratados como **não numéricos** na soma, alinhado a comportamento comum de planilhas pt-BR (documentado no código).
- **Categorias** padrão do seed não devem ser removidas se ainda houver dependência de negócio (ex.: receita padrão).

---

## 6. Stack e arquitetura

| Camada | Tecnologia |
|--------|------------|
| UI | Next.js App Router, React, Tailwind |
| Estado cliente | React Context (`TransactionProvider`) |
| Dados | Drizzle ORM + LibSQL (`file:local.db` ou Turso) |
| Ações servidor | Server Actions (`services/*/*.actions.ts`) |

Estrutura principal:

- `app/` — rotas e layout
- `components/` — dashboard, tabela, modal, gráficos, categorias
- `lib/db/` — schema, conexão, seed
- `services/` — transações e categorias

---

## 7. Não funcionais

| Aspecto | Meta |
|---------|------|
| Idioma / locale UI | pt-BR |
| Segurança | Sem expor `.env`, tokens ou `*.db` no repositório público |
| Deploy | Compatível com Vercel + banco Turso (LibSQL remoto) |

---

## 8. Roadmap sugerido

| Fase | Itens |
|------|--------|
| Curto prazo | Lista de **linhas ignoradas** na pré-importação; testes automatizados de parse CSV; CI com **Drizzle push** (`.github/workflows/drizzle-push.yml`) |
| Médio prazo | Autenticação opcional; backup/export JSON |
| Longo prazo | Multi-projeto (várias “obras” ou unidades) |

---

## 9. Referências no repositório

- **README:** instruções de setup e deploy — `README.md`
- **Schema DB:** `lib/db/schema.ts`
- **Variáveis de ambiente:** `.env.example`
