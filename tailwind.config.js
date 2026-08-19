/** @type {import('tailwindcss').Config} */
export default {
  // Scan all source files for Tailwind class names (tree-shakes unused CSS).
  content: ['./index.html', './src/**/*.{js,jsx}'],

  // Toggle dark mode by adding/removing the `dark` class on <html>.
  darkMode: 'class',

  theme: {
    extend: {
      // Design tokens — the single source of truth for the visual system.
      colors: {
        // Muted bronze accent over a near-black ground.
        accent: {
          DEFAULT: '#C79A5C', // bronze     — accent
          light: '#D9B27C',   // bronze-lt  — dark-mode accent
          warm: '#B07E4A',    // bronze-dk  — gradient partner
          deep: '#9A7340',    // bronze-dp  — pressed / high-contrast text
        },
        // Near-black neutral ground. Named `ink` so `bg-ink-900` reads as
        // "the page" and `bg-ink-800` as "a surface".
        ink: {
          950: '#06070A', // deepest — page background, dark
          900: '#0A0B0F', // page background, dark (default)
          800: '#14161C', // raised surface (cards)
          700: '#24272F', // borders / dividers
          600: '#343842', // hover borders
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],            // body
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'], // headings
        display: ['Fraunces', 'Georgia', 'serif'],             // serif display
        mono: ['JetBrains Mono', 'monospace'],                 // code accents
      },
      // Tighter, more deliberate type scale for display headings.
      fontSize: {
        'display-sm': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
      },
      backgroundImage: {
        // Primary accent gradient for buttons, text highlights, rules.
        'accent-gradient': 'linear-gradient(135deg, #C79A5C 0%, #B07E4A 100%)',
        // Brighter variant that holds up against the dark navy ground.
        'accent-gradient-dark': 'linear-gradient(135deg, #D9B27C 0%, #C79A5C 100%)',
        // Subtle grid used as a page texture (see .bg-grid in index.css).
        'radial-fade': 'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
      },
      boxShadow: {
        // Soft, colour-matched elevation — replaces flat black shadows.
        'glow': '0 0 40px -8px rgba(199, 154, 92, 0.35)',
        'glow-lg': '0 0 70px -10px rgba(176, 126, 74, 0.45)',
        'card': '0 1px 2px rgba(9, 20, 36, 0.04), 0 8px 24px -12px rgba(9, 20, 36, 0.12)',
        'card-hover': '0 1px 2px rgba(9, 20, 36, 0.05), 0 20px 45px -15px rgba(199, 154, 92, 0.28)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
