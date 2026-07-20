import { motion } from 'framer-motion';

/**
 * FloatingBlobs — a fixed, site-wide ambient background of soft drifting blobs
 * that sits behind all content. Adds depth across every section (the Hero/About
 * ones are local accents; this is the global layer).
 *
 * PERFORMANCE:
 *  - Only `transform` (x/y/scale) animates — all GPU-composited, no layout/paint
 *    thrash. `willChange: transform` hints the browser to promote each blob to
 *    its own layer.
 *  - `position: fixed` means the blobs don't grow the scroll area or reflow.
 *  - Very low opacity + big blur keeps them subtle and text-safe in both themes.
 *  - Long, slow durations = few animation frames actually change much.
 *  - `pointer-events-none` so they never intercept clicks.
 */

// Blob definitions: position, size, colour, and a slow drift path.
const BLOBS = [
  { className: 'left-[-10%] top-[5%] h-[420px] w-[420px] bg-accent/20', x: [0, 60, 0], y: [0, 40, 0], duration: 20 },
  { className: 'right-[-8%] top-[35%] h-[380px] w-[380px] bg-accent-violet/20', x: [0, -50, 0], y: [0, 60, 0], duration: 24 },
  { className: 'left-[20%] bottom-[-10%] h-[460px] w-[460px] bg-accent/15', x: [0, 40, 0], y: [0, -50, 0], duration: 28 },
];

export default function FloatingBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          style={{ willChange: 'transform' }}
          animate={{ x: blob.x, y: blob.y, scale: [1, 1.1, 1] }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
