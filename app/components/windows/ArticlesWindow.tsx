const mono: React.CSSProperties = { fontFamily: '"JetBrains Mono", monospace' }

export default function ArticlesWindow() {
  return (
    <div className="os-scroll" style={{ height: '100%', overflowY: 'auto', padding: '28px 32px' }}>
      <p style={{ ...mono, fontSize: '10px', color: '#5A5040', letterSpacing: '0.06em', marginBottom: '20px' }}>
        articles.txt — 1 published
      </p>

      {/* Published article */}
      <div
        style={{
          padding: '18px 20px',
          background: 'rgba(201,169,93,0.04)',
          border: '1px solid rgba(201,169,93,0.2)',
          borderRadius: '4px',
          marginBottom: '12px',
          maxWidth: '640px',
        }}
      >
        <a
          href="https://arc.net/l/quote/qilpcvov"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            fontSize: '15px',
            fontWeight: 600,
            color: '#E8E0C8',
            textDecoration: 'none',
            marginBottom: '10px',
            lineHeight: 1.5,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C9A95D')}
          onMouseLeave={e => (e.currentTarget.style.color = '#E8E0C8')}
        >
          ColBERT Made Simple: Step-by-Step PDF Search Engine with LangChain and RAGatouille ↗
        </a>
        <p style={{ color: '#AFA68F', fontSize: '14px', lineHeight: 1.65 }}>
          A practical walkthrough explaining how to build a PDF search engine using ColBERT, LangChain, and RAGatouille.
        </p>
      </div>

      {/* Placeholder */}
      <div
        style={{
          padding: '16px 20px',
          background: 'rgba(201,169,93,0.02)',
          border: '1px solid rgba(201,169,93,0.07)',
          borderRadius: '4px',
          maxWidth: '640px',
          opacity: 0.5,
        }}
      >
        <p style={{ ...mono, fontSize: '13px', color: '#5A5040' }}>— coming soon —</p>
      </div>
    </div>
  )
}
