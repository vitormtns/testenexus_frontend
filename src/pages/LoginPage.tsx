import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { useAppState } from '../hooks/useAppState'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAppState()
  const [email, setEmail] = useState('admin@nexus.com')
  const [password, setPassword] = useState('123456')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true })
    }
  }, [isAuthenticated, navigate])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: { email?: string; password?: string } = {}

    if (!emailRegex.test(email)) {
      nextErrors.email = 'Informe um e-mail válido.'
    }

    if (password.trim().length < 6) {
      nextErrors.password = 'A senha deve ter pelo menos 6 caracteres.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    login(email, password)
    navigate('/home')
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-10">
      <div className="absolute inset-0 bg-hero-glow opacity-90" />
      <div className="relative mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl items-center gap-6 lg:grid-cols-[1.05fr_minmax(420px,480px)]">
        <div className="hidden rounded-[36px] border border-white/70 bg-white/75 p-8 shadow-panel backdrop-blur-xl lg:block xl:p-12">
          <img
            src="/sidebar-brand-mark.png"
            alt="Nexus"
            className="size-20 rounded-[28px] object-cover shadow-float"
          />
          <div className="mt-10 max-w-xl space-y-5">
            <span className="inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">
              Nexus fintech suite
            </span>
            <h1 className="font-display text-5xl font-semibold leading-tight text-slate-950">
              Um dashboard claro, premium e pronto para operações com cripto.
            </h1>
            <p className="text-base leading-7 text-slate-500">
              Controle usuários, saldos, depósitos, saques e conversões com uma interface de produto
              real, desenhada para uso interno e leitura rápida.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { icon: TrendingUp, title: 'Indicadores vivos', text: 'Resumo financeiro com leitura imediata.' },
              { icon: ShieldCheck, title: 'Fluxos validados', text: 'Depósitos e saques com verificação em memória.' },
              { icon: ArrowRight, title: 'Mobile pensado', text: 'Navegação touch otimizada sem improviso.' },
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] bg-white p-5 shadow-panel">
                <div className="mb-4 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-600">
                  <item.icon className="size-5" />
                </div>
                <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="mx-auto w-full max-w-xl p-6 sm:p-8">
          <div className="mb-8 space-y-3 text-center sm:text-left">
            <span className="inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
              Acesso interno
            </span>
            <div>
              <h2 className="font-display text-3xl font-semibold text-slate-950">Entrar na plataforma</h2>
              <p className="mt-2 text-sm text-slate-500">
                Use qualquer e-mail válido e uma senha com no mínimo 6 caracteres.
              </p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <Input
                error={errors.email}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@nexus.com"
                type="email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Senha</label>
              <Input
                error={errors.password}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite sua senha"
                type="password"
              />
            </div>

            <Button fullWidth type="submit">
              Entrar
              <ArrowRight className="size-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
