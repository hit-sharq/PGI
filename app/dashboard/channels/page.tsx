'use client'

import { useEffect, useState } from 'react'
import { subDays } from 'date-fns'
import { ArrowUpDown, TrendingUp } from 'lucide-react'
import { getChannelPerformance } from '@/app/actions/dashboard'

interface ChannelData {
  id: string
  name: string
  type: string
  spend: number
  traffic: number
  registrations: number
  ftds: number
  costPerFTD: number
  conversionRate: number
}

export default function ChannelsPage() {
  const [channels, setChannels] = useState<ChannelData[]>([])
  const [sortBy, setSortBy] = useState<'ftds' | 'costPerFTD' | 'spend' | 'conversionRate'>('ftds')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const dateTo = new Date()
        const dateFrom = subDays(dateTo, 30)
        const data = await getChannelPerformance(dateFrom, dateTo)
        setChannels(data)
      } catch (error) {
        console.error('Error loading channels:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const sortedChannels = [...channels].sort((a, b) => {
    switch (sortBy) {
      case 'ftds':
        return b.ftds - a.ftds
      case 'costPerFTD':
        return a.costPerFTD - b.costPerFTD
      case 'spend':
        return b.spend - a.spend
      case 'conversionRate':
        return b.conversionRate - a.conversionRate
      default:
        return b.ftds - a.ftds
    }
  })

  if (loading) {
    return <div className="text-muted-foreground">Loading channels...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Channel Performance
        </h1>
        <p className="text-muted-foreground mt-1">Acquisition channel analysis and comparison</p>
      </div>

      {/* Sorting Controls */}
      <div className="flex gap-2 flex-wrap">
        {(['ftds', 'costPerFTD', 'spend', 'conversionRate'] as const).map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              sortBy === option
                ? 'bg-accent text-primary'
                : 'bg-card border border-border text-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            Sort by{' '}
            {option === 'ftds'
              ? 'FTDs'
              : option === 'costPerFTD'
              ? 'Cost/FTD'
              : option === 'spend'
              ? 'Spend'
              : 'Conversion Rate'}
          </button>
        ))}
      </div>

      {/* Channels Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-sidebar-accent/20">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Channel</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Spend</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Traffic</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Registrations</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">FTDs</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Cost/FTD</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {sortedChannels.map((channel, idx) => (
                <tr key={channel.id} className={`border-b border-border ${idx === 0 ? 'bg-accent/10' : 'hover:bg-sidebar-accent/20'}`}>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{channel.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{channel.type}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">KES {channel.spend.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{channel.traffic.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{channel.registrations.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground font-semibold">{channel.ftds.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">KES {channel.costPerFTD.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{channel.conversionRate.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
