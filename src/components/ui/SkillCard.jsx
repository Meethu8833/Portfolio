import { motion } from 'framer-motion';
import { skillIcons } from '../../data/skillIcons';
import { fadeUp } from '../../lib/motion';

/**
 * SkillCard — one premium skill tile.
 * Features: brand icon, name, and a short description — no proficiency numbers
 * or progress bars. Gradient border, glassmorphism, and a hover lift.
 *
 * @param {object} skill  { name, icon, description } from skills.js.
 */
export default function SkillCard({ skill }) {
  const { name, icon, description } = skill;
  // Resolve the icon + brand colour (fallback keeps it safe if a key is typo'd).
  const { Icon, color } = skillIcons[icon] ?? { Icon: null, color: '#6366f1' };

  return (
    <motion.div
      variants={fadeUp}          // fade-up entrance (parent staggers the grid)
      whileHover={{ y: -6 }}     // hover lift
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      /* Gradient border trick: the OUTER div is the gradient; padding of 1px
         lets it show as a thin border around the INNER card. `group` enables
         hover styling on children. */
      className="group rounded-2xl bg-gradient-to-br from-accent/40 via-slate-200/40 to-accent-violet/40 p-px shadow-sm transition-shadow hover:shadow-xl hover:shadow-accent/10 dark:from-accent/30 dark:via-slate-700/40 dark:to-accent-violet/30"
    >
      {/* INNER card — glassmorphism: semi-transparent bg + backdrop blur. */}
      <div className="h-full rounded-2xl bg-white/70 p-5 backdrop-blur-xl dark:bg-slate-800/70">
        {/* Header row: icon + name. */}
        <div className="mb-3 flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
            // Tint the icon chip with a faint wash of the brand colour.
            style={{ backgroundColor: `${color}1a` }} // 1a ≈ 10% alpha
          >
            {Icon && <Icon size={22} style={{ color }} />}
          </div>
          <h4 className="font-heading text-base font-semibold">{name}</h4>
        </div>

        {/* Short description. */}
        <p className="text-sm leading-snug text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
