'use client'

import { useEffect, useState } from 'react'
import { format, subDays } from 'date-fns'
import { ArrowDown, ArrowUp, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getDashboardMetrics, getAcquisitionFunnel } from '@/app/actions/dashboard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any>(null)
  const [funnel, setFunnel] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const dateTo = new Date()
        const dateFrom = subDays(dateTo, 30)

        const [metricsData, funnelData] = await Promise.all([
          getDashboardMetrics(dateFrom, dateTo),
          getAcquisitionFunnel(dateFrom, dateTo),
        ])

        setMetrics(metricsData)
        setFunnel(funnelData)
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    )
  }

  const kpis = [
    {
      label: 'Total Spend',
      value: `KES ${(metrics?.metrics.totalSpend || 0).toLocaleString()}`,
      change: 12.5,
      icon: '💰',
    },
    {
      label: 'First-Time Depositors',
      value: metrics?.metrics.ftds?.toLocaleString() || '0',
      change: 18.4,
      icon: '👥',
    },
    {
      label: 'Cost per FTD',
      value: `KES ${(metrics?.metrics.costPerFTD || 0).toFixed(0)}`,
      change: -12.8,
      icon: '📊',
    },
    {
      label: 'Total Deposit Value',
      value: `KES ${(metrics?.metrics.totalDepositValue || 0).toLocaleString()}`,
      change: 8.2,
      icon: '💵',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Growth Intelligence Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Last 30 days performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{kpi.icon}</span>
              <div className={cn('flex items-center gap-1 text-sm font-medium', kpi.change >= 0 ? 'text-green-500' : 'text-red-500')}>
                {kpi.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                {Math.abs(kpi.change)}%
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-2">{kpi.label}</p>
            <p className="text-2xl font-semibold text-foreground">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Funnel Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Acquisition Funnel
          </h2>
          {funnel?.stages && (
            <div className="space-y-3">
              {funnel.stages.map((stage: any, idx: number) => {
                const maxValue = Math.max(...funnel.stages.map((s: any) => s.value))
                const percentage = (stage.value / maxValue) * 100

                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{stage.name}</span>
                      <div className="text-sm text-muted-foreground">
                        {stage.value.toLocaleString()} {stage.dropoff > 0 && `(-${stage.dropoff}%)`}
                      </div>
                    </div>
                    <div className="w-full bg-sidebar-accent/30 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-accent h-full rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Channel Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Channel Distribution
          </h2>
          <div className="space-y-3">
            {metrics?.sources?.slice(0, 5).map((source: any) => (
              <div key={source.id} className="flex items-center justify-between p-2 rounded hover:bg-sidebar-accent/20">
                <span className="text-sm font-medium text-foreground">{source.sourceName}</span>
                <span className="text-sm text-accent font-semibold">{source.sourceType}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total Clicks</p>
          <p className="text-2xl font-semibold text-foreground">{metrics?.metrics.clicks?.toLocaleString() || '0'}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total Registrations</p>
          <p className="text-2xl font-semibold text-foreground">{metrics?.metrics.registrations?.toLocaleString() || '0'}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Verified Users</p>
          <p className="text-2xl font-semibold text-foreground">{metrics?.metrics.verifiedUsers?.toLocaleString() || '0'}</p>
        </div>
      </div>
    </div>
  )
}
