import { motion } from 'framer-motion';
import { skillGroups } from '../../data/skills';
import { skillIcons, resolveSkillColor } from '../../data/skillIcons';
import { useTheme } from '../../context/ThemeContext';
import { fadeUp, scrollReveal, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';

/**
 * Skills — one compact row per resume category: the category label on the left,
 * its skills as small icon chips on the right.
 *
 * Deliberately dense. The stack is supporting evidence, not the headline, so it
 * stays scannable in a few lines rather than filling a screen with cards.
 */
export default function Skills() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Section
      id="skills"
      label="Tech Stack"
      subtitle="The tools I reach for day to day."
    >
      <motion.div
        {...scrollReveal}
        variants={staggerContainer}
        className="mx-auto max-w-4xl divide-y divide-slate-200 dark:divide-ink-700"
      >
        {skillGroups.map((group) => (
          <motion.div
            key={group.category}
            variants={fadeUp}
            className="flex flex-col gap-3 py-5 sm:flex-row sm:items-baseline sm:gap-8"
          >
            {/* Category label — fixed width on sm+ so all chip rows line up. */}
            <h3 className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-accent dark:text-accent-light sm:w-28">
              {group.category}
            </h3>

            {/* Skill chips. */}
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const { Icon } = skillIcons[skill.icon] ?? {};
                const color = resolveSkillColor(skill.icon, isDark);
                return (
                  <span
                    key={skill.name}
                    // `title` keeps the resume descriptions reachable on hover
                    // now that the cards that displayed them are gone.
                    title={skill.description}
                    className="flex items-center gap-2 rounded border border-slate-200 px-2.5 py-1.5 text-[13px] text-slate-600 transition-colors hover:border-accent/40 hover:text-accent dark:border-ink-700 dark:text-slate-300 dark:hover:border-accent-light/40 dark:hover:text-accent-light"
                  >
                    {Icon && <Icon size={14} style={{ color }} />}
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
