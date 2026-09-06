import type { Config } from 'tailwindcss'

/**
 * Palette: brass on cool grey.
 *
 * The greys are the furniture of an operating system — window chrome, dividers,
 * inactive controls — and brass is the one warm thing in the room. It appears
 * about four times per screen (active tab, focus ring, one CTA, one keyword)
 * and nowhere else; the moment it becomes a background colour it stops working.
 */
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
        paper: {
          DEFAULT: '#F7F8FA',
          raised: '#FFFFFF',
          sunk: '#EFF1F5',
        },
        ink: {
          DEFAULT: '#12141A',
          950: '#0A0C10',
          900: '#12141A',
          800: '#1B1E26',
          700: '#272B36',
        },
        slate: {
          DEFAULT: '#5B6273',
          600: '#464C5C',
          500: '#5B6273',
          400: '#7E8597',
          300: '#A6ACBB',
        },
        chrome: {
          DEFAULT: '#E4E7EC',
          100: '#F2F4F7',
          200: '#E4E7EC',
          300: '#D3D8E1',
          400: '#BFC6D2',
        },
        brass: {
          DEFAULT: '#B8862B',
          50: '#FBF7EC',
          100: '#F5EBD2',
          200: '#E9D69E',
          300: '#D8B85F',
          400: '#C79C39',
          500: '#B8862B',
          600: '#996D21',
          700: '#77551B',
        },
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Display steps. Tight leading is deliberate: headlines are meant to
        // read as a stacked block, not as flowing sentences.
        // Leading stays at 1.02 rather than tighter: German display copy is full
        // of umlauts, and at 0.95 the Ü in a second line touches the line above.
        'display-xl': ['clamp(2.15rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.25rem, 4.6vw, 3.75rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.375rem, 2vw, 1.75rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        // Mono utility label — eyebrows, OS names, step markers.
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      borderRadius: {
        window: '0.75rem',
        card: '1.25rem',
        panel: '1.75rem',
        stage: '2rem',
      },
      boxShadow: {
        // One elevation language: a tight contact shadow plus a wide soft one.
        window: '0 1px 2px rgba(18,20,26,0.06), 0 24px 60px -20px rgba(18,20,26,0.28)',
        card: '0 1px 2px rgba(18,20,26,0.04), 0 12px 32px -16px rgba(18,20,26,0.18)',
        pill: '0 1px 2px rgba(18,20,26,0.06), 0 8px 24px -12px rgba(18,20,26,0.22)',
      },
      transitionTimingFunction: {
        surface: 'cubic-bezier(0.65, 0, 0.15, 1)',
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        prose: '58ch',
        shell: '78rem',
      },
    },
  },
  plugins: [],
} satisfies Config
