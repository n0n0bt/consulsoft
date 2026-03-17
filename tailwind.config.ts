import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,ts,js}',
    './components/**/*.{vue,ts,js}',
    './layouts/**/*.{vue,ts,js}',
    './pages/**/*.{vue,ts,js}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FEFCF3',
          100: '#FDF8E1',
          200: '#FAEDB8',
          300: '#F5DD82',
          400: '#E8C84A',
          500: '#D4AF37',
          600: '#B8942A',
          700: '#8F7220',
          800: '#6B5518',
          900: '#4A3A10',
        },
        dark: {
          50: '#F7F7F8',
          100: '#ECECEF',
          200: '#D5D5DB',
          300: '#B0B0BB',
          400: '#85869A',
          500: '#65667D',
          600: '#4F5067',
          700: '#414254',
          800: '#383948',
          900: '#1C1C22',
          950: '#111114',
        },
        surface: {
          50: '#FAFAF9',
          100: '#F5F5F3',
          200: '#EEEEE9',
          300: '#E2E1DB',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config
