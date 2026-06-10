'use client'

import { useState } from 'react'

interface Experience {
  id: string
  shortTitle: string
  shortOrg: string
  title: string
  org: string
  advisor?: string
  period: string
  active: boolean
  bullets: string[]
  tags: string[]
  metrics?: string[]
}

const EXPERIENCES: Experience[] = [
  {
    id: 'ub',
    shortTitle: 'Research Intern',
    shortOrg: 'Univ. at Buffalo',
    title: 'Research Assistant / Systems Research Intern',
    org: 'Analytical Database Lab, University at Buffalo',
    advisor: 'Prof. Zhao',
    period: 'Apr 2026 – Present',
    active: true,
    bullets: [
      'Studying sampling-oriented index structures, with a focus on AB-Tree design and how it relates to point and range access patterns in analytical database systems.',
      'Reading the AB-Tree codebase and related indexing papers to understand its sampling, storage, and bulk-loading behavior.',
      'Used GDB to trace DuckDB\'s CREATE INDEX execution path and understand how index binding, planning, and construction flow through the codebase.',
      'Investigating how bulk-loading and merge workflows could be designed for AB-Tree-style sampling indexes in an in-memory analytical database setting.',
    ],
    tags: ['C++', 'DuckDB', 'Database Systems', 'Indexing', 'GDB'],
  },
  {
    id: 'legalgini',
    shortTitle: 'SWE Intern',
    shortOrg: 'Legalgini',
    title: 'Software Engineer Intern',
    org: 'Legalgini — Gurugram, India',
    period: 'Jan 2025 – May 2025',
    active: false,
    bullets: [
      'Developed and optimized a ColBERT-based Retrieval-Augmented Generation pipeline for document retrieval across a large PDF corpus.',
      'Integrated Gemini Flash into Legalgini\'s Django platform using prompt engineering for dynamic benefit assignment.',
      'Prototyped a hybrid search pipeline combining semantic retrieval, keyword retrieval, and lightweight re-ranking.',
    ],
    tags: ['RAG', 'ColBERT', 'Django', 'Gemini', 'Search'],
    metrics: ['retrieval accuracy: 70% → 96%', 'onboarding engagement: +40%', 'query latency: ~400ms'],
  },
  {
    id: 'goppert',
    shortTitle: 'Systems Researcher',
    shortOrg: 'Purdue / Goppert',
    title: 'Autonomous Systems Researcher',
    org: 'Prof. J.M. Goppert — Purdue University, West Lafayette, IN',
    period: 'Jan 2025 – May 2025',
    active: false,
    bullets: [
      'Designed and evaluated A*, RRT, and RRT* path-planning algorithms for an autonomous NARCAN-delivery drone.',
      'Processed Intel RealSense 3D point-cloud data into 2D occupancy grids for motion planning.',
      'Compared planning approaches for cluttered environments and onboard deployment constraints.',
    ],
    tags: ['Autonomous Systems', 'Path Planning', 'Intel RealSense', 'RRT*'],
    metrics: ['computational load: ~−30%', 'RRT*: strongest evaluated solution'],
  },
  {
    id: 'pmta',
    shortTitle: 'PM / TA',
    shortOrg: 'Purdue',
    title: 'Project Manager and Teaching Assistant',
    org: 'Purdue University — West Lafayette, IN',
    period: 'Aug 2023 – May 2024',
    active: false,
    bullets: [
      'Led a team of 7 researchers conducting market research across debate tournaments and participation trends.',
      'Oversaw development of a custom web scraper for large-scale Tabroom tournament data collection.',
      'Managed work on debate sentiment analysis using an LSTM model and curated transcript datasets.',
    ],
    tags: ['Research Management', 'Web Scraping', 'LSTM', 'Data Pipelines'],
    metrics: ['40 states', '10K+ Tabroom tournaments', '95% sentiment accuracy', '40,000+ unique words'],
  },
  {
    id: 'ds',
    shortTitle: 'DS Researcher',
    shortOrg: 'Purdue',
    title: 'Data Science Researcher',
    org: 'Purdue University — West Lafayette, IN',
    period: 'Aug 2022 – May 2023',
    active: false,
    bullets: [
      'Worked on a sensor-data project aimed at giving farmers better insight from environmental variables.',
      'Analyzed approximately 30,000 data points per variable.',
      'Sampled data at 30, 45, and 60-minute intervals to reduce dataset size and improve processing efficiency.',
    ],
    tags: ['Data Science', 'Sensors', 'Weather APIs', 'Data Processing'],
  },
]

