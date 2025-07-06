'use client'

import React, { useState, useEffect, useRef } from 'react'
import Terminal from './components/Terminal'
import Navigation from './components/Navigation'
import ContentDisplay from './components/ContentDisplay'

export default function Home() {
  const [currentPath, setCurrentPath] = useState('~')
  const [isTerminalMode, setIsTerminalMode] = useState(false)
  const [sessionInfo, setSessionInfo] = useState<string>('')

  useEffect(() => {
    // Set dynamic content only on client side to avoid hydration mismatch
    const timestamp = new Date().toLocaleString()
    const sessionId = Math.random().toString(36).substr(2, 9).toUpperCase()
    setSessionInfo(`${timestamp} | SESSION: ${sessionId}`)
  }, [])

  return (
    <main className="min-h-screen bg-terminal-bg text-terminal-fg p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <div className="text-xl sm:text-2xl font-bold mb-2 glow">
            SYSTEM INITIALIZED_
          </div>
          <div className="text-xs sm:text-sm text-terminal-gray break-all">
            {sessionInfo || 'LOADING SESSION...'}
          </div>
        </div>

        {/* Navigation */}
        <Navigation 
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
          isTerminalMode={isTerminalMode}
          setIsTerminalMode={setIsTerminalMode}
        />

        {/* Main Content */}
        <div className="mt-4 sm:mt-8">
          {isTerminalMode ? (
            <Terminal 
              currentPath={currentPath}
              setCurrentPath={setCurrentPath}
              setIsTerminalMode={setIsTerminalMode}
            />
          ) : (
            <ContentDisplay currentPath={currentPath} />
          )}
        </div>
      </div>
    </main>
  )
} 