module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sentinel-red': {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        'sentinel-dark': {
          800: '#1f2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}
