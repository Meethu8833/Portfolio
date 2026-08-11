import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skillGroups } from '../../data/skills';
import { skillIcons, resolveSkillColor } from '../../data/skillIcons';
import { useTheme } from '../../context/ThemeContext';
import { fadeUp, scrollReveal, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';
import SkillCard from '../ui/SkillCard';

// "All" plus one entry per resume category. Filtering client-side keeps the
// data file untouched and the interaction instant (no refetch, no layout jump).
const CATEGORIES = ['All', ...skillGroups.map((g) => g.category)];

// Flattened list, each skill tagged with its category so filtering is a
// one-liner. Computed once at module scope — never recomputed on render.
const ALL_SKILLS = skillGroups.flatMap((group) =>
  group.skills.map((skill) => ({ ...skill, category: group.category })),
);

export default function Skills() {
  const [active, setActive] = useState('All');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const visible =
    active === 'All'
      ? ALL_SKILLS
      : ALL_SKILLS.filter((skill) => skill.category === active);

  return (
    <Section
      id="skills"
      eyebrow="02 · Tech Stack"
      title="Skills & Expertise"
      subtitle="The tools I reach for day to day — filter by category to see how the stack breaks down."
    >
      {/* ---- Marquee strip ----
          An infinite scrolling row of every stack icon, sitting above the
          filter. Purely decorative (aria-hidden) — it sets the tone before the
          detail. The track is duplicated and translated -50% so the loop is
          seamless; hovering pauses it. */}
      <div
        aria-hidden="true"
        className="mask-fade-x pause-on-hover relative mb-12 overflow-hidden py-2"
      >
        <div className="flex w-max animate-marquee gap-3">
          {/* Two identical halves → a seamless -50% loop. */}
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-3">
              {ALL_SKILLS.map((skill) => {
                const { Icon } = skillIcons[skill.icon] ?? {};
                const color = resolveSkillColor(skill.icon, isDark);
                return (
                  <span
                    key={`${half}-${skill.name}`}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-2 text-sm font-medium text-slate-600 backdrop-blur dark:border-ink-700 dark:bg-ink-800/50 dark:text-slate-300"
                  >
                    {Icon && <Icon size={16} style={{ color }} />}
                    {skill.name}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ---- Category filter ---- */}
      <motion.div
        {...scrollReveal}
        variants={staggerContainer}
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        {CATEGORIES.map((category) => {
          const isActive = active === category;
          return (
            <motion.button
              key={category}
              variants={fadeUp}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-slate-600 hover:text-accent dark:text-slate-400 dark:hover:text-accent-light'
              }`}
            >
              {/*
                The filled pill slides between buttons via `layoutId` — one
                shared element, so the highlight glides rather than blinking.
                Behind the label (-z-10) so the text stays readable.
              */}
              {isActive && (
                <motion.span
                  layoutId="skill-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent-gradient shadow-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {/* Inactive buttons get a visible outline; the active one doesn't
                  need it because the gradient pill defines its shape. */}
              {!isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-full border border-slate-200 dark:border-ink-700"
                />
              )}
              {category}
            </motion.button>
          );
        })}
      </motion.div>

      {/* ---- Card grid ----
          `AnimatePresence mode="popLayout"` lets removed cards animate out
          while the remaining ones smoothly re-flow into their new positions,
          instead of the grid snapping. */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
