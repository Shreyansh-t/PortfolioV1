'use client'

import { useEffect, useRef } from 'react'

interface Props {
  title: string
  onClose: () => void
  children: React.ReactNode
}

export default function Window({ title, onClose, children }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    dialogRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        background: 'rgba(11,13,14,0.72)',
        backdropFilter: 'blur(6px)',
        animation: 'backdropIn 120ms ease',
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        style={{
          width: 'min(920px, 96vw)',
          height: 'min(680px, 92vh)',
          background: '#181916',
          border: '1px solid rgba(201,169,93,0.3)',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'windowOpen 150ms cubic-bezier(0.2,0,0.2,1)',
          outline: 'none',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: '32px',
            background: '#24231F',
            borderBottom: '1px solid rgba(201,169,93,0.2)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            flexShrink: 0,
            userSelect: 'none',
          }}
        >
          {/* Traffic-light controls */}
          <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
            <button
              onClick={onClose}
              aria-label="Close window"
              title="Close"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#B85C4C',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
              }}
            />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4A4830', flexShrink: 0 }} aria-hidden="true" />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#304030', flexShrink: 0 }} aria-hidden="true" />
          </div>

          {/* Window title centered */}
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              color: '#C9A95D',
              letterSpacing: '0.02em',
            }}
          >
            {title}
          </div>

          {/* Spacer to balance traffic lights */}
          <div style={{ width: '52px', flexShrink: 0 }} aria-hidden="true" />
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
