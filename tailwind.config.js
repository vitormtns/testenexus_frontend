/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f6f7fb',
        surface: '#ffffff',
        ink: '#17181c',
        muted: '#6b7280',
        border: '#e7e9f2',
        brand: {
          50: '#fff1f1',
          100: '#ffe0df',
          500: '#E10600',
          600: '#cb0904',
          700: '#B80000',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Sora"', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 18px 45px -26px rgba(23, 24, 28, 0.28)',
        float: '0 20px 60px -30px rgba(225, 6, 0, 0.25)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top left, rgba(225,6,0,0.14), transparent 35%), radial-gradient(circle at bottom right, rgba(184,0,0,0.12), transparent 28%)',
      },
    },
  },
  plugins: [],
}
