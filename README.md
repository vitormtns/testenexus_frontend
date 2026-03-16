# Nexus Crypto Control

Mini dashboard front-end para teste tecnico, inspirado na identidade visual da Nexus e focado em uma experiencia de produto real para operacoes financeiras com criptoativos.

## Stack

- React + Vite
- TypeScript
- TailwindCSS
- React Router DOM
- Context API
- Lucide React

## Como rodar

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
```

## Estrutura

```text
src/
  components/
    layout/
    ui/
  context/
  hooks/
  lib/
  mocks/
  pages/
  types/
```

## Telas

- Login
- Home
- Usuarios
- Deposito
- Saque
- Conversao

## Regras de dados

- Apenas a tela `Conversao` usa API real via CoinGecko.
- Todas as demais telas usam mocks locais em `src/mocks`.
- O estado global fica em memoria com `Context API`, incluindo usuarios, movimentacoes e atualizacao de saldo por ativo.

## Observacoes

- Navegacao responsiva com sidebar no desktop e bottom navigation no mobile.
- Deposito e saque atualizam saldos, ultima atividade e historico de movimentacoes.
- Home combina dados mockados com valores calculados a partir do estado atual.
