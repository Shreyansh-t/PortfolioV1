'use client'

import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import ContentDisplay from './components/ContentDisplay'

export default function Home() {
  const [currentPath, setCurrentPath] = useState('~')
  const [sessionInfo, setSessionInfo] = useState<string>('')

  useEffect(() => {
    const timestamp = new Date().toLocaleString()
    const sessionId = Math.random().toString(36).substr(2, 9).toUpperCase()
    setSessionInfo(`${timestamp} | SESSION: ${sessionId}`)
  }, [])

  return (
    <main className="min-h-screen bg-terminal-bg text-terminal-fg p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 sm:mb-8">
          <div className="text-xl sm:text-2xl font-bold mb-2 glow">
            SYSTEM INITIALIZED_
          </div>
          <div className="text-xs sm:text-sm text-terminal-gray break-all">
            {sessionInfo || 'LOADING SESSION...'}
          </div>
        </div>

        <Navigation
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
        />

        <div className="mt-4 sm:mt-8">
          <ContentDisplay currentPath={currentPath} />
        </div>
      </div>
    </main>
  )
}
