'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Articles', href: '#articles' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? 'rgba(17,19,21,0.96)' : 'rgba(17,19,21,0.82)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(200,169,106,0.15)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => handleNav('#home')}
          className="flex items-center gap-2 group"
          aria-label="Back to top"
        >
          <span
            className="font-mono text-xs tracking-widest transition-opacity"
            style={{ color: 'rgba(200,169,106,0.6)' }}
          >
            db://
          </span>
          <span className="text-[#E8E3D8] font-semibold text-base tracking-tight">Shreyansh</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-sm rounded-md transition-all duration-150"
                style={{ color: '#A8A096' }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = '#E8E3D8'
                  ;(e.target as HTMLElement).style.background = 'rgba(200,169,106,0.08)'
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = '#A8A096'
                  ;(e.target as HTMLElement).style.background = 'transparent'
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className="block w-5 h-0.5 transition-all duration-200 origin-center"
            style={{
              background: '#C8A96A',
              transform: open ? 'rotate(45deg) translate(3px, 3px)' : 'none',
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{ background: '#C8A96A', opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200 origin-center"
            style={{
              background: '#C8A96A',
              transform: open ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden"
          style={{ borderTop: '1px solid rgba(200,169,106,0.15)', background: 'rgba(17,19,21,0.98)' }}
        >
          <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="w-full text-left px-3 py-2.5 text-base rounded-md transition-all"
                  style={{ color: '#A8A096' }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = '#E8E3D8'
                    ;(e.target as HTMLElement).style.background = 'rgba(200,169,106,0.08)'
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = '#A8A096'
                    ;(e.target as HTMLElement).style.background = 'transparent'
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
