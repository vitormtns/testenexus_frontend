import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, error, children, ...props },
  ref,
) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'w-full appearance-none rounded-2xl border bg-white px-4 py-3 pr-11 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-4',
            error ? 'border-red-300 focus:ring-red-100' : 'border-border focus:ring-brand-100',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      </div>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  )
})
