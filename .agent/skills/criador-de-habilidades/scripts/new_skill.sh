#!/bin/bash

# Script para criar a estrutura básica de uma nova Skill no Antigravity
# Uso: ./new_skill.sh <nome-da-skill> "Descrição da skill"

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Uso: $0 <nome-da-skill> \"Descrição da skill\""
    exit 1
fi

SKILL_NAME=$1
SKILL_DESC=$2
SKILL_DIR=".agent/skills/$SKILL_NAME"

mkdir -p "$SKILL_DIR/scripts"
mkdir -p "$SKILL_DIR/examples"
mkdir -p "$SKILL_DIR/resources"

cat <<EOF > "$SKILL_DIR/SKILL.md"
---
name: $SKILL_NAME
description: $SKILL_DESC
---

# $SKILL_NAME

## Objetivo
Descreva o objetivo desta habilidade aqui.

## Instruções
1. Passo um
2. Passo dois

## Melhores Práticas
- Dica de ouro
EOF

echo "Skill '$SKILL_NAME' criada com sucesso em $SKILL_DIR"
