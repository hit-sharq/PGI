'use client'

export default function ConversionAuditPage() {
  const alerts = [
    {
      severity: 'critical',
      title: 'Google Ads Conversions Mismatched',
      description: 'Google Ads reports 7,885 conversions but only 1,240 verified FTDs detected',
      action: 'Verify conversion tracking setup'
    },
    {
      severity: 'warning',
      title: 'Missing Conversion Values',
      description: 'Some conversion actions have no value attribution configured',
      action: 'Configure conversion value mapping'
    },
    {
      severity: 'warning',
      title: 'Repeat Deposits Possible',
      description: 'Conversion rate exceeds expected levels - verify primary conversion definition',
      action: 'Check conversion action rules'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Conversion Tracking Audit
        </h1>
        <p className="text-muted-foreground mt-1">Validate conversion actions and identify tracking issues</p>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        {alerts.map((alert, idx) => (
          <div key={idx} className={`border rounded-lg p-4 ${
            alert.severity === 'critical' 
              ? 'bg-red-500/10 border-red-500/30' 
              : 'bg-yellow-500/10 border-yellow-500/30'
          }`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className={`font-semibold ${
                  alert.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {alert.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                alert.severity === 'critical'
                  ? 'bg-red-500/30 text-red-400'
                  : 'bg-yellow-500/30 text-yellow-400'
              }`}>
                {alert.severity.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">→ {alert.action}</p>
          </div>
        ))}
      </div>

      {/* Conversion Actions Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-sidebar-accent/20">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Count</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Avg Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border hover:bg-sidebar-accent/20">
                <td className="px-6 py-4 text-sm font-medium text-foreground">Purchase / Deposit</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Purchase</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400">Primary</span>
                </td>
                <td className="px-6 py-4 text-sm text-right text-foreground">1,240</td>
                <td className="px-6 py-4 text-sm text-right text-foreground">KES 2,500</td>
              </tr>
              <tr className="border-b border-border hover:bg-sidebar-accent/20">
                <td className="px-6 py-4 text-sm font-medium text-foreground">Registration</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Sign-up</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">Secondary</span>
                </td>
                <td className="px-6 py-4 text-sm text-right text-foreground">8,500</td>
                <td className="px-6 py-4 text-sm text-right text-foreground">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
