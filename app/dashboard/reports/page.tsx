'use client'

import { Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ReportsPage() {
  const reports = [
    {
      name: 'Monthly Performance Summary',
      description: 'Executive overview with KPIs, channel performance, and recommendations',
      lastGenerated: '2 days ago',
      formats: ['PDF', 'CSV']
    },
    {
      name: 'Campaign Deep Dive',
      description: 'Detailed analysis of individual campaign performance and optimization opportunities',
      lastGenerated: '1 day ago',
      formats: ['PDF', 'CSV']
    },
    {
      name: 'Attribution Report',
      description: 'First-click vs last-click attribution analysis with conversion paths',
      lastGenerated: '3 days ago',
      formats: ['PDF', 'CSV']
    },
    {
      name: 'Conversion Tracking Audit',
      description: 'Conversion action validation and tracking accuracy assessment',
      lastGenerated: '5 days ago',
      formats: ['PDF', 'CSV']
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Reports & Exports
        </h1>
        <p className="text-muted-foreground mt-1">Generate comprehensive reports for stakeholders</p>
      </div>

      {/* Report Options */}
      <div className="space-y-3">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  {report.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">Last generated: {report.lastGenerated}</p>
              <div className="flex gap-2">
                {report.formats.map((format) => (
                  <Button
                    key={format}
                    variant="outline"
                    size="sm"
                    className="bg-sidebar-accent/30 border-border hover:bg-sidebar-accent/50"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    {format}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
