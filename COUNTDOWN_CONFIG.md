# Configuração do Countdown de Lançamento

## Visão Geral

O sistema de countdown de lançamento permite que você bloqueie o acesso ao website até uma data e hora específicas. Quando ativado, os visitantes verão uma página elegante de countdown até o momento do lançamento.

## Variáveis de Ambiente

Adicione as seguintes variáveis ao seu arquivo `.env`:

```env
# Ativar/Desativar Countdown
# true = countdown ativo (bloqueia o site)
# false = countdown desativado (site acessível normalmente)
VITE_ENABLE_COUNTDOWN=true

# Data de Lançamento (formato: YYYY-MM-DD)
VITE_LAUNCH_DATE=2025-11-28

# Hora de Lançamento (formato: HH:MM, horário de Moçambique)
VITE_LAUNCH_TIME=18:00

# Timezone (opcional, padrão: Africa/Maputo)
VITE_LAUNCH_TIMEZONE=Africa/Maputo
```

## Como Usar

### Ativar o Countdown

1. Defina `VITE_ENABLE_COUNTDOWN=true` no seu arquivo `.env`
2. Configure a data e hora de lançamento
3. Reinicie o servidor de desenvolvimento ou faça rebuild

### Desativar o Countdown

1. Defina `VITE_ENABLE_COUNTDOWN=false` no seu arquivo `.env`
2. Ou simplesmente remova a variável (padrão é `true`)
3. Reinicie o servidor de desenvolvimento ou faça rebuild

### Exemplo de Configuração

```env
# Countdown ativo até 28 de Novembro de 2025 às 18:00 (horário de Moçambique)
VITE_ENABLE_COUNTDOWN=true
VITE_LAUNCH_DATE=2025-11-28
VITE_LAUNCH_TIME=18:00
```

## Comportamento

- **Quando ativado**: O site fica completamente bloqueado, mostrando apenas a página de countdown
- **Após o lançamento**: O countdown desaparece automaticamente e o site fica acessível
- **Quando desativado**: O site funciona normalmente, ignorando qualquer data de lançamento

## Horário de Moçambique

O sistema usa automaticamente o horário de Moçambique (CAT - Central Africa Time, UTC+2). A data e hora configuradas são interpretadas neste fuso horário.

## Notas Importantes

- O countdown verifica automaticamente se a data já passou
- Se a data já passou e o countdown está ativo, o site ficará bloqueado até você desativar manualmente
- Recomenda-se desativar o countdown após o lançamento para evitar problemas


