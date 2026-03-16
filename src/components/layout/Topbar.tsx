import { Bell, CalendarRange } from 'lucide-react'
import { formatDate } from '../../lib/formatters'

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-[#f6f7fb]/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Painel interno Nexus</p>
          <h1 className="font-display text-xl font-semibold text-slate-950">Operação financeira em tempo real</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-white/80 bg-white px-4 py-3 text-sm text-slate-500 shadow-panel sm:flex">
            <CalendarRange className="size-4 text-brand-500" />
            {formatDate(new Date().toISOString())}
          </div>
          <button className="rounded-2xl border border-white/80 bg-white p-3 text-slate-500 shadow-panel transition hover:text-slate-900">
            <Bell className="size-5" />
          </button>
          <div className="hidden size-9 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600 shadow-panel sm:flex">
            VM
          </div>
        </div>
      </div>
    </header>
  )
}
