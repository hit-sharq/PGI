'use client'

import { useEffect, useState } from 'react'
import { subDays } from 'date-fns'
import { getAcquisitionFunnel } from '@/app/actions/dashboard'

interface Stage {
  name: string
  value: number
  dropoff: number
}

export default function FunnelPage() {
  const [stages, setStages] = useState<Stage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const dateTo = new Date()
        const dateFrom = subDays(dateTo, 30)
        const data = await getAcquisitionFunnel(dateFrom, dateTo)
        setStages(data.stages)
      } catch (error) {
        console.error('Error loading funnel:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="text-muted-foreground">Loading funnel data...</div>
  }

  const maxValue = Math.max(...stages.map((s) => s.value))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Acquisition Funnel
        </h1>
        <p className="text-muted-foreground mt-1">User journey from traffic to first-time deposit</p>
      </div>

      {/* Funnel Visualization */}
      <div className="space-y-8">
        {stages.map((stage, idx) => {
          const percentage = (stage.value / maxValue) * 100
          const conversionRate = idx > 0 ? ((stage.value / stages[idx - 1].value) * 100).toFixed(1) : 100

          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{stage.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stage.value.toLocaleString()} {idx > 0 && `(${conversionRate}% conversion)`}
                  </p>
                </div>
                <div className="text-right">
                  {stage.dropoff > 0 && (
                    <p className="text-sm text-red-400">
                      Drop-off: -{stage.dropoff}%
                    </p>
                  )}
                </div>
              </div>

              {/* Funnel Bar */}
              <div className="bg-sidebar-accent/30 rounded-lg h-12 overflow-hidden">
                <div
                  className="bg-accent h-full rounded-lg transition-all duration-300 flex items-center justify-center"
                  style={{ width: `${percentage}%` }}
                >
                  <span className="text-sm font-semibold text-primary">
                    {percentage > 10 ? `${percentage.toFixed(0)}%` : ''}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="bg-card border border-border rounded-lg p-6 mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Funnel Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stages.map((stage) => (
            <div key={stage.name}>
              <p className="text-sm text-muted-foreground mb-1">{stage.name}</p>
              <p className="text-2xl font-semibold text-foreground">{stage.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
