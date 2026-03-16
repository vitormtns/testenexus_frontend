export type AssetSymbol = 'BRL' | 'BTC' | 'ETH' | 'USDT'

export type UserStatus = 'ACTIVE' | 'PENDING' | 'BLOCKED'

export type MovementType = 'DEPOSIT' | 'WITHDRAW'

export type Balances = Record<AssetSymbol, number>

export interface User {
  id: string
  name: string
  email: string
  status: UserStatus
  createdAt: string
  lastActivity: string
  balances: Balances
}

export interface Movement {
  id: string
  userId: string
  asset: AssetSymbol
  type: MovementType
  amount: number
  createdAt: string
  note?: string
}

export interface AppContextValue {
  isAuthenticated: boolean
  users: User[]
  movements: Movement[]
  login: (email: string, password: string) => void
  logout: () => void
  createDeposit: (input: MovementInput) => ActionResult
  createWithdraw: (input: MovementInput) => ActionResult
}

export interface MovementInput {
  userId: string
  asset: AssetSymbol
  amount: number
  note?: string
}

export interface ActionResult {
  success: boolean
  message: string
}
