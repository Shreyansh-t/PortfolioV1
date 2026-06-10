const SKILLS = [
  {
    label: 'Languages',
    items: ['Java', 'Python', 'C/C++', 'JavaScript', 'HTML', 'CSS', 'R', 'SQL'],
  },
  {
    label: 'Frameworks / Systems',
    items: ['React', 'Django', 'Flask', 'REST APIs', 'Design Patterns', 'Linux Sockets', 'TCP/IP', 'XDP'],
  },
  {
    label: 'Developer Tools',
    items: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Kafka', 'GitLab', 'UNIX/Linux', 'Jira', 'Redis', 'OpenAI', 'BERT'],
  },
  {
    label: 'Domains',
    items: ['Machine Learning', 'Data Science', 'Backend', 'Full Stack', 'Deep Learning', 'NLP', 'Database Systems', 'Systems Engineering'],
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p
            className="font-mono text-xs tracking-widest mb-2"
            style={{ color: 'rgba(200,169,106,0.6)' }}
          >
            SELECT * FROM about WHERE person = &apos;me&apos;;
          </p>
          <h2 className="text-3xl font-bold" style={{ color: '#E8E3D8' }}>About</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-base leading-relaxed" style={{ color: '#E8E3D8' }}>
              I am a Purdue University student studying Data Science, interested in database systems,
              C++ systems engineering, retrieval systems, and full-stack product development. I like
              working close to the boundary between research and production systems: understanding
              how things work internally, then turning that understanding into practical software.
            </p>

            {/* Education card */}
            <div
              className="rounded-lg p-6"
              style={{ background: '#171A1C', border: '1px solid rgba(200,169,106,0.18)' }}
            >
              <p
                className="font-mono text-xs tracking-wide mb-3"
                style={{ color: 'rgba(200,169,106,0.5)' }}
              >
                table.education
              </p>
              <h3 className="font-semibold text-base mb-1" style={{ color: '#E8E3D8' }}>
                Purdue University — West Lafayette, IN
              </h3>
              <p className="text-sm mb-1" style={{ color: '#C8A96A' }}>Bachelor of Science in Data Science</p>
              <p className="text-sm mb-4" style={{ color: '#A8A096' }}>Aug 2022 – May 2026</p>
              <div>
                <p
                  className="font-mono text-xs tracking-wide mb-2"
                  style={{ color: 'rgba(200,169,106,0.5)' }}
                >
                  RELEVANT COURSEWORK
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#E8E3D8' }}>
                  Data Structures, Algorithms, Data Mining, Probability, Linear Algebra,
                  Object-Oriented Programming, Discrete Math, Competitive Programming I,
                  Time Series Analysis, Regression Analysis
                </p>
              </div>
            </div>

            {/* Skills card */}
            <div
              className="rounded-lg p-6"
              style={{ background: '#171A1C', border: '1px solid rgba(200,169,106,0.18)' }}
            >
              <p
                className="font-mono text-xs tracking-wide mb-4"
                style={{ color: 'rgba(200,169,106,0.5)' }}
              >
                table.skills
              </p>
              <div className="space-y-4">
                {SKILLS.map(group => (
                  <div key={group.label}>
                    <p
                      className="font-mono text-xs tracking-wide mb-2"
                      style={{ color: 'rgba(200,169,106,0.5)' }}
                    >
                      {group.label.toUpperCase()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(item => (
                        <span
                          key={item}
                          className="px-2.5 py-1 text-xs rounded-md"
                          style={{
                            color: '#E8E3D8',
                            background: 'rgba(200,169,106,0.08)',
                            border: '1px solid rgba(200,169,106,0.18)',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System profile sidebar */}
          <div className="lg:col-span-1">
            <div
              className="rounded-lg p-6 lg:sticky lg:top-24"
              style={{ background: '#171A1C', border: '1px solid rgba(200,169,106,0.25)' }}
            >
              <p
                className="font-mono text-xs tracking-widest mb-5 font-semibold"
                style={{ color: '#C8A96A' }}
              >
                SYSTEM PROFILE
              </p>
              <div className="space-y-3 font-mono text-sm">
                {([
                  ['role', 'software_engineer'],
                  ['school', 'Purdue University'],
                  ['degree', 'B.S. Data Science'],
                  ['focus', 'databases, C++,\nsystems, ML'],
                  ['status', 'building'],
                ] as [string, string][]).map(([key, val]) => (
                  <div key={key} className="flex gap-2">
                    <span className="min-w-[60px]" style={{ color: 'rgba(200,169,106,0.6)' }}>
                      {key}:
                    </span>
                    <span style={{ color: '#E8E3D8' }} className="whitespace-pre-line">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
