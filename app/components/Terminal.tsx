'use client'

import React, { useState, useEffect, useRef } from 'react'

interface TerminalProps {
  currentPath: string
  setCurrentPath: (path: string) => void
  setIsTerminalMode: (mode: boolean) => void
}

interface Command {
  input: string
  output: string[]
  path: string
}

interface FileSystemNode {
  files: string[]
  directories: string[]
}

interface FileSystem {
  [key: string]: FileSystemNode
}

const Terminal: React.FC<TerminalProps> = ({ currentPath, setCurrentPath, setIsTerminalMode }) => {
  const [history, setHistory] = useState<Command[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const fileSystem: FileSystem = {
    '~': {
      files: ['about.txt', 'resume.pdf', 'README.md'],
      directories: ['projects', 'experience', 'blog', 'contact']
    },
    'projects': {
      files: ['boilerfixit.md', 'caching-engine.cpp', 'airbnb-tracker.py', 'README.md'],
      directories: ['web-apps', 'systems', 'data-tools']
    },
    'experience': {
      files: ['work-history.txt', 'skills.md', 'certifications.txt'],
      directories: ['projects', 'achievements']
    },
    'blog': {
      files: ['post1.md', 'post2.md', 'post3.md'],
      directories: ['tech', 'personal']
    },
    'contact': {
      files: ['email.txt', 'social.txt', 'contact-form.txt', 'availability.txt'],
      directories: []
    }
  }

  const commands = {
    help: () => [
      'Available commands:',
      '  ls       - list directory contents',
      '  cd DIR   - change directory',
      '  pwd      - print working directory',
      '  cat FILE - display file contents',
      '  touch FILE - create/open file',
      '  clear    - clear terminal',
      '  exit     - exit terminal mode',
      '  help     - show this help message'
    ],
    
    ls: () => {
      // Context-aware listing based on current path
      switch (currentPath) {
        case 'experience':
          return [
            'WORK EXPERIENCE:',
            '================',
            '',
            '1. AI_ENGINEER_INTERN',
            '   Company: Legalgini | Location: Gurugram, India | Duration: Jan 2025 – May 2025',
            '   • CoLBERT-based RAG pipeline: 70% → 96% accuracy improvement',
            '   • Gemini Flash LLM integration: 40% engagement boost',
            '',
            '2. AUTONOMOUS_SYSTEMS_RESEARCHER', 
            '   Prof. J.M Goppert - Purdue University | Duration: Jan 2025 – May 2025',
            '   • A*, RRT, RRT* navigation algorithms for NARCAN-delivery drone',
            '   • 30% computational load reduction',
            '',
            '3. PROJECT_MANAGER_&_TA',
            '   Purdue University | Duration: Aug 2023 – May 2024',
            '   • Led team of 7 researchers across 40 states',
            '   • LSTM sentiment analysis: 95% accuracy',
            '',
            '4. DATA_SCIENCE_RESEARCHER',
            '   Purdue University | Duration: Aug 2022 – May 2023',
            '   • Agricultural sensor data: 30,000+ points per variable',
            '   • Optimized data sampling for processing efficiency'
          ]
        
        case 'projects':
          return [
            'PROJECTS:',
            '=========',
            '',
            '1. BoilerFixIt [ONGOING]',
            '   Tech: MERN, Redis, Stripe, Google Maps API',
            '   → Full-stack platform for Purdue students',
            '',
            '2. Concurrent Key-Value Caching Engine [COMPLETED]',
            '   Tech: C++, Non-blocking I/O, Event Loops',
            '   → 40% performance improvement over standard systems',
            '',
            '3. Airbnb Price Tracker [COMPLETED]', 
            '   Tech: Python, Django, Selenium, BeautifulSoup, MySQL',
            '   → Monitoring 50+ properties with 12-hour intervals'
          ]
        
        case 'blog':
          return [
            'BLOG POSTS:',
            '===========',
            '',
            '1. ColBERT Made Simple: Step-by-Step PDF Search Engine with LangChain and RAGatouille',
            '   Date: Dec 2024 | Category: AI/ML',
            '   → Comprehensive guide to building PDF search engines',
            '   → Read: https://medium.com/@shreyanshtehanguria'
          ]
        
        case 'contact':
          return [
            'CONTACT INFORMATION:',
            '===================',
            '',
            'EMAIL: stehangu@purdue.edu',
            'GITHUB: @shreyanshtehanguria',
            'LINKEDIN: linkedin.com/in/shreyanshtehanguria',
            '',
            'AVAILABILITY:',
            '• Seeking internships & full-time SWE/ML/DS/AI roles',
            '• Response time: 2-4 hours',
            '• Location: West Lafayette, Indiana'
          ]
        
        default: // Home directory
          return [
            'SHREYANSH TEHANGURIA - PORTFOLIO TERMINAL',
            '========================================',
            '',
            'Rising Senior in Data Science @ Purdue University',
            'SWE by projects, Data Scientist by degree, AI Engineer by experience',
            '',
            'QUICK NAVIGATION:',
            '• cd experience  - View work history & skills',
            '• cd projects    - Explore technical projects', 
            '• cd blog        - Read technical articles',
            '• cd contact     - Get in touch',
            '',
            'CURRENT FOCUS: AI + Systems intersection, Performance optimization'
          ]
      }
    },
    
    pwd: () => [`/${currentPath}`],
    
    cd: (args: string[]) => {
      if (args.length === 0) {
        setCurrentPath('~')
        return [`Changed to /${currentPath}`]
      }
      
      const target = args[0]
      if (target === '..') {
        if (currentPath !== '~') {
          setCurrentPath('~')
          return ['Changed to /~']
        }
        return ['Already at root directory']
      }
      
      const current = fileSystem[currentPath]
      if (current?.directories.includes(target)) {
        setCurrentPath(target)
        return [`Changed to /${target}`]
      }
      
      return [`cd: ${target}: No such directory`]
    },
    
    cat: (args: string[]) => {
      if (args.length === 0) return ['cat: missing file operand']
      
      const fileName = args[0]
      const current = fileSystem[currentPath]
      
      if (!current?.files.includes(fileName)) {
        return [`cat: ${fileName}: No such file`]
      }
      
      // Mock file contents
      const fileContents = {
        'about.txt': [
          'ABOUT SHREYANSH TEHANGURIA',
          '==========================',
          'Rising Senior in Data Science @ Purdue University',
          'Location: West Lafayette, Indiana',
          '',
          'One person, too many roles —',
          'SWE by projects, Data Scientist by degree, AI Engineer by experience.',
          '',
          'Obsessed with speed: caching, compilation, compute.',
          'Building at the intersection of AI + Systems.',
          'Passionate about bare metal programming in C++.',
          'Always learning and reading about enhanced performance and speed.',
          'Self-taught programmer who loves fast, scalable systems.',
          '',
          'Tech Stack: C++, Python, JavaScript, MERN, PyTorch, Docker',
          'Hobbies: Tennis, Gym, Boxing, Reading about new tech',
          '',
          'Write code like stories: clear, efficient, slightly over-engineered.'
        ],
        'README.md': [
          '# Shreyansh Tehanguria - Portfolio Terminal',
          'Welcome to my interactive portfolio!',
          'Rising Senior in Data Science @ Purdue University',
          'SWE by projects, Data Scientist by degree, AI Engineer by experience',
          '',
          'Navigate using terminal commands or the menu above.',
          'Built with Next.js, TypeScript, and Tailwind CSS.',
          'Obsessed with speed: caching, compilation, compute.'
        ],
        'resume.pdf': ['[Binary file - cannot display]'],
        'email.txt': ['stehangu@purdue.edu'],
        'social.txt': ['GitHub: @shreyanshtehanguria', 'LinkedIn: linkedin.com/in/shreyanshtehanguria'],
        'skills.md': [
          '# Technical Skills',
          '## Languages',
          'C++, Python, SQL, JavaScript',
          '## Frameworks & Libraries',
          'MERN Stack (MongoDB, Express, React, Node.js)',
          'Django, Flask, FastAPI',
          'PyTorch, scikit-learn',
          '## Dev & Infrastructure',
          'Docker, Redis, PostgreSQL, Git',
          'Celery, RabbitMQ, Nginx, Jupyter',
          '## Focus Areas',
          'AI/ML, Full-stack Development, Systems Programming',
          'Performance Optimization, Caching, Scalability'
        ],
        'certifications.txt': [
          'CERTIFICATIONS',
          '==============',
          'Docker Foundations Professional Certificate',
          'Issued by: Docker, Inc.',
          'Date: June 2025',
          'Topics: Docker Products, Containerization, Deployment Best Practices'
        ],
        'work-history.txt': [
          'WORK HISTORY',
          '============',
          '',
          '1. AI ENGINEER INTERN | Legalgini (Jan 2025 – May 2025)',
          '   Location: Gurugram, India',
          '   • CoLBERT-based RAG pipeline: 70% → 96% accuracy improvement',
          '   • Gemini Flash LLM integration: 40% engagement boost',
          '   • Hybrid search pipeline: 400ms query latency',
          '',
          '2. AUTONOMOUS SYSTEMS RESEARCHER | Purdue University (Jan 2025 – May 2025)',
          '   Prof. J.M Goppert - West Lafayette, IN',
          '   • A*, RRT, RRT* navigation algorithms for NARCAN-delivery drone',
          '   • Intel RealSense 3D point-cloud → 2D occupancy grids',
          '   • 30% computational load reduction',
          '',
          '3. PROJECT MANAGER & TA | Purdue University (Aug 2023 – May 2024)',
          '   West Lafayette, IN',
          '   • Led 7-person research team across 40 states',
          '   • LSTM sentiment analysis: 95% accuracy',
          '   • Managed Hugging Face + custom dataset pipeline',
          '',
          '4. DATA SCIENCE RESEARCHER | Purdue University (Aug 2022 – May 2023)',
          '   West Lafayette, IN',
          '   • Agricultural sensor data: 30,000+ points per variable',
          '   • Optimized sampling intervals for processing efficiency',
          '   • Weather API evaluation and integration',
          '',
          'Current: Rising Senior in Data Science @ Purdue University',
          'Focus: AI + Systems intersection, Performance optimization'
        ],
        'boilerfixit.md': [
          '# BoilerFixIt',
          'Status: ONGOING',
          'Tech: MERN, Redis, Stripe, Google Maps API',
          'GitHub: https://github.com/Shreyansh-t/Boiler-Fixit',
          '',
          'Full-stack MERN platform streamlining appliance issue reporting for Purdue students.',
          '',
          'Key Features:',
          '• Integrated Stripe for secure payments',
          '• Google Maps API for distance-based pricing algorithm',
          '• Redis caching for performance optimization',
          '• Real-time tracking system',
          '• Designed for scalability across student communities',
          '',
          'Impact: Reduces user journey time and boosts engagement'
        ],
        'caching-engine.cpp': [
          '// Concurrent Key-Value Caching Engine',
          '// Tech: C++, Non-blocking I/O, Event Loops',
          '// GitHub: https://github.com/Shreyansh-t/Concurrent-Key-Value-Caching-Engine',
          '',
          'Redis-like in-memory key-value store implementation:',
          '',
          '• Event-driven, non-blocking IO architecture',
          '• Socket programming for concurrent client requests',
          '• Hash tables for O(1) average-time key lookups',
          '• AVL trees for balanced data storage',
          '• Core commands: GET, SET, DEL',
          '• Efficient connection management',
          '',
          'Performance: 40% optimization in access speed',
          'Date: June 2023 – July 2023'
        ],
        'airbnb-tracker.py': [
          '# Airbnb Price Tracker',
          '# Tech: Python, Django, Selenium, BeautifulSoup, MySQL',
          '# GitHub: https://github.com/Shreyansh-t/Airbnb-Price-Tracker',
          '',
          'Price tracking system features:',
          '',
          '• Monitor up to 50 properties simultaneously',
          '• 12-hour update intervals',
          '• Django REST API with 8 endpoints',
          '• Celery for asynchronous daily price checks',
          '• Optimized SQLite database schema',
          '• Location-based queries and occupancy filtering',
          '',
                     'Built for third-party integrations and fast query performance',
           'Date: May 2024 – June 2024'
         ],
         'contact-form.txt': [
           'CONTACT FORM',
           '============',
           'Interactive contact form available on website',
           'Location: Contact section',
           '',
           'Form fields:',
           '• Name',
           '• Email', 
           '• Subject',
           '• Message',
           '',
                       'Messages sent directly to: stehangu@purdue.edu',
            'Response time: 2-4 hours'
         ],
         'availability.txt': [
           'AVAILABILITY STATUS',
           '==================',
           'Current: Rising Senior @ Purdue University (Data Science)',
           'Location: West Lafayette, Indiana',
           '',
           'SEEKING:',
           '• Internships (Summer 2025, Fall 2025)',
           '• Full-time roles (Starting 2026)',
           '',
           'TARGET ROLES:',
           '• Software Engineering (SWE)',
           '• Machine Learning Engineer (ML)',
           '• Data Scientist (DS)', 
           '• AI Engineer (AI)',
           '',
           'FOCUS AREAS:',
           '• AI + Systems intersection',
           '• Performance optimization',
           '• Scalable system design',
           '',
                       'Contact: stehangu@purdue.edu',
            'Response time: 2-4 hours'
         ]
      }
      
      return fileContents[fileName as keyof typeof fileContents] || ['[File content not available]']
    },
    
    touch: (args: string[]) => {
      if (args.length === 0) return ['touch: missing file operand']
      return [`Created/accessed: ${args[0]}`]
    },
    
    clear: () => {
      setHistory([])
      return []
    },
    
    exit: () => {
      setIsTerminalMode(false)
      return ['Exiting terminal mode...']
    }
  }

  const executeCommand = (input: string) => {
    const parts = input.trim().split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)
    
    if (command === '') return []
    
    if (commands[command as keyof typeof commands]) {
      return commands[command as keyof typeof commands](args)
    }
    
    return [`Command not found: ${command}. Type 'help' for available commands.`]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const output = executeCommand(currentInput)
    const newCommand: Command = {
      input: currentInput,
      output,
      path: currentPath
    }
    
    setHistory(prev => [...prev, newCommand])
    setCurrentInput('')
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(history[history.length - 1 - newIndex].input)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(history[history.length - 1 - newIndex].input)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput('')
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="border border-terminal-fg border-glow bg-terminal-bg p-3 sm:p-4 h-80 sm:h-96 overflow-hidden">
      <div className="text-xs mb-2 text-terminal-gray">
        TERMINAL v1.0 - Type 'help' for commands
      </div>
      
      <div 
        ref={terminalRef}
        className="h-64 sm:h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-terminal-fg"
      >
        {history.map((cmd, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center flex-wrap text-xs sm:text-sm">
              <span className="text-terminal-gray mr-1 sm:mr-2">shreyansh@portfolio:</span>
              <span className="text-terminal-fg mr-1 sm:mr-2">/{cmd.path}</span>
              <span className="text-terminal-gray mr-1 sm:mr-2">$</span>
              <span className="text-terminal-white break-all">{cmd.input}</span>
            </div>
            {cmd.output.map((line, lineIndex) => (
              <div key={lineIndex} className="text-terminal-fg ml-2 sm:ml-4 text-xs sm:text-sm break-all">
                {line}
              </div>
            ))}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center flex-wrap text-xs sm:text-sm">
          <span className="text-terminal-gray mr-1 sm:mr-2">shreyansh@portfolio:</span>
          <span className="text-terminal-fg mr-1 sm:mr-2">/{currentPath}</span>
          <span className="text-terminal-gray mr-1 sm:mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-terminal-white text-xs sm:text-sm"
            autoFocus
          />
          <span className="text-terminal-cursor animate-blink">█</span>
        </form>
      </div>
    </div>
  )
}

export default Terminal 