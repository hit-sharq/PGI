'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Zap,
  Settings,
  Bell,
  FileText,
  Plug,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigationItems = [
  { name: 'Overview', href: '/dashboard', icon: BarChart3 },
  { name: 'Acquisition Funnel', href: '/dashboard/funnel', icon: TrendingUp },
  { name: 'Channels', href: '/dashboard/channels', icon: Users },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: Target },
  { name: 'FTD Attribution', href: '/dashboard/attribution', icon: Zap },
  { name: 'Conversion Audit', href: '/dashboard/audit', icon: FileText },
  { name: 'SEO Performance', href: '/dashboard/seo', icon: TrendingUp },
  { name: 'Landing Pages', href: '/dashboard/pages', icon: Users },
  { name: 'Partners', href: '/dashboard/partners', icon: Users },
  { name: 'Budget Optimization', href: '/dashboard/budget', icon: TrendingUp },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Integrations', href: '/dashboard/integrations', icon: Plug },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = async () => {
    await fetch('/api/auth/sign-out', { method: 'POST' })
    window.location.href = '/sign-in'
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-border p-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-accent" />
              <div>
                <h1 className="text-lg font-semibold text-accent" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Pakakumi
                </h1>
                <p className="text-xs text-muted-foreground">Growth Intelligence</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-foreground hover:text-accent"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="text-sm text-muted-foreground">Analytics Dashboard</div>
            <div className="h-8 w-8 rounded-full bg-accent/20" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
