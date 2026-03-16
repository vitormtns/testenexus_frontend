import type { UserStatus } from '../../types'
import { cn } from '../../lib/cn'

type BadgeTone = UserStatus | 'DEPOSIT' | 'WITHDRAW'

const badgeToneMap: Record<BadgeTone, string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  PENDING: 'bg-amber-50 text-amber-700 ring-amber-100',
  BLOCKED: 'bg-red-50 text-red-700 ring-red-100',
  DEPOSIT: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  WITHDRAW: 'bg-rose-50 text-rose-700 ring-rose-100',
}

export function Badge({ label, tone }: { label: string; tone: BadgeTone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1',
        badgeToneMap[tone],
      )}
    >
      {label}
    </span>
  )
}
