'use client'

import { useState, useEffect } from 'react'

export default function MenuBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setTime(fmt())
    const t = setInterval(() => setTime(fmt()), 30000)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      style={{
        height: '28px',
        background: 'rgba(20,20,18,0.97)',
        borderBottom: '1px solid rgba(201,169,93,0.18)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '12px',
        userSelect: 'none',
        gap: '20px',
      }}
    >
      <span style={{ color: '#C9A95D', fontWeight: 600, letterSpacing: '0.02em' }}>ShreyanshOS</span>

      <div style={{ display: 'flex', gap: '18px' }}>
        {['File', 'View', 'Go', 'Help'].map(item => (
          <span key={item} style={{ color: '#7F7665', cursor: 'default' }}>{item}</span>
        ))}
      </div>

      <div style={{ marginLeft: 'auto', color: '#5A5040', fontSize: '11px' }}>{time}</div>
    </div>
  )
}
