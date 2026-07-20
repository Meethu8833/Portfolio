import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — a thin gradient bar pinned to the top of the viewport that
 * fills as you scroll the page.
 *
 * PERFORMANCE: `useScroll` writes to a MotionValue (scrollYProgress, 0→1) that
 * drives `scaleX` directly on the compositor — it never triggers a React
 * re-render on scroll. `useSpring` smooths the value so the bar eases rather
 * than jerks. `transformOrigin: left` makes it grow from the left edge.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Spring-smooth the raw progress for a fluid fill (tuned stiff-but-damped).
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent-gradient"
      aria-hidden="true" // purely decorative
    />
  );
}
