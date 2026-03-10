/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cb-blue': '#0052FF',
        'cb-blue-dark': '#0039B3',
        'cb-blue-light': '#EBF1FF',
        'cb-black': '#050F19',
        'cb-gray': '#F8F8F8',
        'cb-gray-100': '#F0F0F0',
        'cb-gray-200': '#E8E8E8',
        'cb-gray-300': '#D1D5DB',
        'cb-text': '#050F19',
        'cb-text-secondary': '#5B616E',
        'cb-text-muted': '#8A919E',
        'cb-green': '#05B169',
        'cb-red': '#CF2030',
        'cb-surface-dark': '#0D1117',
        'cb-border': '#E8E8E8',
      },
      fontFamily: {
        sans: ['Coinbase Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Coinbase Display', 'Georgia', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      fontSize: {
        'display-lg': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [],
}
