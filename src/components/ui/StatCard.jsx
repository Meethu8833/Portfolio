import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiClock, FiLayers, FiFolder, FiBriefcase } from 'react-icons/fi';
import { useCountUp } from '../../hooks/useCountUp';
import { popIn } from '../../lib/motion';

// Map the string icon names from about.js to actual icon components.
const ICONS = {
  clock: FiClock,
  stack: FiLayers,
  folder: FiFolder,
  briefcase: FiBriefcase,
};

/**
 * StatCard — a single animated statistic tile.
 * Numeric cards count up from 0 when scrolled into view; the "Current Position"
 * card shows text (`display`) instead. Cards lift slightly on hover.
 *
 * @param {object} stat  One entry from aboutStats (label/value/suffix/display…).
 */
export default function StatCard({ stat }) {
  const { label, value, suffix = '', display, sublabel, icon } = stat;
  const Icon = ICONS[icon];

  // Watch this card; `inView` flips true when it enters the viewport, which
  // triggers the count-up (so the animation plays on scroll, not on load).
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  // For numeric cards, animate 0 → value. (For the text card, `value` is
  // undefined and we simply render `display`.)
  const count = useCountUp(value ?? 0, inView);

  return (
    <motion.div
      ref={ref}
      variants={popIn}       // pop-in entrance (parent staggers these)
      whileHover={{ y: -4 }} // subtle lift on hover
      className="group relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Icon in an accent-tinted rounded square. */}
      <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent dark:text-accent-light">
        {Icon && <Icon size={20} />}
      </div>

      {/* The big number (counted) or text (Current Position). */}
      <div className="bg-accent-gradient bg-clip-text font-heading text-4xl font-bold text-transparent">
        {display ?? (
          <>
            {count}
            {suffix}
          </>
        )}
      </div>

      {/* Label under the number. */}
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {label}
      </p>

      {/* Optional smaller line (used by the position card). */}
      {sublabel && (
        <p className="text-xs text-slate-400 dark:text-slate-500">{sublabel}</p>
      )}
    </motion.div>
  );
}
