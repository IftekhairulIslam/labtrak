import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="min-h-screen flex-1 pt-14 md:pt-6">
        <Outlet />
      </main>
    </div>
  )
}
