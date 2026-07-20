import { motion } from 'framer-motion';
import { aboutIntro, aboutStats } from '../../data/about';
import { scrollReveal, slideInLeft, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';
import StatCard from '../ui/StatCard';

export default function About() {
  return (
    <Section id="about" eyebrow="01 · Introduction" title="About Me">
      {/* Floating background shapes (decorative). ---------------------------
          Two soft, blurred blobs that drift slowly behind the content to add
          depth. `pointer-events-none` and low opacity keep them non-intrusive
          and text fully readable in both themes; -z-10 puts them behind. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-10 top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-accent-violet/10 blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Two-column grid: stacks to 1 column on mobile, 2 columns from lg up.
          The left (intro) column is slightly wider (3fr) than the stats (2fr). */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
        {/* ---- LEFT: introduction (spans 3 of 5 columns on desktop) ---- */}
        <motion.div
          {...scrollReveal}
          variants={staggerContainer}
          className="space-y-6 lg:col-span-3"
        >
          {aboutIntro.map((item) => (
            <motion.div key={item.heading} variants={slideInLeft}>
              <h3 className="mb-1.5 flex items-center gap-2 font-heading text-lg font-semibold">
                {/* Small accent bar before each heading for visual rhythm. */}
                <span className="h-4 w-1 rounded-full bg-accent-gradient" />
                {item.heading}
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ---- RIGHT: animated stat cards (spans 2 of 5 columns) ---- */}
        <motion.div
          {...scrollReveal}
          variants={staggerContainer}
          className="grid grid-cols-2 gap-4 self-start lg:col-span-2"
        >
          {aboutStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
