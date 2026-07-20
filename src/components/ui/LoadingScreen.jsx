import { motion } from 'framer-motion';

/**
 * LoadingScreen — a brief branded intro overlay shown while the app mounts,
 * then dismissed by the parent (App) via AnimatePresence.
 *
 * PERFORMANCE: only opacity/scale animate (both GPU-composited). It unmounts
 * completely after the exit animation, so it costs nothing after dismissal.
 * Kept intentionally short (~1.2s) so it never feels like an artificial wait.
 */
export default function LoadingScreen() {
  return (
    <motion.div
      // Fade the whole overlay out on exit (AnimatePresence drives this).
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 dark:bg-slate-900"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo mark, drawn in with a pop + fade. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-heading text-3xl font-bold tracking-tight"
        >
          <span className="font-mono text-accent dark:text-accent-light">&lt;</span>
          Meethu
          <span className="font-mono text-accent dark:text-accent-light">/&gt;</span>
        </motion.div>

        {/* Loading bar: a track with a gradient fill sweeping 0→100%. */}
        <div className="h-1 w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <motion.div
            className="h-full rounded-full bg-accent-gradient"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
