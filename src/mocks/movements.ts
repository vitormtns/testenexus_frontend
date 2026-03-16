import type { Movement } from '../types'

const rawMovements: Array<
  Pick<Movement, 'userId' | 'asset' | 'type' | 'amount' | 'createdAt' | 'note'>
> = [
  { userId: 'usr_001', asset: 'BRL', type: 'DEPOSIT', amount: 80000, createdAt: '2026-03-01T10:00:00.000Z', note: 'TED institucional' },
  { userId: 'usr_004', asset: 'BTC', type: 'DEPOSIT', amount: 0.12, createdAt: '2026-03-02T11:15:00.000Z', note: 'Transferencia cold wallet' },
  { userId: 'usr_002', asset: 'USDT', type: 'WITHDRAW', amount: 500, createdAt: '2026-03-02T14:30:00.000Z' },
  { userId: 'usr_003', asset: 'BRL', type: 'DEPOSIT', amount: 12000, createdAt: '2026-03-03T09:20:00.000Z' },
  { userId: 'usr_006', asset: 'ETH', type: 'DEPOSIT', amount: 0.8, createdAt: '2026-03-03T16:40:00.000Z' },
  { userId: 'usr_008', asset: 'BRL', type: 'WITHDRAW', amount: 18000, createdAt: '2026-03-04T12:10:00.000Z' },
  { userId: 'usr_010', asset: 'BTC', type: 'DEPOSIT', amount: 0.05, createdAt: '2026-03-04T15:35:00.000Z' },
  { userId: 'usr_001', asset: 'USDT', type: 'DEPOSIT', amount: 900, createdAt: '2026-03-05T08:25:00.000Z' },
  { userId: 'usr_007', asset: 'BRL', type: 'DEPOSIT', amount: 7000, createdAt: '2026-03-05T14:55:00.000Z' },
  { userId: 'usr_005', asset: 'BRL', type: 'WITHDRAW', amount: 1500, createdAt: '2026-03-06T10:45:00.000Z' },
  { userId: 'usr_004', asset: 'ETH', type: 'WITHDRAW', amount: 1.2, createdAt: '2026-03-06T18:05:00.000Z' },
  { userId: 'usr_002', asset: 'BRL', type: 'DEPOSIT', amount: 34000, createdAt: '2026-03-07T11:50:00.000Z' },
  { userId: 'usr_009', asset: 'USDT', type: 'DEPOSIT', amount: 350, createdAt: '2026-03-07T17:32:00.000Z' },
  { userId: 'usr_006', asset: 'BRL', type: 'WITHDRAW', amount: 8000, createdAt: '2026-03-08T09:30:00.000Z' },
  { userId: 'usr_008', asset: 'BTC', type: 'DEPOSIT', amount: 0.06, createdAt: '2026-03-08T13:12:00.000Z' },
  { userId: 'usr_003', asset: 'USDT', type: 'DEPOSIT', amount: 220, createdAt: '2026-03-09T10:05:00.000Z' },
  { userId: 'usr_010', asset: 'BRL', type: 'WITHDRAW', amount: 22000, createdAt: '2026-03-09T15:15:00.000Z' },
  { userId: 'usr_001', asset: 'ETH', type: 'DEPOSIT', amount: 0.45, createdAt: '2026-03-10T12:00:00.000Z' },
  { userId: 'usr_004', asset: 'USDT', type: 'DEPOSIT', amount: 2500, createdAt: '2026-03-10T16:20:00.000Z' },
  { userId: 'usr_006', asset: 'USDT', type: 'WITHDRAW', amount: 300, createdAt: '2026-03-11T09:12:00.000Z' },
  { userId: 'usr_008', asset: 'BRL', type: 'DEPOSIT', amount: 42000, createdAt: '2026-03-11T11:08:00.000Z' },
  { userId: 'usr_002', asset: 'ETH', type: 'DEPOSIT', amount: 0.25, createdAt: '2026-03-11T17:55:00.000Z' },
  { userId: 'usr_007', asset: 'USDT', type: 'WITHDRAW', amount: 120, createdAt: '2026-03-12T10:50:00.000Z' },
  { userId: 'usr_009', asset: 'BRL', type: 'DEPOSIT', amount: 2800, createdAt: '2026-03-12T14:22:00.000Z' },
  { userId: 'usr_003', asset: 'BTC', type: 'DEPOSIT', amount: 0.01, createdAt: '2026-03-13T08:40:00.000Z' },
  { userId: 'usr_005', asset: 'USDT', type: 'WITHDRAW', amount: 30, createdAt: '2026-03-13T16:31:00.000Z' },
  { userId: 'usr_010', asset: 'USDT', type: 'DEPOSIT', amount: 1800, createdAt: '2026-03-14T11:15:00.000Z' },
  { userId: 'usr_004', asset: 'BRL', type: 'DEPOSIT', amount: 65000, createdAt: '2026-03-14T18:42:00.000Z' },
  { userId: 'usr_001', asset: 'BRL', type: 'WITHDRAW', amount: 12000, createdAt: '2026-03-15T09:14:00.000Z' },
  { userId: 'usr_006', asset: 'BTC', type: 'DEPOSIT', amount: 0.03, createdAt: '2026-03-15T12:10:00.000Z' },
  { userId: 'usr_008', asset: 'ETH', type: 'WITHDRAW', amount: 0.4, createdAt: '2026-03-15T14:56:00.000Z' },
  { userId: 'usr_010', asset: 'BRL', type: 'DEPOSIT', amount: 27000, createdAt: '2026-03-16T09:05:00.000Z' },
]

export const initialMovements: Movement[] = rawMovements.map((movement, index) => ({
  id: `mov_${String(index + 1).padStart(3, '0')}`,
  ...movement,
}))
