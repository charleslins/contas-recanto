---
name: criador-de-habilidades
description: Uma habilidade técnica usada para criar e estruturar novas habilidades (Skills) no agente Antigravity, seguindo padrões oficiais e com instrução em Português Brasileiro. Use esta habilidade quando o usuário pedir para adicionar uma nova capacidade persistente ao agente.
---

# Criador de Habilidades (Skill Creator)

Esta habilidade orienta o agente na criação de novas capacidades estruturadas. Habilidades são persistentes e permitem que o agente execute tarefas complexas de forma consistente em diferentes sessões.

## Quando usar esta habilidade

- Quando o usuário solicitar a criação de uma nova "Skill" ou "Habilidade".
- Quando houver necessidade de padronizar um fluxo de trabalho complexo que será repetido no futuro.

## Fluxo de Trabalho (Workflow)

Ao criar uma nova habilidade, siga estes passos:

1. **Estrutura de Pastas**:
   - Crie um diretório em `.agent/skills/<nome-da-habilidade>/`.
   - Crie as subpastas: `scripts/`, `examples/` e `resources/`.

2. **Arquivo SKILL.md**:
   - Este é o arquivo obrigatório. Deve conter o YAML frontmatter no topo.
   - `name`: Identificador único (hifens em vez de espaços).
   - `description`: Explicação clara em terceira pessoa sobre o que a habilidade faz (essencial para a auto-descoberta do agente).

3. **Conteúdo do SKILL.md**:
   - Use Markdown claro.
   - Adicione seções como:
     - `# Nome da Habilidade`
     - `## Objetivo`
     - `## Instruções Passo a Passo`
     - `## Melhores Práticas`

4. **Scripts e Recursos**:
   - Coloque scripts executáveis em `scripts/`.
   - Inclua arquivos de referência em `examples/`.
   - Guarde templates ou ativos em `resources/`.

## Regras de Ouro

- **Idioma**: Todas as instruções técnicas e descrições para o usuário devem ser em **Português Brasileiro**.
- **Contexto**:Scripts devem ser documentados (ex: `script.sh --help`) para que o agente possa usá-los sem ler todo o código-fonte.
- **Foco**: Cada habilidade deve resolver um problema específico. Não crie "monolitos" de habilidades.

## Exemplo de Frontmatter

```yaml
---
name: code-review-pro
description: Analisa mudanças de código em busca de vulnerabilidades de segurança e aderência aos padrões de Clean Code configurados no projeto.
---
```
