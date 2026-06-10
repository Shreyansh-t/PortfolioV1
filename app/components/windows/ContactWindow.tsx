import React from 'react'

const mono: React.CSSProperties = { fontFamily: '"JetBrains Mono", monospace' }

const primaryBtn: React.CSSProperties = {
  display: 'block',
  padding: '11px 20px',
  background: '#C9A95D',
  color: '#0B0D0E',
  textDecoration: 'none',
  borderRadius: '3px',
  fontSize: '14px',
  fontWeight: 600,
  textAlign: 'center',
}

const secondaryBtn: React.CSSProperties = {
  display: 'block',
  padding: '10px 20px',
  border: '1px solid rgba(201,169,93,0.35)',
  color: '#C9A95D',
  textDecoration: 'none',
  borderRadius: '3px',
  fontSize: '14px',
  textAlign: 'center',
}

export default function ContactWindow() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <p style={{ ...mono, fontSize: '10px', color: '#5A5040', marginBottom: '18px', letterSpacing: '0.06em' }}>
          {'// connection established'}
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#E8E0C8', marginBottom: '8px' }}>
          Contact
        </h2>
        <p style={{ color: '#AFA68F', fontSize: '14px', lineHeight: 1.65, marginBottom: '28px' }}>
          Open to research collaborations, internship opportunities, and engineering roles.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          <a href="mailto:stehangu@purdue.edu" style={primaryBtn}>
            Send Email
          </a>
          <a href="https://www.linkedin.com/in/shreyanshtehanguria" target="_blank" rel="noopener noreferrer" style={secondaryBtn}>
            LinkedIn ↗
          </a>
          <a href="https://github.com/Shreyansh-t" target="_blank" rel="noopener noreferrer" style={secondaryBtn}>
            GitHub ↗
          </a>
        </div>

        <div
          style={{
            padding: '14px 16px',
            background: 'rgba(201,169,93,0.04)',
            border: '1px solid rgba(201,169,93,0.1)',
            borderRadius: '3px',
          }}
        >
          <p style={{ ...mono, fontSize: '12px', color: '#5A5040', lineHeight: 1.9 }}>
            email: stehangu@purdue.edu<br />
            linkedin: /in/shreyanshtehanguria<br />
            github: /Shreyansh-t
          </p>
        </div>
      </div>
    </div>
  )
}
