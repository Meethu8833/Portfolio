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
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="card-glass group relative flex flex-col items-center justify-center gap-1.5 overflow-hidden p-5 text-center transition-shadow hover:shadow-card-hover"
    >
      {/* Soft accent wash from the bottom, revealed on hover. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-accent-light/10"
      />

      {/* Icon in an accent-tinted rounded square. */}
      <div className="relative mb-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110 dark:bg-accent-light/10 dark:text-accent-light">
        {Icon && <Icon size={18} />}
      </div>

      {/* The big number (counted) or text (Current Position). */}
      <div className="text-gradient relative font-heading text-3xl font-bold">
        {display ?? (
          <>
            {count}
            {suffix}
          </>
        )}
      </div>

      {/* Label under the number. */}
      <p className="relative text-xs font-medium leading-tight text-slate-600 dark:text-slate-400">
        {label}
      </p>

      {/* Optional smaller line (used by the position card). */}
      {sublabel && (
        <p className="relative text-[10px] leading-tight text-slate-400 dark:text-slate-500">
          {sublabel}
        </p>
      )}
    </motion.div>
  );
}
