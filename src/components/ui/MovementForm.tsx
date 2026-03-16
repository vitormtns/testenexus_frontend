import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowDownToLine, ArrowUpToLine, Wallet } from 'lucide-react'
import { assets, assetLabels } from '../../lib/constants'
import { formatCurrencyBRL, formatCrypto } from '../../lib/formatters'
import type { AssetSymbol, User } from '../../types'
import { Button } from './Button'
import { Card } from './Card'
import { Input } from './Input'
import { Select } from './Select'

interface MovementFormProps {
  mode: 'deposit' | 'withdraw'
  users: User[]
  onSubmit: (data: { userId: string; asset: (typeof assets)[number]; amount: number; note?: string }) => {
    success: boolean
    message: string
  }
}

const modeContent = {
  deposit: {
    title: 'Registrar deposito',
    description: 'Aumente o saldo do usuário com um fluxo simples e validado em memória.',
    icon: ArrowDownToLine,
    button: 'Confirmar depósito',
  },
  withdraw: {
    title: 'Registrar saque',
    description: 'Valide saldo disponível e registre a retirada sem depender de backend.',
    icon: ArrowUpToLine,
    button: 'Confirmar saque',
  },
}

export function MovementForm({ mode, users, onSubmit }: MovementFormProps) {
  const [formData, setFormData] = useState<{
    userId: string
    asset: AssetSymbol
    amount: string
    note: string
  }>({ userId: '', asset: 'BRL', amount: '', note: '' })
  const [formError, setFormError] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const selectedUser = useMemo(
    () => users.find((user) => user.id === formData.userId),
    [formData.userId, users],
  )

  const availableBalance = selectedUser?.balances[formData.asset] ?? 0
  const currentMode = modeContent[mode]
  const Icon = currentMode.icon

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')
    setFeedback(null)

    const amount = Number(formData.amount)

    if (!formData.userId) {
      setFormError('Selecione um usuário.')
      return
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError('Informe um valor válido.')
      return
    }

    const result = onSubmit({
      userId: formData.userId,
      asset: formData.asset,
      amount,
      note: formData.note.trim() || undefined,
    })

    setFeedback({ type: result.success ? 'success' : 'error', message: result.message })

    if (result.success) {
      setFormData({ userId: '', asset: 'BRL', amount: '', note: '' })
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_360px]">
      <Card className="p-6 sm:p-8">
        <div className="mb-8 flex items-start gap-4">
          <div className="rounded-3xl bg-brand-50 p-4 text-brand-600">
            <Icon className="size-6" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-slate-950">{currentMode.title}</h2>
            <p className="text-sm text-slate-500">{currentMode.description}</p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Usuário</label>
            <Select
              value={formData.userId}
              onChange={(event) => setFormData((current) => ({ ...current, userId: event.target.value }))}
            >
              <option value="">Selecione um usuário</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Ativo</label>
              <Select
                value={formData.asset}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    asset: event.target.value as AssetSymbol,
                  }))
                }
              >
                {assets.map((asset) => (
                  <option key={asset} value={asset}>
                    {asset} - {assetLabels[asset]}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Valor</label>
              <Input
                min="0"
                step="0.000001"
                type="number"
                value={formData.amount}
                onChange={(event) => setFormData((current) => ({ ...current, amount: event.target.value }))}
                placeholder="0,00"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Observação</label>
            <Input
              value={formData.note}
              onChange={(event) => setFormData((current) => ({ ...current, note: event.target.value }))}
              placeholder="Opcional"
            />
          </div>

          {formError ? <p className="text-sm font-medium text-red-500">{formError}</p> : null}

          {feedback ? (
            <div
              className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {feedback.message}
            </div>
          ) : null}

          <Button type="submit">{currentMode.button}</Button>
        </form>
      </Card>

      <Card className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
            <Wallet className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-950">Saldo atual</h3>
            <p className="text-sm text-slate-500">Consulte o saldo antes de confirmar a movimentação.</p>
          </div>
        </div>

        {selectedUser ? (
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Titular selecionado</p>
              <h4 className="mt-1 text-lg font-semibold text-slate-950">{selectedUser.name}</h4>
              <p className="text-sm text-slate-500">{selectedUser.email}</p>
            </div>

            <div className="grid gap-3">
              {assets.map((asset) => (
                <div
                  key={asset}
                  className={`rounded-2xl border px-4 py-3 ${
                    asset === formData.asset ? 'border-brand-200 bg-brand-50/60' : 'border-border bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-700">{asset}</span>
                    <span className="text-sm font-semibold text-slate-950">
                      {asset === 'BRL'
                        ? formatCurrencyBRL(selectedUser.balances[asset])
                        : formatCrypto(selectedUser.balances[asset], asset)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {mode === 'withdraw' ? (
              <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
                Saldo disponível para {formData.asset}:{' '}
                {formData.asset === 'BRL'
                  ? formatCurrencyBRL(availableBalance)
                  : formatCrypto(availableBalance, formData.asset as 'BTC' | 'ETH' | 'USDT')}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-slate-50 p-5 text-sm text-slate-500">
            Selecione um usuário para visualizar os saldos por ativo.
          </div>
        )}
      </Card>
    </div>
  )
}
