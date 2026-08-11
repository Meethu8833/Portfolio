import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';
import { PiGraduationCapFill } from 'react-icons/pi';
import { education } from '../../data/education';
import { fadeUp, scrollReveal, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="04 · Education"
      title="Education"
      subtitle="The academic grounding behind the engineering work."
    >
      {/* Constrained width keeps the card centered and elegant rather than
          stretching edge-to-edge on wide screens. */}
      <motion.div
        {...scrollReveal}
        variants={staggerContainer}
        className="mx-auto max-w-3xl"
      >
        {education.map((edu) => (
          <motion.div
            key={edu.degree + edu.institution}
            variants={fadeUp}   // fade-up entrance when scrolled into view
            className="card-frame shadow-card transition-shadow hover:shadow-card-hover"
          >
            {/* Inner glass card. Flex row: icon on the left, details on the
                right — stacks to a column on very small screens. */}
            <div className="flex flex-col gap-6 rounded-2xl bg-white/80 p-7 backdrop-blur-xl sm:flex-row sm:items-start sm:p-8 dark:bg-ink-800/80">
              {/* ---- Graduation icon ----
                  Sits in a gradient disc so it reads as a focal point. It gently
                  bobs up and down forever to add life without distraction. */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent-gradient text-white shadow-glow"
              >
                <PiGraduationCapFill size={30} />
              </motion.div>

              {/* ---- Details ---- */}
              <div className="flex-1">
                {/* Degree + field as the headline. */}
                <h3 className="font-heading text-xl font-bold sm:text-2xl">
                  {edu.degree}
                  <span className="text-gradient mt-0.5 block">{edu.field}</span>
                </h3>

                {/* Meta row: institution + period, each with an icon. Wraps on
                    narrow screens so nothing overflows. */}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <FiMapPin size={14} /> {edu.institution}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCalendar size={14} /> {edu.period}
                  </span>
                </div>

                {/* Short description of the academic foundation. */}
                <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-600 dark:border-ink-700 dark:text-slate-300">
                  {edu.description}
                </p>

                {/* Degree chip — a compact restatement for scanners. */}
                <span className="chip mt-4 inline-flex items-center gap-1.5">
                  <FiAward size={12} />
                  {edu.degree}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
