export default function ArticlesSection() {
  return (
    <section id="articles" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p
            className="font-mono text-xs tracking-widest mb-2"
            style={{ color: 'rgba(200,169,106,0.6)' }}
          >
            SELECT * FROM articles ORDER BY published_at DESC;
          </p>
          <h2 className="text-3xl font-bold" style={{ color: '#E8E3D8' }}>Articles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Placeholder — TODO: Add Medium article link */}
          <div
            className="rounded-lg p-6"
            style={{ background: '#171A1C', border: '1px solid rgba(200,169,106,0.18)' }}
          >
            <p
              className="font-mono text-xs tracking-wide mb-3"
              style={{ color: 'rgba(200,169,106,0.45)' }}
            >
              platform: Medium
            </p>
            <h3 className="font-semibold text-base mb-2" style={{ color: '#E8E3D8' }}>
              Article title — to be added
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#A8A096' }}>
              Description — to be added.
            </p>
            <p
              className="font-mono text-xs"
              style={{ color: 'rgba(200,169,106,0.4)' }}
            >
              TODO: Add Medium article link.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
