const SKILLS: Record<string, string[]> = {
  'Languages':           ['Java', 'Python', 'C/C++', 'JavaScript', 'HTML', 'CSS', 'R', 'SQL'],
  'Frameworks / Systems':['React', 'Django', 'Flask', 'REST APIs', 'Design Patterns', 'Linux Sockets', 'TCP/IP', 'XDP'],
  'Developer Tools':     ['Git', 'Docker', 'Kubernetes', 'AWS', 'Kafka', 'GitLab', 'UNIX/Linux', 'Jira', 'Redis', 'OpenAI', 'BERT'],
  'Domains':             ['Machine Learning', 'Data Science', 'Backend', 'Full Stack', 'Deep Learning', 'NLP', 'Database Systems', 'Systems Engineering'],
}

const COURSEWORK = 'Data Structures, Algorithms, Data Mining, Probability, Linear Algebra, Object-Oriented Programming, Discrete Math, Competitive Programming I, Time Series Analysis, Regression Analysis'

const mono: React.CSSProperties = { fontFamily: '"JetBrains Mono", monospace' }
const label: React.CSSProperties = { ...mono, fontSize: '10px', color: '#7F7665', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '12px' }
const chip: React.CSSProperties = { padding: '3px 10px', border: '1px solid rgba(201,169,93,0.22)', borderRadius: '3px', fontSize: '12px', color: '#AFA68F', background: 'rgba(201,169,93,0.04)' }

export default function AboutWindow() {
  return (
    <div className="os-scroll" style={{ height: '100%', overflowY: 'auto', padding: '28px 32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#E8E0C8', marginBottom: '5px' }}>
          Shreyansh Tehanguria
        </h1>
        <p style={{ ...mono, fontSize: '13px', color: '#C9A95D' }}>Software Engineer</p>
      </div>

      {/* Bio */}
      <p style={{ color: '#AFA68F', lineHeight: 1.7, fontSize: '15px', marginBottom: '28px', maxWidth: '580px' }}>
        I&apos;m a Purdue University Data Science student interested in database systems, C++ systems
        engineering, retrieval systems, and full-stack product development. I like understanding how
        software works below the surface, then turning that understanding into reliable tools and products.
      </p>

      {/* System profile */}
      <div
        style={{
          background: 'rgba(201,169,93,0.04)',
          border: '1px solid rgba(201,169,93,0.18)',
          borderRadius: '4px',
          padding: '14px 18px',
          ...mono,
          fontSize: '12px',
          color: '#7F7665',
          marginBottom: '32px',
          maxWidth: '440px',
        }}
      >
        <div style={{ color: '#C9A95D', marginBottom: '8px', opacity: 0.8 }}>system_profile {'{'}</div>
        {[
          ['school',  '"Purdue University"'],
          ['degree',  '"B.S. Data Science"'],
          ['focus',   '"databases, C++, systems, ML infra"'],
          ['status',  '"building"'],
        ].map(([k, v]) => (
          <div key={k} style={{ paddingLeft: '16px', marginBottom: '4px' }}>
            <span style={{ color: '#AFA68F' }}>{k}: </span>
            <span style={{ color: '#C9A95D', opacity: 0.65 }}>{v};</span>
          </div>
        ))}
        <div style={{ color: '#C9A95D', opacity: 0.8 }}>{'}'}</div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: '32px' }}>
        <p style={label}>Education</p>
        <div style={{ borderLeft: '2px solid rgba(201,169,93,0.28)', paddingLeft: '16px' }}>
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#E8E0C8', marginBottom: '4px' }}>
            Purdue University — West Lafayette, IN
          </p>
          <p style={{ color: '#AFA68F', fontSize: '14px', marginBottom: '3px' }}>
            Bachelor of Science in Data Science
          </p>
          <p style={{ ...mono, fontSize: '12px', color: '#7F7665', marginBottom: '10px' }}>Aug 2022 – May 2026</p>
          <p style={{ fontSize: '13px', color: '#7F7665', lineHeight: 1.65 }}>
            <span style={{ color: '#AFA68F' }}>Coursework: </span>
            {COURSEWORK}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div>
        <p style={label}>Skills</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group}>
              <p style={{ ...mono, fontSize: '11px', color: '#5A5040', marginBottom: '8px' }}>{group}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {items.map(s => <span key={s} style={chip}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
