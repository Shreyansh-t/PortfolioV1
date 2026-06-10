'use client'

import { useState } from 'react'
import type { WindowId } from './Desktop'

type IconType = 'user' | 'database' | 'folder' | 'document' | 'network'

const S = 'rgba(201,169,93,0.55)'  // stroke
const F = 'rgba(201,169,93,0.12)'  // fill
const A = '#C9A95D'                 // accent

function IconSVG({ type }: { type: IconType }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="46" height="46" rx="3" fill="#181916" stroke={S} strokeWidth="1" />

      {type === 'user' && <>
        {/* Monitor */}
        <rect x="8" y="9" width="32" height="21" rx="1" fill={F} stroke={A} strokeWidth="1.5" />
        {/* Stand */}
        <rect x="20" y="30" width="8" height="5" fill="rgba(201,169,93,0.3)" />
        <rect x="14" y="34" width="20" height="2.5" rx="1" fill="rgba(201,169,93,0.3)" />
        {/* Person inside screen */}
        <circle cx="24" cy="16" r="3" fill={A} opacity="0.6" />
        <path d="M16 26.5 Q24 21 32 26.5" stroke={A} strokeWidth="1.5" fill="none" opacity="0.6" />
      </>}

      {type === 'database' && <>
        {/* Top ellipse */}
        <ellipse cx="24" cy="14" rx="11" ry="3.5" fill={F} stroke={A} strokeWidth="1.5" />
        {/* Cylinder body left/right */}
        <line x1="13" y1="14" x2="13" y2="24" stroke={A} strokeWidth="1.5" />
        <line x1="35" y1="14" x2="35" y2="24" stroke={A} strokeWidth="1.5" />
        {/* Middle ellipse */}
        <ellipse cx="24" cy="24" rx="11" ry="3.5" fill={F} stroke={A} strokeWidth="1.5" />
        {/* Lower cylinder */}
        <line x1="13" y1="24" x2="13" y2="34" stroke={A} strokeWidth="1.5" />
        <line x1="35" y1="24" x2="35" y2="34" stroke={A} strokeWidth="1.5" />
        {/* Bottom ellipse */}
        <ellipse cx="24" cy="34" rx="11" ry="3.5" fill={F} stroke={A} strokeWidth="1.5" />
        {/* Horizontal rules on middle section */}
        <line x1="17" y1="20" x2="31" y2="20" stroke={A} strokeWidth="0.75" opacity="0.35" />
        <line x1="17" y1="29" x2="31" y2="29" stroke={A} strokeWidth="0.75" opacity="0.35" />
      </>}

      {type === 'folder' && <>
        {/* Folder tab */}
        <path d="M8 19 L8 15 Q8 14 9 14 L21 14 L24 18 L39 18 Q40 18 40 19 L40 35 Q40 36 39 36 L9 36 Q8 36 8 35 Z"
          fill={F} stroke={A} strokeWidth="1.5" />
        {/* Lines suggesting files inside */}
        <line x1="15" y1="24" x2="33" y2="24" stroke={A} strokeWidth="1" opacity="0.45" />
        <line x1="15" y1="28" x2="29" y2="28" stroke={A} strokeWidth="1" opacity="0.45" />
        <line x1="15" y1="32" x2="25" y2="32" stroke={A} strokeWidth="1" opacity="0.45" />
      </>}

      {type === 'document' && <>
        {/* Paper */}
        <path d="M12 8 L30 8 L36 14 L36 40 L12 40 Z" fill={F} stroke={A} strokeWidth="1.5" />
        {/* Dog-ear fold */}
        <path d="M30 8 L30 14 L36 14" fill="none" stroke={A} strokeWidth="1.5" />
        {/* Text lines */}
        <line x1="17" y1="20" x2="31" y2="20" stroke={A} strokeWidth="1" opacity="0.55" />
        <line x1="17" y1="24" x2="31" y2="24" stroke={A} strokeWidth="1" opacity="0.55" />
        <line x1="17" y1="28" x2="28" y2="28" stroke={A} strokeWidth="1" opacity="0.55" />
        <line x1="17" y1="32" x2="30" y2="32" stroke={A} strokeWidth="1" opacity="0.55" />
        <line x1="17" y1="36" x2="23" y2="36" stroke={A} strokeWidth="1" opacity="0.55" />
      </>}

      {type === 'network' && <>
        {/* Envelope body */}
        <rect x="8" y="15" width="32" height="22" rx="1" fill={F} stroke={A} strokeWidth="1.5" />
        {/* Envelope flap */}
        <path d="M8 15 L24 26 L40 15" stroke={A} strokeWidth="1.5" fill="none" />
        {/* Network node above */}
        <circle cx="24" cy="10" r="2.5" fill={A} opacity="0.5" />
        <line x1="24" y1="12.5" x2="24" y2="15" stroke={A} strokeWidth="1" opacity="0.4" />
        {/* Small nodes bottom corners */}
        <circle cx="14" cy="40" r="1.5" fill={A} opacity="0.3" />
        <circle cx="34" cy="40" r="1.5" fill={A} opacity="0.3" />
      </>}
    </svg>
  )
}

interface Props {
  id: WindowId
  label: string
  iconType: string
  onOpen: (id: WindowId) => void
}

export default function DesktopIcon({ id, label, iconType, onOpen }: Props) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <button
      aria-label={`Open ${label}`}
      onClick={() => onOpen(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        background: hovered ? 'rgba(201,169,93,0.07)' : 'transparent',
        border: hovered ? '1px solid rgba(201,169,93,0.3)' : '1px solid transparent',
        borderRadius: '6px',
        padding: '12px 6px 8px',
        cursor: 'pointer',
        width: '108px',
        outline: 'none',
        transform: pressed ? 'scale(0.95)' : hovered ? 'translateY(-2px)' : 'none',
        transition: 'transform 100ms ease, background 100ms ease, border-color 100ms ease',
      }}
      onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px rgba(201,169,93,0.35)')}
      onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      <IconSVG type={iconType as IconType} />
      <span
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '11px',
          color: '#E8E0C8',
          textAlign: 'center',
          lineHeight: 1.3,
          userSelect: 'none',
          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          wordBreak: 'break-word',
        }}
      >
        {label}
      </span>
    </button>
  )
}
