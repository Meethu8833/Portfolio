import { createContext, useContext, useEffect, useState } from 'react';

// The context object itself. Components never touch this directly — they use
// the useTheme() hook below. Default value is null so a mis-placed consumer
// (outside the provider) fails loudly rather than silently.
const ThemeContext = createContext(null);

/**
 * Reads the initial theme once, on first render.
 * Mirrors the inline script in index.html so React's idea of the theme matches
 * what's already painted on <html> — avoiding any flicker or mismatch.
 */
function getInitialTheme() {
  // Guard for SSR / non-browser environments where `window` is undefined.
  if (typeof window === 'undefined') return 'light';

  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;

  // No saved choice → follow the operating-system preference.
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Wraps the app and supplies the current theme + a toggle function.
 * Placed near the root in App.jsx.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Whenever `theme` changes, reflect it on the <html> element (which is what
  // Tailwind's `dark:` variants key off) and persist the choice.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Flip between the two themes.
  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Convenience hook so components can do: const { theme, toggleTheme } = useTheme().
 * Throws if used outside <ThemeProvider> — catches wiring mistakes early.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
