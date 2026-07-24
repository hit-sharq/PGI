'use client'

import { Plug, RefreshCw, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function IntegrationsPage() {
  const integrations = [
    {
      name: 'Google Ads',
      status: 'connected',
      lastSync: '2 hours ago',
      data: 'Campaigns, keywords, ads, performance metrics'
    },
    {
      name: 'Google Search Console',
      status: 'connected',
      lastSync: '6 hours ago',
      data: 'Organic search queries, impressions, clicks, position'
    },
    {
      name: 'Google Analytics 4',
      status: 'disconnected',
      lastSync: null,
      data: 'User behavior, funnel analysis'
    },
    {
      name: 'Opera Traffic',
      status: 'connected',
      lastSync: '30 minutes ago',
      data: 'Opera user traffic and registrations'
    },
    {
      name: 'Internal Registration API',
      status: 'connected',
      lastSync: '15 minutes ago',
      data: 'User registrations, verification status'
    },
    {
      name: 'Internal Deposit API',
      status: 'connected',
      lastSync: '5 minutes ago',
      data: 'Deposit transactions, FTD status'
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Integrations
        </h1>
        <p className="text-muted-foreground mt-1">Connect data sources for comprehensive analytics</p>
      </div>

      {/* Integration Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Connected</p>
          <p className="text-2xl font-semibold text-green-400">{integrations.filter(i => i.status === 'connected').length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Disconnected</p>
          <p className="text-2xl font-semibold text-orange-400">{integrations.filter(i => i.status === 'disconnected').length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total</p>
          <p className="text-2xl font-semibold text-foreground">{integrations.length}</p>
        </div>
      </div>

      {/* Integrations List */}
      <div className="space-y-3">
        {integrations.map((integration, idx) => (
          <div key={idx} className={`border rounded-lg p-4 ${
            integration.status === 'connected'
              ? 'bg-card border-border'
              : 'bg-orange-500/5 border-orange-500/30'
          }`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <Plug className="h-5 w-5 text-accent" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{integration.data}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-medium ${
                integration.status === 'connected'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-orange-500/20 text-orange-400'
              }`}>
                {integration.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                {integration.lastSync ? `Last synced: ${integration.lastSync}` : 'Not connected'}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-sidebar-accent/30 border-border hover:bg-sidebar-accent/50"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Sync
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-sidebar-accent/30 border-border hover:bg-sidebar-accent/50"
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
