import { MovementForm } from '../components/ui/MovementForm'
import { SectionTitle } from '../components/ui/SectionTitle'
import { useAppState } from '../hooks/useAppState'

export function WithdrawPage() {
  const { createWithdraw, users } = useAppState()

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Saque"
        title="Saídas validadas com controle de saldo"
        description="O fluxo bloqueia saques sem saldo suficiente e mantém o histórico consistente para consulta nas demais telas."
      />

      <MovementForm mode="withdraw" onSubmit={createWithdraw} users={users} />
    </div>
  )
}
