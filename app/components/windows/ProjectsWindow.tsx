'use client'

import { useState } from 'react'

interface Project {
  id: string
  name: string
  category: string
  github: string | null
  tech: string[]
  period?: string
  summary: string
  bullets: string[]
  note?: string
}

const PROJECTS: Project[] = [
  {
    id: 'boilerfixit',
    name: 'BoilerFixit',
    category: 'full-stack',
    github: 'https://github.com/Shreyansh-t/Boiler-Fixit',
    tech: ['MongoDB', 'Node.js', 'React.js', 'Express.js', 'Redis', 'Stripe', 'k6'],
    period: 'June 2025 – October 2025',
    summary: 'Campus-focused MERN application for students to book repair services with dynamic pricing based on location and urgency.',
    bullets: [
      'Integrated Google Maps API for real-time address validation.',
      'Integrated Stripe for secure payments.',
      'Used Redis caching to reduce workflow time.',
      'Load-tested with k6 to support 25,000 API requests/minute with under 300ms average latency and p95 under 500ms under simulated concurrency, with zero failures during test runs.',
    ],
  },
  {
    id: 'trading',
    name: 'Low-Latency C++ Trading Engine',
    category: 'systems',
    github: 'https://github.com/Shreyansh-t/kernel-bypass-trading-exchange',
    tech: ['C++', 'Sockets', 'AF_XDP', 'lock-free queues'],
    period: 'June 2025 – August 2025',
    summary: 'C++ trading exchange focused on low-latency matching, memory optimization, and high-throughput market data publishing.',
    bullets: [
      'Built a low-latency exchange with lock-free queues and a custom memory pool.',
      'Benchmarked 200K match events/sec and 1K inserts/sec under synthetic load.',
      'Optimized memory pool performance from 343 to 44 CPU cycles/op.',
      'Used AF_XDP socket TX path with custom raw Ethernet headers to improve market data publishing throughput from 1.2M to 5.2M updates/sec.',
    ],
  },
  {
    id: 'videoanalyst',
    name: 'Video Analyst AI',
    category: 'rag-ml',
    github: 'https://github.com/Shreyansh-t/Video-Content-Analysis-RAG-Tool',
    tech: ['FastAPI', 'React', 'LangGraph', 'Qdrant', 'Llama 3.3 70B', 'Whisper', 'yt-dlp'],
    summary: 'Full-stack RAG chatbot that takes YouTube/Instagram video URLs, extracts transcripts and metadata, and enables AI-powered chat over video content.',
    bullets: [
      'Extracts transcripts and metadata (views, likes, comments, creator, duration).',
      'Computes engagement rate using (likes + comments) / views × 100.',
      'Chunks transcripts and stores embeddings in Qdrant for retrieval.',
      'Uses session-scoped vector search so one user\'s video context does not leak into another\'s.',
      'Uses separate LangGraph flows for ingestion and chat.',
    ],
  },
  {
    id: 'airbnb',
    name: 'Airbnb Price Tracker',
    category: 'full-stack',
    github: 'https://github.com/Shreyansh-t/Airbnb-Price-Tracker',
    tech: ['Python', 'Django', 'Selenium', 'BeautifulSoup', 'MySQL/SQLite', 'Celery'],
    period: 'May 2024 – June 2024',
    summary: 'Airbnb price tracking system that monitors property prices and exposes a Django API for integrations.',
    bullets: [
      'Built a tracker for monitoring up to 50 properties with 12-hour update intervals.',
      'Developed a Django REST API with 8 endpoints for third-party integrations.',
      'Used Celery for asynchronous scheduled price checks.',
      'Optimized the database schema for faster price-history queries with location-based and occupancy filtering.',
    ],
    note: 'Database: MySQL/SQLite (to be confirmed)',
  },
  {
    id: 'credify',
    name: 'Credify',
    category: 'browser-extension',
    github: null,
    tech: ['JavaScript', 'Chrome Extension Manifest V3', 'MutationObserver', 'Shadow DOM'],
    period: 'October 2025 — CalHacks Berkeley',
    summary: 'Chrome extension that analyzes Reddit posts and displays credibility information directly inside Reddit.',
    bullets: [
      'Injects "Credify Post" buttons into Reddit posts using MutationObserver.',
      'Displays a credibility score, flags, and post metadata in a modal.',
      'Handles Reddit\'s changing DOM and shadow roots.',
      'Uses Chrome local storage for cached analysis results.',
    ],
    note: 'Currently uses mock data; real credibility API/ML model not yet integrated.',
  },
  {
    id: 'boilerbridge',
    name: 'BoilerBridge',
    category: 'full-stack',
    github: 'https://github.com/xmarable/CS307-Team26-BoilerBridge',
    tech: ['Next.js', 'Node.js', 'MongoDB Atlas', 'Vercel'],
    period: 'Feb 2026 – May 2026',
    summary: 'Group travel planning app built for Purdue students to coordinate trips, itineraries, voting, expenses, and AI-generated suggestions.',
    bullets: [
      'Worked on a team building a Purdue-focused group travel planning app.',
      'Supports travel groups, itinerary coordination, voting, shared expenses, and AI itinerary generation.',
      'Uses Next.js with MongoDB Atlas and Vercel deployment.',
    ],
    note: 'Group project — built with a team.',
  },
]

