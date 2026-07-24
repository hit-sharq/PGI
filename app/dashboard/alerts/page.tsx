'use client'

import { useEffect, useState } from 'react'
import { subDays } from 'date-fns'
import { getAlerts } from '@/app/actions/analytics'

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const dateTo = new Date()
        const dateFrom = subDays(dateTo, 30)
        const data = await getAlerts(dateFrom, dateTo)
        setAlerts(data)
      } catch (error) {
        console.error('Error loading alerts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="text-muted-foreground">Loading alerts...</div>
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/30'
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30'
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30'
      default:
        return 'bg-gray-500/10 border-gray-500/30'
    }
  }

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/30 text-red-400'
      case 'warning':
        return 'bg-yellow-500/30 text-yellow-400'
      case 'info':
        return 'bg-blue-500/30 text-blue-400'
      default:
        return 'bg-gray-500/30 text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Alerts & Notifications
        </h1>
        <p className="text-muted-foreground mt-1">Performance anomalies and tracking issues</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Critical Alerts</p>
          <p className="text-2xl font-semibold text-red-400">{alerts.filter(a => a.severity === 'critical').length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Warning Alerts</p>
          <p className="text-2xl font-semibold text-yellow-400">{alerts.filter(a => a.severity === 'warning').length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Informational</p>
          <p className="text-2xl font-semibold text-blue-400">{alerts.filter(a => a.severity === 'info').length}</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No alerts at this time. Your campaigns are performing well!</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{alert.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityBadgeColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  {alert.campaign && <p className="text-xs text-muted-foreground mt-1">Campaign: {alert.campaign}</p>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {alert.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
