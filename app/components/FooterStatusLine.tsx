'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  'portfolio.index loaded',
  'experience.timeline rendered',
  'projects.grid indexed',
  'contact.section ready',
  'hex_background.canvas streaming',
  'schema.sections committed',
]

export default function FooterStatusLine() {
  const [lsn, setLsn] = useState(1)
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLsn(n => n + 1)
      setMsgIdx(i => (i + 1) % MESSAGES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer
      className="relative z-10"
      style={{ borderTop: '1px solid rgba(200,169,106,0.1)', background: 'rgba(17,19,21,0.92)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <p className="font-mono text-xs" style={{ color: 'rgba(200,169,106,0.4)' }}>
          [LSN {String(lsn).padStart(3, '0')}] {MESSAGES[msgIdx]}
        </p>
        <p className="font-mono text-xs hidden sm:block" style={{ color: 'rgba(200,169,106,0.3)' }}>
          Shreyansh Tehanguria · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
