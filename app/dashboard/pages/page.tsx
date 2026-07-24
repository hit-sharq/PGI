'use client'

export default function LandingPagesPage() {
  const pages = [
    { url: '/signup', sessions: 15400, clicks: 3200, registrations: 480, ftds: 95, regRate: 15.0, ftdRate: 3.0 },
    { url: '/features', sessions: 8200, clicks: 1800, registrations: 220, ftds: 42, regRate: 12.2, ftdRate: 1.9 },
    { url: '/pricing', sessions: 5600, clicks: 1200, registrations: 120, ftds: 18, regRate: 10.0, ftdRate: 1.5 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Landing Page Performance
        </h1>
        <p className="text-muted-foreground mt-1">Analyze conversion performance by landing page</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total Sessions</p>
          <p className="text-2xl font-semibold text-foreground">{pages.reduce((sum, p) => sum + p.sessions, 0).toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total Registrations</p>
          <p className="text-2xl font-semibold text-foreground">{pages.reduce((sum, p) => sum + p.registrations, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total FTDs</p>
          <p className="text-2xl font-semibold text-foreground">{pages.reduce((sum, p) => sum + p.ftds, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Avg FTD Rate</p>
          <p className="text-2xl font-semibold text-foreground">
            {((pages.reduce((sum, p) => sum + p.ftdRate, 0) / pages.length)).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-sidebar-accent/20">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Page URL</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Sessions</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Registrations</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Reg Rate</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">FTDs</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">FTD Rate</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-sidebar-accent/20">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{page.url}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{page.sessions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{page.registrations}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{page.regRate.toFixed(1)}%</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground font-semibold">{page.ftds}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{page.ftdRate.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
