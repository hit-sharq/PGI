'use client'

import { useEffect, useState } from 'react'
import { subDays } from 'date-fns'
import { getCampaignPerformance } from '@/app/actions/dashboard'
import { Badge } from '@/components/ui/badge'

interface CampaignData {
  id: string
  name: string
  source: string
  status: string
  spend: number
  impressions: number
  clicks: number
  ctr: number
  cpc: number
  registrations: number
  verified: number
  ftds: number
  costPerFTD: number
  totalDepositValue: number
  performance: string
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const dateTo = new Date()
        const dateFrom = subDays(dateTo, 30)
        const data = await getCampaignPerformance(dateFrom, dateTo)
        setCampaigns(data)
      } catch (error) {
        console.error('Error loading campaigns:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const getPerformanceBadgeColor = (performance: string) => {
    switch (performance) {
      case 'SCALE':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'OPTIMIZE':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'INVESTIGATE':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'PAUSE':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (loading) {
    return <div className="text-muted-foreground">Loading campaigns...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Campaign Performance
        </h1>
        <p className="text-muted-foreground mt-1">Detailed campaign metrics and recommendations</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total Campaigns</p>
          <p className="text-2xl font-semibold text-foreground">{campaigns.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total Spend</p>
          <p className="text-2xl font-semibold text-foreground">KES {campaigns.reduce((sum, c) => sum + c.spend, 0).toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total FTDs</p>
          <p className="text-2xl font-semibold text-foreground">{campaigns.reduce((sum, c) => sum + c.ftds, 0).toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Avg Cost/FTD</p>
          <p className="text-2xl font-semibold text-foreground">
            KES {(campaigns.reduce((sum, c) => sum + c.costPerFTD, 0) / campaigns.length).toFixed(0)}
          </p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-sidebar-accent/20">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Campaign</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Source</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Spend</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Clicks</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">CTR</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">CPC</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">FTDs</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Cost/FTD</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-border hover:bg-sidebar-accent/20">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{campaign.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{campaign.source}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        campaign.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">KES {campaign.spend.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{campaign.clicks.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{campaign.ctr.toFixed(2)}%</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">KES {campaign.cpc.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground font-semibold">{campaign.ftds.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">KES {campaign.costPerFTD.toFixed(0)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getPerformanceBadgeColor(campaign.performance)}`}>
                      {campaign.performance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
