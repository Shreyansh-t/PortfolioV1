interface Experience {
  id: string
  dbKey: string
  title: string
  org: string
  meta: string
  period: string
  bullets: string[]
  tags: string[]
  current?: boolean
}

const EXPERIENCES: Experience[] = [
  {
    id: 'ub_2026',
    dbKey: 'systems_research_2026',
    title: 'Systems Research Intern / Research Assistant',
    org: 'Analytical Database Lab, University at Buffalo',
    meta: 'Prof. Zhao',
    period: 'Apr 2026 – Present',
    current: true,
    bullets: [
      'Studying AB-Tree sampling indexes and their relationship to range and point-indexing workloads.',
      'Reading and analyzing the AB-Tree codebase and related indexing papers.',
      "Reverse-engineered DuckDB's CREATE INDEX execution pipeline using GDB to understand how DuckDB builds and manages indexes.",
      'Investigating how bulk-loading and merge workflows could be adapted for AB-Tree-style sampling indexes in an in-memory analytical database context.',
    ],
    tags: ['C++', 'DuckDB', 'Database Systems', 'GDB'],
  },
  {
    id: 'legalgini_2025',
    dbKey: 'legalgini_2025',
    title: 'Software Engineer Intern',
    org: 'Legalgini',
    meta: 'Gurugram, India',
    period: 'Jan 2025 – May 2025',
    bullets: [
      'Developed and optimized a ColBERT-based Retrieval-Augmented Generation pipeline for document retrieval across a large PDF corpus.',
      "Integrated Gemini Flash into Legalgini's Django platform using prompt engineering for dynamic benefit assignment.",
      'Prototyped a hybrid search pipeline combining semantic retrieval, keyword retrieval, and lightweight re-ranking, targeting low-latency responses.',
    ],
    tags: ['Python', 'Django', 'ColBERT', 'RAG'],
  },
  {
    id: 'goppert_2025',
    dbKey: 'autonomous_systems_2025',
    title: 'Autonomous Systems Researcher',
    org: 'Purdue University',
    meta: 'Prof. J.M. Goppert — West Lafayette, IN',
    period: 'Jan 2025 – May 2025',
    bullets: [
      'Designed and evaluated A*, RRT, and RRT* path-planning algorithms for an autonomous NARCAN-delivery drone.',
      'Processed Intel RealSense 3D point-cloud data into 2D occupancy grids for motion planning.',
      'Compared planning approaches for cluttered environments and onboard deployment constraints.',
    ],
    tags: ['C++', 'Python', 'Robotics', 'Path Planning'],
  },
  {
    id: 'purdue_pm_2024',
    dbKey: 'project_mgr_ta_2023',
    title: 'Project Manager and Teaching Assistant',
    org: 'Purdue University',
    meta: 'West Lafayette, IN',
    period: 'Aug 2023 – May 2024',
    bullets: [
      'Led a team of 7 researchers conducting market research across debate tournaments and participation trends.',
      'Oversaw development of a custom web scraper for large-scale Tabroom tournament data collection.',
      'Managed work on debate sentiment analysis using an LSTM model and curated transcript datasets.',
    ],
    tags: ['Python', 'NLP', 'LSTM', 'Data Analysis'],
  },
  {
    id: 'purdue_ds_2023',
    dbKey: 'data_science_researcher_2022',
    title: 'Data Science Researcher',
    org: 'Purdue University',
    meta: 'West Lafayette, IN',
    period: 'Aug 2022 – May 2023',
    bullets: [
      'Worked on a sensor-data project aimed at giving farmers better insight from environmental variables.',
      'Analyzed approximately 30,000 data points per variable.',
      'Sampled data at 30, 45, and 60-minute intervals to reduce dataset size and improve processing efficiency.',
    ],
    tags: ['Python', 'Data Science', 'Time Series'],
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p
            className="font-mono text-xs tracking-widest mb-2"
            style={{ color: 'rgba(200,169,106,0.6)' }}
          >
            SELECT * FROM experience ORDER BY date DESC;
          </p>
          <h2 className="text-3xl font-bold" style={{ color: '#E8E3D8' }}>Experience</h2>
        </div>

        <div className="space-y-4">
          {EXPERIENCES.map(exp => (
            <div
              key={exp.id}
              className="rounded-lg p-6 transition-colors"
              style={{ background: '#171A1C', border: '1px solid rgba(200,169,106,0.18)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <p
                    className="font-mono text-xs tracking-wide mb-1.5"
                    style={{ color: 'rgba(200,169,106,0.4)' }}
                  >
                    table.experience · primary_key: {exp.dbKey}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-base" style={{ color: '#E8E3D8' }}>
                      {exp.title}
                    </h3>
                    {exp.current && (
                      <span
                        className="px-2 py-0.5 text-xs font-mono rounded"
                        style={{
                          background: 'rgba(200,169,106,0.15)',
                          color: '#C8A96A',
                          border: '1px solid rgba(200,169,106,0.3)',
                        }}
                      >
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: '#C8A96A' }}>{exp.org}</p>
                  <p className="text-sm" style={{ color: '#A8A096' }}>{exp.meta}</p>
                </div>
                <span
                  className="text-sm font-mono whitespace-nowrap flex-shrink-0"
                  style={{ color: '#A8A096' }}
                >
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#E8E3D8' }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: 'rgba(200,169,106,0.5)' }}>▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-md"
                    style={{
                      color: '#A8A096',
                      background: 'rgba(200,169,106,0.06)',
                      border: '1px solid rgba(200,169,106,0.12)',
                    }}
                  >
                    {tag}
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
