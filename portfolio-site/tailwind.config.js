/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        night: '#0b0f14',
        ink: '#0f172a',
        steel: '#1e293b',
        neon: '#7cfc9a',
        aurora: '#46bdf4',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)'
      },
      boxShadow: {
        glow: '0 0 40px rgba(70, 189, 244, 0.25)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease-out both'
      }
    }
  },
  plugins: []
};
