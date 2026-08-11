import { AnimatePresence, motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeToggle — a button that flips between light and dark mode.
 * The sun/moon icons cross-fade + rotate via Framer Motion's AnimatePresence.
 */
export default function ThemeToggle() {
  // Pull the current theme and the flip function from context.
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      // Describe the *action* for screen readers, and label it for tooltips.
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="relative flex h-9 w-9 items-center justify-center rounded-xl
                 border border-slate-200 bg-white/70 text-slate-700
                 transition-colors hover:border-accent hover:text-accent
                 dark:border-ink-700 dark:bg-ink-800/70 dark:text-slate-300
                 dark:hover:border-accent-light dark:hover:text-accent-light"
    >
      {/*
        AnimatePresence lets the outgoing icon animate OUT while the incoming one
        animates IN. `mode="wait"` sequences them; `initial={false}` skips the
        entrance animation on first mount (no spin on page load).
      */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          // A changing key tells AnimatePresence "this is a different element",
          // triggering the exit→enter swap.
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute"
        >
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
