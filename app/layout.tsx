import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Shreyansh Tehanguria — Software Engineer',
  description: 'Software engineer focused on databases, C++, systems, full-stack products, and applied machine learning.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
