import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

const DESKTOP_BREAKPOINT = 768

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT
  )

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    const handler = () => {
      const desktop = mq.matches
      setIsDesktop(desktop)
      if (!desktop) setMobileOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-sky-100 text-sky-800'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    } ${collapsed && isDesktop ? 'justify-center px-2' : ''}`

  const linkContent = (
    <>
      <NavLink to="/" className={navLinkClass} end onClick={() => !isDesktop && setMobileOpen(false)} title="Pre-entry test codes">
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        {(!collapsed || !isDesktop) && <span className="truncate">Pre-entry test codes</span>}
      </NavLink>
      <NavLink
        to="/pre-entry-practice"
        className={navLinkClass}
        onClick={() => !isDesktop && setMobileOpen(false)}
        title="Pre Entry Practice"
      >
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
        {(!collapsed || !isDesktop) && <span className="truncate">Pre Entry Practice</span>}
      </NavLink>
    </>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white shadow-lg md:hidden"
        aria-label="Toggle menu"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {!isDesktop && mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-40 flex h-full flex-col border-r border-slate-200 bg-white shadow-lg
          transition-[width] duration-200 ease-out
          ${isDesktop ? (collapsed ? 'w-18' : 'w-56') : (mobileOpen ? 'w-56' : '-translate-x-full')}
        `}
      >
        <div className="flex h-14 shrink-0 items-center border-b border-slate-200 px-3">
          {isDesktop && !collapsed && (
            <span className="truncate text-sm font-semibold text-slate-800">LabTrak</span>
          )}
          {isDesktop && (
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                className={`h-5 w-5 transition-transform ${collapsed ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
          {linkContent}
        </nav>
      </aside>

      {/* Desktop: spacer so content doesn't go under sidebar */}
      {isDesktop && <div className={collapsed ? 'w-18' : 'w-56'} aria-hidden />}
    </>
  )
}
