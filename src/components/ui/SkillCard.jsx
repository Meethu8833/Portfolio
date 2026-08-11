import { motion } from 'framer-motion';
import { skillIcons, resolveSkillColor } from '../../data/skillIcons';
import { useTheme } from '../../context/ThemeContext';
import { fadeUp } from '../../lib/motion';

/**
 * SkillCard — one skill tile.
 * Brand icon, name, and a short description — no proficiency numbers or
 * progress bars. On hover the card lifts and a wash in the skill's own brand
 * colour fades in behind it, so each tile feels individually identified.
 *
 * @param {object} skill  { name, icon, description } from skills.js.
 */
export default function SkillCard({ skill }) {
  const { name, icon, description } = skill;
  const { theme } = useTheme();
  // Resolve the icon + brand colour (fallback keeps it safe if a key is typo'd).
  // Near-black brands swap to a lightened tint in dark mode so they stay visible.
  const { Icon } = skillIcons[icon] ?? { Icon: null };
  const color = resolveSkillColor(icon, theme === 'dark');

  return (
    <motion.div
      variants={fadeUp}          // fade-up entrance (parent staggers the grid)
      whileHover={{ y: -6 }}     // hover lift
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="card-glass group relative overflow-hidden p-5 transition-shadow hover:shadow-card-hover"
    >
      {/* Brand-coloured wash, revealed on hover. Driven by an inline gradient
          because the colour comes from data, not from the Tailwind palette. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(120% 90% at 0% 0%, ${color}1f, transparent 60%)` }}
      />

      {/* Header row: icon + name. */}
      <div className="relative mb-3 flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          // Tint the icon chip with a faint wash of the brand colour.
          style={{ backgroundColor: `${color}1a` }} // 1a ≈ 10% alpha
        >
          {Icon && <Icon size={22} style={{ color }} />}
        </div>
        <h4 className="font-heading text-base font-semibold">{name}</h4>
      </div>

      {/* Short description. */}
      <p className="relative text-sm leading-snug text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}
