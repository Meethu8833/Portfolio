import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi';
import { fadeUp, slideInRight } from '../../lib/motion';

/**
 * TimelineItem — a single experience entry.
 * Layout: a vertical rail runs down the LEFT (a connector line + a node dot);
 * the experience CARD sits to the right of it. On mobile the rail stays on the
 * far left and the card takes the remaining width, so it reads cleanly at any
 * size. Enters with a slide-in + fade when scrolled into view.
 *
 * @param {object}  exp    One entry from experience.js.
 * @param {boolean} isLast Hide the connector line under the final item.
 */
export default function TimelineItem({ exp, isLast }) {
  const { role, company, period, location, current, responsibilities, tech } = exp;

  return (
    <div className="relative flex gap-6 sm:gap-8">
      {/* ---- LEFT rail: node dot + connector line ---- */}
      <div className="relative flex flex-col items-center">
        {/* Node dot with the briefcase icon. Current role gets an animated
            pulsing ring so "Present" stands out. */}
        <div className="relative z-10">
          {current && (
            // Expanding, fading ring — a soft "live" pulse (infinite loop).
            <motion.span
              className="absolute inset-0 rounded-full bg-accent"
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient text-white shadow-lg shadow-accent/30">
            <FiBriefcase size={16} />
          </div>
        </div>

        {/* Connector line down to the next item (omitted on the last one).
            `flex-1` stretches it to fill the card's height. */}
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-accent/40 to-slate-200 dark:to-slate-700" />
        )}
      </div>

      {/* ---- RIGHT: the experience card ---- */}
      <motion.div
        variants={slideInRight}                       // slide in from the right
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}         // animate once, when 30% visible
        className="mb-10 flex-1 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/70"
      >
        {/* Header: role + "Current" badge, then company. */}
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-heading text-lg font-bold">{role}</h3>
          {current && (
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent dark:text-accent-light">
              Current
            </span>
          )}
        </div>

        <p className="mb-3 font-medium text-accent dark:text-accent-light">
          {company}
        </p>

        {/* Meta row: duration + location, each with an icon. */}
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <FiCalendar size={14} /> {period}
          </span>
          <span className="flex items-center gap-1.5">
            <FiMapPin size={14} /> {location}
          </span>
        </div>

        {/* Responsibilities — bulleted, each with a small accent marker. The
            parent list staggers them via container/child variants. */}
        <motion.ul
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-5 space-y-2"
        >
          {responsibilities.map((item, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
            >
              {/* Custom bullet: a small accent dot, aligned to the first line. */}
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gradient" />
              {item}
            </motion.li>
          ))}
        </motion.ul>

        {/* Technologies used — pill tags. */}
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
