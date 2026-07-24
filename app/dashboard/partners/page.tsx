'use client'

export default function PartnersPage() {
  const partners = [
    { name: 'Opera', traffic: 8500, registrations: 680, ftds: 142, spend: 45000, costPerFTD: 317 },
    { name: 'Affiliate Network A', traffic: 6200, registrations: 420, ftds: 78, spend: 32000, costPerFTD: 410 },
    { name: 'Affiliate Network B', traffic: 4100, registrations: 185, ftds: 28, spend: 18000, costPerFTD: 643 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Partner & Opera Performance
        </h1>
        <p className="text-muted-foreground mt-1">Track acquisition sources from partners and affiliate networks</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Total Partner Traffic</p>
          <p className="text-2xl font-semibold text-foreground">{partners.reduce((sum, p) => sum + p.traffic, 0).toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Partner Spend</p>
          <p className="text-2xl font-semibold text-foreground">KES {partners.reduce((sum, p) => sum + p.spend, 0).toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Partner FTDs</p>
          <p className="text-2xl font-semibold text-foreground">{partners.reduce((sum, p) => sum + p.ftds, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground text-sm mb-2">Avg Cost/FTD</p>
          <p className="text-2xl font-semibold text-foreground">
            KES {(partners.reduce((sum, p) => sum + p.costPerFTD, 0) / partners.length).toFixed(0)}
          </p>
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-sidebar-accent/20">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Partner</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Traffic</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Registrations</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">FTDs</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Spend</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Cost/FTD</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-sidebar-accent/20">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{partner.name}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{partner.traffic.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{partner.registrations}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground font-semibold">{partner.ftds}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">KES {partner.spend.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">KES {partner.costPerFTD}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">
                    {((partner.ftds / partner.traffic) * 100).toFixed(2)}%
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
