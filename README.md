# Nexus Crypto Control

Mini dashboard financeiro com foco em criptoativos, desenvolvido como parte de um teste técnico de front-end. O projeto simula uma plataforma interna de operações financeiras, com atenção à organização do código, consistência visual e experiência responsiva.

## Tech Stack

- React
- Vite
- TypeScript
- TailwindCSS
- React Router DOM
- Context API
- Lucide React

## Features

- Login com validação simples e redirecionamento para o dashboard
- Home com indicadores financeiros, últimas movimentações e saldos por ativo
- Tela de usuários com busca, filtro por status e paginação client-side
- Depósito com atualização de saldo e registro de movimentação em memória
- Saque com validação de saldo suficiente e registro da operação
- Conversão entre BRL, BTC, ETH e USDT com API real da CoinGecko
- Estados de loading, erro e feedback visual nas principais interações
- Layout responsivo com navegação mobile e espaçamento otimizado

## Project Structure

```text
src/
  components/   # Componentes reutilizáveis de UI e layout
  context/      # Estado global em memória com Context API
  hooks/        # Hooks auxiliares
  lib/          # Utilitários e constantes
  mocks/        # Dados locais mockados
  pages/        # Páginas principais da aplicação
  types/        # Tipagens compartilhadas
```

## Running Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## API Usage

Apenas a página **Conversão** utiliza API real, consumindo cotações da **CoinGecko**.

Todas as demais telas utilizam **mocks locais** armazenados em `src/mocks`, sem uso de backend ou banco de dados.

## Deployment

Vercel: `https://testenexus-frontend.vercel.app`

## Notes

Este projeto foi desenvolvido para um teste técnico e prioriza:

- organização e escalabilidade da base
- consistência visual da interface
- responsividade real para desktop e mobile
- separação clara entre dados mockados e integração externa
