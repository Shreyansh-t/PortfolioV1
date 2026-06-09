'use client'

import React, { useState, useEffect, useRef } from 'react'

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

const Terminal: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('~')
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
      files: ['trading-engine.cpp', 'video-analyst.py', 'credify.js', 'boilerfixit.md', 'airbnb-tracker.py', 'README.md'],
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
      '  cd DIR   - change directory (experience, projects, blog, contact)',
      '  pwd      - print working directory',
      '  cat FILE - display file contents',
      '  clear    - clear terminal',
      '  exit     - reset terminal to root',
      '  help     - show this help message'
    ],

    ls: () => {
      switch (currentPath) {
        case 'experience':
          return [
            'WORK EXPERIENCE:',
            '================',
            '',
            '1. SYSTEMS_RESEARCH_INTERN',
            '   Analytical Database Lab, University at Buffalo | Under Prof. Zhao | April 2026 – Present',
            '   • Architecting AB-Tree index in DuckDB C++ codebase for high-performance random sampling',
            '   • Audited DuckDB execution pipeline, analyzing ART implementation lifecycle',
            '   • Engineered bulk-loading mechanism for AB-Trees at database chunk level',
            '   • Designing async merging pipeline to optimize OLAP query execution paths',
            '   Stack: C++, GDB, DuckDB Internals, OLAP Database Systems, Systems Programming',
            '',
            '2. AI_ENGINEER_INTERN',
            '   Company: Legalgini | Location: Gurugram, India | Duration: Jan 2025 – May 2025',
            '   • CoLBERT-based RAG pipeline: 70% → 96% accuracy improvement',
            '   • Gemini Flash LLM integration: 40% engagement boost',
            '',
            '3. AUTONOMOUS_SYSTEMS_RESEARCHER',
            '   Prof. J.M Goppert - Purdue University | Duration: Jan 2025 – May 2025',
            '   • A*, RRT, RRT* navigation algorithms for NARCAN-delivery drone',
            '   • 30% computational load reduction',
            '',
            '4. PROJECT_MANAGER_&_TA',
            '   Purdue University | Duration: Aug 2023 – May 2024',
            '   • Led team of 7 researchers across 40 states',
            '   • LSTM sentiment analysis: 95% accuracy',
            '',
            '5. DATA_SCIENCE_RESEARCHER',
            '   Purdue University | Duration: Aug 2022 – May 2023',
            '   • Agricultural sensor data: 30,000+ points per variable',
            '   • Optimized data sampling for processing efficiency'
          ]

        case 'projects':
          return [
            'PROJECTS:',
            '=========',
            '',
            '1. Low-Latency C++ Trading Engine [COMPLETED — Aug 2025]',
            '   Tech: C++, AF_XDP, Lock-free Queues, Kernel Bypass',
            '   → 200K match events/sec, 5.2M market data updates/sec',
            '   → Memory pool: 343→44 CPU cycles/op',
            '',
            '2. Video Analyst AI — RAG Chatbot for Video Content Analysis [June 2026]',
            '   Tech: Python, FastAPI, React, LangGraph, Qdrant, Llama 3.3, Whisper AI',
            '   → Parallel LangGraph execution graphs isolating async ingestion from chat sessions',
            '   → Session-scoped UUID filtering in Qdrant for zero cross-user data leakage',
            '',
            '3. Credify [CalHacks Berkeley Winner — Oct 2025]',
            '   Tech: JavaScript (ES6+), Node.js, Chrome Extensions API, Shadow DOM',
            '   → LLM-driven agentic workflows for social content credibility grading',
            '   → MutationObserver DOM traversal through Reddit nested shadow DOM',
            '',
            '4. BoilerFixIt [ONGOING]',
            '   Tech: MERN, Redis, Stripe, Google Maps API',
            '   → Full-stack platform for Purdue students',
            '',
            '5. Airbnb Price Tracker [COMPLETED]',
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

        default:
          return [
            'SHREYANSH TEHANGURIA — PORTFOLIO TERMINAL',
            '==========================================',
            '',
            'Rising Senior in Data Science @ Purdue University',
            'SWE by projects, Data Scientist by degree, AI Engineer by experience',
            '',
            'DIRECTORIES:',
            '• cd experience  - Work history & research roles',
            '• cd projects    - Technical project showcase',
            '• cd blog        - Technical articles',
            '• cd contact     - Get in touch',
            '',
            'CURRENT FOCUS: AI + Systems intersection, Performance optimization'
          ]
      }
    },

    pwd: () => [currentPath === '~' ? '/~' : `/~/${currentPath}`],

    cd: (args: string[]) => {
      if (args.length === 0) {
        setCurrentPath('~')
        return ['Changed to /~']
      }

      const target = args[0]
      if (target === '~' || target === '/') {
        setCurrentPath('~')
        return ['Changed to /~']
      }
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
        return [`Changed to /~/${target}`]
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

      const fileContents: { [key: string]: string[] } = {
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
          '',
          'Tech Stack: C++, Python, JavaScript, MERN, PyTorch, Docker',
          'Hobbies: Tennis, Gym, Boxing, Reading about new tech',
          '',
          'Write code like stories: clear, efficient, slightly over-engineered.'
        ],
        'README.md': [
          '# Shreyansh Tehanguria — Portfolio Terminal',
          'Rising Senior in Data Science @ Purdue University',
          'SWE by projects, Data Scientist by degree, AI Engineer by experience',
          '',
          'Navigate using terminal commands or the menu above.',
          'Built with Next.js, TypeScript, and Tailwind CSS.'
        ],
        'resume.pdf': ['[Binary file — cannot display]'],
        'email.txt': ['stehangu@purdue.edu'],
        'social.txt': ['GitHub: @shreyanshtehanguria', 'LinkedIn: linkedin.com/in/shreyanshtehanguria'],
        'skills.md': [
          '# Technical Skills',
          '## Languages',
          'C++, Python, SQL, JavaScript',
          '## Frameworks & Libraries',
          'MERN Stack, Django, Flask, FastAPI',
          'PyTorch, scikit-learn, LangGraph',
          '## Infrastructure',
          'Docker, Redis, PostgreSQL, Qdrant, Nginx',
          '## Focus Areas',
          'AI/ML, Systems Programming, Performance Optimization'
        ],
        'certifications.txt': [
          'CERTIFICATIONS',
          '==============',
          'Docker Foundations Professional Certificate',
          'Issued by: Docker, Inc. | Date: June 2025'
        ],
        'work-history.txt': [
          'WORK HISTORY',
          '============',
          '',
          '1. SYSTEMS RESEARCH INTERN | Analytical DB Lab, UB (Apr 2026 – Present)',
          '   Under Prof. Zhao — University at Buffalo',
          '   • Architecting AB-Tree index in DuckDB C++ for random indexing & sampling',
          '   • Audited DuckDB execution pipeline and ART implementation lifecycle',
          '   • Engineered bulk-loading mechanism for AB-Trees at database chunk level',
          '   • Designing async merging pipeline for OLAP workload optimization',
          '   Stack: C++, GDB, DuckDB Internals, OLAP Database Systems',
          '',
          '2. AI ENGINEER INTERN | Legalgini (Jan 2025 – May 2025)',
          '   Location: Gurugram, India',
          '   • CoLBERT-based RAG pipeline: 70% → 96% accuracy improvement',
          '   • Gemini Flash LLM integration: 40% engagement boost',
          '   • Hybrid search pipeline: 400ms query latency',
          '',
          '3. AUTONOMOUS SYSTEMS RESEARCHER | Purdue University (Jan 2025 – May 2025)',
          '   Prof. J.M Goppert — West Lafayette, IN',
          '   • A*, RRT, RRT* navigation for autonomous NARCAN-delivery drone',
          '   • Intel RealSense 3D point-cloud → 2D occupancy grids',
          '   • 30% computational load reduction',
          '',
          '4. PROJECT MANAGER & TA | Purdue University (Aug 2023 – May 2024)',
          '   • Led 7-person research team across 40 states',
          '   • LSTM sentiment analysis: 95% accuracy',
          '',
          '5. DATA SCIENCE RESEARCHER | Purdue University (Aug 2022 – May 2023)',
          '   • Agricultural sensor data: 30,000+ points per variable',
          '   • Optimized sampling intervals for processing efficiency'
        ],
        'trading-engine.cpp': [
          '// Low-Latency C++ Trading Engine',
          '// Tech: C++, AF_XDP, Lock-free Queues, Kernel Bypass',
          '// GitHub: github.com/Shreyansh-t/kernel-bypass-trading-exchange',
          '',
          '• 200K match events/sec and 1K inserts/sec under synthetic load',
          '• Kernel network stack bypass via AF_XDP sockets: 1.2M → 5.2M updates/sec',
          '• Memory pool optimization: 343 → 44 CPU cycles/operation',
          '',
          'Duration: June 2025 – August 2025'
        ],
        'video-analyst.py': [
          '# Video Analyst AI — RAG Chatbot for Video Content Analysis',
          '# Tech: Python, FastAPI, React, LangGraph, Qdrant, Llama 3.3, Whisper AI',
          '# Duration: June 2026',
          '',
          'Key Features:',
          '• Decoupled parallel LangGraph execution graphs isolating async media',
          '  ingestion workflows from stateful user chat sessions',
          '• FastAPI backend with session-scoped UUID metadata filtering in Qdrant',
          '  — guarantees zero cross-user data leakage',
          '• Automated fallback ingestion via yt-dlp + OpenAI Whisper for videos',
          '  lacking native closed-caption tracks',
          '',
          'Stack: Python, FastAPI, React, LangGraph, Qdrant, Llama 3.3 (Groq),',
          '       Whisper AI, HuggingFace (all-MiniLM-L6-v2)'
        ],
        'credify.js': [
          '// Credify — CalHacks Berkeley Hackathon Winner',
          '// Tech: JavaScript (ES6+), Node.js, Chrome Extensions API',
          '// Duration: October 2025',
          '',
          'Key Features:',
          '• LLM-driven agentic workflows grading social text for logical discrepancy',
          '  flags and validity matrices',
          '• High-performance DOM traversal penetrating Reddit nested shadow DOM',
          '  using MutationObserver API',
          '• chrome.storage caching eliminating redundant LLM inference calls',
          '  and network round-trip overhead',
          '',
          'Award: Winner — CalHacks Berkeley Hackathon, October 2025',
          'Stack: JavaScript (ES6+), Node.js, Chrome Extensions API, Shadow DOM'
        ],
        'boilerfixit.md': [
          '# BoilerFixIt',
          'Status: ONGOING',
          'Tech: MERN, Redis, Stripe, Google Maps API',
          'GitHub: github.com/Shreyansh-t/Boiler-Fixit',
          '',
          '• Integrated Stripe for secure payments',
          '• Google Maps API for distance-based pricing algorithm',
          '• Redis caching for performance optimization',
          '• Real-time tracking system for scalability'
        ],
        'airbnb-tracker.py': [
          '# Airbnb Price Tracker',
          '# Tech: Python, Django, Selenium, BeautifulSoup, MySQL',
          '# GitHub: github.com/Shreyansh-t/Airbnb-Price-Tracker',
          '',
          '• Monitor up to 50 properties simultaneously, 12-hour intervals',
          '• Django REST API with 8 endpoints',
          '• Celery for asynchronous daily price checks',
          '• Optimized SQLite schema for query performance',
          '',
          'Date: May 2024 – June 2024'
        ],
        'contact-form.txt': [
          'CONTACT FORM',
          '============',
          'Interactive contact form available in the Contact section.',
          '',
          'Form fields: Name, Email, Subject, Message',
          'Delivered to: stehangu@purdue.edu',
          'Response time: 2-4 hours'
        ],
        'availability.txt': [
          'AVAILABILITY STATUS',
          '==================',
          'Current: Rising Senior @ Purdue University (Data Science)',
          'Location: West Lafayette, Indiana',
          '',
          'SEEKING:',
          '• Internships (Fall 2025, Summer 2026)',
          '• Full-time roles (Starting 2026)',
          '',
          'TARGET ROLES: SWE, ML Engineer, Data Scientist, AI Engineer',
          'FOCUS: AI + Systems intersection, Performance optimization',
          '',
          'Contact: stehangu@purdue.edu'
        ]
      }

      return fileContents[fileName] || ['[File content not available]']
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
      setHistory([])
      setCurrentPath('~')
      return []
    }
  }

  const executeCommand = (input: string) => {
    const parts = input.trim().split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    if (command === '') return []

    if (commands[command as keyof typeof commands]) {
      return (commands[command as keyof typeof commands] as (args: string[]) => string[])(args)
    }

    return [`command not found: ${command}. Type 'help' for available commands.`]
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

  const promptPath = currentPath === '~' ? '~' : `~/${currentPath}`

  return (
    <div className="bg-transparent" onClick={() => inputRef.current?.focus()}>
      <div className="text-xs mb-3 text-terminal-gray">
        TERMINAL v1.0 — Type &apos;help&apos; for commands | &apos;ls&apos; to explore | &apos;cd DIR&apos; to navigate
      </div>

      <div
        ref={terminalRef}
        className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-terminal-fg"
      >
        {history.map((cmd, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center flex-wrap text-xs sm:text-sm">
              <span className="text-terminal-gray mr-1">shreyansh@system:</span>
              <span className="text-terminal-fg mr-1">{cmd.path === '~' ? '~' : `~/${cmd.path}`}</span>
              <span className="text-terminal-gray mr-2">$</span>
              <span className="text-terminal-white break-all">{cmd.input}</span>
            </div>
            {cmd.output.map((line, lineIndex) => (
              <div key={lineIndex} className="text-terminal-fg ml-4 text-xs sm:text-sm break-all whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center flex-wrap text-xs sm:text-sm">
          <span className="text-terminal-gray mr-1">shreyansh@system:</span>
          <span className="text-terminal-fg mr-1">{promptPath}</span>
          <span className="text-terminal-gray mr-2">$</span>
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