const CATEGORIES = [
  { id: 'all',               label: 'all/' },
  { id: 'systems',           label: 'systems/' },
  { id: 'rag-ml',            label: 'rag-ml/' },
  { id: 'full-stack',        label: 'full-stack/' },
  { id: 'browser-extension', label: 'browser-extension/' },
]

const mono: React.CSSProperties = { fontFamily: '"JetBrains Mono", monospace' }

export default function ProjectsWindow() {
  const [category, setCategory]         = useState('all')
  const [selectedId, setSelectedId]     = useState<string | null>(null)

  const filtered = category === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === category)
  const project  = selectedId ? PROJECTS.find(p => p.id === selectedId) ?? null : null

  return (
    <div className="os-split">
      {/* Sidebar — categories */}
      <nav className="os-split-sidebar" aria-label="Project categories">
        <div style={{ ...mono, fontSize: '10px', color: '#5A5040', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 12px', borderBottom: '1px solid rgba(201,169,93,0.1)', flexShrink: 0, whiteSpace: 'nowrap', alignSelf: 'center' }}>
          /Projects
        </div>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setCategory(cat.id); setSelectedId(null) }}
            aria-current={category === cat.id ? 'true' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 12px',
              background: category === cat.id ? 'rgba(201,169,93,0.1)' : 'transparent',
              border: 'none',
              borderLeft: category === cat.id ? '2px solid #C9A95D' : '2px solid transparent',
              cursor: 'pointer',
              ...mono,
              fontSize: '12px',
              color: category === cat.id ? '#C9A95D' : '#7F7665',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Main pane */}
      <div className="os-split-main os-scroll">
        {project ? (
          /* Project detail */
          <div style={{ padding: '22px 26px' }}>
            <button
              onClick={() => setSelectedId(null)}
              style={{ ...mono, background: 'none', border: 'none', color: '#C9A95D', cursor: 'pointer', fontSize: '12px', marginBottom: '18px', padding: 0 }}
            >
              ← back
            </button>

            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#E8E0C8', marginBottom: '5px' }}>{project.name}</h2>
            {project.period && <p style={{ ...mono, fontSize: '12px', color: '#5A5040', marginBottom: '10px' }}>{project.period}</p>}
            <p style={{ color: '#AFA68F', fontSize: '14px', lineHeight: 1.65, marginBottom: '16px' }}>{project.summary}</p>

            {project.note && (
              <div style={{ ...mono, padding: '8px 12px', background: 'rgba(184,92,76,0.07)', border: '1px solid rgba(184,92,76,0.18)', borderRadius: '3px', fontSize: '12px', color: '#AFA68F', marginBottom: '16px' }}>
                Note: {project.note}
              </div>
            )}

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '20px' }}>
              {project.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', color: '#AFA68F', fontSize: '14px', lineHeight: 1.65 }}>
                  <span style={{ color: '#C9A95D', opacity: 0.5, flexShrink: 0 }}>→</span>
                  {b}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
              {project.tech.map(t => (
                <span key={t} style={{ ...mono, padding: '3px 9px', border: '1px solid rgba(201,169,93,0.15)', borderRadius: '3px', fontSize: '11px', color: '#7F7665' }}>{t}</span>
              ))}
            </div>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...mono, display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: '1px solid rgba(201,169,93,0.35)', borderRadius: '3px', color: '#C9A95D', fontSize: '13px', textDecoration: 'none' }}
              >
                ↗ View on GitHub
              </a>
            )}
          </div>
        ) : (
          /* File list */
          <div style={{ padding: '12px 14px' }}>
            <p style={{ ...mono, fontSize: '10px', color: '#3A3028', padding: '4px 2px', marginBottom: '10px' }}>
              {filtered.length} file{filtered.length !== 1 ? 's' : ''}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {filtered.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '13px 14px',
                    background: 'rgba(201,169,93,0.03)',
                    border: '1px solid rgba(201,169,93,0.1)',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 100ms, border-color 100ms',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,93,0.07)'; e.currentTarget.style.borderColor = 'rgba(201,169,93,0.28)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,169,93,0.03)'; e.currentTarget.style.borderColor = 'rgba(201,169,93,0.1)' }}
                >
                  <span style={{ color: '#C9A95D', opacity: 0.45, fontSize: '20px', lineHeight: 1, flexShrink: 0, marginTop: '1px' }}>■</span>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#E8E0C8', marginBottom: '4px' }}>{p.name}</p>
                    <p style={{ fontSize: '13px', color: '#7F7665', lineHeight: 1.5, marginBottom: '8px' }}>{p.summary}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {p.tech.slice(0, 4).map(t => (
                        <span key={t} style={{ ...mono, padding: '1px 7px', border: '1px solid rgba(201,169,93,0.12)', borderRadius: '2px', fontSize: '11px', color: '#5A5040' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
