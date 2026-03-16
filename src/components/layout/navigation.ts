import { ArrowDownToLine, ArrowUpFromLine, BadgeDollarSign, LayoutGrid, Users } from 'lucide-react'

export const navigationItems = [
  { label: 'Home', to: '/home', icon: LayoutGrid },
  { label: 'Usuários', to: '/users', icon: Users },
  { label: 'Depósito', to: '/deposit', icon: ArrowDownToLine },
  { label: 'Saque', to: '/withdraw', icon: ArrowUpFromLine },
  { label: 'Conversão', to: '/conversion', icon: BadgeDollarSign },
]
