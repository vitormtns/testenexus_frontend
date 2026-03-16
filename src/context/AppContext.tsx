import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { initialMovements } from '../mocks/movements'
import { initialUsers } from '../mocks/users'
import type { AppContextValue, Movement, MovementInput, User } from '../types'
import { AppContext } from './app-context'

const AUTH_KEY = 'nexus:is-authenticated'

function updateUserBalances(users: User[], input: MovementInput, modifier: 1 | -1) {
  const now = new Date().toISOString()

  return users.map((user) =>
    user.id === input.userId
      ? {
          ...user,
          balances: {
            ...user.balances,
            [input.asset]: user.balances[input.asset] + input.amount * modifier,
          },
          lastActivity: now,
        }
      : user,
  )
}

function createMovement(input: MovementInput, type: Movement['type']): Movement {
  return {
    id: `mov_${crypto.randomUUID()}`,
    userId: input.userId,
    asset: input.asset,
    type,
    amount: input.amount,
    note: input.note,
    createdAt: new Date().toISOString(),
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState(initialUsers)
  const [movements, setMovements] = useState(initialMovements)
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.sessionStorage.getItem(AUTH_KEY) === 'true',
  )

  const value = useMemo<AppContextValue>(
    () => ({
      isAuthenticated,
      users,
      movements,
      login: () => {
        window.sessionStorage.setItem(AUTH_KEY, 'true')
        setIsAuthenticated(true)
      },
      logout: () => {
        window.sessionStorage.removeItem(AUTH_KEY)
        setIsAuthenticated(false)
      },
      createDeposit: (input) => {
        const user = users.find((item) => item.id === input.userId)

        if (!user) {
          return { success: false, message: 'Usuário não encontrado.' }
        }

        setUsers((currentUsers) => updateUserBalances(currentUsers, input, 1))
        setMovements((currentMovements) => [createMovement(input, 'DEPOSIT'), ...currentMovements])

        return { success: true, message: 'Depósito registrado com sucesso.' }
      },
      createWithdraw: (input) => {
        const user = users.find((item) => item.id === input.userId)

        if (!user) {
          return { success: false, message: 'Usuário não encontrado.' }
        }

        if (user.balances[input.asset] < input.amount) {
          return { success: false, message: 'Saldo insuficiente para concluir o saque.' }
        }

        setUsers((currentUsers) => updateUserBalances(currentUsers, input, -1))
        setMovements((currentMovements) => [createMovement(input, 'WITHDRAW'), ...currentMovements])

        return { success: true, message: 'Saque registrado com sucesso.' }
      },
    }),
    [isAuthenticated, movements, users],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
