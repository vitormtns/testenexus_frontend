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
      <div className="relative overflow-hidden rounded-2xl">
        <select
          ref={ref}
          className={cn(
            'min-h-12 w-full appearance-none rounded-2xl border bg-white px-4 py-3 pr-12 text-base text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 sm:text-sm',
            error ? 'border-red-300 focus:ring-red-100' : 'border-border focus:ring-brand-100',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-1 right-1 flex w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
          <ChevronDown className="size-4" />
        </div>
      </div>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  )
})
