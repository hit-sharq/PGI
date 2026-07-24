import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pakakumi Growth Intelligence',
  description: 'Marketing attribution and FTD analytics platform',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d1a12',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
          :root {
            --font-display: 'Cormorant Garamond', serif;
            --font-body: 'Inter', sans-serif;
          }
        `}</style>
      </head>
      <body className="antialiased bg-background text-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
