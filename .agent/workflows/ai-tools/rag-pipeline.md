---
description: Construir pipelines de geração aumentada por recuperação (RAG)
---

# Pipeline RAG

> **Projeto Recanto:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, shadcn/ui em `components/ui/`, Drizzle ORM + Postgres Neon (`lib/db/`, `services/`). Referência: `.context/docs/project-overview.md` e `.cursorrules`.
>
> **Adaptação:** em passos genéricos, usar pastas reais do repo: `app/`, `components/`, `lib/`, `services/`, `hooks/` (evitar assumir `src/` ou Vite).

Este workflow ajuda a construir um pipeline de geração aumentada por recuperação (RAG).

## Limites e cuidados

- Começar simples; optimizar depois
- Medir a qualidade da recuperação
- Tratar resultados vazios com elegância
- Considerar custo e latência

## Passos

### 1. Perceber requisitos

Perguntas de clarificação:

- Que fontes de dados precisam de indexação?
- Que tipos de consultas os utilizadores farão?
- Processamento em tempo real ou em lote?
- Já existe vector store configurado?

### 2. Desenhar o pipeline

Componentes a definir:

- **Carregador de documentos:** ingerir fontes
- **Divisor de texto:** criar chunks
- **Embeddings:** gerar vectores
- **Armazém vectorial:** guardar e consultar
- **Recuperador:** encontrar chunks relevantes
- **Gerador:** produzir respostas

### 3. Configurar componentes

Configurar cada peça:

- Escolher modelo de embeddings
- Escolher base vectorial (Pinecone, Chroma, etc.)
- Definir tamanho de chunk e sobreposição
- Configurar parâmetros de recuperação

### 4. Implementar o pipeline

Construir o fluxo:

- Carregar e processar documentos
- Gerar embeddings
- Armazenar na base vectorial
- Criar cadeia de recuperação
- Ligar ao LLM para geração

### 5. Optimizar

Melhorar qualidade:

- Afinar tamanho de chunk
- Ajustar *k* da recuperação
- Adicionar re-ranking
- Implementar pesquisa híbrida

### 6. Verificar

- Testar com consultas de exemplo
- Verificar relevância da recuperação
- Validar respostas geradas

## Princípios

- A qualidade da recuperação determina a qualidade da saída
- Começar com conjunto de dados pequeno
- Monitorizar e iterar
