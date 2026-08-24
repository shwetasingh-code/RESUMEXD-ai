/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#2563eb',
        'brand-light': '#eff6ff',
        'brand-mid': '#bfdbfe',
        navy: '#0f172a',
        slate: '#475569',
        muted: '#94a3b8',
        surface: '#f8fafc',
        border: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
