import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeftRight, LoaderCircle, RefreshCcw } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Select } from '../components/ui/Select'
import { Input } from '../components/ui/Input'
import { assets } from '../lib/constants'
import { formatCurrencyBRL, formatCrypto } from '../lib/formatters'
import type { AssetSymbol } from '../types'

interface ConversionResult {
  amount: number
  from: AssetSymbol
  to: AssetSymbol
  convertedAmount: number
  rate: number
  fetchedAt: string
}

const coingeckoUrl =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=brl'

export function ConversionPage() {
  const [from, setFrom] = useState<AssetSymbol>('BRL')
  const [to, setTo] = useState<AssetSymbol>('BTC')
  const [amount, setAmount] = useState('1000')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ConversionResult | null>(null)

  const sameAsset = from === to

  const quoteLabel = useMemo(() => `1 ${from} =`, [from])

  async function handleConvert(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const numericAmount = Number(amount)

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Informe um valor de origem válido.')
      return
    }

    if (sameAsset) {
      setResult({
        amount: numericAmount,
        from,
        to,
        convertedAmount: numericAmount,
        rate: 1,
        fetchedAt: new Date().toISOString(),
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch(coingeckoUrl)

      if (!response.ok) {
        throw new Error('Não foi possível consultar a cotação no CoinGecko.')
      }

      const data = (await response.json()) as {
        bitcoin?: { brl?: number }
        ethereum?: { brl?: number }
        tether?: { brl?: number }
      }

      const ratesInBrl: Record<AssetSymbol, number> = {
        BRL: 1,
        BTC: data.bitcoin?.brl ?? 0,
        ETH: data.ethereum?.brl ?? 0,
        USDT: data.tether?.brl ?? 0,
      }

      if (!ratesInBrl.BTC || !ratesInBrl.ETH || !ratesInBrl.USDT) {
        throw new Error('Resposta incompleta da API de cotação.')
      }

      const rate = ratesInBrl[from] / ratesInBrl[to]
      const convertedAmount = numericAmount * rate

      setResult({
        amount: numericAmount,
        from,
        to,
        convertedAmount,
        rate,
        fetchedAt: new Date().toISOString(),
      })
    } catch (requestError) {
      setResult(null)
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Não foi possível converter os ativos agora.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Conversão"
        title="Consulta real de cotação para conversões"
        description="Esta é a única tela que usa API externa. A conversão consulta o CoinGecko somente ao clicar em converter."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_380px]">
        <Card className="p-6 sm:p-8">
          <div className="mb-8 flex items-start gap-4">
            <div className="rounded-3xl bg-brand-50 p-4 text-brand-600">
              <ArrowLeftRight className="size-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-950">Conversão entre ativos</h2>
              <p className="mt-2 text-sm text-slate-500">
                BRL, BTC, ETH e USDT com consulta ao CoinGecko sob demanda.
              </p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleConvert}>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Moeda de origem</label>
                <Select value={from} onChange={(event) => setFrom(event.target.value as AssetSymbol)}>
                  {assets.map((asset) => (
                    <option key={asset} value={asset}>
                      {asset}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Moeda de destino</label>
                <Select value={to} onChange={(event) => setTo(event.target.value as AssetSymbol)}>
                  {assets.map((asset) => (
                    <option key={asset} value={asset}>
                      {asset}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Valor de origem</label>
              <Input
                min="0"
                step="0.000001"
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0,00"
              />
            </div>

            {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}

            <Button disabled={loading} type="submit">
              {loading ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Convertendo
                </>
              ) : (
                <>
                  <RefreshCcw className="size-4" />
                  Converter
                </>
              )}
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <h3 className="font-display text-xl font-semibold text-slate-950">Resultado</h3>
          <p className="mt-2 text-sm text-slate-500">A cotação considera o valor dos ativos em BRL retornado pela API.</p>

          {result ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-[28px] bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white shadow-float">
                <p className="text-sm text-white/80">Valor convertido</p>
                <h4 className="mt-2 font-display text-3xl font-semibold">
                  {result.to === 'BRL'
                    ? formatCurrencyBRL(result.convertedAmount)
                    : formatCrypto(result.convertedAmount, result.to)}
                </h4>
              </div>

              <div className="rounded-[24px] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">{quoteLabel}</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {result.to === 'BRL'
                    ? formatCurrencyBRL(result.rate)
                    : formatCrypto(result.rate, result.to)}
                </p>
              </div>

              <div className="grid gap-3 rounded-[24px] border border-border p-4 text-sm text-slate-600">
                <div className="flex items-center justify-between gap-3">
                  <span>Origem</span>
                  <span className="font-semibold text-slate-950">
                    {result.from === 'BRL'
                      ? formatCurrencyBRL(result.amount)
                      : formatCrypto(result.amount, result.from)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Destino</span>
                  <span className="font-semibold text-slate-950">
                    {result.to === 'BRL'
                      ? formatCurrencyBRL(result.convertedAmount)
                      : formatCrypto(result.convertedAmount, result.to)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Atualizado em</span>
                  <span className="font-semibold text-slate-950">
                    {new Intl.DateTimeFormat('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    }).format(new Date(result.fetchedAt))}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-[28px] border border-dashed border-border bg-slate-50 p-5 text-sm text-slate-500">
              Preencha os campos e clique em converter para buscar a cotação.
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
