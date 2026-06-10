import './globals.css'
import React from 'react'

export const metadata = {
  title: 'CORE_DUMP :: Shreyansh Tehanguria',
  description: 'Hex-Dump Brutalist portfolio with Write-Ahead Log navigation. Systems & AI Engineer.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-terminal-bg text-terminal-fg font-mono">
        <div className="scanlines min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
} 