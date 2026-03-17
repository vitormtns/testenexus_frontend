# Nexus Crypto Control

🔗 Live Demo: https://testenexus-frontend.vercel.app/

Mini dashboard financeiro com foco em criptoativos, desenvolvido como parte de um teste técnico de front-end.

O projeto simula uma plataforma interna de operações financeiras, com foco em organização de código, consistência visual e experiência responsiva.

---

## Tech Stack

- React
- Vite
- TypeScript
- TailwindCSS
- React Router DOM
- Context API
- Lucide React

---

## Features

- Login com validação simples e redirecionamento para o dashboard
- Dashboard (Home) com:
  - indicadores financeiros
  - últimas movimentações
  - saldos por ativo
- Gestão de usuários com:
  - busca por nome/email
  - filtro por status
  - paginação client-side
- Depósito:
  - atualização de saldo em memória
  - registro de movimentação
- Saque:
  - validação de saldo suficiente
  - controle de erros
- Conversão de moedas (BRL, BTC, ETH, USDT):
  - integração com API da CoinGecko
  - estados de loading e erro
- Layout responsivo:
  - navegação mobile (bottom nav)
  - espaçamento otimizado para leitura

---

## Project Structure

```bash
src/
  components/   # Componentes reutilizáveis de UI e layout
  context/      # Estado global em memória (Context API)
  hooks/        # Hooks auxiliares
  lib/          # Utilitários e constantes
  mocks/        # Dados locais mockados
  pages/        # Páginas principais
  types/        # Tipagens compartilhadas