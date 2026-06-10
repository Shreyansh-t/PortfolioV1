'use client'

import { useState } from 'react'

const CATEGORIES = ['All', 'Database Systems', 'C++', 'Full Stack', 'RAG / ML', 'Research'] as const
type Category = typeof CATEGORIES[number]

interface Project {
  id: string
  name: string
  summary: string
  tech: string[]
  date: string | null
  github: string | null
  categories: Category[]
  bullets: string[]
  dbLabel: string
  note: string | null
}

const PROJECTS: Project[] = [
  {
    id: 'ub_abtree',
    name: 'AB-Tree Index Research',
    summary: "Studying AB-Tree sampling indexes and DuckDB's indexing internals at the Analytical Database Lab, University at Buffalo.",
    tech: ['C++', 'DuckDB', 'GDB'],
    date: 'Apr 2026 – Present',
    github: null,
    categories: ['Database Systems', 'C++', 'Research'],
    bullets: [
      'Studying AB-Tree sampling indexes and their relationship to range and point-indexing workloads.',
      "Reverse-engineered DuckDB's CREATE INDEX pipeline using GDB.",
      'Investigating bulk-loading and merge workflows for AB-Tree-style sampling indexes in an in-memory analytical context.',
    ],
    dbLabel: 'index: ab_tree_research_idx',
    note: null,
  },
  {
    id: 'trading_engine',
    name: 'Low-Latency C++ Trading Engine',
    summary: 'C++ trading exchange focused on low-latency matching, memory optimization, and high-throughput market data publishing.',
    tech: ['C++', 'Sockets', 'AF_XDP', 'Lock-Free Queues'],
    date: 'Jun 2025 – Aug 2025',
    github: 'https://github.com/Shreyansh-t/kernel-bypass-trading-exchange',
    categories: ['C++'],
    bullets: [
      'Built a low-latency exchange with lock-free queues and a custom memory pool.',
      'Benchmarked 200K match events/sec and 1K inserts/sec under synthetic load.',
      'Optimized memory pool performance from 343 to 44 CPU cycles/op.',
      'Used AF_XDP socket TX path with custom raw Ethernet headers to improve market data publishing throughput from 1.2M to 5.2M updates/sec.',
    ],
    dbLabel: 'index: trading_engine_idx',
    note: null,
  },
  {
    id: 'boilerfixit',
    name: 'BoilerFixit',
    summary: 'Campus-focused MERN application for students to book repair services with dynamic pricing based on location and urgency.',
    tech: ['MongoDB', 'Node.js', 'React.js', 'Express.js', 'Redis', 'Stripe', 'k6'],
    date: 'Jun 2025 – Oct 2025',
    github: 'https://github.com/Shreyansh-t/Boiler-Fixit',
    categories: ['Full Stack'],
    bullets: [
      'Integrated Google Maps API for real-time address validation.',
      'Integrated Stripe for secure payments.',
      'Used Redis caching to reduce workflow time.',
      'Load-tested with k6 to support 25,000 API requests/minute with under 300ms average latency and p95 under 500ms under simulated concurrency, with zero failures during test runs.',
    ],
    dbLabel: 'primary_key: boilerfixit_2025',
    note: null,
  },
  {
    id: 'video_analyst',
    name: 'Video Analyst AI',
    summary: 'Full-stack RAG chatbot that takes YouTube and Instagram video URLs, extracts transcripts and metadata, and lets users chat with an AI over video content.',
    tech: ['FastAPI', 'React', 'LangGraph', 'Qdrant', 'Llama 3.3 70B', 'Whisper', 'yt-dlp'],
    date: null,
    github: 'https://github.com/Shreyansh-t/Video-Content-Analysis-RAG-Tool',
    categories: ['RAG / ML', 'Full Stack'],
    bullets: [
      'Extracts transcripts and metadata (views, likes, comments, creator, duration).',
      'Computes engagement rate using (likes + comments) / views × 100.',
      'Chunks transcripts and stores embeddings in Qdrant for retrieval.',
      'Uses session-scoped vector search so one user\'s video context does not leak into another.',
      'Uses separate LangGraph flows for ingestion and chat.',
    ],
    dbLabel: 'index: video_analyst_rag_idx',
    note: 'Known limitations: in-memory Qdrant, single-server deployment, no auth — planned for future work.',
  },
  {
    id: 'airbnb_tracker',
    name: 'Airbnb Price Tracker',
    summary: 'Airbnb price tracking system that monitors property prices and exposes a Django API for integrations.',
    tech: ['Python', 'Django', 'Selenium', 'BeautifulSoup', 'MySQL/SQLite', 'Celery'],
    date: 'May 2024 – Jun 2024',
    github: 'https://github.com/Shreyansh-t/Airbnb-Price-Tracker',
    categories: ['Full Stack'],
    bullets: [
      'Built a tracker for monitoring up to 50 properties with 12-hour update intervals.',
      'Developed a Django REST API with 8 endpoints for third-party integrations.',
      'Used Celery for asynchronous scheduled price checks.',
      'Optimized the database schema for faster price-history queries with location-based and occupancy filtering.',
    ],
    dbLabel: 'primary_key: airbnb_tracker_2024',
    note: 'TODO: Confirm exact database used — MySQL or SQLite.',
  },
  {
    id: 'credify',
    name: 'Credify',
    summary: 'Chrome extension that analyzes Reddit posts and displays credibility information directly inside Reddit.',
    tech: ['JavaScript', 'Chrome Extension Manifest V3', 'MutationObserver', 'Shadow DOM', 'CSS'],
    date: 'CalHacks Berkeley, Oct 2025',
    github: null,
    categories: ['Full Stack'],
    bullets: [
      'Injects "Credify Post" buttons into Reddit posts using MutationObserver.',
      'Displays a credibility score, flags, and post metadata in a modal.',
      "Handles Reddit's changing DOM and shadow roots.",
      'Uses Chrome local storage for cached analysis results.',
    ],
    dbLabel: 'primary_key: credify_calhacks_2025',
    note: 'Currently uses mock data — real credibility API/ML integration is planned.',
  },
  {
    id: 'boilerbridge',
    name: 'BoilerBridge',
    summary: 'Group travel planning app built for Purdue students to coordinate trips, itineraries, voting, expenses, and AI-generated suggestions.',
    tech: ['Next.js', 'Node.js', 'MongoDB Atlas', 'Vercel'],
    date: 'Feb 2026 – May 2026',
    github: 'https://github.com/xmarable/CS307-Team26-BoilerBridge',
    categories: ['Full Stack'],
    bullets: [
      'CS 307 group project for Purdue-focused group travel planning.',
      'Supports travel groups, itinerary coordination, voting, shared expenses, and AI itinerary generation.',
      'Uses Next.js with MongoDB Atlas and Vercel deployment.',
    ],
    dbLabel: 'primary_key: boilerbridge_2026',
    note: 'Group project — contributed as part of a team.',
  },
]

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter(p => (p.categories as readonly string[]).includes(activeCategory))

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p
            className="font-mono text-xs tracking-widest mb-2"
            style={{ color: 'rgba(200,169,106,0.6)' }}
          >
            SELECT * FROM projects WHERE category = &apos;{activeCategory}&apos;;
          </p>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#E8E3D8' }}>Projects</h2>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 text-sm rounded-full transition-all"
                style={
                  activeCategory === cat
                    ? { background: '#C8A96A', color: '#111315', border: '1px solid #C8A96A', fontWeight: 500 }
                    : {
                        border: '1px solid rgba(200,169,106,0.3)',
                        color: '#A8A096',
                        background: 'transparent',
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(project => (
            <div
              key={project.id}
              className="rounded-lg p-5 flex flex-col transition-colors"
              style={{ background: '#171A1C', border: '1px solid rgba(200,169,106,0.18)' }}
            >
              <p
                className="font-mono text-xs tracking-wide mb-3"
                style={{ color: 'rgba(200,169,106,0.45)' }}
              >
                {project.dbLabel}
              </p>

              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-base" style={{ color: '#E8E3D8' }}>
                  {project.name}
                </h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 transition-colors"
                    style={{ color: '#A8A096' }}
                    aria-label={`View ${project.name} on GitHub`}
                  >
                    <GitHubIcon />
                  </a>
                )}
              </div>

              {project.date && (
                <p className="font-mono text-xs mb-2" style={{ color: '#A8A096' }}>
                  {project.date}
                </p>
              )}

              <p className="text-sm leading-relaxed mb-3" style={{ color: '#A8A096' }}>
                {project.summary}
              </p>

              <ul className="space-y-1.5 mb-4 flex-1">
                {project.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-xs leading-relaxed" style={{ color: '#E8E3D8' }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: 'rgba(200,169,106,0.5)' }}>▸</span>
                    {b}
                  </li>
                ))}
              </ul>

              {project.note && (
                <p
                  className="font-mono text-xs rounded p-2 mb-3"
                  style={{
                    color: '#A8A096',
                    background: 'rgba(200,169,106,0.06)',
                    border: '1px solid rgba(200,169,106,0.1)',
                  }}
                >
                  {project.note}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs rounded"
                    style={{
                      color: '#A8A096',
                      background: 'rgba(200,169,106,0.06)',
                      border: '1px solid rgba(200,169,106,0.12)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
