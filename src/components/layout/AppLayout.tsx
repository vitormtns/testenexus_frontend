import type { ReactNode } from 'react'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar />
          <main className="flex-1 px-4 pb-28 pt-4 sm:px-6 lg:px-10 lg:pb-10">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  )
}
