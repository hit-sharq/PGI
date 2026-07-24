'use client'

export default function AttributionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          FTD Attribution Analysis
        </h1>
        <p className="text-muted-foreground mt-1">Detailed FTD attribution by source, campaign, and keyword</p>
      </div>

      {/* Placeholder */}
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground mb-4">FTD Attribution data loading...</p>
        <div className="text-sm text-muted-foreground">
          <p>This page displays:</p>
          <ul className="mt-2 space-y-1">
            <li>• User acquisition journey (First Click vs Last Click models)</li>
            <li>• Attribution by source, campaign, ad group, and keyword</li>
            <li>• FTD count by attribution model</li>
            <li>• Conversion time from registration to first deposit</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
