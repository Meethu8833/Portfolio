import { motion } from 'framer-motion';
import { fadeUp, scrollReveal, staggerContainer } from '../../lib/motion';

/**
 * Section — a reusable wrapper every content section uses.
 * Provides: the scroll anchor id, consistent vertical padding + max width, an
 * optional animated heading (eyebrow pill + title + rule), and a scroll-
 * triggered stagger so children reveal in sequence.
 *
 * @param {string} id        Anchor id (matches the navbar link + scroll-spy).
 * @param {string} eyebrow   Small mono label above the title (optional).
 * @param {string} title     The section heading (optional).
 * @param {string} subtitle  Supporting line under the title (optional).
 * @param {'center'|'left'} align  Heading alignment. Defaults to centered.
 * @param {ReactNode} children  Section content.
 * @param {string} className Extra classes for the outer <section>.
 */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
  children,
  className = '',
}) {
  const centered = align === 'center';

  return (
    <section
      id={id}
      className={`relative mx-auto max-w-6xl px-6 py-20 sm:py-28 ${className}`}
    >
      {/* Heading block — only rendered if a title was provided. */}
      {title && (
        <motion.div
          {...scrollReveal}          // initial=hidden, animate when in view, once
          variants={staggerContainer} // stagger the eyebrow, then the title
          className={`mb-14 ${centered ? 'text-center' : 'text-left'}`}
        >
          {eyebrow && (
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              {eyebrow}
            </motion.p>
          )}

          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]"
          >
            {title}
          </motion.h2>

          {/* Gradient rule under the title — centered or left-aligned to match. */}
          <motion.div
            variants={fadeUp}
            className={`mt-4 h-1 w-20 rounded-full bg-accent-gradient ${
              centered ? 'mx-auto' : ''
            }`}
          />

          {subtitle && (
            <motion.p
              variants={fadeUp}
              className={`mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 ${
                centered ? 'mx-auto' : ''
              }`}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      )}

      {children}
    </section>
  );
}
