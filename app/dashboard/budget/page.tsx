'use client'

import { useEffect, useState } from 'react'
import { subDays } from 'date-fns'
import { getBudgetRecommendations } from '@/app/actions/analytics'

export default function BudgetOptimizationPage() {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const dateTo = new Date()
        const dateFrom = subDays(dateTo, 30)
        const data = await getBudgetRecommendations(dateFrom, dateTo)
        setRecommendations(data)
      } catch (error) {
        console.error('Error loading recommendations:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="text-muted-foreground">Loading recommendations...</div>
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Scale Up':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Maintain':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Optimize':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Investigate':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Reduce':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Pause':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Budget Optimization
        </h1>
        <p className="text-muted-foreground mt-1">AI-driven budget allocation recommendations based on FTD efficiency</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total Allocated Budget</p>
          <p className="text-2xl font-semibold text-foreground">KES {recommendations.reduce((sum: number, r: any) => sum + r.currentSpend, 0).toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total FTDs</p>
          <p className="text-2xl font-semibold text-foreground">{recommendations.reduce((sum: number, r: any) => sum + r.currentFTDs, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Avg Cost/FTD</p>
          <p className="text-2xl font-semibold text-foreground">
            KES {(recommendations.reduce((sum: number, r: any) => sum + r.costPerFTD, 0) / (recommendations.length || 1)).toFixed(0)}
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {recommendations.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No campaigns to optimize at this time.</p>
          </div>
        ) : (
          recommendations.map((rec: any) => (
            <div key={rec.campaignId} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{rec.campaignName}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Source: {rec.source}</p>
                  <div className="grid grid-cols-4 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Current Spend</p>
                      <p className="text-sm font-semibold text-foreground">KES {rec.currentSpend.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">FTDs</p>
                      <p className="text-sm font-semibold text-foreground">{rec.currentFTDs}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cost/FTD</p>
                      <p className="text-sm font-semibold text-foreground">KES {rec.costPerFTD.toFixed(0)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Suggested Spend</p>
                      <p className="text-sm font-semibold text-accent">KES {rec.suggestedSpend.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded text-sm font-semibold border whitespace-nowrap ${getRecommendationColor(rec.recommendation)}`}>
                  {rec.recommendation}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{rec.rationale}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
