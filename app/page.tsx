'use client'

import { useState } from 'react'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'

export default function Home() {
  const [booted, setBooted] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#0B0D0E' }}>
      {booted ? (
        <Desktop />
      ) : (
        <BootScreen onDone={() => setBooted(true)} />
      )}
    </div>
  )
}
