import { motion } from 'framer-motion';

/**
 * AnimatedSection — wraps each top-level section so the WHOLE block eases in
 * (fade + slight rise) as it scrolls into view, giving consistent section-to-
 * section transitions on top of the finer animations inside each section.
 *
 * PERFORMANCE:
 *  - Only opacity + translateY animate (GPU-composited).
 *  - `viewport={{ once: true }}` means each section animates a single time then
 *    is left alone — no repeated work while scrolling back and forth.
 *  - `amount: 0.15` triggers early enough that content is never seen mid-fade.
 *  - Hero is excluded (it has its own load animation) via the `plain` escape
 *    hatch so we don't double-animate the first paint.
 */
export default function AnimatedSection({ children, plain = false }) {
  if (plain) return children;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
