import { MovementForm } from '../components/ui/MovementForm'
import { SectionTitle } from '../components/ui/SectionTitle'
import { useAppState } from '../hooks/useAppState'

export function DepositPage() {
  const { createDeposit, users } = useAppState()

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Depósito"
        title="Entrada de recursos com feedback imediato"
        description="Selecione o usuário, escolha o ativo e registre um depósito. O saldo e a última atividade são atualizados em memória."
      />

      <MovementForm mode="deposit" onSubmit={createDeposit} users={users} />
    </div>
  )
}
