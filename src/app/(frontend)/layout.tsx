import React from 'react'
import './styles.css'
import ArchiveFooter from './ArchiveFooter'

export const metadata = {
  description:
    'A research-based public archive for Muslim public service, humanitarian contribution, civic life, scholarship, culture, and historical intellectual context.',
  icons: {
    icon: [{ type: 'image/svg+xml', url: '/favicon.ico?v=20260530' }],
    shortcut: ['/favicon.ico?v=20260530'],
  },
  title: 'Muslim Impactors',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <ArchiveFooter />
      </body>
    </html>
  )
}
