/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surreal: {
          void: '#070a13',
          twilight: '#0f172a',
          slate: '#1e293b',
          cloud: '#94a3b8',
          mist: '#cbd5e1',
          vellum: '#fdfbf7',
          parchment: '#f5efe6',
          amber: '#d97706',
          gold: '#f59e0b',
          crimson: '#991b1b',
          dream: '#4338ca',
        }
      },
      fontFamily: {
        display: ['Cinzel', 'Playfair Display', 'serif'],
        serif: ['EB Garamond', 'Cinzel', 'serif'],
        tamil: ['Noto Sans Tamil', 'Anek Tamil', 'sans-serif'],
      },
      animation: {
        'drift': 'drift 18s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'melt': 'melt 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '100%': { transform: 'translate(30px, -20px) scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
