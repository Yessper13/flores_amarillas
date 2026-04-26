/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(251 191 36 / <alpha-value>)',
        'primary-dark': 'rgb(245 158 11 / <alpha-value>)',
        secondary: 'rgb(236 72 153 / <alpha-value>)',
        accent: 'rgb(139 92 246 / <alpha-value>)',
        background: 'rgb(15 23 42 / <alpha-value>)',
        surface: 'rgb(30 41 59 / <alpha-value>)',
        'surface-light': 'rgb(51 65 85 / <alpha-value>)',
        'text': 'rgb(241 245 249 / <alpha-value>)',
        'text-muted': 'rgb(203 213 225 / <alpha-value>)',
        border: 'rgb(71 85 105 / <alpha-value>)',
      },
      backgroundColor: {
        'color-primary': '#fbbf24',
        'color-primary-dark': '#f59e0b',
        'color-secondary': '#ec4899',
        'color-accent': '#8b5cf6',
        'color-background': '#0f172a',
        'color-surface': '#1e293b',
        'color-surface-light': '#334155',
      },
      textColor: {
        'color-text': '#f1f5f9',
        'color-text-muted': '#cbd5e1',
      },
      borderColor: {
        'color-border': '#475569',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
