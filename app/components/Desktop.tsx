'use client'

import { useState, useCallback } from 'react'
import HexCanvas from './HexCanvas'
import MenuBar from './MenuBar'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import StatusBar from './StatusBar'
import AboutWindow from './windows/AboutWindow'
import ExperienceWindow from './windows/ExperienceWindow'
import ProjectsWindow from './windows/ProjectsWindow'
import ArticlesWindow from './windows/ArticlesWindow'
import ContactWindow from './windows/ContactWindow'

export type WindowId = 'about' | 'experience' | 'projects' | 'articles' | 'contact'

const WINDOWS: Record<WindowId, { title: string; Component: React.ComponentType }> = {
  about:      { title: 'About.app',      Component: AboutWindow },
  experience: { title: 'Experience.db',  Component: ExperienceWindow },
  projects:   { title: 'Projects/',      Component: ProjectsWindow },
  articles:   { title: 'Articles.txt',   Component: ArticlesWindow },
  contact:    { title: 'Contact.net',    Component: ContactWindow },
}

const ICONS: { id: WindowId; label: string; iconType: string }[] = [
  { id: 'about',      label: 'About.app',     iconType: 'user' },
  { id: 'experience', label: 'Experience.db', iconType: 'database' },
  { id: 'projects',   label: 'Projects/',     iconType: 'folder' },
  { id: 'articles',   label: 'Articles.txt',  iconType: 'document' },
  { id: 'contact',    label: 'Contact.net',   iconType: 'network' },
]

export default function Desktop() {
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null)

  const openWindow  = useCallback((id: WindowId) => setActiveWindow(id), [])
  const closeWindow = useCallback(() => setActiveWindow(null), [])

  const active = activeWindow ? WINDOWS[activeWindow] : null

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Scrolling hex background */}
      <HexCanvas />

      {/* Dark overlay for readability */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(11,13,14,0.5)', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true" />

      {/* Menu bar */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        <MenuBar />
      </div>

      {/* Desktop icon area */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '28px 36px',
            justifyContent: 'center',
            maxWidth: '760px',
          }}
        >
          {ICONS.map(icon => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              label={icon.label}
              iconType={icon.iconType}
              onOpen={openWindow}
            />
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        <StatusBar />
      </div>

      {/* Active window */}
      {active && (
        <Window title={active.title} onClose={closeWindow}>
          <active.Component />
        </Window>
      )}
    </div>
  )
}
