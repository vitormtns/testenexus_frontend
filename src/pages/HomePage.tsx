import { ArrowDownCircle, ArrowUpCircle, Coins, UsersRound, WalletCards } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { SectionTitle } from '../components/ui/SectionTitle'
import { StatCard } from '../components/ui/StatCard'
import { useAppState } from '../hooks/useAppState'
import { assetToBrlRate, assets } from '../lib/constants'
import { formatCurrencyBRL, formatCrypto, formatDate } from '../lib/formatters'

export function HomePage() {
  const { movements, users } = useAppState()

  const now = new Date()
  const monthMovements = movements.filter((movement) => {
    const date = new Date(movement.createdAt)
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  })

  const monthlyDeposits = monthMovements
    .filter((movement) => movement.type === 'DEPOSIT')
    .reduce((total, movement) => total + movement.amount * assetToBrlRate[movement.asset], 0)

  const monthlyWithdraws = monthMovements
    .filter((movement) => movement.type === 'WITHDRAW')
    .reduce((total, movement) => total + movement.amount * assetToBrlRate[movement.asset], 0)

  const activeUsers = users.filter((user) => user.status === 'ACTIVE').length

  const totalVolumeBrl = users.reduce(
    (total, user) =>
      total +
      assets.reduce(
        (assetTotal, asset) => assetTotal + user.balances[asset] * assetToBrlRate[asset],
        0,
      ),
    0,
  )

  const recentMovements = [...movements]
    .sort((first, second) => +new Date(second.createdAt) - +new Date(first.createdAt))
    .slice(0, 8)

  const aggregatedBalances = assets.reduce(
    (totals, asset) => ({
      ...totals,
      [asset]: users.reduce((sum, user) => sum + user.balances[asset], 0),
    }),
    { BRL: 0, BTC: 0, ETH: 0, USDT: 0 },
  )

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Visão geral"
        title="Controle financeiro com leitura imediata"
        description="Resumo de operações, saldos agregados e movimentações recentes para acompanhar a plataforma com contexto e clareza."
      />

      <div className="grid gap-x-4 gap-y-6 md:gap-y-4 xl:grid-cols-4 md:grid-cols-2">
        <StatCard
          title="Total depositado no mês"
          value={formatCurrencyBRL(monthlyDeposits)}
          description="Soma em BRL com base nas movimentações do período."
          icon={ArrowDownCircle}
        />
        <StatCard
          title="Total sacado no mês"
          value={formatCurrencyBRL(monthlyWithdraws)}
          description="Saques convertidos para BRL usando taxas mockadas."
          icon={ArrowUpCircle}
        />
        <StatCard
          title="Usuários ativos"
          value={String(activeUsers)}
          description="Perfis aptos a operar no ecossistema Nexus."
          icon={UsersRound}
        />
        <StatCard
          title="Volume total em BRL"
          value={formatCurrencyBRL(totalVolumeBrl)}
          description="Saldos consolidados de todos os ativos em carteira."
          icon={WalletCards}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_380px]">
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">Últimas movimentações</h2>
              <p className="mt-1 text-sm text-slate-500">Acompanhe os fluxos mais recentes da operação.</p>
            </div>
          </div>

          <div className="space-y-4">
            {recentMovements.map((movement) => {
              const user = users.find((item) => item.id === movement.userId)

              return (
                <div
                  key={movement.id}
                  className="flex flex-col gap-4 rounded-[24px] border border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-slate-950">{user?.name ?? 'Usuário'}</p>
                      <Badge
                        label={movement.type === 'DEPOSIT' ? 'Depósito' : 'Saque'}
                        tone={movement.type}
                      />
                    </div>
                    <p className="text-sm text-slate-500">{movement.note ?? 'Movimentação operacional'}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:min-w-[210px] sm:justify-end">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-950">
                        {movement.asset === 'BRL'
                          ? formatCurrencyBRL(movement.amount)
                          : formatCrypto(movement.amount, movement.asset)}
                      </p>
                      <p className="text-xs text-slate-400">{formatDate(movement.createdAt)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
              <Coins className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">Saldos agregados</h2>
              <p className="text-sm text-slate-500">Visão consolidada por ativo.</p>
            </div>
          </div>

          <div className="space-y-3">
            {assets.map((asset) => (
              <div key={asset} className="rounded-[24px] bg-slate-50 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{asset}</p>
                    <p className="text-xs text-slate-400">
                      Equivalente em BRL: {formatCurrencyBRL(aggregatedBalances[asset] * assetToBrlRate[asset])}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-950">
                    {asset === 'BRL'
                      ? formatCurrencyBRL(aggregatedBalances[asset])
                      : formatCrypto(aggregatedBalances[asset], asset)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
