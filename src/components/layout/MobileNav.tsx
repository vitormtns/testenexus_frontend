import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { navigationItems } from './navigation'

export function MobileNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/70 bg-white/95 px-3 pb-3 pt-2 backdrop-blur-xl lg:hidden">
      <nav className="grid grid-cols-5 gap-2">
        {navigationItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[11px] font-semibold transition',
                  isActive ? 'bg-brand-500 text-white shadow-float' : 'text-slate-500 hover:bg-slate-100',
                )
              }
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
