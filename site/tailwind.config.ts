import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        charcoal: '#1F2024',
        gold: '#B8863A',
        slate: '#2F3E4A',
        coral: '#E8A17E',
        sage: '#7F8F7E',
        border: '#D9D5CE',
        muted: '#6C6C6C',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        prose: '42rem',
      },
    },
  },
  plugins: [],
}

export default config
