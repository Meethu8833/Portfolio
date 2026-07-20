import { motion } from 'framer-motion';
import { fadeUp, scrollReveal, staggerContainer } from '../../lib/motion';

/**
 * Section — a reusable wrapper every content section uses.
 * Provides: the scroll anchor id, consistent vertical padding + max width, an
 * optional animated heading (eyebrow + title), and a scroll-triggered stagger
 * so children reveal in sequence. Keeps all sections visually consistent and
 * removes boilerplate from each one.
 *
 * @param {string} id        Anchor id (matches the navbar link + scroll-spy).
 * @param {string} eyebrow   Small mono label above the title (optional).
 * @param {string} title     The section heading (optional).
 * @param {ReactNode} children  Section content.
 * @param {string} className Extra classes for the outer <section>.
 */
export default function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section
      id={id}
      className={`relative mx-auto max-w-6xl px-6 py-20 sm:py-28 ${className}`}
    >
      {/* Heading block — only rendered if a title was provided. */}
      {title && (
        <motion.div
          {...scrollReveal}          // initial=hidden, animate when in view, once
          variants={staggerContainer} // stagger the eyebrow then the title
          className="mb-12 text-center"
        >
          {eyebrow && (
            <motion.p
              variants={fadeUp}
              className="mb-2 font-mono text-sm text-accent dark:text-accent-light"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold sm:text-4xl"
          >
            {title}
          </motion.h2>
          {/* Small gradient underline accent beneath the title. */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent-gradient"
          />
        </motion.div>
      )}

      {children}
    </section>
  );
}
