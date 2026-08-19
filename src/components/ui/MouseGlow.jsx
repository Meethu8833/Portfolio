import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MouseGlow — a soft accent radial glow that trails the cursor.
 *
 * PERFORMANCE (this is the important part):
 *  - Cursor position lives in MotionValues, NOT React state, so moving the
 *    mouse never re-renders any component — the glow's transform updates on
 *    the compositor only.
 *  - `useSpring` adds a smooth trailing lag cheaply.
 *  - The listener is `passive` and does one `set()` per event — no layout reads.
 *  - Skipped entirely on touch / no-hover devices and under reduced motion.
 *  - `pointer-events-none` + heavy blur means it never blocks interaction.
 */
export default function MouseGlow() {
  // Raw cursor coordinates as MotionValues (start off-screen).
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  // Spring-smoothed for a gentle trailing follow.
  const x = useSpring(mouseX, { stiffness: 90, damping: 20, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 90, damping: 20, mass: 0.4 });

  // Only enable on devices with a fine pointer (mouse) and hover, and when the
  // user hasn't asked to reduce motion. Decided once on mount.
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(finePointer && !reduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    // Center the 500px glow on the cursor by offsetting half its size.
    const handle = (e) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x, y }}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full
                 bg-[radial-gradient(circle,rgba(199,154,92,0.16),transparent_65%)] blur-[80px]
                 dark:bg-[radial-gradient(circle,rgba(217,178,124,0.20),transparent_65%)]"
    />
  );
}
