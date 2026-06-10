const FOCUS_CARDS = [
  {
    title: 'Database Systems',
    desc: 'DuckDB, indexing, AB-Tree research, query execution, storage internals.',
    tag: 'table.focus',
  },
  {
    title: 'C++ / Systems Engineering',
    desc: 'Low-latency systems, memory optimization, networking, lock-free queues.',
    tag: 'struct.systems',
  },
  {
    title: 'Full-Stack Products',
    desc: 'React, Django, Node.js, PostgreSQL/MongoDB, Redis, APIs.',
    tag: 'schema.fullstack',
  },
  {
    title: 'ML / RAG Infrastructure',
    desc: 'ColBERT, Qdrant, LangGraph, LLM pipelines, semantic search.',
    tag: 'index.ml_infra',
  },
]

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <p
            className="font-mono text-xs tracking-widest mb-4"
            style={{ color: 'rgba(200,169,106,0.7)' }}
          >
            SHREYANSH_TEHANGURIA.profile
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-4" style={{ color: '#E8E3D8' }}>
            Shreyansh Tehanguria
          </h1>
          <p className="text-xl sm:text-2xl font-medium mb-6" style={{ color: '#C8A96A' }}>
            Software Engineer
          </p>
          <p className="text-lg max-w-2xl leading-relaxed mb-3" style={{ color: '#A8A096' }}>
            Software engineer focused on databases, C++, systems, full-stack products, and applied machine learning.
          </p>
          <p className="text-base max-w-2xl leading-relaxed" style={{ color: '#A8A096' }}>
            I build fast, reliable software across database systems, retrieval pipelines, backend platforms, and full-stack applications.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 mb-16">
          <a
            href="#projects"
            className="px-6 py-3 font-semibold text-sm rounded-md transition-colors"
            style={{ background: '#C8A96A', color: '#111315' }}
          >
            View Projects
          </a>
          <a
            href="#experience"
            className="px-6 py-3 font-medium text-sm rounded-md transition-colors"
            style={{
              border: '1px solid rgba(200,169,106,0.4)',
              color: '#C8A96A',
            }}
          >
            View Experience
          </a>
          <a
            href="#contact"
            className="px-6 py-3 font-medium text-sm rounded-md transition-colors"
            style={{
              border: '1px solid rgba(200,169,106,0.2)',
              color: '#A8A096',
            }}
          >
            Contact Me
          </a>
        </div>

        {/* Focus area cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FOCUS_CARDS.map(card => (
            <div
              key={card.title}
              className="rounded-lg p-5 transition-colors"
              style={{
                background: '#171A1C',
                border: '1px solid rgba(200,169,106,0.18)',
              }}
            >
              <p
                className="font-mono text-xs tracking-wide mb-3"
                style={{ color: 'rgba(200,169,106,0.5)' }}
              >
                {card.tag}
              </p>
              <h3 className="font-semibold text-sm mb-2" style={{ color: '#E8E3D8' }}>{card.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#A8A096' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
