'use client'

import React from 'react'

interface NavigationProps {
  currentPath: string
  setCurrentPath: (path: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ currentPath, setCurrentPath }) => {
  const menuItems = [
    { name: 'HOME', path: '~' },
    { name: 'ABOUT', path: 'about' },
    { name: 'PROJECTS', path: 'projects' },
    { name: 'EXPERIENCE', path: 'experience' },
    { name: 'BLOG', path: 'blog' },
    { name: 'CONTACT', path: 'contact' }
  ]

  return (
    <div className="border border-terminal-fg border-glow p-3 sm:p-4 mb-4">
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentPath(item.path)}
            className={`px-2 sm:px-3 py-2 text-xs sm:text-sm touch-manipulation hover:bg-terminal-fg hover:text-terminal-bg transition-colors ${
              currentPath === item.path
                ? 'bg-terminal-fg text-terminal-bg'
                : 'text-terminal-fg'
            }`}
          >
            [{item.name}]
          </button>
        ))}
      </div>

      <div className="mt-3 sm:mt-4 text-xs text-terminal-gray break-all">
        USER: shreyansh | PATH: /{currentPath}
      </div>
    </div>
  )
}

export default Navigation
