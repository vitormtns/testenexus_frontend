import { LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAppState } from '../../hooks/useAppState'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { navigationItems } from './navigation'

export function Sidebar() {
  const { logout } = useAppState()

  return (
    <aside className="sticky top-0 hidden h-screen w-[280px] flex-col justify-between border-r border-white/70 bg-white/80 px-6 py-8 backdrop-blur-xl lg:flex">
      <div className="space-y-10">
        <div className="rounded-[28px] bg-hero-glow p-6 shadow-panel">
          <img
            src="/sidebar-brand-mark.png"
            alt="Nexus"
            className="size-16 rounded-3xl object-cover shadow-float"
          />
          <div className="mt-4 space-y-2">
            <h2 className="font-display text-xl font-semibold leading-tight text-slate-950">Crypto Control</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Operações, usuários e conversões em uma experiência clara e profissional.
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition',
                    isActive
                      ? 'bg-brand-500 text-white shadow-float'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                  )
                }
              >
                <Icon className="size-5" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      </div>

      <Button className="justify-start" variant="secondary" onClick={logout}>
        <LogOut className="size-4" />
        Sair
      </Button>
    </aside>
  )
}
