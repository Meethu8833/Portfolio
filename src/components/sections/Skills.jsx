import { motion } from 'framer-motion';
import { skillGroups } from '../../data/skills';
import { fadeUp, scrollReveal, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';
import SkillCard from '../ui/SkillCard';

export default function Skills() {
  return (
    <Section id="skills" eyebrow="02 · Tech Stack" title="Skills & Expertise">
      {/* Render each resume category as its own labelled block. */}
      <div className="space-y-12">
        {skillGroups.map((group) => (
          <div key={group.category}>
            {/* Category label with a short gradient rule beside it. */}
            <motion.h3
              {...scrollReveal}
              variants={fadeUp}
              className="mb-5 flex items-center gap-3 font-heading text-lg font-semibold text-slate-700 dark:text-slate-200"
            >
              {group.category}
              <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
            </motion.h3>

            {/* Responsive card grid: 1 col (mobile) → 2 (sm) → 3 (lg) → 4 (xl).
                staggerContainer + each card's fadeUp reveals them in sequence. */}
            <motion.div
              {...scrollReveal}
              variants={staggerContainer}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {group.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  );
}
