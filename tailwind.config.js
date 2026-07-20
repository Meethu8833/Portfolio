/** @type {import('tailwindcss').Config} */
export default {
  // Scan all source files for Tailwind class names (tree-shakes unused CSS).
  content: ['./index.html', './src/**/*.{js,jsx}'],

  // Toggle dark mode by adding/removing the `dark` class on <html>.
  // Our ThemeContext will control this in Phase 2.
  darkMode: 'class',

  theme: {
    extend: {
      // Design tokens — the single source of truth for the visual system.
      colors: {
        // Indigo → Violet accent (your approved palette).
        accent: {
          DEFAULT: '#6366f1', // indigo-500  (light-mode accent)
          light: '#818cf8',   // indigo-400  (dark-mode accent)
          violet: '#8b5cf6',  // violet-500  (gradient partner)
        },
      },
      fontFamily: {
        // Wired to the @fontsource packages imported in index.css.
        sans: ['Inter', 'system-ui', 'sans-serif'],            // body
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'], // headings
        mono: ['JetBrains Mono', 'monospace'],                 // code accents
      },
      // Reusable accent gradient for buttons, text highlights, etc.
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      },
      // Lightweight CSS entrance fallback (Framer Motion handles the rest).
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
