import { motion } from 'framer-motion';
import { education } from '../../data/education';
import { fadeUp, scrollReveal, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';

/**
 * Education — a compact list rather than a feature card.
 *
 * Deliberately understated: degree and institution on one line, period aligned
 * right. The academic background is context, not a headline, so it stays quiet
 * next to Experience and Projects.
 */
export default function Education() {
  return (
    <Section id="education" label="Education">
      <motion.div
        {...scrollReveal}
        variants={staggerContainer}
        className="mx-auto max-w-3xl divide-y divide-slate-200 dark:divide-ink-700"
      >
        {education.map((edu) => (
          <motion.div
            key={edu.degree + edu.institution}
            variants={fadeUp}
            className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <div className="min-w-0">
              <h3 className="font-display text-base font-semibold">
                {edu.degree} — {edu.field}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {edu.institution}
              </p>
            </div>

            {/* Period — right-aligned on sm+ so multiple entries form a column. */}
            <span className="shrink-0 font-mono text-[11px] tracking-wide text-slate-400 dark:text-slate-500">
              {edu.period}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
