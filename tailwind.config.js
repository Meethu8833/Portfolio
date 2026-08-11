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
        // Teal → Cyan accent over a deep-navy ground.
        accent: {
          DEFAULT: '#0d9488', // teal-600  — light-mode accent (AA on white)
          light: '#2dd4bf',   // teal-400  — dark-mode accent
          cyan: '#06b6d4',    // cyan-500  — gradient partner
          deep: '#0f766e',    // teal-700  — pressed / high-contrast text
        },
        // Deep navy ground replacing flat slate in dark mode. Named `ink` so
        // `bg-ink-900` reads as "the page" and `bg-ink-800` as "a surface".
        ink: {
          950: '#060b16', // deepest — page background, dark
          900: '#0b1220', // page background, dark (default)
          800: '#111c2e', // raised surface (cards)
          700: '#1a2942', // borders / dividers
          600: '#25395a', // hover borders
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],            // body
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'], // headings
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
        'accent-gradient': 'linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)',
        // Brighter variant that holds up against the dark navy ground.
        'accent-gradient-dark': 'linear-gradient(135deg, #2dd4bf 0%, #22d3ee 100%)',
        // Subtle grid used as a page texture (see .bg-grid in index.css).
        'radial-fade': 'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
      },
      boxShadow: {
        // Soft, colour-matched elevation — replaces flat black shadows.
        'glow': '0 0 40px -8px rgba(13, 148, 136, 0.35)',
        'glow-lg': '0 0 70px -10px rgba(6, 182, 212, 0.45)',
        'card': '0 1px 2px rgba(9, 20, 36, 0.04), 0 8px 24px -12px rgba(9, 20, 36, 0.12)',
        'card-hover': '0 1px 2px rgba(9, 20, 36, 0.05), 0 20px 45px -15px rgba(13, 148, 136, 0.28)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Slow rotation for the conic gradient ring behind the hero portrait.
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // Left→right sweep used by the marquee and shimmer accents.
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'spin-slow': 'spin-slow 14s linear infinite',
        'marquee': 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
