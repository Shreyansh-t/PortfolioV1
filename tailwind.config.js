/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
        'pixel': ['Courier New', 'monospace'],
      },
      colors: {
        'terminal': {
          'bg': '#1A1610',
          'fg': '#C29F6C',
          'amber': '#FFC373',
          'white': '#E8D5B0',
          'gray': '#8B7355',
          'cursor': '#FFC373',
        }
      },
      animation: {
        'blink': 'blink 1s infinite',
        'type': 'type 2s steps(20, end)',
      },
      keyframes: {
        'blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'type': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        }
      }
    },
  },
  plugins: [],
} 