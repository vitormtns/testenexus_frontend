import type { AssetSymbol } from '../types'

export const assets: AssetSymbol[] = ['BRL', 'BTC', 'ETH', 'USDT']

export const assetLabels: Record<AssetSymbol, string> = {
  BRL: 'Real brasileiro',
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  USDT: 'Tether',
}

export const assetToBrlRate: Record<AssetSymbol, number> = {
  BRL: 1,
  BTC: 420000,
  ETH: 21000,
  USDT: 5.05,
}
