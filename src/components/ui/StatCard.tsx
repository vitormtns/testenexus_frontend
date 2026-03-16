import type { LucideIcon } from 'lucide-react'
import { Card } from './Card'

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
}

export function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden p-5">
      <div className="absolute inset-x-5 top-0 h-1 rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700" />
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div>
            <h3 className="font-display text-2xl font-semibold text-slate-950">{value}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
        </div>
        <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
          <Icon className="size-5" />
        </div>
      </div>
    </Card>
  )
}
