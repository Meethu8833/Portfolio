import { motion } from 'framer-motion';

/**
 * FloatingBlobs — the site-wide ambient background: a fixed layer of soft
 * drifting amber/orange auras, a faint blueprint grid, and a film-grain overlay.
 * Sits behind all content and gives the deep-navy ground depth instead of a
 * flat fill.
 *
 * PERFORMANCE:
 *  - Only `transform` (x/y/scale) animates — GPU-composited, no layout/paint
 *    thrash. `willChange: transform` promotes each blob to its own layer.
 *  - `position: fixed` means the layer never grows the scroll area or reflows.
 *  - The grid and grain are static CSS backgrounds (zero animation cost).
 *  - `pointer-events-none` so nothing here intercepts clicks.
 */

// Blob definitions: position, size, colour, and a slow drift path.
const BLOBS = [
  {
    className: 'left-[-12%] top-[2%] h-[520px] w-[520px] bg-accent/25 dark:bg-accent-light/[0.14]',
    x: [0, 70, 0],
    y: [0, 40, 0],
    duration: 22,
  },
  {
    className: 'right-[-10%] top-[30%] h-[440px] w-[440px] bg-accent-warm/25 dark:bg-accent-warm/[0.14]',
    x: [0, -60, 0],
    y: [0, 70, 0],
    duration: 26,
  },
  {
    className: 'left-[25%] bottom-[-12%] h-[500px] w-[500px] bg-accent/[0.18] dark:bg-accent/[0.10]',
    x: [0, 50, 0],
    y: [0, -60, 0],
    duration: 30,
  },
];

export default function FloatingBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base wash — a vertical tint that darkens toward the bottom of the
          viewport, so the navy reads as lit from above rather than flat. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-100/60 dark:to-ink-950/70" />

      {/* Blueprint grid texture (masked to fade out at the edges). */}
      <div className="absolute inset-0 bg-grid opacity-[0.35] dark:opacity-[0.22]" />

      {/* Drifting colour auras. */}
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          style={{ willChange: 'transform' }}
          animate={{ x: blob.x, y: blob.y, scale: [1, 1.12, 1] }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Film grain — breaks up banding in the large blurred gradients. */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay dark:opacity-[0.05]" />
    </div>
  );
}
