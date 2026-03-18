# Workflow: Padronização UI/UX e Correção Visual

**Contexto**: O design precisa ser homogêneo, profissional e se comportar bem no Mobile (preparação para PWA).

**Instruções para a IA**:
1. Leia a seção 2, 3 e 4 do arquivo `.context/docs/UI-PATTERNS.md`.
2. Analise a página/componente solicitado pelo usuário.
3. **Remova** qualquer margem/padding hardcoded no container pai (`max-w`, `mx-auto`) que conflite com o `MainAppLayout`.
4. Substitua tags HTML cruas por componentes do `Shadcn` equivalentes (ex: `<button>` por `<Button>`, `<table>` por `<Table>`).
5. Garanta que o componente trate os 4 estados (Loading via Skeleton, Error, Empty e Success).
6. Ajuste os espaçamentos (gap, padding) para ficarem consistentes (escala de 4, ex: p-4, gap-6).
7. Garanta que todas as strings visíveis usem `t('chave')`.