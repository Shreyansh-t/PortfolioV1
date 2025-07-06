'use client'

import React from 'react'

interface NavigationProps {
  currentPath: string
  setCurrentPath: (path: string) => void
  isTerminalMode: boolean
  setIsTerminalMode: (mode: boolean) => void
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPath, 
  setCurrentPath, 
  isTerminalMode, 
  setIsTerminalMode 
}) => {
  const menuItems = [
    { name: 'HOME', path: '~' },
    { name: 'ABOUT', path: 'about' },
    { name: 'PROJECTS', path: 'projects' },
    { name: 'EXPERIENCE', path: 'experience' },
    { name: 'BLOG', path: 'blog' },
    { name: 'CONTACT', path: 'contact' }
  ]

  const handleMenuClick = (path: string) => {
    setCurrentPath(path)
    setIsTerminalMode(false)
  }

  const toggleTerminal = () => {
    setIsTerminalMode(!isTerminalMode)
  }

  return (
    <div className="border border-terminal-fg border-glow p-4 mb-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMenuClick(item.path)}
              className={`px-3 py-1 text-sm hover:bg-terminal-fg hover:text-terminal-bg transition-colors ${
                currentPath === item.path && !isTerminalMode
                  ? 'bg-terminal-fg text-terminal-bg'
                  : 'text-terminal-fg'
              }`}
            >
              [{item.name}]
            </button>
          ))}
        </div>
        
        <button
          onClick={toggleTerminal}
          className={`px-3 py-1 text-sm border border-terminal-fg transition-colors ${
            isTerminalMode
              ? 'bg-terminal-fg text-terminal-bg'
              : 'text-terminal-fg hover:bg-terminal-fg hover:text-terminal-bg'
          }`}
        >
          {isTerminalMode ? '[EXIT_TERMINAL]' : '[TERMINAL_MODE]'}
        </button>
      </div>
      
      <div className="mt-4 text-xs text-terminal-gray">
        USER: shreyansh | CURRENT_PATH: /{currentPath} | MODE: {isTerminalMode ? 'TERMINAL' : 'GUI'}
      </div>
    </div>
  )
}

export default Navigation 