const mono: React.CSSProperties = { fontFamily: '"JetBrains Mono", monospace' }

export default function ExperienceWindow() {
  const [selectedId, setSelectedId] = useState(EXPERIENCES[0].id)
  const exp = EXPERIENCES.find(e => e.id === selectedId)!

  return (
    <div className="os-split">
      {/* Sidebar */}
      <nav className="os-split-sidebar" aria-label="Experience roles">
        <div
          style={{
            ...mono,
            fontSize: '10px',
            color: '#5A5040',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '10px 12px',
            borderBottom: '1px solid rgba(201,169,93,0.1)',
            flexShrink: 0,
            alignSelf: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          roles.db
        </div>
        {EXPERIENCES.map(e => (
          <button
            key={e.id}
            onClick={() => setSelectedId(e.id)}
            aria-current={selectedId === e.id ? 'true' : undefined}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '10px 12px',
              background: selectedId === e.id ? 'rgba(201,169,93,0.1)' : 'transparent',
              border: 'none',
              borderLeft: selectedId === e.id ? '2px solid #C9A95D' : '2px solid transparent',
              cursor: 'pointer',
              textAlign: 'left',
              flexShrink: 0,
              minWidth: '120px',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: selectedId === e.id ? 600 : 400, color: selectedId === e.id ? '#E8E0C8' : '#AFA68F', whiteSpace: 'nowrap' }}>
              {e.shortTitle}
            </span>
            <span style={{ ...mono, fontSize: '10px', color: '#5A5040', marginTop: '2px', whiteSpace: 'nowrap' }}>
              {e.shortOrg}
            </span>
            {e.active && (
              <span
                style={{
                  ...mono,
                  marginTop: '4px',
                  padding: '1px 5px',
                  background: 'rgba(124,155,114,0.18)',
                  border: '1px solid rgba(124,155,114,0.35)',
                  borderRadius: '2px',
                  fontSize: '9px',
                  color: '#7C9B72',
                  letterSpacing: '0.05em',
                }}
              >
                ACTIVE
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Detail panel */}
      <div className="os-split-main os-scroll" style={{ padding: '24px 28px' }}>
        {/* Decorative query label */}
        <p style={{ ...mono, fontSize: '10px', color: '#3A3028', marginBottom: '16px' }}>
          {`SELECT * FROM roles WHERE id = '${exp.id}';`}
        </p>

        {/* Title / meta */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '6px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#E8E0C8' }}>{exp.title}</h2>
            {exp.active && (
              <span style={{ ...mono, padding: '3px 9px', background: 'rgba(124,155,114,0.15)', border: '1px solid rgba(124,155,114,0.35)', borderRadius: '3px', fontSize: '10px', color: '#7C9B72', letterSpacing: '0.05em', flexShrink: 0, alignSelf: 'center' }}>
                ● ACTIVE
              </span>
            )}
          </div>
          <p style={{ color: '#C9A95D', fontSize: '14px', marginBottom: '3px' }}>{exp.org}</p>
          {exp.advisor && <p style={{ ...mono, fontSize: '12px', color: '#7F7665', marginBottom: '3px' }}>{exp.advisor}</p>}
          <p style={{ ...mono, fontSize: '12px', color: '#5A5040' }}>{exp.period}</p>
        </div>

        {/* Bullets */}
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {exp.bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', gap: '10px', color: '#AFA68F', fontSize: '14px', lineHeight: 1.65 }}>
              <span style={{ color: '#C9A95D', opacity: 0.5, flexShrink: 0, marginTop: '3px' }}>→</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Metrics */}
        {exp.metrics && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ ...mono, fontSize: '10px', color: '#5A5040', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Metrics</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {exp.metrics.map(m => (
                <span key={m} style={{ ...mono, padding: '4px 10px', background: 'rgba(201,169,93,0.07)', border: '1px solid rgba(201,169,93,0.18)', borderRadius: '3px', fontSize: '12px', color: '#C9A95D' }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {exp.tags.map(t => (
            <span key={t} style={{ ...mono, padding: '3px 9px', border: '1px solid rgba(201,169,93,0.15)', borderRadius: '3px', fontSize: '11px', color: '#7F7665' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
