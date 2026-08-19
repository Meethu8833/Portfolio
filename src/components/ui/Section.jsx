import { motion } from 'framer-motion';
import { fadeUp, scrollReveal, staggerContainer } from '../../lib/motion';

/**
 * Section — a reusable wrapper every content section uses.
 *
 * The heading is a small monospace label on the left with a hairline rule
 * running out to the right edge. Sections that carry an argument rather than a
 * list may also pass `title` for a large serif statement under the rule; the
 * rest stay quiet landmarks and let their content do the work.
 *
 * @param {string} id        Anchor id (matches the navbar link + scroll-spy).
 * @param {string} label     Small mono label to the left of the rule (optional).
 * @param {string} title     Large serif headline under the rule (optional). Use
 *                           it where the section deserves a statement rather
 *                           than just a landmark — it is the loudest type on
 *                           the page, so not every section should have one.
 * @param {string} subtitle  Supporting line under the rule (optional).
 * @param {ReactNode} children  Section content.
 * @param {string} className Extra classes for the outer <section>.
 */
export default function Section({
  id,
  label,
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <section
      id={id}
      // Names the landmark for screen readers now that the label renders small.
      aria-labelledby={label ? `${id}-label` : undefined}
      className={`relative mx-auto max-w-6xl px-6 py-20 sm:py-24 ${className}`}
    >
      {/* Heading block — only rendered if a label was provided. */}
      {label && (
        <motion.div
          {...scrollReveal}           // initial=hidden, animate when in view, once
          variants={staggerContainer}  // stagger the label row, then the subtitle
          className="mb-10"
        >
          {/* Label + rule. `h2` keeps the document outline intact even though
              it renders at body size — the hierarchy is visual, not structural. */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <h2
              id={`${id}-label`}
              className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-accent dark:text-accent-light"
            >
              {label}
            </h2>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-slate-200 dark:bg-ink-700"
            />
          </motion.div>

          {/* Optional serif headline. Sized to sit just under the hero name so
              sections read as chapters without competing with it. */}
          {title && (
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-3xl font-display text-2xl leading-[1.2] text-ink-900 sm:text-3xl lg:text-[2.125rem] dark:text-slate-50"
            >
              {title}
            </motion.p>
          )}

          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-400"
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
