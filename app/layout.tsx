import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Shreyansh Tehanguria - Terminal Portfolio',
  description: 'Shreyansh Tehanguria - Software Engineer. A retro 1980s computer terminal themed portfolio website',
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