import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'A.M | cp-MIT',
  description: 'developed by Aayush Mishra',
  generator: 'aayush.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
