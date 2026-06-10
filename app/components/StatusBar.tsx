'use client'

import { useState, useEffect } from 'react'

const MESSAGES = [
  'ShreyanshOS ready.',
  'all systems operational.',
  'window manager active.',
  'awaiting input...',
  'uptime: ∞',
]

export default function StatusBar() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % MESSAGES.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      style={{
        height: '24px',
        background: 'rgba(18,18,16,0.97)',
        borderTop: '1px solid rgba(201,169,93,0.12)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '11px',
        userSelect: 'none',
        gap: '8px',
      }}
    >
      <span style={{ color: 'rgba(201,169,93,0.5)', fontSize: '8px' }}>●</span>
      <span style={{ color: '#5A5040' }}>{MESSAGES[idx]}</span>
      <span style={{ marginLeft: 'auto', color: '#3A3028' }}>shreyansh@ShreyanshOS</span>
    </div>
  )
}
