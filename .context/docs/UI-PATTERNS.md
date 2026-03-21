# Padrões de UI — Recanto

## Base

- **Componentes:** shadcn/ui em `components/ui/` (Radix + Tailwind).
- **Ícones:** `lucide-react`.
- **Gráficos:** `recharts` / `apexcharts` conforme componentes existentes (`expense-charts.tsx`, etc.).

## Layout

- Raiz da app: `app/layout.tsx` e `app/page.tsx`.
- Features: composição em `components/dashboard.tsx`, tabelas e modais já existentes como referência.

## Formulários

- **React Hook Form** + **Zod** (`@hookform/resolvers`) onde já estiver em uso nos modais/formulários.

## Estados

- Para listagens e dados async: preferir **loading**, **erro**, **vazio** e **sucesso** explícitos na UI.

## Acessibilidade

- Labels associados a inputs; foco visível; diálogos com título e fecho claro.

## Anti-padrões

- DOM de tabela inválido (`div` dentro de `tbody`).
- Modais sem altura controlada em mobile — testar viewport estreito.

## Não aplicável

- Evoluir padrões visuais a partir dos componentes existentes (`dashboard`, modais, tabelas), sem copiar guias de outros produtos.
