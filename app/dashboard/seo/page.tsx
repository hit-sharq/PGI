'use client'

export default function SEOPage() {
  const topQueries = [
    { query: 'best investment platform kenya', impressions: 12400, clicks: 450, ctr: 3.6, position: 3.2, registrations: 45, ftds: 12 },
    { query: 'forex trading app', impressions: 8900, clicks: 320, ctr: 3.6, position: 2.8, registrations: 32, ftds: 8 },
    { query: 'crypto exchange', impressions: 6200, clicks: 180, ctr: 2.9, position: 4.1, registrations: 18, ftds: 3 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          SEO Performance
        </h1>
        <p className="text-muted-foreground mt-1">Organic search metrics from Google Search Console</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Organic Impressions</p>
          <p className="text-2xl font-semibold text-foreground">125.4K</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Organic Clicks</p>
          <p className="text-2xl font-semibold text-foreground">4,250</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Organic Registrations</p>
          <p className="text-2xl font-semibold text-foreground">420</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Organic FTDs</p>
          <p className="text-2xl font-semibold text-foreground">85</p>
        </div>
      </div>

      {/* Top Queries */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-sidebar-accent/20">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Query</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Impressions</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Clicks</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">CTR</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Position</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Registrations</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">FTDs</th>
              </tr>
            </thead>
            <tbody>
              {topQueries.map((q, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-sidebar-accent/20">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{q.query}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{q.impressions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{q.clicks}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{q.ctr.toFixed(1)}%</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{q.position.toFixed(1)}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{q.registrations}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground font-semibold">{q.ftds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
