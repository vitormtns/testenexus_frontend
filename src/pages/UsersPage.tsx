import { useMemo, useState } from 'react'
import { Search, Users } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { Input } from '../components/ui/Input'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Select } from '../components/ui/Select'
import { useAppState } from '../hooks/useAppState'
import { formatDate } from '../lib/formatters'
import type { UserStatus } from '../types'

const pageSize = 5

export function UsersPage() {
  const { users } = useAppState()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'ALL' | UserStatus>('ALL')
  const [page, setPage] = useState(1)

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return users.filter((user) => {
      const matchesStatus = status === 'ALL' || user.status === status
      const matchesQuery =
        normalizedQuery.length === 0 ||
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery)

      return matchesStatus && matchesQuery
    })
  }, [query, status, users])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paginatedUsers = filteredUsers.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Usuários"
        title="Base de clientes com filtros claros"
        description="Busque por nome ou e-mail, filtre por status e navegue por uma tabela pensada para leitura confortável em qualquer tamanho de tela."
      />

      <Card className="p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-11"
              placeholder="Buscar por nome ou e-mail"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
              }}
            />
          </div>
          <Select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as 'ALL' | UserStatus)
              setPage(1)
            }}
          >
            <option value="ALL">Todos os status</option>
            <option value="ACTIVE">Ativo</option>
            <option value="PENDING">Pendente</option>
            <option value="BLOCKED">Bloqueado</option>
          </Select>
        </div>
      </Card>

      {paginatedUsers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nenhum usuário encontrado"
          description="Ajuste os filtros para visualizar outros perfis."
        />
      ) : (
        <>
          <Card className="hidden overflow-hidden lg:block">
            <div className="grid grid-cols-[1.3fr_1.2fr_0.8fr_0.9fr_0.9fr] gap-4 border-b border-border px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              <span>Nome</span>
              <span>Email</span>
              <span>Status</span>
              <span>Criado em</span>
              <span>Última atividade</span>
            </div>
            <div className="divide-y divide-border">
              {paginatedUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[1.3fr_1.2fr_0.8fr_0.9fr_0.9fr] gap-4 px-6 py-5 text-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-950">{user.name}</p>
                    <p className="mt-1 text-slate-400">ID {user.id}</p>
                  </div>
                  <p className="text-slate-600">{user.email}</p>
                  <div>
                    <Badge
                      tone={user.status}
                      label={
                        user.status === 'ACTIVE'
                          ? 'Ativo'
                          : user.status === 'PENDING'
                            ? 'Pendente'
                            : 'Bloqueado'
                      }
                    />
                  </div>
                  <p className="text-slate-600">{formatDate(user.createdAt)}</p>
                  <p className="text-slate-600">{formatDate(user.lastActivity)}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-4 lg:hidden">
            {paginatedUsers.map((user) => (
              <Card key={user.id} className="p-5">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">{user.name}</h3>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                    <Badge
                      tone={user.status}
                      label={
                        user.status === 'ACTIVE'
                          ? 'Ativo'
                          : user.status === 'PENDING'
                            ? 'Pendente'
                            : 'Bloqueado'
                      }
                    />
                  </div>
                  <div className="grid gap-3 rounded-[24px] bg-slate-50 p-4 text-sm text-slate-600">
                    <div className="flex items-center justify-between gap-3">
                      <span>Criado em</span>
                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Última atividade</span>
                      <span>{formatDate(user.lastActivity)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Página {safePage} de {totalPages}
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                disabled={safePage === 1}
                onClick={() => setPage((current) => Math.max(current - 1, 1))}
              >
                Anterior
              </Button>
              <Button
                variant="secondary"
                disabled={safePage === totalPages}
                onClick={() => setPage((current) => Math.min(current + 1, totalPages))}
              >
                Próxima
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
