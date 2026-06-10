function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p
            className="font-mono text-xs tracking-widest mb-2"
            style={{ color: 'rgba(200,169,106,0.6)' }}
          >
            INSERT INTO conversation (channel, recipient) VALUES (&apos;email&apos;, &apos;me&apos;);
          </p>
          <h2 className="text-3xl font-bold" style={{ color: '#E8E3D8' }}>Contact</h2>
        </div>

        <div className="max-w-xl">
          <p className="text-base leading-relaxed mb-8" style={{ color: '#A8A096' }}>
            Open to research collaborations, internship opportunities, and engineering roles. Feel free to reach out.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:stehangu@purdue.edu"
              className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-md transition-colors"
              style={{ background: '#C8A96A', color: '#111315' }}
            >
              <EmailIcon />
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/shreyanshtehanguria"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 font-medium text-sm rounded-md transition-colors"
              style={{ border: '1px solid rgba(200,169,106,0.4)', color: '#C8A96A' }}
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href="https://github.com/Shreyansh-t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 font-medium text-sm rounded-md transition-colors"
              style={{ border: '1px solid rgba(200,169,106,0.2)', color: '#A8A096' }}
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
