'use client'

import { useEffect, useState } from 'react'

const LINES = [
  'Booting ShreyanshOS v1.0...',
  'checking memory ........ ok',
  'mounting /projects ..... ok',
  'loading experience.db .. ok',
  'starting window manager . ok',
  'ready.',
]
const TIMINGS = [0, 320, 580, 820, 1060, 1380]

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    TIMINGS.forEach((delay, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), delay))
    })
    timers.push(setTimeout(() => setFading(true), 1750))
    timers.push(setTimeout(() => onDone(), 2150))
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Booting ShreyanshOS"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B0D0E',
        opacity: fading ? 0 : 1,
        transition: 'opacity 400ms ease',
      }}
    >
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '13px',
          lineHeight: 2,
          color: '#C9A95D',
        }}
      >
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div key={i} style={{ opacity: i === visibleCount - 1 ? 1 : 0.75 }}>
            {line}
          </div>
        ))}
        {visibleCount > 0 && visibleCount < LINES.length && (
          <span className="boot-cursor">_</span>
        )}
      </div>
    </div>
  )
}
